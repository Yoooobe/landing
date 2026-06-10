import type { Locale } from "@/lib/locale";
import { enGamificacaoCampanhas } from "@/messages/segments/en-gamificacao-campanhas";
import { enGamificacaoCampanhasPage } from "@/messages/segments/en-gamificacao-campanhas-page";
import { ptGamificacaoCampanhas } from "@/messages/segments/pt-gamificacao-campanhas";
import { ptGamificacaoCampanhasPage } from "@/messages/segments/pt-gamificacao-campanhas-page";
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
      title: "Campanhas de Gamificação | Do byte ao brinde | 4unik",
      description:
        "Campanhas de gamificação corporativa com reconhecimento, loja VIP, +5.000 prêmios e logística automatizada. Resolva o caos operacional do RH com ROI mensurável.",
      openGraphDescription:
        "Do byte ao brinde: gamificação, loja corporativa e operação integrada. Cases Boticário e Softplan, setup em 24h.",
    },
    hero: {
      ...toMutable(ptGamificacaoCampanhas.hero),
      ctaHref: "#mechanics",
    },
    problem: toMutable(ptGamificacaoCampanhas.problem),
    mechanics: toMutable(ptGamificacaoCampanhasPage.mechanics),
    flow: toMutable(ptGamificacaoCampanhasPage.flow),
    cases: toMutable(ptGamificacaoCampanhasPage.cases),
    trends: toMutable(ptGamificacaoCampanhasPage.trends),
    stats: toMutable(ptGamificacaoCampanhasPage.stats),
    kpis: toMutable(ptGamificacaoCampanhasPage.kpis),
    deepUsecases: toMutable(ptGamificacaoCampanhasPage.deepUsecases),
    faq: toMutable(ptGamificacaoCampanhasPage.faq),
    finalCta: {
      ...toMutable(ptGamificacaoCampanhas.pageCta),
      ctaHref: "https://calendly.com/4unik/30min",
    },
  },
  en: {
    seo: {
      title: "Gamification Campaigns | Byte to reward | 4Unik",
      description:
        "Corporate gamification campaigns with recognition, VIP store, 5,000+ rewards, and automated logistics. Fix HR operational chaos with measurable ROI.",
      openGraphDescription:
        "Byte to reward: gamification, corporate store, and integrated operations. Boticário and Softplan cases, 24h setup.",
    },
    hero: {
      ...toMutable(enGamificacaoCampanhas.hero),
      ctaHref: "#mechanics",
    },
    problem: toMutable(enGamificacaoCampanhas.problem),
    mechanics: toMutable(enGamificacaoCampanhasPage.mechanics),
    flow: toMutable(enGamificacaoCampanhasPage.flow),
    cases: toMutable(enGamificacaoCampanhasPage.cases),
    trends: toMutable(enGamificacaoCampanhasPage.trends),
    stats: toMutable(enGamificacaoCampanhasPage.stats),
    kpis: toMutable(enGamificacaoCampanhasPage.kpis),
    deepUsecases: toMutable(enGamificacaoCampanhasPage.deepUsecases),
    faq: toMutable(enGamificacaoCampanhasPage.faq),
    finalCta: {
      ...toMutable(enGamificacaoCampanhas.pageCta),
      ctaHref: "https://calendly.com/4unik/30min",
    },
  },
};

export async function getResolvedGamificacaoCampanhasContent(
  locale: Locale,
): Promise<ResolvedGamificacaoContent> {
  return fallbackByLocale[locale];
}
