import type { Metadata } from "next";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import WorkvivoRouteRedirect from "@/components/WorkvivoRouteRedirect";
import { ptRest } from "@/messages/segments/pt-rest";

export const metadata: Metadata = buildRoutePageMetadata(
  {
    title: "Workvivo | 4Unik",
    description: "Legacy redirect for the Workvivo integration page.",
  },
  {
    canonicalPath: "/workvivo/",
    languages: {
      "pt-BR": "/workvivo/",
      en: "/en/workvivo/",
    },
    openGraphPath: "/workvivo/",
    ogLocale: "pt_BR",
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  },
);

export default async function WorkvivoLegacyRedirectPage() {
  return (
    <WorkvivoRouteRedirect
      href="/api-integracoes/workvivo/"
      message={ptRest.workvivoRedirect.message}
    />
  );
}
