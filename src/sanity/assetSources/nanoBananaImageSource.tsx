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
 * - **Response (opção A):** corpo binário `image/png` ou `image/jpeg` (ou outro tipo em `Content-Type`).
 * - **Response (opção B):** JSON com um destes campos (primeiro encontrado é usado):
 *   - `imageBase64`, `base64`, ou `image` — string base64 pura ou data URL `data:image/...;base64,...`.
 *   - Opcional: `mimeType` (ex.: `image/png`) quando o JSON só traz base64 sem prefixo.
 *
 * Após obter bytes, o asset é enviado ao projeto com `client.assets.upload("image", file)` e o
 * campo passa a referenciar o novo documento de asset.
 */
import type { AssetFromSource, AssetSource, AssetSourceComponentProps } from "@sanity/types";
import { Box, Button, Dialog, Flex, Stack, Text, TextArea, useToast } from "@sanity/ui";
import { Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { useClient } from "sanity";

const STUDIO_API_VERSION = "2024-01-01";

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
  const [loading, setLoading] = useState(false);

  const endpoint = getNanoBananaEndpoint();

  const notifyNotConfigured = useCallback(() => {
    toast.push({
      status: "warning",
      title: "Nano Banana",
      description:
        "Configure SANITY_STUDIO_NANO_BANANA_URL no ambiente e faça rebuild (ver next.config.ts e comentário em nanoBananaImageSource.tsx).",
    });
  }, [toast]);

  const handleGenerate = useCallback(async () => {
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

    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const blob = await parseImageResponse(res);
      const ext = blob.type.includes("jpeg") || blob.type.includes("jpg") ? "jpg" : "png";
      const file = new File([blob], `nano-banana-${Date.now()}.${ext}`, {
        type: blob.type || "image/png",
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
        description: e instanceof Error ? e.message : "Falha ao gerar ou enviar a imagem.",
      });
    } finally {
      setLoading(false);
    }
  }, [client, endpoint, notifyNotConfigured, onClose, onSelect, prompt, toast]);

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
            Descreva a imagem. Com endpoint configurado, o Studio envia um POST JSON com o campo{" "}
            <code>prompt</code> para a variável <code>SANITY_STUDIO_NANO_BANANA_URL</code>.
          </Text>
          <TextArea
            rows={5}
            value={prompt}
            onChange={(event) => setPrompt(event.currentTarget.value)}
            placeholder="Ex.: Hero escuro com diagrama de API e código TypeScript…"
          />
          <Flex gap={3} wrap="wrap">
            <Button
              tone="primary"
              text="Gerar e aplicar"
              loading={loading}
              disabled={loading}
              onClick={handleGenerate}
            />
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
