"use client";

import { motion } from "framer-motion";

export default function MiniDashboard() {
  return (
    <section className="py-24 bg-gradient-to-b from-brand-navy-dark to-[#0a0f18] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-bold tracking-wide uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
            Ambiente Simulador Logado
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Gestão de Estoque e Entregas
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Um vislumbre do seu futuro painel de controle administrativo. Substitua as dezenas de planilhas de envio de brindes por uma plataforma robusta.
          </p>
        </div>

        {/* Dashboard Mockup Layer */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-4xl rounded-xl border border-white/10 bg-[#0d131f] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#141b2d]">
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <img src="/logo-4unik-by-yoobe.png" alt="Yoobe" className="h-6" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-white/50">Admin Empresa</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-yoobe-neon-pink"></div>
            </div>
          </div>

          <div className="flex h-[400px]">
            {/* Sidebar */}
            <div className="w-48 border-r border-white/5 bg-[#0f1523] p-4 hidden sm:block">
              <div className="mb-6">
                <div className="text-[10px] font-bold text-white/30 uppercase mb-2">Principal</div>
                <div className="px-3 py-2 bg-brand-orange/10 text-brand-orange text-sm font-medium rounded-md mb-1 cursor-pointer">Dashboard</div>
                <div className="px-3 py-2 text-white/50 hover:text-white/80 text-sm font-medium rounded-md cursor-pointer transition-colors">Loja Corporativa</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-white/30 uppercase mb-2">Operação</div>
                <div className="px-3 py-2 text-white/50 hover:text-white/80 text-sm font-medium rounded-md cursor-pointer transition-colors">Pedidos</div>
                <div className="px-3 py-2 text-white/50 hover:text-white/80 text-sm font-medium rounded-md cursor-pointer transition-colors">Produtos</div>
                <div className="px-3 py-2 text-white/50 hover:text-white/80 text-sm font-medium rounded-md cursor-pointer transition-colors">Gestão de Usuários</div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-8 bg-[#0f172a] overflow-hidden">
              <h1 className="text-xl font-bold text-white mb-6 font-heading">Visão Geral do Desempenho</h1>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#141b2d] border border-white/5 rounded-lg p-4">
                  <div className="text-[10px] font-bold text-white/40 uppercase mb-1">Usuários Plataforma</div>
                  <div className="text-2xl font-bold text-white">840</div>
                </div>
                <div className="bg-[#141b2d] border border-yoobe-purple/20 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-yoobe-purple/10 rounded-full blur-xl"></div>
                  <div className="text-[10px] font-bold text-white/40 uppercase mb-1">Pontos Distribuídos</div>
                  <div className="text-2xl font-bold text-yoobe-purple">1.2M</div>
                </div>
                <div className="bg-[#141b2d] border border-red-500/20 rounded-lg p-4 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full blur-xl"></div>
                  <div className="text-[10px] font-bold text-white/40 uppercase mb-1">Alerta Estoque</div>
                  <div className="text-2xl font-bold text-red-400">3 Itens</div>
                </div>
              </div>

              {/* Table */}
              <div className="bg-[#141b2d] border border-white/5 rounded-lg p-5">
                 <h2 className="text-sm font-bold text-white mb-4 font-heading">Top Produtos Resgatados (Ranking)</h2>
                 <div className="flex justify-between border-b border-white/5 pb-2 text-xs font-medium text-white/40">
                   <span>Nome do Produto</span>
                   <span>Resgates</span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-white/5">
                   <span className="text-sm text-white font-medium">Fone Bluetooth JBL TWS</span>
                   <span className="text-sm font-bold text-green-400">142</span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-white/5">
                   <span className="text-sm text-white font-medium">Mochila Executiva Dell</span>
                   <span className="text-sm font-bold text-green-400">98</span>
                 </div>
                 <div className="flex justify-between items-center py-3">
                   <span className="text-sm text-white font-medium">Kit Boas-Vindas Padronizado</span>
                   <span className="text-sm font-bold text-green-400">67</span>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
