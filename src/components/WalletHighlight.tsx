"use client";

import { motion } from "framer-motion";

export default function WalletHighlight() {
  return (
    <section id="wallet" className="py-24 bg-brand-navy-dark border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
          
          {/* Content Right */}
          <div className="lg:w-1/2 space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full border border-green-500/50 bg-green-500/10 px-4 py-1.5"
            >
              <span className="text-sm font-semibold text-green-400">
                Wallet auditável e loja corporativa
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white leading-tight"
            >
              Pontos, resgates e acompanhamento em uma única jornada.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-white/70 leading-relaxed"
            >
              A 4unik permite que colaboradores e participantes de campanhas consultem saldo,
              acompanhem extrato, utilizem pontos na loja corporativa e verifiquem seus resgates
              com total rastreabilidade. Para a operação, a wallet continua auditável e também
              pode ser conectada a outras ferramentas de gamificação e engajamento.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="text-green-400 font-medium hover:text-green-300 transition-colors flex items-center gap-2">
                Conhecer a wallet da 4unik →
              </a>
            </motion.div>
          </div>

          {/* Abstract UI Mockup Left */}
          <div className="lg:w-1/2 relative w-full h-[450px] z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-500/20 blur-[100px] rounded-full z-0" />

            {/* Wallet Dashboard Mock */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 bg-brand-navy border border-white/10 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col"
            >
              <div className="bg-brand-navy-dark px-6 py-4 border-b border-white/5 flex justify-between items-center">
                 <h3 className="font-semibold text-white">Wallet Corporativa</h3>
                 <div className="text-sm text-green-400 font-mono">Status: Ativo</div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col gap-6">
                 <div className="flex justify-between pb-6 border-b border-white/5">
                   <div>
                     <div className="text-white/50 text-sm mb-1">Saldo disponível para resgates</div>
                     <div className="text-3xl font-bold text-white">R$ 14.500,00</div>
                   </div>
                   <div className="text-right">
                     <div className="text-white/50 text-sm mb-1">Resgatado</div>
                     <div className="text-lg font-medium text-brand-orange">R$ 5.500,00</div>
                   </div>
                 </div>

                 {/* Simulated Chart/Bars */}
                 <div className="space-y-4 flex-1">
                   <div className="text-sm text-white/70 mb-2">Consulta e uso por participante</div>
                   
                   <div className="space-y-3">
                     <div className="relative">
                       <div className="flex justify-between text-xs text-white/50 mb-1">
                         <span>João Silva · Saldo atual</span>
                         <span>R$ 4.000 / R$ 5.000</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} whileInView={{ width: "80%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-green-400 rounded-full" />
                       </div>
                     </div>

                     <div className="relative">
                       <div className="flex justify-between text-xs text-white/50 mb-1">
                         <span>Maria Santos · Resgates no período</span>
                         <span>R$ 1.500 / R$ 5.000</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} whileInView={{ width: "30%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.7 }} className="h-full bg-yoobe-neon-pink rounded-full" />
                       </div>
                     </div>
                   </div>
                 </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
