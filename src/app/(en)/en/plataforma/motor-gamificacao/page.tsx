import GamificationPageSections from "@/components/GamificationPageSections";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { buildGamificacaoMotorBreadcrumbJsonLd } from "@/lib/marketingBreadcrumbs";
import { buildFaqPageJsonLd } from "@/lib/jsonLd";
import { pageAbsoluteUrl } from "@/lib/site";
import {
  buildMarketingPageMetadata,
  getMarketingPageFaqItems,
} from "@/sanity/lib/marketingPages";
import { getResolvedGamificacaoContent } from "@/sanity/lib/gamificacao";
import { getGamificacaoShowcaseMedia } from "@/sanity/lib/gamificacaoShowcase";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("en", "gamificacao", {
    canonicalPath: "/en/plataforma/motor-gamificacao/",
    languages: {
      "pt-BR": "/plataforma/motor-gamificacao/",
      en: "/en/plataforma/motor-gamificacao/",
    },
    openGraphPath: "/en/plataforma/motor-gamificacao/",
    ogLocale: "en_US",
  });
}

export default async function EnMotorGamificacaoPage() {
  const pagePath = "/en/plataforma/motor-gamificacao/";
  const pageUrl = pageAbsoluteUrl(pagePath);
  const [content, showcaseMedia, faqItems] = await Promise.all([
    getResolvedGamificacaoContent("en"),
    getGamificacaoShowcaseMedia("gamificacao-default", "en"),
    getMarketingPageFaqItems("en", "gamificacao"),
  ]);
  const faqLd = faqItems.length > 0 ? buildFaqPageJsonLd(pageUrl, faqItems) : null;
  const breadcrumbLd = buildGamificacaoMotorBreadcrumbJsonLd("en", pagePath);

  return (
    <>
      <JsonLdScript data={{ ...breadcrumbLd }} />
      {faqLd ? <JsonLdScript data={{ ...faqLd }} /> : null}
      <LocaleMessagesProvider locale="en">
        <GamificationPageSections content={content} showcaseMedia={showcaseMedia} />
      </LocaleMessagesProvider>
    </>
  );
}
