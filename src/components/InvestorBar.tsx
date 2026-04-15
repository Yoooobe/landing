"use client";
/* eslint-disable @next/next/no-img-element */

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { motion } from "framer-motion";

export default function InvestorBar() {
  const { m } = useLocaleMessages();
  const s = m.investorBar;
  const badgeSrc = withBasePath("/partners/google-badge.jpg");

  return (
    <section
      aria-label={s.ariaLabel}
      className="border-b border-white/5 bg-[#0a1220]/90 py-5 sm:py-6"
    >
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:gap-6">
        <motion.span
          className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {s.label}
        </motion.span>
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={badgeSrc}
            alt={s.badgeAlt}
            width={200}
            height={200}
            loading="lazy"
            decoding="async"
            className="h-20 w-20 rounded-xl object-cover opacity-95 grayscale transition-all duration-300 hover:grayscale-0 sm:h-24 sm:w-24 md:h-28 md:w-28"
          />
        </motion.div>
      </div>
    </section>
  );
}
