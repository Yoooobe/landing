#!/usr/bin/env node
/** Usa a página not-found do Next como 404.html estático (o Vercel serve com status 404). */
import { copyFileSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "out");
const src = join(out, "_not-found", "index.html");
if (!existsSync(src)) {
  console.error("vercel-404: out/_not-found/index.html não encontrado");
  process.exit(1);
}
copyFileSync(src, join(out, "404.html"));
rmSync(join(out, "404"), { recursive: true, force: true });
console.log("vercel-404: out/404.html ← _not-found");
