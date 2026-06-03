import type { Metadata } from "next";

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
