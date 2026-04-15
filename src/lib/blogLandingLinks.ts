import { withBasePath } from "@/lib/basePath";
import { BLOG_FALLBACK_IMG } from "@/lib/blogFallbackImages";
import type { BlogCtaBlock, BlogCtaVariant } from "@/sanity/lib/types";

export const BLOG_DEMO_HREF = "https://calendly.com/yoobeco/demo";

export type BlogFallbackSlug = "1" | "2" | "3" | "4" | "5" | "6" | "7";

/** Caminhos internos (sem `basePath`, sem `/en`) para `blogLandingHref`. */
export const BLOG_CTA_PATHS_BY_SLUG: Record<
  BlogFallbackSlug,
  { platform: string; feature: string; img: keyof typeof BLOG_FALLBACK_IMG }
> = {
  "1": { platform: "/plataforma", feature: "/plataforma/motor-gamificacao", img: "dashboard" },
  "2": { platform: "/plataforma/loja-resgate", feature: "/plataforma/logistica-integrada", img: "eventStage" },
  "3": { platform: "/plataforma/motor-gamificacao", feature: "/plataforma/painel-gestor", img: "salesTeam" },
  "4": { platform: "/plataforma", feature: "/plataforma/loja-resgate", img: "welcomeKit" },
  "5": { platform: "/plataforma/painel-gestor", feature: "/plataforma/motor-gamificacao", img: "dashboard" },
  "6": { platform: "/plataforma/painel-gestor", feature: "/plataforma", img: "analytics" },
  "7": { platform: "/casos-de-uso", feature: "/plataforma", img: "peopleHr" },
};

/**
 * URL pública para uma rota da landing (respeita `basePath` e locale EN com prefixo `/en`).
 */
export function blogLandingHref(locale: "pt" | "en", internalPath: string): string {
  const p = internalPath.startsWith("/") ? internalPath : `/${internalPath}`;
  const localized = locale === "en" ? `/en${p}` : p;
  return withBasePath(localized);
}

type CtaCopy = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
};

type TripletCopy = {
  platform: CtaCopy;
  feature: CtaCopy & { featureAlt: string };
  demo: CtaCopy;
};

