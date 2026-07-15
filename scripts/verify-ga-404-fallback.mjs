#!/usr/bin/env node
/**
 * Verifica que out/404.html inclui os destinos gtag definidos no build.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const notFoundHtml = path.join(root, "out", "404.html");

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
const gaEnabled = Boolean(gaId && gaId !== "G-XXXXXXXXXX");
const adsEnabled = Boolean(googleAdsId && googleAdsId !== "AW-XXXXXXXXX");

if (!gaEnabled && !adsEnabled) {
  console.log("verify-ga-404-fallback: nenhum destino GA4/Ads configurado — skip.");
  process.exit(0);
}

if (gaEnabled && !/^G-[A-Z0-9]+$/i.test(gaId)) {
  console.error(`verify-ga-404-fallback: NEXT_PUBLIC_GA_ID inválido: ${gaId}`);
  process.exit(1);
}

if (adsEnabled && !/^AW-\d+$/i.test(googleAdsId)) {
  console.error(`verify-ga-404-fallback: NEXT_PUBLIC_GOOGLE_ADS_ID inválido: ${googleAdsId}`);
  process.exit(1);
}

let html;
try {
  html = await readFile(notFoundHtml, "utf8");
} catch {
  console.error(`verify-ga-404-fallback: ${notFoundHtml} não encontrado (corra npm run build primeiro).`);
  process.exit(1);
}

if (gaEnabled && !html.includes(gaId)) {
  console.error(`verify-ga-404-fallback: ${gaId} não encontrado em out/404.html`);
  process.exit(1);
}

if (adsEnabled && !html.includes(googleAdsId)) {
  console.error(`verify-ga-404-fallback: ${googleAdsId} não encontrado em out/404.html`);
  process.exit(1);
}

if (!html.includes("googletagmanager.com/gtag/js")) {
  console.error("verify-ga-404-fallback: gtag/js não encontrado em out/404.html");
  process.exit(1);
}

console.log(
  `verify-ga-404-fallback: OK — ${[gaId, googleAdsId].filter(Boolean).join(" + ")} em out/404.html`,
);
