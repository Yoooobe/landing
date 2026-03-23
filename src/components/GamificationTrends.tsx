export default function GamificationTrends() {
  const trends = [
    {
      icon: "🤖",
      title: "IA Personalizada",
      desc: "Inteligência Artificial adaptando desafios e recompensas em tempo real para cada colaborador. Aumento de até 60% em engajamento com personalização orientada por dados.",
      tag: "Alta Adoção",
      tagColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    {
      icon: "🥽",
      title: "Realidade Virtual Imersiva",
      desc: "Treinamentos imersivos com RV devem triplicar em 2025. Simulações gamificadas de cenários reais aumentam retenção de conhecimento em 70%.",
      tag: "Emergente",
      tagColor: "bg-yoobe-neon-pink/20 text-yoobe-neon-pink border-yoobe-neon-pink/30",
    },
    {
      icon: "🌐",
      title: "Equipes Remotas",
      desc: "Gamificação online como solução para conectar equipes distribuídas. Escape rooms virtuais, desafios colaborativos e reconhecimento digital.",
      tag: "Consolidada",
      tagColor: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    {
      icon: "🧠",
      title: "Bem-Estar & Propósito",
      desc: "Competições de passos, semanas de bem-estar gamificadas e programas que conectam colaboradores ao propósito organizacional.",
      tag: "Crescente",
      tagColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    },
    {
      icon: "💡",
      title: "Inovação Gamificada",
      desc: "Hackathons internos, competições de design thinking e desafios de inovação aberta. Gamificação como motor de criatividade organizacional.",
      tag: "Alta Adoção",
      tagColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    {
      icon: "📊",
      title: "Analytics Avançado",
      desc: "People analytics com dados de gamificação. Correlações entre engajamento, performance e retenção para decisões baseadas em dados.",
      tag: "Essencial",
      tagColor: "bg-yoobe-purple/20 text-yoobe-purple border-yoobe-purple/30",
    },
  ];

  return (
    <section className="py-24 bg-[#0d1424] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            Mercado & Tendências 2025-2026
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            O futuro da <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-fuchsia-600">gamificação</span> corporativa
          </h2>
          <p className="text-lg text-white/60">
            O mercado global de gamificação atingiu US$ 13,6 bilhões em 2025 e deve chegar a US$ 35 bilhões em 2033. Conheça as tendências.
          </p>
        </div>

        {/* Market Size Banner */}
        <div className="bg-gradient-to-r from-[#121824] to-[#1a1025] border border-white/10 rounded-3xl p-8 mb-16 flex flex-col md:flex-row items-center justify-around text-center gap-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1)_0%,transparent_50%)] group-hover:opacity-100 transition-opacity opacity-50 duration-500"></div>
          
          <div className="flex flex-col relative z-10">
            <span className="text-xs text-white/50 uppercase tracking-widest mb-2 font-semibold">Mercado Global 2025</span>
            <span className="text-4xl md:text-5xl font-black text-white glow-text">US$ 13,6 bi</span>
          </div>
          
          <div className="hidden md:flex flex-col items-center justify-center text-yoobe-purple relative z-10">
            <span className="text-sm font-bold uppercase tracking-widest mb-1">CAGR +12.66%</span>
            <svg width="64" height="24" viewBox="0 0 64 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse">
              <path d="M0,12 L50,12 M42,4 L52,12 L42,20" />
            </svg>
          </div>
          
          <div className="flex flex-col relative z-10">
            <span className="text-xs text-white/50 uppercase tracking-widest mb-2 font-semibold">Projeção 2033</span>
            <span className="text-4xl md:text-5xl font-black text-yoobe-purple glow-text">US$ 35 bi</span>
          </div>
        </div>

        {/* Trends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map((trend, idx) => (
            <div key={idx} className="bg-[#121824] border border-white/10 p-8 rounded-2xl hover:border-yoobe-purple/50 transition-all hover:-translate-y-2 group">
              <div className="text-4xl mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                {trend.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yoobe-purple transition-colors font-heading">{trend.title}</h3>
              <p className="text-white/60 mb-6 text-sm leading-relaxed">
                {trend.desc}
              </p>
              <div className="mt-auto">
                <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold border ${trend.tagColor}`}>
                  {trend.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
