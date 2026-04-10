import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "plataforma", {
    canonicalPath: "/plataforma/",
    languages: {
      "pt-BR": "/plataforma/",
      en: "/en/plataforma/",
    },
    openGraphPath: "/plataforma/",
    ogLocale: "pt_BR",
  });
}

export default async function PlataformaPage() {
  return <MarketingPageWithFaq locale="pt" slug="plataforma" pagePath="/plataforma/" />;
}
