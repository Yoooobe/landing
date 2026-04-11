import PlatformFeaturePage from "@/components/PlatformFeaturePage";
import { ptPlatformFeaturePages } from "@/content/platformFeaturePages";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(ptPlatformFeaturePages.manager.seo, {
    canonicalPath: "/plataforma/painel-gestor/",
    languages: {
      "pt-BR": "/plataforma/painel-gestor/",
      en: "/en/plataforma/painel-gestor/",
    },
    openGraphPath: "/plataforma/painel-gestor/",
    ogLocale: "pt_BR",
  });
}

export default function PainelGestorPage() {
  return <PlatformFeaturePage content={ptPlatformFeaturePages.manager} />;
}
