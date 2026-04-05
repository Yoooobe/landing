export default function GamificationFlow() {
  const steps = [
    {
      num: "01",
      role: "Gestor / RH",
      title: "Configure a Plataforma",
      desc: "O gestor acessa o painel administrativo, define regras de pontuação, configura moedas virtuais, importa colaboradores e personaliza o catálogo de prêmios. Setup em menos de 24 horas.",
      features: [
        { icon: "📊", text: "Dashboard analítico" },
        { icon: "💰", text: "Multi-moeda" },
        { icon: "👥", text: "Importação em massa" },
      ],
      align: "right",
    },
    {
      num: "02",
      role: "Gestor / RH",
      title: "Crie Campanhas & Desafios",
      desc: "Lance missões temáticas, defina metas por equipe ou individual, configure reconhecimento automático por aniversários e marcos. Tudo pelo painel de gestão.",
      features: [
        { icon: "🎯", text: "Metas por OKR" },
        { icon: "🎮", text: "Campanhas temáticas" },
        { icon: "⚡", text: "Automação de regras" },
      ],
      align: "left",
    },
    {
      num: "03",
      role: "Colaborador / Membro",
      title: "Participe & Acumule Pontos",
      desc: "Colaboradores acessam a plataforma, participam de desafios, recebem reconhecimento, acumulam pontos e acompanham seu ranking e conquistas no painel do membro.",
      features: [
        { icon: "🏅", text: "Pontos & Rankings" },
        { icon: "🎖️", text: "Badges de conquista" },
        { icon: "📱", text: "Acesso mobile" },
      ],
      align: "right",
    },
    {
      num: "04",
      role: "Colaborador / Membro",
      title: "Resgate Prêmios Reais",
      desc: "Com os pontos acumulados, o colaborador acessa a loja corporativa, escolhe entre +5.000 produtos e recebe em casa. Experiência de e-commerce premium.",
      features: [
        { icon: "🛒", text: "+5.000 produtos" },
        { icon: "📦", text: "Entrega rastreada" },
        { icon: "🎁", text: "Kits personalizados" },
      ],
      align: "left",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface-deep py-24">
      <div className="absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-demo-cyan/30 to-transparent md:block"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            Como Funciona na Prática
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Do setup ao{" "}
            <span className="bg-gradient-to-r from-yoobe-purple via-unik-blue-soft to-demo-cyan bg-clip-text text-transparent">
              engajamento
            </span>{" "}
            em 4 etapas
          </h2>
          <p className="text-lg text-white/60 font-sans">
            Implementação simples, resultado imediato. A plataforma se adapta à sua cultura e processos.
          </p>
        </div>

        <div className="space-y-16 md:space-y-0 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col md:flex-row items-center md:justify-between w-full md:mb-16 last:mb-0">
              {/* Spacer for alternating sides */}
              {step.align === "left" && <div className="hidden md:block w-5/12"></div>}
              
              {/* Content Card */}
              <div className="w-full md:w-5/12 flex-shrink-0">
                <div className="group rounded-2xl border border-white/10 bg-surface-panel p-8 transition-all hover:border-demo-cyan/25 hover:bg-surface-elevated">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="bg-gradient-to-r from-yoobe-purple to-demo-cyan bg-clip-text font-mono text-3xl font-bold text-transparent">
                      {step.num}
                    </span>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-semibold text-white/70">
                      {step.role}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yoobe-purple transition-colors font-heading">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-base mb-6 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                  <div className="flex flex-wrap gap-3 font-sans">
                    {step.features.map((feat, fIndex) => (
                      <span key={fIndex} className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-white/5 rounded-lg text-sm text-white/80">
                        <span>{feat.icon}</span>
                        {feat.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating sides */}
              {step.align === "right" && <div className="hidden md:block w-5/12"></div>}

              {/* Timeline Center Dot (Desktop only) */}
              <div className="absolute left-1/2 top-1/2 z-20 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-surface-deep bg-surface-panel shadow-[0_0_0_2px_rgba(34,211,238,0.35)] md:block">
                <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-br from-yoobe-purple to-demo-cyan"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
