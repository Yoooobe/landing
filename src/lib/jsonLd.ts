import { pageAbsoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import { enHome } from "@/messages/segments/en-home";
import { ptHome } from "@/messages/segments/pt-home";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { BlogPostDoc } from "@/sanity/lib/types";

/** Tópicos estáveis para `knowsAbout` (AEO / assistentes que consomem schema.org). */
const ORGANIZATION_KNOWS_ABOUT = [
  "Employee engagement",
  "Corporate gamification",
  "Reward infrastructure",
  "HR technology",
  "APIs and webhooks for recognition programs",
] as const;

/** Descrição alinhada a `ptHome.seo.description` (fonte única para entidade no schema). */
export function buildOrganizationJsonLd(description: string = ptHome.seo.description) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description,
    knowsAbout: [...ORGANIZATION_KNOWS_ABOUT],
  } as const;
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["pt-BR", "en-US"],
  } as const;
}

/** Breadcrumbs for deep pages (blog, marketing routes with hierarchy). */
export function buildBreadcrumbListJsonLd(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: pageAbsoluteUrl(item.path),
    })),
  } as const;
}

/**
 * Product-oriented schema for the reward platform (conservative wording; no performance claims).
 */
export function buildSoftwareApplicationJsonLd(locale: "pt" | "en") {
  const description =
    locale === "en" ? enHome.seo.description : ptHome.seo.description;
  const appName = locale === "en" ? `${SITE_NAME} platform` : `Plataforma ${SITE_NAME}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: appName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description,
    url: SITE_URL,
  } as const;
}

export function buildFaqPageJsonLd(
  pageUrl: string,
  items: readonly { q: string; a: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  } as const;
}

export function buildBlogPostingJsonLd(
  pageUrl: string,
  post: BlogPostDoc,
  locale: "pt" | "en",
) {
  const imageUrl = getSanityImageUrl(post.seo?.openGraphImage || post.coverImage);
  const publishedAt = post.publishedAt || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo?.metaDescription || post.excerpt,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: publishedAt,
    dateModified: publishedAt,
    inLanguage: locale === "pt" ? "pt-BR" : "en-US",
    articleSection: post.category,
    keywords: post.relatedKeywords?.filter(Boolean),
    author: buildOrganizationJsonLd(),
    publisher: {
      ...buildOrganizationJsonLd(),
      logo: {
        "@type": "ImageObject",
        url: pageAbsoluteUrl("/brand/4unik-mark.webp"),
      },
    },
  } as const;
}
