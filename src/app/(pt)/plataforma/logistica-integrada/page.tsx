import WorkvivoRouteRedirect from "@/components/WorkvivoRouteRedirect";
import { getPlataformaStubSeo } from "@/lib/publicRouteFallbacks";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(getPlataformaStubSeo("pt", "logistica"), {
    canonicalPath: "/plataforma/",
    languages: {
      "pt-BR": "/plataforma/",
      en: "/en/plataforma/",
    },
    openGraphPath: "/plataforma/",
    ogLocale: "pt_BR",
    robots: {
      index: false,
      follow: true,
    },
  });
}

export default function LogisticaIntegradaRedirectPage() {
  return (
    <WorkvivoRouteRedirect
      href="/plataforma/"
      message="A redirecionar para a visão geral da Plataforma…"
    />
  );
}
