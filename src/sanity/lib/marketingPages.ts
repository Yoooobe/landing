import { createClient } from "next-sanity";
import type { Metadata } from "next";
import type { Locale } from "@/lib/locale";
import { buildRoutePageMetadata, type PageSeoCopy } from "@/lib/seo/routeMetadata";
import { ptCasosPage } from "@/messages/segments/pt-casos-page";
import { enCasosPage } from "@/messages/segments/en-casos-page";
import { enCasos } from "@/messages/segments/en-casos";
import { ptInteligenciaPage } from "@/messages/segments/pt-inteligencia-page";
import { enInteligenciaPage } from "@/messages/segments/en-inteligencia-page";
import { ptCasos } from "@/messages/segments/pt-casos";
import { ptLandingMore } from "@/messages/segments/pt-landing-more";
import { enLandingMore } from "@/messages/segments/en-landing-more";
import { ptPlataforma } from "@/messages/segments/pt-plataforma";
import { enPlataforma } from "@/messages/segments/en-plataforma";
import { BASE_PATH } from "@/lib/basePath";
import {
  apiVersion,
  dataset,
  isSanityConfigured,
  projectId,
} from "@/sanity/env";
import { getResolvedApiIntegracoesContent } from "@/sanity/lib/apiIntegracoes";
import { getResolvedGamificacaoContent } from "@/sanity/lib/gamificacao";
import { getResolvedHomeContent } from "@/sanity/lib/home";
import { getPlatformShowcaseMedia } from "@/sanity/lib/platformShowcase";
import type {
  LegacySectionBlockDoc,
  LegacySectionKey,
  MarketingPageDoc,
  PlatformShowcaseMediaDoc,
  ResolvedApiIntegracoesContent,
  ResolvedGamificacaoContent,
  ResolvedHomeContent,
} from "@/sanity/lib/types";
import {
  marketingPageBySlugQuery,
  type MarketingPageBySlugQueryResult,
} from "@/sanity/queries/marketing";

function inteligenciaBlocks(locale: Locale): MarketingPageDoc["content"] {
  const isEn = locale === "en";
  const page = isEn ? enInteligenciaPage : ptInteligenciaPage;

  return [
    {
      _key: "hero",
      _type: "heroBlock",
      headline: `${page.hero.titleBefore} ${page.hero.titleGradient}`,
      subheadline: page.hero.sub,
      ctaText: page.cta.button,
      ctaLink: "https://calendly.com/yoobeco/demo",
    },
    {
      _key: "core-capabilities",
      _type: "featureGridBlock",
      eyebrow: page.hero.badge,
      title: isEn
        ? "What the intelligence layer unlocks"
        : "O que a camada de inteligência desbloqueia",
      description: isEn
        ? "Core capabilities that make engagement programs more adaptive, personalized, and measurable."
        : "Capacidades centrais para transformar a operação de engajamento em algo mais adaptativo, personalizado e mensurável.",
      columns: "2",
      items: page.cards.map((card, index) => ({
        eyebrow: undefined,
        title: card.title,
        description: card.desc,
        icon: ["brain-circuit", "package", "target", "bar-chart-3"][index],
      })),
    },
    {
      _key: "workvivo-ai",
      _type: "featureGridBlock",
      eyebrow: isEn ? "Workvivo + AI" : "Workvivo + IA",
      title: `${page.workvivo.titleBefore} ${page.workvivo.titleGradient}`,
      description: page.workvivo.sub,
      columns: "3",
      items: page.workvivo.cases.map((item, index) => ({
        title: item.title,
        description: item.desc,
        icon: ["zap", "message-square", "target", "shield", "coins", "bar-chart-3"][index],
      })),
    },
    {
      _key: "faq",
      _type: "faqBlock",
      title: `${page.faq.titleBefore} ${page.faq.titleGradient} ${page.faq.titleAfter}`.trim(),
      items: page.faq.items.map((item) => ({
        question: item.q,
        answer: item.a,
      })),
    },
    {
      _key: "cta",
      _type: "ctaBlock",
      eyebrow: isEn ? "Next step" : "Próximo passo",
      title: page.cta.title,
      description: page.cta.sub,
      primaryLabel: page.cta.button,
      primaryHref: "https://calendly.com/yoobeco/demo",
    },
  ];
}

