"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ROICalculator() {
  const [users, setUsers] = useState(500);
  const savings = users * 250; // Simple logic from index-option-b.html

  return (
    <section className="py-24 bg-brand-navy-dark relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBoLTQweiBNMzkuNSAwSDQwdjQwaC0uNXoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] bg-repeat opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-sm font-bold tracking-wide uppercase">
            Análise de Impacto
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Veja o retorno da infraestrutura.
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A substituição de premiações manuais (vale-compras, brindes isolados) por uma plataforma unificada reduz brutalmente o overhead operacional e custos com bitributação.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-dark rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Glow */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 w-full text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2 font-heading">Volume de Colaboradores</h3>
              <p className="text-sm text-white/50 mb-8">Arraste para simular o tamanho da sua operação.</p>
              
              <div className="text-5xl font-black text-white mb-6">
                {users.toLocaleString('pt-BR')} <span className="text-2xl text-white/40">usuários</span>
              </div>
              
              <input 
                type="range" 
                min="50" 
                max="5000" 
                step="50" 
                value={users}
                onChange={(e) => setUsers(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-orange"
              />
            </div>
            
            <div className="w-px h-32 bg-white/10 hidden md:block"></div>

            <div className="flex-1 w-full text-center bg-white/5 p-8 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-yoobe-neon-pink uppercase tracking-wider mb-2">Economia Operacional Estimada Anual</h3>
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yoobe-neon-pink mb-4">
                R$ {savings.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                *Estimativa baseada em processos logísticos otimizados, frete consolidado, mitigação de passivo trabalhista e horas de RH economizadas.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
