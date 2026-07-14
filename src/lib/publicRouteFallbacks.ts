import type { Locale } from "@/lib/locale";
import type { PageSeoCopy } from "@/lib/seo/routeMetadata";
import { enBlogPage } from "@/messages/segments/en-blog-page";
import { enLandingMore } from "@/messages/segments/en-landing-more";
import { ptBlogPage } from "@/messages/segments/pt-blog-page";
import { ptLandingMore } from "@/messages/segments/pt-landing-more";

export type PlataformaStubVariant = "motor" | "logistica" | "loja";

const plataformaStubSeoByLocale: Record<Locale, Record<PlataformaStubVariant, PageSeoCopy>> = {
  pt: {
    motor: {
      title: "Motor de gamificação corporativa | 4Unik — pontos, missões e rankings",
      description: ptLandingMore.plataformaStubs.motor.body,
    },
    logistica: {
      title: "Logística integrada de brindes e prêmios | 4Unik",
      description: ptLandingMore.plataformaStubs.logistica.body,
    },
    loja: {
      title: "Loja corporativa de resgates e recompensas | 4Unik",
      description: ptLandingMore.plataformaStubs.loja.body,
    },
  },
  en: {
    motor: {
      title: "Gamification Engine | 4Unik",
      description: enLandingMore.plataformaStubs.motor.body,
    },
    logistica: {
      title: "Integrated Logistics | 4Unik",
      description: enLandingMore.plataformaStubs.logistica.body,
    },
    loja: {
      title: "Corporate Store & Redemptions | 4Unik",
      description: enLandingMore.plataformaStubs.loja.body,
    },
  },
};

const blogListingSeoByLocale: Record<Locale, PageSeoCopy> = {
  pt: {
    title: "Blog 4Unik — engajamento, gamificação e reconhecimento",
    description: ptBlogPage.sub,
  },
  en: {
    title: "Blog | 4Unik",
    description: enBlogPage.sub,
  },
};

export function getPlataformaStubSeo(
  locale: Locale,
  variant: PlataformaStubVariant,
): PageSeoCopy {
  return plataformaStubSeoByLocale[locale][variant];
}

export function getBlogListingSeo(locale: Locale): PageSeoCopy {
  return blogListingSeoByLocale[locale];
}
