import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "eventos", {
    canonicalPath: "/eventos/",
    languages: {
      "pt-BR": "/eventos/",
      en: "/en/eventos/",
    },
    openGraphPath: "/eventos/",
    ogLocale: "pt_BR",
  });
}

export default async function EventosPage() {
  return <MarketingPageWithFaq locale="pt" slug="eventos" pagePath="/eventos/" />;
}
