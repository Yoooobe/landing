import CasosHero from "@/components/CasosHero";
import CaseStudiesGrid from "@/components/CaseStudiesGrid";

export default function CasosDeUsoPage() {
  return (
    <div className="bg-brand-navy-dark text-white min-h-screen">
      <CasosHero />
      <CaseStudiesGrid />
      
      {/* Final Short CTA */}
      <section className="py-24 text-center border-t border-white/5 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/10 to-transparent opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 font-heading">Pronto para ser o nosso próximo case?</h2>
          <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
            A infraestrutura abstrata da Yoobe resolve desde engajamento de call centers até treinamento de engenheiros de software.
          </p>
          <a
            href="https://calendly.com/yoobeco/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-brand-orange px-10 font-bold text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:bg-[#ff512f] transition-all text-lg hover:scale-105"
          >
            Discutir Meu Caso de Uso
          </a>
        </div>
      </section>
    </div>
  );
}
