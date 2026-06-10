import type { Metadata } from "next";
import JsonLdScript from "@/components/seo/JsonLdScript";
import WorkvivoLanding from "@/components/workvivo/WorkvivoLanding";
import { workvivoContent, workvivoFaqItems, workvivoMeta } from "@/content/workvivo";
import { buildWorkvivoHubBreadcrumbJsonLd } from "@/lib/marketingBreadcrumbs";
import { buildFaqPageJsonLd } from "@/lib/jsonLd";
import { pageAbsoluteUrl } from "@/lib/site";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { getWorkvivoShowcaseMedia } from "@/sanity/lib/workvivoShowcase";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(workvivoMeta.pt, {
    canonicalPath: "/api-integracoes/workvivo/",
    languages: {
      "pt-BR": "/api-integracoes/workvivo/",
      en: "/en/api-integracoes/workvivo/",
    },
    openGraphPath: "/api-integracoes/workvivo/",
    ogLocale: "pt_BR",
    ogRouteKey: "api-integracoes",
  });
}

export default async function WorkvivoApiPage() {
  const pagePath = "/api-integracoes/workvivo/";
  const pageUrl = pageAbsoluteUrl(pagePath);
  const showcaseMedia = await getWorkvivoShowcaseMedia("pt");
  const faqItems = workvivoFaqItems.pt;
  const faqLd = buildFaqPageJsonLd(pageUrl, faqItems);
  const breadcrumbLd = buildWorkvivoHubBreadcrumbJsonLd("pt", pagePath);

  return (
    <>
      <JsonLdScript data={{ ...breadcrumbLd }} />
      <JsonLdScript data={{ ...faqLd }} />
      <WorkvivoLanding
        locale="pt"
        apiHub
        content={workvivoContent.pt}
        showcaseMedia={showcaseMedia}
      />
    </>
  );
}
