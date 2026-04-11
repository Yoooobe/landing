import PlatformFeaturePage from "@/components/PlatformFeaturePage";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { ptPlatformFeaturePages } from "@/content/platformFeaturePages";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = ptPlatformFeaturePages.loja;
  return buildRoutePageMetadata(
    { title: seo.title, description: seo.description },
    {
      canonicalPath: "/plataforma/loja-resgate/",
      languages: {
        "pt-BR": "/plataforma/loja-resgate/",
        en: "/en/plataforma/loja-resgate/",
      },
      openGraphPath: "/plataforma/loja-resgate/",
      ogLocale: "pt_BR",
    },
  );
}

export default async function LojaResgatePage() {
  return (
    <LocaleMessagesProvider locale="pt">
      <PlatformFeaturePage content={ptPlatformFeaturePages.loja} />
    </LocaleMessagesProvider>
  );
}
