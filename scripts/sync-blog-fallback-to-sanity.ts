#!/usr/bin/env npx tsx
/**
 * Sincroniza o conteúdo editorial de `src/lib/blogFallback.ts` para documentos
 * `blogPost` existentes no Sanity (match por `slug.current` + `locale`).
 *
 * Requer escrita no dataset:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   SANITY_API_TOKEN ou SANITY_API_WRITE_TOKEN (ver docs/cms.md)
 *
 * Uso:
 *   npx tsx scripts/sync-blog-fallback-to-sanity.ts --dry-run
 *   npx tsx scripts/sync-blog-fallback-to-sanity.ts
 *   npx tsx scripts/sync-blog-fallback-to-sanity.ts --locale pt
 *   npx tsx scripts/sync-blog-fallback-to-sanity.ts --patch-only   # só atualiza slugs 1–7 já existentes; não cria
 *   npx tsx scripts/sync-blog-fallback-to-sanity.ts --skip-cover
 */

import { Buffer } from "node:buffer";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SanityClient } from "@sanity/client";
import groq from "groq";
import type { BlogPostDoc } from "../src/sanity/lib/types";
import { getFallbackBlogPosts } from "../src/lib/blogFallback";
import type { Locale } from "../src/lib/locale";

function loadEnvLocal() {
  const p = join(process.cwd(), ".env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

loadEnvLocal();

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
/** Por defeito cria documentos com slug 1–7 se ainda não existirem (o seed antigo usa outros slugs). */
const PATCH_ONLY = args.includes("--patch-only");
const CREATE_MISSING = !PATCH_ONLY;
const SKIP_COVER = args.includes("--skip-cover");
const localeIdx = args.indexOf("--locale");
const LOCALE_FILTER =
  localeIdx !== -1 && args[localeIdx + 1] ? (args[localeIdx + 1] as Locale) : null;

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "";
const TOKEN =
  process.env.SANITY_API_TOKEN?.trim() ||
  process.env.SANITY_API_WRITE_TOKEN?.trim() ||
  "";

const PLACEHOLDER_IDS = new Set(["", "placeholder", "your-project-id", "xxx", "changeme"]);

function isPlaceholderProject(id: string) {
  return !id || PLACEHOLDER_IDS.has(id.toLowerCase());
}

async function uploadCoverFromUrl(
  client: SanityClient,
  url: string,
  filename: string,
  alt: string,
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string }; alt?: string }> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ao obter ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buf, { filename, label: alt.slice(0, 80) });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: alt || undefined,
  };
}

const postIdBySlugQuery = groq`
  *[_type == "blogPost" && locale == $locale && slug.current == $slug][0]{ _id }
`;

async function resolveDocumentId(
  client: SanityClient,
  locale: Locale,
  slug: string,
): Promise<string | null> {
  const row = await client.fetch<{ _id?: string } | null>(postIdBySlugQuery, { locale, slug });
  return row?._id ?? null;
}

function buildPatchPayload(post: BlogPostDoc, coverImage: BlogPostDoc["coverImage"]) {
  return {
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readTimeMinutes: post.readTimeMinutes,
    featured: post.featured ?? false,
    author: post.author,
    tags: post.tags ?? [],
    relatedKeywords: post.relatedKeywords ?? [],
    seo: post.seo ?? undefined,
    body: post.body ?? [],
    ...(coverImage ? { coverImage } : {}),
  };
}

async function main() {
  if (DRY && (isPlaceholderProject(PROJECT_ID) || !DATASET || !TOKEN)) {
    const locales: Locale[] =
      LOCALE_FILTER === "pt" || LOCALE_FILTER === "en"
        ? [LOCALE_FILTER]
        : ["pt", "en"];
    console.log("\n[DRY-RUN] Sem credenciais Sanity — apenas contagens do fallback:\n");
    for (const locale of locales) {
      for (const post of getFallbackBlogPosts(locale)) {
        console.log(
          `   [${locale}] slug ${post.slug} — body ${post.body?.length ?? 0} blocos — ${post.title.slice(0, 56)}…`,
        );
      }
    }
    console.log("\nPara aplicar no dataset, configure .env.local e execute sem --dry-run.\n");
    return;
  }

  if (isPlaceholderProject(PROJECT_ID) || !DATASET) {
    console.error(
      "Configure NEXT_PUBLIC_SANITY_PROJECT_ID e NEXT_PUBLIC_SANITY_DATASET (valores reais, não placeholder).",
    );
    process.exit(1);
  }
  if (!TOKEN) {
    console.error(
      "Defina SANITY_API_TOKEN ou SANITY_API_WRITE_TOKEN (token com permissão Editor / escrita no dataset).",
    );
    process.exit(1);
  }

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-03-17",
    token: TOKEN,
    useCdn: false,
  });

  const locales: Locale[] =
    LOCALE_FILTER === "pt" || LOCALE_FILTER === "en"
      ? [LOCALE_FILTER]
      : ["pt", "en"];

  console.log(
    `\nSincronizar blog fallback → Sanity (${DATASET})${DRY ? " [DRY-RUN]" : ""}${SKIP_COVER ? " [sem capa]" : ""}${PATCH_ONLY ? " [só patch]" : " [criar slug 1–7 se faltar]"}\n`,
  );
  if (!DRY && CREATE_MISSING) {
    console.log(
      "   Nota: posts do seed (`sanity-seed-data`) usam slugs longos; estes são slugs numéricos 1–7 do fallback (documentos distintos).\n",
    );
  }

  for (const locale of locales) {
    const posts = getFallbackBlogPosts(locale);
    for (const post of posts) {
      const label = `[${locale}] ${post.slug} — ${post.title.slice(0, 50)}…`;

      let coverImage: BlogPostDoc["coverImage"] | undefined;
      if (!SKIP_COVER) {
        const url = post.coverImage?.asset?.url?.trim();
        if (url && !DRY) {
          try {
            coverImage = await uploadCoverFromUrl(
              client,
              url,
              `blog-${locale}-${post.slug}-cover.jpg`,
              post.coverImage?.alt || post.title,
            );
          } catch (e) {
            console.warn(`   ⚠️  Capa falhou (${label}): ${(e as Error).message}`);
          }
        }
      }

      const payload = buildPatchPayload(post, coverImage);

      if (DRY) {
        console.log(`   [dry-run] ${label} — patch: body ${payload.body?.length ?? 0} blocos`);
        continue;
      }

      const existingId = await resolveDocumentId(client, locale, post.slug);

      if (existingId) {
        await client.patch(existingId).set(payload).commit();
        console.log(`   ✅ Atualizado ${existingId} — ${label}`);
        continue;
      }

      if (CREATE_MISSING) {
        const newId = `blogPost.sync.${locale}.${post.slug}`;
        await client.createOrReplace({
          _id: newId,
          _type: "blogPost",
          locale,
          slug: { _type: "slug", current: post.slug },
          publishedAt: post.publishedAt,
          aiGenerated: false,
          ...payload,
        });
        console.log(`   ✅ Criado ${newId} — ${label}`);
        continue;
      }

      console.warn(
        `   ⏭️  Sem documento para slug "${post.slug}" (${locale}) e --patch-only está ativo — não criado.`,
      );
    }
  }

  console.log("\nConcluído.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
