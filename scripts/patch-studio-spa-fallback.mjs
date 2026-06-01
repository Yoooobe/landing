#!/usr/bin/env node
/**
 * GitHub Pages: URLs profundas do Studio (ex. …/studio/structure/marketingPage-pt;docId)
 * não têm HTML estático em `out/`. Gera `out/404.html` e sobrescreve `out/404/index.html`
 * (o export Next cria a pasta `404/`; em project sites o GH costuma servir esse index
 * em vez do `404.html` na raiz). Ver StudioClient + SANITY_STUDIO_RESTORE_PATH_KEY.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const STORAGE_KEY = "sanity-studio-restore-path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");

function parseBasePath() {
  const raw =
    (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim() ||
    JSON.parse(readFileSync(join(root, "config/public-site.json"), "utf8"))
      .defaultSiteUrl;
  const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const u = new URL(href);
  let pathname = u.pathname || "/";
  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  return pathname === "/" ? "" : pathname;
}

function escapeForJsString(value) {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

const basePath = parseBasePath();
const studioRoot = `${basePath}/studio/`;
const homeUrl = `${basePath}/` || "/";
const basePathJs = escapeForJsString(basePath);
const studioRootJs = escapeForJsString(studioRoot);
const homeUrlJs = escapeForJsString(homeUrl);

const html = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>A redirecionar…</title>
  <script>
(function () {
  var STORAGE_KEY = "${STORAGE_KEY}";
  var BASE = "${basePathJs}";
  var STUDIO = "${studioRootJs}";
  var HOME = "${homeUrlJs}";
  var path = location.pathname;
  var suffix = (location.search || "") + (location.hash || "");
  var studioPrefix = STUDIO;
  var studioRootNoSlash = STUDIO.charAt(STUDIO.length - 1) === "/"
    ? STUDIO.slice(0, -1)
    : STUDIO;
  if (
    path.indexOf(studioPrefix) === 0 &&
    path !== studioPrefix &&
    path !== studioRootNoSlash
  ) {
    try {
      sessionStorage.setItem(STORAGE_KEY, path + suffix);
    } catch (e) {}
    location.replace(STUDIO);
    return;
  }
  location.replace(HOME);
})();
  </script>
</head>
<body>
  <p style="font-family: system-ui, sans-serif; padding: 2rem; color: #444;">A redirecionar…</p>
</body>
</html>
`;

if (!existsSync(outDir)) {
  console.error("patch-studio-spa-fallback: pasta out/ não existe — corre npm run build primeiro.");
  process.exit(1);
}

const notFoundDir = join(outDir, "404");
const notFoundIndex = join(notFoundDir, "index.html");

writeFileSync(join(outDir, "404.html"), html, "utf8");
mkdirSync(notFoundDir, { recursive: true });
writeFileSync(notFoundIndex, html, "utf8");

if (!existsSync(join(outDir, ".nojekyll"))) {
  writeFileSync(join(outDir, ".nojekyll"), "", "utf8");
}

console.log(
  `patch-studio-spa-fallback: out/404.html + out/404/index.html (Studio deep links → ${studioRoot}, basePath=${basePath || "(root)"})`,
);
