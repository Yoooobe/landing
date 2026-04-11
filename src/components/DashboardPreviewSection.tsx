"use client";

import { withBasePath } from "@/lib/basePath";
import { motion } from "framer-motion";
import Image from "next/image";

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
    <section className="relative overflow-hidden bg-brand-cream py-20 md:py-32">
      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Central glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 shadow-sm mb-5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-unik-blue animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
              Dashboard ao vivo
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="font-heading text-3xl font-black text-gray-900 md:text-5xl mb-4"
          >
            Visão completa do{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #2563eb, #8338ec)" }}
            >
              seu negócio
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.13 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
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
              <div className="rounded-2xl border border-black/8 bg-white px-4 py-3 shadow-lg shadow-black/10 min-w-[120px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: m.color }}
                  />
                  <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-gray-400">
                    {m.label}
                  </span>
                </div>
                <div
                  className="font-heading text-2xl font-black"
                  style={{ color: m.color }}
                >
                  {m.value}
                </div>
                <div className="text-[0.62rem] text-gray-400 mt-0.5">{m.sub}</div>
              </div>
            </motion.div>
          ))}

          {/* Screenshot frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/15"
          >
            {/* Shimmer border glow on hover */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, #2563eb40, #8338ec40, #f98f1640, #2563eb40)",
                backgroundSize: "300% 300%",
                animation: "shimmer 3s ease infinite",
              }}
            />

            {/* Browser chrome */}
            <div className="flex items-center justify-between border-b border-black/8 bg-gray-50 px-5 py-3">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-unik-blue" />
                <span className="font-mono text-[0.62rem] text-gray-400 tracking-wider">
                  gestor.4unik.io · Dashboard
                </span>
              </div>
              <span className="rounded-full border border-unik-blue/20 bg-unik-blue/8 px-3 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-widest text-unik-blue">
                Ao vivo
              </span>
            </div>

            {/* Screenshot */}
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <Image
                src={withBasePath("/screens/admin-dashboard.webp")}
                alt="Dashboard do gestor 4unik"
                fill
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-cover object-top"
                unoptimized
                decoding="async"
              />
              {/* Subtle bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-white/30 to-transparent" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-black/8 bg-gray-50 px-5 py-2.5">
              <div className="flex items-center gap-3">
                {["Pedidos", "Faturamento", "Usuários", "Pontos"].map((label, i) => (
                  <span
                    key={label}
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold"
                    style={{
                      backgroundColor: ["#2563eb","#f98f16","#8338ec","#22d3ee"][i] + "18",
                      color: ["#2563eb","#f98f16","#8338ec","#22d3ee"][i],
                    }}
                  >
                    <span className="h-1 w-1 rounded-full" style={{ backgroundColor: ["#2563eb","#f98f16","#8338ec","#22d3ee"][i] }} />
                    {label}
                  </span>
                ))}
              </div>
              <span className="text-[0.6rem] font-mono text-gray-400">Últimos 30 dias</span>
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
              className="rounded-2xl border border-black/8 bg-white px-4 py-3 shadow-sm text-center"
            >
              <div
                className="font-heading text-2xl font-black"
                style={{ color: m.color }}
              >
                {m.value}
              </div>
              <div className="text-xs font-semibold text-gray-500 mt-0.5">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
