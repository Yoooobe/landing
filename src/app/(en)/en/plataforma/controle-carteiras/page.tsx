import PlatformFeaturePage from "@/components/PlatformFeaturePage";
import { enPlatformFeaturePages } from "@/content/platformFeaturePages";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(enPlatformFeaturePages.wallets.seo, {
    canonicalPath: "/en/plataforma/controle-carteiras/",
    languages: {
      "pt-BR": "/plataforma/controle-carteiras/",
      en: "/en/plataforma/controle-carteiras/",
    },
    openGraphPath: "/en/plataforma/controle-carteiras/",
    ogLocale: "en_US",
  });
}

export default function EnControleCarteirasPage() {
  return <PlatformFeaturePage content={enPlatformFeaturePages.wallets} />;
}
