import { createClient } from "@sanity/client";
import type { Metadata } from "next";
import type { Locale } from "@/lib/locale";
import { buildRoutePageMetadata, type PageSeoCopy } from "@/lib/seo/routeMetadata";
import { enGamificacaoPage } from "@/messages/segments/en-gamificacao-page";
import { ptCasosPage } from "@/messages/segments/pt-casos-page";
import { enCasosPage } from "@/messages/segments/en-casos-page";
import { enCasos } from "@/messages/segments/en-casos";
import { ptGamificacaoPage } from "@/messages/segments/pt-gamificacao-page";
import { ptInteligenciaPage } from "@/messages/segments/pt-inteligencia-page";
import { enInteligenciaPage } from "@/messages/segments/en-inteligencia-page";
import { ptCasos } from "@/messages/segments/pt-casos";
import { ptLandingMore } from "@/messages/segments/pt-landing-more";
import { enLandingMore } from "@/messages/segments/en-landing-more";
import { ptRest } from "@/messages/segments/pt-rest";
import { enRest } from "@/messages/segments/en-rest";
import { ptPlataforma } from "@/messages/segments/pt-plataforma";
import { enPlataforma } from "@/messages/segments/en-plataforma";
import { ptStatsBentoTabsWhy } from "@/messages/segments/pt-stats-bento-tabs-why";
import { enStatsBentoTabsWhy } from "@/messages/segments/en-stats-bento-tabs-why";
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
  LogoCollectionDoc,
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

