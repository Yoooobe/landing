import type { Locale } from "@/lib/locale";
import { getSanityClient } from "@/sanity/lib/client";
import type { GamificacaoShowcaseMediaDoc } from "@/sanity/lib/types";
import { groq } from "next-sanity";

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
  mechanics{
    items[]{
      emoji,
      image ${imageFields}
    }
  },
  cases{
    items[]{
      company,
      logoImage ${imageFields},
      featuredImage ${imageFields}
    }
  },
  trends{
    items[]{
      emoji,
      image ${imageFields}
    }
  },
  kpis{
    items[]{
      emoji,
      image ${imageFields}
    }
  },
  deepUsecases{
    items[]{
      emoji,
      image ${imageFields}
    }
  }
}`;

export async function getGamificacaoShowcaseMedia(
  mediaKey = "gamificacao-default",
  locale: Locale = "pt",
): Promise<GamificacaoShowcaseMediaDoc | null> {
  const client = getSanityClient();
  if (!client) return null;

  const params = { mediaKey, locale };
  const tries = [
    groq`*[_type == "gamificacaoShowcaseMedia" && mediaKey == $mediaKey && locale == $locale][0]${PROJECTION}`,
    groq`*[_type == "gamificacaoShowcaseMedia" && mediaKey == $mediaKey && !defined(locale)][0]${PROJECTION}`,
    groq`*[_type == "gamificacaoShowcaseMedia" && mediaKey == $mediaKey][0]${PROJECTION}`,
  ];

  try {
    for (const query of tries) {
      const doc = await client.fetch<GamificacaoShowcaseMediaDoc | null>(query, params);
      if (doc) return doc;
    }
    return null;
  } catch {
    return null;
  }
}
