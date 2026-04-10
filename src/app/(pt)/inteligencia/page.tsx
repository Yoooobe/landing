import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "inteligencia", {
    canonicalPath: "/inteligencia/",
    languages: {
      "pt-BR": "/inteligencia/",
      en: "/en/inteligencia/",
    },
    openGraphPath: "/inteligencia/",
    ogLocale: "pt_BR",
  });
}

export default async function InteligenciaPage() {
  return <MarketingPageWithFaq locale="pt" slug="inteligencia" pagePath="/inteligencia/" />;
}
