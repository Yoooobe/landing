import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "gamificacao", {
    canonicalPath: "/gamificacao/",
    languages: {
      "pt-BR": "/gamificacao/",
      en: "/en/gamificacao/",
    },
    openGraphPath: "/gamificacao/",
    ogLocale: "pt_BR",
  });
}

export default async function GamificacaoPage() {
  return <MarketingPageWithFaq locale="pt" slug="gamificacao" pagePath="/gamificacao/" />;
}
