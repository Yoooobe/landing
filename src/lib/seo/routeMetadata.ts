import type { Metadata } from "next";
import { BASE_PATH } from "@/lib/basePath";
import { pageAbsoluteUrl, siteMetadataBase, SITE_NAME } from "@/lib/site";
import { DEFAULT_OG_IMAGE_PATH, resolveRouteOgImagePath } from "@/lib/seo/ogImages";

/**
 * Textos de SEO/AEO partilhados: editar nos segmentos `src/messages/segments/*`
 * e usar estes builders em `layout.tsx` / `page.tsx` para evitar drift entre
 * metadata, Open Graph e copy.
 */
export type PageSeoCopy = {
  readonly title: string;
  readonly description: string;
  readonly openGraphDescription?: string;
};

type OgLocale = "pt_BR" | "en_US";
type LanguageAlternates = Record<string, string>;

type RouteMetadataOptions = {
  canonicalPath: string;
  languages: LanguageAlternates;
  openGraphPath: string;
  ogLocale: OgLocale;
  robots?: Metadata["robots"];
  /** Maps to `public/og/4unik-*.png` via `resolveRouteOgImagePath`. */
  ogRouteKey?: string;
};

/** Garante URL absoluta com origem + BASE_PATH (ex.: plataforma.4unik.com.br/...). */
function absoluteAlternateUrl(path: string): string {
  return pageAbsoluteUrl(path);
}

function absoluteLanguageAlternates(languages: LanguageAlternates): LanguageAlternates {
  return Object.fromEntries(
    Object.entries(languages).map(([locale, path]) => [locale, absoluteAlternateUrl(path)]),
  ) as LanguageAlternates;
}

function withSharedMetadata(
  seo: PageSeoCopy,
  options: RouteMetadataOptions,
): Metadata {
  const ogDesc = seo.openGraphDescription ?? seo.description;
  const ogImagePath = resolveRouteOgImagePath(options.ogRouteKey);
  const defaultOgImage = pageAbsoluteUrl(ogImagePath || DEFAULT_OG_IMAGE_PATH);
  const canonical = absoluteAlternateUrl(options.canonicalPath);
  const openGraphUrl = absoluteAlternateUrl(options.openGraphPath);
  const languages = absoluteLanguageAlternates(options.languages);

  return {
    metadataBase: siteMetadataBase(),
    icons: {
      icon: [
        { url: `${BASE_PATH}/favicon.ico` },
        { url: `${BASE_PATH}/brand/4unik-mark.png`, type: "image/png" },
      ],
      apple: `${BASE_PATH}/brand/4unik-mark.png`,
    },
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: seo.title,
      description: ogDesc,
      url: openGraphUrl,
      locale: options.ogLocale,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} social preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: ogDesc,
      images: [defaultOgImage],
    },
    robots: options.robots,
    other: {
      "content-language": options.ogLocale === "en_US" ? "en" : "pt-BR",
    },
  };
}

function buildPtEnAlternates(ptPath: string, enPath: string): LanguageAlternates {
  return {
    "pt-BR": ptPath,
    en: enPath,
    "x-default": ptPath,
  };
}

/** Layout raiz (PT) e home `/` — `openGraph.url` absoluto. */
export function buildRootLayoutMetadata(seo: PageSeoCopy): Metadata {
  return withSharedMetadata(seo, {
    canonicalPath: "/",
    languages: buildPtEnAlternates("/", "/en/"),
    openGraphPath: "/",
    ogLocale: "pt_BR",
    ogRouteKey: "home",
  });
}

/** Segmento `/en/` — metadata em inglês para home e filhos sem `metadata` próprio. */
export function buildEnSegmentLayoutMetadata(seo: PageSeoCopy): Metadata {
  return withSharedMetadata(seo, {
    canonicalPath: "/en/",
    languages: buildPtEnAlternates("/", "/en/"),
    openGraphPath: "/en/",
    ogLocale: "en_US",
    ogRouteKey: "home",
  });
}

export function buildRoutePageMetadata(
  seo: PageSeoCopy,
  options: RouteMetadataOptions,
): Metadata {
  const languages = {
    ...options.languages,
    "x-default": options.languages["x-default"] ?? options.languages["pt-BR"] ?? options.canonicalPath,
  };

  return withSharedMetadata(seo, {
    ...options,
    languages,
  });
}
