import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { buildSoftwareApplicationJsonLd } from "@/lib/jsonLd";
import { pageAbsoluteUrl } from "@/lib/site";
import { ptPlataforma } from "@/messages/segments/pt-plataforma";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "plataforma", {
    canonicalPath: "/plataforma/",
    languages: {
      "pt-BR": "/plataforma/",
      en: "/en/plataforma/",
    },
    openGraphPath: "/plataforma/",
    ogLocale: "pt_BR",
  });
}

export default async function PlataformaPage() {
  const softwareAppLd = buildSoftwareApplicationJsonLd("pt", {
    name: "Plataforma 4Unik V3",
    description: ptPlataforma.seo.description,
    pageUrl: pageAbsoluteUrl("/plataforma/"),
  });

  return (
    <>
      <JsonLdScript data={{ ...softwareAppLd }} />
      <MarketingPageWithFaq locale="pt" slug="plataforma" pagePath="/plataforma/" />
    </>
  );
}
