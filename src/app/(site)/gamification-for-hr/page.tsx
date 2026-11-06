import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "gamificacao-para-rh", {
    canonicalPath: "/gamification-for-hr/",
    languages: {
      en: "/gamification-for-hr/",
    },
    openGraphPath: "/gamification-for-hr/",
    ogLocale: "en_US",
  });
}

export default async function GamificacaoParaRhEnPage() {
  return (
    <MarketingPageWithFaq
      locale="en"
      slug="gamificacao-para-rh"
      pagePath="/gamification-for-hr/"
    />
  );
}
