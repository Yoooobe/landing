#!/usr/bin/env node
/**
 * Atualiza HTML estáticos na raiz do repo: canonical + links para plataforma.4unik.com.br.
 * Não injecta meta refresh — as landings legadas permanecem visíveis.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteBase = "https://plataforma.4unik.com.br/landing";

/** Ficheiro na raiz → path canónico (sem origin). */
const CANONICAL_BY_FILE = {
  "index.html": "/",
  "gamificacao.html": "/plataforma/motor-gamificacao/",
  "api-integracoes.html": "/api-integracoes/",
  "funcionalidades.html": "/plataforma/",
  "index-option-a.html": "/",
  "index-option-b.html": "/",
  "index-option-c.html": "/",
  "api-integracoes-option-a.html": "/api-integracoes/",
  "api-integracoes-option-b.html": "/api-integracoes/",
  "api-integracoes-option-c.html": "/api-integracoes/",
  "options-index.html": "/",
  "visual-patterns.html": "/",
  "deployed.html": "/",
};

const LEGACY_HTML = Object.keys(CANONICAL_BY_FILE);

function patchHtml(filename) {
  const path = join(root, filename);
  let html = readFileSync(path, "utf8");
  const canonicalPath = CANONICAL_BY_FILE[filename];
  const canonicalUrl = `${siteBase}${canonicalPath === "/" ? "/" : canonicalPath}`;

  html = html.replace(/https:\/\/yoooobe\.github\.io\/landing/g, siteBase);
  html = html.replace(/https:\/\/catalogo\.yoobe\.co/g, "https://catalogo.4unik.com.br");
  html = html.replace(/https:\/\/yoobe\.co/g, "https://plataforma.4unik.com.br/landing");

  if (/<link rel="canonical"/i.test(html)) {
    html = html.replace(
      /<link rel="canonical" href="[^"]*"/i,
      `<link rel="canonical" href="${canonicalUrl}"`,
    );
  } else {
    html = html.replace(
      /<head>/i,
      `<head>\n  <link rel="canonical" href="${canonicalUrl}" />`,
    );
  }

  if (/property="og:url"/i.test(html)) {
    html = html.replace(
      /property="og:url" content="[^"]*"/i,
      `property="og:url" content="${canonicalUrl}"`,
    );
  }

  writeFileSync(path, html, "utf8");
  console.log(`patch-legacy-html: ${filename} → canonical ${canonicalUrl}`);
}

let count = 0;
for (const file of LEGACY_HTML) {
  const full = join(root, file);
  try {
    patchHtml(file);
    count += 1;
  } catch (e) {
    console.warn(`patch-legacy-html: skip ${file} (${e.message})`);
  }
}

console.log(`patch-legacy-html: updated ${count} file(s). Re-run after editing legacy HTML.`);
