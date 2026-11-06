/**
 * Copia o export do dataset `production` (só leitura) para o dataset privado `yoobe`,
 * reescrevendo marca 4unik → Yoobe e links legados (/en/..., /landing/...) para as rotas do yoobe.co.
 *
 * 1. npx sanity dataset export production <dir>/production.tar.gz --types <tipos>,sanity.imageAsset,sanity.fileAsset
 * 2. npx tsx scripts/sanity-clone-to-yoobe.ts <dir>/production.tar.gz [--types a,b] [--exclude blogPost]
 *    → gera <dir>/yoobe-import.tar.gz e importa em `yoobe` com --replace.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { rewriteDoc } from "./lib/yoobeRewrite";

const [tarPath, ...flags] = process.argv.slice(2);
if (!tarPath) {
  console.error("uso: tsx scripts/sanity-clone-to-yoobe.ts <production.tar.gz> [--exclude t1,t2] [--dry-run]");
  process.exit(1);
}
const exclude = new Set((flags[flags.indexOf("--exclude") + 1] ?? "").split(",").filter(Boolean));
const dryRun = flags.includes("--dry-run");

const work = mkdtempSync(join(tmpdir(), "yoobe-clone-"));
execFileSync("tar", ["-xzf", tarPath, "-C", work]);
const root = join(work, readdirSync(work)[0]);

const lines = readFileSync(join(root, "data.ndjson"), "utf8").split("\n").filter(Boolean);
const kept: string[] = [];
for (const line of lines) {
  const doc = JSON.parse(line) as { _id: string; _type: string };
  if (exclude.has(doc._type) || doc._id.startsWith("drafts.")) continue;
  kept.push(JSON.stringify(rewriteDoc(doc)));
}
writeFileSync(join(root, "data.ndjson"), `${kept.join("\n")}\n`);

const outTar = join(dirname(tarPath), "yoobe-import.tar.gz");
execFileSync("tar", ["-czf", outTar, "-C", work, readdirSync(work)[0]]);
console.log(`sanity-clone-to-yoobe: ${kept.length} documentos → ${outTar}`);

if (!dryRun) {
  execFileSync("npx", ["sanity", "dataset", "import", outTar, "yoobe", "--replace"], { stdio: "inherit" });
}
