"use client";

import { motion } from "framer-motion";

export default function PricingSection() {
  return (
    <section id="planos" className="py-24 bg-brand-navy-dark relative border-t border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 relative z-10 text-white">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-bold tracking-wide uppercase">
            Planos & Preços
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading">
            Escolha o plano ideal para sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">empresa</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-sans leading-relaxed">
            Sem taxa de setup. Sem surpresas. Escale conforme cresce.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {/* Starter Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#141b2d] border border-white/10 p-8 rounded-3xl flex flex-col"
          >
            <h3 className="text-2xl font-bold text-white mb-2 font-heading">Starter</h3>
            <p className="text-white/50 text-sm mb-6 font-sans">Para até 100 colaboradores</p>
            <div className="mb-6">
              <span className="text-2xl font-bold text-white/70">R$</span>
              <span className="text-5xl font-black text-white tracking-tight"> 990</span>
              <span className="text-white/50 text-sm">/mês</span>
            </div>
            <ul className="space-y-4 mb-8 font-sans flex-1">
              <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Até 100 colaboradores</li>
              <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Gamificação completa (pontos, badges, missões)</li>
              <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Dashboard analítico (eNPS, ROI, resgate)</li>
              <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Catálogo com +5.000 produtos</li>
              <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Envios para todo o Brasil</li>
              <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Suporte por email</li>
            </ul>
            <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="w-full text-center py-4 rounded-xl border border-white/20 bg-transparent font-bold text-white hover:bg-white/5 transition-colors font-sans block mt-auto">
              Começar agora
            </a>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-b from-[#1a233a] to-[#141b2d] border border-brand-orange p-8 rounded-3xl flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(249,115,22,0.15)]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
              Mais Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-heading">Pro</h3>
            <p className="text-white/50 text-sm mb-6 font-sans">Até 500 colaboradores com API e Kits</p>
            <div className="mb-6">
              <span className="text-2xl font-bold text-white/70">R$</span>
              <span className="text-5xl font-black text-white tracking-tight"> 2.490</span>
              <span className="text-white/50 text-sm">/mês</span>
            </div>
            <ul className="space-y-4 mb-8 font-sans flex-1">
              <li className="flex items-center text-white/80"><span className="text-brand-orange mr-3">✓</span> Até 500 colaboradores</li>
              <li className="flex items-center text-white/80"><span className="text-brand-orange mr-3">✓</span> Gamificação + leaderboards + OKRs</li>
              <li className="flex items-center text-white/80"><span className="text-brand-orange mr-3">✓</span> API + Webhooks em tempo real</li>
              <li className="flex items-center text-white/80"><span className="text-brand-orange mr-3">✓</span> SDK (Node.js e Python)</li>
              <li className="flex items-center text-white/80"><span className="text-brand-orange mr-3">✓</span> Welcome Kits e experiências temáticas</li>
              <li className="flex items-center text-white/80"><span className="text-brand-orange mr-3">✓</span> Suporte prioritário</li>
            </ul>
            <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="w-full text-center py-4 rounded-xl bg-brand-orange font-bold text-white hover:bg-brand-orange-dark transition-colors font-sans block mt-auto">
              Escolher Pro
            </a>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#141b2d] border border-white/10 p-8 rounded-3xl flex flex-col"
          >
            <h3 className="text-2xl font-bold text-white mb-2 font-heading">Enterprise</h3>
            <p className="text-white/50 text-sm mb-6 font-sans">Ilimitado, SLA dedicado e integrações customizadas</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-white tracking-tight">Sob consulta</span>
            </div>
            <ul className="space-y-4 mb-8 font-sans flex-1">
              <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Colaboradores ilimitados</li>
              <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Tudo do Pro</li>
              <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> SSO (SAML) + Conformidade LGPD</li>
              <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> SLA dedicado</li>
              <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Account manager</li>
              <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Integrações customizadas</li>
            </ul>
            <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="w-full text-center py-4 rounded-xl border border-white/20 bg-transparent font-bold text-white hover:bg-white/5 transition-colors font-sans block mt-auto">
              Falar com Especialista
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
