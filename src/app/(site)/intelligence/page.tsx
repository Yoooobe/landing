import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "inteligencia", {
    canonicalPath: "/intelligence/",
    languages: {
      en: "/intelligence/",
    },
    openGraphPath: "/intelligence/",
    ogLocale: "en_US",
  });
}

export default async function EnInteligenciaPage() {
  return <MarketingPageWithFaq locale="en" slug="inteligencia" pagePath="/intelligence/" />;
}