const TRIPLET_COPY: Record<BlogFallbackSlug, { pt: TripletCopy; en: TripletCopy }> = {
  "1": {
    pt: {
      platform: {
        eyebrow: "Visão geral · landing 4unik",
        title: "Onde encaixa gamificação, loja e dados",
        description:
          "Na página Plataforma vês como a 4unik une motor de missões, catálogo e integrações — ponto de partida para pedires ajuda à equipa comercial.",
        ctaLabel: "Abrir página Plataforma",
      },
      feature: {
        eyebrow: "Motor de gamificação",
        title: "Aprofunda no motor da 4unik",
        description:
          "A página do motor explica missões, pontos e campanhas alinhadas ao teu RH — ideal para preparares uma conversa com representantes sobre o teu programa.",
        ctaLabel: "Ver motor de gamificação",
        featureAlt: "Painel de métricas e gamificação na plataforma 4unik",
      },
      demo: {
        eyebrow: "Demo · representantes 4unik",
        title: "Vê a plataforma ao vivo com a nossa equipa",
        description:
          "Agenda uma demo no Calendly: conversa com representantes 4unik para desenhar engajamento, missões e loja ao teu ritmo.",
        ctaLabel: "Marcar demo",
      },
    },
    en: {
      platform: {
        eyebrow: "Overview · 4unik landing",
        title: "Where gamification, store and data meet",
        description:
          "The Platform page shows how 4unik combines missions, catalog and integrations — your entry point to ask our team for help.",
        ctaLabel: "Open Platform page",
      },
      feature: {
        eyebrow: "Gamification engine",
        title: "Go deeper on the 4unik engine",
        description:
          "The engine page covers missions, points and HR campaigns — use it to brief 4unik reps before a tailored conversation.",
        ctaLabel: "View gamification engine",
        featureAlt: "Gamification and metrics dashboard on 4unik",
      },
      demo: {
        eyebrow: "Demo · 4unik representatives",
        title: "See the platform live with our team",
        description:
          "Book a Calendly demo: speak with 4unik representatives to shape engagement, missions and the store for your context.",
        ctaLabel: "Book a demo",
      },
    },
  },
  "2": {
    pt: {
      platform: {
        eyebrow: "Loja corporativa · landing",
        title: "Brindes e resgates como na 4unik",
        description:
          "A página da loja mostra catálogo e resgates — o mesmo fluxo que podes combinar com eventos e QR Codes com ajuda da equipa 4unik.",
        ctaLabel: "Ver loja de resgate",
      },
      feature: {
        eyebrow: "Logística integrada",
        title: "Entrega e operação de prémios",
        description:
          "A logística integrada explica como a 4unik suporta envio e operação — útil para planear eventos e brindes com representantes.",
        ctaLabel: "Ver logística integrada",
        featureAlt: "Evento corporativo e experiência de marca",
      },
      demo: {
        eyebrow: "Demo · representantes 4unik",
        title: "Planeia eventos e brindes com a 4unik",
        description:
          "Marca uma demo: representantes 4unik ajudam a ligar QR Codes, missões e loja ao teu calendário de eventos.",
        ctaLabel: "Marcar demo",
      },
    },
    en: {
      platform: {
        eyebrow: "Corporate store · landing",
        title: "Rewards and redemption like on 4unik",
        description:
          "The store page shows catalog and redemption — the same flow you can pair with events and QR codes with help from our team.",
        ctaLabel: "View rewards store",
      },
      feature: {
        eyebrow: "Integrated logistics",
        title: "Fulfillment and prize operations",
        description:
          "Integrated logistics explains how 4unik supports shipping and ops — plan events and gifts with our representatives.",
        ctaLabel: "View integrated logistics",
        featureAlt: "Corporate event audience and stage",
      },
      demo: {
        eyebrow: "Demo · 4unik representatives",
        title: "Plan events and gifts with 4unik",
        description:
          "Book a demo: 4unik representatives help connect QR missions and the store to your event calendar.",
        ctaLabel: "Book a demo",
      },
    },
  },
  "3": {
    pt: {
      platform: {
        eyebrow: "Motor · landing",
        title: "Campanhas comerciais com a 4unik",
        description:
          "O motor de gamificação na landing mostra como missões e rankings servem equipas de vendas — base para pedires um desenho com a 4unik.",
        ctaLabel: "Ver motor de gamificação",
      },
      feature: {
        eyebrow: "Painel do gestor",
        title: "Métricas para líderes comerciais",
        description:
          "O painel do gestor na landing cobre visibilidade de adesão e resultados — alinha com representantes como medir a tua campanha.",
        ctaLabel: "Ver painel do gestor",
        featureAlt: "Equipa de vendas alinhada em campanha",
      },
      demo: {
        eyebrow: "Demo · representantes 4unik",
        title: "Desenha incentivos com a 4unik",
        description:
          "Conversa com representantes 4unik numa demo: ranking, missões e orçamento de prémios para o teu time.",
        ctaLabel: "Marcar demo",
      },
    },
    en: {
      platform: {
        eyebrow: "Engine · landing",
        title: "Sales campaigns on 4unik",
        description:
          "The gamification engine page shows missions and rankings for sales teams — a baseline to ask 4unik for a tailored design.",
        ctaLabel: "View gamification engine",
      },
      feature: {
        eyebrow: "Manager dashboard",
        title: "Metrics for sales leaders",
        description:
          "The manager dashboard page covers adoption and outcomes — align with reps on how to measure your campaign.",
        ctaLabel: "View manager dashboard",
        featureAlt: "Sales team celebrating results",
      },
      demo: {
        eyebrow: "Demo · 4unik representatives",
        title: "Design incentives with 4unik",
        description:
          "Talk to 4unik representatives in a demo: rankings, missions and incentive budget for your team.",
        ctaLabel: "Book a demo",
      },
    },
  },
  "4": {
    pt: {
      platform: {
        eyebrow: "Plataforma · landing",
        title: "Onboarding e jornada do colaborador",
        description:
          "A visão geral da Plataforma liga missões, reconhecimento e loja — o quadro certo para pedires ajuda a desenhar o primeiro mês do colaborador.",
        ctaLabel: "Abrir página Plataforma",
      },
      feature: {
        eyebrow: "Loja de resgate",
        title: "Recompensas no primeiro contacto",
        description:
          "A página da loja explica resgates e catálogo — combina com welcome kit e trilhas; representantes 4unik ajudam a calibrar.",
        ctaLabel: "Ver loja de resgate",
        featureAlt: "Welcome kit e materiais de onboarding",
      },
      demo: {
        eyebrow: "Demo · representantes 4unik",
        title: "Monta o onboarding com a 4unik",
        description:
          "Agenda uma demo com representantes 4unik: trilhas, campanhas para novos contratados e boas práticas.",
        ctaLabel: "Marcar demo",
      },
    },
    en: {
      platform: {
        eyebrow: "Platform · landing",
        title: "Onboarding and employee journey",
        description:
          "The Platform overview ties missions, recognition and the store — the right frame to ask for help shaping month one.",
        ctaLabel: "Open Platform page",
      },
      feature: {
        eyebrow: "Rewards store",
        title: "Rewards from day one",
        description:
          "The store page explains catalog and redemption — pair with welcome kits and paths; 4unik reps help you tune it.",
        ctaLabel: "View rewards store",
        featureAlt: "Welcome kit and onboarding materials",
      },
      demo: {
        eyebrow: "Demo · 4unik representatives",
        title: "Build onboarding with 4unik",
        description:
          "Book a demo with 4unik representatives: paths, new-hire campaigns and best practices.",
        ctaLabel: "Book a demo",
      },
    },
  },
  "5": {
    pt: {
      platform: {
        eyebrow: "Painel do gestor · landing",
        title: "Metas, OKRs e visibilidade",
        description:
          "O painel na landing mostra como acompanhar participação e entregas — útil para alinhares com a 4unik como ligar OKRs a missões.",
        ctaLabel: "Ver painel do gestor",
      },
      feature: {
        eyebrow: "Motor de gamificação",
        title: "Missões ligadas a ciclos de meta",
        description:
          "O motor explica campanhas e pontos por período — combina com revisões de OKR; pede ajuda à equipa para configurar pesos e prazos.",
        ctaLabel: "Ver motor de gamificação",
        featureAlt: "Dashboard de métricas e objetivos",
      },
      demo: {
        eyebrow: "Demo · representantes 4unik",
        title: "Alinha OKRs à operação",
        description:
          "Marca uma demo com representantes 4unik: campanhas, relatórios e ligação entre KRs e missões no teu contexto.",
        ctaLabel: "Marcar demo",
      },
    },
    en: {
      platform: {
        eyebrow: "Manager dashboard · landing",
        title: "Goals, OKRs and visibility",
        description:
          "The dashboard page shows how to track participation and deliveries — align with 4unik on tying OKRs to missions.",
        ctaLabel: "View manager dashboard",
      },
      feature: {
        eyebrow: "Gamification engine",
        title: "Missions tied to goal cycles",
        description:
          "The engine explains campaigns and points by period — pair with OKR reviews; ask our team to configure weights and deadlines.",
        ctaLabel: "View gamification engine",
        featureAlt: "Analytics dashboard on a screen",
      },
      demo: {
        eyebrow: "Demo · 4unik representatives",
        title: "Align OKRs with operations",
        description:
          "Book a demo with 4unik representatives: campaigns, reporting and mapping KRs to missions.",
        ctaLabel: "Book a demo",
      },
    },
  },
  "6": {
    pt: {
      platform: {
        eyebrow: "Painel do gestor · landing",
        title: "Indicadores para provar ROI de engajamento",
        description:
          "O painel cobre adesão e distribuição de pontos — referência para pedires à 4unik relatórios prontos para diretoria.",
        ctaLabel: "Ver painel do gestor",
      },
      feature: {
        eyebrow: "Plataforma · visão geral",
        title: "Stack completo num só sítio",
        description:
          "A página Plataforma resume oferta e integrações — ideal para uma conversa com representantes sobre métricas e custo por resgate.",
        ctaLabel: "Abrir página Plataforma",
        featureAlt: "Análise de dados e gráficos de desempenho",
      },
      demo: {
        eyebrow: "Demo · representantes 4unik",
        title: "ROI e relatórios com a 4unik",
        description:
          "Agenda uma demo com representantes 4unik: narrativa para a diretoria, integrações e exportação de dados.",
        ctaLabel: "Marcar demo",
      },
    },
    en: {
      platform: {
        eyebrow: "Manager dashboard · landing",
        title: "Metrics to prove engagement ROI",
        description:
          "The dashboard covers adoption and points distribution — ask 4unik for board-ready reporting.",
        ctaLabel: "View manager dashboard",
      },
      feature: {
        eyebrow: "Platform · overview",
        title: "Full stack in one place",
        description:
          "The Platform page summarizes offer and integrations — talk to representatives about metrics and cost per redemption.",
        ctaLabel: "Open Platform page",
        featureAlt: "Charts and data analysis on a laptop",
      },
      demo: {
        eyebrow: "Demo · 4unik representatives",
        title: "ROI and reporting with 4unik",
        description:
          "Book a demo with 4unik representatives: leadership narrative, integrations and data exports.",
        ctaLabel: "Book a demo",
      },
    },
  },
  "7": {
    pt: {
      platform: {
        eyebrow: "Casos de uso · landing",
        title: "Como outras equipas usam a 4unik",
        description:
          "A página Casos de uso mostra cenários reais — inspiração antes de pedires ajuda para cultura, feedback e performance contínuos.",
        ctaLabel: "Ver casos de uso",
      },
      feature: {
        eyebrow: "Plataforma · oferta",
        title: "Reconhecimento e missões no dia a dia",
        description:
          "A Plataforma detalha módulos e fluxos — combina com gestão de pessoas; representantes 4unik ajudam a desenhar o teu modelo.",
        ctaLabel: "Abrir página Plataforma",
        featureAlt: "RH e liderança em conversa estratégica",
      },
      demo: {
        eyebrow: "Demo · representantes 4unik",
        title: "Cultura e performance com a 4unik",
        description:
          "Marca uma demo: conversa com representantes 4unik sobre reconhecimento contínuo, missões e alinhamento com liderança.",
        ctaLabel: "Marcar demo",
      },
    },
    en: {
      platform: {
        eyebrow: "Use cases · landing",
        title: "How teams use 4unik",
        description:
          "The use cases page shows real scenarios — inspiration before you ask for help on culture, feedback and ongoing performance.",
        ctaLabel: "View use cases",
      },
      feature: {
        eyebrow: "Platform · offer",
        title: "Recognition and missions every day",
        description:
          "The Platform page details modules and flows — pair with people management; 4unik reps help design your model.",
        ctaLabel: "Open Platform page",
        featureAlt: "HR and leadership in strategic conversation",
      },
      demo: {
        eyebrow: "Demo · 4unik representatives",
        title: "Culture and performance with 4unik",
        description:
          "Book a demo: talk to 4unik representatives about continuous recognition, missions and leadership alignment.",
        ctaLabel: "Book a demo",
      },
    },
  },
};

