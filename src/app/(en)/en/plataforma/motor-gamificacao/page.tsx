import GamificationPageSections from "@/components/GamificationPageSections";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { enPlatformFeaturePages } from "@/content/platformFeaturePages";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { getResolvedGamificacaoContent } from "@/sanity/lib/gamificacao";
import { getGamificacaoShowcaseMedia } from "@/sanity/lib/gamificacaoShowcase";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(enPlatformFeaturePages.motor.seo, {
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
  const [content, showcaseMedia] = await Promise.all([
    getResolvedGamificacaoContent("en"),
    getGamificacaoShowcaseMedia("gamificacao-default", "en"),
  ]);

  return (
    <LocaleMessagesProvider locale="en">
      <GamificationPageSections content={content} showcaseMedia={showcaseMedia} />
    </LocaleMessagesProvider>
  );
}
