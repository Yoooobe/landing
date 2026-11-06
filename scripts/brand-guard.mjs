#!/usr/bin/env node
/**
 * Falha se aparecer "4unik" (qualquer caixa) no conteúdo de arquivos de texto
 * ou no nome de qualquer arquivo do diretório publicado (padrão: out/).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const dir = process.argv[2] || "out";
const PATTERN = /4\s*-?\s*unik/i;
const TEXT_EXT = new Set([".html", ".htm", ".txt", ".xml", ".json", ".js", ".mjs", ".css", ".svg", ".webmanifest", ".rsc", ""]);

const hits = [];
function walk(current) {
  for (const name of readdirSync(current)) {
    const path = join(current, name);
    const rel = relative(dir, path);
    if (PATTERN.test(name)) hits.push(`${rel} (nome do arquivo)`);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }
    if (!TEXT_EXT.has(extname(name).toLowerCase())) continue;
    const lines = readFileSync(path, "utf8").split("\n");
    lines.forEach((line, i) => {
      const m = PATTERN.exec(line);
      if (m) {
        const start = Math.max(0, m.index - 40);
        hits.push(`${rel}:${i + 1}  …${line.slice(start, m.index + 40).trim()}…`);
      }
    });
  }
}

walk(dir);

if (hits.length) {
  console.error(`brand-guard: ${hits.length} ocorrência(s) de 4unik em ${dir}:`);
  for (const h of hits.slice(0, 200)) console.error(`  ${h}`);
  if (hits.length > 200) console.error(`  … +${hits.length - 200}`);
  process.exit(1);
}
console.log(`brand-guard: OK (${dir})`);
