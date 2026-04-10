import MarketingPageScreen from "@/components/MarketingPageScreen";
import {
  buildMarketingPageMetadata,
} from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "api-integracoes", {
    canonicalPath: "/api-integracoes/",
    languages: {
      "pt-BR": "/api-integracoes/",
      en: "/en/api-integracoes/",
    },
    openGraphPath: "/api-integracoes/",
    ogLocale: "pt_BR",
  });
}

export default async function ApiIntegracoesPage() {
  return <MarketingPageScreen locale="pt" slug="api-integracoes" />;
}
