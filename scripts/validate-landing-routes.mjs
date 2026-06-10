#!/usr/bin/env node
/**
 * Valida rotas internas da landing (sitemap, menu fallbacks, blog CTAs) e opcional smoke HTTP.
 * Uso: node scripts/validate-landing-routes.mjs [--smoke [baseUrl]]
 */
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ptApp = join(root, "src/app/(pt)");
const enApp = join(root, "src/app/(en)/en");

/** Mirrors routePairs in src/app/sitemap.ts (paths without basePath). */
const SITEMAP_ROUTE_PAIRS = [
  ["/", "/en/"],
  ["/api-integracoes/", "/en/api-integracoes/"],
  ["/api-integracoes/workvivo/", "/en/api-integracoes/workvivo/"],
  ["/plataforma/", "/en/plataforma/"],
  ["/inteligencia/", "/en/inteligencia/"],
  ["/infraestrutura-de-recompensas/", "/en/reward-infrastructure/"],
  ["/casos-de-uso/", "/en/casos-de-uso/"],
  ["/para-plataformas/", "/en/para-plataformas/"],
  ["/educacao/", "/en/educacao/"],
  ["/vendas/", "/en/vendas/"],
  ["/comunidades/", "/en/comunidades/"],
  ["/eventos/", "/en/eventos/"],
  ["/blog/", "/en/blog/"],
  ["/plataforma/motor-gamificacao/", "/en/plataforma/motor-gamificacao/"],
  ["/plataforma/campanhas-gamificacao/", "/en/plataforma/campanhas-gamificacao/"],
  ["/plataforma/controle-carteiras/", "/en/plataforma/controle-carteiras/"],
  ["/plataforma/painel-gestor/", "/en/plataforma/painel-gestor/"],
  ["/plataforma/loja-resgate/", "/en/plataforma/loja-resgate/"],
];

/** Espelha `GROWTH_INDEX_ROUTE_PAIRS` em `src/lib/growthPagePublish.ts` — ficheiros devem existir sempre. */
const GROWTH_ROUTE_PAIRS = [
  ["/pricing/", "/en/pricing/"],
  ["/seguranca/", "/en/seguranca/"],
];

const GAMIFICATION_PATHS = [
  "motor-gamificacao",
  "campanhas-gamificacao",
];

function pageFileForPath(appRoot, internalPath) {
  const p = internalPath.replace(/^\//, "").replace(/\/$/, "");
  if (!p) {
    return join(appRoot, "page.tsx");
  }
  return join(appRoot, p, "page.tsx");
}

function assertPageExists(appRoot, internalPath, label) {
  const file = pageFileForPath(appRoot, internalPath);
  if (!existsSync(file)) {
    console.error(`validate-landing-routes: missing ${label} route "${internalPath}" (expected ${file})`);
    return 1;
  }
  return 0;
}

function readText(path) {
  return readFileSync(path, "utf8");
}

function assertGamificationInFile(relativePath, errors) {
  const text = readText(join(root, relativePath));
  for (const slug of GAMIFICATION_PATHS) {
    if (!text.includes(slug)) {
      console.error(`validate-landing-routes: ${relativePath} must reference /plataforma/${slug}`);
      errors += 1;
    }
  }
  return errors;
}

function assertSitemapIncludesGamification(errors) {
  const text = readText(join(root, "src/app/sitemap.ts"));
  for (const slug of GAMIFICATION_PATHS) {
    if (!text.includes(slug)) {
      console.error(`validate-landing-routes: sitemap.ts must include ${slug}`);
      errors += 1;
    }
  }
  return errors;
}

function grepOutForGithubIo() {
  const outDir = join(root, "out");
  if (!existsSync(outDir)) {
    console.warn("validate-landing-routes: skip out/ github.io grep (run npm run build first)");
    return 0;
  }
  try {
    const out = execSync('rg -l "yoooobe\\.github\\.io" out/', { cwd: root, encoding: "utf8" }).trim();
    const bad = out
      .split("\n")
      .filter(Boolean)
      .filter((p) => !p.includes("out/404.html") && !p.includes("out/404/index.html"));
    if (bad.length > 0) {
      console.error(`validate-landing-routes: found yoooobe.github.io in:\n${bad.join("\n")}`);
      return 1;
    }
  } catch {
    return 0;
  }
  return 0;
}

async function smokeUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    return res.status;
  } catch (e) {
    console.error(`validate-landing-routes: smoke failed for ${url}: ${e.message}`);
    return 0;
  }
}

