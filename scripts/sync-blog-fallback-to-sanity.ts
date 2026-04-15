#!/usr/bin/env npx tsx
/**
 * Empurra o conteúdo de `src/lib/blogFallback.ts` para o Sanity.
 *
 * Modo por defeito (**novos documentos landing**): cria/atualiza apenas documentos com
 * `_id` `blogPost.landing.{locale}.fb-{1–7}` e `slug` público derivado do título (`…-fbN`).
 * Não faz patch a outros `blogPost` (preserva CTAs, imagens e copy melhorada no Studio).
 *
 * Modo legado (`--legacy-numeric`): comportamento antigo — `slug.current` igual a `"1"`…`"7"`,
 * patch ou `blogPost.sync.*` (pode sobrescrever corpo inteiro).
 *
 * Requer: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * SANITY_API_TOKEN ou SANITY_API_WRITE_TOKEN (ver docs/cms.md)
 *
 * Uso:
 *   npx tsx scripts/sync-blog-fallback-to-sanity.ts --dry-run
 *   npx tsx scripts/sync-blog-fallback-to-sanity.ts
 *   npx tsx scripts/sync-blog-fallback-to-sanity.ts --locale pt
 *   npx tsx scripts/sync-blog-fallback-to-sanity.ts --legacy-numeric
 *   npx tsx scripts/sync-blog-fallback-to-sanity.ts --legacy-numeric --patch-only
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
const LEGACY_NUMERIC = args.includes("--legacy-numeric");
const LEGACY_PATCH_ONLY = args.includes("--patch-only");
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

/** Mesma regra que `scripts/generate-blog-posts.mjs` / Studio slug. */
function buildSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function landingDocumentId(locale: Locale, numericSlug: string): string {
  return `blogPost.landing.${locale}.fb-${numericSlug}`;
}

function proposedPublicSlug(post: BlogPostDoc): string {
  const base = buildSlug(post.title);
  const suffix = `-fb${post.slug}`;
  return `${base}${suffix}`.slice(0, 96);
}

async function ensureUniqueSlug(
  client: SanityClient,
  locale: Locale,
  preferred: string,
  ownDocumentId: string,
): Promise<string> {
  let candidate = preferred.replace(/-+$/, "") || "post";
  let n = 0;
  while (true) {
    const row = await client.fetch<{ _id?: string } | null>(
      groq`*[_type == "blogPost" && locale == $locale && slug.current == $slug && _id != $ownId][0]{ _id }`,
      { locale, slug: candidate, ownId: ownDocumentId },
    );
    if (!row?._id) return candidate;
    n += 1;
    candidate = `${preferred}-${n}`.slice(0, 96);
  }
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

async function resolveDocumentIdBySlug(
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
        const landId = landingDocumentId(locale, post.slug);
        const pub = proposedPublicSlug(post);
        console.log(
          `   [${locale}] fallback slug ${post.slug} — body ${post.body?.length ?? 0} blocos — landing _id ${landId} — slug público ~ ${pub}`,
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

  const modeLabel = LEGACY_NUMERIC
    ? LEGACY_PATCH_ONLY
      ? "legado: só patch slug 1–7"
      : "legado: patch/criar slug 1–7 (blogPost.sync.*)"
    : "novos documentos landing (blogPost.landing.* — não altera outros posts)";

  console.log(
    `\nSincronizar blog fallback → Sanity (${DATASET})${DRY ? " [DRY-RUN]" : ""}${SKIP_COVER ? " [sem capa]" : ""}\n   Modo: ${modeLabel}\n`,
  );

  if (!DRY && !LEGACY_NUMERIC) {
    console.log(
      "   Documentos alvo: blogPost.landing.{pt|en}.fb-1 … fb-7. Slug público: título + sufixo -fbN. Posts já no CMS (seed, edições manuais) não são modificados.\n",
    );
  }

  if (!DRY && LEGACY_NUMERIC) {
    console.log(
      "   Aviso: modo legado pode substituir o corpo inteiro dos posts com slug 1–7.\n",
    );
  }

  const legacyCreateMissing = !LEGACY_PATCH_ONLY;

  for (const locale of locales) {
    const posts = getFallbackBlogPosts(locale);
    for (const post of posts) {
      const label = `[${locale}] fb-${post.slug} — ${post.title.slice(0, 50)}…`;

      let coverImage: BlogPostDoc["coverImage"] | undefined;
      if (!SKIP_COVER) {
        const url = post.coverImage?.asset?.url?.trim();
        if (url && !DRY) {
          try {
            coverImage = await uploadCoverFromUrl(
              client,
              url,
              `blog-${locale}-fb-${post.slug}-cover.jpg`,
              post.coverImage?.alt || post.title,
            );
          } catch (e) {
            console.warn(`   ⚠️  Capa falhou (${label}): ${(e as Error).message}`);
          }
        }
      }

      const payload = buildPatchPayload(post, coverImage);

      if (!LEGACY_NUMERIC) {
        const docId = landingDocumentId(locale, post.slug);
        const preferredSlug = proposedPublicSlug(post);

        if (DRY) {
          console.log(
            `   [dry-run] ${label} → _id ${docId} — slug ~ ${preferredSlug} — body ${payload.body?.length ?? 0} blocos`,
          );
          continue;
        }

        const slugCurrent = await ensureUniqueSlug(client, locale, preferredSlug, docId);
        await client.createOrReplace({
          _id: docId,
          _type: "blogPost",
          locale,
          slug: { _type: "slug", current: slugCurrent },
          publishedAt: post.publishedAt,
          aiGenerated: false,
          ...payload,
        });
        console.log(`   ✅ Landing ${docId} — slug público: ${slugCurrent} — ${label}`);
        continue;
      }

      // ── Legacy: slug numérico 1–7 ─────────────────────────────────────
      if (DRY) {
        console.log(`   [dry-run] [legado] ${label} — patch slug "${post.slug}" — body ${payload.body?.length ?? 0} blocos`);
        continue;
      }

      const existingId = await resolveDocumentIdBySlug(client, locale, post.slug);

      if (existingId) {
        await client.patch(existingId).set(payload).commit();
        console.log(`   ✅ [legado] Atualizado ${existingId} — ${label}`);
        continue;
      }

      if (legacyCreateMissing) {
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
        console.log(`   ✅ [legado] Criado ${newId} — ${label}`);
        continue;
      }

      console.warn(
        `   ⏭️  [legado] Sem documento para slug "${post.slug}" (${locale}) e --patch-only — ignorado.`,
      );
    }
  }

  console.log("\nConcluído.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
