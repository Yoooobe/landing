import PlatformFeaturePage from "@/components/PlatformFeaturePage";
import { ptPlatformFeaturePages } from "@/content/platformFeaturePages";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(ptPlatformFeaturePages.wallets.seo, {
    canonicalPath: "/plataforma/controle-carteiras/",
    languages: {
      "pt-BR": "/plataforma/controle-carteiras/",
      en: "/en/plataforma/controle-carteiras/",
    },
    openGraphPath: "/plataforma/controle-carteiras/",
    ogLocale: "pt_BR",
  });
}

export default function ControleCarteirasPage() {
  return <PlatformFeaturePage content={ptPlatformFeaturePages.wallets} />;
}
