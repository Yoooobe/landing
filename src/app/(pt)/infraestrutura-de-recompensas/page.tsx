import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { rewardInfrastructurePath, rewardInfrastructureSlug } from "@/lib/rewardInfrastructurePaths";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

const slug = rewardInfrastructureSlug("pt");
const pagePath = rewardInfrastructurePath("pt");

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", slug, {
    canonicalPath: pagePath,
    languages: {
      "pt-BR": rewardInfrastructurePath("pt"),
      en: rewardInfrastructurePath("en"),
    },
    openGraphPath: pagePath,
    ogLocale: "pt_BR",
  });
}

export default async function InfraestruturaDeRecompensasPage() {
  return <MarketingPageWithFaq locale="pt" slug={slug} pagePath={pagePath} />;
}
