"use client";

import { withBasePath } from "@/lib/basePath";
import type { IcpVerticalPage } from "@/lib/icpVerticalPages";
import type { IcpProfileVisual } from "@/config/icp-profile-visuals";
import { getMarketingLucideIcon } from "@/lib/marketing-icon-registry";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  how: IcpVerticalPage["how"];
  visual: IcpProfileVisual;
};

export default function IcpProfileHowSection({ how, visual }: Props) {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-surface-section py-20 md:py-28">
      <div className={`pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full blur-[140px] ${visual.heroGlowPrimaryClass}`} />

      <div className="container relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`mb-4 inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${visual.accentBorderClass} ${visual.accentBgClass} ${visual.accentTextClass}`}
          >
            {how.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-heading text-3xl font-black text-white md:text-4xl"
          >
            {how.title}
          </motion.h2>
          {how.sub ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg leading-8 text-white/60"
            >
              {how.sub}
            </motion.p>
          ) : null}

          <div className="mt-8 space-y-4">
            {how.items.map((item, index) => {
              const Icon = getMarketingLucideIcon(item.icon);
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/4 p-4 transition-colors hover:border-white/15"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${visual.accentBorderClass} ${visual.accentBgClass} ${visual.accentTextClass}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    {item.eyebrow ? (
                      <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/35">
                        {item.eyebrow}
                      </span>
                    ) : null}
                    <h3 className="font-heading text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 90, damping: 18 }}
          className="overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
        >
          <Image
            src={withBasePath(visual.images.how)}
            alt={how.title}
            width={1100}
            height={820}
            className="h-auto w-full object-cover"
            sizes="(min-width: 1024px) 620px, 92vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
