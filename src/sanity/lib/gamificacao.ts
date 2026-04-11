import type { Locale } from "@/lib/locale";
import { enGamificacao } from "@/messages/segments/en-gamificacao";
import { enGamificacaoPage } from "@/messages/segments/en-gamificacao-page";
import { ptGamificacao } from "@/messages/segments/pt-gamificacao";
import { ptGamificacaoPage } from "@/messages/segments/pt-gamificacao-page";
import type { ResolvedGamificacaoContent } from "@/sanity/lib/types";

type MutableDeep<T> = T extends ReadonlyArray<infer U>
  ? MutableDeep<U>[]
  : T extends object
    ? { -readonly [K in keyof T]: MutableDeep<T[K]> }
    : T;

function toMutable<T>(value: T): MutableDeep<T> {
  return structuredClone(value) as MutableDeep<T>;
}

const fallbackByLocale: Record<Locale, ResolvedGamificacaoContent> = {
  pt: {
    seo: {
      title: "Gamificacao Corporativa | 4unik",
      description:
        "Motor de gamificacao corporativa com pontos, rankings, desafios, recompensas reais e analytics para RH e liderancas.",
      openGraphDescription:
        "Gamificacao corporativa com pontos, rankings, desafios e recompensas reais para elevar engajamento e performance.",
    },
    hero: {
      ...toMutable(ptGamificacao.hero),
      ctaHref: "#mechanics",
    },
    problem: toMutable(ptGamificacao.problem),
    mechanics: toMutable(ptGamificacaoPage.mechanics),
    flow: toMutable(ptGamificacaoPage.flow),
    cases: toMutable(ptGamificacaoPage.cases),
    trends: toMutable(ptGamificacaoPage.trends),
    stats: toMutable(ptGamificacaoPage.stats),
    kpis: toMutable(ptGamificacaoPage.kpis),
    deepUsecases: toMutable(ptGamificacaoPage.deepUsecases),
    faq: toMutable(ptGamificacaoPage.faq),
    finalCta: {
      ...toMutable(ptGamificacao.pageCta),
      ctaHref: "https://calendly.com/yoobeco/demo",
    },
  },
  en: {
    seo: {
      title: "Corporate Gamification | 4unik",
      description:
        "Corporate gamification engine with points, rankings, missions, real rewards, and analytics for HR and business leaders.",
      openGraphDescription:
        "Corporate gamification with points, leaderboards, challenges, and real rewards to improve engagement and performance.",
    },
    hero: {
      ...toMutable(enGamificacao.hero),
      ctaHref: "#mechanics",
    },
    problem: toMutable(enGamificacao.problem),
    mechanics: toMutable(enGamificacaoPage.mechanics),
    flow: toMutable(enGamificacaoPage.flow),
    cases: toMutable(enGamificacaoPage.cases),
    trends: toMutable(enGamificacaoPage.trends),
    stats: toMutable(enGamificacaoPage.stats),
    kpis: toMutable(enGamificacaoPage.kpis),
    deepUsecases: toMutable(enGamificacaoPage.deepUsecases),
    faq: toMutable(enGamificacaoPage.faq),
    finalCta: {
      ...toMutable(enGamificacao.pageCta),
      ctaHref: "https://calendly.com/yoobeco/demo",
    },
  },
};

export async function getResolvedGamificacaoContent(
  locale: Locale,
): Promise<ResolvedGamificacaoContent> {
  return fallbackByLocale[locale];
}
