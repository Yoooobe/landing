import JsonLdScript from "@/components/seo/JsonLdScript";
import EnterpriseCases from "@/components/EnterpriseCases";
import HomeFinalCta from "@/components/HomeFinalCta";
import HomeHero from "@/components/HomeHero";
import HomeTrustStrip from "@/components/HomeTrustStrip";
import HowItWorks from "@/components/HowItWorks";
import IntegrationsApiSection from "@/components/IntegrationsApiSection";
import PlatformTabs from "@/components/PlatformTabs";
import WhySection from "@/components/WhySection";
import { buildSoftwareApplicationJsonLd } from "@/lib/jsonLd";
import type { Locale } from "@/lib/locale";
import type { HeroBlockDoc, ResolvedHomeContent } from "@/sanity/lib/types";

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
      <HomeTrustStrip />
      <PlatformTabs homeContent={homeContent} />
      <WhySection />
      <HowItWorks homeContent={homeContent} />
      <EnterpriseCases homeContent={homeContent} showTestimonials />
      <IntegrationsApiSection homeContent={homeContent} />
      <HomeFinalCta homeContent={homeContent} />
    </div>
  );
}
