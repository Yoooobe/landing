import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "casos-de-uso", {
    canonicalPath: "/casos-de-uso/",
    languages: {
      "pt-BR": "/casos-de-uso/",
      en: "/en/casos-de-uso/",
    },
    openGraphPath: "/casos-de-uso/",
    ogLocale: "pt_BR",
  });
}

export default async function CasosDeUsoPage() {
  return <MarketingPageWithFaq locale="pt" slug="casos-de-uso" pagePath="/casos-de-uso/" />;
}
