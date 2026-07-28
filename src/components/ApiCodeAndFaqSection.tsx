"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ResolvedApiIntegracoesContent } from "@/sanity/lib/types";

type Props = {
  content: ResolvedApiIntegracoesContent;
};

export default function ApiCodeAndFaqSection({ content }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { hero, faq } = content;

  if (!faq.length) return null;

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface-section py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-cyan-500/5 blur-[100px]" />
      <div className="container relative z-10 mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="h-fit overflow-hidden rounded-3xl border border-white/10 bg-surface-base"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-2 font-mono text-xs text-white/40">{hero.codeWindowTitle}</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/80">
            <code>{hero.codeSnippet}</code>
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          {faq.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-cyan-500/40 bg-surface-elevated shadow-[0_0_20px_rgba(6,182,212,0.08)]"
                    : "border-white/10 bg-transparent hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm font-bold text-white">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-cyan-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <div className="px-5 pb-4">
                    <p className="text-sm leading-relaxed text-white/60">{item.a}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
