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
  return buildRoutePageMetadata(workvivoMeta.en, {
    canonicalPath: "/en/api-integracoes/workvivo/",
    languages: {
      "pt-BR": "/api-integracoes/workvivo/",
      en: "/en/api-integracoes/workvivo/",
    },
    openGraphPath: "/en/api-integracoes/workvivo/",
    ogLocale: "en_US",
    ogRouteKey: "api-integracoes",
  });
}

export default async function WorkvivoApiEnPage() {
  const pagePath = "/en/api-integracoes/workvivo/";
  const pageUrl = pageAbsoluteUrl(pagePath);
  const showcaseMedia = await getWorkvivoShowcaseMedia("en");
  const faqItems = workvivoFaqItems.en;
  const faqLd = buildFaqPageJsonLd(pageUrl, faqItems);
  const breadcrumbLd = buildWorkvivoHubBreadcrumbJsonLd("en", pagePath);

  return (
    <>
      <JsonLdScript data={{ ...breadcrumbLd }} />
      <JsonLdScript data={{ ...faqLd }} />
      <WorkvivoLanding
        locale="en"
        apiHub
        content={workvivoContent.en}
        showcaseMedia={showcaseMedia}
      />
    </>
  );
}
