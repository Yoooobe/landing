import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "vendas", {
    canonicalPath: "/solutions/sales/",
    languages: {
      en: "/solutions/sales/",
    },
    openGraphPath: "/solutions/sales/",
    ogLocale: "en_US",
  });
}

export default async function VendasPageEn() {
  return <MarketingPageWithFaq locale="en" slug="vendas" pagePath="/solutions/sales/" />;
}