export type BlogCtaBodySpecLine = {
  type: "blogCta";
  variant: BlogCtaVariant;
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  featureImage?: { alt: string; asset: { url: string } };
};

function isBlogFallbackSlug(s: string): s is BlogFallbackSlug {
  return s === "1" || s === "2" || s === "3" || s === "4" || s === "5" || s === "6" || s === "7";
}

/** Categoria do Studio (PT ou EN) → slug lógico `1`…`7` usado em `BLOG_CTA_PATHS_BY_SLUG` / copy do triplet. */
export const BLOG_CATEGORY_TO_FALLBACK_SLUG: Partial<Record<string, BlogFallbackSlug>> = {
  Engajamento: "1",
  Engagement: "1",
  "Eventos & Brindes": "2",
  "Events & Rewards": "2",
  "Gamificação de Times": "3",
  "Team Gamification": "3",
  "Motivação & Reconhecimento": "4",
  "Motivation & Recognition": "4",
  "4unik na Prática": "5",
  "4unik in Practice": "5",
  Crescimento: "6",
  Growth: "6",
  "Gestão de Pessoas": "7",
  "People Management": "7",
};

export function resolveBlogSlugFromCategory(category: string): BlogFallbackSlug {
  return BLOG_CATEGORY_TO_FALLBACK_SLUG[category] ?? "1";
}

