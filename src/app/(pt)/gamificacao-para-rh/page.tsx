import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "gamificacao-para-rh", {
    canonicalPath: "/gamificacao-para-rh/",
    languages: {
      "pt-BR": "/gamificacao-para-rh/",
      en: "/en/gamificacao-para-rh/",
    },
    openGraphPath: "/gamificacao-para-rh/",
    ogLocale: "pt_BR",
  });
}

export default async function GamificacaoParaRhPage() {
  return (
    <MarketingPageWithFaq
      locale="pt"
      slug="gamificacao-para-rh"
      pagePath="/gamificacao-para-rh/"
    />
  );
}
