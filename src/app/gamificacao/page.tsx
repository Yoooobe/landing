import GamificationProblem from "@/components/GamificationProblem";
import GamificationHero from "@/components/GamificationHero";
import MechanicsGrid from "@/components/MechanicsGrid";
import GamificationFlow from "@/components/GamificationFlow";
import GamificationCases from "@/components/GamificationCases";
import GamificationTrends from "@/components/GamificationTrends";
import GamificationStats from "@/components/GamificationStats";
import GamificationKPIs from "@/components/GamificationKPIs";
import GamificationDeepUsecases from "@/components/GamificationDeepUsecases";
import GamificationFAQ from "@/components/GamificationFAQ";
import GamificacaoPageCta from "@/components/GamificacaoPageCta";

export default function GamificacaoPage() {
  return (
    <div className="bg-brand-navy-dark text-white min-h-screen">
      <GamificationHero />
      <GamificationProblem />
      <MechanicsGrid />
      <GamificationFlow />
      <GamificationCases />
      <GamificationTrends />
      <GamificationStats />
      <GamificationKPIs />
      <GamificationDeepUsecases />
      <GamificationFAQ />

      <GamificacaoPageCta />
    </div>
  );
}
