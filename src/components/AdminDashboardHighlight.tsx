"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, PackageOpen } from "lucide-react";

export default function AdminDashboardHighlight() {
  const { m } = useLocaleMessages();
  const d = m.plataforma.adminDashboard;
  const mock = d.mock;

  return (
    <section className="py-24 bg-brand-navy-dark relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[60%] order-2 lg:order-1 relative"
          >
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-brand-orange via-unik-blue to-demo-cyan opacity-20 blur transition duration-1000 group-hover:opacity-40 group-hover:duration-200"></div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-page shadow-2xl">
              <div className="flex h-10 items-center gap-2 border-b border-white/5 bg-surface-elevated px-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="mx-auto px-4 py-1 bg-white/5 rounded-md text-[10px] text-white/40 font-mono">admin.yoobe.co</div>
              </div>

              <div className="flex">
                <div className="flex w-16 flex-col gap-4 border-r border-white/5 bg-surface-elevated p-4 md:w-48">
                  <div className="hidden md:block text-[10px] font-bold text-white/30 uppercase mt-2">{mock.sidebarOverview}</div>
                  <div className="h-8 md:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center md:justify-start md:px-3 text-white/80 gap-3">
                    <LayoutDashboard className="w-4 h-4 text-brand-orange" />
                    <span className="hidden md:block text-xs font-semibold">{mock.sidebarDashboard}</span>
                  </div>
                  <div className="h-8 md:h-10 rounded-lg hover:bg-white/5 border border-transparent flex items-center justify-center md:justify-start md:px-3 text-white/50 gap-3">
                    <Users className="w-4 h-4" />
                    <span className="hidden md:block text-xs font-medium">{mock.sidebarWallets}</span>
                  </div>
                  <div className="h-8 md:h-10 rounded-lg hover:bg-white/5 border border-transparent flex items-center justify-center md:justify-start md:px-3 text-white/50 gap-3">
                    <PackageOpen className="w-4 h-4" />
                    <span className="hidden md:block text-xs font-medium">{mock.sidebarStock}</span>
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-white font-bold text-lg font-heading">{mock.chartTitle}</h3>
                      <div className="text-xs text-brand-orange mt-1">{mock.chartUpdated}</div>
                    </div>
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/60">{mock.chartRange}</div>
                  </div>

                  <div className="mb-6 flex h-40 w-full items-end justify-between gap-2 rounded-xl border border-white/5 bg-surface-elevated p-4">
                    {[40, 70, 45, 90, 65, 80, 50, 100, 75, 85, 60, 95].map((height, i) => (
                      <div key={i} className="w-full relative group">
                        <div
                          className={`w-full rounded-t-sm transition-all duration-500 ${i === 7 ? "bg-brand-orange" : "bg-white/10 hover:bg-white/20"}`}
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-white/5 bg-surface-elevated p-4">
                      <div className="text-[10px] text-white/40 uppercase font-bold mb-1">{mock.statLeftLabel}</div>
                      <div className="text-xl font-bold text-white">{mock.statLeftValue}</div>
                      <div className="text-[10px] text-green-400 mt-1">{mock.statLeftTrend}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-surface-elevated p-4">
                      <div className="text-[10px] text-white/40 uppercase font-bold mb-1">{mock.statRightLabel}</div>
                      <div className="text-xl font-bold text-white">{mock.statRightValue}</div>
                      <div className="text-[10px] text-white/50 mt-1">{mock.statRightSub}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="w-full lg:w-[40%] order-1 lg:order-2">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4 font-sans">
              {d.badge}
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 font-heading">
              {d.titleBefore}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple via-unik-blue-soft to-brand-orange">
                {d.titleGradient}
              </span>
              {d.titleAfter}
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8 font-sans">{d.body}</p>
            <ul className="space-y-6 font-sans">
              {d.bullets.map((item, i) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div
                    className={`min-w-8 min-h-8 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                      i === 0
                        ? "bg-unik-blue/20"
                        : i === 1
                          ? "bg-brand-orange/20"
                          : i === 2
                            ? "bg-yoobe-purple/20"
                            : "bg-green-500/20"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        i === 0
                          ? "bg-unik-blue"
                          : i === 1
                            ? "bg-brand-orange"
                            : i === 2
                              ? "bg-yoobe-purple"
                              : "bg-green-500"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg font-heading">{item.title}</h4>
                    <p className="text-sm text-white/50 mt-1">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
