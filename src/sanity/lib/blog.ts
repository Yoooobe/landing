import type { Locale } from "@/lib/locale";
import { getFallbackBlogPostBySlug, getFallbackBlogPosts } from "@/lib/blogFallback";
import { getSanityClient } from "@/sanity/lib/client";
import {
  bodyHasBlogCta,
  injectFallbackBlogCtas,
} from "@/sanity/lib/mergeBlogPostBody";
import type { BlogPostDoc, BlogPostListItem } from "@/sanity/lib/types";
import {
  blogPostBySlugQuery,
  blogPostListQuery,
  blogPostSlugExistsQuery,
  blogPostSlugsQuery,
  type BlogPostBySlugQueryResult,
  type BlogPostListQueryResult,
} from "@/sanity/queries/blog";

type SlugEntry = { slug?: string | null };

function isPortableBodyEmpty(body: BlogPostDoc["body"]): boolean {
  return !body || !Array.isArray(body) || body.length === 0;
}

function hasCoverAsset(cover: BlogPostDoc["coverImage"]): boolean {
  const url = cover?.asset?.url;
  const ref = cover?.asset?._ref;
  return Boolean(url || ref);
}

function mergeBlogBody(cms: BlogPostDoc, fb: BlogPostDoc): BlogPostDoc["body"] {
  if (isPortableBodyEmpty(cms.body)) return fb.body;
  if (bodyHasBlogCta(cms.body)) return cms.body;
  return injectFallbackBlogCtas(cms.body!, fb.body, cms.locale);
}

function mergeCmsPostWithFallback(cms: BlogPostDoc, fb: BlogPostDoc): BlogPostDoc {
  return {
    ...fb,
    ...cms,
    title: cms.title?.trim() || fb.title,
    excerpt: cms.excerpt?.trim() || fb.excerpt,
    body: mergeBlogBody(cms, fb),
    slug: cms.slug || fb.slug,
    category: cms.category?.trim() || fb.category,
    coverImage: hasCoverAsset(cms.coverImage) ? cms.coverImage : fb.coverImage,
    seo:
      cms.seo?.metaTitle?.trim() || cms.seo?.metaDescription?.trim()
        ? cms.seo
        : fb.seo,
    relatedKeywords:
      cms.relatedKeywords && cms.relatedKeywords.length > 0
        ? cms.relatedKeywords
        : fb.relatedKeywords,
    author: cms.author?.trim() || fb.author,
    tags: cms.tags && cms.tags.length > 0 ? cms.tags : fb.tags,
    readTimeMinutes:
      typeof cms.readTimeMinutes === "number" && cms.readTimeMinutes > 0
        ? cms.readTimeMinutes
        : fb.readTimeMinutes,
    publishedAt: cms.publishedAt || fb.publishedAt,
  };
}

function enrichListItemWithFallback(
  cms: BlogPostDoc,
  bySlug: Map<string, BlogPostDoc>,
): BlogPostDoc {
  const fb = bySlug.get(cms.slug);
  if (!fb) return cms;
  return {
    ...cms,
    excerpt: cms.excerpt?.trim() || fb.excerpt,
    coverImage: hasCoverAsset(cms.coverImage) ? cms.coverImage : fb.coverImage,
    readTimeMinutes:
      typeof cms.readTimeMinutes === "number" && cms.readTimeMinutes > 0
        ? cms.readTimeMinutes
        : fb.readTimeMinutes,
    category: cms.category?.trim() || fb.category,
  };
}

/** União de slugs do CMS com slugs do fallback local — garante export estático de /blog/1 … mesmo quando o dataset só tem outros slugs. */
function unionSlugs(cmsSlugs: string[], locale: Locale): string[] {
  const fallbackSlugs = getFallbackBlogPosts(locale).map((p) => p.slug);
  return [...new Set([...cmsSlugs, ...fallbackSlugs])];
}

export async function getBlogPosts(locale: Locale): Promise<BlogPostDoc[]> {
  const client = getSanityClient();
  const fallbacks = getFallbackBlogPosts(locale);
  const bySlug = new Map(fallbacks.map((p) => [p.slug, p]));

  if (!client) return fallbacks;

  try {
    const posts = await client.fetch<BlogPostListQueryResult>(blogPostListQuery, { locale });
    if (!Array.isArray(posts) || posts.length === 0) {
      return fallbacks;
    }
    return posts.map((p) => enrichListItemWithFallback(p as BlogPostDoc, bySlug));
  } catch {
    return fallbacks;
  }
}

export async function getBlogPostBySlug(
  locale: Locale,
  slug: string,
): Promise<BlogPostDoc | null> {
  const fb = getFallbackBlogPostBySlug(locale, slug);
  const client = getSanityClient();
  if (!client) return fb;

  try {
    const post = await client.fetch<BlogPostBySlugQueryResult>(blogPostBySlugQuery, {
      locale,
      slug,
    });
    if (!post) return fb;
    if (!fb) return post;
    return mergeCmsPostWithFallback(post, fb);
  } catch {
    return fb;
  }
}

export async function getBlogStaticSlugs(locale: Locale): Promise<string[]> {
  const client = getSanityClient();
  const fallbackSlugs = getFallbackBlogPosts(locale).map((post) => post.slug);
  if (!client) return fallbackSlugs;

  try {
    const slugs = await client.fetch<SlugEntry[]>(blogPostSlugsQuery, { locale });
    const fromCms = slugs
      .map((entry) => entry.slug?.trim())
      .filter((s): s is string => Boolean(s));

    const merged = unionSlugs(fromCms, locale);
    return merged.length > 0 ? merged : fallbackSlugs;
  } catch {
    return fallbackSlugs;
  }
}

/** Same-category posts first, then recency; for "read more" / AEO internal linking. */
export async function getRelatedBlogPosts(
  locale: Locale,
  currentSlug: string,
  category: string | undefined,
  limit = 3,
): Promise<BlogPostListItem[]> {
  const all = await getBlogPosts(locale);
  const others = all.filter((p) => p.slug !== currentSlug);
  const sameCategory = category
    ? others.filter((p) => p.category === category)
    : [];
  const rest = others.filter((p) => !sameCategory.includes(p));
  return [...sameCategory, ...rest].slice(0, limit);
}

export async function hasBlogPostWithSlug(locale: Locale, slug: string): Promise<boolean> {
  if (getFallbackBlogPostBySlug(locale, slug)) {
    return true;
  }

  const client = getSanityClient();
  if (!client) {
    return false;
  }

  try {
    return await client.fetch<boolean>(blogPostSlugExistsQuery, { locale, slug });
  } catch {
    return false;
  }
}
