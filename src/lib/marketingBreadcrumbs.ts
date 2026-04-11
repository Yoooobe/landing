import type { Locale } from "@/lib/locale";
import { buildBreadcrumbListJsonLd } from "@/lib/jsonLd";

const PAGE_LABELS: Record<
  Locale,
  { home: string; plataforma: string; inteligencia: string; gamificacao: string; casos: string }
> = {
  pt: {
    home: "Início",
    plataforma: "Plataforma",
    inteligencia: "Inteligência",
    gamificacao: "Gamificação",
    casos: "Casos de uso",
  },
  en: {
    home: "Home",
    plataforma: "Platform",
    inteligencia: "Intelligence",
    gamificacao: "Gamification",
    casos: "Use cases",
  },
};

function labels(locale: Locale) {
  return PAGE_LABELS[locale];
}

/** Breadcrumb JSON-LD for top-level marketing routes that use `MarketingPageWithFaq`. */
export function buildMarketingPageBreadcrumbJsonLd(
  locale: Locale,
  slug: string,
  pagePath: string,
) {
  const L = labels(locale);
  const homePath = locale === "en" ? "/en/" : "/";

  const slugToName: Record<string, string | undefined> = {
    plataforma: L.plataforma,
    inteligencia: L.inteligencia,
    gamificacao: L.gamificacao,
    "casos-de-uso": L.casos,
  };

  const pageName = slugToName[slug];
  if (!pageName) return null;

  return buildBreadcrumbListJsonLd([
    { name: L.home, path: homePath },
    { name: pageName, path: pagePath },
  ]);
}