function blogCtaBodyLineToSanityBlock(line: BlogCtaBodySpecLine, key: string): BlogCtaBlock {
  return {
    _key: key,
    _type: "blogCta",
    variant: line.variant,
    eyebrow: line.eyebrow,
    title: line.title,
    description: line.description,
    ctaLabel: line.ctaLabel,
    ctaHref: line.ctaHref,
    featureImage: line.featureImage
      ? { alt: line.featureImage.alt, asset: line.featureImage.asset }
      : undefined,
  };
}

/**
 * Três blocos `blogCta` prontos para o corpo `blogPost` no Sanity (URLs via `blogLandingHref` + demo Calendly).
 */
export function sanityBlogCtaBlocksForCategory(
  locale: "pt" | "en",
  category: string,
  keyPrefix = "gen-cta",
): [BlogCtaBlock, BlogCtaBlock, BlogCtaBlock] {
  const slug = resolveBlogSlugFromCategory(category);
  const triplet = buildBlogCtaBodyLines(slug, locale);
  const id = `${keyPrefix}-${slug}`;
  return [
    blogCtaBodyLineToSanityBlock(triplet[0], `${id}-0`),
    blogCtaBodyLineToSanityBlock(triplet[1], `${id}-1`),
    blogCtaBodyLineToSanityBlock(triplet[2], `${id}-2`),
  ];
}

