"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import type { StatsBarItem } from "@/messages/segments/pt-stats-bento-tabs-why";
import { motion, useReducedMotion } from "framer-motion";
import { Globe } from "lucide-react";

function StatCard({
  item,
  index,
  variant,
}: {
  item: StatsBarItem;
  index: number;
  variant: "hero" | "default";
}) {
  const reduceMotion = useReducedMotion();
  const isHero = variant === "hero";
  const isTextValue = item.value.length > 6 && !/\d/.test(item.value.charAt(0));

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ delay: (index % 6) * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-brand-orange/30 ${
        isHero ? "p-5 md:p-6" : "p-4 md:p-5"
      }`}
    >
      {item.prefix ? (
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/45">
          {item.prefix}
        </div>
      ) : null}
      <div
        className={`flex items-end font-heading font-black tracking-tight text-white ${
          isHero
            ? "text-4xl md:text-5xl"
            : isTextValue
              ? "text-2xl md:text-3xl"
              : "text-3xl md:text-4xl"
        }`}
      >
        <span>{item.value}</span>
        {item.suffix ? (
          <span className="ml-1 text-[0.7em] text-brand-orange">{item.suffix}</span>
        ) : null}
      </div>
      <div className="mt-2 max-w-[14rem] text-sm leading-snug text-white/60">{item.label}</div>
    </motion.div>
  );
}

export default function StatsBar() {
  const { m } = useLocaleMessages();
  const { eyebrow, title, internationalLabel, items } = m.statsBar;

  const operational = items.filter((item) => item.group === "operational");
  const heroItems = operational.filter((item) => item.highlight);
  const regularItems = operational.filter((item) => !item.highlight);
  const internationalItems = items.filter((item) => item.group === "international");

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-black py-16 md:py-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBasePath("/illustrations/stats-impact-background.svg")}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/70" />

      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            {eyebrow}
          </div>
          <h2 className="mt-3 font-heading text-3xl font-black tracking-tight text-white md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {heroItems.map((item, i) => (
            <StatCard key={item.label} item={item} index={i} variant="hero" />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {regularItems.map((item, i) => (
            <StatCard key={item.label} item={item} index={i} variant="default" />
          ))}
        </div>

        <div className="mt-10 mb-6 flex items-center gap-3 md:mt-12">
          <Globe className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden />
          <span className="text-xs font-bold uppercase tracking-widest text-white/50">
            {internationalLabel}
          </span>
          <div className="h-px flex-1 bg-linear-to-r from-white/15 to-transparent" />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {internationalItems.map((item, i) => (
            <StatCard key={item.label} item={item} index={i} variant="default" />
          ))}
        </div>
      </div>
    </section>
  );
}
