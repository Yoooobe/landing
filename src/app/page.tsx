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

export default function Home() {
  return (
    <div className="bg-brand-navy-dark text-white min-h-screen font-sans selection:bg-brand-orange/30">
      <HomeHero />
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
      
      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-b from-brand-navy-dark to-black border-t border-white/5 text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Pronto para transformar o reconhecimento na sua empresa?
          </h2>
          <p className="text-xl text-white/70 mb-10 font-sans">
            Solicite uma demonstração e veja como a Yoobe eleva o engajamento e a retenção do seu time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/yoobeco/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-yoobe-purple px-10 font-bold text-white text-lg shadow-2xl shadow-yoobe-purple/20 transition-all hover:bg-yoobe-purple/90 hover:scale-105 font-sans whitespace-nowrap"
            >
              Solicitar Demonstração
            </a>
            <a
              href="https://wa.me/554187582060"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-[#25D366] px-10 font-bold text-white text-lg shadow-2xl shadow-[#25D366]/20 transition-all hover:bg-[#128C7E] hover:scale-105 font-sans whitespace-nowrap"
            >
              Falar com Especialista
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
