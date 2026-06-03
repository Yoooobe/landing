import type { Locale } from "@/lib/locale";
import { buildBreadcrumbListJsonLd } from "@/lib/jsonLd";

const PAGE_LABELS: Record<
  Locale,
  {
    home: string;
    plataforma: string;
    inteligencia: string;
    gamificacao: string;
    casos: string;
    paraPlataformas: string;
    educacao: string;
    vendas: string;
    comunidades: string;
    eventos: string;
  }
> = {
  pt: {
    home: "Início",
    plataforma: "Plataforma",
    inteligencia: "Inteligência",
    gamificacao: "Gamificação",
    casos: "Casos de uso",
    paraPlataformas: "Para plataformas e SaaS",
    educacao: "Para educação e e-learning",
    vendas: "Para times de vendas",
    comunidades: "Para criadores e comunidades",
    eventos: "Para eventos",
  },
  en: {
    home: "Home",
    plataforma: "Platform",
    inteligencia: "Intelligence",
    gamificacao: "Gamification",
    casos: "Use cases",
    paraPlataformas: "For platforms & SaaS",
    educacao: "For education & e-learning",
    vendas: "For sales teams",
    comunidades: "For creators & communities",
    eventos: "For events",
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
    "para-plataformas": L.paraPlataformas,
    educacao: L.educacao,
    vendas: L.vendas,
    comunidades: L.comunidades,
    eventos: L.eventos,
  };

  const pageName = slugToName[slug];
  if (!pageName) return null;

  return buildBreadcrumbListJsonLd([
    { name: L.home, path: homePath },
    { name: pageName, path: pagePath },
  ]);
}

/** Breadcrumb JSON-LD for `/plataforma/motor-gamificacao/` (slug CMS: `gamificacao`). */
export function buildGamificacaoMotorBreadcrumbJsonLd(locale: Locale, pagePath: string) {
  const L = labels(locale);
  const homePath = locale === "en" ? "/en/" : "/";
  const plataformaPath = locale === "en" ? "/en/plataforma/" : "/plataforma/";

  return buildBreadcrumbListJsonLd([
    { name: L.home, path: homePath },
    { name: L.plataforma, path: plataformaPath },
    { name: L.gamificacao, path: pagePath },
  ]);
}

/** Breadcrumb JSON-LD for platform sub-feature pages (`loja-resgate`, etc.). */
export function buildPlatformFeatureBreadcrumbJsonLd(
  locale: Locale,
  featureName: string,
  pagePath: string,
) {
  const L = labels(locale);
  const homePath = locale === "en" ? "/en/" : "/";
  const plataformaPath = locale === "en" ? "/en/plataforma/" : "/plataforma/";

  return buildBreadcrumbListJsonLd([
    { name: L.home, path: homePath },
    { name: L.plataforma, path: plataformaPath },
    { name: featureName, path: pagePath },
  ]);
}
