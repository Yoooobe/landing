#!/usr/bin/env node
/**
 * Rasterizes OG SVG templates to 1200×630 PNG for social crawlers.
 * Run via `npm run generate:og` (also before `next build`).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const ogDir = join(root, "public", "og");

const VARIANTS = [
  { id: "4unik-default", subtitle: "Gamification, catalog, API, and fulfillment in one place." },
  { id: "4unik-home", subtitle: "Reward infrastructure for teams and platforms." },
  { id: "4unik-plataforma", subtitle: "Corporate store, missions, and manager dashboards." },
  { id: "4unik-api", subtitle: "API, webhooks, and native integrations." },
  { id: "4unik-gamificacao", subtitle: "Gamification engine for engagement programs." },
  { id: "4unik-casos", subtitle: "Use cases and enterprise programs." },
  { id: "4unik-inteligencia", subtitle: "AI for campaigns and recommendations." },
];

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSvg(subtitle) {
  const sub = escapeXml(subtitle);
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" rx="32" fill="#07101D"/>
  <circle cx="955" cy="166" r="195" fill="#1F6FFF" fill-opacity="0.18"/>
  <circle cx="284" cy="542" r="226" fill="#F97316" fill-opacity="0.22"/>
  <circle cx="701" cy="484" r="167" fill="#56D5FF" fill-opacity="0.12"/>
  <rect x="72" y="72" width="1056" height="486" rx="28" fill="url(#panelGradient)" stroke="#FFFFFF" stroke-opacity="0.10"/>
  <text x="120" y="212" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="700" letter-spacing="0.2em">4UNIK</text>
  <text x="120" y="320" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="800">Reward infrastructure</text>
  <text x="120" y="404" fill="#A9B4C6" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="500">${sub}</text>
  <rect x="120" y="458" width="286" height="56" rx="28" fill="#F97316"/>
  <text x="164" y="494" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700">4unik.com</text>
  <defs>
    <linearGradient id="panelGradient" x1="72" y1="72" x2="1128" y2="558" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0D1728"/>
      <stop offset="1" stop-color="#101827"/>
    </linearGradient>
  </defs>
</svg>`;
}

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("generate-og-images: install sharp (npm install sharp --save-dev)");
    process.exit(1);
  }

  if (!existsSync(ogDir)) {
    mkdirSync(ogDir, { recursive: true });
  }

  const baseSvgPath = join(ogDir, "4unik-default.svg");
  if (existsSync(baseSvgPath)) {
    await sharp(readFileSync(baseSvgPath))
      .resize(1200, 630)
      .png()
      .toFile(join(ogDir, "4unik-default.png"));
    console.log("generate-og-images: 4unik-default.png (from SVG)");
  }

  for (const { id, subtitle } of VARIANTS) {
    const svg = buildSvg(subtitle);
    const outPath = join(ogDir, `${id}.png`);
    await sharp(Buffer.from(svg)).resize(1200, 630).png().toFile(outPath);
    console.log(`generate-og-images: ${id}.png`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
