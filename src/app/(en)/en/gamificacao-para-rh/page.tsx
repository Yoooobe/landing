import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "gamificacao-para-rh", {
    canonicalPath: "/en/gamificacao-para-rh/",
    languages: {
      "pt-BR": "/gamificacao-para-rh/",
      en: "/en/gamificacao-para-rh/",
    },
    openGraphPath: "/en/gamificacao-para-rh/",
    ogLocale: "en_US",
  });
}

export default async function GamificacaoParaRhEnPage() {
  return (
    <MarketingPageWithFaq
      locale="en"
      slug="gamificacao-para-rh"
      pagePath="/en/gamificacao-para-rh/"
    />
  );
}
