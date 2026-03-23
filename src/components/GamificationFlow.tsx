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
    <section className="py-24 bg-[#050a10] border-t border-white/5 relative overflow-hidden">
      <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-yoobe-purple/50 to-transparent hidden md:block"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            Como Funciona na Prática
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Do setup ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-fuchsia-600">engajamento</span> em 4 etapas
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
                <div className="bg-[#121824] border border-white/10 p-8 rounded-2xl hover:border-yoobe-purple/30 transition-all hover:bg-[#161d2b] group">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-fuchsia-500 font-mono">
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
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#121824] border-[4px] border-[#050a10] shadow-[0_0_0_2px_rgba(139,92,246,0.5)] z-20 hidden md:block">
                <div className="w-full h-full rounded-full bg-yoobe-purple animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
