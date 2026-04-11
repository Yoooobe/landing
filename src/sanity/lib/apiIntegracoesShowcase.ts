import type { Locale } from "@/lib/locale";
import { getSanityClient } from "@/sanity/lib/client";
import type { ApiIntegracoesShowcaseMediaDoc } from "@/sanity/lib/types";
import groq from "groq";

const imageFields = `{
  alt,
  asset->{
    _ref,
    url
  }
}`;

const PROJECTION = `{
  _id,
  title,
  mediaKey,
  locale,
  hero{
    showcaseImage ${imageFields}
  },
  integrations{
    platforms[]{
      platformName,
      logoImage ${imageFields},
      previewImage ${imageFields}
    }
  },
  features{
    items[]{
      emoji,
      image ${imageFields}
    }
  },
  modules{
    items[]{
      emoji,
      image ${imageFields}
    }
  }
}`;

export async function getApiIntegracoesShowcaseMedia(
  mediaKey = "api-integracoes-default",
  locale: Locale = "pt",
): Promise<ApiIntegracoesShowcaseMediaDoc | null> {
  const client = getSanityClient();
  if (!client) return null;

  const params = { mediaKey, locale };
  const tries = [
    groq`*[_type == "apiIntegracoesShowcaseMedia" && mediaKey == $mediaKey && locale == $locale][0]${PROJECTION}`,
    groq`*[_type == "apiIntegracoesShowcaseMedia" && mediaKey == $mediaKey && !defined(locale)][0]${PROJECTION}`,
    groq`*[_type == "apiIntegracoesShowcaseMedia" && mediaKey == $mediaKey][0]${PROJECTION}`,
  ];

  try {
    for (const query of tries) {
      const doc = await client.fetch<ApiIntegracoesShowcaseMediaDoc | null>(query, params);
      if (doc) return doc;
    }
    return null;
  } catch {
    return null;
  }
}
