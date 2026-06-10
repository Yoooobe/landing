import SegurancaLandingPage from "@/components/SegurancaLandingPage";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { growthPageRobots } from "@/lib/growthPagePublish";
import { buildFaqPageJsonLd } from "@/lib/jsonLd";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { pageAbsoluteUrl } from "@/lib/site";
import { ptSegurancaPage } from "@/messages/segments/pt-seguranca-page";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(ptSegurancaPage.seo, {
    canonicalPath: "/seguranca/",
    languages: {
      "pt-BR": "/seguranca/",
      en: "/en/seguranca/",
    },
    openGraphPath: "/seguranca/",
    ogLocale: "pt_BR",
    robots: growthPageRobots(),
  });
}

export default function SegurancaPage() {
  const pagePath = "/seguranca/";
  const faqItems = ptSegurancaPage.faq.items.map((item) => ({ q: item.q, a: item.a }));
  const faqLd = buildFaqPageJsonLd(pageAbsoluteUrl(pagePath), faqItems);

  return (
    <>
      <JsonLdScript data={{ ...faqLd }} />
      <SegurancaLandingPage />
    </>
  );
}
