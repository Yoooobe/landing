"use client";

import { motion } from "framer-motion";

export default function GamificationDuality() {
  return (
    <section className="py-24 bg-[#0d1424] relative border-t border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yoobe-neon-pink/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-sm font-bold tracking-wide uppercase">
            Como Funciona
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Dois caminhos para <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yoobe-neon-pink">engajar seu time</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-sans">
            Você não precisa se adaptar a nós. A Yoobe se adapta ao momento da sua empresa, seja com uma plataforma pronta ou trabalhando nos bastidores.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* LADO A: Engine Nativa */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden group hover:border-yoobe-neon-pink/30 hover:bg-white/[0.04] transition-all"
          >
            {/* Ambient background glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-yoobe-neon-pink/20 rounded-full blur-[80px] group-hover:bg-yoobe-neon-pink/30 transition-all pointer-events-none"></div>
            
            <h3 className="text-2xl font-black text-white mb-4 font-heading flex items-center gap-3">
              <span className="bg-yoobe-neon-pink/20 text-yoobe-neon-pink w-10 h-10 rounded-xl flex items-center justify-center">🎯</span>
              Tudo Pronto pra Usar
            </h3>
            <p className="text-white/60 font-sans mb-8 min-h-[50px]">
              Nossa plataforma completa com portal do colaborador. Crie missões, distribua pontos e libere o catálogo de prêmios no primeiro dia.
            </p>

            {/* SVG Visual */}
            <div className="w-full aspect-[4/3] bg-[#0d1424] border border-white/5 rounded-2xl relative overflow-hidden mb-8 shadow-inner flex flex-col justify-end">
              {/* Leaderboard Mockup */}
              <div className="p-4 space-y-3 relative z-10 w-full">
                {/* 1st Place */}
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-yoobe-neon-pink/30 shadow-[0_0_15px_rgba(231,87,130,0.15)] transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="text-yoobe-neon-pink font-bold w-6 text-center">1º</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yoobe-neon-pink to-orange-400"></div>
                  <div className="flex-1">
                    <div className="h-2 w-16 bg-white/80 rounded mb-1.5"></div>
                    <div className="h-1.5 w-10 bg-white/40 rounded"></div>
                  </div>
                  <div className="text-brand-orange font-bold text-sm">4.2k pts</div>
                </div>
                {/* 2nd Place */}
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/5 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                  <div className="text-white/40 font-bold w-6 text-center">2º</div>
                  <div className="w-8 h-8 rounded-full bg-white/20"></div>
                  <div className="flex-1">
                    <div className="h-2 w-20 bg-white/60 rounded mb-1.5"></div>
                    <div className="h-1.5 w-14 bg-white/30 rounded"></div>
                  </div>
                  <div className="text-white/80 font-bold text-sm">3.8k pts</div>
                </div>
                {/* 3rd Place */}
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/5">
                  <div className="text-white/40 font-bold w-6 text-center">3º</div>
                  <div className="w-8 h-8 rounded-full bg-white/10"></div>
                  <div className="flex-1">
                    <div className="h-2 w-14 bg-white/40 rounded mb-1.5"></div>
                    <div className="h-1.5 w-12 bg-white/20 rounded"></div>
                  </div>
                  <div className="text-white/60 font-bold text-sm">2.1k pts</div>
                </div>
              </div>

              {/* Decorative elements behind */}
              <svg className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity">
                <circle cx="80%" cy="20%" r="40" fill="url(#neonGradient)" filter="blur(20px)" />
                <defs>
                  <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e75782" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <ul className="space-y-3 font-sans text-sm text-white/70">
              <li className="flex gap-2 items-start"><span className="text-yoobe-neon-pink">✓</span> Portal do colaborador com a sua marca</li>
              <li className="flex gap-2 items-start"><span className="text-yoobe-neon-pink">✓</span> Campanhas divertidas e painel do gestor</li>
              <li className="flex gap-2 items-start"><span className="text-yoobe-neon-pink">✓</span> App não obrigatório, funciona no navegador</li>
            </ul>
          </motion.div>

          {/* LADO B: Integration Layer (Connector) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden group hover:border-blue-500/30 hover:bg-white/[0.04] transition-all"
          >
            {/* Ambient background glow */}
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-all pointer-events-none"></div>
            
            <h3 className="text-2xl font-black text-white mb-4 font-heading flex items-center gap-3">
              <span className="bg-blue-500/20 text-blue-400 w-10 h-10 rounded-xl flex items-center justify-center">🔌</span>
              Integração Invisível
            </h3>
            <p className="text-white/60 font-sans mb-8 min-h-[50px]">
              Já tem uma intranet que o time ama? Excelente. Nós conectamos nossa loja e logística lá dentro, sem ninguém perceber que mudou de sistema.
            </p>

            {/* SVG Visual */}
            <div className="w-full aspect-[4/3] bg-[#0d1424] border border-white/5 rounded-2xl relative overflow-hidden mb-8 shadow-inner flex items-center justify-center">
              
              {/* Nodes Mockup */}
              <div className="relative w-full h-full p-8 flex items-center justify-center">
                {/* Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <path d="M 50 150 C 150 150, 100 150, 200 150" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeDasharray="4 4" className="group-hover:stroke-blue-500/50 transition-colors" />
                  <path d="M 50 50 C 150 50, 150 150, 200 150" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeDasharray="4 4" className="group-hover:stroke-blue-500/50 transition-colors" />
                  <path d="M 50 250 C 150 250, 150 150, 200 150" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeDasharray="4 4" className="group-hover:stroke-blue-500/50 transition-colors" />
                  
                  {/* Traffic pulses */}
                  <circle cx="0" cy="0" r="3" fill="#3B82F6" className="animate-[float_2s_linear_infinite] group-hover:fill-yoobe-neon-pink">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M 50 150 C 150 150, 100 150, 200 150" />
                  </circle>
                  <circle cx="0" cy="0" r="3" fill="#3B82F6" className="animate-[float_2s_linear_infinite_0.5s]">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 50 50 C 150 50, 150 150, 200 150" />
                  </circle>
                </svg>

                {/* Left Nodes */}
                <div className="absolute left-6 top-0 bottom-0 flex flex-col justify-around py-4 z-10 w-16">
                  <div className="w-12 h-12 bg-[#141b2d] rounded-xl border border-white/10 flex items-center justify-center text-white/50 shadow-lg group-hover:scale-110 transition-transform">W</div>
                  <div className="w-12 h-12 bg-[#141b2d] rounded-xl border border-white/10 flex items-center justify-center text-white/50 shadow-lg group-hover:scale-110 transition-transform delay-75">B</div>
                  <div className="w-12 h-12 bg-[#141b2d] rounded-xl border border-white/10 flex items-center justify-center text-white/50 shadow-lg group-hover:scale-110 transition-transform delay-150">H</div>
                </div>

                {/* Center Yoobe Node */}
                <div className="w-24 h-24 bg-[#0F172A] rounded-2xl border-2 border-brand-orange shadow-[0_0_30px_rgba(249,115,22,0.3)] flex items-center justify-center z-10 relative group-hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] group-hover:border-blue-500 transition-all duration-500">
                  <span className="text-white font-black text-3xl font-heading absolute">Y.</span>
                  
                  {/* Circular scanning effect */}
                  <div className="absolute inset-0 rounded-2xl border border-white/0 overflow-hidden">
                    <div className="w-[150%] h-[150%] absolute -top-[25%] -left-[25%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0)_0%,rgba(59,130,246,0.3)_50%,rgba(59,130,246,0)_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>
            </div>

            <ul className="space-y-3 font-sans text-sm text-white/70">
              <li className="flex gap-2 items-start"><span className="text-blue-400">✓</span> O colaborador não precisa criar outra senha</li>
              <li className="flex gap-2 items-start"><span className="text-blue-400">✓</span> Recompensas aparecem direto nas ferramentas de trabalho</li>
              <li className="flex gap-2 items-start"><span className="text-blue-400">✓</span> Operamos a loja e a entrega em &quot;silêncio&quot; por trás</li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
