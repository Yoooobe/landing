import FourUnikComplementStrip from "@/components/FourUnikComplementStrip";
import HomeHero from "@/components/HomeHero";
import TrustBar from "@/components/TrustBar";
import BentoFeatures from "@/components/BentoFeatures";
import PlatformTabs from "@/components/PlatformTabs";
import StatsBar from "@/components/StatsBar";
import WhySection from "@/components/WhySection";
import GamificationSummary from "@/components/GamificationSummary";
import GamificationDuality from "@/components/GamificationDuality";
import EnterpriseCases from "@/components/EnterpriseCases";
import DedicatedIntegrations from "@/components/DedicatedIntegrations";
import StoreSection from "@/components/StoreSection";
import ApiSection from "@/components/ApiSection";
import ManagementSection from "@/components/ManagementSection";
import AiRoadmap from "@/components/AiRoadmap";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ClientsSection from "@/components/ClientsSection";
import HomeFinalCta from "@/components/HomeFinalCta";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-deep font-sans text-white selection:bg-brand-orange/30">
      <HomeHero />
      <FourUnikComplementStrip />
      <TrustBar />
      <BentoFeatures />
      <PlatformTabs />
      <StatsBar />
      <WhySection />
      <GamificationSummary />
      <GamificationDuality />
      <EnterpriseCases />
      <DedicatedIntegrations />
      <StoreSection />
      <ApiSection />
      <AiRoadmap />
      <ManagementSection />
      <HowItWorks />
      <PricingSection />
      <TestimonialsSection />
      <ClientsSection />

      <HomeFinalCta />
    </div>
  );
}
