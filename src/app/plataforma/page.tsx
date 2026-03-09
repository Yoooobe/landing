"use client";

import { motion } from "framer-motion";

export default function PlataformaPage() {
  return (
    <div className="pt-24 pb-20 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-yoobe-purple/10 border border-yoobe-purple/20 text-yoobe-purple text-sm font-semibold mb-6"
          >
            A Plataforma B2B
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Duas visões. <br />
            <span className="text-gradient">Um único motor.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/70"
          >
            Enquanto seus usuários engajam com missões e prêmios, você e seus gestores têm governança e análises preditivas em tempo real.
          </motion.p>
        </div>

        {/* Gestor View Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          <div className="order-2 lg:order-1 relative h-[500px] w-full rounded-2xl overflow-hidden glass-panel-dark border border-white/10 group shadow-2xl">
            <div className="absolute inset-0 bg-yoobe-blue/20" />
            
            {/* Mystery Overlay */}
            <div className="absolute inset-0 backdrop-blur-[2px] z-20 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-navy-dark/80">
              <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="bg-brand-orange text-white px-6 py-3 rounded hover:bg-brand-orange-dark font-medium shadow-xl">
                Agendar Demo do Gestor
              </a>
              <p className="text-white/50 text-sm mt-4">Nossa demo exibe a árvore de wallets e KPIs reais.</p>
            </div>
            
            {/* Abstract UI Elements */}
            <div className="p-8 relative z-10 flex flex-col gap-4 h-full">
              <div className="flex justify-between items-center mb-4">
                <div className="text-white font-bold text-xl">Painel Admin</div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/60">Controle</span>
                  <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/60">Análise</span>
                </div>
              </div>
              <div className="flex-1 bg-white/5 rounded-xl border border-white/5 flex items-end p-4 gap-2">
                <div className="w-full bg-brand-orange rounded-t-sm h-[40%]" />
                <div className="w-full bg-yoobe-purple rounded-t-sm h-[70%]" />
                <div className="w-full bg-green-500 rounded-t-sm h-[90%]" />
                <div className="w-full bg-yoobe-neon-pink rounded-t-sm h-[50%]" />
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl font-bold text-white">Para o Gestor (Admin)</h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Crie regras de gamificação (Achievements), gerencie limites corporativos (Wallets) e centralize a operação logística sem jamais precisar preencher uma planilha de entrega.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-6 h-6 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-xs">✓</div>
                Aprovação de Saldo em Cascata
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-6 h-6 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-xs">✓</div>
                Automação de Estoque de Kits
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-6 h-6 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-xs">✓</div>
                Relatórios Financeiros Consolidados
              </li>
            </ul>
          </div>
        </div>

        {/* User/Member View Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Para o Colaborador (Membro)</h2>
            <p className="text-lg text-white/70 leading-relaxed">
              O catálogo de prêmios se transforma em uma loja proprietária da sua empresa. Uma "Amazon" interna onde pontos e achievements se transformam em prêmios reais entregues na residência, gerando engajamento profundo.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-6 h-6 rounded-full bg-yoobe-neon-pink/20 text-yoobe-neon-pink flex items-center justify-center text-xs">✓</div>
                Checkout transparente de pontos
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-6 h-6 rounded-full bg-yoobe-neon-pink/20 text-yoobe-neon-pink flex items-center justify-center text-xs">✓</div>
                Rastreamento logístico do prêmio
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-6 h-6 rounded-full bg-yoobe-neon-pink/20 text-yoobe-neon-pink flex items-center justify-center text-xs">✓</div>
                Vitrine exclusiva e gamificada
              </li>
            </ul>
          </div>
          
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden glass-panel-dark border border-white/10 group shadow-2xl">
            <div className="absolute inset-0 bg-yoobe-neon-pink/10" />
            
            {/* Mystery Overlay */}
            <div className="absolute inset-0 backdrop-blur-[2px] z-20 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-navy-dark/80">
              <a href="https://catalogo.yoobe.co" target="_blank" rel="noopener noreferrer" className="bg-yoobe-neon-pink text-white px-6 py-3 rounded hover:bg-yoobe-neon-pink/80 font-medium shadow-xl">
                Acessar Catálogo Demo
              </a>
            </div>
            
            <div className="p-8 relative z-10 flex flex-col h-full gap-4">
               <div className="flex justify-between items-center mb-4">
                <div className="text-white font-bold text-xl">Loja do Colaborador</div>
                <div className="text-yoobe-neon-pink font-bold">12.500 Pts</div>
               </div>
               <div className="grid grid-cols-2 gap-4 flex-1">
                 <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                   <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mt-4" />
                   <div className="h-4 bg-white/20 w-3/4 mt-4 mx-auto rounded" />
                   <div className="h-3 bg-yoobe-neon-pink/50 w-1/2 mx-auto rounded mt-2" />
                 </div>
                 <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                   <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mt-4" />
                   <div className="h-4 bg-white/20 w-3/4 mt-4 mx-auto rounded" />
                   <div className="h-3 bg-yoobe-neon-pink/50 w-1/2 mx-auto rounded mt-2" />
                 </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
