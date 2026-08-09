"use client";

import { withBasePath } from "@/lib/basePath";
import Image from "next/image";
import { ZoomableScreenshot } from "@/components/ui/ScreenshotLightbox";
import { motion } from "framer-motion";

type MetricCard = {
  label: string;
  value: string;
  sub: string;
  color: string;
  posClass: string;
  delay: number;
};

const METRICS: MetricCard[] = [
  {
    label: "Pedidos",
    value: "13",
    sub: "no período",
    color: "#2563eb",
    posClass: "top-[6%] left-[-2%] lg:left-[-5%]",
    delay: 0.2,
  },
  {
    label: "Faturamento",
    value: "R$2.400",
    sub: "no período",
    color: "#f98f16",
    posClass: "top-[6%] right-[-2%] lg:right-[-5%]",
    delay: 0.32,
  },
  {
    label: "Usuários",
    value: "178",
    sub: "ativos",
    color: "#8338ec",
    posClass: "bottom-[8%] left-[-2%] lg:left-[-5%]",
    delay: 0.44,
  },
  {
    label: "Pts Resgatados",
    value: "91",
    sub: "no período",
    color: "#22d3ee",
    posClass: "bottom-[8%] right-[-2%] lg:right-[-5%]",
    delay: 0.56,
  },
];

export default function DashboardPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy-dark py-20 md:py-32 border-t border-white/5">
      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Central glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/12 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/70">
              Painel em Tempo Real
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="font-heading text-3xl font-black text-white md:text-5xl mb-4"
          >
            Visão completa do{" "}
            <span className="bg-linear-to-r from-unik-blue-soft via-brand-orange to-yoobe-neon-pink bg-clip-text text-transparent">
              seu programa
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.13 }}
            className="text-lg text-white/60 max-w-2xl mx-auto font-sans"
          >
            Métricas de pedidos, faturamento, usuários e pontos em um único painel — atualizado em tempo real.
          </motion.p>
        </div>

        {/* Screenshot with floating metric cards */}
        <div className="relative px-4 sm:px-10 lg:px-16">
          {/* Floating metric cards */}
          {METRICS.map((m) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: m.delay, type: "spring", stiffness: 200, damping: 18 }}
              className={`absolute z-20 hidden md:block ${m.posClass}`}
              style={{ animation: "float 7s ease-in-out infinite" }}
            >
              <div className="glass-panel-dark min-w-[130px] rounded-2xl border border-white/15 bg-slate-900/90 px-4 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <div className="mb-1 flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full animate-pulse"
                      style={{ backgroundColor: m.color }}
                    />
                    <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-white/50">
                      {m.label}
                    </span>
                  </div>
                </div>
                <div
                  className="font-heading text-2xl font-black text-white"
                >
                  {m.value}
                </div>
                <div className="mt-0.5 text-[0.62rem] text-white/45 font-sans">{m.sub}</div>
              </div>
            </motion.div>
          ))}

          {/* Screenshot frame (ICP Communities window frame standard) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.65)] backdrop-blur-md"
          >
            {/* Browser chrome */}
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-5 py-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-4 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
                <span className="font-mono text-[0.62rem] text-white/50 tracking-wider">
                  gestor.4unik.io · Painel Principal
                </span>
              </div>
              <span className="rounded-full border border-brand-orange/30 bg-brand-orange/15 px-3 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-widest text-brand-orange">
                Ao vivo
              </span>
            </div>

            {/* Screenshot */}
            <div className="relative w-full bg-slate-900" style={{ aspectRatio: "16/10" }}>
              <ZoomableScreenshot
                src="/screens/dash/dashboard-geral.webp"
                alt="Dashboard do gestor 4unik"
                sizes="(min-width: 1024px) 70vw, 100vw"
                imgClassName="object-cover object-top"
                className="absolute inset-0 h-full w-full"
                unoptimized
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-slate-950/60 to-transparent" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/10 bg-slate-900 px-5 py-2.5">
              <div className="flex items-center gap-3">
                {["Pedidos", "Faturamento", "Usuários", "Pontos"].map((label, i) => (
                  <span
                    key={label}
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[0.6rem] font-semibold text-white/80 backdrop-blur-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ["#2563eb","#f98f16","#8338ec","#22d3ee"][i] }} />
                    {label}
                  </span>
                ))}
              </div>
              <span className="text-[0.6rem] font-mono text-white/40">Atualizado agora · 4Unik Engine v2</span>
            </div>
          </motion.div>

          {/* Floating Mobile Smartphone device mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.8, type: "spring" }}
            className="absolute -bottom-8 -left-1 z-30 hidden w-[180px] sm:w-[210px] md:block lg:-left-6 lg:w-[230px]"
            style={{ animation: "float 8s ease-in-out infinite 1s" }}
          >
            <div className="relative overflow-hidden rounded-[2.2rem] border-[5px] border-slate-900 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/20">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 h-3 w-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-end px-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Mobile Bar */}
              <div className="bg-slate-900 px-3 pt-6 pb-2 text-white text-center border-b border-white/10">
                <span className="font-mono font-bold text-[0.62rem] tracking-wider uppercase text-brand-orange">loja.4unik.io</span>
              </div>

              {/* Mobile Real Screenshot */}
              <div className="relative w-full bg-slate-900" style={{ aspectRatio: "9/17.5" }}>
                <Image
                  src={withBasePath("/screens/member-store-home.webp")}
                  alt="App Mobile 4unik com loja e recompensas"
                  fill
                  className="object-cover object-top"
                  sizes="230px"
                />
                {/* Floating balance badge overlay */}
                <div className="absolute bottom-3 left-2 right-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-white/15 p-2 text-center text-white shadow-lg">
                  <div className="text-[0.55rem] font-medium text-gray-300">Saldo do Colaborador</div>
                  <div className="font-heading text-sm font-black text-brand-orange">1.250 4UCoins</div>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="bg-slate-950 py-1.5 flex justify-center">
                <div className="h-1 w-16 rounded-full bg-white/40" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 grid grid-cols-2 gap-4 md:hidden"
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="glass-panel-dark rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-center shadow-sm"
            >
              <div className="font-heading text-2xl font-black text-white">
                {m.value}
              </div>
              <div className="text-xs font-semibold text-white/50 mt-0.5">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
