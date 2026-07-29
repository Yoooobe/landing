#!/usr/bin/env node
/**
 * Script de Sincronização Autônoma do Projeto Landing com o Obsidian & Hermes.
 *
 * Escreve relatórios e aprendizados de execução em:
 * 1. Vault Obsidian Local: ~/Vaults/notes/Conhecimento/Execucoes/landing/
 * 2. Repo Hermes Local: hermes/knowledge/insights/
 *
 * Uso:
 *   node scripts/obsidian-sync-landing.mjs --title "Titulo do Aprendizado" --content "Conteúdo..."
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const args = process.argv.slice(2);
const getArg = (flag, fallback = "") => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
};

const title = getArg("--title", "Execução Landing Agent");
const content = getArg("--content", "");
const category = getArg("--category", "SEO & CRO");

if (!content) {
  console.log("⚠️ Nenhum conteúdo fornecido (--content). Sincronização ignorada.");
  process.exit(0);
}

const dateStr = new Date().toISOString().slice(0, 10);
const slugTitle = title
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-");

const fileName = `${dateStr}-${slugTitle}.md`;

// 1. Caminho do Vault Obsidian
const obsidianDir = path.join(
  os.homedir(),
  "Vaults",
  "notes",
  "Conhecimento",
  "Execucoes",
  "landing"
);

// 2. Caminho do Hermes Local no Repo
const hermesInsightsDir = path.resolve(process.cwd(), "hermes", "knowledge", "insights");

const noteHeader = `---
date: ${new Date().toISOString()}
project: landing
category: ${category}
tags: [landing, kimi-k3, agentclaw, hermes, seo]
---

# ${title}

${content}
`;

try {
  // Salva no Hermes Insights local
  if (!fs.existsSync(hermesInsightsDir)) {
    fs.mkdirSync(hermesInsightsDir, { recursive: true });
  }
  const hermesFile = path.join(hermesInsightsDir, fileName);
  fs.writeFileSync(hermesFile, noteHeader, "utf-8");
  console.log(`✅ Registrado no Hermes Insights: ${hermesFile}`);

  // Salva no Obsidian Vault local se existir a pasta home
  if (fs.existsSync(path.dirname(obsidianDir))) {
    if (!fs.existsSync(obsidianDir)) {
      fs.mkdirSync(obsidianDir, { recursive: true });
    }
    const obsidianFile = path.join(obsidianDir, fileName);
    fs.writeFileSync(obsidianFile, noteHeader, "utf-8");
    console.log(`🧠 Sincronizado no Obsidian Vault: ${obsidianFile}`);
  }
} catch (err) {
  console.error("❌ Erro ao sincronizar com Obsidian/Hermes:", err?.message || err);
}
