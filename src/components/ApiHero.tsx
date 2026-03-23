"use client";

import { motion } from "framer-motion";
import { Webhook, Terminal, Code2 } from "lucide-react";

export default function ApiHero() {
  const codeSnippet = `
POST /v2/api/integrations/rewards HTTP/1.1
Host: api.4unik.yoobe.co
Authorization: Bearer sec_tok_4Uxxxxxxxxx

{
  "user_identifier": "colab@suaempresa.com",
  "points_amount": 1000,
  "campaign_internal_id": "meta_q4_vendas",
  "trigger_notification": true
}
  `.trim();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#0d1424] border-t border-white/5">
      {/* Developer Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBoLTQweiBNMzkuNSAwSDQwdjQwaC0uNXoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] bg-repeat"></div>
      </div>
      
      {/* Neon Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-yoobe-neon-pink/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-sm"
            >
              <Terminal className="w-4 h-4" />
              <span className="font-sans">API RESTful + SDK + Webhooks</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight font-heading"
            >
              API para <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">recompensas</span>, fulfillment e experiência corporativa
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/60 leading-relaxed font-light font-sans"
            >
              API RESTful com Webhooks em tempo real, Sandbox para testes e SDKs para Node.js e Python. Endpoints dedicados para produtos, estoque, checkout e histórico de resgates.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex flex-col sm:flex-row gap-4 pt-4"
            >
               <a href="#docs" className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 font-bold text-[#0a0f18] shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all hover:bg-cyan-400 hover:text-[#0a0f18] hover:scale-105 gap-2 font-sans">
                 <Code2 className="w-5 h-5" /> Ler a Documentação
               </a>
               <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 gap-2 font-sans">
                 <Webhook className="w-5 h-5" /> Falar com Engenharia
               </a>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full perspective-1000">
            <motion.div
              initial={{ opacity: 0, rotateY: 10, x: 50 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="glass-panel-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Window Header */}
              <div className="bg-[#1e1e1e]/80 flex items-center justify-between px-4 py-3 border-b border-white/5 relative z-10 backdrop-blur-md">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs text-white/40 font-mono tracking-wider">issue_points.ts</div>
                <div className="w-10"></div> {/* Spacer */}
              </div>
              
              {/* Code Area */}
              <div className="p-6 relative z-10 bg-[#0d121c]/90">
                <pre className="text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre-wrap word-break">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
