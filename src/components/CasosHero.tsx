"use client";

import { motion } from "framer-motion";

export default function CasosHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-brand-navy-dark">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
         <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
        >
          <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Estudos de Caso Global</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight max-w-5xl mx-auto"
        >
          Resultados reais de <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">gigantes</span> do mercado.
        </motion.h1>
        
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="text-xl text-white/60 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Veja como SAP, Deloitte, IBM, Microsoft e CaLLogix utilizaram infraestruturas de gamificação para resolver problemas complexos de RH, vendas e comunidade.
        </motion.p>
      </div>
    </section>
  );
}
