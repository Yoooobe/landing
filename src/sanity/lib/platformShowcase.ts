import type { Locale } from "@/lib/locale";
import { getSanityClient } from "@/sanity/lib/client";
import type { PlatformShowcaseMediaDoc } from "@/sanity/lib/types";

const imageFields = `{
  alt,
  asset->{
    _ref,
    url
  }
}`;

const QUERY = `*[
  _type == "platformShowcaseMedia" &&
  pageKey == $pageKey &&
  locale == $locale
][0]{
  _id,
  title,
  pageKey,
  locale,
  adminDashboardImage ${imageFields},
  storeMockupImage ${imageFields},
  logisticsPanelImage ${imageFields},
  securityPanelImage ${imageFields},
  gestaoFeatureCards[]{
    emoji,
    image ${imageFields}
  },
  gamificacaoFeatureCards[]{
    emoji,
    image ${imageFields}
  },
  lojaFeatureCards[]{
    emoji,
    image ${imageFields}
  },
  apiFeatureCards[]{
    emoji,
    image ${imageFields}
  },
  storeHomeImage ${imageFields},
  productDetailImage ${imageFields},
  cartImage ${imageFields},
  giftWizardImage ${imageFields},
  adminUsersImage ${imageFields},
  adminSettingsImage ${imageFields},
  orderDetailImage ${imageFields},
  featurePages{
    manager{ heroImage ${imageFields}, galleryImages[] ${imageFields} },
    wallets{ heroImage ${imageFields}, galleryImages[] ${imageFields} },
    loja{ heroImage ${imageFields}, galleryImages[] ${imageFields} }
  }
}`;

export async function getPlatformShowcaseMedia(
  locale: Locale,
  pageKey = "plataforma",
): Promise<PlatformShowcaseMediaDoc | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<PlatformShowcaseMediaDoc | null>(QUERY, {
      locale,
      pageKey,
    });
  } catch {
    return null;
  }
}

type FeaturePageOverrides = {
  heroImageOverride: string | null;
  galleryOverrides: Array<string | null>;
};

/**
 * Resolve hero + gallery Sanity overrides for a `PlatformFeaturePage` sub-page.
 * Returns absolute asset URLs (or null) so the component falls back to static
 * `public/` screenshots when the editor has not uploaded a replacement.
 */
export async function getPlatformFeaturePageOverrides(
  locale: Locale,
  key: "manager" | "wallets" | "loja",
): Promise<FeaturePageOverrides> {
  const doc = await getPlatformShowcaseMedia(locale, "plataforma");
  const group = doc?.featurePages?.[key];
  const toUrl = (image: { asset?: { url?: string } | null } | null | undefined): string | null =>
    image?.asset?.url ?? null;

  return {
    heroImageOverride: toUrl(group?.heroImage),
    galleryOverrides: (group?.galleryImages ?? []).map(toUrl),
  };
}
