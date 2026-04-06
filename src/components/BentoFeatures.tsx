"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Trophy, Package, LayoutDashboard } from "lucide-react";

export default function BentoFeatures() {
  const { m, path } = useLocaleMessages();
  const b = m.bento;

  return (
    <section id="platform" className="section-gradient-bg relative overflow-hidden py-24">
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-brand-orange/10 blur-[100px] pointer-events-none"></div>
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-yoobe-purple/10 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-yoobe-purple">
            {b.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">
            {b.titleLine1} <br className="hidden md:block" />
            {b.titleLine2}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/60">{b.sub}</p>
        </div>

        <div className="grid auto-rows-[320px] grid-cols-1 gap-6 md:grid-cols-3">
          <motion.a
            href={withBasePath(path("/plataforma"))}
            whileHover={{ y: -5 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 glass-panel-dark p-8 md:col-span-2"
          >
            <div className="relative z-10 max-w-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange to-red-500">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-heading text-2xl font-bold text-white transition-colors group-hover:text-brand-orange">{b.card1.title}</h3>
              <p className="mb-6 font-sans text-sm leading-relaxed text-white/60">{b.card1.body}</p>
              <div className="flex items-center font-sans text-sm font-semibold text-brand-orange">
                {b.card1.cta} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            <div className="absolute top-1/2 right-[-5%] h-full w-3/5 translate-y-[-20%] transform overflow-hidden rounded-tl-2xl border-l border-t border-white/10 bg-brand-charcoal/80 p-4 shadow-2xl transition-all duration-500 group-hover:translate-y-[-25%] group-hover:scale-105">
              <div className="mb-4 flex items-center justify-between">
                <div className="font-sans text-xs font-bold text-white">{b.mockMonth}</div>
                <div className="rounded bg-white/5 px-2 py-1 font-sans text-[10px] text-white/50">{b.mockDate}</div>
              </div>
              <div className="space-y-3">
                <div className="flex h-12 w-full items-center justify-between rounded-lg border border-white/5 bg-white/5 px-4">
                  <div className="font-sans text-[10px] uppercase text-white/40">{b.mockRev}</div>
                  <div className="font-sans text-sm font-bold text-white">R$ 142.050,00</div>
                </div>
                <div className="flex h-12 w-full items-center justify-between rounded-lg border border-white/5 bg-white/5 px-4">
                  <div className="font-sans text-[10px] uppercase text-white/40">{b.mockRed}</div>
                  <div className="font-sans text-sm font-bold text-white">3.402 itens</div>
                </div>
                <div className="flex h-12 w-full items-center justify-between rounded-lg border border-white/5 bg-white/5 px-4">
                  <div className="font-sans text-[10px] uppercase text-white/40">{b.mockSla}</div>
                  <div className="font-sans text-sm font-bold text-green-400">99.1%</div>
                </div>
              </div>
            </div>
          </motion.a>

          <motion.a
            href={withBasePath(path("/gamificacao"))}
            whileHover={{ y: -5 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 glass-panel-dark p-8"
          >
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yoobe-purple to-pink-500">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-white transition-colors group-hover:text-yoobe-neon-pink">{b.card2.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-white/60">{b.card2.body}</p>
            </div>
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-yoobe-purple/20 blur-2xl"></div>
          </motion.a>

          <motion.a
            href={`${withBasePath(path("/plataforma"))}#loja`}
            whileHover={{ y: -5 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 glass-panel-dark p-8"
          >
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-white transition-colors group-hover:text-green-400">{b.card3.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-white/60">{b.card3.body}</p>
            </div>
            <div className="absolute bottom-4 right-4 h-24 w-24 rounded-xl border border-white/10 bg-[url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80')] bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-100"></div>
          </motion.a>

          <motion.a
            href={withBasePath(path("/api-integracoes"))}
            whileHover={{ y: -5 }}
            className="group relative flex items-center justify-between overflow-hidden rounded-3xl border border-white/5 glass-panel-dark p-8 md:col-span-2"
          >
            <div className="relative z-10 max-w-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-unik-blue to-demo-cyan-deep">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-heading text-2xl font-bold text-white transition-colors group-hover:text-demo-cyan">{b.card4.title}</h3>
              <p className="mb-4 font-sans text-sm leading-relaxed text-white/60">{b.card4.body}</p>
              <div className="flex items-center font-sans text-sm font-semibold text-blue-400">
                {b.card4.cta} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            <div className="relative hidden h-full w-1/2 overflow-hidden rounded-xl border border-white/10 bg-surface-page p-4 font-mono text-[10px] text-white/70 transition-colors group-hover:border-unik-blue/50 sm:block">
              <div className="mb-3 flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="text-demo-cyan">
                POST <span className="text-white">/v1/rewards/grant</span>
              </div>
              <div className="mt-1 text-gray-400">{"{"}</div>
              <div className="ml-4">
                <span className="text-purple-400">&quot;user_id&quot;</span>: <span className="text-green-300">&quot;emp_98231&quot;</span>,
              </div>
              <div className="ml-4">
                <span className="text-purple-400">&quot;points&quot;</span>: <span className="text-orange-300">500</span>,
              </div>
              <div className="ml-4">
                <span className="text-purple-400">&quot;reason&quot;</span>: <span className="text-green-300">&quot;Q3 Sales Target Achieved&quot;</span>
              </div>
              <div className="text-gray-400">{"}"}</div>
              <div className="mt-3 text-green-500">200 OK — Reward granted securely.</div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
