import { BarChart3, TrendingUp, RefreshCw, DollarSign, Zap, Users } from "lucide-react";

export default function GamificationKPIs() {
  const kpis = [
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
      title: "eNPS",
      subtitle: "Employee Net Promoter Score",
      desc: "Mede a lealdade e satisfação dos colaboradores. Com gamificação, empresas veem aumento médio de 20 pontos no eNPS.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "Engagement Rate",
      subtitle: "DAU/MAU",
      desc: "Percentual de colaboradores que usam a plataforma ativamente. Meta ideal: acima de 40%.",
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-yoobe-purple" />,
      title: "Taxa de Resgate",
      subtitle: "Redemption Rate",
      desc: "Percentual de pontos resgatados vs. distribuídos. Alta taxa = alto engajamento. Meta: acima de 60%.",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-amber-400" />,
      title: "ROI do Programa",
      subtitle: "Return on Investment",
      desc: "(Economia em retenção + ganho de produtividade) / Custo. ROI típico: 3x a 8x.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Time-to-First-Engagement",
      subtitle: "Adoção Rápida",
      desc: "Tempo até a primeira interação. Quanto mais rápido o colaborador se engaja, maior a retenção. Meta: menos de 48h.",
    },
    {
      icon: <Users className="w-8 h-8 text-yoobe-neon-pink" />,
      title: "Cross-Team Collaboration",
      subtitle: "Índice de colaboração",
      desc: "Mede interações de reconhecimento entre departamentos. Indicador de cultura saudável.",
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f18] border-t border-white/5 relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            KPIs & Métricas
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Meça o <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-fuchsia-600">retorno</span> da sua gamificação
          </h2>
          <p className="text-lg text-white/60 font-sans">
            A plataforma 4unik fornece dashboards e relatórios com todas essas métricas em tempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-[#121824] border border-white/10 p-8 rounded-2xl hover:bg-[#161d2b] transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 inline-flex rounded-xl border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                  {kpi.icon}
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-heading text-white">{[85, 42, 68, 350, 24, 91][idx]}</span>
                  <span className="text-white/40 text-xs ml-1">{['pts', '%', '%', '%', 'hrs', '%'][idx]}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1 font-heading">{kpi.title}</h3>
              <div className="text-sm font-semibold text-yoobe-purple mb-4 tracking-wide font-sans">{kpi.subtitle}</div>
              <p className="text-white/60 text-sm leading-relaxed font-sans mb-6 flex-1">
                {kpi.desc}
              </p>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-auto">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-brand-orange to-yoobe-neon-pink transition-all duration-1000 w-0 group-hover:w-full"
                  style={{ width: `${[85, 42, 68, 100, 24, 91][idx]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
