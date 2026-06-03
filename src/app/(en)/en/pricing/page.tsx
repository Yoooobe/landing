import PricingLandingPage from "@/components/PricingLandingPage";
import { growthPageRobots } from "@/lib/growthPagePublish";
import { pageAbsoluteUrl } from "@/lib/site";
import { enPricingPage } from "@/messages/segments/en-pricing-page";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonical = pageAbsoluteUrl("/en/pricing/");
  return {
    title: enPricingPage.seo.title,
    description: enPricingPage.seo.description,
    robots: growthPageRobots(),
    alternates: {
      canonical,
      languages: {
        "pt-BR": pageAbsoluteUrl("/pricing/"),
        en: canonical,
      },
    },
  };
}

export default function EnPricingPage() {
  return <PricingLandingPage />;
}
