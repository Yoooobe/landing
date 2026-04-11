import PlatformFeaturePage from "@/components/PlatformFeaturePage";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { enPlatformFeaturePages } from "@/content/platformFeaturePages";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = enPlatformFeaturePages.loja;
  return buildRoutePageMetadata(
    { title: seo.title, description: seo.description },
    {
      canonicalPath: "/en/plataforma/loja-resgate/",
      languages: {
        "pt-BR": "/plataforma/loja-resgate/",
        en: "/en/plataforma/loja-resgate/",
      },
      openGraphPath: "/en/plataforma/loja-resgate/",
      ogLocale: "en_US",
    },
  );
}

export default async function EnLojaResgatePage() {
  return (
    <LocaleMessagesProvider locale="en">
      <PlatformFeaturePage content={enPlatformFeaturePages.loja} />
    </LocaleMessagesProvider>
  );
}
