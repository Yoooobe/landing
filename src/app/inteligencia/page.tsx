import { BrainCircuit, Cpu, Zap, Target, ArrowRight, MessageSquare, Briefcase, BarChart, Users, AlertCircle, TrendingUp } from "lucide-react";
import AiRoadmap from "@/components/AiRoadmap";
import AiFeatureMockups from "@/components/AiFeatureMockups";
import Link from "next/link";

export default function InteligenciaPage() {
  const cards = [
    {
      title: "AI Campaign Builder",
      desc: "Crie campanhas a partir de objetivos, público e budget em minutos, com regras sugeridas e copy pronto.",
      icon: <CommandIcon className="h-6 w-6 text-yoobe-purple" />
    },
    {
      title: "AI Kit Builder",
      desc: "Monte kits personalizados por contexto e faixa de valor, com orçamentos em tempo real e mockups rápidos.",
      icon: <Briefcase className="h-6 w-6 text-yoobe-purple" />
    },
    {
      title: "Smart Recommendations",
      desc: "Sugira recompensas e experiências únicas com base em perfil de consumo, campanhas ativas e saldo.",
      icon: <Target className="h-6 w-6 text-yoobe-purple" />
    },
    {
      title: "AI Insights for RH",
      desc: "Descubra onde agir, quais grupos ativar proativamente e como maximizar o ROI do seu programa.",
      icon: <BarChart className="h-6 w-6 text-yoobe-purple" />
    }
  ];

  const workvivoCases = [
    {
      title: "Reconhecimento automático",
      desc: "A inteligência identifica marcos e sugere reconhecimentos acionáveis diretamente no feed social.",
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: "Campanhas por prompt",
      desc: "RH cria campanhas segmentadas escrevendo apenas intenções, e a plataforma cuida do resto.",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      title: "Sugestão de recompensas",
      desc: "Sugestões de prêmios contextualizados que geram o triplo de conversão entre os colaboradores.",
      icon: <Target className="h-5 w-5" />
    },
    {
      title: "Detecção de desengajamento",
      desc: "Monitoramento de times em risco e sugestão de ações prioritárias antes da evasão.",
      icon: <AlertCircle className="h-5 w-5" />
    },
    {
      title: "Budget inteligente",
      desc: "Distribuição e previsão de orçamentos flexíveis aplicados a diferentes iniciativas.",
      icon: <Cpu className="h-5 w-5" />
    },
    {
      title: "ROI de Cultura",
      desc: "Acompanhe e comprove o impacto da gamificação na produtividade e redução de turnover.",
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  return (
    <div className="bg-brand-navy-dark text-white min-h-screen font-sans selection:bg-brand-orange/30">
      
      {/* Block 1: Hero Inteligência */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        {/* Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yoobe-purple/20 blur-[150px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-400/10 blur-[130px] rounded-full pointer-events-none -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl max-auto mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 mb-8 mx-auto">
              <BrainCircuit className="h-4 w-4 text-yoobe-purple" />
              <span className="text-sm font-semibold text-yoobe-purple uppercase tracking-wider">Yoobe AI Layer</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight font-heading">
              Inteligência aplicada ao <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-cyan-400">
                engajamento corporativo
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed lg:max-w-3xl mx-auto mb-10">
              Transforme campanhas, recompensas e jornadas em ações mais personalizadas, mensuráveis e escaláveis. Uma nova era de infraestrutura de reconhecimento.
            </p>
          </div>
        </div>
      </section>

      {/* Block 2: 4 Cards Features */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((card, i) => (
              <div key={i} className="glass-panel-dark p-8 group hover:-translate-y-2 transition-all duration-300 border border-white/10 hover:border-yoobe-purple/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yoobe-purple/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="bg-white/5 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-yoobe-purple/30 group-hover:bg-yoobe-purple/10 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading mb-4 text-white group-hover:text-yoobe-purple transition-colors">{card.title}</h3>
                <p className="text-lg text-white/70 leading-relaxed font-sans">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 3: Interactive Mockups */}
      <AiFeatureMockups />

      {/* Block 4: Roadmap Component embedded */}
      <AiRoadmap />

      {/* Block 5: Workvivo AI Cases */}
      <section className="py-24 relative overflow-hidden bg-black/50 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading">
              Workvivo <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-brand-orange">+ Yoobe AI Layer</span>
            </h2>
            <p className="text-xl text-white/70">
              Uma camada de inteligência para transformar eventos, comunicação e reconhecimento em campanhas e recompensas altamente acionáveis e rastreáveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workvivoCases.map((wc, index) => (
              <div key={index} className="glass-panel-dark p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-colors relative group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/10 p-2.5 rounded-lg text-white/80 group-hover:text-white transition-colors group-hover:bg-yoobe-purple/20 group-hover:scale-110">
                    {wc.icon}
                  </div>
                  <h4 className="text-lg font-bold font-heading">{wc.title}</h4>
                </div>
                <p className="text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">
                  {wc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 6: Final CTA */}
      <section className="py-24 bg-gradient-to-b from-brand-navy-dark to-black text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yoobe-purple/20 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Sua estratégia nativamente inteligente
          </h2>
          <p className="text-xl text-white/70 mb-10 font-sans">
            Prepare-se para orquestrar reconhecimento orgânico guiado por dados. A infraestrutura para RH moderno.
          </p>
          <div className="flex justify-center">
            <a
              href="https://calendly.com/yoobeco/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-white px-10 font-bold text-brand-navy-dark text-lg shadow-2xl shadow-white/10 transition-all hover:scale-105 font-sans whitespace-nowrap"
            >
              Quero conhecer a evolução AI
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

function CommandIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  )
}