function apiIntegracoesBlocks(
  locale: Locale,
  content: ResolvedApiIntegracoesContent,
): MarketingPageDoc["content"] {
  const isEn = locale === "en";

  return [
    {
      _key: "hero",
      _type: "heroBlock",
      headline: content.hero.title,
      subheadline: content.hero.description,
      ctaText: content.hero.primaryCtaLabel,
      ctaLink: content.hero.primaryCtaHref,
    },
    {
      _key: "features",
      _type: "featureGridBlock",
      title: content.features.title,
      description: content.features.description,
      columns: "3",
      items: content.features.items.map((item) => ({
        title: item.title,
        description: item.description,
        icon:
          item.icon === "shieldCheck"
            ? "shield"
            : item.icon === "plugZap"
              ? "zap"
              : item.icon === "refreshCw"
                ? "globe-2"
                : item.icon === "cpu"
                  ? "brain-circuit"
                  : "package",
      })),
    },
    {
      _key: "integrations",
      _type: "featureGridBlock",
      eyebrow: content.integrations.badge,
      title: `${content.integrations.title} ${content.integrations.titleGradient} ${content.integrations.titleAfter}`.trim(),
      description: `${content.integrations.description} ${content.integrations.extraIntegrationsLabel} ${content.integrations.extraIntegrations.join(" • ")}`.trim(),
      columns: "3",
      items: content.integrations.mainPlatforms.map((item) => ({
        eyebrow: item.badge,
        title: `${item.name}${item.by ? ` · ${item.by}` : ""}`,
        description: `${item.description} ${item.features.join(" • ")}`.trim(),
        icon: "link-2",
      })),
    },
    {
      _key: "modules",
      _type: "featureGridBlock",
      eyebrow: content.modules.badge,
      title: `${content.modules.titleBefore} ${content.modules.titleGradient} ${content.modules.titleAfter}`.trim(),
      description: content.modules.description,
      columns: "3",
      items: content.modules.items.map((item) => ({
        title: item.title,
        description: item.description,
        icon:
          item.icon === "lineChart"
            ? "bar-chart-3"
            : item.icon === "shoppingBag"
              ? "store"
              : item.icon === "gift"
                ? "sparkles"
                : item.icon === "lock"
                  ? "shield"
                  : item.icon,
      })),
    },
    {
      _key: "cta",
      _type: "ctaBlock",
      eyebrow: isEn ? "Next step" : "Proximo passo",
      title: content.finalCta.title,
      description: content.finalCta.description,
      primaryLabel: content.finalCta.buttonLabel,
      primaryHref: content.finalCta.buttonHref,
    },
  ];
}

function casosBlocks(locale: Locale): MarketingPageDoc["content"] {
  const isEn = locale === "en";
  const page = isEn ? enCasosPage : ptCasosPage;
  const cta = isEn ? enCasos.pageCta : ptCasos.pageCta;

  return [
    {
      _key: "hero",
      _type: "heroBlock",
      headline: `${page.hero.titleBefore} ${page.hero.titleGradient}${page.hero.titleAfter || ""}`,
      subheadline: page.hero.sub,
    },
    {
      _key: "case-studies",
      _type: "caseStudyGridBlock",
      challengeLabel: page.caseStudies.challengeLabel,
      resultsLabel: page.caseStudies.resultsLabel,
      items: page.caseStudies.cases.map((item) => ({
        company: item.company,
        industry: item.industry,
        title: item.title,
        description: item.description,
        challenge: item.challenge,
        metrics: item.metrics.map((metric) => ({
          value: metric.value,
          label: metric.label,
          tone: "tone" in metric ? metric.tone : undefined,
        })),
      })),
    },
    {
      _key: "faq",
      _type: "faqBlock",
      title: `${page.faq.titleBefore} ${page.faq.titleGradient} ${page.faq.titleAfter}`.trim(),
      items: page.faq.items.map((item) => ({
        question: item.q,
        answer: item.a,
      })),
    },
    {
      _key: "cta",
      _type: "ctaBlock",
      eyebrow: isEn ? "Next step" : "Próximo passo",
      title: cta.title,
      description: cta.body,
      primaryLabel: cta.cta,
      primaryHref: "https://calendly.com/yoobeco/demo",
    },
  ];
}

function portableTextParagraph(key: string, text: string) {
  return [
    {
      _key: key,
      _type: "block" as const,
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: `${key}-span`,
          _type: "span" as const,
          marks: [],
          text,
        },
      ],
    },
  ];
}

