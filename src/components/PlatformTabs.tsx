"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function PlatformTabs() {
  const [activeTab, setActiveTab] = useState("gestao");

  return (
    <section id="preview" className="py-24 bg-brand-navy-dark overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 text-yoobe-purple text-sm font-bold tracking-wide uppercase">
            Explore a Solução
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Uma experiência fluida para o Gestor e o Membro
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveTab("gestao")}
            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === "gestao" ? "bg-white text-black scale-105" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
          >
            📊 Dashboard do Gestor
          </button>
          <button 
            onClick={() => setActiveTab("loja")}
            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === "loja" ? "bg-white text-black scale-105" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
          >
            🎁 Loja do Membro
          </button>
          <button 
            onClick={() => setActiveTab("campanhas")}
            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === "campanhas" ? "bg-white text-black scale-105" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
          >
            🎯 Gestão de Campanhas
          </button>
        </div>

        <div className="relative min-h-[400px]">
          {activeTab === "gestao" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 font-heading">Visibilidade Total da Operação</h3>
                <p className="text-white/60 mb-6 leading-relaxed font-sans">
                  O ambiente do Gestor oferece controle absoluto sobre o fluxo de reconhecimento. Do status do pedido a análises de resgates.
                </p>
                <ul className="space-y-4 mb-8 font-sans">
                  <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Monitoramento R$ em tempo real</li>
                  <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Aprovação de orçamentos e saldo</li>
                  <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Base de usuários e permissões granulares</li>
                  <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Exportação de relatórios para o ERP</li>
                </ul>
                <a href="#gestao" className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-transparent px-8 font-bold text-white hover:bg-white/5 transition-colors font-sans">
                  Conhecer Funcionalidades
                </a>
              </div>
              <div className="bg-[#f8fafc] rounded-2xl p-4 md:p-8 border border-white/10 shadow-2xl relative">
                <div className="flex items-center mb-4 gap-2">
                   <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-yellow-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div></div>
                   <span className="text-xs font-bold text-slate-800 ml-2">Visão do Administrador</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="h-16 bg-white border border-slate-200 rounded-xl shadow-sm"></div>
                  <div className="h-16 bg-white border border-slate-200 rounded-xl shadow-sm"></div>
                </div>
                <div className="h-32 bg-white border border-slate-200 rounded-xl shadow-sm"></div>
              </div>
            </motion.div>
          )}

          {activeTab === "loja" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 font-heading">Uma Loja Corporativa VIP</h3>
                <p className="text-white/60 mb-6 leading-relaxed font-sans">
                  Os colaboradores trocam pontos por milhares de produtos do Catálogo Premium Yoobe ou parceiros. Saldo visível, filtros e track & trace.
                </p>
                <ul className="space-y-4 mb-8 font-sans">
                  <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Saldo de Moedas sempre visível</li>
                  <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Filtros por valor e categorias</li>
                  <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Status da entrega com envio à domicílio</li>
                  <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Opções digitais ou kits físicos e SWAGs</li>
                </ul>
                <a href="#loja" className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-orange px-8 font-bold text-white hover:bg-brand-orange-dark transition-colors font-sans">
                  Acessar Catálogo
                </a>
              </div>
              <div className="bg-[#f8fafc] rounded-2xl p-4 md:p-8 border border-white/10 shadow-2xl relative">
                <div className="flex items-center mb-4 gap-2">
                   <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-yellow-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div></div>
                   <span className="text-xs font-bold text-slate-800 ml-2">Visão do Membro</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-2 shadow-sm">
                      <div className="h-16 bg-slate-100 rounded-lg mb-2"></div>
                      <div className="h-2 w-2/3 bg-slate-200 rounded mt-2"></div>
                      <div className="text-[10px] font-bold text-brand-orange mt-2">{(i*0.8).toFixed(1)}k pts</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "campanhas" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 font-heading">Campanhas & Engajamento</h3>
                <p className="text-white/60 mb-6 leading-relaxed font-sans">
                  Regras de negócio com níveis, tags e créditos por performance, tempo de casa ou campanhas temporárias.
                </p>
                <ul className="space-y-4 mb-8 font-sans">
                  <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Campanhas com Badges e Níveis</li>
                  <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> Tags de usuário (ex: Presencial, Híbrido)</li>
                  <li className="flex items-center text-white/80"><span className="text-green-400 mr-3">✓</span> APIs conectam CRM ou RH</li>
                </ul>
                <a href="#gamificacao" className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-transparent px-8 font-bold text-white hover:bg-white/5 transition-colors font-sans">
                  Estratégias de Gamificação
                </a>
              </div>
              <div className="bg-[#f8fafc] rounded-2xl p-4 md:p-8 border border-white/10 shadow-2xl relative text-center">
                <div className="flex items-center mb-4 gap-2 text-left">
                   <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-yellow-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div></div>
                   <span className="text-xs font-bold text-slate-800 ml-2">Setup de Campanha</span>
                </div>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 bg-slate-50">
                  <div className="text-4xl mb-4">⚙️</div>
                  <div className="h-2 w-1/2 mx-auto bg-slate-200 rounded mb-2"></div>
                  <div className="h-2 w-1/3 mx-auto bg-slate-200 rounded mb-6"></div>
                  <button className="bg-brand-navy text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">+ Nova Campanha</button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
