#!/usr/bin/env node
/**
 * Verifica que os IDs públicos de GA4/Google Ads foram inlined nos chunks.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");
const chunksDir = path.join(outDir, "_next", "static", "chunks");

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
const destinations = [
  { name: "NEXT_PUBLIC_GA_ID", value: gaId, placeholder: "G-XXXXXXXXXX", pattern: /^G-[A-Z0-9]+$/i },
  { name: "NEXT_PUBLIC_GOOGLE_ADS_ID", value: googleAdsId, placeholder: "AW-XXXXXXXXX", pattern: /^AW-\d+$/i },
].filter(({ value, placeholder }) => value && value !== placeholder);

if (destinations.length === 0) {
  console.log("verify-ga-build: nenhum destino GA4/Ads configurado — skip.");
  process.exit(0);
}

for (const destination of destinations) {
  if (!destination.pattern.test(destination.value)) {
    console.error(`verify-ga-build: ${destination.name} inválido: ${destination.value}`);
    process.exit(1);
  }
}

let chunkFiles;
try {
  chunkFiles = await readdir(chunksDir);
} catch {
  console.error(`verify-ga-build: pasta não encontrada: ${chunksDir} (corra npm run build primeiro)`);
  process.exit(1);
}

const foundIn = new Map();
for (const file of chunkFiles) {
  if (!file.endsWith(".js")) continue;
  const content = await readFile(path.join(chunksDir, file), "utf8");
  for (const destination of destinations) {
    if (!foundIn.has(destination.value) && content.includes(destination.value)) {
      foundIn.set(destination.value, file);
    }
  }
}

for (const destination of destinations) {
  const file = foundIn.get(destination.value);
  if (!file) {
    console.error(
      `verify-ga-build: ${destination.value} não encontrado em nenhum chunk — env provavelmente não foi inlined (ver src/lib/site.ts).`,
    );
    process.exit(1);
  }
}

console.log(
  `verify-ga-build: OK — ${destinations.map(({ value }) => `${value} em ${foundIn.get(value)}`).join(", ")}`,
);