function plataformaBlocks(locale: Locale): MarketingPageDoc["content"] {
  const isEn = locale === "en";
  const page = isEn ? enPlataforma : ptPlataforma;
  const roadmap = isEn ? enLandingMore.aiRoadmap : ptLandingMore.aiRoadmap;

  return [
    {
      _key: "hero",
      _type: "heroBlock",
      headline: `${page.hero.titleLine1} ${page.hero.titleGradient}`,
      subheadline: page.hero.sub,
      ctaText: page.pageCta.cta,
      ctaLink: "https://calendly.com/yoobeco/demo",
    },
    {
      _key: "admin-dashboard",
      _type: "splitContentBlock",
      eyebrow: page.adminDashboard.badge,
      title: `${page.adminDashboard.titleBefore}${page.adminDashboard.titleGradient}${page.adminDashboard.titleAfter}`,
      body: portableTextParagraph("admin-dashboard-body", page.adminDashboard.body),
      bullets: page.adminDashboard.bullets.map((item) => `${item.title}: ${item.body}`),
      imageSide: "right",
    },
    {
      _key: "gamification-engine-intro",
      _type: "splitContentBlock",
      eyebrow: page.gamificationEngine.badge,
      title: `${page.gamificationEngine.titleBefore}${page.gamificationEngine.titleGradient}${page.gamificationEngine.titleAfter}`,
      body: portableTextParagraph("gamification-engine-body", page.gamificationEngine.body),
      bullets: [
        `${page.gamificationEngine.flowTitle}: ${page.gamificationEngine.flow.node1Title} -> ${page.gamificationEngine.flow.node2Title} -> ${page.gamificationEngine.flow.node3Title}`,
      ],
      imageSide: "left",
    },
    {
      _key: "gamification-engine-cards",
      _type: "featureGridBlock",
      eyebrow: isEn ? "Engine mechanics" : "Mecanicas do motor",
      title: isEn
        ? "How the platform turns goals into reward loops"
        : "Como a plataforma transforma metas em ciclos de recompensa",
      description: isEn
        ? "Use campaigns, peer recognition, and event-driven logic as reusable building blocks."
        : "Use campanhas, reconhecimento entre pares e logica orientada a eventos como blocos reutilizaveis.",
      columns: "2",
      items: page.gamificationEngine.cards.map((item, index) => ({
        title: item.title,
        description: item.body,
        icon: index === 0 ? "target" : "coins",
      })),
    },
    {
      _key: "store-intro",
      _type: "splitContentBlock",
      eyebrow: page.store.badge,
      title: `${page.store.titleBefore}${page.store.titleGradient}${page.store.titleAfter}`,
      body: portableTextParagraph(
        "store-intro-body",
        `${page.store.bodyBefore}${page.store.bodyStrong}${page.store.bodyAfter}`,
      ),
      imageSide: "right",
    },
    {
      _key: "store-features",
      _type: "featureGridBlock",
      eyebrow: isEn ? "Store operations" : "Operacao da loja",
      title: isEn
        ? "A catalog experience employees actually want to use"
        : "Uma experiencia de catalogo que os colaboradores realmente querem usar",
      description: isEn
        ? "Blend physical and digital rewards into a single redemption flow."
        : "Combine recompensas fisicas e digitais em um unico fluxo de resgate.",
      columns: "2",
      items: page.store.features.map((item, index) => ({
        title: item.title,
        description: item.desc,
        icon: index === 0 ? "store" : "sparkles",
      })),
    },
    {
      _key: "logistics",
      _type: "featureGridBlock",
      eyebrow: isEn ? "Fulfillment" : "Fulfillment",
      title: page.logistics.title,
      description: page.logistics.sub,
      columns: "3",
      items: page.logistics.cards.map((item, index) => ({
        title: item.title,
        description: item.body,
        icon: index === 0 ? "package" : index === 1 ? "globe-2" : "shield",
      })),
    },
    {
      _key: "ai-roadmap",
      _type: "featureGridBlock",
      eyebrow: roadmap.badge,
      title: `${roadmap.titleBefore}${roadmap.titleGradient}${roadmap.titleAfter}`,
      description: isEn
        ? "The same platform can evolve from operational control to intelligent orchestration."
        : "A mesma plataforma pode evoluir do controle operacional para a orquestracao inteligente.",
      columns: "4",
      items: roadmap.stages.map((stage, index) => ({
        eyebrow: stage.status,
        title: stage.title,
        description: stage.items.join(" • "),
        icon: index === 0 ? "sparkles" : index === 1 ? "coins" : index === 2 ? "zap" : "bar-chart-3",
      })),
    },
    {
      _key: "security",
      _type: "splitContentBlock",
      eyebrow: page.security.badge,
      title: page.security.title,
      body: portableTextParagraph("security-body", page.security.body),
      bullets: page.security.items.map((item) => `${item.title}: ${item.body}`),
      imageSide: "left",
    },
    {
      _key: "faq",
      _type: "faqBlock",
      title: `${page.faq.titleBefore} ${page.faq.titleGradient} ${page.faq.titleAfter}`.trim(),
      items: page.faq.items.map((item) => ({
        question: item.q,
        answer: item.a,
      })),
    },
    {
      _key: "cta",
      _type: "ctaBlock",
      eyebrow: isEn ? "Next step" : "Proximo passo",
      title: page.pageCta.title,
      primaryLabel: page.pageCta.cta,
      primaryHref: "https://calendly.com/yoobeco/demo",
    },
  ];
}

