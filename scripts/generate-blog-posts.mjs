#!/usr/bin/env node
/**
 * Compat: delega para `generate-blog-posts.ts` (CTAs alinhados à landing).
 * Preferir: `npm run generate:blog-posts` ou `npx tsx scripts/generate-blog-posts.ts`
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const script = join(dir, "generate-blog-posts.ts");
const r = spawnSync("npx", ["tsx", script, ...process.argv.slice(2)], {
  stdio: "inherit",
  cwd: process.cwd(),
  shell: true,
});
process.exit(r.status === null ? 1 : r.status);
