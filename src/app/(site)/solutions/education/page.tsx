import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "educacao", {
    canonicalPath: "/solutions/education/",
    languages: {
      en: "/solutions/education/",
    },
    openGraphPath: "/solutions/education/",
    ogLocale: "en_US",
  });
}

export default async function EducacaoPageEn() {
  return <MarketingPageWithFaq locale="en" slug="educacao" pagePath="/solutions/education/" />;
}
