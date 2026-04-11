"use client";

import type { ResolvedGamificacaoContent } from "@/sanity/lib/types";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function GamificationFAQ({ content: f }: { content: ResolvedGamificacaoContent["faq"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative z-10 border-t border-white/5 bg-[#0a0f18] py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">{f.badge}</span>
          <h2 className="font-heading text-3xl font-black text-white md:text-5xl">
            {f.titleBefore}{" "}
            <span className="bg-linear-to-r from-yoobe-purple to-fuchsia-600 bg-clip-text text-transparent">{f.titleGradient}</span>
            {f.titleAfter}
          </h2>
        </div>

        <div className="space-y-4">
          {f.items.map((faq, idx) => (
            <div
              key={idx}
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                openIndex === idx
                  ? "border-yoobe-purple/50 bg-surface-panel shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                  : "border-white/10 bg-transparent hover:border-white/20"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
              >
                <span className="pr-8 font-bold text-white">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-white/50 transition-transform duration-300 ${openIndex === idx ? "rotate-180 text-yoobe-purple" : ""}`}
                />
              </button>

              <div className={`transition-all duration-300 ease-in-out ${openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
                <div className="px-6 pb-6 text-sm leading-relaxed text-white/60">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
