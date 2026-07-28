import PricingLandingPage from "@/components/PricingLandingPage";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { growthPageRobots } from "@/lib/growthPagePublish";
import { buildFaqPageJsonLd } from "@/lib/jsonLd";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { pageAbsoluteUrl } from "@/lib/site";
import { enPricingPage } from "@/messages/segments/en-pricing-page";
import { getResolvedPricingPlansContent } from "@/sanity/lib/pricingPlans";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(enPricingPage.seo, {
    canonicalPath: "/en/pricing/",
    languages: {
      "pt-BR": "/pricing/",
      en: "/en/pricing/",
    },
    openGraphPath: "/en/pricing/",
    ogLocale: "en_US",
    ogRouteKey: "pricing",
    robots: growthPageRobots(),
  });
}

export default async function EnPricingPage() {
  const pagePath = "/en/pricing/";
  const faqItems = enPricingPage.faq.items.map((item) => ({ q: item.q, a: item.a }));
  const faqLd = buildFaqPageJsonLd(pageAbsoluteUrl(pagePath), faqItems);
  const content = await getResolvedPricingPlansContent("en");

  return (
    <>
      <JsonLdScript data={{ ...faqLd }} />
      <PricingLandingPage content={content} />
    </>
  );
}
