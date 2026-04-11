import ApiIntegracoesPageSections from "@/components/ApiIntegracoesPageSections";
import GamificationPageSections from "@/components/GamificationPageSections";
import HomePage from "@/components/HomePage";
import MarketingPageRenderer from "@/components/MarketingPageRenderer";
import PlataformaOverviewPage from "@/components/PlataformaOverviewPage";
import type { Locale } from "@/lib/locale";
import { getResolvedApiIntegracoesContent } from "@/sanity/lib/apiIntegracoes";
import { getResolvedGamificacaoContent } from "@/sanity/lib/gamificacao";
import { getResolvedHomeContent } from "@/sanity/lib/home";
import { getHomeHeroFromCms } from "@/sanity/lib/getHomeHeroFromCms";
import { getGamificacaoShowcaseMedia } from "@/sanity/lib/gamificacaoShowcase";
import { getApiIntegracoesShowcaseMedia } from "@/sanity/lib/apiIntegracoesShowcase";
import {
  getMarketingPageBySlug,
  getMarketingPageSupportData,
} from "@/sanity/lib/marketingPages";

type Props = {
  locale: Locale;
  slug: string;
};

export default async function MarketingPageScreen({ locale, slug }: Props) {
  if (slug === "home") {
    const [homeContent, cmsHero] = await Promise.all([
      getResolvedHomeContent(locale),
      getHomeHeroFromCms(),
    ]);

    return <HomePage homeContent={homeContent} cmsHero={cmsHero} locale={locale} />;
  }

  if (slug === "plataforma") {
    const supportData = await getMarketingPageSupportData(locale, slug);

    return (
      <PlataformaOverviewPage
        showcaseMedia={supportData.platformShowcaseMedia}
        homeContent={supportData.homeContent}
      />
    );
  }

  if (slug === "api-integracoes") {
    const [content, showcaseMedia] = await Promise.all([
      getResolvedApiIntegracoesContent(locale),
      getApiIntegracoesShowcaseMedia("api-integracoes-default", locale),
    ]);

    return (
      <ApiIntegracoesPageSections content={content} showcaseMedia={showcaseMedia} locale={locale} />
    );
  }

  if (slug === "gamificacao") {
    const [content, showcaseMedia] = await Promise.all([
      getResolvedGamificacaoContent(locale),
      getGamificacaoShowcaseMedia("gamificacao-default", locale),
    ]);

    return <GamificationPageSections content={content} showcaseMedia={showcaseMedia} />;
  }

  const [page, supportData] = await Promise.all([
    getMarketingPageBySlug(locale, slug),
    getMarketingPageSupportData(locale, slug),
  ]);

  return <MarketingPageRenderer locale={locale} page={page} supportData={supportData} />;
}
