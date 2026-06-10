#!/usr/bin/env node
/**
 * Verifica que NEXT_PUBLIC_GA_ID foi inlined nos chunks do export estático.
 * Falha se o env estiver definido mas o ID não aparecer em out/_next/static/chunks/.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");
const chunksDir = path.join(outDir, "_next", "static", "chunks");

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const placeholder = "G-XXXXXXXXXX";

if (!gaId || gaId === placeholder) {
  console.log("verify-ga-build: NEXT_PUBLIC_GA_ID ausente ou placeholder — skip.");
  process.exit(0);
}

if (!/^G-[A-Z0-9]+$/i.test(gaId)) {
  console.error(`verify-ga-build: NEXT_PUBLIC_GA_ID inválido: ${gaId}`);
  process.exit(1);
}

let chunkFiles;
try {
  chunkFiles = await readdir(chunksDir);
} catch {
  console.error(`verify-ga-build: pasta não encontrada: ${chunksDir} (corra npm run build primeiro)`);
  process.exit(1);
}

let foundIn = null;
for (const file of chunkFiles) {
  if (!file.endsWith(".js")) continue;
  const content = await readFile(path.join(chunksDir, file), "utf8");
  if (content.includes(gaId)) {
    foundIn = file;
    break;
  }
}

if (!foundIn) {
  console.error(
    `verify-ga-build: ${gaId} não encontrado em nenhum chunk — env provavelmente não foi inlined (ver src/lib/site.ts).`,
  );
  process.exit(1);
}

console.log(`verify-ga-build: OK — ${gaId} presente em out/_next/static/chunks/${foundIn}`);
