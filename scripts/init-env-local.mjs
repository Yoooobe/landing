#!/usr/bin/env node
/**
 * Cria .env.local a partir de .env.example se ainda não existir.
 */
import { copyFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const example = join(root, ".env.example");
const local = join(root, ".env.local");

if (!existsSync(example)) {
  console.error("Falta .env.example na raiz do repo.");
  process.exit(1);
}

if (existsSync(local)) {
  console.log("Já existe .env.local — edita esse ficheiro (não foi sobrescrito).");
  process.exit(0);
}

copyFileSync(example, local);
console.log("Criado .env.local a partir de .env.example");
console.log("Preenche NEXT_PUBLIC_SANITY_PROJECT_ID e corre: npm run env:check");
