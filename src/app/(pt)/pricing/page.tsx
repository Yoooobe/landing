import PricingLandingPage from "@/components/PricingLandingPage";
import { growthPageRobots } from "@/lib/growthPagePublish";
import { pageAbsoluteUrl } from "@/lib/site";
import { ptPricingPage } from "@/messages/segments/pt-pricing-page";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonical = pageAbsoluteUrl("/pricing/");
  return {
    title: ptPricingPage.seo.title,
    description: ptPricingPage.seo.description,
    robots: growthPageRobots(),
    alternates: {
      canonical,
      languages: {
        "pt-BR": canonical,
        en: pageAbsoluteUrl("/en/pricing/"),
      },
    },
  };
}

export default function PricingPage() {
  return <PricingLandingPage />;
}
