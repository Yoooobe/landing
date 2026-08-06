#!/usr/bin/env node
/**
 * Script para gerar imagem usando a Nano Banana API.
 * Aceita prompt e aspectRatio via argumentos da linha de comando.
 * Salva a imagem em assets/generated_images/ e retorna o caminho.
 *
 * Uso:
 *   node tools/generate-nano-banana-image.mjs "Seu prompt aqui" "4:5" "nome_arquivo"
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const endpoint =
  process.env.SANITY_STUDIO_NANO_BANANA_URL?.trim() ||
  "https://nano-banana-api-pi.vercel.app/api/generate";

const origin = "https://yoooobe.github.io"; // Mantém o Origin para compatibilidade

const prompt = process.argv[2];
const aspectRatio = process.argv[3] || "4:5";
const filename = process.argv[4] || `image-${Date.now()}.png`;

if (!prompt) {
  console.error("ERRO: O prompt é obrigatório.");
  process.exit(1);
}

const body = JSON.stringify({
  prompt: prompt,
  aspectRatio: aspectRatio,
});

async function generateImage() {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
      },
      body,
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("ERRO: Resposta da API não é JSON:", text.slice(0, 500));
      process.exit(1);
    }

    if (!res.ok || typeof data.imageBase64 !== "string" || !data.mimeType?.startsWith("image/")) {
      console.error("FALHA na geração da imagem:", data);
      process.exit(1);
    }

    const imageBuffer = Buffer.from(data.imageBase64, 'base64');
    const outputDir = join(__dirname, '..', 'assets', 'generated_images');
    mkdirSync(outputDir, { recursive: true });
    const outputPath = join(outputDir, filename);
    writeFileSync(outputPath, imageBuffer);

    console.log(`IMAGEM GERADA: ${outputPath}`);
    process.exit(0);
  } catch (e) {
    console.error("ERRO ao conectar com a API Nano Banana:", e.message);
    process.exit(1);
  }
}

generateImage();
