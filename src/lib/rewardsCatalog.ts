/** Product listing (fallback when Sanity `rewardsCatalogUrl` is unset). */
export const DEFAULT_REWARDS_CATALOG_PRODUCT_URL = "https://catalogo.4unik.com.br/product";
export const DEFAULT_REWARDS_CATALOG_KITS_URL = "https://catalogo.4unik.com.br/kits";

function catalogBaseFromProductUrl(url: string): string {
  return url.replace(/\/product\/?$/, "");
}

/** Local dev: set `NEXT_PUBLIC_REWARDS_CATALOG_URL` to override Sanity + production fallback. */
export function resolveRewardsCatalogProductUrl(sanityUrl?: string | null): string {
  const override = process.env.NEXT_PUBLIC_REWARDS_CATALOG_URL?.trim();
  if (override) return override;
  return sanityUrl?.trim() || DEFAULT_REWARDS_CATALOG_PRODUCT_URL;
}

export function resolveRewardsCatalogKitsUrl(productUrl?: string): string {
  const override = process.env.NEXT_PUBLIC_REWARDS_CATALOG_KITS_URL?.trim();
  if (override) return override;
  const base = catalogBaseFromProductUrl(productUrl ?? resolveRewardsCatalogProductUrl());
  return `${base}/kits`;
}