type MarketingPageSupportData = {
  apiIntegracoesContent?: ResolvedApiIntegracoesContent;
  gamificacaoContent?: ResolvedGamificacaoContent;
  homeContent?: ResolvedHomeContent;
  platformShowcaseMedia?: PlatformShowcaseMediaDoc | null;
};

type MetadataOptions = {
  canonicalPath: string;
  languages: { "pt-BR": string; en: string };
  openGraphPath: string;
  ogLocale: "pt_BR" | "en_US";
};

function buildStudioUrl() {
  return `${BASE_PATH}/studio`;
}

function createMarketingClient(stega: boolean) {
  if (!isSanityConfigured()) {
    return null;
  }

  const previewEnabled = stega;
  const previewToken = process.env.SANITY_API_READ_TOKEN;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !previewEnabled,
    perspective: previewEnabled && previewToken ? "drafts" : "published",
    token: previewEnabled && previewToken ? previewToken : undefined,
    resultSourceMap: previewEnabled ? "withKeyArraySelector" : false,
    stega: previewEnabled
      ? {
          enabled: true,
          studioUrl: buildStudioUrl(),
        }
      : false,
  });
}

function legacySections(...sections: readonly LegacySectionKey[]): LegacySectionBlockDoc[] {
  return sections.map((section) => ({
    _key: section,
    _type: "legacySectionBlock",
    section,
  }));
}

async function fetchMarketingPage(
  locale: Locale,
  slug: string,
  stega: boolean,
): Promise<MarketingPageDoc | null> {
  const client = createMarketingClient(stega);
  if (!client) {
    return null;
  }

  try {
    return await client.fetch<MarketingPageBySlugQueryResult>(marketingPageBySlugQuery, {
      locale,
      slug,
    });
  } catch {
    return null;
  }
}

function hasRenderablePageContent(page: MarketingPageDoc | null): boolean {
  return Boolean(page?.content?.length);
}

function mergeMarketingPageWithFallback(
  page: MarketingPageDoc,
  fallback: MarketingPageDoc,
): MarketingPageDoc {
  return {
    ...fallback,
    ...page,
    title: page.title || fallback.title,
    summary: page.summary || fallback.summary,
    seo: {
      ...fallback.seo,
      ...page.seo,
    },
    content: fallback.content,
  };
}

