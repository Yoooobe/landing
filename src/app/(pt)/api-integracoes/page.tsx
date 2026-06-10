import JsonLdScript from "@/components/seo/JsonLdScript";
import MarketingPageScreen from "@/components/MarketingPageScreen";
import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
  buildSoftwareApplicationJsonLd,
} from "@/lib/jsonLd";
import { pageAbsoluteUrl } from "@/lib/site";
import { getResolvedApiIntegracoesContent } from "@/sanity/lib/apiIntegracoes";
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
  const [faqItems, apiContent] = await Promise.all([
    getMarketingPageFaqItems("pt", "api-integracoes"),
    getResolvedApiIntegracoesContent("pt"),
  ]);
  const pageUrl = pageAbsoluteUrl("/api-integracoes/");
  const faqLd = faqItems.length > 0 ? buildFaqPageJsonLd(pageUrl, faqItems) : null;
  const breadcrumbLd = buildBreadcrumbListJsonLd([
    { name: "Início", path: "/" },
    { name: "API e Integrações", path: "/api-integracoes/" },
  ]);
  const softwareAppLd = buildSoftwareApplicationJsonLd("pt", {
    name: "API e integrações 4Unik",
    description: apiContent.seo.description,
    pageUrl,
  });

  return (
    <>
      <JsonLdScript data={{ ...breadcrumbLd }} />
      <JsonLdScript data={{ ...softwareAppLd }} />
      {faqLd ? <JsonLdScript data={{ ...faqLd }} /> : null}
      <MarketingPageScreen locale="pt" slug="api-integracoes" />
    </>
  );
}