async function runSmoke(baseUrl) {
  const base = baseUrl.replace(/\/$/, "");
  let errors = 0;
  const checks = [
    `${base}/`,
    `${base}/plataforma/motor-gamificacao/`,
    `${base}/plataforma/campanhas-gamificacao/`,
    `${base}/en/plataforma/motor-gamificacao/`,
    `${base}/en/plataforma/campanhas-gamificacao/`,
    `${base}/sitemap.xml`,
    `${base}/studio/`,
  ];
  for (const url of checks) {
    const status = await smokeUrl(url);
    if (status !== 200) {
      console.error(`validate-landing-routes: smoke ${url} → HTTP ${status} (expected 200)`);
      errors += 1;
    } else {
      console.log(`validate-landing-routes: smoke OK ${url}`);
    }
  }

  const withoutLanding = [
    "https://plataforma.4unik.com.br/plataforma/motor-gamificacao/",
    "https://plataforma.4unik.com.br/plataforma/campanhas-gamificacao/",
    "https://plataforma.4unik.com.br/para-plataformas/",
    "https://plataforma.4unik.com.br/pricing/",
  ];
  for (const url of withoutLanding) {
    try {
      const res = await fetch(url, { method: "HEAD", redirect: "manual" });
      if (res.status === 404) {
        console.warn(
          `validate-landing-routes: ${url} → 404 (configure proxy 301 → /landing/… — see docs/proxy-redirects-4unik.md)`,
        );
      } else if (res.status >= 300 && res.status < 400) {
        console.log(`validate-landing-routes: proxy redirect OK ${url} → ${res.headers.get("location")}`);
      }
    } catch {
      /* network optional in CI */
    }
  }
  return errors;
}

function main() {
  let errors = 0;

  for (const [pt, en] of SITEMAP_ROUTE_PAIRS) {
    errors += assertPageExists(ptApp, pt, "PT");
    errors += assertPageExists(enApp, en.replace(/^\/en/, ""), "EN");
  }

  for (const [pt, en] of GROWTH_ROUTE_PAIRS) {
    errors += assertPageExists(ptApp, pt, "PT growth");
    errors += assertPageExists(enApp, en.replace(/^\/en/, ""), "EN growth");
  }

  errors = assertGamificationInFile("src/components/Header.tsx", errors);
  errors = assertGamificationInFile("src/components/Footer.tsx", errors);
  errors = assertSitemapIncludesGamification(errors);

  errors += grepOutForGithubIo();

  const args = process.argv.slice(2);
  const smokeIdx = args.indexOf("--smoke");
  if (smokeIdx !== -1) {
    const base =
      args[smokeIdx + 1] && !args[smokeIdx + 1].startsWith("-")
        ? args[smokeIdx + 1]
        : "https://plataforma.4unik.com.br/landing";
    runSmoke(base).then((smokeErrors) => {
      errors += smokeErrors;
      if (errors > 0) process.exit(1);
      const pairCount = SITEMAP_ROUTE_PAIRS.length + GROWTH_ROUTE_PAIRS.length;
  console.log(`validate-landing-routes: OK (${pairCount} route pairs)`);
    });
    return;
  }

  if (errors > 0) process.exit(1);
  const pairCount = SITEMAP_ROUTE_PAIRS.length + GROWTH_ROUTE_PAIRS.length;
  console.log(`validate-landing-routes: OK (${pairCount} route pairs)`);
}

main();
