#!/usr/bin/env node
/**
 * Verifica que páginas marketing exportadas contêm referência GA4 (preload/RSC ou gtag).
 * Exclui Studio (não deve ter GA). Valida 404.html separadamente (gtag inline).
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const placeholder = "G-XXXXXXXXXX";

function hasGaMarker(html) {
  return (
    html.includes("googletagmanager.com/gtag/js") ||
    (gaId && html.includes(gaId)) ||
    /\bG-[A-Z0-9]{6,}\b/.test(html)
  );
}

async function collectIndexHtmlFiles(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectIndexHtmlFiles(full, base)));
    } else if (entry.name === "index.html") {
      files.push(path.relative(base, full));
    }
  }
  return files;
}

async function main() {
  if (!gaId || gaId === placeholder) {
    console.log("verify-ga-pages: NEXT_PUBLIC_GA_ID ausente ou placeholder — skip.");
    process.exit(0);
  }

  if (!/^G-[A-Z0-9]+$/i.test(gaId)) {
    console.error(`verify-ga-pages: NEXT_PUBLIC_GA_ID inválido: ${gaId}`);
    process.exit(1);
  }

  try {
    await stat(outDir);
  } catch {
    console.error(`verify-ga-pages: pasta não encontrada: ${outDir} (corra npm run build primeiro)`);
    process.exit(1);
  }

  const rootIndex = path.join(outDir, "index.html");
  const allRel = await collectIndexHtmlFiles(outDir);
  const marketing = [];
  const studio = [];
  const missing = [];
  const studioWithGa = [];

  for (const rel of allRel) {
    const normalized = rel.split(path.sep).join("/");
    if (normalized.startsWith("studio/") || normalized === "studio/index.html") {
      studio.push(normalized);
      continue;
    }
    if (normalized.startsWith("404/") || normalized.startsWith("_not-found/")) {
      continue;
    }
    marketing.push(normalized);
  }

  let rootChecked = false;
  try {
    await stat(rootIndex);
    rootChecked = true;
    const html = await readFile(rootIndex, "utf8");
    if (!hasGaMarker(html)) {
      missing.push("index.html");
    }
  } catch {
    /* out/index.html optional if only nested routes */
  }

  for (const rel of marketing) {
    const html = await readFile(path.join(outDir, rel), "utf8");
    if (!hasGaMarker(html)) {
      missing.push(rel);
    }
  }

  for (const rel of studio) {
    const html = await readFile(path.join(outDir, rel), "utf8");
    if (hasGaMarker(html)) {
      studioWithGa.push(rel);
    }
  }

  const notFoundHtml = path.join(outDir, "404.html");
  let notFoundOk = false;
  try {
    const nf = await readFile(notFoundHtml, "utf8");
    notFoundOk =
      nf.includes("googletagmanager.com/gtag/js") && nf.includes(gaId);
  } catch {
    /* handled below */
  }

  let errors = 0;

  if (missing.length > 0) {
    console.error(
      `verify-ga-pages: ${missing.length} página(s) marketing sem GA (${gaId} ou gtag/js):\n  ${missing.join("\n  ")}`,
    );
    errors += 1;
  }

  if (studioWithGa.length > 0) {
    console.error(
      `verify-ga-pages: Studio não deve ter GA — encontrado em:\n  ${studioWithGa.join("\n  ")}`,
    );
    errors += 1;
  }

  if (!notFoundOk) {
    console.error(
      `verify-ga-pages: out/404.html deve conter gtag inline com ${gaId} (corra npm run build com NEXT_PUBLIC_GA_ID)`,
    );
    errors += 1;
  }

  if (errors > 0) {
    process.exit(1);
  }

  const marketingCount = marketing.length + (rootChecked ? 1 : 0);
  console.log(
    `verify-ga-pages: OK — ${marketingCount} página(s) marketing com GA, ${studio.length} Studio sem GA, 404.html com gtag`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
