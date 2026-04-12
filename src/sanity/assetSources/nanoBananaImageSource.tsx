"use client";

/**
 * Nano Banana — fonte de asset de imagem para o Sanity Studio.
 *
 * ## Variável de ambiente
 * - `SANITY_STUDIO_NANO_BANANA_URL` — URL HTTPS do teu backend que gera a imagem.
 *   Expõe-a no cliente via `env` em [`next.config.ts`](../../../next.config.ts).
 *   Não coloques chaves secretas aqui: o browser vê este valor; autentica no servidor.
 *
 * ## Contrato HTTP (mínimo)
 * - **Request:** `POST` com `Content-Type: application/json` e corpo `{ "prompt": string }`.
 * - **Opcional:** `aspectRatio` (ex.: `16:9`, `1:1`) e `style` (texto curto com pistas visuais) — ver backend
 *   [`nano-banana-api/api/generate.ts`](../../../nano-banana-api/api/generate.ts).
 * - **Response (opção A):** corpo binário `image/png` ou `image/jpeg` (ou outro tipo em `Content-Type`).
 * - **Response (opção B):** JSON com um destes campos (primeiro encontrado é usado):
 *   - `imageBase64`, `base64`, ou `image` — string base64 pura ou data URL `data:image/...;base64,...`.
 *   - Opcional: `mimeType` (ex.: `image/png`) quando o JSON só traz base64 sem prefixo.
 *
 * Após obter bytes, o asset é enviado ao projeto com `client.assets.upload("image", file)` e o
 * campo passa a referenciar o novo documento de asset.
 */
import type { AssetFromSource, AssetSource, AssetSourceComponentProps } from "@sanity/types";
import { Box, Button, Dialog, Flex, Stack, Text, TextArea, TextInput, useToast } from "@sanity/ui";
import { Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useClient } from "sanity";

const STUDIO_API_VERSION = "2024-01-01";

const PROMPT_PRESETS = [
  "Hero escuro com diagrama de API e código TypeScript",
  "Mockup de dashboard analytics em tons navy e laranja",
  "Ilustração minimalista de integração entre sistemas (setas, nós)",
  "Equipa a colaborar à volta de um ecrã, estilo flat, fundo escuro",
] as const;

/** Alinhado a `NANO_BANANA_ASPECT_RATIOS` no backend nano-banana-api. */
const ASPECT_RATIOS = [
  "1:1",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "4:5",
  "5:4",
  "9:16",
  "16:9",
  "21:9",
] as const;

const FETCH_TIMEOUT_MS = 120_000;

function NanoBananaIcon() {
  return <Sparkles size={18} strokeWidth={2} aria-hidden />;
}

function getNanoBananaEndpoint(): string | undefined {
  const raw = process.env.SANITY_STUDIO_NANO_BANANA_URL?.trim();
  return raw || undefined;
}

function base64ToBlob(base64: string, mimeFallback: string): Blob {
  const dataUrlMatch = /^data:([^;]+);base64,(.+)$/.exec(base64.trim());
  const payload = dataUrlMatch ? dataUrlMatch[2] : base64.replace(/^data:image\/\w+;base64,/, "");
  const mime = dataUrlMatch?.[1] ?? mimeFallback;
  const binary = atob(payload);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

async function parseImageResponse(res: Response): Promise<Blob> {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    const data = (await res.json()) as Record<string, unknown>;
    const mime =
      typeof data.mimeType === "string" && data.mimeType ? data.mimeType : "image/png";
    const raw =
      (typeof data.imageBase64 === "string" && data.imageBase64) ||
      (typeof data.base64 === "string" && data.base64) ||
      (typeof data.image === "string" && data.image);
    if (!raw) {
      throw new Error("JSON sem imageBase64, base64 ou image");
    }
    return base64ToBlob(raw, mime);
  }
  return res.blob();
}

