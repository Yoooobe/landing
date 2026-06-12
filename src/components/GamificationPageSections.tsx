import CampaignBuilderShowcase from "@/components/CampaignBuilderShowcase";
import GamificationCases from "@/components/GamificationCases";
import GamificationDeepUsecases from "@/components/GamificationDeepUsecases";
import GamificationFAQ from "@/components/GamificationFAQ";
import GamificationFlow from "@/components/GamificationFlow";
import GamificationHero from "@/components/GamificationHero";
import GamificationKPIs from "@/components/GamificationKPIs";
import GamificationProblem from "@/components/GamificationProblem";
import GamificationStats from "@/components/GamificationStats";
import GamificacaoPageCta from "@/components/GamificacaoPageCta";
import MechanicsGrid from "@/components/MechanicsGrid";
import type { GamificacaoShowcaseMediaDoc, ResolvedGamificacaoContent } from "@/sanity/lib/types";

export default function GamificationPageSections({
  content,
  showcaseMedia = null,
  variant = "motor",
}: {
  content: ResolvedGamificacaoContent;
  showcaseMedia?: GamificacaoShowcaseMediaDoc | null;
  variant?: "motor" | "campanhas";
}) {
  const isMotor = variant === "motor";

  return (
    <div className="min-h-screen bg-brand-navy-dark text-white">
      <GamificationHero content={content.hero} showcaseImage={showcaseMedia?.hero?.showcaseImage} />
      <CampaignBuilderShowcase />
      <GamificationProblem content={content.problem} />
      {isMotor ? (
        <>
          <MechanicsGrid content={content.mechanics} showcaseItems={showcaseMedia?.mechanics?.items} />
          <GamificationFlow content={content.flow} />
          <GamificationKPIs content={content.kpis} showcaseItems={showcaseMedia?.kpis?.items} />
          <GamificationDeepUsecases content={content.deepUsecases} showcaseItems={showcaseMedia?.deepUsecases?.items} />
        </>
      ) : (
        <>
          <GamificationFlow content={content.flow} />
          <GamificationCases content={content.cases} showcaseCases={showcaseMedia?.cases?.items} />
          <GamificationStats content={content.stats} />
        </>
      )}
      <GamificationFAQ content={content.faq} />
      <GamificacaoPageCta content={content.finalCta} />
    </div>
  );
}
