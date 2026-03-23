"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Zap } from "lucide-react";

export default function GamificationHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-brand-navy-dark">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-yoobe-purple/15 rounded-full blur-[150px] mix-blend-screen animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yoobe-neon-pink/10 rounded-full blur-[120px] mix-blend-screen"></div>
         {/* Tech Grid Background lines */}
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBoLTQweiBNMzkuNSAwSDQwdjQwaC0uNXoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiLz48L3N2Zz4=')] bg-repeat"></div>
      
         {/* Floating Gamification Widgets */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.8, x: -50 }}
           animate={{ opacity: 1, scale: 1, x: 0 }}
           transition={{ delay: 0.5, duration: 0.8 }}
           className="absolute top-[20%] left-[10%] hidden lg:flex items-center gap-3 p-4 rounded-2xl glass-panel-dark"
           style={{ animation: "float 6s ease-in-out infinite" }}
         >
           <div className="w-10 h-10 rounded-full bg-yoobe-neon-pink/20 flex items-center justify-center border border-yoobe-neon-pink/30">
             <Trophy className="w-5 h-5 text-yoobe-neon-pink" />
           </div>
           <div>
             <div className="text-white font-bold font-heading text-sm">Level 42 Achieved</div>
             <div className="text-white/50 text-xs font-sans">Top 5% performer</div>
           </div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, scale: 0.8, x: 50 }}
           animate={{ opacity: 1, scale: 1, x: 0 }}
           transition={{ delay: 0.7, duration: 0.8 }}
           className="absolute top-[40%] right-[10%] hidden lg:flex flex-col gap-2 p-5 rounded-3xl glass-panel-dark w-48"
           style={{ animation: "float 8s ease-in-out infinite 1s" }}
         >
           <div className="flex justify-between items-center w-full">
             <div className="text-brand-orange font-bold text-xl font-heading">+500 pts</div>
             <Star className="w-5 h-5 text-brand-orange fill-brand-orange" />
           </div>
           <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
             <div className="bg-brand-orange w-[75%] h-full rounded-full"></div>
           </div>
           <div className="text-white/40 text-[10px] mt-1 font-sans">Campaign Goal Progress</div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.9, duration: 0.8 }}
           className="absolute bottom-[20%] left-[20%] hidden lg:flex items-center justify-center w-14 h-14 rounded-full glass-panel-dark border-brand-orange/30 shadow-[0_0_30px_rgba(249,115,22,0.2)]"
           style={{ animation: "float 5s ease-in-out infinite 0.5s" }}
         >
           <Zap className="w-6 h-6 text-brand-orange" />
         </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 backdrop-blur-sm mb-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
              <span className="text-yoobe-purple text-xs font-bold uppercase tracking-wider font-sans">Motor de Gamificação Corporativa</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6 tracking-tight font-heading"
          >
            Engajamento <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple via-fuchsia-500 to-yoobe-neon-pink">
              Estratégico.
            </span>
            <br /><span className="text-3xl md:text-4xl text-white/70">Orientado a Resultados.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed font-sans"
          >
            Sistema completo: pontos, rankings individuais ou por equipe, missões baseadas em metas e OKRs, badges de conquista e segmentação por tags (presencial, híbrido, regional).
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
             <a
              href="#mechanics"
              className="px-8 py-4 rounded-full bg-white text-yoobe-purple font-bold text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-2 font-sans"
            >
              Conhecer as 6 Mecânicas ↓
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
