#!/usr/bin/env node
/**
 * Copia out/ para .vercel-out/landing/ para o host Vercel servir
 * https://…/landing/ com o mesmo basePath do export Next.
 */
import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "out");
const dest = join(root, ".vercel-out");
const destLanding = join(dest, "landing");

if (!existsSync(join(src, "index.html"))) {
  console.error("stage-vercel-out: out/index.html em falta — corre npm run build primeiro");
  process.exit(1);
}

mkdirSync(destLanding, { recursive: true });
cpSync(src, destLanding, { recursive: true });
cpSync(join(src, "404.html"), join(dest, "404.html"));
writeFileSync(
  join(dest, "index.html"),
  `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0;url=/landing/">
<link rel="canonical" href="https://plataforma.4unik.com.br/landing/">
<title>Redirecionando…</title>
</head>
<body><p><a href="/landing/">Continuar para 4Unik</a></p></body>
</html>
`,
);

console.log("stage-vercel-out: .vercel-out/landing/ pronto");
