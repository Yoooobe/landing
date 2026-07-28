import PricingLandingPage from "@/components/PricingLandingPage";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { growthPageRobots } from "@/lib/growthPagePublish";
import { buildFaqPageJsonLd } from "@/lib/jsonLd";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { pageAbsoluteUrl } from "@/lib/site";
import { ptPricingPage } from "@/messages/segments/pt-pricing-page";
import { getResolvedPricingPlansContent } from "@/sanity/lib/pricingPlans";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(ptPricingPage.seo, {
    canonicalPath: "/pricing/",
    languages: {
      "pt-BR": "/pricing/",
      en: "/en/pricing/",
    },
    openGraphPath: "/pricing/",
    ogLocale: "pt_BR",
    ogRouteKey: "pricing",
    robots: growthPageRobots(),
  });
}

export default async function PricingPage() {
  const pagePath = "/pricing/";
  const faqItems = ptPricingPage.faq.items.map((item) => ({ q: item.q, a: item.a }));
  const faqLd = buildFaqPageJsonLd(pageAbsoluteUrl(pagePath), faqItems);
  const content = await getResolvedPricingPlansContent("pt");

  return (
    <>
      <JsonLdScript data={{ ...faqLd }} />
      <PricingLandingPage content={content} />
    </>
  );
}
