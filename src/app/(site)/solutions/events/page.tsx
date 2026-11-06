import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "eventos", {
    canonicalPath: "/solutions/events/",
    languages: {
      en: "/solutions/events/",
    },
    openGraphPath: "/solutions/events/",
    ogLocale: "en_US",
  });
}

export default async function EventosPageEn() {
  return <MarketingPageWithFaq locale="en" slug="eventos" pagePath="/solutions/events/" />;
}
