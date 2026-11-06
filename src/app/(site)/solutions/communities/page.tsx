import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "comunidades", {
    canonicalPath: "/solutions/communities/",
    languages: {
      en: "/solutions/communities/",
    },
    openGraphPath: "/solutions/communities/",
    ogLocale: "en_US",
  });
}

export default async function ComunidadesPageEn() {
  return <MarketingPageWithFaq locale="en" slug="comunidades" pagePath="/solutions/communities/" />;
}
