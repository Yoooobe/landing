#!/usr/bin/env node
/**
 * Verifica que o export estático indexa `/pricing/` e `/seguranca/` quando
 * `NEXT_PUBLIC_INDEX_GROWTH_PAGES=true` no build.
 * Uso: após `npm run build` com a variável no ambiente.
 */
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");
const growthIndexEnabled = process.env.NEXT_PUBLIC_INDEX_GROWTH_PAGES === "true";

const GROWTH_PATHS = [
  "/pricing/",
  "/en/pricing/",
  "/seguranca/",
  "/en/seguranca/",
];

const GROWTH_HTML_PATHS = [
  ["pricing/index.html", "/pricing/"],
  ["en/pricing/index.html", "/en/pricing/"],
  ["seguranca/index.html", "/seguranca/"],
  ["en/seguranca/index.html", "/en/seguranca/"],
];

console.log("--- verify-growth-index-build ---");

if (!growthIndexEnabled) {
  console.log(
    "::warning::NEXT_PUBLIC_INDEX_GROWTH_PAGES não é 'true' — /pricing/ e /seguranca/ exportam com noindex e ficam fora do sitemap. Após sign-off em docs/content-approval-queue.md, define o secret no deploy.",
  );
  process.exit(0);
}

if (!existsSync(outDir)) {
  console.error("verify-growth-index-build: pasta out/ não encontrada — corre npm run build primeiro");
  process.exit(1);
}

const sitemapPath = join(outDir, "sitemap.xml");
if (!existsSync(sitemapPath)) {
  console.error("verify-growth-index-build: out/sitemap.xml não encontrado");
  process.exit(1);
}

const sitemap = readFileSync(sitemapPath, "utf8");
const missingFromSitemap = GROWTH_PATHS.filter((path) => !sitemap.includes(path));

if (missingFromSitemap.length > 0) {
  console.error(
    `verify-growth-index-build: sitemap.xml não inclui URLs de crescimento: ${missingFromSitemap.join(", ")}`,
  );
  process.exit(1);
}

for (const [relativePath, label] of GROWTH_HTML_PATHS) {
  const htmlPath = join(outDir, relativePath);
  if (!existsSync(htmlPath)) {
    console.error(`verify-growth-index-build: export em falta para ${label} (${relativePath})`);
    process.exit(1);
  }
  const html = readFileSync(htmlPath, "utf8");
  if (html.includes('content="noindex') || html.includes("noindex, nofollow")) {
    console.error(`verify-growth-index-build: ${label} exporta com noindex apesar de NEXT_PUBLIC_INDEX_GROWTH_PAGES=true`);
    process.exit(1);
  }
  if (!html.includes('content="index, follow"') && !html.includes('content="index,follow"')) {
    console.error(`verify-growth-index-build: ${label} não tem meta robots index,follow no export`);
    process.exit(1);
  }
}

console.log("✓ Growth pages indexáveis: sitemap inclui pricing/seguranca PT+EN e robots=index,follow no export");
process.exit(0);
