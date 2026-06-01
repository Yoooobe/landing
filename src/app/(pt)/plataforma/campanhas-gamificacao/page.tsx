import GamificationPageSections from "@/components/GamificationPageSections";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { buildMarketingPageMetadata } from "@/sanity/lib/marketingPages";
import { getResolvedGamificacaoCampanhasContent } from "@/sanity/lib/gamificacaoCampanhas";
import { getGamificacaoShowcaseMedia } from "@/sanity/lib/gamificacaoShowcase";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMarketingPageMetadata("pt", "gamificacao-campanhas", {
    canonicalPath: "/plataforma/campanhas-gamificacao/",
    languages: {
      "pt-BR": "/plataforma/campanhas-gamificacao/",
      en: "/en/plataforma/campanhas-gamificacao/",
    },
    openGraphPath: "/plataforma/campanhas-gamificacao/",
    ogLocale: "pt_BR",
  });
}

export default async function CampanhasGamificacaoPage() {
  const [content, showcaseMedia] = await Promise.all([
    getResolvedGamificacaoCampanhasContent("pt"),
    getGamificacaoShowcaseMedia("gamificacao-default", "pt"),
  ]);

  return (
    <LocaleMessagesProvider locale="pt">
      <GamificationPageSections content={content} showcaseMedia={showcaseMedia} />
    </LocaleMessagesProvider>
  );
}