async function buildFallbackMarketingPage(
  locale: Locale,
  slug: string,
): Promise<MarketingPageDoc | null> {
  switch (slug) {
    case "home": {
      const homeContent = await getResolvedHomeContent(locale);

      return {
        _id: `fallback-marketing-page.${locale}.home`,
        title: locale === "en" ? "Home" : "Home",
        slug: "home",
        locale,
        summary:
          locale === "en"
            ? "Fallback marketing page that preserves the current home layout while editorial ownership moves into Sanity."
            : "Pagina de fallback que preserva a home atual enquanto a gestao editorial migra para o Sanity.",
        seo: {
          metaTitle: homeContent.seo.title,
          metaDescription: homeContent.seo.description,
        },
        content: legacySections(
          "homeHero",
          "homeFourUnik",
          "homeTrustBar",
          "homeBentoFeatures",
          "homePlatformTabs",
          "homeStatsBar",
          "homeWhySection",
          "homeGamificationSummary",
          "homeGamificationDuality",
          "homeEnterpriseCases",
          "homeDedicatedIntegrations",
          "homeStoreSection",
          "homeApiSection",
          "homeAiRoadmap",
          "homeManagementSection",
          "homeHowItWorks",
          "homePricingSection",
          "homeTestimonialsSection",
          "homeClientsSection",
          "homeFinalCta",
        ),
      };
    }
    case "api-integracoes": {
      const content = await getResolvedApiIntegracoesContent(locale);

      return {
        _id: `fallback-marketing-page.${locale}.api-integracoes`,
        title: locale === "en" ? "API & Integrations" : "API e Integracoes",
        slug,
        locale,
        summary:
          locale === "en"
            ? "Fallback marketing page for API and integrations until the page is fully modeled with Sanity blocks."
            : "Pagina de fallback para API e integracoes enquanto a pagina e migrada por completo para blocos do Sanity.",
        seo: {
          metaTitle: content.seo.title,
          metaDescription: content.seo.description,
        },
        content: apiIntegracoesBlocks(locale, content),
      };
    }
    case "gamificacao": {
      const content = await getResolvedGamificacaoContent(locale);

      return {
        _id: `fallback-marketing-page.${locale}.gamificacao`,
        title: locale === "en" ? "Corporate Gamification" : "Gamificacao Corporativa",
        slug,
        locale,
        summary:
          locale === "en"
            ? "Fallback marketing page for the corporate gamification offer."
            : "Pagina de fallback para a oferta de gamificacao.",
        seo: {
          metaTitle: content.seo.title,
          metaDescription: content.seo.description,
        },
        content: legacySections(
          "gamificacaoHero",
          "gamificacaoProblem",
          "gamificacaoMechanics",
          "gamificacaoFlow",
          "gamificacaoCases",
          "gamificacaoTrends",
          "gamificacaoStats",
          "gamificacaoKpis",
          "gamificacaoDeepUsecases",
          "gamificacaoFaq",
          "gamificacaoCta",
        ),
      };
    }
    case "plataforma": {
      const pageCopy = locale === "en" ? enPlataforma : ptPlataforma;

      return {
        _id: `fallback-marketing-page.${locale}.plataforma`,
        title: locale === "en" ? "Platform" : "Plataforma",
        slug,
        locale,
        summary:
          locale === "en"
            ? "Fallback marketing page for the platform overview."
            : "Pagina de fallback para a visao geral da plataforma.",
        seo: {
          metaTitle: pageCopy.seo.title,
          metaDescription: pageCopy.seo.description,
        },
        content: plataformaBlocks(locale),
      };
    }
    case "inteligencia": {
      const pageCopy = locale === "en" ? enInteligenciaPage : ptInteligenciaPage;

      return {
        _id: `fallback-marketing-page.${locale}.inteligencia`,
        title: locale === "en" ? "Intelligence" : "Inteligencia",
        slug,
        locale,
        summary:
          locale === "en"
            ? "Fallback marketing page for the intelligence and AI narrative."
            : "Pagina de fallback para a narrativa de inteligencia e IA.",
        seo: {
          metaTitle: pageCopy.seo.title,
          metaDescription: pageCopy.seo.description,
        },
        content: inteligenciaBlocks(locale),
      };
    }
    case "casos-de-uso": {
      const pageCopy = locale === "en" ? enCasosPage : ptCasosPage;

      return {
        _id: `fallback-marketing-page.${locale}.casos-de-uso`,
        title: locale === "en" ? "Use Cases" : "Casos de Uso",
        slug,
        locale,
        summary:
          locale === "en"
            ? "Fallback marketing page for use cases and case studies."
            : "Pagina de fallback para casos de uso e estudos de caso.",
        seo: {
          metaTitle: pageCopy.seo.title,
          metaDescription: pageCopy.seo.description,
        },
        content: casosBlocks(locale),
      };
    }
    default:
      return null;
  }
}

async function resolveMarketingPage(
  locale: Locale,
  slug: string,
  stega: boolean,
): Promise<MarketingPageDoc | null> {
  const page = await fetchMarketingPage(locale, slug, stega);
  if (hasRenderablePageContent(page)) {
    return page;
  }

  const fallback = await buildFallbackMarketingPage(locale, slug);
  if (!fallback) {
    return page;
  }
  if (!page) {
    return fallback;
  }
  return mergeMarketingPageWithFallback(page, fallback);
}

