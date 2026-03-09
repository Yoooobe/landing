"use client";

import { motion } from "framer-motion";
import { Code, Webhook, Key, Database } from "lucide-react";

export default function ApiIntegracoesPage() {
  const codeSnippet = `
// Exemplo de Emissão de Pontos via API Yoobe
const response = await fetch('https://api.yoobe.co/v1/points/issue', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer yb_live_xxxxxxxx',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: "usr_982h3f2",
    amount: 500,
    reason: "Meta de Vendas B2B Atingida",
    walletId: "wal_sales_q3"
  })
});
  `.trim();

  return (
    <div className="pt-24 pb-20 overflow-hidden relative min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-sm font-semibold"
            >
              <Code className="w-4 h-4" />
              API para Desenvolvedores
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight"
            >
              API para <span className="text-gradient">recompensas</span> e fulfillment
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/70 leading-relaxed"
            >
              Infraestrutura de recompensas para plataformas de gamificação e employee engagement. Conecte catálogo, logística e resgate em dias — sem operar estoque.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <a href="#api-docs" className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 font-bold text-brand-navy-dark shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:bg-brand-orange hover:text-white hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(249,115,22,0.4)] gap-2">
                 <Webhook className="w-5 h-5" /> Documentação API
               </a>
               <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10">
                 Agendar Papo Técnico (CTO)
               </a>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-panel-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 blur-[80px] rounded-full z-0" />
              
              <div className="bg-[#1e1e1e] flex items-center px-4 py-3 border-b border-white/5 relative z-10">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-auto text-xs text-white/50 font-mono">POST /v1/points/issue</div>
              </div>
              
              <div className="p-6 relative z-10">
                <pre className="text-sm font-mono text-green-400 overflow-x-auto">
                  {codeSnippet}
                </pre>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
           <div className="glass-panel-dark p-6 rounded-2xl border border-white/5 hover:border-yoobe-neon-pink/50 transition-colors">
             <Key className="w-8 h-8 text-yoobe-neon-pink mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">Auth via Chaves e SSO</h3>
             <p className="text-white/60">Controle absoluto de permissionamento via chaves ou SSO SAML p/ grandes empresas.</p>
           </div>
           
           <div className="glass-panel-dark p-6 rounded-2xl border border-white/5 hover:border-yoobe-purple/50 transition-colors">
             <Webhook className="w-8 h-8 text-yoobe-purple mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">Real-time Webhooks</h3>
             <p className="text-white/60">Escute eventos (Ex: "Prêmio foi entregue") e atualize seu software B2B imediatamente.</p>
           </div>

           <div className="glass-panel-dark p-6 rounded-2xl border border-white/5 hover:border-brand-orange/50 transition-colors">
             <Database className="w-8 h-8 text-brand-orange mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">Ambiente Sandbox</h3>
             <p className="text-white/60">Ambiente virtual seguro para testar envio de brindes logísticos sem queimar orçamento.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
