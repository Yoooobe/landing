#!/usr/bin/env node
/**
 * Aplica <link rel="canonical"> apontando para o yoobe.co nas páginas EN já publicadas do 4unik
 * (checkout do branch gh-pages), sem rebuild. Só toca arquivos en/**\/index.html presentes no mapa.
 *
 * uso: node scripts/apply-yoobe-canonical.mjs <dir gh-pages> <yoobe-canonical-map.json>
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const CANONICAL = /<link rel="canonical" href="[^"]*"\s*\/?>/;

export function applyCanonical(html, url) {
  const tag = `<link rel="canonical" href="${url}"/>`;
  if (CANONICAL.test(html)) return html.replace(CANONICAL, tag);
  return html.replace("</head>", `${tag}</head>`);
}

/** Páginas en/**\/index.html (paths relativos ao site) sem entrada no mapa. */
export function listUnmapped(files, map) {
  return files
    .filter((f) => f.startsWith("en/") && f.endsWith("/index.html") || f === "en/index.html")
    .map((f) => `/${f.replace(/index\.html$/, "")}`)
    .filter((p) => !(p in map));
}

function walkHtml(dir, base = dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkHtml(p, base, acc);
    else if (name === "index.html") acc.push(relative(base, p));
  }
  return acc;
}

if (process.argv[1]?.endsWith("apply-yoobe-canonical.mjs") && process.argv[2]) {
  const [dir, mapPath] = process.argv.slice(2);
  const map = JSON.parse(readFileSync(mapPath, "utf8"));
  const unmapped = listUnmapped(walkHtml(dir), map);
  if (unmapped.length) {
    console.error(`apply-yoobe-canonical: páginas EN sem mapa: ${unmapped.join(", ")}`);
    process.exit(1);
  }
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
