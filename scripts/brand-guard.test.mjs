import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

const script = new URL("./brand-guard.mjs", import.meta.url).pathname;
const run = (dir) => spawnSync(process.execPath, [script, dir], { encoding: "utf8" });

test("fails on 4unik text inside a file and names the file", () => {
  const dir = mkdtempSync(join(tmpdir(), "bg-"));
  writeFileSync(join(dir, "a.html"), "<p>ok</p>\n<p>Powered by 4Unik</p>");
  const r = run(dir);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /a\.html:2/);
});

test("fails on a file whose name contains 4unik", () => {
  const dir = mkdtempSync(join(tmpdir(), "bg-"));
  writeFileSync(join(dir, "4unik-mark.webp"), "neutral");
  const r = run(dir);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /4unik-mark\.webp/);
});

test("passes on a clean directory", () => {
  const dir = mkdtempSync(join(tmpdir(), "bg-"));
  writeFileSync(join(dir, "index.html"), "<p>Yoobe Inc.</p>");
  assert.equal(run(dir).status, 0);
});

test("fails when the site references a blocked image (local path or Sanity asset hash)", () => {
  const dir = mkdtempSync(join(tmpdir(), "bg-"));
  const list = join(dir, "..", `blocked-${Date.now()}.json`);
  writeFileSync(list, JSON.stringify(["/screens/admin-dashboard.webp", "image-abc123-1024x600-webp"]));
  writeFileSync(join(dir, "index.html"), '<img src="https://cdn.sanity.io/images/p/yoobe/abc123-1024x600.webp">');
  const r = spawnSync(process.execPath, [script, dir, "--blocked", list], { encoding: "utf8" });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /abc123/);
});
