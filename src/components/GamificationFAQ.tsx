"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function GamificationFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "A gamificação funciona para empresas de qualquer tamanho?",
      a: "Sim! A plataforma 4unik escala de 10 a 10.000+ colaboradores. As mecânicas são configuráveis para cada realidade — desde startups que querem engajar times enxutos até grandes corporações com múltiplas filiais.",
    },
    {
      q: "Qual o tempo de implementação?",
      a: "O setup básico leva menos de 24 horas. Integrações via API e customizações avançadas podem levar de 1 a 4 semanas, dependendo da complexidade do ecossistema.",
    },
    {
      q: "Gamificação não gera competição negativa?",
      a: "Não quando bem implementada. Nossa plataforma permite configurar leaderboards por equipe (colaboração) em vez de individual (competição), e os gestores controlam quais mecânicas ativar. O foco é em reconhecimento, não em punição.",
    },
    {
      q: "Quais integrações são suportadas?",
      a: "A 4unik integra via API RESTful com Workvivo, Beehome, Humand, Slack, Microsoft Teams, HRISs (Workday, BambooHR), ERPs e mais. Também suportamos webhooks em tempo real e autenticação via OAuth 2.0.",
    },
    {
      q: "Como calcular o ROI da gamificação?",
      a: "O ROI é calculado como: (Economia em retenção + ganho de produtividade + redução de absenteísmo) / Custo total do programa. A plataforma 4unik fornece relatórios automáticos com essas métricas. O ROI típico é de 3x a 8x.",
    },
    {
      q: "É possível usar sem engine de gamificação própria?",
      a: "Sim! A 4unik funciona de forma independente como sua engine completa de gamificação, ou pode ser a camada de execução/resgate conectada a qualquer sistema via API. Você escolhe.",
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f18] border-t border-white/5 relative z-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading">
            Dúvidas sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-fuchsia-600">gamificação</span>?
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'bg-[#121824] border-yoobe-purple/50 shadow-[0_0_20px_rgba(139,92,246,0.1)]' : 'bg-transparent border-white/10 hover:border-white/20'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold text-white pr-8">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-white/50 transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-180 text-yoobe-purple' : ''}`} />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
