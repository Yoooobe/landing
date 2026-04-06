"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import Link from "next/link";

/**
 * Posiciona esta landing como complemento técnico ao site institucional 4unik.com.br.
 */
export default function FourUnikComplementStrip() {
  const { m } = useLocaleMessages();
  const u = m.home.fourUnik;
  return (
    <section
      className="relative border-y border-white/10 bg-white/[0.03] py-8"
      aria-labelledby="fourunik-complement-heading"
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-brand-navy-dark/60 px-6 py-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:gap-8">
          <div>
            <p
              id="fourunik-complement-heading"
              className="text-xs font-semibold uppercase tracking-wider text-brand-orange"
            >
              {u.kicker}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/75 md:text-base">
              {u.bodyBefore}{" "}
              <span className="font-medium text-white">{u.brand}</span> {u.bodyMid}{" "}
              <span className="text-white/90">{u.here}</span> {u.bodyAfter}
            </p>
          </div>
          <Link
            href="https://4unik.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:border-brand-orange/50 hover:bg-white/10"
          >
            {u.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
