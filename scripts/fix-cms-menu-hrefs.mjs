#!/usr/bin/env node
/**
 * Corrige menus no Sanity (produção): Campanhas em Plataforma, Inteligência/Casos
 * removidos da navegação (standby), catálogo → /product.
 *
 * Uso: node --env-file=.env.local scripts/fix-cms-menu-hrefs.mjs
 * Requer NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!projectId || !token) {
  console.error("fix-cms-menu-hrefs: faltam NEXT_PUBLIC_SANITY_PROJECT_ID ou SANITY_API_WRITE_TOKEN (usa --env-file=.env.local)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-17",
  token,
  useCdn: false,
});

const CATALOG = "https://catalogo.4unik.com.br/product";

const item = (key, label, href, extra = {}) => ({
  _type: "menuItem",
  _key: key,
  label,
  href,
  ...extra,
});

const headerProductPt = [
  item("overview", "Visão Geral", "/plataforma/", { icon: "overview", description: "A base da sua operação e gestão." }),
  item("gamification", "Gamificação", "/plataforma/motor-gamificacao/", { icon: "gamification", badge: "CORE", description: "Engaje e premie seu time com mecânicas de jogos." }),
  item("gamificationCampaigns", "Campanhas de Gamificação", "/plataforma/campanhas-gamificacao/", { icon: "gamification", badge: "NOVO", description: "Do byte ao brinde: problema, solução e cases com ROI." }),
];

const headerProductEn = [
  item("overview", "Overview", "/plataforma/", { icon: "overview", description: "The foundation for program operations and management." }),
  item("gamification", "Gamification", "/plataforma/motor-gamificacao/", { icon: "gamification", badge: "CORE", description: "Engage and reward your team with game mechanics." }),
  item("gamificationCampaigns", "Gamification campaigns", "/plataforma/campanhas-gamificacao/", { icon: "gamification", badge: "NEW", description: "From byte to gift: problem, solution and ROI cases." }),
];

const headerSolutionsPt = [
  item("gamification-motor", "Gamificação", "/plataforma/motor-gamificacao/", { icon: "gamification", badge: "CORE", description: "Engaje e premie seu time com mecânicas de jogos." }),
  item("rewards", "Hub de Prêmios", CATALOG, { icon: "rewards", openInNewTab: true, description: "Milhares de opções incríveis para encantar." }),
];

const headerSolutionsEn = [
  item("gamification-motor", "Gamification", "/plataforma/motor-gamificacao/", { icon: "gamification", badge: "CORE", description: "Engage and reward your team with game mechanics." }),
  item("rewards", "Rewards hub", CATALOG, { icon: "rewards", openInNewTab: true, description: "Thousands of options to delight your people." }),
];

const footerPlatformPt = [
  item("motor", "Motor de Gamificação", "/plataforma/motor-gamificacao/"),
  item("campanhas", "Campanhas de Gamificação", "/plataforma/campanhas-gamificacao/"),
  item("wallets", "Controle de Carteiras (Wallets)", "/plataforma/controle-carteiras/"),
  item("manager", "Painel do Gestor", "/plataforma/painel-gestor/"),
];

const footerPlatformEn = [
  item("motor", "Gamification engine", "/plataforma/motor-gamificacao/"),
  item("campanhas", "Gamification campaigns", "/plataforma/campanhas-gamificacao/"),
  item("wallets", "Wallet control", "/plataforma/controle-carteiras/"),
  item("manager", "Manager dashboard", "/plataforma/painel-gestor/"),
];

async function run() {
  const results = [];

  results.push(
    await client
      .patch("menu.header.pt")
      .set({
        'sections[_key=="produto"].items': headerProductPt,
        'sections[_key=="solucoes"].items': headerSolutionsPt,
        'sections[_key=="api"].items[_key=="apiHub"].href': "/api-integracoes/",
      })
      .commit(),
  );

  results.push(
    await client
      .patch("menu.header.en")
      .set({
        'sections[_key=="product"].items': headerProductEn,
        'sections[_key=="solutions"].items': headerSolutionsEn,
        'sections[_key=="api"].items[_key=="apiHub"].href': "/api-integracoes/",
      })
      .commit(),
  );

  results.push(
    await client
      .patch("menu.footer.pt")
      .set({
        'sections[_key=="platform"].items': footerPlatformPt,
        'sections[_key=="resources"].items[_key=="api"].href': "/api-integracoes/",
        'sections[_key=="resources"].items[_key=="catalog"].href': CATALOG,
      })
      .commit(),
  );

  results.push(
    await client
      .patch("menu.footer.en")
      .set({
        'sections[_key=="platform"].items': footerPlatformEn,
        'sections[_key=="resources"].items[_key=="api"].href': "/api-integracoes/",
        'sections[_key=="resources"].items[_key=="catalog"].href': CATALOG,
      })
      .commit(),
  );

  results.push(
    await client
      .patch("siteSettings")
      .set({ rewardsCatalogUrl: CATALOG })
      .commit(),
  );

  for (const doc of results) {
    console.log(`fix-cms-menu-hrefs: updated ${doc._id} (rev ${doc._rev})`);
  }
  console.log("fix-cms-menu-hrefs: done.");
}

run().catch((err) => {
  console.error("fix-cms-menu-hrefs: failed:", err.message);
  process.exit(1);
});
