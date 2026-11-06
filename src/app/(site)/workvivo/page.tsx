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
    canonicalPath: "/workvivo/",
    languages: {
      en: "/workvivo/",
    },
    openGraphPath: "/workvivo/",
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
      href="/integrations/workvivo/"
      message={enRest.workvivoRedirect.message}
    />
  );
}
