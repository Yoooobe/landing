import type { Metadata } from "next";

/** Pares PT/EN indexáveis quando `NEXT_PUBLIC_INDEX_GROWTH_PAGES=true`. */
export const GROWTH_INDEX_ROUTE_PAIRS = [
  {
    pt: "/pricing/",
    en: "/en/pricing/",
    priority: 0.75,
    changeFrequency: "monthly" as const,
  },
  {
    pt: "/seguranca/",
    en: "/en/seguranca/",
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
] as const;

/**
 * Páginas de crescimento (pricing, segurança, ROI futuro) só entram no índice
 * após aprovação comercial/jurídica. Ver `docs/content-approval-queue.md`.
 */
export function isGrowthPageIndexable(): boolean {
  return process.env.NEXT_PUBLIC_INDEX_GROWTH_PAGES === "true";
}

export function growthPageRobots(): NonNullable<Metadata["robots"]> {
  if (isGrowthPageIndexable()) {
    return { index: true, follow: true };
  }
  return { index: false, follow: true };
}
