import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "comunidades", {
    canonicalPath: "/en/comunidades/",
    languages: {
      "pt-BR": "/comunidades/",
      en: "/en/comunidades/",
    },
    openGraphPath: "/en/comunidades/",
    ogLocale: "en_US",
  });
}

export default async function ComunidadesPageEn() {
  return <MarketingPageWithFaq locale="en" slug="comunidades" pagePath="/en/comunidades/" />;
}
