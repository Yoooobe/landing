import GamificationPageSections from "@/components/GamificationPageSections";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import { getResolvedGamificacaoCampanhasContent } from "@/sanity/lib/gamificacaoCampanhas";
import { getGamificacaoShowcaseMedia } from "@/sanity/lib/gamificacaoShowcase";
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
  const [content, showcaseMedia] = await Promise.all([
    getResolvedGamificacaoCampanhasContent("en"),
    getGamificacaoShowcaseMedia("gamificacao-default", "en"),
  ]);

  return (
    <LocaleMessagesProvider locale="en">
      <GamificationPageSections content={content} showcaseMedia={showcaseMedia} />
    </LocaleMessagesProvider>
  );
}
