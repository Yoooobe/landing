import IcpProfileHero from "@/components/icp/IcpProfileHero";
import IcpProfileProblemSection from "@/components/icp/IcpProfileProblemSection";
import IcpProfileHowSection from "@/components/icp/IcpProfileHowSection";
import IcpProfileBenefitsSection from "@/components/icp/IcpProfileBenefitsSection";
import IcpProfileCaseSection from "@/components/icp/IcpProfileCaseSection";
import MarketingFaqSection from "@/components/MarketingFaqSection";
import { getIcpProfileVisual } from "@/config/icp-profile-visuals";
import { getIcpVerticalPage } from "@/lib/icpVerticalPages";
import type { Locale } from "@/lib/locale";

type Props = {
  locale: Locale;
  slug: string;
};

/**
 * Renderer dedicado das páginas "Soluções por perfil" (ICP): hero animado,
 * secções alternando escuro/claro e showcases enquadrados. O CTA final + lead
 * form continua num `ctaBlock` separado (ver `icpVerticalBlocks`).
 */
export default function IcpProfilePage({ locale, slug }: Props) {
  const page = getIcpVerticalPage(locale, slug);
  const visual = getIcpProfileVisual(slug);

  if (!page || !visual) {
    return null;
  }

  const faqTitle = locale === "en" ? "Frequently asked questions" : "Perguntas frequentes";

  return (
    <>
      <IcpProfileHero locale={locale} hero={page.hero} visual={visual} />
      <IcpProfileProblemSection problem={page.problem} visual={visual} />
      <IcpProfileHowSection how={page.how} visual={visual} />
      <IcpProfileBenefitsSection benefits={page.benefits} visual={visual} />
      {page.caseStudy ? (
        <IcpProfileCaseSection caseStudy={page.caseStudy} visual={visual} />
      ) : null}
      <MarketingFaqSection
        tone="light"
        faq={{
          badge: "FAQ",
          titleBefore: faqTitle,
          titleGradient: "",
          titleAfter: "",
          items: page.faq.items.map((item) => ({ q: item.q, a: item.a })),
        }}
      />
    </>
  );
}
