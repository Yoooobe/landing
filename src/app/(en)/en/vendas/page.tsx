import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "vendas", {
    canonicalPath: "/en/vendas/",
    languages: {
      "pt-BR": "/vendas/",
      en: "/en/vendas/",
    },
    openGraphPath: "/en/vendas/",
    ogLocale: "en_US",
  });
}

export default async function VendasPageEn() {
  return <MarketingPageWithFaq locale="en" slug="vendas" pagePath="/en/vendas/" />;
}
