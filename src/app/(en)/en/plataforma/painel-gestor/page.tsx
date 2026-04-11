import PlatformFeaturePage from "@/components/PlatformFeaturePage";
import { enPlatformFeaturePages } from "@/content/platformFeaturePages";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(enPlatformFeaturePages.manager.seo, {
    canonicalPath: "/en/plataforma/painel-gestor/",
    languages: {
      "pt-BR": "/plataforma/painel-gestor/",
      en: "/en/plataforma/painel-gestor/",
    },
    openGraphPath: "/en/plataforma/painel-gestor/",
    ogLocale: "en_US",
  });
}

export default function EnPainelGestorPage() {
  return <PlatformFeaturePage content={enPlatformFeaturePages.manager} />;
}
