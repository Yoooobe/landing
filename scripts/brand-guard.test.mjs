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
