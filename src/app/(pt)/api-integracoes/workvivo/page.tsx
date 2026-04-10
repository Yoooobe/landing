import type { Metadata } from "next";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import WorkvivoLanding from "@/components/workvivo/WorkvivoLanding";
import { workvivoContent, workvivoMeta } from "@/content/workvivo";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(workvivoMeta.pt, {
    canonicalPath: "/api-integracoes/workvivo/",
    languages: {
      "pt-BR": "/api-integracoes/workvivo/",
      en: "/en/api-integracoes/workvivo/",
    },
    openGraphPath: "/api-integracoes/workvivo/",
    ogLocale: "pt_BR",
  });
}

export default async function WorkvivoApiPage() {
  return (
    <WorkvivoLanding
      locale="pt"
      apiHub
      content={workvivoContent.pt}
    />
  );
}
