"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, Gift, Filter, Tag } from "lucide-react";

const featureIcons = [Filter, CreditCard] as const;

export default function PlataformaStore() {
  const { m } = useLocaleMessages();
  const s = m.plataforma.store;
  const mock = s.mock;

  return (
    <section className="py-24 bg-[#0f172a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yoobe-purple/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 order-1">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4 flex items-center gap-2 w-fit">
              <ShoppingBag className="w-4 h-4 text-yoobe-purple" />
              {s.badge}
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight font-heading">
              {s.titleBefore}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-brand-orange">{s.titleGradient}</span>
              {s.titleAfter}
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-10 font-light">
              {s.bodyBefore}
              <strong className="text-white">{s.bodyStrong}</strong>
              {s.bodyAfter}
            </p>

            <div className="space-y-6">
              {s.features.map((feat, i) => {
                const Icon = featureIcons[i] ?? Filter;
                return (
                  <div
                    key={feat.title}
                    className="flex items-start gap-4 bg-[#121824] p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                      <Icon className={`w-6 h-6 ${i === 0 ? "text-brand-orange" : "text-yoobe-neon-pink"}`} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{feat.title}</h4>
                      <p className="text-sm text-white/50 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-1/2 order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden bg-[#0d1522] border border-white/10 shadow-2xl"
            >
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#121a2a]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs text-white">Y!</div>
                  <div className="hidden sm:flex gap-4 text-xs font-semibold text-white/50">
                    <span className="text-white">{mock.navFeatured}</span>
                    <span>{mock.navApparel}</span>
                    <span>{mock.navDigital}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yoobe-purple/20 text-yoobe-neon-pink rounded-full border border-yoobe-purple/30">
                    <span className="text-sm font-bold">12.500</span>
                    <span className="text-xs uppercase">{mock.pts}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-white/70" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white font-heading">{mock.weekTitle}</h3>
                  <div className="flex items-center gap-1 text-xs text-white/40">
                    <Tag className="w-3 h-3" /> {mock.filter}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1a2235] p-3 rounded-xl border border-white/5 group hover:border-white/20 transition-all cursor-pointer">
                    <div className="aspect-square bg-[#0f1522] rounded-lg mb-3 flex items-center justify-center p-4 relative overflow-hidden">
                      <div className="absolute top-2 left-2 text-[10px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded-sm">{mock.newBadge}</div>
                      <div className="w-20 h-24 bg-white/5 rounded-md transform group-hover:scale-105 transition-transform"></div>
                    </div>
                    <div className="text-xs text-white/40 mb-1">{mock.p1Category}</div>
                    <div className="font-semibold text-sm text-white mb-2 leading-tight">{mock.p1Name}</div>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-brand-orange">
                        4.500 <span className="text-[10px]">{mock.pts.toUpperCase()}</span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-white/10">+</div>
                    </div>
                  </div>

                  <div className="bg-[#1a2235] p-3 rounded-xl border border-white/5 group hover:border-white/20 transition-all cursor-pointer">
                    <div className="aspect-square bg-[#0f1522] rounded-lg mb-3 flex items-center justify-center p-4">
                      <Gift className="w-12 h-12 text-yoobe-purple opacity-50 transform group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-xs text-white/40 mb-1">{mock.p2Category}</div>
                    <div className="font-semibold text-sm text-white mb-2 leading-tight">{mock.p2Name}</div>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-yoobe-neon-pink">
                        1.200 <span className="text-[10px]">{mock.pts.toUpperCase()}</span>
                      </div>
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
