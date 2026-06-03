import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "para-plataformas", {
    canonicalPath: "/en/para-plataformas/",
    languages: {
      "pt-BR": "/para-plataformas/",
      en: "/en/para-plataformas/",
    },
    openGraphPath: "/en/para-plataformas/",
    ogLocale: "en_US",
  });
}

export default async function ParaPlataformasPageEn() {
  return <MarketingPageWithFaq locale="en" slug="para-plataformas" pagePath="/en/para-plataformas/" />;
}
