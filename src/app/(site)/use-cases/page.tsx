import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "casos-de-uso", {
    canonicalPath: "/use-cases/",
    languages: {
      en: "/use-cases/",
    },
    openGraphPath: "/use-cases/",
    ogLocale: "en_US",
  });
}

export default async function EnCasosDeUsoPage() {
  return <MarketingPageWithFaq locale="en" slug="casos-de-uso" pagePath="/use-cases/" />;
}
