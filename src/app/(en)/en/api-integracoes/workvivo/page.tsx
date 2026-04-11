import type { Metadata } from "next";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import WorkvivoLanding from "@/components/workvivo/WorkvivoLanding";
import { workvivoContent, workvivoMeta } from "@/content/workvivo";
import { getWorkvivoShowcaseMedia } from "@/sanity/lib/workvivoShowcase";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(workvivoMeta.en, {
    canonicalPath: "/en/api-integracoes/workvivo/",
    languages: {
      "pt-BR": "/api-integracoes/workvivo/",
      en: "/en/api-integracoes/workvivo/",
    },
    openGraphPath: "/en/api-integracoes/workvivo/",
    ogLocale: "en_US",
  });
}

export default async function WorkvivoApiEnPage() {
  const showcaseMedia = await getWorkvivoShowcaseMedia("en");
  return (
    <WorkvivoLanding
      locale="en"
      apiHub
      content={workvivoContent.en}
      showcaseMedia={showcaseMedia}
    />
  );
}
