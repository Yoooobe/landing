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
      
      {/* Final CTA Dedicated to HR */}
      <section className="py-32 relative text-center overflow-hidden border-t border-white/5 bg-[#0f172a]">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-yoobe-purple/20 rounded-[100%] blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading">Pronto para transformar a cultura?</h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Automatize programas de reconhecimento que antes levavam semanas de overhead administrativo.
          </p>
          <a
            href="https://calendly.com/yoobeco/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-yoobe-purple to-fuchsia-600 px-10 font-bold text-white shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-105 transition-transform text-lg"
          >
            Falar com Especialistas
          </a>
        </div>
      </section>
    </div>
  );
}
