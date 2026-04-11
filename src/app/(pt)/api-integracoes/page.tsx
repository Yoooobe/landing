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
  return buildMarketingPageMetadata("pt", "api-integracoes", {
    canonicalPath: "/api-integracoes/",
    languages: {
      "pt-BR": "/api-integracoes/",
      en: "/en/api-integracoes/",
    },
    openGraphPath: "/api-integracoes/",
    ogLocale: "pt_BR",
  });
}

export default async function ApiIntegracoesPage() {
  const faqItems = await getMarketingPageFaqItems("pt", "api-integracoes");
  const pageUrl = pageAbsoluteUrl("/api-integracoes/");
  const faqLd = faqItems.length > 0 ? buildFaqPageJsonLd(pageUrl, faqItems) : null;
  const breadcrumbLd = buildBreadcrumbListJsonLd([
    { name: "Início", path: "/" },
    { name: "API e Integrações", path: "/api-integracoes/" },
  ]);

  return (
    <>
      <JsonLdScript data={{ ...breadcrumbLd }} />
      {faqLd ? <JsonLdScript data={{ ...faqLd }} /> : null}
      <MarketingPageScreen locale="pt" slug="api-integracoes" />
    </>
  );
}
