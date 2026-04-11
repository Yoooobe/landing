"use client";

import CasosHero from "@/components/CasosHero";
import CaseStudiesGrid from "@/components/CaseStudiesGrid";
import CasosPageCta from "@/components/CasosPageCta";
import MarketingFaqSection from "@/components/MarketingFaqSection";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

export default function CasosDeUsoPageContent() {
  const { m } = useLocaleMessages();

  return (
    <div className="bg-brand-navy-dark text-white min-h-screen">
      <CasosHero />
      <CaseStudiesGrid />
      <MarketingFaqSection faq={m.casosPage.faq} />
      <CasosPageCta />
    </div>
  );
}