/**
 * Três blocos `blogCta` (plataforma, feature, demo) alinhados às páginas da landing e ao slug do post.
 */
export function buildBlogCtaBodyLines(slug: string, locale: "pt" | "en"): [BlogCtaBodySpecLine, BlogCtaBodySpecLine, BlogCtaBodySpecLine] {
  const key: BlogFallbackSlug = isBlogFallbackSlug(slug) ? slug : "1";
  const paths = BLOG_CTA_PATHS_BY_SLUG[key];
  const copy = TRIPLET_COPY[key][locale];
  const imgUrl = BLOG_FALLBACK_IMG[paths.img];

  const platform: BlogCtaBodySpecLine = {
    type: "blogCta",
    variant: "platform",
    eyebrow: copy.platform.eyebrow,
    title: copy.platform.title,
    description: copy.platform.description,
    ctaLabel: copy.platform.ctaLabel,
    ctaHref: blogLandingHref(locale, paths.platform),
  };

  const feature: BlogCtaBodySpecLine = {
    type: "blogCta",
    variant: "feature",
    eyebrow: copy.feature.eyebrow,
    title: copy.feature.title,
    description: copy.feature.description,
    ctaLabel: copy.feature.ctaLabel,
    ctaHref: blogLandingHref(locale, paths.feature),
    featureImage: {
      alt: copy.feature.featureAlt,
      asset: { url: imgUrl },
    },
  };

  const demo: BlogCtaBodySpecLine = {
    type: "blogCta",
    variant: "demo",
    eyebrow: copy.demo.eyebrow,
    title: copy.demo.title,
    description: copy.demo.description,
    ctaLabel: copy.demo.ctaLabel,
    ctaHref: BLOG_DEMO_HREF,
  };

  return [platform, feature, demo];
}
