import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "casos-de-uso", {
    canonicalPath: "/en/casos-de-uso/",
    languages: {
      "pt-BR": "/casos-de-uso/",
      en: "/en/casos-de-uso/",
    },
    openGraphPath: "/en/casos-de-uso/",
    ogLocale: "en_US",
  });
}

export default async function EnCasosDeUsoPage() {
  return <MarketingPageWithFaq locale="en" slug="casos-de-uso" pagePath="/en/casos-de-uso/" />;
}
