"use client";

import { useState } from "react";
import { Sparkles, Send, Gift, Users, CreditCard, Activity, Zap, Check } from "lucide-react";

export default function AiFeatureMockups() {
  const [activeTab, setActiveTab] = useState<"campaign" | "kit" | "recommendation">("campaign");

  return (
    <section className="py-24 bg-[#0a0f18] relative overflow-hidden font-sans border-t border-white/5">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-yoobe-purple/10 blur-[130px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 mb-6">
            <Sparkles className="h-4 w-4 text-yoobe-purple" />
            <span className="text-sm font-semibold text-yoobe-purple uppercase tracking-wider">Preview da Plataforma</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Veja a inteligência em ação
          </h2>
          <p className="text-xl text-white/70">
            Descubra como os assistentes agênticos da 4Unik vão transformar horas de planejamento operacional em segundos de orquestração.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab("campaign")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === "campaign"
                ? "bg-white text-brand-navy-dark shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            <Zap className="h-4 w-4" />
            AI Campaign Builder
          </button>
          <button
            onClick={() => setActiveTab("kit")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === "kit"
                ? "bg-yoobe-purple text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            <Gift className="h-4 w-4" />
            AI Kit Builder
          </button>
          <button
            onClick={() => setActiveTab("recommendation")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === "recommendation"
                ? "bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            <Activity className="h-4 w-4" />
            Smart Recommendations
          </button>
        </div>

        {/* Mockup Container */}
        <div className="max-w-5xl mx-auto">
          {activeTab === "campaign" && <CampaignBuilderMockup />}
          {activeTab === "kit" && <KitBuilderMockup />}
          {activeTab === "recommendation" && <RecommendationMockup />}
        </div>
      </div>
    </section>
  );
}

// --- Specific Mockup Components ---

function CampaignBuilderMockup() {
  return (
    <div className="glass-panel-dark rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-[500px] animate-in fade-in slide-in-from-bottom-5 duration-500">
      {/* Left side: Prompt input */}
      <div className="w-full md:w-1/3 bg-black/40 border-r border-white/10 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-brand-orange/20 p-2 rounded-lg">
              <Sparkles className="h-5 w-5 text-brand-orange" />
            </div>
            <h3 className="text-white font-bold">Assistente de Campanha</h3>
          </div>
          <p className="text-sm text-white/50 mb-6">
            Descreva a intenção da sua campanha. A inteligência irá gerar prazos, orçamentos, públicos e métricas recomendadas.
          </p>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative mb-4">
            <p className="text-sm text-white/90 leading-relaxed font-mono">
              &quot;Quero uma campanha de engajamento para o time de vendas LatAm. O objetivo é aumentar os registros no CRM em 20%. Budget total de R$ 15.000 para os top 5.&quot;
            </p>
          </div>
        </div>

        <div className="relative">
          <input 
            type="text" 
            disabled 
            placeholder="Gerando campanha..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-10 py-3 text-sm text-white/50 cursor-not-allowed"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50">
            <Send className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* Right side: Generated Campaign Output */}
      <div className="w-full md:w-2/3 bg-[#0a0f18] p-6 lg:p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-white font-heading">Sprint CRM LatAm 🚀</h3>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Pronto para Lançar
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
            <Users className="h-5 w-5 text-cyan-400 mt-0.5" />
            <div>
              <div className="text-xs text-white/50 uppercase font-semibold mb-1">Público-alvo</div>
              <div className="text-white font-medium">Vendas LatAm (142 pessoas)</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
            <CreditCard className="h-5 w-5 text-yoobe-purple mt-0.5" />
            <div>
              <div className="text-xs text-white/50 uppercase font-semibold mb-1">Budget Alocado</div>
              <div className="text-white font-medium">R$ 15.000,00</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-bold text-white/80 uppercase mb-3">Modelo de premiação gerado</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white/2 border border-white/5 p-3 rounded-lg">
              <span className="text-white/80 text-sm">1º Lugar</span>
              <span className="text-brand-orange font-bold text-sm">50.000 pts (R$ 5.000)</span>
            </div>
            <div className="flex items-center justify-between bg-white/2 border border-white/5 p-3 rounded-lg">
              <span className="text-white/80 text-sm">2º Lugar</span>
              <span className="text-white/90 font-bold text-sm">35.000 pts (R$ 3.500)</span>
            </div>
            <div className="flex items-center justify-between bg-white/2 border border-white/5 p-3 rounded-lg">
              <span className="text-white/80 text-sm">3º Lugar</span>
              <span className="text-white/90 font-bold text-sm">25.000 pts (R$ 2.500)</span>
            </div>
          </div>
        </div>

        <div>
           <h4 className="text-sm font-bold text-white/80 uppercase mb-3">Copy sugerido (Comunicação)</h4>
           <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-white/70 italic relative">
             <div className="absolute top-2 right-2 text-xs bg-black/50 text-white/50 px-2 py-1 rounded">Feed Workvivo</div>
             &quot;Equipe de Vendas LatAm! Preparados para acelerar os resultados? Nossa nova campanha Sprint CRM LatAm está no ar! Os 5 maiores registradores...&quot;
           </div>
        </div>
      </div>
    </div>
  );
}

function KitBuilderMockup() {
  return (
    <div className="glass-panel-dark rounded-2xl border border-yoobe-purple/20 overflow-hidden shadow-[0_10px_40px_rgba(147,51,234,0.1)] flex flex-col md:flex-row h-auto md:h-[500px] animate-in fade-in slide-in-from-bottom-5 duration-500">
      {/* Left side: Prompt input */}
      <div className="w-full md:w-1/3 bg-black/40 border-r border-white/10 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-yoobe-purple/20 p-2 rounded-lg">
              <Gift className="h-5 w-5 text-yoobe-purple" />
            </div>
            <h3 className="text-white font-bold">Assistente de Kits</h3>
          </div>
          <p className="text-sm text-white/50 mb-6">
            O assistente analisa o catálogo corporativo global e monta a melhor combinação de itens para seu budget.
          </p>
          
          <div className="bg-yoobe-purple/5 border border-yoobe-purple/20 rounded-xl p-4 relative mb-4">
            <p className="text-sm text-white/90 leading-relaxed font-mono">
              &quot;Preciso montar o kit de onboarding para nossos novos desenvolvedores remotos (nível Senior). Quero algo premium e tecnológico. Budget de até R$ 350 por pessoa.&quot;
            </p>
          </div>
        </div>

        <div className="relative">
          <input 
            type="text" 
            disabled 
            placeholder="Montando composição..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-10 py-3 text-sm text-white/50 cursor-not-allowed"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50">
            <Send className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* Right side: Generated Kit Output */}
      <div className="w-full md:w-2/3 bg-[#0a0f18] p-6 lg:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white font-heading">Kit Tech Senior Onboarding</h3>
          <div className="text-right">
            <div className="text-xs text-white/50 uppercase font-bold">Custo Estimado</div>
            <div className="text-xl font-bold text-yoobe-purple">R$ 342,50 <span className="text-sm text-white/40 font-normal">/kit</span></div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min overflow-y-auto pr-2">
          {/* Item 1 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-center hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-white/10 rounded-lg shrink-0 flex items-center justify-center">
              <span className="text-2xl">🎒</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm mb-1">Mochila Executiva Dell Pro</div>
              <div className="text-xs text-white/50">Customização em bordado 3D</div>
            </div>
          </div>
          
          {/* Item 2 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-center hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-white/10 rounded-lg shrink-0 flex items-center justify-center">
              <span className="text-2xl">🔋</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm mb-1">Powerbank Anker 10.000mAh</div>
              <div className="text-xs text-white/50">Customização UV lateral</div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-center hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-white/10 rounded-lg shrink-0 flex items-center justify-center">
              <span className="text-2xl">☕</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm mb-1">Copo Térmico Coleman Preto</div>
              <div className="text-xs text-white/50">Gravação a laser (Logo)</div>
            </div>
          </div>
          
          {/* Item 4 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-center hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-white/10 rounded-lg shrink-0 flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm mb-1">Embalagem Premium Preta</div>
              <div className="text-xs text-white/50">Fita lacre laranja 4Unik</div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="text-sm text-emerald-400 flex items-center gap-2 font-medium">
              <Check className="h-4 w-4" /> 100% dos itens em estoque
            </div>
            <button className="bg-yoobe-purple hover:bg-yoobe-purple/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)]">
              Aprovar Mockup
            </button>
        </div>
      </div>
    </div>
  );
}

function RecommendationMockup() {
  return (
    <div className="glass-panel-dark rounded-2xl border border-cyan-500/20 overflow-hidden shadow-[0_10px_40px_rgba(6,182,212,0.1)] flex flex-col md:flex-row h-auto md:h-[500px] animate-in fade-in slide-in-from-bottom-5 duration-500">
      {/* Left side: Context (Hidden on mobile usually, but keeping for layout parity) */}
      <div className="w-full md:w-1/3 bg-black/40 border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-cyan-500/20 p-2 rounded-lg">
            <Activity className="h-5 w-5 text-cyan-400" />
          </div>
          <h3 className="text-white font-bold">Smart Recommendations</h3>
        </div>
        <p className="text-sm text-white/50 mb-8">
          A inteligência molda a vitrine de cada colaborador baseando-se em eventos recentes, saldo e perfil de vida.
        </p>

        <div className="bg-white/5 rounded-xl p-5 border border-white/5 mb-4 flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-cyan-400 to-yoobe-purple"></div>
            <div>
              <div className="text-white font-bold text-sm">Carlos Andrade</div>
              <div className="text-xs text-white/50">Engenharia • Saldo: 12.500 pts</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-[10px] uppercase font-bold text-cyan-400 mb-1">Gatilho Detectado (Workvivo)</div>
              <div className="text-sm text-white/80 border-l-2 border-cyan-400 pl-2">Carlos completou 5 anos de empresa hoje (Aniversário de Casa).</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-yoobe-purple mb-1">Perfil Histórico</div>
              <div className="text-sm text-white/80 border-l-2 border-yoobe-purple pl-2">Alta preferência por resgates de Viagens e Gastronomia.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Personalized UI for User */}
      <div className="w-full md:w-2/3 bg-[#0a0f18] p-6 lg:p-8 flex flex-col">
        <div className="mb-6">
           <h3 className="text-2xl font-bold text-white font-heading mb-1">Parabéns pelos 5 anos, Carlos! 🎉</h3>
           <p className="text-white/60 text-sm">Separamos algumas opções perfeitas para o seu saldo atual (12.500 pts).</p>
        </div>

        <div className="grid grid-cols-2 gap-4 overflow-y-auto pb-4 pr-2">
           {/* Reco 1 */}
           <div className="bg-white/5 border border-cyan-500/30 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer relative">
             <div className="absolute top-2 left-2 bg-cyan-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">Alta Relevância</div>
             <div className="h-32 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
               <span className="text-4xl">✈️</span>
             </div>
             <div className="p-4">
               <div className="text-white font-bold text-sm mb-1 line-clamp-1">Voucher Voo Nacional + Hotel</div>
               <div className="text-cyan-400 font-bold text-sm">12.000 pts</div>
             </div>
           </div>

           {/* Reco 2 */}
           <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer">
             <div className="h-32 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
               <span className="text-4xl">🍽️</span>
             </div>
             <div className="p-4">
               <div className="text-white font-bold text-sm mb-1 line-clamp-1">Jantar a dois Fogo de Chão</div>
               <div className="text-white/80 font-bold text-sm">8.500 pts</div>
             </div>
           </div>
           
           {/* Reco 3 */}
           <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer">
             <div className="h-32 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
               <span className="text-4xl">🍷</span>
             </div>
             <div className="p-4">
               <div className="text-white font-bold text-sm mb-1 line-clamp-1">Kit Vinhos Grand Reserva</div>
               <div className="text-white/80 font-bold text-sm">11.000 pts</div>
             </div>
           </div>
           
           {/* Reco 4 */}
           <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer">
             <div className="h-32 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
               <span className="text-4xl">🎧</span>
             </div>
             <div className="p-4">
               <div className="text-white font-bold text-sm mb-1 line-clamp-1">Headphone Noise Cancelling</div>
               <div className="text-white/80 font-bold text-sm">9.500 pts</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
