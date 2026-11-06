#!/usr/bin/env node
/**
 * Varre out/**\/*.html e falha se algum href/src interno não tiver arquivo
 * correspondente no export, ou se ainda apontar para prefixos legados (/en/, /landing/).
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = process.argv[2] ? join(process.cwd(), process.argv[2]) : join(root, "out");

if (!existsSync(join(outDir, "index.html"))) {
  console.error(`check-internal-links: ${outDir}/index.html não encontrado — rode npm run build`);
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function resolves(pathname) {
  const clean = decodeURIComponent(pathname.replace(/^\//, ""));
  const target = join(outDir, clean);
  if (pathname.endsWith("/")) return existsSync(join(target, "index.html"));
  return existsSync(target) || existsSync(`${target}.html`) || existsSync(join(target, "index.html"));
}

const ATTR = /\s(?:href|src)="(\/[^"]*)"/g;
const problems = new Map();
for (const file of walk(outDir)) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(ATTR)) {
    const raw = m[1].replace(/&amp;/g, "&");
    if (raw.startsWith("//")) continue;
    const pathname = raw.split(/[?#]/)[0];
    if (pathname.startsWith("/_next/") || pathname.startsWith("/studio")) continue;
    const legacy = /^\/(en|landing)(\/|$)/.test(pathname);
    if (legacy || !resolves(pathname)) {
      const key = `${legacy ? "LEGACY " : ""}${pathname}`;
      if (!problems.has(key)) problems.set(key, relative(outDir, file));
    }
  }
}

if (problems.size) {
  console.error(`check-internal-links: ${problems.size} link(s) quebrado(s):`);
  for (const [link, file] of problems) console.error(`  ${link}  (ex.: ${file})`);
  process.exit(1);
}
console.log("check-internal-links: OK");
