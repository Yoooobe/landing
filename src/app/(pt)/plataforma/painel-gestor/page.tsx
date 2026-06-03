import PlatformFeaturePage from "@/components/PlatformFeaturePage";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { ptPlatformFeaturePages } from "@/content/platformFeaturePages";
import { buildPlatformFeatureBreadcrumbJsonLd } from "@/lib/marketingBreadcrumbs";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

const PAGE_PATH = "/plataforma/painel-gestor/";
const content = ptPlatformFeaturePages.manager;

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(content.seo, {
    canonicalPath: PAGE_PATH,
    languages: {
      "pt-BR": PAGE_PATH,
      en: "/en/plataforma/painel-gestor/",
    },
    openGraphPath: PAGE_PATH,
    ogLocale: "pt_BR",
    ogRouteKey: "plataforma",
  });
}

export default function PainelGestorPage() {
  const breadcrumbLd = buildPlatformFeatureBreadcrumbJsonLd("pt", content.badge, PAGE_PATH);

  return (
    <>
      <JsonLdScript data={{ ...breadcrumbLd }} />
      <PlatformFeaturePage content={content} leadSource="plataforma-painel-gestor" />
    </>
  );
}
