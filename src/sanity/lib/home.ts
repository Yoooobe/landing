import { BASE_PATH } from "@/lib/basePath";
import type { Locale } from "@/lib/locale";
import { groq } from "next-sanity";
import { enHome } from "@/messages/segments/en-home";
import { ptHome } from "@/messages/segments/pt-home";
import { getSanityClient } from "@/sanity/lib/client";
import type { HomeShowcaseMediaDoc, ResolvedHomeContent } from "@/sanity/lib/types";

const imageFields = `{
  alt,
  asset->{
    _ref,
    url
  }
}`;

/** Corpo GROQ comum para documentos `homeShowcaseMedia`. */
const homeShowcaseMediaProjection = `{
    _id,
    title,
    mediaKey,
    locale,
    bento{
      primaryCardImage ${imageFields},
      storeCardImage ${imageFields}
    },
    platformTabs{
      managementImage ${imageFields},
      storeImage ${imageFields},
      campaignsImage ${imageFields}
    },
    enterpriseCases{
      hapvidaLogoImage ${imageFields},
      hapvidaCaseImage ${imageFields},
      prioLogoImage ${imageFields},
      prioCaseImage ${imageFields}
    },
    storeSection{
      usecaseCards[]{
        emoji,
        image ${imageFields}
      }
    },
    howItWorks{
      architectureImage ${imageFields}
    },
    aiRoadmap{
      stages[]{
        icon,
        accentTone,
        image ${imageFields}
      }
    },
    dedicatedIntegrations{
      workvivo{
        logoImage ${imageFields},
        previewImage ${imageFields}
      },
      beehome{
        logoImage ${imageFields},
        previewImage ${imageFields}
      }
    },
    managementSection{
      featureCards[]{
        emoji,
        image ${imageFields}
      }
    }
}`;

const HOME_SHOWCASE_MEDIA_KEY = "home-default";

async function fetchHomeShowcaseMediaForLocale(
  client: NonNullable<ReturnType<typeof getSanityClient>>,
  locale: Locale,
): Promise<HomeShowcaseMediaDoc | null> {
  const params = { mediaKey: HOME_SHOWCASE_MEDIA_KEY, locale };
  const tries = [
    groq`*[_type == "homeShowcaseMedia" && mediaKey == $mediaKey && locale == $locale][0]${homeShowcaseMediaProjection}`,
    groq`*[_type == "homeShowcaseMedia" && mediaKey == $mediaKey && !defined(locale)][0]${homeShowcaseMediaProjection}`,
    groq`*[_type == "homeShowcaseMedia" && mediaKey == $mediaKey][0]${homeShowcaseMediaProjection}`,
  ];
  for (const query of tries) {
    const doc = await client.fetch<HomeShowcaseMediaDoc | null>(query, params);
    if (doc) return doc;
  }
  return null;
}

const fallbackByLocale: Record<Locale, ResolvedHomeContent> = {
  pt: {
    seo: {
      title: ptHome.seo.title,
      description: ptHome.seo.description,
    },
    hero: {
      ...ptHome.hero,
      ctaDemoHref: "https://calendly.com/yoobeco/demo",
      ctaExploreHref: `${BASE_PATH}/#platform`,
      floatAdhesionValue: "92%",
      floatRhValue: "0%",
      floatEnpsValue: "+42 pts",
    },
    fourUnik: {
      ...ptHome.fourUnik,
      ctaHref: "https://4unik.com.br",
    },
    trust: {
      ...ptHome.trust,
    },
    finalCta: {
      ...ptHome.finalCta,
      demoHref: "https://calendly.com/yoobeco/demo",
      whatsappHref: "https://wa.me/554187582060",
    },
  },
  en: {
    seo: {
      title: enHome.seo.title,
      description: enHome.seo.description,
    },
    hero: {
      ...enHome.hero,
      ctaDemoHref: "https://calendly.com/yoobeco/demo",
      ctaExploreHref: `${BASE_PATH}/en/#platform`,
      floatAdhesionValue: "92%",
      floatRhValue: "0%",
      floatEnpsValue: "+42 pts",
    },
    fourUnik: {
      ...enHome.fourUnik,
      ctaHref: "https://4unik.com.br",
    },
    trust: {
      ...enHome.trust,
    },
    finalCta: {
      ...enHome.finalCta,
      demoHref: "https://calendly.com/yoobeco/demo",
      whatsappHref: "https://wa.me/554187582060",
    },
  },
};

export async function getResolvedHomeContent(locale: Locale): Promise<ResolvedHomeContent> {
  const client = getSanityClient();
  if (!client) return fallbackByLocale[locale];

  try {
    const showcaseMedia = await fetchHomeShowcaseMediaForLocale(client, locale);
    return {
      ...fallbackByLocale[locale],
      showcaseMedia,
    };
  } catch {
    return fallbackByLocale[locale];
  }
}
