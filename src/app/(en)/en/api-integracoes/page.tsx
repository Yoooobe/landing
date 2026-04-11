import JsonLdScript from "@/components/seo/JsonLdScript";
import MarketingPageScreen from "@/components/MarketingPageScreen";
import { buildBreadcrumbListJsonLd, buildFaqPageJsonLd } from "@/lib/jsonLd";
import { pageAbsoluteUrl } from "@/lib/site";
import {
  buildMarketingPageMetadata,
  getMarketingPageFaqItems,
} from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "api-integracoes", {
    canonicalPath: "/en/api-integracoes/",
    languages: {
      "pt-BR": "/api-integracoes/",
      en: "/en/api-integracoes/",
    },
    openGraphPath: "/en/api-integracoes/",
    ogLocale: "en_US",
  });
}

export default async function EnApiIntegracoesOverviewPage() {
  const faqItems = await getMarketingPageFaqItems("en", "api-integracoes");
  const pageUrl = pageAbsoluteUrl("/en/api-integracoes/");
  const faqLd = faqItems.length > 0 ? buildFaqPageJsonLd(pageUrl, faqItems) : null;
  const breadcrumbLd = buildBreadcrumbListJsonLd([
    { name: "Home", path: "/en/" },
    { name: "API & Integrations", path: "/en/api-integracoes/" },
  ]);

  return (
    <>
      <JsonLdScript data={{ ...breadcrumbLd }} />
      {faqLd ? <JsonLdScript data={{ ...faqLd }} /> : null}
      <MarketingPageScreen locale="en" slug="api-integracoes" />
    </>
  );
}
