import PlatformFeaturePage from "@/components/PlatformFeaturePage";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { enPlatformFeaturePages } from "@/content/platformFeaturePages";
import { buildPlatformFeatureBreadcrumbJsonLd } from "@/lib/marketingBreadcrumbs";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { getPlatformFeaturePageOverrides } from "@/sanity/lib/platformShowcase";
import type { Metadata } from "next";

const PAGE_PATH = "/en/plataforma/painel-gestor/";
const content = enPlatformFeaturePages.manager;

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(content.seo, {
    canonicalPath: PAGE_PATH,
    languages: {
      "pt-BR": "/plataforma/painel-gestor/",
      en: PAGE_PATH,
    },
    openGraphPath: PAGE_PATH,
    ogLocale: "en_US",
    ogRouteKey: "plataforma",
  });
}

export default async function EnPainelGestorPage() {
  const breadcrumbLd = buildPlatformFeatureBreadcrumbJsonLd("en", content.badge, PAGE_PATH);
  const { heroImageOverride, galleryOverrides } = await getPlatformFeaturePageOverrides(
    "en",
    "manager",
  );

  return (
    <>
      <JsonLdScript data={{ ...breadcrumbLd }} />
      <LocaleMessagesProvider locale="en">
        <PlatformFeaturePage
          content={content}
          leadSource="plataforma-painel-gestor"
          heroImageOverride={heroImageOverride}
          galleryOverrides={galleryOverrides}
        />
      </LocaleMessagesProvider>
    </>
  );
}
