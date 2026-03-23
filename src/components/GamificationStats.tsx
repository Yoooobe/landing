export default function GamificationStats() {
  const stats = [
    { value: "89", suffix: "%", desc: "dos funcionários se sentem mais produtivos com gamificação" },
    { value: "88", suffix: "%", desc: "se sentem mais felizes no trabalho com mecânicas de jogo" },
    { value: "48", suffix: "%", desc: "mais engajamento em empresas com gamificação ativa" },
    { value: "45", suffix: "%", desc: "maior retenção de conhecimento em treinamentos gamificados" },
    { value: "22", suffix: "%", desc: "mais lucratividade em empresas com colaboradores engajados" },
    { value: "7", suffix: "x", desc: "mais rentáveis são empresas que investem em gamificação" },
  ];

  return (
    <section className="py-24 bg-[#0f172a] relative overflow-hidden text-center border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yoobe-purple/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            Impacto Comprovado
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading">
            Números que <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-fuchsia-600">falam</span> por si
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#121824] border border-white/10 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl font-black text-white mb-4">
                {stat.value}<span className="text-yoobe-purple text-3xl align-top">{stat.suffix}</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-[200px] mx-auto">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
