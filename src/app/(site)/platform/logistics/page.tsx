import WorkvivoRouteRedirect from "@/components/WorkvivoRouteRedirect";
import { getPlataformaStubSeo } from "@/lib/publicRouteFallbacks";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(getPlataformaStubSeo("en", "logistica"), {
    canonicalPath: "/platform/",
    languages: {
      en: "/platform/",
    },
    openGraphPath: "/platform/",
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
      href="/platform/"
      message="Redirecting to the Platform overview…"
    />
  );
}