function NanoBananaAssetSourceDialog(props: AssetSourceComponentProps) {
  const { onClose, onSelect } = props;
  const client = useClient({ apiVersion: STUDIO_API_VERSION });
  const toast = useToast();
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<string>("1:1");
  const [styleHints, setStyleHints] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const endpoint = getNanoBananaEndpoint();

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const notifyNotConfigured = useCallback(() => {
    toast.push({
      status: "warning",
      title: "Nano Banana",
      description:
        "Configure SANITY_STUDIO_NANO_BANANA_URL no ambiente e faça rebuild (ver next.config.ts e comentário em nanoBananaImageSource.tsx).",
    });
  }, [toast]);

  const clearPreview = useCallback(() => {
    setPreviewBlob(null);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  const runGenerate = useCallback(async () => {
    if (!endpoint) {
      notifyNotConfigured();
      return;
    }
    if (!prompt.trim()) {
      toast.push({
        status: "error",
        title: "Prompt obrigatório",
        description: "Descreva a imagem antes de gerar.",
      });
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    const timeoutId = window.setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS);

    setLoading(true);
    clearPreview();
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          ...(aspectRatio ? { aspectRatio } : {}),
          ...(styleHints.trim() ? { style: styleHints.trim() } : {}),
        }),
        signal: ac.signal,
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const blob = await parseImageResponse(res);
      const url = URL.createObjectURL(blob);
      setPreviewBlob(blob);
      setPreviewUrl(url);
      toast.push({
        status: "success",
        title: "Pré-visualização pronta",
        description: "Confirma para enviar ao Sanity ou regenera com o mesmo prompt.",
      });
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        toast.push({
          status: "warning",
          title: "Nano Banana",
          description: "Pedido interrompido (cancelamento ou tempo máximo de 2 minutos).",
        });
        return;
      }
      toast.push({
        status: "error",
        title: "Nano Banana",
        description: e instanceof Error ? e.message : "Falha ao gerar a imagem.",
      });
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, [aspectRatio, clearPreview, endpoint, notifyNotConfigured, prompt, styleHints, toast]);

  const handleApply = useCallback(async () => {
    if (!previewBlob) {
      toast.push({
        status: "error",
        title: "Sem imagem",
        description: "Gera uma pré-visualização antes de aplicar.",
      });
      return;
    }

    setLoading(true);
    try {
      const ext =
        previewBlob.type.includes("jpeg") || previewBlob.type.includes("jpg") ? "jpg" : "png";
      const file = new File([previewBlob], `nano-banana-${Date.now()}.${ext}`, {
        type: previewBlob.type || "image/png",
      });
      const uploaded = await client.assets.upload("image", file);
      const id = uploaded?._id;
      if (!id || typeof id !== "string") {
        throw new Error("Upload não devolveu _id do asset");
      }
      const selected: AssetFromSource[] = [{ kind: "assetDocumentId", value: id }];
      onSelect(selected);
      onClose();
      toast.push({
        status: "success",
        title: "Imagem aplicada",
        description: "O asset foi associado ao campo.",
      });
    } catch (e) {
      toast.push({
        status: "error",
        title: "Nano Banana",
        description: e instanceof Error ? e.message : "Falha ao enviar a imagem.",
      });
    } finally {
      setLoading(false);
    }
  }, [client, onClose, onSelect, previewBlob, toast]);

  return (
    <Dialog
      header="Gerar com Nano Banana"
      id="nano-banana-asset-dialog"
      onClose={onClose}
      width={1}
      zOffset={800000}
    >
      <Box padding={4}>
        <Stack space={4}>
          <Text size={1}>
            Descreve a imagem. Com endpoint configurado, o Studio envia um POST JSON com o campo{" "}
            <code>prompt</code> para <code>SANITY_STUDIO_NANO_BANANA_URL</code>. Podes pré-visualizar
            antes de aplicar ao campo.
          </Text>
          <Flex gap={2} wrap="wrap">
            {PROMPT_PRESETS.map((p) => (
              <Button
                key={p}
                mode="ghost"
                fontSize={1}
                padding={2}
                text={p.length > 42 ? `${p.slice(0, 40)}…` : p}
                disabled={loading}
                onClick={() => setPrompt(p)}
              />
            ))}
          </Flex>
          <Box>
            <Text size={1} weight="semibold">
              Proporção
            </Text>
            <Box marginTop={2}>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                disabled={loading}
                style={{
                  width: "100%",
                  maxWidth: 280,
                  padding: "0.5rem 0.75rem",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(0,0,0,0.35)",
                  color: "inherit",
                  fontSize: 14,
                }}
              >
                {ASPECT_RATIOS.map((ar) => (
                  <option key={ar} value={ar}>
                    {ar}
                  </option>
                ))}
              </select>
            </Box>
          </Box>
          <Box>
            <Text size={1} weight="semibold">
              Pistas de estilo (opcional)
            </Text>
            <Box marginTop={2}>
              <TextInput
                value={styleHints}
                onChange={(event) => setStyleHints(event.currentTarget.value)}
                placeholder="Ex.: flat, navy e laranja, pouco detalhe…"
                disabled={loading}
              />
            </Box>
          </Box>
          <TextArea
            rows={5}
            value={prompt}
            onChange={(event) => setPrompt(event.currentTarget.value)}
            placeholder="Ex.: Hero escuro com diagrama de API e código TypeScript…"
          />
          {previewUrl ? (
            <Box>
              <Text size={1} weight="semibold">
                Pré-visualização
              </Text>
              <Box marginTop={3} style={{ borderRadius: 8, overflow: "hidden", maxHeight: 280 }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- blob preview in Studio only */}
                <img
                  src={previewUrl}
                  alt="Pré-visualização gerada"
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
                />
              </Box>
            </Box>
          ) : null}
          <Flex gap={3} wrap="wrap">
            <Button
              tone="primary"
              text={previewUrl ? "Regenerar" : "Gerar pré-visualização"}
              loading={loading}
              disabled={loading}
              onClick={() => void runGenerate()}
            />
            {previewUrl ? (
              <Button
                tone="positive"
                text="Aplicar ao campo"
                loading={loading}
                disabled={loading}
                onClick={() => void handleApply()}
              />
            ) : null}
            <Button mode="ghost" type="button" text="Cancelar" disabled={loading} onClick={onClose} />
            {!endpoint ? (
              <Button mode="ghost" type="button" text="Como configurar" onClick={notifyNotConfigured} />
            ) : null}
          </Flex>
        </Stack>
      </Box>
    </Dialog>
  );
}

export const nanoBananaImageAssetSource: AssetSource = {
  name: "nano-banana",
  title: "Gerar com Nano Banana",
  icon: NanoBananaIcon,
  component: NanoBananaAssetSourceDialog,
};
