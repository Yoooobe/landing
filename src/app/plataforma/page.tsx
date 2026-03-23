import PlataformaHero from "@/components/PlataformaHero";
import AdminDashboardHighlight from "@/components/AdminDashboardHighlight";
import PlataformaGamificationEngine from "@/components/PlataformaGamificationEngine";
import PlataformaStore from "@/components/PlataformaStore";
import LogisticsFulfillment from "@/components/LogisticsFulfillment";
import SecurityEnterprise from "@/components/SecurityEnterprise";
import AiRoadmap from "@/components/AiRoadmap";

export default function PlataformaPage() {
  return (
    <div className="bg-brand-navy-dark text-white min-h-screen">
      <PlataformaHero />
      <AdminDashboardHighlight />
      <PlataformaGamificationEngine />
      <PlataformaStore />
      <LogisticsFulfillment />
      <AiRoadmap />
      <SecurityEnterprise />
      
      {/* Short CTA */}
      <section className="py-24 text-center border-t border-white/5">
        <h2 className="text-3xl font-bold text-white mb-6 font-heading">Pronto para ter o controle total?</h2>
        <a
          href="https://calendly.com/yoobeco/demo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-bold text-brand-navy-dark shadow-xl hover:scale-105 transition-all"
        >
          Solicitar Demonstração
        </a>
      </section>
    </div>
  );
}