function pageSeo(page: MarketingPageDoc | null, fallback: PageSeoCopy): PageSeoCopy {
  return {
    title: page?.seo?.metaTitle?.trim() || fallback.title,
    description: page?.seo?.metaDescription?.trim() || fallback.description,
    openGraphDescription: fallback.openGraphDescription,
  };
}

async function getFallbackSeo(locale: Locale, slug: string): Promise<PageSeoCopy> {
  switch (slug) {
    case "home":
      return locale === "en"
        ? {
            title: "4Unik — Reward Infrastructure | Gamification & Rewards",
            description:
              "Reward infrastructure for gamification and employee engagement platforms. API, catalog, and fulfillment in one place.",
          }
        : {
            title: "4Unik — Reward Infrastructure | Gamificacao e Recompensas",
            description:
              "Infraestrutura de recompensas para plataformas de gamificacao e employee engagement. API, catalogo e fulfillment em um so lugar.",
          };
    case "api-integracoes": {
      const content = await getResolvedApiIntegracoesContent(locale);
      return {
        title: content.seo.title,
        description: content.seo.description,
        openGraphDescription: content.seo.openGraphDescription,
      };
    }
    case "gamificacao": {
      const content = await getResolvedGamificacaoContent(locale);
      return {
        title: content.seo.title,
        description: content.seo.description,
        openGraphDescription: content.seo.openGraphDescription,
      };
    }
    case "plataforma":
      return locale === "en" ? enPlataforma.seo : ptPlataforma.seo;
    case "inteligencia":
      return locale === "en" ? enInteligenciaPage.seo : ptInteligenciaPage.seo;
    case "casos-de-uso":
      return locale === "en" ? enCasosPage.seo : ptCasosPage.seo;
    default:
      return {
        title: "4Unik",
        description: "Reward infrastructure",
      };
  }
}

export async function getMarketingPageBySlug(
  locale: Locale,
  slug: string,
): Promise<MarketingPageDoc | null> {
  const stega = process.env.NODE_ENV === "development";
  return resolveMarketingPage(locale, slug, stega);
}

export async function getMarketingPageSupportData(
  locale: Locale,
  slug: string,
): Promise<MarketingPageSupportData> {
  switch (slug) {
    case "home":
      return { homeContent: await getResolvedHomeContent(locale) };
    case "gamificacao":
      return { gamificacaoContent: await getResolvedGamificacaoContent(locale) };
    case "plataforma":
      return { platformShowcaseMedia: await getPlatformShowcaseMedia(locale) };
    default:
      return {};
  }
}

export async function getMarketingPageFaqItems(
  locale: Locale,
  slug: string,
): Promise<Array<{ q: string; a: string }>> {
  const page = await getMarketingPageBySlug(locale, slug);
  const faqBlock = page?.content?.find((block) => block._type === "faqBlock");

  if (faqBlock?._type === "faqBlock" && Array.isArray(faqBlock.items)) {
    return faqBlock.items
      .filter((item) => item.question && item.answer)
      .map((item) => ({
        q: item.question || "",
        a: item.answer || "",
      }));
  }

  switch (slug) {
    case "plataforma":
      return (locale === "en" ? enPlataforma : ptPlataforma).faq.items.map((item) => ({
        q: item.q,
        a: item.a,
      }));
    case "inteligencia":
      return (locale === "en" ? enInteligenciaPage : ptInteligenciaPage).faq.items.map((item) => ({
        q: item.q,
        a: item.a,
      }));
    case "casos-de-uso":
      return (locale === "en" ? enCasosPage : ptCasosPage).faq.items.map((item) => ({
        q: item.q,
        a: item.a,
      }));
    case "gamificacao": {
      const content = await getResolvedGamificacaoContent(locale);
      return content.faq.items.map((item) => ({
        q: item.q,
        a: item.a,
      }));
    }
    default:
      return [];
  }
}

export async function buildMarketingPageMetadata(
  locale: Locale,
  slug: string,
  options: MetadataOptions,
): Promise<Metadata> {
  const fallbackSeo = await getFallbackSeo(locale, slug);
  const page = await resolveMarketingPage(locale, slug, false);
  return buildRoutePageMetadata(pageSeo(page, fallbackSeo), options);
}

export async function getMarketingHomeSeo(locale: Locale): Promise<PageSeoCopy> {
  const fallback = await getResolvedHomeContent(locale);
  const page = await resolveMarketingPage(locale, "home", false);
  return pageSeo(page, fallback.seo);
}
