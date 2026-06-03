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
  return buildMarketingPageMetadata("pt", "gamificacao", {
    canonicalPath: "/plataforma/motor-gamificacao/",
    languages: {
      "pt-BR": "/plataforma/motor-gamificacao/",
      en: "/en/plataforma/motor-gamificacao/",
    },
    openGraphPath: "/plataforma/motor-gamificacao/",
    ogLocale: "pt_BR",
  });
}

export default async function MotorGamificacaoPage() {
  const pagePath = "/plataforma/motor-gamificacao/";
  const pageUrl = pageAbsoluteUrl(pagePath);
  const [content, showcaseMedia, faqItems] = await Promise.all([
    getResolvedGamificacaoContent("pt"),
    getGamificacaoShowcaseMedia("gamificacao-default", "pt"),
    getMarketingPageFaqItems("pt", "gamificacao"),
  ]);
  const faqLd = faqItems.length > 0 ? buildFaqPageJsonLd(pageUrl, faqItems) : null;
  const breadcrumbLd = buildGamificacaoMotorBreadcrumbJsonLd("pt", pagePath);

  return (
    <>
      <JsonLdScript data={{ ...breadcrumbLd }} />
      {faqLd ? <JsonLdScript data={{ ...faqLd }} /> : null}
      <LocaleMessagesProvider locale="pt">
        <GamificationPageSections content={content} showcaseMedia={showcaseMedia} />
      </LocaleMessagesProvider>
    </>
  );
}
