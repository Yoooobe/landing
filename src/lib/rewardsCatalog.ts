/** Product listing (fallback when Sanity `rewardsCatalogUrl` is unset). */
export const DEFAULT_REWARDS_CATALOG_PRODUCT_URL = "https://catalogo.yoobe.co/product";
export const DEFAULT_REWARDS_CATALOG_KITS_URL = "https://catalogo.yoobe.co/kits";

function devOnlyOverride(value: string | undefined): string | undefined {
  const v = value?.trim();
  if (!v) return undefined;
  if (process.env.NODE_ENV === "production" && /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/i.test(v)) {
    return undefined;
  }
  return v;
}

function catalogBaseFromProductUrl(url: string): string {
  return url.replace(/\/product\/?$/, "");
}

/** Local dev: set `NEXT_PUBLIC_REWARDS_CATALOG_URL` to override Sanity + production fallback. */
export function resolveRewardsCatalogProductUrl(sanityUrl?: string | null): string {
  const override = devOnlyOverride(process.env.NEXT_PUBLIC_REWARDS_CATALOG_URL);
  if (override) return override;
  return sanityUrl?.trim() || DEFAULT_REWARDS_CATALOG_PRODUCT_URL;
}

export function resolveRewardsCatalogKitsUrl(productUrl?: string): string {
  const override = devOnlyOverride(process.env.NEXT_PUBLIC_REWARDS_CATALOG_KITS_URL);
  if (override) return override;
  const base = catalogBaseFromProductUrl(productUrl ?? resolveRewardsCatalogProductUrl());
  return `${base}/kits`;
}
