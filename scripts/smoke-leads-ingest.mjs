#!/usr/bin/env node
/**
 * Smoke test: leads ingest API + formulários ICP na exportação estática.
 *
 * Uso:
 *   npm run smoke:leads-ingest
 *   NEXT_PUBLIC_LEADS_INGEST_URL=https://…/api/ingest npm run smoke:leads-ingest
 *   npm run smoke:leads-ingest -- --production-pages   # verifica URL embutida nas 5 ICPs live
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(readFileSync(join(root, "config/leads-ingest.json"), "utf8"));

const ingestUrl = (process.env.NEXT_PUBLIC_LEADS_INGEST_URL ?? config.defaultIngestUrl).trim();
const origin = process.env.SMOKE_LEADS_ORIGIN?.trim() || "https://plataforma.4unik.com.br";
const checkProductionPages = process.argv.includes("--production-pages");

const ICP_PATHS = [
  "/landing/para-plataformas/",
  "/landing/educacao/",
  "/landing/vendas/",
  "/landing/comunidades/",
  "/landing/eventos/",
];

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

console.log("--- smoke-leads-ingest ---");
console.log("ingest URL:", ingestUrl);
console.log("Origin:", origin);

// 1) API POST
const body = JSON.stringify({
  name: "Smoke Test",
  email: "smoke-leads@4unik.com.br",
  company: "4Unik QA",
  consent: true,
  source: "smoke-leads-ingest",
  locale: "pt",
});

const res = await fetch(ingestUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json", Origin: origin },
  body,
});

const text = await res.text();
let data;
try {
  data = JSON.parse(text);
} catch {
  console.error("FAIL: resposta da API não é JSON");
  console.error("HTTP", res.status, text.slice(0, 500));
  process.exit(1);
}

if (!res.ok || data.ok !== true) {
  console.error("FAIL: esperado HTTP 200 + { ok: true }");
  console.error("HTTP", res.status, data);
  process.exit(1);
}

console.log("OK API ingest");
console.log("  sanityId:", data.sanityId ?? "(n/a)");
if (data.emailErrors?.length) {
  console.log("  email warnings:", data.emailErrors.join("; "));
}

// 2) Export local (se existir out/)
const outDir = join(root, "out");
if (existsSync(outDir)) {
  const haystack = walk(outDir);
  const found = haystack.some((file) => readFileSync(file, "utf8").includes(ingestUrl));
  if (!found) {
    console.error(
      `FAIL: URL de ingest não encontrada em out/ — corre build com NEXT_PUBLIC_LEADS_INGEST_URL ou fallback config/leads-ingest.json`,
    );
    process.exit(1);
  }
  console.log("OK URL embutida no export local (out/)");
} else {
  console.log("SKIP export local — pasta out/ ausente (corre npm run build antes para verificar embed)");
}

// 3) Páginas ICP em produção (opcional)
if (checkProductionPages) {
  const siteOrigin = process.env.SMOKE_SITE_ORIGIN?.trim() || "https://plataforma.4unik.com.br";
  let failures = 0;
  for (const path of ICP_PATHS) {
    const pageUrl = `${siteOrigin}${path}`;
    const pageRes = await fetch(pageUrl);
    if (!pageRes.ok) {
      console.error(`FAIL ${path}: HTTP ${pageRes.status}`);
      failures++;
      continue;
    }
    const html = await pageRes.text();
    const hasForm = html.includes('id="contato"') || html.includes("Enviar pedido de contato");
    if (!hasForm) {
      console.error(`FAIL ${path}: formulário de contacto não encontrado`);
      failures++;
      continue;
    }

    let hasIngestUrl = html.includes(ingestUrl) || html.includes("leads-ingest-api");
    if (!hasIngestUrl) {
      const chunks = [
        ...new Set([...html.matchAll(/_next\/static\/chunks\/[^"]+\.js/g)].map((m) => m[0])),
      ];
      const maxChunks = 40;
      for (const chunk of chunks.slice(0, maxChunks)) {
        const chunkRes = await fetch(`${siteOrigin}/landing/${chunk}`);
        if (!chunkRes.ok) continue;
        const js = await chunkRes.text();
        if (js.includes(ingestUrl) || js.includes("leads-ingest-api")) {
          hasIngestUrl = true;
          break;
        }
      }
    }
    if (!hasIngestUrl) {
      console.error(
        `FAIL ${path}: ${ingestUrl} não embutida no HTML/chunks — rebuild com secret ou fallback config`,
      );
      failures++;
      continue;
    }
    console.log(`OK ${path}`);
  }
  if (failures > 0) {
    process.exit(1);
  }
}

console.log("smoke-leads-ingest: all checks passed");
