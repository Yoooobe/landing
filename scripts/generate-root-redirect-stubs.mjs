#!/usr/bin/env node
/**
 * O proxy nginx mapeia `/` → gh-pages `/landing/plataforma/$uri`, então URLs de
 * raiz do domínio (ex. /blog/, /eventos/) caem em /landing/plataforma/<rota>/ e
 * davam 404. Gera stubs de redirect em out/plataforma/<rota>/index.html para
 * cada rota do sitemap que não exista como subrota real de /plataforma.
 * Workaround até aplicar infra/plataforma-4unik-nginx-redirects.conf (301 real).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");
const sitemapPath = join(outDir, "sitemap.xml");

console.log("--- generate-root-redirect-stubs ---");

if (!existsSync(sitemapPath)) {
  console.error("generate-root-redirect-stubs: out/sitemap.xml não encontrado — corre next build primeiro");
  process.exit(1);
}

const sitemap = readFileSync(sitemapPath, "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

/** @param {string} loc */
function routeFromLoc(loc) {
  const pathname = new URL(loc).pathname;
  const rel = pathname.replace(/^\/landing\/?/, "");
  return rel.replace(/\/$/, "");
}

function stubHtml(target, lang) {
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0;url=${target}">
<title>Redirecionando…</title>
</head>
<body><p><a href="${target}">Continuar para 4Unik</a></p></body>
</html>
`;
}

let created = 0;
let skipped = 0;

for (const loc of locs) {
  const route = routeFromLoc(loc);
  if (!route) {
    continue;
  }
  const stubDir = join(outDir, "plataforma", route);
  if (existsSync(join(stubDir, "index.html"))) {
    skipped += 1;
    continue;
  }
  const target = `/landing/${route}/`;
  const lang = route === "en" || route.startsWith("en/") ? "en" : "pt-BR";
  mkdirSync(stubDir, { recursive: true });
  writeFileSync(join(stubDir, "index.html"), stubHtml(target, lang));
  created += 1;
}

console.log(`generate-root-redirect-stubs: ${created} stubs criados, ${skipped} rotas já existentes (subrotas reais de /plataforma)`);
