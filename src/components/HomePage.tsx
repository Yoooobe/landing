import JsonLdScript from "@/components/seo/JsonLdScript";
import EnterpriseTrustStrip from "@/components/EnterpriseTrustStrip";
import AiRoadmap from "@/components/AiRoadmap";
import ApiSection from "@/components/ApiSection";
import BentoFeatures from "@/components/BentoFeatures";
import DedicatedIntegrations from "@/components/DedicatedIntegrations";
import EnterpriseCases from "@/components/EnterpriseCases";
import FourUnikComplementStrip from "@/components/FourUnikComplementStrip";
import GamificationDuality from "@/components/GamificationDuality";
import GamificationSummary from "@/components/GamificationSummary";
import HomeFinalCta from "@/components/HomeFinalCta";
import HomeHero from "@/components/HomeHero";
import HowItWorks from "@/components/HowItWorks";
import ManagementSection from "@/components/ManagementSection";
import PlatformTabs from "@/components/PlatformTabs";
import SectionLeadCta from "@/components/SectionLeadCta";
import StatsBar from "@/components/StatsBar";
import StoreSection from "@/components/StoreSection";
import IntegrationsTicker from "@/components/IntegrationsTicker";
import TrustBar from "@/components/TrustBar";
import WhySection from "@/components/WhySection";
import { buildSoftwareApplicationJsonLd } from "@/lib/jsonLd";
import type { Locale } from "@/lib/locale";
import type { HeroBlockDoc, ResolvedHomeContent } from "@/sanity/lib/types";
import dynamic from "next/dynamic";

const PricingSection = dynamic(() => import("@/components/PricingSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));
const ClientsSection = dynamic(() => import("@/components/ClientsSection"));

type Props = {
  homeContent: ResolvedHomeContent;
  cmsHero?: HeroBlockDoc | null;
  locale: Locale;
};

export default function HomePage({ homeContent, cmsHero = null, locale }: Props) {
  return (
    <div className="min-h-screen bg-surface-deep font-sans text-white selection:bg-brand-orange/30">
      <JsonLdScript data={{ ...buildSoftwareApplicationJsonLd(locale) }} />
      <HomeHero cmsHero={cmsHero} homeContent={homeContent} />
      <FourUnikComplementStrip homeContent={homeContent} />
      <TrustBar />
      <EnterpriseTrustStrip />
      <IntegrationsTicker />
      <BentoFeatures homeContent={homeContent} />
      <PlatformTabs homeContent={homeContent} />
      <SectionLeadCta homeContent={homeContent} zone="afterPlatform" />
      <StatsBar />
      <WhySection />
      <GamificationSummary />
      <GamificationDuality />
      <SectionLeadCta homeContent={homeContent} zone="afterCampaigns" />
      <EnterpriseCases homeContent={homeContent} />
      <DedicatedIntegrations homeContent={homeContent} />
      <StoreSection homeContent={homeContent} />
      <ApiSection />
      <SectionLeadCta homeContent={homeContent} zone="afterOperations" />
      <AiRoadmap homeContent={homeContent} />
      <ManagementSection homeContent={homeContent} />
      <HowItWorks homeContent={homeContent} />
      <PricingSection />
      <TestimonialsSection />
      <ClientsSection />
      <HomeFinalCta homeContent={homeContent} />
    </div>
  );
}
