#!/usr/bin/env node
/**
 * Falha se o export estático contiver URLs localhost/127.0.0.1 em metadata ou assets.
 * Uso: após `npm run build` com NEXT_PUBLIC_SITE_URL de produção.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");

const FORBIDDEN_PATTERNS = [
  /localhost/i,
  /127\.0\.0\.1/,
];

console.log("--- verify-canonical-urls-build ---");

if (!existsSync(outDir)) {
  console.error("verify-canonical-urls-build: pasta out/ não encontrada — corre npm run build primeiro");
  process.exit(1);
}

/** @param {string} dir */
function walk(dir) {
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === "_next") {
        continue;
      }
      files.push(...walk(full));
    } else if (/\.(html|xml)$/.test(entry) || entry === "llms.txt" || entry === "robots.txt") {
      files.push(full);
    }
  }
  return files;
}

/** @type {{ file: string; pattern: string }[]} */
const hits = [];

for (const file of walk(outDir)) {
  const content = readFileSync(file, "utf8");
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(content)) {
      hits.push({ file: file.replace(`${root}/`, ""), pattern: pattern.source });
      break;
    }
  }
}

if (hits.length > 0) {
  console.error("verify-canonical-urls-build: URLs locais encontradas no export:");
  for (const hit of hits.slice(0, 20)) {
    console.error(`  - ${hit.file} (matched ${hit.pattern})`);
  }
  if (hits.length > 20) {
    console.error(`  … e mais ${hits.length - 20} ficheiro(s)`);
  }
  console.error(
    "Defina NEXT_PUBLIC_SITE_URL=https://plataforma.4unik.com.br/landing/ no build (ver docs/site-url-migration.md).",
  );
  process.exit(1);
}

console.log("✓ export HTML/XML sem localhost/127.0.0.1 (metadata e artefactos públicos)");
