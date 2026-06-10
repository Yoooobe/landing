import type { Locale } from "@/lib/locale";
import { buildBreadcrumbListJsonLd } from "@/lib/jsonLd";
import { isRewardInfrastructureSlug } from "@/lib/rewardInfrastructurePaths";

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
    rewardInfrastructure: string;
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
    rewardInfrastructure: "Infraestrutura de recompensas",
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
    rewardInfrastructure: "Reward infrastructure",
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

  if (isRewardInfrastructureSlug(slug)) {
    return buildBreadcrumbListJsonLd([
      { name: L.home, path: homePath },
      { name: L.rewardInfrastructure, path: pagePath },
    ]);
  }

  const pageName = slugToName[slug];
  if (!pageName) return null;

  return buildBreadcrumbListJsonLd([
    { name: L.home, path: homePath },
    { name: pageName, path: pagePath },
  ]);
}

const CAMPANHAS_LABELS: Record<Locale, string> = {
  pt: "Campanhas de gamificação",
  en: "Gamification campaigns",
};

const WORKVIVO_LABELS: Record<Locale, string> = {
  pt: "Workvivo",
  en: "Workvivo",
};

const API_INTEGRACOES_LABELS: Record<Locale, string> = {
  pt: "API e Integrações",
  en: "API & Integrations",
};

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

/** Breadcrumb JSON-LD for `/plataforma/campanhas-gamificacao/`. */
export function buildGamificacaoCampanhasBreadcrumbJsonLd(locale: Locale, pagePath: string) {
  const L = labels(locale);
  const homePath = locale === "en" ? "/en/" : "/";
  const plataformaPath = locale === "en" ? "/en/plataforma/" : "/plataforma/";

  return buildBreadcrumbListJsonLd([
    { name: L.home, path: homePath },
    { name: L.plataforma, path: plataformaPath },
    { name: CAMPANHAS_LABELS[locale], path: pagePath },
  ]);
}

/** Breadcrumb JSON-LD for `/api-integracoes/workvivo/`. */
export function buildWorkvivoHubBreadcrumbJsonLd(locale: Locale, pagePath: string) {
  const L = labels(locale);
  const homePath = locale === "en" ? "/en/" : "/";
  const apiPath = locale === "en" ? "/en/api-integracoes/" : "/api-integracoes/";

  return buildBreadcrumbListJsonLd([
    { name: L.home, path: homePath },
    { name: API_INTEGRACOES_LABELS[locale], path: apiPath },
    { name: WORKVIVO_LABELS[locale], path: pagePath },
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
