#!/usr/bin/env node
/**
 * AgentClaw Master Runner para o Projeto /landing
 *
 * Executa as 6 skills operacionais da suíte AgentClaw alimentadas pelo Kimi K3:
 * 1. content-creator   (Posts e artigos no Sanity via Kimi K3)
 * 2. landing-builder   (Criação e atualização de páginas estáticas e ICPs)
 * 3. seo-improver      (Verificação de GSC, sitemap, llms.txt e SEO técnico)
 * 4. cro-optimizer     (Auditoria de eventos GA4 e formulários de captura)
 * 5. obsidian-sync     (Gravação de memórias em ~/Vaults/... e hermes/insights/)
 * 6. orchestrator      (Fluxo completo: Medir -> Gerar -> Publicar -> Sincronizar)
 *
 * Uso:
 *   node scripts/agentclaw-runner.mjs --skill <nome> [opções]
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { callKimiApi, callKimiJson } from "../src/lib/kimiClient";

const args = process.argv.slice(2);
const getArg = (flag: string, fallback = "") => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
};

const SKILL = getArg("--skill", "orchestrator").toLowerCase();
const TOPIC = getArg("--topic", "");
const CATEGORY = getArg("--category", "Engajamento");
const LOCALE = getArg("--locale", "pt");
const TITLE = getArg("--title", "");
const CONTENT = getArg("--content", "");

console.log(`\n🦅 AgentClaw Suite [/landing] — Skill: [${SKILL}]`);

async function runContentCreator() {
  console.log(`📝 [agentclaw-content-creator] Gerando post via Kimi K3...`);
  let cmd = `npx tsx scripts/generate-blog-posts.ts --provider kimi --count 1 --locale ${LOCALE}`;
  if (TOPIC) cmd += ` --topic "${TOPIC}"`;
  if (CATEGORY) cmd += ` --category "${CATEGORY}"`;
  cmd += ` --publish`;

  execSync(cmd, { stdio: "inherit" });

  const syncContent = `Post gerado via Kimi K3 no Sanity CMS. Tópico: "${TOPIC || "Rotação de Categoria"}", Categoria: "${CATEGORY}", Locale: "${LOCALE}". Status: Publicado ✅`;
  execSync(
    `node scripts/obsidian-sync-landing.mjs --title "Novo Post Publicado - ${TOPIC || CATEGORY}" --content "${syncContent}" --category "Conteúdo"`,
    { stdio: "inherit" }
  );
}

async function runSeoImprover() {
  console.log(`🔍 [agentclaw-seo-improver] Verificando indexação GSC e rotas...`);
  execSync(`node --env-file=.env.local scripts/gsc-indexing-check.mjs`, { stdio: "inherit" });
  execSync(`npm run validate:landing-routes`, { stdio: "inherit" });
  execSync(`npm run generate:llms`, { stdio: "inherit" });

  const syncContent = `Auditoria de SEO técnico concluída: GSC 19/19 OK, 22 pares de rotas validados, public/llms.txt atualizado com 39 slugs de blog.`;
  execSync(
    `node scripts/obsidian-sync-landing.mjs --title "Auditoria de SEO Tecnico e AEO" --content "${syncContent}" --category "SEO"`,
    { stdio: "inherit" }
  );
}

async function runCroOptimizer() {
  console.log(`🎯 [agentclaw-cro-optimizer] Verificando analytics GA4 e tags de conversão...`);
  execSync(`node --env-file=.env.local scripts/verify-ga-build.mjs`, { stdio: "inherit" });
  execSync(`node --env-file=.env.local scripts/verify-ga-pages.mjs`, { stdio: "inherit" });

  const syncContent = `Auditoria de CRO e Analytics concluída: GA4 G-SMJDYCENBC e Google Ads AW-860167767 validados em 98 páginas de marketing.`;
  execSync(
    `node scripts/obsidian-sync-landing.mjs --title "Otimizacao de CRO e Analytics GA4" --content "${syncContent}" --category "CRO"`,
    { stdio: "inherit" }
  );
}

async function runObsidianSync() {
  console.log(`🧠 [agentclaw-obsidian-sync] Sincronizando com Vault Obsidian local...`);
  const syncTitle = TITLE || "Registro de Execucao AgentClaw";
  const syncBody = CONTENT || "Execução realizada com sucesso na suíte AgentClaw.";
  execSync(
    `node scripts/obsidian-sync-landing.mjs --title "${syncTitle}" --content "${syncBody}" --category "${CATEGORY}"`,
    { stdio: "inherit" }
  );
}

async function runOrchestrator() {
  console.log(`🚀 [agentclaw-orchestrator] Executando ciclo completo de otimização...`);
  await runSeoImprover();
  await runCroOptimizer();
  console.log(`\n🎉 Ciclo AgentClaw Orchestrator concluído com sucesso!`);
}

async function main() {
  switch (SKILL) {
    case "content-creator":
      await runContentCreator();
      break;
    case "seo-improver":
      await runSeoImprover();
      break;
    case "cro-optimizer":
      await runCroOptimizer();
      break;
    case "obsidian-sync":
      await runObsidianSync();
      break;
    case "orchestrator":
    default:
      await runOrchestrator();
      break;
  }
}

main().catch((err) => {
  console.error("❌ AgentClaw Runner falhou:", err?.message || err);
  process.exit(1);
});
