import SegurancaLandingPage from "@/components/SegurancaLandingPage";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { growthPageRobots } from "@/lib/growthPagePublish";
import { buildFaqPageJsonLd } from "@/lib/jsonLd";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { pageAbsoluteUrl } from "@/lib/site";
import { enSegurancaPage } from "@/messages/segments/en-seguranca-page";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(enSegurancaPage.seo, {
    canonicalPath: "/en/seguranca/",
    languages: {
      "pt-BR": "/seguranca/",
      en: "/en/seguranca/",
    },
    openGraphPath: "/en/seguranca/",
    ogLocale: "en_US",
    robots: growthPageRobots(),
  });
}

export default function EnSegurancaPage() {
  const pagePath = "/en/seguranca/";
  const faqItems = enSegurancaPage.faq.items.map((item) => ({ q: item.q, a: item.a }));
  const faqLd = buildFaqPageJsonLd(pageAbsoluteUrl(pagePath), faqItems);

  return (
    <>
      <JsonLdScript data={{ ...faqLd }} />
      <SegurancaLandingPage />
    </>
  );
}
