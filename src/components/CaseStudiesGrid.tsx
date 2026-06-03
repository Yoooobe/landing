"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";

function metricToneClass(tone: unknown): string {
  if (tone === "success") return "text-green-400";
  if (tone === "accent") return "text-yoobe-neon-pink";
  return "text-white";
}

export default function CaseStudiesGrid() {
  const { m } = useLocaleMessages();
  const cs = m.casosPage.caseStudies;
  const cases = cs.cases;

  return (
    <section className="py-12 pb-32 bg-brand-navy-dark relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`glass-panel-dark rounded-bento border border-white/5 p-8 md:p-12 relative overflow-hidden group ${
                i === 0 || i === cases.length - 1
                  ? "md:col-span-2 flex flex-col md:flex-row gap-8"
                  : "flex flex-col"
              }`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className={i === 0 || i === cases.length - 1 ? "md:w-1/2" : ""}>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white tracking-widest uppercase">{c.company}</span>
                  <div className="text-xs text-brand-orange font-bold uppercase tracking-wider mt-1">{c.industry}</div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{c.title}</h3>
                <p className="text-white/60 mb-6 font-light leading-relaxed">{c.description}</p>

                <div className="rounded-xl border border-white/5 bg-surface-base p-5">
                  <span className="text-xs font-bold text-white/40 uppercase mb-2 block">{cs.challengeLabel}</span>
                  <p className="text-sm text-white/80">{c.challenge}</p>
                </div>
              </div>

              <div
                className={`mt-8 ${
                  i === 0 || i === cases.length - 1
                    ? "md:mt-0 md:w-1/2 flex flex-col justify-center"
                    : "mt-auto pt-8 border-t border-white/5"
                }`}
              >
                <span className="text-xs font-bold text-white/40 uppercase mb-6 block">{cs.resultsLabel}</span>
                <div className="grid min-w-0 grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
                  {c.metrics.map((metric, idx) => (
                    <div key={idx} className="flex min-w-0 flex-col gap-1 overflow-hidden">
                      <span
                        className={`wrap-break-word text-2xl font-bold sm:text-3xl ${metricToneClass(
                          "tone" in metric ? metric.tone : undefined,
                        )}`}
                      >
                        {metric.value}
                      </span>
                      <span className="text-xs font-medium uppercase leading-snug text-white/50">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