function joinTitle(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
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

function fallbackLogoCollection(
  collectionKey: "trustBar" | "clientsGrid",
): LogoCollectionDoc {
  const items =
    collectionKey === "trustBar"
      ? [
          { name: "Yampi", href: undefined, logoPath: `${BASE_PATH}/clients/yampi.svg` },
          { name: "PRIO", href: undefined, logoPath: `${BASE_PATH}/clients/prio.svg` },
          { name: "Hapvida", href: undefined, logoPath: `${BASE_PATH}/clients/hapvida.png` },
          { name: "Join RH", href: undefined, logoPath: `${BASE_PATH}/clients/join.png` },
          { name: "Tecnospeed", href: undefined, logoPath: `${BASE_PATH}/clients/tecnospeed.svg` },
          { name: "O Boticario", href: undefined, logoPath: `${BASE_PATH}/clients/boticario.png` },
        ]
      : [
          { name: "Yampi", href: undefined, logoPath: `${BASE_PATH}/clients/yampi.svg` },
          { name: "PRIO", href: undefined, logoPath: `${BASE_PATH}/clients/prio.svg` },
          { name: "Hapvida", href: undefined, logoPath: `${BASE_PATH}/clients/hapvida.png` },
          { name: "Join RH", href: undefined, logoPath: `${BASE_PATH}/clients/join.png` },
          { name: "Tecnospeed", href: undefined, logoPath: `${BASE_PATH}/clients/tecnospeed.svg` },
          { name: "O Boticario", href: undefined, logoPath: `${BASE_PATH}/clients/boticario.png` },
          { name: "W1 Consultoria", href: undefined, logoPath: `${BASE_PATH}/clients/w1-consultoria.svg` },
          { name: "Contabilizei", href: undefined, logoPath: `${BASE_PATH}/clients/contabilizei.svg` },
        ];

  return {
    _id: `fallback-logo-collection.${collectionKey}`,
    title: collectionKey === "trustBar" ? "Trust bar" : "Clients grid",
    collectionKey,
    items: items.map((item) => ({
      name: item.name,
      href: item.href,
      logo: {
        alt: item.name,
        asset: {
          url: item.logoPath,
        },
      },
    })),
  };
}

function homeBlocks(
  locale: Locale,
  homeContent: ResolvedHomeContent,
): MarketingPageDoc["content"] {
  const isEn = locale === "en";
  const stats = isEn ? enStatsBentoTabsWhy : ptStatsBentoTabsWhy;
  const landingMore = isEn ? enLandingMore : ptLandingMore;
  const rest = isEn ? enRest : ptRest;
  const showcase = homeContent.showcaseMedia;

  return [
    {
      _key: "hero",
      _type: "heroBlock",
      headline: joinTitle(
        homeContent.hero.brand,
        homeContent.hero.afterBrand,
        homeContent.hero.line1b,
        homeContent.hero.line2,
      ),
      subheadline: homeContent.hero.sub,
      ctaText: homeContent.hero.ctaDemo,
      ctaLink: homeContent.hero.ctaDemoHref,
      image: showcase?.bento?.primaryCardImage,
    },
    {
      _key: "4unik-context",
      _type: "splitContentBlock",
      eyebrow: homeContent.fourUnik.kicker,
      title: homeContent.fourUnik.brand,
      body: portableTextParagraph(
        "4unik-context-body",
        joinTitle(
          homeContent.fourUnik.bodyBefore,
          homeContent.fourUnik.brand,
          homeContent.fourUnik.bodyMid,
          homeContent.fourUnik.here,
          homeContent.fourUnik.bodyAfter,
        ),
      ),
      primaryLabel: homeContent.fourUnik.cta,
      primaryHref: homeContent.fourUnik.ctaHref,
      imageSide: "right",
    },
    {
      _key: "trust-bar",
      _type: "logoStripBlock",
      displayStyle: "compact",
      title: homeContent.trust.title,
      collection: fallbackLogoCollection("trustBar"),
    },
    {
      _key: "bento-overview",
      _type: "featureGridBlock",
      eyebrow: stats.bento.badge,
      title: joinTitle(stats.bento.titleLine1, stats.bento.titleLine2),
      description: stats.bento.sub,
      columns: "2",
      image: showcase?.bento?.primaryCardImage,
      items: [
        {
          title: stats.bento.card1.title,
          description: stats.bento.card1.body,
          icon: "bar-chart-3",
          href: `${BASE_PATH}${locale === "en" ? "/en/plataforma" : "/plataforma"}`,
        },
        {
          title: stats.bento.card2.title,
          description: stats.bento.card2.body,
          icon: "target",
          href: `${BASE_PATH}${locale === "en" ? "/en/gamificacao" : "/gamificacao"}`,
        },
        {
          title: stats.bento.card3.title,
          description: stats.bento.card3.body,
          icon: "store",
          href: `${BASE_PATH}${locale === "en" ? "/en/plataforma/loja-resgate" : "/plataforma/loja-resgate"}`,
        },
        {
          title: stats.bento.card4.title,
          description: stats.bento.card4.body,
          icon: "link-2",
          href: `${BASE_PATH}${locale === "en" ? "/en/api-integracoes" : "/api-integracoes"}`,
        },
      ],
    },
    {
      _key: "platform-management",
      _type: "splitContentBlock",
      eyebrow: stats.platformTabs.badge,
      title: stats.platformTabs.gestao.title,
      body: portableTextParagraph("platform-management-body", stats.platformTabs.gestao.body),
      bullets: [...stats.platformTabs.gestao.bullets],
      primaryLabel: stats.platformTabs.gestao.cta,
      primaryHref: `${BASE_PATH}${locale === "en" ? "/en/plataforma" : "/plataforma"}`,
      image: showcase?.platformTabs?.managementImage,
      imageSide: "right",
    },
    {
      _key: "platform-store",
      _type: "splitContentBlock",
      eyebrow: stats.platformTabs.badge,
      title: stats.platformTabs.loja.title,
      body: portableTextParagraph("platform-store-body", stats.platformTabs.loja.body),
      bullets: [...stats.platformTabs.loja.bullets],
      primaryLabel: stats.platformTabs.loja.cta,
      primaryHref: `${BASE_PATH}${locale === "en" ? "/en/plataforma/loja-resgate" : "/plataforma/loja-resgate"}`,
      image: showcase?.platformTabs?.storeImage,
      imageSide: "left",
    },
    {
      _key: "platform-campaigns",
      _type: "splitContentBlock",
      eyebrow: stats.platformTabs.badge,
      title: stats.platformTabs.campanhas.title,
      body: portableTextParagraph("platform-campaigns-body", stats.platformTabs.campanhas.body),
      bullets: [...stats.platformTabs.campanhas.bullets],
      primaryLabel: stats.platformTabs.campanhas.cta,
      primaryHref: `${BASE_PATH}${locale === "en" ? "/en/gamificacao" : "/gamificacao"}`,
      image: showcase?.platformTabs?.campaignsImage,
      imageSide: "right",
    },
    {
      _key: "stats",
      _type: "statsBlock",
      title: isEn ? "Operational metrics already visible in the platform" : "Metricas operacionais visiveis na plataforma",
      items: stats.statsBar.items.map((item) => ({
        value: `${item.value}${item.suffix}`.trim(),
        label: item.label,
      })),
    },
    {
      _key: "why-4unik",
      _type: "featureGridBlock",
      eyebrow: stats.why.badge,
      title: joinTitle(stats.why.titleBefore, stats.why.titleGradient),
      description: stats.why.sub,
      columns: "3",
      items: stats.why.cards.map((item, index) => ({
        title: item.title,
        description: item.desc,
        icon: ["target", "sparkles", "bar-chart-3"][index] || "sparkles",
      })),
    },
    {
      _key: "gamification-summary",
      _type: "featureGridBlock",
      eyebrow: stats.gamificationSummary.badge,
      title: joinTitle(
        stats.gamificationSummary.titleBefore,
        stats.gamificationSummary.titleGradient,
        stats.gamificationSummary.titleAfter,
      ),
      description: stats.gamificationSummary.sub,
      columns: "2",
      items: stats.gamificationSummary.cards.map((item, index) => ({
        title: item.title,
        description: item.desc,
        icon: ["coins", "target", "sparkles", "store"][index] || "sparkles",
      })),
    },
    {
      _key: "ready-to-use",
      _type: "splitContentBlock",
      eyebrow: landingMore.duality.badge,
      title: landingMore.duality.sideA.title,
      body: portableTextParagraph("ready-to-use-body", landingMore.duality.sideA.body),
      bullets: [...landingMore.duality.sideA.bullets],
      primaryLabel: isEn ? "See the platform" : "Ver a plataforma",
      primaryHref: `${BASE_PATH}${locale === "en" ? "/en/plataforma" : "/plataforma"}`,
      imageSide: "right",
    },
    {
      _key: "invisible-integration",
      _type: "splitContentBlock",
      eyebrow: landingMore.duality.badge,
      title: landingMore.duality.sideB.title,
      body: portableTextParagraph("invisible-integration-body", landingMore.duality.sideB.body),
      bullets: [...landingMore.duality.sideB.bullets],
      primaryLabel: isEn ? "Explore integrations" : "Explorar integracoes",
      primaryHref: `${BASE_PATH}${locale === "en" ? "/en/api-integracoes" : "/api-integracoes"}`,
      imageSide: "left",
    },
    {
      _key: "enterprise-hapvida",
      _type: "splitContentBlock",
      eyebrow: landingMore.enterpriseCases.badge,
      title: `Hapvida · ${landingMore.enterpriseCases.hapvida.tag2}`,
      body: portableTextParagraph(
        "enterprise-hapvida-body",
        joinTitle(
          landingMore.enterpriseCases.hapvida.bodyBefore,
          landingMore.enterpriseCases.hapvida.bodyStrong,
          landingMore.enterpriseCases.hapvida.bodyAfter,
        ),
      ),
      bullets: [...landingMore.enterpriseCases.hapvida.bullets],
      image: showcase?.enterpriseCases?.hapvidaCaseImage,
      imageSide: "right",
    },
    {
      _key: "enterprise-prio",
      _type: "splitContentBlock",
      eyebrow: landingMore.enterpriseCases.badge,
      title: `PRIO · ${landingMore.enterpriseCases.prio.tag2}`,
      body: portableTextParagraph(
        "enterprise-prio-body",
        joinTitle(
          landingMore.enterpriseCases.prio.bodyBefore,
          landingMore.enterpriseCases.prio.bodyStrong,
          landingMore.enterpriseCases.prio.bodyAfter,
        ),
      ),
      bullets: [...landingMore.enterpriseCases.prio.bullets],
      image: showcase?.enterpriseCases?.prioCaseImage,
      imageSide: "left",
    },
    {
      _key: "integration-workvivo",
      _type: "splitContentBlock",
      eyebrow: landingMore.dedicatedIntegrations.badge,
      title: landingMore.dedicatedIntegrations.workvivo.title,
      body: portableTextParagraph(
        "integration-workvivo-body",
        landingMore.dedicatedIntegrations.workvivo.body,
      ),
      bullets: [...landingMore.dedicatedIntegrations.workvivo.bullets],
      primaryLabel: isEn ? "See Workvivo integration" : "Ver integracao Workvivo",
      primaryHref: `${BASE_PATH}${locale === "en" ? "/en/api-integracoes/workvivo" : "/api-integracoes/workvivo"}`,
      image: showcase?.dedicatedIntegrations?.workvivo?.previewImage,
      imageSide: "right",
    },
    {
      _key: "integration-beehome",
      _type: "splitContentBlock",
      eyebrow: landingMore.dedicatedIntegrations.badge,
      title: landingMore.dedicatedIntegrations.beehome.title,
      body: portableTextParagraph(
        "integration-beehome-body",
        landingMore.dedicatedIntegrations.beehome.body,
      ),
      bullets: [...landingMore.dedicatedIntegrations.beehome.bullets],
      primaryLabel: isEn ? "Talk to engineering" : "Falar com engenharia",
      primaryHref: "https://calendly.com/yoobeco/demo",
      image: showcase?.dedicatedIntegrations?.beehome?.previewImage,
      imageSide: "left",
    },
    {
      _key: "store-usecases",
      _type: "featureGridBlock",
      eyebrow: rest.storeSection.badge,
      title: joinTitle(
        rest.storeSection.titleBefore,
        rest.storeSection.titleGradient,
        rest.storeSection.titleAfter,
      ),
      description: rest.storeSection.sub,
      columns: "2",
      items: rest.storeSection.usecases.map((item, index) => ({
        title: item.title,
        description: item.desc,
        icon: ["package", "sparkles", "shield", "zap"][index] || "sparkles",
      })),
    },
    {
      _key: "api-section",
      _type: "splitContentBlock",
      eyebrow: rest.apiSection.badge,
      title: joinTitle(
        rest.apiSection.titleBefore,
        rest.apiSection.titleBrand,
        rest.apiSection.titleAfter,
      ),
      body: portableTextParagraph("api-section-body", rest.apiSection.sub),
      bullets: [...rest.apiSection.bullets],
      primaryLabel: rest.apiSection.ctaDocs,
      primaryHref: `${BASE_PATH}${locale === "en" ? "/en/api-integracoes" : "/api-integracoes"}`,
      secondaryLabel: rest.apiSection.ctaApi,
      secondaryHref: "https://calendly.com/yoobeco/demo",
      imageSide: "right",
    },
    {
      _key: "ai-roadmap",
      _type: "featureGridBlock",
      eyebrow: landingMore.aiRoadmap.badge,
      title: joinTitle(
        landingMore.aiRoadmap.titleBefore,
        landingMore.aiRoadmap.titleGradient,
        landingMore.aiRoadmap.titleAfter,
      ),
      columns: "4",
      items: landingMore.aiRoadmap.stages.map((stage, index) => ({
        eyebrow: stage.status,
        title: stage.title,
        description: stage.items.join(" • "),
        icon: ["brain-circuit", "store", "zap", "bar-chart-3"][index] || "sparkles",
      })),
    },
    {
      _key: "management-features",
      _type: "featureGridBlock",
      eyebrow: rest.managementSection.badge,
      title: joinTitle(
        rest.managementSection.titleBefore,
        rest.managementSection.titleGradient,
        rest.managementSection.titleAfter,
      ),
      description: rest.managementSection.sub,
      columns: "2",
      items: rest.managementSection.features.map((item, index) => ({
        title: item.title,
        description: item.desc,
        icon: ["bar-chart-3", "package", "target", "shield"][index] || "sparkles",
      })),
    },
    {
      _key: "how-it-works",
      _type: "featureGridBlock",
      eyebrow: landingMore.howItWorks.badge,
      title: joinTitle(
        landingMore.howItWorks.titleBefore,
        landingMore.howItWorks.titleGradient,
        landingMore.howItWorks.titleAfter,
      ),
      columns: "4",
      image: showcase?.howItWorks?.architectureImage,
      items: landingMore.howItWorks.steps.map((step, index) => ({
        eyebrow: step.num,
        title: step.title,
        description: step.desc,
        icon: ["link-2", "target", "coins", "package"][index] || "sparkles",
      })),
    },
    {
      _key: "pricing",
      _type: "featureGridBlock",
      eyebrow: rest.pricing.badge,
      title: joinTitle(rest.pricing.titleBefore, rest.pricing.titleGradient),
      description: rest.pricing.sub,
      columns: "3",
      items: [
        {
          eyebrow: rest.pricing.starter.blurb,
          title: `${rest.pricing.starter.name} · ${rest.pricing.currency}${rest.pricing.starter.price}${rest.pricing.starter.period}`,
          description: rest.pricing.starter.bullets.join(" • "),
          icon: "sparkles",
        },
        {
          eyebrow: rest.pricing.popular,
          title: `${rest.pricing.pro.name} · ${rest.pricing.currency}${rest.pricing.pro.price}${rest.pricing.pro.period}`,
          description: rest.pricing.pro.bullets.join(" • "),
          icon: "zap",
        },
        {
          eyebrow: rest.pricing.enterprise.blurb,
          title: `${rest.pricing.enterprise.name} · ${rest.pricing.enterprise.priceLabel}`,
          description: rest.pricing.enterprise.bullets.join(" • "),
          icon: "shield",
        },
      ],
    },
    {
      _key: "testimonials",
      _type: "testimonialBlock",
      title: joinTitle(rest.testimonials.titleBefore, rest.testimonials.titleGradient),
      items: rest.testimonials.items.map((item) => ({
        quote: item.text.replace(/^"|"$/g, ""),
        author: item.author,
        role: item.role,
        company: item.company,
      })),
    },
    {
      _key: "clients-grid",
      _type: "logoStripBlock",
      displayStyle: "grid",
      sectionId: "clientes",
      eyebrow: rest.clients.badge,
      title: joinTitle(
        rest.clients.titleBefore,
        rest.clients.titleGradient,
        rest.clients.titleAfter,
      ),
      description: rest.clients.sub,
      collection: fallbackLogoCollection("clientsGrid"),
    },
    {
      _key: "final-cta",
      _type: "ctaBlock",
      eyebrow: isEn ? "Next step" : "Proximo passo",
      title: homeContent.finalCta.title,
      description: homeContent.finalCta.body,
      primaryLabel: homeContent.finalCta.demo,
      primaryHref: homeContent.finalCta.demoHref,
      secondaryLabel: homeContent.finalCta.whatsapp,
      secondaryHref: homeContent.finalCta.whatsappHref,
    },
  ];
}

function gamificacaoBlocks(
  locale: Locale,
  content: ResolvedGamificacaoContent,
): MarketingPageDoc["content"] {
  const isEn = locale === "en";
  const pageFaq = isEn ? enGamificacaoPage.faq : ptGamificacaoPage.faq;

  return [
    {
      _key: "hero",
      _type: "heroBlock",
      headline: joinTitle(
        content.hero.titleLine1,
        content.hero.titleGradient,
        content.hero.titleLine2,
      ),
      subheadline: content.hero.sub,
      ctaText: content.hero.cta,
      ctaLink: content.hero.ctaHref,
    },
    {
      _key: "problem",
      _type: "featureGridBlock",
      eyebrow: content.problem.badge,
      title: joinTitle(
        content.problem.title,
        content.problem.titleGradient,
        content.problem.titleAfter,
      ),
      columns: "2",
      items: content.problem.cards.map((item, index) => ({
        eyebrow: item.stat,
        title: item.title,
        description: `${item.body} ${item.cite}`.trim(),
        icon: ["target", "bar-chart-3", "message-square", "shield"][index] || "target",
      })),
    },
    {
      _key: "mechanics",
      _type: "featureGridBlock",
      eyebrow: content.mechanics.badge,
      title: joinTitle(
        content.mechanics.titleBefore,
        content.mechanics.titleGradient,
        content.mechanics.titleAfter,
      ),
      description: content.mechanics.sub,
      columns: "2",
      items: content.mechanics.items.map((item, index) => ({
        eyebrow: item.badge,
        title: item.title,
        description: `${item.description} ${item.features.join(" • ")}`.trim(),
        icon: ["coins", "target", "sparkles", "zap"][index] || "coins",
      })),
    },
    {
      _key: "flow",
      _type: "featureGridBlock",
      eyebrow: content.flow.badge,
      title: joinTitle(
        content.flow.titleBefore,
        content.flow.titleGradient,
        content.flow.titleAfter,
      ),
      description: content.flow.sub,
      columns: "2",
      items: content.flow.steps.map((step, index) => ({
        eyebrow: `${step.num} · ${step.role}`,
        title: step.title,
        description: `${step.desc} ${step.features.map((feature) => feature.text).join(" • ")}`.trim(),
        icon: ["message-square", "zap", "target", "coins"][index] || "sparkles",
      })),
    },
    {
      _key: "cases",
      _type: "caseStudyGridBlock",
      title: joinTitle(
        content.cases.titleBefore,
        content.cases.titleGradient,
        content.cases.titleAfter,
      ),
      challengeLabel: content.cases.challengeLabel,
      resultsLabel: content.cases.solutionLabel,
      items: content.cases.items.map((item) => ({
        company: item.company,
        industry: item.industry,
        title: item.title,
        description: `${item.desc} ${item.solution}`.trim(),
        challenge: item.challenge,
        metrics: item.metrics.map((metric) => ({
          value: metric.value,
          label: metric.label,
        })),
      })),
    },
    {
      _key: "trends",
      _type: "featureGridBlock",
      eyebrow: content.trends.badge,
      title: joinTitle(
        content.trends.titleBefore,
        content.trends.titleGradient,
        content.trends.titleAfter,
      ),
      description: `${content.trends.sub} ${content.trends.banner2025} ${content.trends.value2025} • ${content.trends.banner2033} ${content.trends.value2033} • CAGR ${content.trends.cagr}`.trim(),
      columns: "3",
      items: content.trends.items.map((item, index) => ({
        eyebrow: item.tag,
        title: item.title,
        description: item.desc,
        icon: ["bar-chart-3", "sparkles", "globe-2", "target"][index] || "bar-chart-3",
      })),
    },
    {
      _key: "stats",
      _type: "statsBlock",
      title: joinTitle(
        content.stats.titleBefore,
        content.stats.titleGradient,
        content.stats.titleAfter,
      ),
      items: content.stats.items.map((item) => ({
        value: `${item.value}${item.suffix}`.trim(),
        label: item.desc,
      })),
    },
    {
      _key: "kpis",
      _type: "featureGridBlock",
      eyebrow: content.kpis.badge,
      title: joinTitle(
        content.kpis.titleBefore,
        content.kpis.titleGradient,
        content.kpis.titleAfter,
      ),
      description: content.kpis.sub,
      columns: "3",
      items: content.kpis.items.map((item, index) => ({
        eyebrow: item.subtitle,
        title: item.title,
        description: item.desc,
        icon: ["bar-chart-3", "target", "coins", "sparkles", "zap", "globe-2"][index] || "bar-chart-3",
      })),
    },
    {
      _key: "deep-usecases",
      _type: "featureGridBlock",
      eyebrow: content.deepUsecases.badge,
      title: joinTitle(
        content.deepUsecases.titleBefore,
        content.deepUsecases.titleGradient,
        content.deepUsecases.titleAfter,
      ),
      description: content.deepUsecases.sub,
      columns: "3",
      items: content.deepUsecases.items.map((item, index) => ({
        eyebrow: item.hook,
        title: item.title,
        description: item.desc,
        icon: item.icon || ["sparkles", "coins", "target", "message-square", "brain-circuit", "globe-2"][index] || "sparkles",
      })),
    },
    {
      _key: "faq",
      _type: "faqBlock",
      title: joinTitle(
        pageFaq.titleBefore,
        pageFaq.titleGradient,
        pageFaq.titleAfter,
      ),
      items: content.faq.items.map((item) => ({
        question: item.q,
        answer: item.a,
      })),
    },
    {
      _key: "cta",
      _type: "ctaBlock",
      eyebrow: isEn ? "Next step" : "Proximo passo",
      title: content.finalCta.title,
      description: content.finalCta.body,
      primaryLabel: content.finalCta.cta,
      primaryHref: content.finalCta.ctaHref,
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
  platformShowcaseMedia?: PlatformShowcaseMediaDoc | null;
  /** Same mirror as the home AI roadmap; used on `/plataforma/` for `AiRoadmap`. */
  homeContent?: ResolvedHomeContent | null;
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
            ? "Fallback marketing page for the main home flow, already promoted to native marketing blocks."
            : "Pagina de fallback da home principal, ja promovida para blocos nativos de marketing.",
        seo: {
          metaTitle: homeContent.seo.title,
          metaDescription: homeContent.seo.description,
        },
        content: homeBlocks(locale, homeContent),
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
        content: gamificacaoBlocks(locale, content),
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
    // Sem fallback editorial: `content` vazio não é renderizável — não devolver doc vazio.
    return null;
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
    case "plataforma": {
      const [platformShowcaseMedia, homeContent] = await Promise.all([
        getPlatformShowcaseMedia(locale),
        getResolvedHomeContent(locale),
      ]);
      return { platformShowcaseMedia, homeContent };
    }
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
