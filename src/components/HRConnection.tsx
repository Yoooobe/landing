"use client";

import { TrendingUp, Users, HeartPulse } from "lucide-react";

export default function HRConnection() {
  return (
    <section className="py-24 bg-brand-navy-dark relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-yoobe-neon-pink rounded-[3rem] blur-2xl opacity-20"></div>
            <div className="relative glass-panel-dark border border-white/10 rounded-[2.5rem] p-10 overflow-hidden">
               {/* UI Placeholder for Dashboard View */}
               <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                 <div className="text-sm font-bold text-white/50 uppercase tracking-widest">Métricas de Engajamento</div>
                 <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">+18% Q3</div>
               </div>
               
               <div className="space-y-6">
                 <div>
                   <div className="flex justify-between items-end mb-2">
                     <div className="text-white font-bold text-xl">eNPS (Net Promoter Score)</div>
                     <div className="text-3xl font-bold text-white">74</div>
                   </div>
                   <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-brand-orange w-[74%] rounded-full"></div>
                   </div>
                 </div>
                 
                 <div>
                   <div className="flex justify-between items-end mb-2">
                     <div className="text-white font-bold text-xl">Taxa de Engajamento (WAU)</div>
                     <div className="text-3xl font-bold text-white">82%</div>
                   </div>
                   <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-yoobe-purple w-[82%] rounded-full"></div>
                   </div>
                 </div>

                 <div>
                   <div className="flex justify-between items-end mb-2">
                     <div className="text-white font-bold text-xl">Redemption Rate</div>
                     <div className="text-3xl font-bold text-white">65%</div>
                   </div>
                   <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-yoobe-neon-pink w-[65%] rounded-full"></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 font-heading">
              Impacto imediato nos KPIs de Recursos Humanos.
            </h2>
            <p className="text-lg text-white/60 mb-10 leading-relaxed">
              Substitua achismos por dados irrevogáveis. Decisões estratégicas de RH baseadas em retenção real, uso diário e mapeamento de influenciadores internos.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10"><TrendingUp className="w-6 h-6 text-brand-orange" /></div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Cálculo de ROI (Retenção)</h4>
                  <p className="text-sm text-white/50">Substituir um talento custa até 200% do seu salário anual. Engajamento real reduz severamente o turnover voluntário.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10"><Users className="w-6 h-6 text-yoobe-purple" /></div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Cross-team Collaboration</h4>
                  <p className="text-sm text-white/50">Através do Peer Recognition (reconhecimento entre colegas), destrua silos de comunicação corporativa.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10"><HeartPulse className="w-6 h-6 text-yoobe-neon-pink" /></div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Onboarding Viciante</h4>
                  <p className="text-sm text-white/50">Corte drasticamente a evasão nos primeiros 45 dias tracionando novos contratados através de missões de boas-vindas.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
