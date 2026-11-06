/**
 * Remove do dataset `yoobe` as imagens listadas em config/blocked-sanity-assets.json
 * (telas com marca 4unik): tira as referências dos documentos e apaga os assets.
 * uso: tsx scripts/sanity-remove-blocked-images.ts [--dry-run]
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

export function stripAssetRefs(value: unknown, blocked: Set<string>): unknown {
  if (Array.isArray(value)) {
    return value.filter((v) => !refersTo(v, blocked)).map((v) => stripAssetRefs(v, blocked));
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (refersTo(v, blocked)) continue;
      out[k] = stripAssetRefs(v, blocked);
    }
    return out;
  }
  return value;
}

function refersTo(v: unknown, blocked: Set<string>): boolean {
  const asset = (v as { asset?: { _ref?: string } } | null)?.asset;
  return Boolean(asset?._ref && blocked.has(asset._ref));
}

async function main() {
  const ids: string[] = JSON.parse(readFileSync("config/blocked-sanity-assets.json", "utf8"));
  const blocked = new Set(ids);
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: "yoobe",
    apiVersion: "2024-03-17",
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  });
  const docs = await client.fetch<Record<string, unknown>[]>("*[references($ids)]", { ids });
  console.log(`sanity-remove-blocked-images: ${docs.length} documentos, ${ids.length} assets`);
  if (process.argv.includes("--dry-run")) return;
  const tx = client.transaction();
  for (const d of docs) tx.createOrReplace(stripAssetRefs(d, blocked) as { _id: string; _type: string });
  await tx.commit();
  const tx2 = client.transaction();
  for (const id of ids) tx2.delete(id);
  await tx2.commit();
  const left = await client.fetch<number>("count(*[references($ids)])", { ids });
  console.log(`sanity-remove-blocked-images: referências restantes = ${left}`);
}

if (process.argv[1]?.endsWith("sanity-remove-blocked-images.ts")) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
