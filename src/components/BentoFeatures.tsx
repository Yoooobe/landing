"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Trophy, Package, LayoutDashboard } from "lucide-react";

export default function BentoFeatures() {
  return (
    <section id="platform" className="py-24 bg-brand-navy-dark relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-yoobe-purple/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 text-yoobe-purple text-sm font-bold tracking-wide uppercase">
            Visão Geral
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            O hub central para inspirar e <br className="hidden md:block"/> recompensar quem faz acontecer.
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Da criação de pequenos desafios de vendas até a entrega do prêmio físico na casa do colaborador. Tudo no mesmo lugar, sem planilhas intermináveis.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* Mega Card: Painel do Gestor */}
          <motion.a 
            href="/plataforma"
            whileHover={{ y: -5 }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl glass-panel-dark border border-white/5 p-8 flex flex-col justify-between"
          >
            <div className="relative z-10 max-w-sm">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-orange to-red-500 flex items-center justify-center mb-4">
                <LayoutDashboard className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-orange transition-colors font-heading">Você no Controle</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 font-sans">
                Esqueça o vai-e-vem de aprovações. Defina orçamentos, acompanhe o engajamento geral e libere relatórios automáticos para o financeiro.
              </p>
              <div className="flex items-center text-brand-orange font-semibold text-sm font-sans">
                Conheça o painel <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            {/* UI Mockup Placeholder in Bento */}
            <div className="absolute top-1/2 right-[-5%] w-3/5 h-full rounded-tl-2xl bg-brand-charcoal/80 border-t border-l border-white/10 shadow-2xl p-4 overflow-hidden transform translate-y-[-20%] group-hover:translate-y-[-25%] group-hover:scale-105 transition-all duration-500">
              <div className="flex justify-between items-center mb-4">
                <div className="text-xs font-bold text-white font-sans">Overview Mensal</div>
                <div className="text-[10px] text-white/50 bg-white/5 px-2 py-1 rounded font-sans">Out 2026</div>
              </div>
              <div className="space-y-3">
                <div className="w-full h-12 bg-white/5 rounded-lg border border-white/5 flex items-center px-4 justify-between">
                  <div className="text-[10px] text-white/40 uppercase font-sans">Faturamento</div>
                  <div className="text-sm font-bold text-white font-sans">R$ 142.050,00</div>
                </div>
                <div className="w-full h-12 bg-white/5 rounded-lg border border-white/5 flex items-center px-4 justify-between">
                  <div className="text-[10px] text-white/40 uppercase font-sans">Resgates</div>
                  <div className="text-sm font-bold text-white font-sans">3.402 itens</div>
                </div>
                <div className="w-full h-12 bg-white/5 rounded-lg border border-white/5 flex items-center px-4 justify-between">
                  <div className="text-[10px] text-white/40 uppercase font-sans">SLA Dentro do prazo</div>
                  <div className="text-sm font-bold text-green-400 font-sans">99.1%</div>
                </div>
              </div>
            </div>
          </motion.a>

          {/* Gamification Engine */}
          <motion.a 
            href="/gamificacao"
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl glass-panel-dark border border-white/5 p-8 flex flex-col justify-between"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yoobe-purple to-pink-500 flex items-center justify-center mb-4">
                <Trophy className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yoobe-neon-pink transition-colors font-heading">Campanhas Divertidas</h3>
              <p className="text-white/60 text-sm leading-relaxed font-sans">
                Crie missões baseadas nas metas da empresa. Distribua pontos, crie rankings saudáveis e reconheça quem se destaca na operação.
              </p>
            </div>
            {/* Visual Dots */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yoobe-purple/20 rounded-full blur-2xl"></div>
          </motion.a>

          {/* Loja e Catálogo */}
          <motion.a 
            href="/plataforma#loja"
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl glass-panel-dark border border-white/5 p-8 flex flex-col justify-between"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-4">
                <Package className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors font-heading">Eles Escolhem o Prêmio</h3>
              <p className="text-white/60 text-sm leading-relaxed font-sans">
                Catálogo enorme onde o time troca seus pontos. E o melhor: nós fazemos a entrega porta a porta para o Brasil todo.
              </p>
            </div>
            <div className="absolute right-4 bottom-4 w-24 h-24 bg-[url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80')] bg-cover bg-center rounded-xl opacity-40 group-hover:opacity-100 transition-opacity border border-white/10"></div>
          </motion.a>

          {/* Segurança & LGPD */}
          <motion.a 
            href="/api-integracoes"
            whileHover={{ y: -5 }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl glass-panel-dark border border-white/5 p-8 flex items-center justify-between"
          >
            <div className="relative z-10 max-w-sm">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors font-heading">Conecta com Suas Ferramentas</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4 font-sans">
                Sem atrito para o time de TI. Integração simplificada com os sistemas que sua empresa já usa todos os dias, como Slack, Teams e Workday.
              </p>
              <div className="flex items-center text-blue-400 font-semibold text-sm font-sans">
                Documentação <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            {/* Terminal mock */}
            <div className="hidden sm:block relative w-1/2 h-full bg-[#0d1117] rounded-xl border border-white/10 p-4 font-mono text-[10px] text-white/70 overflow-hidden group-hover:border-blue-500/50 transition-colors">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="text-blue-400">POST <span className="text-white">/v1/rewards/grant</span></div>
              <div className="text-gray-400 mt-1">{"{"}</div>
              <div className="ml-4"><span className="text-purple-400">&quot;user_id&quot;</span>: <span className="text-green-300">&quot;emp_98231&quot;</span>,</div>
              <div className="ml-4"><span className="text-purple-400">&quot;points&quot;</span>: <span className="text-orange-300">500</span>,</div>
              <div className="ml-4"><span className="text-purple-400">&quot;reason&quot;</span>: <span className="text-green-300">&quot;Q3 Sales Target Achieved&quot;</span></div>
              <div className="text-gray-400">{"}"}</div>
              <div className="text-green-500 mt-3">200 OK — Reward granted securely.</div>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
}
