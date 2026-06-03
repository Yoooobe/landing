import PlatformFeaturePage from "@/components/PlatformFeaturePage";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { ptPlatformFeaturePages } from "@/content/platformFeaturePages";
import { buildPlatformFeatureBreadcrumbJsonLd } from "@/lib/marketingBreadcrumbs";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

const PAGE_PATH = "/plataforma/loja-resgate/";
const content = ptPlatformFeaturePages.loja;

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(
    { title: content.seo.title, description: content.seo.description },
    {
      canonicalPath: PAGE_PATH,
      languages: {
        "pt-BR": PAGE_PATH,
        en: "/en/plataforma/loja-resgate/",
      },
      openGraphPath: PAGE_PATH,
      ogLocale: "pt_BR",
      ogRouteKey: "plataforma",
    },
  );
}

export default function LojaResgatePage() {
  const breadcrumbLd = buildPlatformFeatureBreadcrumbJsonLd("pt", content.badge, PAGE_PATH);

  return (
    <>
      <JsonLdScript data={{ ...breadcrumbLd }} />
      <LocaleMessagesProvider locale="pt">
        <PlatformFeaturePage content={content} leadSource="plataforma-loja-resgate" />
      </LocaleMessagesProvider>
    </>
  );
}
