#!/usr/bin/env node
/**
 * Verifica que o export estático embute `NEXT_PUBLIC_LEADS_INGEST_URL` quando definida no build.
 * Uso: após `npm run build` com a variável no ambiente.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");
const config = JSON.parse(readFileSync(join(root, "config/leads-ingest.json"), "utf8"));
const ingestUrl = (process.env.NEXT_PUBLIC_LEADS_INGEST_URL ?? config.defaultIngestUrl ?? "").trim();

console.log("--- verify-leads-ingest-build ---");

if (!ingestUrl) {
  console.log(
    "::warning::NEXT_PUBLIC_LEADS_INGEST_URL vazio e sem fallback em config/leads-ingest.json — formulários ICP/home falham após export estático. Ver docs/leads-ingest.md",
  );
  process.exit(0);
}

if (!existsSync(outDir)) {
  console.error("verify-leads-ingest-build: pasta out/ não encontrada — corre npm run build primeiro");
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
      files.push(...walk(full));
    } else if (/\.(html|js|json|txt)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

const haystack = walk(outDir);
const found = haystack.some((file) => readFileSync(file, "utf8").includes(ingestUrl));

if (!found) {
  console.error(
    `verify-leads-ingest-build: URL de ingest não encontrada no export (${ingestUrl}). Confirma NEXT_PUBLIC_LEADS_INGEST_URL no passo de build.`,
  );
  process.exit(1);
}

console.log(`✓ NEXT_PUBLIC_LEADS_INGEST_URL embutida no export (${ingestUrl.length} chars)`);
process.exit(0);
