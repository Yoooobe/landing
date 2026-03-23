"use client";
import { useState } from "react";

export default function GamificationCases() {
  const [activeTab, setActiveTab] = useState("SAP");

  const cases = [
    {
      id: "SAP",
      company: "SAP",
      industry: "Tecnologia Enterprise",
      title: "Gamificação no SAP Community Network",
      desc: "A SAP regamificou seu sistema de reputação na comunidade de desenvolvedores e implementou plataformas de aprendizado gamificadas para treinar colaboradores em habilidades técnicas.",
      challenge: "Baixa participação na comunidade e necessidade de melhorar a retenção de conhecimento em treinamentos técnicos.",
      solution: "Sistema de pontos, badges de expertise, leaderboards por área de conhecimento e trilhas de aprendizado gamificadas.",
      metrics: [
        { value: "+400%", label: "Uso da comunidade" },
        { value: "+96%", label: "Feedback da comunidade" },
        { value: "+22%", label: "Produtividade" },
        { value: "-25%", label: "Custos de treinamento" },
      ],
    },
    {
      id: "Deloitte",
      company: "Deloitte",
      industry: "Consultoria & Auditoria",
      title: "Liderança gamificada na Deloitte University",
      desc: "A Deloitte transformou seu programa de capacitação de líderes com gamificação, tornando treinamentos obrigatórios em experiências engajadoras e mensuráveis.",
      challenge: "Baixa taxa de conclusão em programas de liderança e treinamento corporativo. Líderes não completavam os cursos.",
      solution: "Missões de aprendizado, sistema de progressão por níveis, badges de competência e leaderboards de equipe.",
      metrics: [
        { value: "+50%", label: "Conclusão de cursos" },
        { value: "+47%", label: "Taxa de retorno" },
        { value: "+36%", label: "Retenção semanal" },
        { value: "3x", label: "Mais engajamento" },
      ],
    },
    {
      id: "CaLLogix",
      company: "CaLLogix",
      industry: "Contact Center",
      title: "Redução de turnover com gamificação",
      desc: "A CaLLogix enfrentava altos índices de rotatividade e absenteísmo. Implementou gamificação focada em recompensas comportamentais.",
      challenge: "Rotatividade altíssima e absenteísmo crônico no setor de contact center, gerando custos elevados de recrutamento.",
      solution: "Programa de pontos por presença, qualidade e cumprimento de metas. Resgate em prêmios reais e reconhecimento público.",
      metrics: [
        { value: "-50%", label: "Rotatividade" },
        { value: "-80%", label: "Absenteísmo" },
        { value: "US$ 380k", label: "Economia anual" },
        { value: "100%", label: "Participação" },
      ],
    },
    {
      id: "IBM",
      company: "IBM",
      industry: "Tecnologia",
      title: "Treinamento de vendedores com gamificação técnica",
      desc: "A IBM implementou programas gamificados para capacitar vendedores em habilidades técnicas, combinando simulações e desafios.",
      challenge: "Vendedores precisavam dominar habilidades técnicas complexas, mas treinamentos tradicionais tinham baixa adesão.",
      solution: "Trilhas gamificadas com simulações técnicas, badges de certificação e competições entre equipes regionais.",
      metrics: [
        { value: "+18%", label: "Aumento em vendas" },
        { value: "+70%", label: "Retenção de conhecimento" },
        { value: "2x", label: "Velocidade de onboarding" },
        { value: "95%", label: "Conclusão de trilhas" },
      ],
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f18] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            Estudos de Caso
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Resultados reais de <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-fuchsia-600">gigantes</span> do mercado
          </h2>
          <p className="text-lg text-white/60 font-sans">
            Empresas que implementaram gamificação com sucesso e os resultados mensuráveis que alcançaram.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all border ${
                activeTab === c.id
                  ? "bg-yoobe-purple/20 border-yoobe-purple text-yoobe-purple shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  : "bg-[#121824] border-white/10 text-white/60 hover:text-white hover:border-white/30"
              }`}
            >
              {c.id}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="bg-[#121824] border border-white/10 rounded-3xl p-8 lg:p-12 transition-all duration-500 relative">
          {cases.map((c) => (
            <div
              key={c.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 w-full animate-fade-in ${
                activeTab === c.id ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-white tracking-widest uppercase font-heading">{c.company}</span>
                  <span className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-md font-sans">{c.industry}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 line-clamp-2 font-heading">{c.title}</h3>
                <p className="text-white/60 mb-8 leading-relaxed font-sans">{c.desc}</p>
                
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h4 className="text-yoobe-purple font-semibold text-sm mb-2 uppercase tracking-wider">Desafio</h4>
                    <p className="text-white/80 text-sm">{c.challenge}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h4 className="text-fuchsia-500 font-semibold text-sm mb-2 uppercase tracking-wider">Solução</h4>
                    <p className="text-white/80 text-sm">{c.solution}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 w-full">
                  {c.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-[#0a0f18] border border-white/5 rounded-2xl p-6 text-center hover:border-yoobe-purple/50 transition-colors">
                      <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yoobe-purple to-fuchsia-600 mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm font-medium text-white/50">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
