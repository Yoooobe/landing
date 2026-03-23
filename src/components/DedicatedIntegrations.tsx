"use client";

import { motion } from "framer-motion";

export default function DedicatedIntegrations() {
  return (
    <section className="py-24 bg-brand-navy-dark relative border-t border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-400 text-sm font-bold tracking-wide uppercase">
            Conectividade Nativa
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Sua intranet já tem <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Gamificação?</span>
          </h2>
          <p className="text-xl text-white/50 font-sans">
            A Yoobe opera de forma <strong className="text-white">invisível</strong> entregando a infraestrutura de prêmios e logística diretamente dentro das maiores plataformas de Employee Experience do mercado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* WORKVIVO INTEGRATION */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#141b2d] border border-white/10 rounded-3xl p-8 lg:p-10 relative overflow-hidden group hover:border-blue-500/30 transition-colors flex flex-col"
          >
            {/* Ambient background glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-all pointer-events-none"></div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center font-black text-blue-600 text-2xl shadow-lg">W</div>
              <h3 className="text-3xl font-black text-white font-heading">Workvivo</h3>
            </div>
            
            <p className="text-white/60 font-sans mb-8 min-h-[60px] relative z-10">
              A plataforma líder global do Zoom agora conta com o poder do catálogo corporativo da Yoobe. Premie direto no feed social.
            </p>

            {/* Visual Mockup - Workvivo Feed */}
            <div className="w-full aspect-[4/3] bg-white border border-white/10 rounded-2xl relative overflow-hidden mb-8 shadow-inner flex flex-col p-4 font-sans max-w-sm mx-auto group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-shadow">
              {/* Fake Workvivo Header */}
              <div className="flex items-center justify-between mb-4 border-b pb-2">
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[10px]">W</div>
              </div>
              
              {/* Feed Card */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500"></div>
                  <div>
                    <div className="text-xs font-bold text-gray-800">RH Oficial</div>
                    <div className="text-[10px] text-gray-400">Há 2 horas</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-3 leading-tight">
                  Parabéns time de vendas por bater a meta! 🏆 Resgatem seus prêmios exclusivos na plataforma.
                </div>
                
                {/* Embedded Yoobe Reward Card */}
                <div className="bg-white border-2 border-brand-orange/20 rounded-lg p-3 flex items-center gap-3 transform group-hover:scale-[1.02] transition-transform">
                  <div className="w-12 h-12 bg-orange-50 rounded-md flex items-center justify-center text-xl shadow-sm border border-brand-orange/10">🎁</div>
                  <div>
                    <div className="text-xs font-bold text-gray-800">Kit Celebração Vendas</div>
                    <div className="text-[10px] text-brand-orange font-bold">Yoobe Rewards</div>
                  </div>
                  <button className="ml-auto bg-brand-orange text-white text-[10px] px-3 py-1.5 rounded-full font-bold">Resgatar</button>
                </div>

              </div>

              {/* Data Sync Annotation */}
              <div className="absolute top-1/2 -right-4 bg-brand-navy-dark text-white text-[10px] px-3 py-1.5 rounded-l-lg font-mono shadow-2xl flex items-center gap-2 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                Em tempo real
              </div>
            </div>

            <ul className="space-y-3 font-sans text-sm text-white/70 mt-auto">
              <li className="flex gap-2 items-start"><span className="text-blue-400 flex-shrink-0">✓</span> O colaborador não precisa criar outra senha ou login</li>
              <li className="flex gap-2 items-start"><span className="text-blue-400 flex-shrink-0">✓</span> Notificações enviadas direto no app mobile do Workvivo</li>
              <li className="flex gap-2 items-start"><span className="text-blue-400 flex-shrink-0">✓</span> Gestão unificada: RH não precisa operar 2 telas separadas</li>
            </ul>
          </motion.div>


          {/* BEEHOME INTEGRATION */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#141b2d] border border-white/10 rounded-3xl p-8 lg:p-10 relative overflow-hidden group hover:border-yellow-400/30 transition-colors flex flex-col"
          >
            {/* Ambient background glow */}
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px] group-hover:bg-yellow-400/20 transition-all pointer-events-none"></div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center font-black text-white text-2xl shadow-lg">B</div>
              <h3 className="text-3xl font-black text-white font-heading">Beehome</h3>
            </div>
            
            <p className="text-white/60 font-sans mb-8 min-h-[60px] relative z-10">
              Turbine a principal intranet do Brasil. Seus colaboradores pontuam na Beehome e sacam produtos físicos via Yoobe corporativo.
            </p>

            {/* Visual Mockup - Beehome Node Connection */}
            <div className="w-full aspect-[4/3] bg-[#0d1424] border border-white/10 rounded-2xl relative overflow-hidden mb-8 shadow-inner flex items-center justify-center font-sans max-w-sm mx-auto group-hover:border-yellow-400/20 transition-colors">
              
              <div className="w-full px-8 relative z-10 flex flex-col items-center gap-6">
                
                {/* Beehome Block */}
                <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-yellow-400/20 text-yellow-400 flex items-center justify-center font-black">B</div>
                    <div className="text-sm font-bold text-white">Moedas Beehome</div>
                  </div>
                  <div className="text-yellow-400 text-lg font-black tracking-tighter">B$ 1.250</div>
                </div>

                {/* Animated Connection Arrow */}
                <div className="h-12 flex flex-col items-center justify-center opacity-60">
                  <div className="w-0.5 h-full bg-gradient-to-b from-yellow-400/50 to-brand-orange/50 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff] animate-[pulse_1s_ease-out_infinite]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff] animate-[pulse_1s_ease-out_infinite_0.3s]"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-orange shadow-[0_0_10px_#f97316] animate-[pulse_1s_ease-out_infinite_0.6s]"></div>
                  </div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest mt-2 font-mono">Conexão Ativa</span>
                </div>

                {/* Yoobe Block */}
                <div className="w-full bg-gradient-to-br from-brand-charcoal to-[#1a233a] border border-brand-orange/30 backdrop-blur-md rounded-xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(249,115,22,0.15)] group-hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-brand-orange text-white flex items-center justify-center font-black text-xl">Y.</div>
                    <div>
                      <div className="text-sm font-bold text-white leading-tight">Yoobe Store</div>
                      <div className="text-[10px] text-brand-orange uppercase">Logística & Envios</div>
                    </div>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center text-xl">📦</div>
                </div>

              </div>

              {/* Background Tech Network */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" style={{ zIndex: 0 }}>
                <path d="M 0 50 C 100 50, 200 150, 400 100" stroke="#FBBF24" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-[pulse_3s_linear_infinite]" />
                <path d="M 0 300 C 100 200, 200 250, 400 350" stroke="#F97316" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-[pulse_3s_linear_infinite_1s]" />
              </svg>
            </div>

            <ul className="space-y-3 font-sans text-sm text-white/70 mt-auto">
              <li className="flex gap-2 items-start"><span className="text-yellow-400 flex-shrink-0">✓</span> O colaborador gasta o saldo Beehome e a Yoobe faz a entrega</li>
              <li className="flex gap-2 items-start"><span className="text-yellow-400 flex-shrink-0">✓</span> Totalmente fluído, as plataformas se conversam o tempo todo</li>
              <li className="flex gap-2 items-start"><span className="text-yellow-400 flex-shrink-0">✓</span> Fim do processo manual de comprar prêmios para a intranet</li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
