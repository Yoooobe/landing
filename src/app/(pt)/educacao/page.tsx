import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "educacao", {
    canonicalPath: "/educacao/",
    languages: {
      "pt-BR": "/educacao/",
      en: "/en/educacao/",
    },
    openGraphPath: "/educacao/",
    ogLocale: "pt_BR",
  });
}

export default async function EducacaoPage() {
  return <MarketingPageWithFaq locale="pt" slug="educacao" pagePath="/educacao/" />;
}
