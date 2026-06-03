import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "eventos", {
    canonicalPath: "/en/eventos/",
    languages: {
      "pt-BR": "/eventos/",
      en: "/en/eventos/",
    },
    openGraphPath: "/en/eventos/",
    ogLocale: "en_US",
  });
}

export default async function EventosPageEn() {
  return <MarketingPageWithFaq locale="en" slug="eventos" pagePath="/en/eventos/" />;
}
