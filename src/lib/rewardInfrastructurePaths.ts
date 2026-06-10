import type { Locale } from "@/lib/locale";

/** CMS slug per locale (Sanity `marketingPage.slug.current`). */
export const REWARD_INFRASTRUCTURE_SLUG: Record<Locale, string> = {
  pt: "infraestrutura-de-recompensas",
  en: "reward-infrastructure",
};

/** Public route path (with trailing slash, without basePath). */
export const REWARD_INFRASTRUCTURE_PATH: Record<Locale, string> = {
  pt: "/infraestrutura-de-recompensas/",
  en: "/en/reward-infrastructure/",
};

export function rewardInfrastructureSlug(locale: Locale): string {
  return REWARD_INFRASTRUCTURE_SLUG[locale];
}

export function rewardInfrastructurePath(locale: Locale): string {
  return REWARD_INFRASTRUCTURE_PATH[locale];
}

export function isRewardInfrastructureSlug(slug: string): boolean {
  return slug === REWARD_INFRASTRUCTURE_SLUG.pt || slug === REWARD_INFRASTRUCTURE_SLUG.en;
}
