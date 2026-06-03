#!/usr/bin/env node
/**
 * Compõe screenshots existentes (public/screens) em mockups enquadrados,
 * com chrome de browser e brilho de acento por vertical, para as páginas
 * "Soluções por perfil" (ICP). Saída em public/screens/icp/*.webp.
 *
 * Rodar via `npm run generate:icp-screens`. Requer `sharp` (devDependency).
 * Revisão humana obrigatória após gerar (contraste, legibilidade, sem dados
 * sensíveis nos screenshots fonte).
 */
import { existsSync, mkdirSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const screensDir = join(root, "public", "screens");
const outDir = join(screensDir, "icp");

/** @typedef {{ outName: string; source: string; width: number; height: number; label: string }} VariantSpec */

/** Cada slug define acento (glows) + 3 variantes (hero/how/benefits). */
const PROFILES = {
  "para-plataformas": {
    accent: "#2563eb",
    accentSoft: "#22d3ee",
    variants: [
      { key: "hero", source: "api-integracoes-hero-composite.jpg", label: "api.4unik.io" },
      { key: "how", source: "admin-campaign-products.webp", label: "gestor.4unik.io · catálogo" },
      { key: "benefits", source: "member-store-home.webp", label: "loja no seu app" },
    ],
  },
  educacao: {
    accent: "#8338ec",
    accentSoft: "#d946ef",
    variants: [
      { key: "hero", source: "member-points.webp", label: "app.4unik.io · trilha" },
      { key: "how", source: "gamif-niveis.webp", label: "gestor.4unik.io · níveis" },
      { key: "benefits", source: "member-store-home.webp", label: "loja de recompensas" },
    ],
  },
  vendas: {
    accent: "#f98f16",
    accentSoft: "#ef476f",
    variants: [
      { key: "hero", source: "admin-dashboard.webp", label: "gestor.4unik.io · metas" },
      { key: "how", source: "admin-campaign-config-desktop.webp", label: "gestor.4unik.io · campanha" },
      { key: "benefits", source: "member-points.webp", label: "premiação na hora" },
    ],
  },
  comunidades: {
    accent: "#ef476f",
    accentSoft: "#8338ec",
    variants: [
      { key: "hero", source: "member-store-home.webp", label: "loja.4unik.io · VIP" },
      { key: "how", source: "member-points.webp", label: "loja.4unik.io · engajamento" },
      { key: "benefits", source: "member-orders.webp", label: "loja.4unik.io · pedidos" },
    ],
  },
  eventos: {
    accent: "#22d3ee",
    accentSoft: "#2563eb",
    variants: [
      { key: "hero", source: "pix-step-1-banks.webp", label: "loja.4unik.io · evento" },
      { key: "how", source: "pix-step-2-form.webp", label: "checkout no celular" },
      // success layout tem a confirmação na coluna direita: ancorar o crop à direita.
      { key: "benefits", source: "pix-step-3-success.webp", label: "resgate confirmado", position: "right top" },
    ],
  },
};

const DIMS = {
  hero: { width: 1280, height: 860 },
  how: { width: 1100, height: 820 },
  benefits: { width: 1100, height: 820 },
};

function hexToRgb(hex) {
  const v = hex.replace("#", "");
  return {
    r: parseInt(v.slice(0, 2), 16),
    g: parseInt(v.slice(2, 4), 16),
    b: parseInt(v.slice(4, 6), 16),
  };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** SVG do fundo: gradiente escuro, glows de acento, grade e janela com chrome. */
function backgroundSvg({ width, height, accent, accentSoft, label, win, chromeH }) {
  const label0 = escapeXml(label);
  return Buffer.from(`<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#070d18"/>
      <stop offset="1" stop-color="#0b1426"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.82" cy="0.12" r="0.7">
      <stop stop-color="${rgba(accent, 0.45)}"/>
      <stop offset="1" stop-color="${rgba(accent, 0)}"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.1" cy="0.92" r="0.7">
      <stop stop-color="${rgba(accentSoft, 0.3)}"/>
      <stop offset="1" stop-color="${rgba(accentSoft, 0)}"/>
    </radialGradient>
    <linearGradient id="winFill" x1="0" y1="${win.y}" x2="0" y2="${win.y + win.h}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0e1828"/>
      <stop offset="1" stop-color="#0b1320"/>
    </linearGradient>
    <pattern id="grid" width="38" height="38" patternUnits="userSpaceOnUse">
      <path d="M38 0H0V38" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <rect width="${width}" height="${height}" fill="url(#glowA)"/>
  <rect width="${width}" height="${height}" fill="url(#glowB)"/>
  <rect x="${win.x}" y="${win.y}" width="${win.w}" height="${win.h}" rx="22" fill="url(#winFill)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <path d="M${win.x} ${win.y + 22} Q${win.x} ${win.y} ${win.x + 22} ${win.y} H${win.x + win.w - 22} Q${win.x + win.w} ${win.y} ${win.x + win.w} ${win.y + 22} V${win.y + chromeH} H${win.x} Z" fill="rgba(255,255,255,0.04)"/>
  <circle cx="${win.x + 26}" cy="${win.y + chromeH / 2}" r="6" fill="#ff5f57"/>
  <circle cx="${win.x + 48}" cy="${win.y + chromeH / 2}" r="6" fill="#febc2e"/>
  <circle cx="${win.x + 70}" cy="${win.y + chromeH / 2}" r="6" fill="#28c840"/>
  <rect x="${win.x + 96}" y="${win.y + chromeH / 2 - 13}" width="${Math.min(360, win.w - 130)}" height="26" rx="13" fill="rgba(255,255,255,0.06)"/>
  <text x="${win.x + 116}" y="${win.y + chromeH / 2 + 5}" fill="rgba(255,255,255,0.55)" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="500">${label0}</text>
</svg>`);
}

/** Máscara com cantos inferiores arredondados (topo encosta no chrome). */
function bottomRoundedMask(w, h, r) {
  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0 H${w} V${h - r} Q${w} ${h} ${w - r} ${h} H${r} Q0 ${h} 0 ${h - r} Z" fill="#fff"/>
</svg>`);
}

async function buildVariant(sharp, { width, height, accent, accentSoft, label, sourcePath, outPath, position = "top" }) {
  const margin = Math.round(width * 0.055);
  const chromeH = 46;
  const win = { x: margin, y: margin, w: width - margin * 2, h: height - margin * 2 };
  const content = {
    x: win.x + 1,
    y: win.y + chromeH,
    w: win.w - 2,
    h: win.h - chromeH - 1,
  };

  const shot = await sharp(readFileSync(sourcePath))
    .resize(content.w, content.h, { fit: "cover", position })
    .composite([{ input: bottomRoundedMask(content.w, content.h, 20), blend: "dest-in" }])
    .png()
    .toBuffer();

  const bg = backgroundSvg({ width, height, accent, accentSoft, label, win, chromeH });

  await sharp(bg)
    .composite([{ input: shot, top: content.y, left: content.x }])
    .webp({ quality: 82 })
    .toFile(outPath);
}

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("generate-icp-showcase-images: instale sharp (npm install sharp --save-dev)");
    process.exit(1);
  }

  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  let created = 0;
  let skipped = 0;
  for (const [slug, profile] of Object.entries(PROFILES)) {
    for (const variant of profile.variants) {
      const sourcePath = join(screensDir, variant.source);
      if (!existsSync(sourcePath)) {
        console.warn(`generate-icp-showcase-images: fonte ausente, pulando ${slug}/${variant.key} (${variant.source})`);
        skipped += 1;
        continue;
      }
      const { width, height } = DIMS[variant.key];
      const outPath = join(outDir, `${slug}-${variant.key}.webp`);
      await buildVariant(sharp, {
        width,
        height,
        accent: profile.accent,
        accentSoft: profile.accentSoft,
        label: variant.label,
        sourcePath,
        outPath,
        position: variant.position,
      });
      created += 1;
      console.log(`generate-icp-showcase-images: ${slug}-${variant.key}.webp`);
    }
  }
  console.log(`generate-icp-showcase-images: ${created} imagens geradas, ${skipped} puladas.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
