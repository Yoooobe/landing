"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

export default function CasosPageCta() {
  const { m } = useLocaleMessages();
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#0f172a] py-24 text-center">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/10 to-transparent opacity-50" />
      <div className="container relative z-10 mx-auto px-4">
        <h2 className="mb-6 font-heading text-3xl font-black text-white lg:text-5xl">{m.casos.pageCta.title}</h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60">{m.casos.pageCta.body}</p>
        <a
          href="https://calendly.com/yoobeco/demo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center justify-center rounded-2xl bg-brand-orange px-10 text-lg font-bold text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all hover:scale-105 hover:bg-[#ff512f]"
        >
          {m.casos.pageCta.cta}
        </a>
      </div>
    </section>
  );
}
