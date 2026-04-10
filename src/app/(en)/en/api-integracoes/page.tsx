import MarketingPageScreen from "@/components/MarketingPageScreen";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "api-integracoes", {
    canonicalPath: "/en/api-integracoes/",
    languages: {
      "pt-BR": "/api-integracoes/",
      en: "/en/api-integracoes/",
    },
    openGraphPath: "/en/api-integracoes/",
    ogLocale: "en_US",
  });
}

export default async function EnApiIntegracoesOverviewPage() {
  return <MarketingPageScreen locale="en" slug="api-integracoes" />;
}
