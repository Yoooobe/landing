"use client";

import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, Gift, Filter, Tag } from "lucide-react";

export default function PlataformaStore() {
  const storeFeatures = [
    {
      icon: <Filter className="w-6 h-6 text-brand-orange" />,
      title: "Experiência B2C para B2B",
      desc: "Filtros, categorias, mockups detalhados de produtos impressos, e checkouts velozes e transparentes no valor em \"moedas\" que sua empresa estipulou."
    },
    {
      icon: <CreditCard className="w-6 h-6 text-yoobe-neon-pink" />,
      title: "Mix Físico & Digital",
      desc: "Incorpore aos Swags os GiftCards p/ Ifood, Uber, Streaming ou Cartões Presente VISA, abrigando qualquer preferência das mais variadas gerações no trabalho."
    }
  ];

  return (
    <section className="py-24 bg-[#0f172a] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yoobe-purple/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Content */}
          <div className="w-full lg:w-1/2 order-1">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4 flex items-center gap-2 w-fit">
              <ShoppingBag className="w-4 h-4 text-yoobe-purple" />
              Catálogo Premium VIP
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight font-heading">
              Uma loja VIP com a marca da sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-brand-orange">empresa</span>.
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-10 font-light">
              Esqueça gerenciar estoques ou comprar produtos que seus funcionários sequer querem. A Yoobe preenche automaticamente a loja com mais de 5.000 SWAGs de alta qualidade com a <strong className="text-white">MARCA DA SUA EMPRESA</strong> e envios on-demand.
            </p>

            <div className="space-y-6">
              {storeFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-4 bg-[#121824] p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{feat.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* E-commerce UI Mockup */}
          <div className="w-full lg:w-1/2 order-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden bg-[#0d1522] border border-white/10 shadow-2xl"
            >
              {/* Store Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#121a2a]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs text-white">Y!</div>
                  <div className="hidden sm:flex gap-4 text-xs font-semibold text-white/50">
                    <span className="text-white">Destaques</span>
                    <span>Vestuário</span>
                    <span>Digital</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yoobe-purple/20 text-yoobe-neon-pink rounded-full border border-yoobe-purple/30">
                    <span className="text-sm font-bold">12.500</span>
                    <span className="text-xs uppercase">Pts</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-white/70" />
                  </div>
                </div>
              </div>

              {/* Store Grid */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white font-heading">Lançamentos da Semana</h3>
                  <div className="flex items-center gap-1 text-xs text-white/40"><Tag className="w-3 h-3"/> Filtrar</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Product 1 */}
                  <div className="bg-[#1a2235] p-3 rounded-xl border border-white/5 group hover:border-white/20 transition-all cursor-pointer">
                    <div className="aspect-square bg-[#0f1522] rounded-lg mb-3 flex items-center justify-center p-4 relative overflow-hidden">
                      <div className="absolute top-2 left-2 text-[10px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded-sm">NOVO</div>
                      {/* Fake Image Placeholder */}
                      <div className="w-20 h-24 bg-white/5 rounded-md transform group-hover:scale-105 transition-transform"></div>
                    </div>
                    <div className="text-xs text-white/40 mb-1">Vestuário</div>
                    <div className="font-semibold text-sm text-white mb-2 leading-tight">Moletom Premium Logo Yoobe</div>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-brand-orange">4.500 <span className="text-[10px]">PTS</span></div>
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-white/10">+</div>
                    </div>
                  </div>

                  {/* Product 2 */}
                  <div className="bg-[#1a2235] p-3 rounded-xl border border-white/5 group hover:border-white/20 transition-all cursor-pointer">
                    <div className="aspect-square bg-[#0f1522] rounded-lg mb-3 flex items-center justify-center p-4">
                       <Gift className="w-12 h-12 text-yoobe-purple opacity-50 transform group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-xs text-white/40 mb-1">Digital</div>
                    <div className="font-semibold text-sm text-white mb-2 leading-tight">Gift Card iFood R$ 100,00</div>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-yoobe-neon-pink">1.200 <span className="text-[10px]">PTS</span></div>
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-white/10">+</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
