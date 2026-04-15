#!/usr/bin/env npx tsx
/**
 * Ferramenta para normalizar URLs de imagens externas (ex. Unsplash) com os mesmos
 * parâmetros que o blog usa no export estático (w/h, fit=crop, crop=entropy, q).
 *
 * Uso:
 *   npx tsx scripts/blog-image-presets.ts --url "https://images.unsplash.com/photo-..."
 *   npx tsx scripts/blog-image-presets.ts --url "..." --preset inlineFigure
 *
 * Saída: uma linha por preset (ou só o preset pedido) — copiar para fallback, CMS ou markdown.
 */
import { BLOG_IMAGE_PRESETS, type BlogImagePreset, optimizeBlogDirectUrl } from "../src/lib/blogImageUrl";

const PRESET_ORDER: BlogImagePreset[] = [
  "articleCover",
  "inlineFigure",
  "cardThumb",
  "featuredSplit",
  "ctaFeature",
];

function getArg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  if (i === -1 || !process.argv[i + 1]) return undefined;
  return process.argv[i + 1];
}

function main() {
  const url = getArg("--url");
  const presetArg = getArg("--preset") as BlogImagePreset | undefined;

  if (!url || process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(`blog-image-presets — URLs alinhadas ao blog (static export)

Opções:
  --url <https://...>   URL da imagem (obrigatório)
  --preset <nome>       Só este preset: ${PRESET_ORDER.join(", ")}

Sem --preset, imprime todos os presets.
`);
    process.exit(url ? 0 : 1);
  }

  const list: BlogImagePreset[] =
    presetArg && presetArg in BLOG_IMAGE_PRESETS ? [presetArg] : PRESET_ORDER;

  for (const p of list) {
    const out = optimizeBlogDirectUrl(url, p);
    const { width, height, crop, quality } = BLOG_IMAGE_PRESETS[p];
    console.log(`${p}\t${width}×${height}\tcrop=${crop}\tq=${quality}\n${out}\n`);
  }
}

main();
