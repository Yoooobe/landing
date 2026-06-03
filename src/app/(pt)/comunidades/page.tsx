import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "comunidades", {
    canonicalPath: "/comunidades/",
    languages: {
      "pt-BR": "/comunidades/",
      en: "/en/comunidades/",
    },
    openGraphPath: "/comunidades/",
    ogLocale: "pt_BR",
  });
}

export default async function ComunidadesPage() {
  return <MarketingPageWithFaq locale="pt" slug="comunidades" pagePath="/comunidades/" />;
}
