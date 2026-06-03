import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "para-plataformas", {
    canonicalPath: "/para-plataformas/",
    languages: {
      "pt-BR": "/para-plataformas/",
      en: "/en/para-plataformas/",
    },
    openGraphPath: "/para-plataformas/",
    ogLocale: "pt_BR",
  });
}

export default async function ParaPlataformasPage() {
  return <MarketingPageWithFaq locale="pt" slug="para-plataformas" pagePath="/para-plataformas/" />;
}
