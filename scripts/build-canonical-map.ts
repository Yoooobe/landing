/**
 * Gera config/yoobe-canonical-map.json: path EN do 4unik (/en/...) → URL canónica no yoobe.co.
 * Usado para aplicar <link rel="canonical"> nas páginas EN do 4unik (gh-pages) e, no futuro, redirects.
 *
 * uso: tsx scripts/build-canonical-map.ts <production data.ndjson>   (lê posts EN do yoobe via Sanity)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { ROUTE_TABLE } from "../src/lib/routes";
import { rewriteBrand } from "./lib/yoobeRewrite";

const SITE = "https://www.yoobe.co";

/** Post EN do 4unik com slug de um tema e conteúdo de outro (título levemente diferente do original). */
const CONTENT_OVERRIDES: Record<string, string> = {
  "/en/blog/recognition-360-peer-to-peer/": `${SITE}/blog/gamified-sales-campaign-rankings-missions-and-prizes-teams-accept-fb3/`,
};

type PostRef = { slug: string; title: string };

const norm = (t: string) => rewriteBrand(t).trim().toLowerCase();

export function buildCanonicalMap(fourUnikEnPosts: PostRef[], yoobePosts: PostRef[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const r of ROUTE_TABLE) {
    if (r.key === "blogPost") continue;
    map[r.legacyEn] = `${SITE}${r.path}`;
  }
  const byTitle = new Map(yoobePosts.map((p) => [norm(p.title), p.slug]));
  const bySlug = new Set(yoobePosts.map((p) => p.slug));
  const fourUnikByTitle = new Map<string, string>();
  for (const p of fourUnikEnPosts) {
    if (!/^\d+$/.test(p.slug)) fourUnikByTitle.set(norm(p.title), rewriteBrand(p.slug));
  }
  for (const p of fourUnikEnPosts) {
    const target =
      byTitle.get(norm(p.title)) ??
      (bySlug.has(fourUnikByTitle.get(norm(p.title)) ?? "") ? fourUnikByTitle.get(norm(p.title)) : undefined);
    map[`/en/blog/${p.slug}/`] = target ? `${SITE}/blog/${target}/` : `${SITE}/blog/`;
  }
  return map;
}

async function main() {
  const ndjson = process.argv[2];
  if (!ndjson) {
    console.error("uso: tsx scripts/build-canonical-map.ts <production data.ndjson>");
    process.exit(1);
  }
  const fourUnik = readFileSync(ndjson, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l))
    .filter((d) => d._type === "blogPost" && d.locale === "en" && !d._id.startsWith("drafts."))
    .map((d) => ({ slug: d.slug.current as string, title: d.title as string }));
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: "yoobe",
    apiVersion: "2024-03-17",
    token: process.env.SANITY_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  });
  const yoobe = await client.fetch<PostRef[]>('*[_type=="blogPost" && locale=="en"]{"slug": slug.current, title}');
  const map = { ...buildCanonicalMap(fourUnik, yoobe), ...CONTENT_OVERRIDES };
  writeFileSync("config/yoobe-canonical-map.json", `${JSON.stringify(map, null, 2)}\n`);
  const fallbacks = Object.entries(map).filter(([k, v]) => k.startsWith("/en/blog/") && k !== "/en/blog/" && v === `${SITE}/blog/`);
  console.log(`build-canonical-map: ${Object.keys(map).length} entradas (${fallbacks.length} posts sem par → /blog/)`);
  for (const [k] of fallbacks) console.log(`  sem par: ${k}`);
}

if (process.argv[1]?.endsWith("build-canonical-map.ts")) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
