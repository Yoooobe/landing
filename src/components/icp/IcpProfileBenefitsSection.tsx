"use client";

import { withBasePath } from "@/lib/basePath";
import type { IcpVerticalPage } from "@/lib/icpVerticalPages";
import type { IcpProfileVisual } from "@/config/icp-profile-visuals";
import { getMarketingLucideIcon } from "@/lib/marketing-icon-registry";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  benefits: IcpVerticalPage["benefits"];
  visual: IcpProfileVisual;
};

export default function IcpProfileBenefitsSection({ benefits, visual }: Props) {
  return (
    <section className="relative overflow-hidden bg-brand-cream py-20 md:py-28">
      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-[520px] rounded-full bg-brand-orange/8 blur-[110px]" />

      <div className="container relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 90, damping: 18 }}
          className="order-2 overflow-hidden rounded-[1.8rem] border border-brand-navy/10 bg-white shadow-[0_24px_70px_rgba(31,38,135,0.12)] lg:order-1"
        >
          <Image
            src={withBasePath(visual.images.benefits)}
            alt={benefits.title}
            width={1100}
            height={820}
            className="h-auto w-full object-cover"
            sizes="(min-width: 1024px) 620px, 92vw"
          />
        </motion.div>

        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className={`mb-4 inline-flex rounded-full border bg-white px-3 py-1 text-sm font-semibold shadow-sm ${visual.accentBorderClass} ${visual.accentTextClass}`}>
              {benefits.badge}
            </span>
            <h2 className="font-heading text-3xl font-black text-brand-navy md:text-4xl">
              {benefits.title}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {benefits.items.map((item, index) => {
              const Icon = getMarketingLucideIcon(item.icon);
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl border border-brand-navy/8 bg-white/70 p-4 transition-colors hover:border-brand-navy/15"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${visual.accentBorderClass} ${visual.accentBgClass} ${visual.accentTextClass}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-brand-navy">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-warm-gray">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
