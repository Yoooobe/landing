"use client";

import type { IcpVerticalPage } from "@/lib/icpVerticalPages";
import type { IcpProfileVisual } from "@/config/icp-profile-visuals";
import { getMarketingLucideIcon } from "@/lib/marketing-icon-registry";
import { motion } from "framer-motion";

type Props = {
  problem: IcpVerticalPage["problem"];
  visual: IcpProfileVisual;
};

export default function IcpProfileProblemSection({ problem, visual }: Props) {
  const columns = problem.items.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className="relative overflow-hidden bg-brand-cream py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className={`mb-4 inline-flex rounded-full border bg-white px-3 py-1 text-sm font-semibold shadow-sm ${visual.accentBorderClass} ${visual.accentTextClass}`}>
            {problem.badge}
          </span>
          <h2 className="font-heading text-3xl font-black text-brand-navy md:text-5xl">
            {problem.title}
          </h2>
        </motion.div>

        <div className={`grid gap-6 ${columns}`}>
          {problem.items.map((item, index) => {
            const Icon = getMarketingLucideIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group rounded-3xl border border-brand-navy/8 bg-white p-8 shadow-[0_12px_40px_rgba(31,38,135,0.06)] transition-transform hover:-translate-y-1"
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${visual.accentBorderClass} ${visual.accentBgClass} ${visual.accentTextClass}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-brand-navy">{item.title}</h3>
                <p className="text-sm leading-relaxed text-brand-warm-gray">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
