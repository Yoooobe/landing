import GamificationPageSections from "@/components/GamificationPageSections";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { ptPlatformFeaturePages } from "@/content/platformFeaturePages";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { getResolvedGamificacaoContent } from "@/sanity/lib/gamificacao";
import { getGamificacaoShowcaseMedia } from "@/sanity/lib/gamificacaoShowcase";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(ptPlatformFeaturePages.motor.seo, {
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
  const [content, showcaseMedia] = await Promise.all([
    getResolvedGamificacaoContent("pt"),
    getGamificacaoShowcaseMedia("gamificacao-default", "pt"),
  ]);

  return (
    <LocaleMessagesProvider locale="pt">
      <GamificationPageSections content={content} showcaseMedia={showcaseMedia} />
    </LocaleMessagesProvider>
  );
}
