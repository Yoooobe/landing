import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "gamificacao", {
    canonicalPath: "/en/gamificacao/",
    languages: {
      "pt-BR": "/gamificacao/",
      en: "/en/gamificacao/",
    },
    openGraphPath: "/en/gamificacao/",
    ogLocale: "en_US",
  });
}

export default async function EnGamificacaoPage() {
  return <MarketingPageWithFaq locale="en" slug="gamificacao" pagePath="/en/gamificacao/" />;
}
