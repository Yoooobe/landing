import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "para-plataformas", {
    canonicalPath: "/for-platforms/",
    languages: {
      en: "/for-platforms/",
    },
    openGraphPath: "/for-platforms/",
    ogLocale: "en_US",
  });
}

export default async function ParaPlataformasPageEn() {
  return <MarketingPageWithFaq locale="en" slug="para-plataformas" pagePath="/for-platforms/" />;
}
