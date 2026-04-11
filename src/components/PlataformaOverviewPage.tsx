"use client";

import AdminDashboardHighlight from "@/components/AdminDashboardHighlight";
import DashboardPreviewSection from "@/components/DashboardPreviewSection";
import PlataformaHero from "@/components/PlataformaHero";
import PlataformaGamificationEngine from "@/components/PlataformaGamificationEngine";
import PlataformaStore from "@/components/PlataformaStore";
import PlatformSubFeatureCards from "@/components/PlatformSubFeatureCards";
import LogisticsFulfillment from "@/components/LogisticsFulfillment";
import SecurityEnterprise from "@/components/SecurityEnterprise";
import AiRoadmap from "@/components/AiRoadmap";
import PlataformaPageCta from "@/components/PlataformaPageCta";
import MarketingFaqSection from "@/components/MarketingFaqSection";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import type { PlatformShowcaseMediaDoc, ResolvedHomeContent } from "@/sanity/lib/types";

type Props = {
  showcaseMedia?: PlatformShowcaseMediaDoc | null;
  homeContent?: ResolvedHomeContent | null;
};

export default function PlataformaOverviewPage({ showcaseMedia = null, homeContent = null }: Props) {
  const { m } = useLocaleMessages();

  return (
    <div className="bg-brand-navy-dark text-white min-h-screen">
      <PlataformaHero />
      <DashboardPreviewSection />
      <PlatformSubFeatureCards />
      <AdminDashboardHighlight showcaseMedia={showcaseMedia} />
      <PlataformaGamificationEngine gamificacaoFeatureCards={showcaseMedia?.gamificacaoFeatureCards} />
      <PlataformaStore showcaseMedia={showcaseMedia} />
      <LogisticsFulfillment showcaseMedia={showcaseMedia} />
      <AiRoadmap homeContent={homeContent} />
      <SecurityEnterprise showcaseMedia={showcaseMedia} />
      <MarketingFaqSection faq={m.plataforma.faq} />
      <PlataformaPageCta />
    </div>
  );
}
