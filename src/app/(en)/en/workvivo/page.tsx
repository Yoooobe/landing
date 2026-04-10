import type { Metadata } from "next";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import WorkvivoRouteRedirect from "@/components/WorkvivoRouteRedirect";
import { enRest } from "@/messages/segments/en-rest";

export const metadata: Metadata = buildRoutePageMetadata(
  {
    title: "Workvivo | 4Unik",
    description: "Legacy redirect for the Workvivo integration page in the API & integrations hub.",
  },
  {
    canonicalPath: "/en/workvivo/",
    languages: {
      "pt-BR": "/workvivo/",
      en: "/en/workvivo/",
    },
    openGraphPath: "/en/workvivo/",
    ogLocale: "en_US",
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  },
);

export default async function WorkvivoEnLegacyRedirectPage() {
  return (
    <WorkvivoRouteRedirect
      href="/en/api-integracoes/workvivo/"
      message={enRest.workvivoRedirect.message}
    />
  );
}
