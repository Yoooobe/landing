import { Activity, ArrowRight, BrainCircuit, Command, Cpu, Sparkles, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function AiRoadmap() {
  const roadmapStatus = [
    {
      title: "Criação de Campanhas",
      status: "Proatividade",
      color: "border-brand-orange text-brand-orange",
      bg: "bg-brand-orange/10",
      items: [
        { name: "AI Campaign Builder", icon: <Sparkles className="h-4 w-4" /> },
        { name: "Segmentação automática", icon: <Target className="h-4 w-4" /> },
        { name: "Contexto base em dados", icon: <Cpu className="h-4 w-4" /> },
        { name: "Engajamento preditivo", icon: <Zap className="h-4 w-4" /> },
      ],
    },
    {
      title: "Gestão de Recompensas",
      status: "Personalização",
      color: "border-yoobe-purple text-yoobe-purple",
      bg: "bg-yoobe-purple/10",
      items: [
        { name: "AI Kit Builder", icon: <Sparkles className="h-4 w-4" /> },
        { name: "Smart Recommendations", icon: <Command className="h-4 w-4" /> },
        { name: "Catálogo dinâmico", icon: <Activity className="h-4 w-4" /> },
        { name: "Reward intelligence", icon: <Target className="h-4 w-4" /> },
      ],
    },
    {
      title: "Orquestração Contínua",
      status: "Automação",
      color: "border-cyan-400 text-cyan-400",
      bg: "bg-cyan-400/10",
      items: [
        { name: "Missões adaptativas", icon: <BrainCircuit className="h-4 w-4" /> },
        { name: "Ações por evento", icon: <Zap className="h-4 w-4" /> },
        { name: "Feed integrations", icon: <Cpu className="h-4 w-4" /> },
        { name: "Agentic engagement", icon: <Activity className="h-4 w-4" /> },
      ],
    },
    {
      title: "Estratégia e ROI",
      status: "Decisão",
      color: "border-emerald-400 text-emerald-400",
      bg: "bg-emerald-400/10",
      items: [
        { name: "AI Insights for RH", icon: <Sparkles className="h-4 w-4" /> },
        { name: "Budget copilot", icon: <BrainCircuit className="h-4 w-4" /> },
        { name: "Análise de retenção", icon: <Target className="h-4 w-4" /> },
        { name: "Previsão de evasão", icon: <Command className="h-4 w-4" /> },
      ],
    },
  ];

  return (
    <section className="py-24 bg-[#050B14] relative overflow-hidden text-white font-sans border-y border-white/5">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-yoobe-purple/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading flex flex-col md:flex-row gap-4 items-center md:items-start">
              <span className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider flex items-center gap-2 w-max text-white">
                <BrainCircuit className="h-4 w-4 text-yoobe-purple" />
                Assistente Inteligente
              </span>
            </h2>
            <h3 className="text-2xl md:text-4xl font-black font-heading tracking-tight leading-tight">
              Inteligência e assistentes integrados em <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-cyan-400">toda a jornada</span> de engajamento e gamificação.
            </h3>
          </div>
          <Link
            href="/inteligencia"
            className="group flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40 shrink-0"
          >
            Conhecer a visão completa
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapStatus.map((stage, i) => (
            <div key={i} className="glass-panel-dark p-6 flex flex-col h-full border-t-2 relative overflow-hidden group hover:-translate-y-1 transition-all" style={{ borderTopColor: stage.title === "Criação de Campanhas" ? "#f97316" : stage.title === "Gestão de Recompensas" ? "#9333ea" : stage.title === "Orquestração Contínua" ? "#22d3ee" : "#34d399" }}>
              <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full ${stage.bg} -mr-10 -mt-10 pointer-events-none group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold font-heading">{stage.title}</h4>
                <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${stage.color} ${stage.bg}`}>
                  {stage.status}
                </span>
              </div>
              
              <div className="flex flex-col gap-4 mt-auto">
                {stage.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-3 text-white/70">
                    <div className="p-1.5 rounded-md bg-white/5 border border-white/10 flex-shrink-0 text-white">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
