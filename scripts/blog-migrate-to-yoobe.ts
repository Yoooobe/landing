/**
 * Monta o blog EN do yoobe.co no dataset `yoobe`:
 * posts EN existentes do 4unik (sem duplicatas/slug numérico) + posts PT traduzidos.
 *
 * uso: tsx scripts/blog-migrate-to-yoobe.ts <production data.ndjson> <dir com NN.json traduzidos> [--dry-run]
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@sanity/client";
import { getFallbackBlogPosts } from "../src/lib/blogFallback";
import { rewriteBrand, rewriteDoc } from "./lib/yoobeRewrite";

export type BlogDoc = {
  _id: string;
  _type: "blogPost";
  locale: string;
  title: string;
  slug: { _type: "slug"; current: string };
  body: unknown[];
  [key: string]: unknown;
};

/** Posts EN do 4unik cujo slug não bate com o conteúdo; o slug é reaproveitado pela tradução correta. */
export const MISMATCHED_EN_SLUGS = new Set(["recognition-360-peer-to-peer", "rewards-logistics-sla-d1", "welcome-kits-first-impression"]);

export function selectEnglishPosts(docs: BlogDoc[], exclude: Set<string> = MISMATCHED_EN_SLUGS): BlogDoc[] {
  const byTitle = new Map<string, BlogDoc>();
  for (const d of docs) {
    if (d._type !== "blogPost" || d.locale !== "en" || d._id.startsWith("drafts.")) continue;
    const slug = d.slug?.current ?? "";
    if (!slug || /^\d+$/.test(slug) || exclude.has(slug)) continue;
    const key = d.title.trim().toLowerCase();
    const prev = byTitle.get(key);
    if (!prev || (d.body?.length ?? 0) > (prev.body?.length ?? 0)) byTitle.set(key, d);
  }
  return [...byTitle.values()];
}

const slugify = (t: string) => {
  const s = t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s.length <= 80 ? s : s.slice(0, 81).replace(/-[^-]*$/, "");
};

/** Posts EN que só existem no fallback local (ex.: case Boticário), com slug real derivado do título. */
export function pickMissingFallbackPosts(fallback: BlogDoc[], migrated: BlogDoc[], productionEnSlugs: string[] = []): BlogDoc[] {
  const titles = new Set(migrated.map((d) => rewriteBrand(d.title).trim().toLowerCase()));
  const covered = (n: string) => productionEnSlugs.some((s) => s === n || s.endsWith(`-fb${n}`));
  return fallback
    .filter((d) => !titles.has(rewriteBrand(d.title).trim().toLowerCase()))
    .filter((d) => !(/^\d+$/.test(d.slug.current) && covered(d.slug.current)))
    .map((d) => ({ ...d, slug: { _type: "slug" as const, current: /^\d+$/.test(d.slug.current) ? slugify(rewriteBrand(d.title)) : d.slug.current } }));
}

export function buildYoobeBlogDocs(existing: BlogDoc[], translated: BlogDoc[]): BlogDoc[] {
  const strip = (d: BlogDoc): BlogDoc => {
    const { _rev, _createdAt, _updatedAt, _targetSlug, _system, ...rest } = d as BlogDoc & Record<string, unknown>;
    void _system;
    void _rev;
    void _createdAt;
    void _updatedAt;
    void _targetSlug;
    const body = (rest.body as Record<string, unknown>[] | undefined)?.map((block) => ({
      ...block,
      children: (block.children as Record<string, unknown>[] | undefined)?.map((c) =>
        typeof c.marks === "string" ? { ...c, marks: [c.marks] } : c,
      ),
    }));
    return { ...rest, ...(body ? { body } : {}) } as BlogDoc;
  };
  const rewrittenExisting = existing.map((d) => rewriteDoc(strip(d)) as BlogDoc);
  const rewrittenTranslated = translated.map((d) => {
    const doc = rewriteDoc({ ...strip(d), locale: "en" }) as BlogDoc;
    return { ...doc, _id: `blogPost.yoobe.${doc.slug.current}` };
  });
  return [...rewrittenExisting, ...rewrittenTranslated];
}

async function main() {
  const [ndjson, translatedDir, ...flags] = process.argv.slice(2);
  if (!ndjson || !translatedDir) {
    console.error("uso: tsx scripts/blog-migrate-to-yoobe.ts <data.ndjson> <dir traduzidos> [--dry-run]");
    process.exit(1);
  }
  const all = readFileSync(ndjson, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l) as BlogDoc);
  const existing = selectEnglishPosts(all);
  const translated = readdirSync(translatedDir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => JSON.parse(readFileSync(join(translatedDir, f), "utf8")) as BlogDoc);
  const fallbackEn = getFallbackBlogPosts("en").map(
    (f) =>
      ({
        _id: `fallback-en-${f.slug}`,
        _type: "blogPost",
        locale: "en",
        title: f.title,
        slug: { _type: "slug", current: f.slug },
        excerpt: f.excerpt,
        category: f.category,
        publishedAt: f.publishedAt,
        readTimeMinutes: f.readTimeMinutes,
        author: f.author,
        tags: f.tags,
        relatedKeywords: f.relatedKeywords,
        seo: f.seo,
        body: f.body ?? [],
        _coverUrl: f.coverImage?.asset?.url,
        _coverAlt: f.coverImage?.alt,
      }) as unknown as BlogDoc,
  );
  const base = buildYoobeBlogDocs(existing, translated);
  const productionEnSlugs = all.filter((d) => d._type === "blogPost" && d.locale === "en").map((d) => d.slug.current);
  const extra = buildYoobeBlogDocs([], pickMissingFallbackPosts(fallbackEn, base, productionEnSlugs));
  const docs = [...base, ...extra];

  const slugs = docs.map((d) => d.slug.current);
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (dupes.length) throw new Error(`slugs duplicados: ${dupes.join(", ")}`);
  const visible = JSON.stringify(docs, (k, v) => (k === "_key" || k === "_ref" ? undefined : v));
  const leftover = visible.match(/.{0,40}4\s*-?\s*unik.{0,20}/i);
  if (leftover) throw new Error(`marca 4unik sobrou: ${leftover[0]}`);

  console.log(`blog-migrate-to-yoobe: ${existing.length} EN existentes + ${translated.length} traduzidos = ${docs.length}`);
  for (const d of docs) console.log(`  ${d._id}  /blog/${d.slug.current}/  ${d.title}`);
  if (flags.includes("--dry-run")) return;

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: "yoobe",
    apiVersion: "2024-03-17",
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  });
  for (const d of docs) {
    const rec = d as BlogDoc & { _coverUrl?: string; _coverAlt?: string };
    if (rec._coverUrl) {
      const res = await fetch(rec._coverUrl);
      const asset = await client.assets.upload("image", Buffer.from(await res.arrayBuffer()), { filename: `${d.slug.current}.jpg` });
      (d as Record<string, unknown>).coverImage = { _type: "image", alt: rec._coverAlt, asset: { _type: "reference", _ref: asset._id } };
    }
    delete (d as Record<string, unknown>)._coverUrl;
    delete (d as Record<string, unknown>)._coverAlt;
  }
  const existingIds = await client.fetch<string[]>('*[_type=="blogPost"]._id');
  const tx = client.transaction();
  for (const id of existingIds) tx.delete(id);
  for (const d of docs) tx.createOrReplace(d);
  await tx.commit();
  console.log(`blog-migrate-to-yoobe: ${docs.length} posts gravados em yoobe (${existingIds.length} antigos removidos)`);
}

if (process.argv[1]?.endsWith("blog-migrate-to-yoobe.ts")) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
