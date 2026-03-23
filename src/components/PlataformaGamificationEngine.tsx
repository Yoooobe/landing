export default function PlataformaGamificationEngine() {
  return (
    <section className="py-24 bg-[#0a0f18] relative overflow-hidden text-white border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold">
              <span className="text-brand-orange text-xl leading-none">🎯</span> Motor de Gamificação
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight font-heading">
              O <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">coração</span> do engajamento.
            </h2>
            
            <p className="text-lg text-white/60 leading-relaxed font-light font-sans">
              Converta objetivos organizacionais pontuais ou contínuos (ex: venda do mês, cultura e feedbacks) em pontos dentro de um ciclo de recompensa comprovado psicologicamente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 font-sans">
              <div className="bg-[#121824] border border-white/10 rounded-2xl p-6 hover:border-brand-orange/30 transition-colors">
                <h4 className="text-white font-bold text-lg mb-2 font-heading">Campanhas Temporárias</h4>
                <p className="text-sm text-white/50 leading-relaxed">
                  Defina o Início, o Fim e a Premiação X de uma &quot;Campanha de Vendas Q3&quot;. O sistema calcula a conversão e aplica os Badges apropriados ao fim da meta.
                </p>
              </div>
              <div className="bg-[#121824] border border-white/10 rounded-2xl p-6 hover:border-yoobe-purple/30 transition-colors">
                <h4 className="text-white font-bold text-lg mb-2 font-heading">Pontuação Peer-to-Peer</h4>
                <p className="text-sm text-white/50 leading-relaxed">
                  Permita que funcionários enviem frações de pontos de gratidão para colegas validando Valores da Empresa e cultura (Reconhecimento 360).
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            {/* Infographic block simulating the one from HTML */}
            <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1)_0%,transparent_100%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="text-xs text-white/40 uppercase tracking-widest font-mono mb-8 relative z-10 text-center">
                Fluxo Lógico (Eventos Autônomos)
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center relative z-10">
                {/* Node 1 */}
                <div className="flex flex-col items-center max-w-[100px]">
                  <div className="w-16 h-16 rounded-2xl bg-[#1e293b] border border-white/10 flex items-center justify-center text-3xl mb-3 shadow-lg">
                    📤
                  </div>
                  <div className="text-xs text-white/80 font-semibold mb-1">Webhook CRM</div>
                  <div className="text-[10px] text-white/50">(Target Hit)</div>
                </div>

                {/* Arrow 1 */}
                <div className="hidden sm:flex flex-col items-center">
                  <div className="text-[10px] text-brand-orange font-mono mb-1">--- 500 Pts ---&gt;</div>
                  <div className="w-full h-px bg-brand-orange/30"></div>
                </div>

                {/* Node 2 */}
                <div className="flex flex-col items-center max-w-[100px]">
                  <div className="w-16 h-16 rounded-2xl bg-[#1e293b] border border-brand-orange/30 shadow-[0_0_15px_rgba(249,115,22,0.2)] flex items-center justify-center text-3xl mb-3 relative">
                    <div className="absolute inset-0 border-2 border-brand-orange rounded-2xl border-dashed animate-[spin_10s_linear_infinite] opacity-50"></div>
                    ⚙️
                  </div>
                  <div className="text-xs text-white/80 font-semibold mb-1">Motor 4unik</div>
                  <div className="text-[10px] text-white/50">(Regras Validadas)</div>
                </div>

                {/* Arrow 2 */}
                <div className="hidden sm:flex flex-col items-center">
                  <div className="text-[10px] text-yoobe-purple font-mono mb-1">--- Carteira ---&gt;</div>
                  <div className="w-full h-px bg-yoobe-purple/30"></div>
                </div>

                {/* Node 3 */}
                <div className="flex flex-col items-center max-w-[100px]">
                  <div className="w-16 h-16 rounded-2xl bg-[#1e293b] border border-white/10 flex items-center justify-center text-3xl mb-3 shadow-lg">
                    👤
                  </div>
                  <div className="text-xs text-white/80 font-semibold mb-1">Push App</div>
                  <div className="text-[10px] text-white/50">(App/Email)</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
