import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

const script = new URL("./check-internal-links.mjs", import.meta.url).pathname;
function site(files) {
  const dir = mkdtempSync(join(tmpdir(), "cil-"));
  for (const [p, c] of Object.entries(files)) {
    mkdirSync(join(dir, p, ".."), { recursive: true });
    writeFileSync(join(dir, p), c);
  }
  return dir;
}
const run = (dir, site = "https://www.yoobe.co") =>
  spawnSync(process.execPath, [script, dir], { encoding: "utf8", env: { ...process.env, NEXT_PUBLIC_SITE_URL: site } });

test("fails on relative hrefs that resolve outside the site root", () => {
  const dir = site({ "index.html": "<a href=\"/a/\">a</a>", "a/index.html": "<a href=\"platform\">x</a>" });
  const r = run(dir);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /RELATIVE platform/);
});

test("checks absolute same-domain URLs in html, txt and xml", () => {
  const dir = site({
    "index.html": "<a href=\"https://www.yoobe.co/ok/\">ok</a>",
    "ok/index.html": "ok",
    "llms.txt": "- https://www.yoobe.co/missing/\n",
  });
  const r = run(dir);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /\/missing\//);
});

test("passes when every internal and same-domain link resolves", () => {
  const dir = site({
    "index.html": "<a href=\"/ok/\">ok</a><a href=\"#top\">t</a><a href=\"mailto:a@b.co\">m</a><a href=\"https://catalogo.yoobe.co/\">c</a>",
    "ok/index.html": "ok",
    "sitemap.xml": "<loc>https://www.yoobe.co/ok/</loc>",
  });
  assert.equal(run(dir).status, 0);
});

test("checks absolute URLs of the build's own host (NEXT_PUBLIC_SITE_URL), not other yoobe.co hosts", () => {
  const dir = site({
    "index.html": "<a href=\"https://www.yoobe.co/static-page-only/\">home</a><a href=\"https://corporate.yoobe.co/missing/\">x</a>",
  });
  const r = run(dir, "https://corporate.yoobe.co");
  assert.equal(r.status, 1);
  assert.match(r.stderr, /ABS \/missing\//);
  assert.doesNotMatch(r.stderr, /static-page-only/);
});
