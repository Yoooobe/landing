import GamificationPageSections from "@/components/GamificationPageSections";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { buildGamificacaoCampanhasBreadcrumbJsonLd } from "@/lib/marketingBreadcrumbs";
import { buildFaqPageJsonLd } from "@/lib/jsonLd";
import { pageAbsoluteUrl } from "@/lib/site";
import { getResolvedGamificacaoCampanhasContent } from "@/sanity/lib/gamificacaoCampanhas";
import { getGamificacaoShowcaseMedia } from "@/sanity/lib/gamificacaoShowcase";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "gamificacao-campanhas", {
    canonicalPath: "/en/plataforma/campanhas-gamificacao/",
    languages: {
      "pt-BR": "/plataforma/campanhas-gamificacao/",
      en: "/en/plataforma/campanhas-gamificacao/",
    },
    openGraphPath: "/en/plataforma/campanhas-gamificacao/",
    ogLocale: "en_US",
  });
}

export default async function CampanhasGamificacaoPageEn() {
  const pagePath = "/en/plataforma/campanhas-gamificacao/";
  const pageUrl = pageAbsoluteUrl(pagePath);
  const [content, showcaseMedia] = await Promise.all([
    getResolvedGamificacaoCampanhasContent("en"),
    getGamificacaoShowcaseMedia("gamificacao-default", "en"),
  ]);
  const faqItems = content.faq.items.map((item) => ({ q: item.q, a: item.a }));
  const faqLd = faqItems.length > 0 ? buildFaqPageJsonLd(pageUrl, faqItems) : null;
  const breadcrumbLd = buildGamificacaoCampanhasBreadcrumbJsonLd("en", pagePath);

  return (
    <>
      <JsonLdScript data={{ ...breadcrumbLd }} />
      {faqLd ? <JsonLdScript data={{ ...faqLd }} /> : null}
      <LocaleMessagesProvider locale="en">
        <GamificationPageSections content={content} showcaseMedia={showcaseMedia} variant="campanhas" />
      </LocaleMessagesProvider>
    </>
  );
}
