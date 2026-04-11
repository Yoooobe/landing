"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { Link2, Shield, TrendingUp } from "lucide-react";

const ICONS = [Link2, Shield, TrendingUp] as const;

export default function EnterpriseTrustStrip() {
  const { m } = useLocaleMessages();
  const s = m.enterpriseTrustStrip;

  return (
    <section
      aria-label={s.ariaLabel}
      className="border-y border-white/5 bg-[#0a1220]/90 py-6"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <ul className="grid gap-6 md:grid-cols-3">
          {s.items.map((item, i) => {
            const Icon = ICONS[i] ?? Link2;
            return (
              <li
                key={item.title}
                className="flex gap-4 rounded-2xl border border-white/5 bg-white/3 p-4 md:flex-col md:items-start"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-orange">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="font-heading text-base font-bold text-white">{item.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
