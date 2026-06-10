import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { rewardInfrastructurePath, rewardInfrastructureSlug } from "@/lib/rewardInfrastructurePaths";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

const slug = rewardInfrastructureSlug("en");
const pagePath = rewardInfrastructurePath("en");

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", slug, {
    canonicalPath: pagePath,
    languages: {
      "pt-BR": rewardInfrastructurePath("pt"),
      en: rewardInfrastructurePath("en"),
    },
    openGraphPath: pagePath,
    ogLocale: "en_US",
  });
}

export default async function EnRewardInfrastructurePage() {
  return <MarketingPageWithFaq locale="en" slug={slug} pagePath={pagePath} />;
}
