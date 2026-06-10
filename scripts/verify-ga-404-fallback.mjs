#!/usr/bin/env node
/**
 * Verifica que out/404.html inclui gtag quando NEXT_PUBLIC_GA_ID está definido no build.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const notFoundHtml = path.join(root, "out", "404.html");

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const placeholder = "G-XXXXXXXXXX";

if (!gaId || gaId === placeholder) {
  console.log("verify-ga-404-fallback: NEXT_PUBLIC_GA_ID ausente ou placeholder — skip.");
  process.exit(0);
}

if (!/^G-[A-Z0-9]+$/i.test(gaId)) {
  console.error(`verify-ga-404-fallback: NEXT_PUBLIC_GA_ID inválido: ${gaId}`);
  process.exit(1);
}

let html;
try {
  html = await readFile(notFoundHtml, "utf8");
} catch {
  console.error(`verify-ga-404-fallback: ${notFoundHtml} não encontrado (corra npm run build primeiro).`);
  process.exit(1);
}

if (!html.includes(gaId)) {
  console.error(`verify-ga-404-fallback: ${gaId} não encontrado em out/404.html`);
  process.exit(1);
}

if (!html.includes("googletagmanager.com/gtag/js")) {
  console.error("verify-ga-404-fallback: gtag/js não encontrado em out/404.html");
  process.exit(1);
}

console.log(`verify-ga-404-fallback: OK — ${gaId} em out/404.html`);
