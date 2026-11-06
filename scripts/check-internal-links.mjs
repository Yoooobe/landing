#!/usr/bin/env node
/**
 * Varre o export (out/) e falha se algum link interno não tiver arquivo correspondente:
 * - href/src começando com "/" em .html (e prefixos legados /en/, /landing/);
 * - href relativo (sem "/", "#", http, mailto:, tel:, data:, javascript:);
 * - URLs absolutas do próprio site (origem de NEXT_PUBLIC_SITE_URL) em .html, .txt e .xml.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = process.argv[2] ? resolve(process.argv[2]) : join(root, "out");

if (!existsSync(join(outDir, "index.html"))) {
  console.error(`check-internal-links: ${outDir}/index.html não encontrado — rode npm run build`);
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(html|txt|xml)$/.test(name) && !name.startsWith("__next.") && name !== "index.txt") acc.push(p);
  }
  return acc;
}

function resolves(pathname) {
  const clean = decodeURIComponent(pathname.replace(/^\//, ""));
  const target = join(outDir, clean);
  if (pathname.endsWith("/")) return existsSync(join(target, "index.html"));
  return existsSync(target) || existsSync(`${target}.html`) || existsSync(join(target, "index.html"));
}

const ATTR = /\s(?:href|src)="([^"]*)"/g;
const siteOrigin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    JSON.parse(readFileSync(join(root, "config", "public-site.json"), "utf8")).defaultSiteUrl,
).origin;
const ABS = new RegExp(`${siteOrigin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\/[^\\s"'<>)\\]\\\\]*)?`, "g");
const problems = new Map();
const note = (key, file) => {
  if (!problems.has(key)) problems.set(key, relative(outDir, file));
};

for (const file of walk(outDir)) {
  const text = readFileSync(file, "utf8");
  if (file.endsWith(".html")) {
    for (const m of text.matchAll(ATTR)) {
      const raw = m[1].replace(/&amp;/g, "&");
      if (!raw || raw.startsWith("#") || raw.startsWith("//") || /^(https?:|mailto:|tel:|data:|javascript:|blob:)/i.test(raw)) continue;
      if (!raw.startsWith("/")) {
        note(`RELATIVE ${raw}`, file);
        continue;
      }
      const pathname = raw.split(/[?#]/)[0];
      if (pathname.startsWith("/_next/") || pathname.startsWith("/studio")) continue;
      const legacy = /^\/(en|landing)(\/|$)/.test(pathname);
      if (legacy || !resolves(pathname)) note(`${legacy ? "LEGACY " : ""}${pathname}`, file);
    }
  }
  for (const m of text.matchAll(ABS)) {
    const pathname = (m[1] || "/").split(/[?#]/)[0].replace(/[.,;:]+$/, "");
    if (pathname.startsWith("/_next/") || pathname.startsWith("/studio")) continue;
    if (/^\/(en|landing)(\/|$)/.test(pathname) || !resolves(pathname)) note(`ABS ${pathname}`, file);
  }
}

if (problems.size) {
  console.error(`check-internal-links: ${problems.size} link(s) quebrado(s):`);
  for (const [link, file] of problems) console.error(`  ${link}  (ex.: ${file})`);
  process.exit(1);
}
console.log("check-internal-links: OK");
