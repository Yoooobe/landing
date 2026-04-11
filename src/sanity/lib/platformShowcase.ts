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
