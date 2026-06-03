import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "vendas", {
    canonicalPath: "/vendas/",
    languages: {
      "pt-BR": "/vendas/",
      en: "/en/vendas/",
    },
    openGraphPath: "/vendas/",
    ogLocale: "pt_BR",
  });
}

export default async function VendasPage() {
  return <MarketingPageWithFaq locale="pt" slug="vendas" pagePath="/vendas/" />;
}
