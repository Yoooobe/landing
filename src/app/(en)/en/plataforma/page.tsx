import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "plataforma", {
    canonicalPath: "/en/plataforma/",
    languages: {
      "pt-BR": "/plataforma/",
      en: "/en/plataforma/",
    },
    openGraphPath: "/en/plataforma/",
    ogLocale: "en_US",
  });
}

export default async function EnPlataformaPage() {
  return <MarketingPageWithFaq locale="en" slug="plataforma" pagePath="/en/plataforma/" />;
}
