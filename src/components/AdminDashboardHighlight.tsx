"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Users, PackageOpen } from "lucide-react";

export default function AdminDashboardHighlight() {
  return (
    <section className="py-24 bg-brand-navy-dark relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Detailed Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[60%] order-2 lg:order-1 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-red-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0d1117] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {/* Fake Browser Title Bar */}
              <div className="h-10 bg-[#161b22] border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="mx-auto px-4 py-1 bg-white/5 rounded-md text-[10px] text-white/40 font-mono">admin.yoobe.co</div>
              </div>
              
              <div className="flex">
                {/* Sidebar */}
                <div className="w-16 md:w-48 bg-[#161b22] border-r border-white/5 p-4 flex flex-col gap-4">
                  <div className="hidden md:block text-[10px] font-bold text-white/30 uppercase mt-2">Visão Geral</div>
                  <div className="h-8 md:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center md:justify-start md:px-3 text-white/80 gap-3">
                    <LayoutDashboard className="w-4 h-4 text-brand-orange" />
                    <span className="hidden md:block text-xs font-semibold">Dashboard</span>
                  </div>
                  <div className="h-8 md:h-10 rounded-lg hover:bg-white/5 border border-transparent flex items-center justify-center md:justify-start md:px-3 text-white/50 gap-3">
                    <Users className="w-4 h-4" />
                    <span className="hidden md:block text-xs font-medium">Contas (Wallets)</span>
                  </div>
                  <div className="h-8 md:h-10 rounded-lg hover:bg-white/5 border border-transparent flex items-center justify-center md:justify-start md:px-3 text-white/50 gap-3">
                    <PackageOpen className="w-4 h-4" />
                    <span className="hidden md:block text-xs font-medium">Estoque & Envios</span>
                  </div>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-white font-bold text-lg font-heading">Performance da Operação</h3>
                      <div className="text-xs text-brand-orange mt-1">Atualizado há 1 minuto</div>
                    </div>
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/60">Últimos 30 dias</div>
                  </div>
                  
                  {/* Graph Placeholder using CSS */}
                  <div className="h-40 w-full bg-[#161b22] rounded-xl border border-white/5 flex items-end justify-between p-4 gap-2 mb-6">
                     {[40, 70, 45, 90, 65, 80, 50, 100, 75, 85, 60, 95].map((height, i) => (
                       <div key={i} className="w-full relative group">
                         <div 
                           className={`w-full rounded-t-sm transition-all duration-500 ${i === 7 ? 'bg-brand-orange' : 'bg-white/10 hover:bg-white/20'}`} 
                           style={{ height: `${height}%` }}
                         />
                       </div>
                     ))}
                  </div>
                  
                  {/* Stats Bottom */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#161b22] rounded-xl border border-white/5 p-4">
                      <div className="text-[10px] text-white/40 uppercase font-bold mb-1">Custo Logístico (SLA)</div>
                      <div className="text-xl font-bold text-white">R$ 12.450</div>
                      <div className="text-[10px] text-green-400 mt-1">↓ 4.2% vs mês anterior</div>
                    </div>
                    <div className="bg-[#161b22] rounded-xl border border-white/5 p-4">
                      <div className="text-[10px] text-white/40 uppercase font-bold mb-1">Nível de Serviço</div>
                      <div className="text-xl font-bold text-white">99.8%</div>
                      <div className="text-[10px] text-white/50 mt-1">Entregas no prazo</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Content */}
          <div className="w-full lg:w-[40%] order-1 lg:order-2">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4 font-sans">
              Painel do Gestor (Admin)
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 font-heading">Governe as regras do <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-brand-orange">jogo</span>.</h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8 font-sans">
              O ambiente onde supervisores, RH e gestores orçamentais governam as regras. Inspirado em painéis de e-commerce e ERPs, mantendo visibilidade 100% sobre R$, prazos e entregas logísticas dos prêmios.
            </p>
            <ul className="space-y-6 font-sans">
              <li className="flex items-start gap-4">
                <div className="min-w-8 min-h-8 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg font-heading">Monitoramento de SLA&apos;s</h4>
                  <p className="text-sm text-white/50 mt-1">Saiba extamente onde está cada kit enviado para a casa dos funcionários corporativos com rastreio Last-Mile integrado D+1.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="min-w-8 min-h-8 w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-brand-orange"></div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg font-heading">Centros de Custo (Budgeting)</h4>
                  <p className="text-sm text-white/50 mt-1">Controle aprovações, segregue faturamentos por departamentos e emita relatórios unificados para o time financeiro sem planilhas soltas.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="min-w-8 min-h-8 w-8 h-8 rounded-full bg-yoobe-purple/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-yoobe-purple"></div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg font-heading">Base de Usuários & Níveis</h4>
                  <p className="text-sm text-white/50 mt-1">Mapeie cargos, determine o balanço inicial de moedas e crie grupos operacionais e administrativos separados.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="min-w-8 min-h-8 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg font-heading">Gráficos Visuais (BI)</h4>
                  <p className="text-sm text-white/50 mt-1">Identifique os itens mais resgatados do trimestre. Monitore o índice de satisfação contínua da equipe.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
