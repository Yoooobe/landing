import MarketingPageWithFaq from "@/components/MarketingPageWithFaq";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { buildSoftwareApplicationJsonLd } from "@/lib/jsonLd";
import { pageAbsoluteUrl } from "@/lib/site";
import { enPlataforma } from "@/messages/segments/en-plataforma";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "plataforma", {
    canonicalPath: "/en/plataforma/",
    languages: {
      "pt-BR": "/plataforma/",
      en: "/en/plataforma/",
    },
    openGraphPath: "/en/plataforma/",
    ogLocale: "en_US",
  });
}

export default async function EnPlataformaPage() {
  const softwareAppLd = buildSoftwareApplicationJsonLd("en", {
    name: "4Unik V3 platform",
    description: enPlataforma.seo.description,
    pageUrl: pageAbsoluteUrl("/en/plataforma/"),
  });

  return (
    <>
      <JsonLdScript data={{ ...softwareAppLd }} />
      <MarketingPageWithFaq locale="en" slug="plataforma" pagePath="/en/plataforma/" />
    </>
  );
}
