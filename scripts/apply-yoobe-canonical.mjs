#!/usr/bin/env node
/**
 * Aplica <link rel="canonical"> apontando para o yoobe.co nas páginas EN já publicadas do 4unik
 * (checkout do branch gh-pages), sem rebuild. Só toca arquivos en/**\/index.html presentes no mapa.
 *
 * uso: node scripts/apply-yoobe-canonical.mjs <dir gh-pages> <yoobe-canonical-map.json>
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CANONICAL = /<link rel="canonical" href="[^"]*"\s*\/?>/;

export function applyCanonical(html, url) {
  const tag = `<link rel="canonical" href="${url}"/>`;
  if (CANONICAL.test(html)) return html.replace(CANONICAL, tag);
  return html.replace("</head>", `${tag}</head>`);
}

if (process.argv[1]?.endsWith("apply-yoobe-canonical.mjs") && process.argv[2]) {
  const [dir, mapPath] = process.argv.slice(2);
  const map = JSON.parse(readFileSync(mapPath, "utf8"));
  let changed = 0;
  const missing = [];
  for (const [path, url] of Object.entries(map)) {
    if (!path.startsWith("/en/")) continue;
    const file = join(dir, path, "index.html");
    if (!existsSync(file)) {
      missing.push(path);
      continue;
    }
    const html = readFileSync(file, "utf8");
    const out = applyCanonical(html, url);
    if (out !== html) {
      writeFileSync(file, out);
      changed++;
    }
  }
  console.log(`apply-yoobe-canonical: ${changed} páginas EN atualizadas`);
  if (missing.length) console.log(`  sem arquivo no gh-pages: ${missing.join(", ")}`);
}
