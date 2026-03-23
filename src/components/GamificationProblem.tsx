export default function GamificationProblem() {
  return (
    <section className="py-24 bg-[#0a0f18] relative overflow-hidden border-t border-white/5">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.05)_0%,transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            O Desafio do RH
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            A crise de <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-fuchsia-600">engajamento</span> custa milhões às empresas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121824] border border-white/10 p-8 rounded-2xl hover:border-red-500/30 transition-all hover:-translate-y-1">
            <div className="text-4xl font-black text-red-500 mb-4">85%</div>
            <h3 className="text-xl font-bold text-white mb-3 font-heading">Não Engajados</h3>
            <p className="text-white/60 mb-4 font-sans">
              Segundo a Gallup, 85% dos colaboradores no mundo não estão engajados no trabalho. Isso afeta diretamente a produtividade e a qualidade.
            </p>
            <cite className="text-xs text-white/40 block font-sans">Fonte: Gallup Global Workplace Report</cite>
          </div>

          <div className="bg-[#121824] border border-white/10 p-8 rounded-2xl hover:border-amber-500/30 transition-all hover:-translate-y-1">
            <div className="text-4xl font-black text-amber-500 mb-4">200%</div>
            <h3 className="text-xl font-bold text-white mb-3 font-heading">Custo de Substituição</h3>
            <p className="text-white/60 mb-4 font-sans">
              Substituir um colaborador pode custar entre 50% e 200% do salário anual. Quanto mais sênior, maior o impacto financeiro.
            </p>
            <cite className="text-xs text-white/40 block font-sans">Fonte: SHRM Research</cite>
          </div>

          <div className="bg-[#121824] border border-white/10 p-8 rounded-2xl hover:border-blue-500/30 transition-all hover:-translate-y-1">
            <div className="text-4xl font-black text-blue-500 mb-4">65%</div>
            <h3 className="text-xl font-bold text-white mb-3 font-heading">Sem Reconhecimento</h3>
            <p className="text-white/60 mb-4 font-sans">
              65% dos colaboradores dizem não receber nenhum tipo de reconhecimento durante o ano. A consequência é desmotivação silenciosa.
            </p>
            <cite className="text-xs text-white/40 block font-sans">Fonte: Deloitte Insights</cite>
          </div>

          <div className="bg-[#121824] border border-white/10 p-8 rounded-2xl hover:border-yoobe-purple/30 transition-all hover:-translate-y-1">
            <div className="text-4xl font-black text-yoobe-purple mb-4">20%</div>
            <h3 className="text-xl font-bold text-white mb-3 font-heading">Turnover em 45 dias</h3>
            <p className="text-white/60 mb-4 font-sans">
              1 em cada 5 demissões acontece nos primeiros 45 dias. Welcome kits e onboarding gamificado reduzem isso drasticamente.
            </p>
            <cite className="text-xs text-white/40 block font-sans">Fonte: BambooHR</cite>
          </div>
        </div>
      </div>
    </section>
  );
}
