import PlatformFeaturePage from "@/components/PlatformFeaturePage";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { ptPlatformFeaturePages } from "@/content/platformFeaturePages";
import { buildPlatformFeatureBreadcrumbJsonLd } from "@/lib/marketingBreadcrumbs";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

const PAGE_PATH = "/plataforma/controle-carteiras/";
const content = ptPlatformFeaturePages.wallets;

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(content.seo, {
    canonicalPath: PAGE_PATH,
    languages: {
      "pt-BR": PAGE_PATH,
      en: "/en/plataforma/controle-carteiras/",
    },
    openGraphPath: PAGE_PATH,
    ogLocale: "pt_BR",
    ogRouteKey: "plataforma",
  });
}

export default function ControleCarteirasPage() {
  const breadcrumbLd = buildPlatformFeatureBreadcrumbJsonLd("pt", content.badge, PAGE_PATH);

  return (
    <>
      <JsonLdScript data={{ ...breadcrumbLd }} />
      <PlatformFeaturePage content={content} leadSource="plataforma-controle-carteiras" />
    </>
  );
}
