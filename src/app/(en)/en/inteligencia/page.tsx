import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "inteligencia", {
    canonicalPath: "/en/inteligencia/",
    languages: {
      "pt-BR": "/inteligencia/",
      en: "/en/inteligencia/",
    },
    openGraphPath: "/en/inteligencia/",
    ogLocale: "en_US",
  });
}

export default async function EnInteligenciaPage() {
  return <MarketingPageWithFaq locale="en" slug="inteligencia" pagePath="/en/inteligencia/" />;
}
