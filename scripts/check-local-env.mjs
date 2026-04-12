#!/usr/bin/env node
/**
 * Valida variáveis mínimas para o Sanity Studio (sem imprimir segredos).
 * Lê .env.local com parser simples e cruza com process.env.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envLocalPath = join(root, ".env.local");

const PLACEHOLDER_IDS = new Set(["", "your-project-id", "placeholder", "xxx", "changeme"]);

/** @param {string} line */
function parseLine(line) {
  const t = line.trim();
  if (!t || t.startsWith("#")) return null;
  const eq = t.indexOf("=");
  if (eq <= 0) return null;
  const key = t.slice(0, eq).trim();
  let val = t.slice(eq + 1).trim();
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    val = val.slice(1, -1);
  }
  return { key, val };
}

function loadDotEnvLocal() {
  /** @type {Record<string, string>} */
  const out = { ...process.env };
  if (!existsSync(envLocalPath)) return out;
  const text = readFileSync(envLocalPath, "utf8");
  for (const line of text.split("\n")) {
    const p = parseLine(line);
    if (p) out[p.key] = p.val;
  }
  return out;
}

const env = loadDotEnvLocal();

const pid = (env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "").trim();
const ds = (env.NEXT_PUBLIC_SANITY_DATASET ?? "").trim();
const pidBad = !pid || PLACEHOLDER_IDS.has(pid.toLowerCase());
const dsBad = !ds;

console.log("--- check-local-env ---");
if (!existsSync(envLocalPath)) {
  console.log("⚠ Não há .env.local — corre: npm run env:init");
} else {
  console.log("✓ .env.local encontrado");
}

if (pidBad) {
  console.log("✗ NEXT_PUBLIC_SANITY_PROJECT_ID: falta ou ainda é placeholder");
} else {
  console.log(`✓ NEXT_PUBLIC_SANITY_PROJECT_ID: definido (${pid.length} chars)`);
}

if (dsBad) {
  console.log("✗ NEXT_PUBLIC_SANITY_DATASET: falta ou vazio");
} else {
  console.log(`✓ NEXT_PUBLIC_SANITY_DATASET: ${ds}`);
}

const site = (env.NEXT_PUBLIC_SITE_URL ?? "").trim();
if (site) {
  console.log(`✓ NEXT_PUBLIC_SITE_URL: definido`);
} else {
  console.log("○ NEXT_PUBLIC_SITE_URL: vazio (usa fallback em config/public-site.json)");
}

const nano = (env.SANITY_STUDIO_NANO_BANANA_URL ?? "").trim();
if (nano) {
  console.log("○ SANITY_STUDIO_NANO_BANANA_URL: definido (Nano Banana no Studio)");
} else {
  console.log("○ SANITY_STUDIO_NANO_BANANA_URL: vazio (Nano Banana desativado no bundle)");
}

const ok = !pidBad && !dsBad;
console.log("---");
if (ok) {
  console.log("OK — reinicia `npm run dev` e abre http://localhost:3000/landing/studio/");
  process.exit(0);
}

console.log("Falta configurar o Sanity acima. Depois: GitHub → Settings → Secrets → Actions");
console.log("(NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SITE_URL, …)");
process.exit(1);
