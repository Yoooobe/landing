import WorkvivoRouteRedirect from "@/components/WorkvivoRouteRedirect";
import { getPlataformaStubSeo } from "@/lib/publicRouteFallbacks";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(getPlataformaStubSeo("en", "logistica"), {
    canonicalPath: "/en/plataforma/",
    languages: {
      "pt-BR": "/plataforma/",
      en: "/en/plataforma/",
    },
    openGraphPath: "/en/plataforma/",
    ogLocale: "en_US",
    robots: {
      index: false,
      follow: true,
    },
  });
}

export default function EnLogisticaIntegradaRedirectPage() {
  return (
    <WorkvivoRouteRedirect
      href="/en/plataforma/"
      message="Redirecting to the Platform overview…"
    />
  );
}
