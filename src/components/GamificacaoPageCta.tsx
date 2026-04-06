"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

export default function GamificacaoPageCta() {
  const { m } = useLocaleMessages();
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#0f172a] py-32 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-yoobe-purple/20 blur-[100px]" />
      <div className="container relative z-10 mx-auto px-4">
        <h2 className="mb-6 font-heading text-4xl font-black text-white md:text-6xl">{m.gamificacao.pageCta.title}</h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-white/60">{m.gamificacao.pageCta.body}</p>
        <a
          href="https://calendly.com/yoobeco/demo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-yoobe-purple to-fuchsia-600 px-10 text-lg font-bold text-white shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-transform hover:scale-105"
        >
          {m.gamificacao.pageCta.cta}
        </a>
      </div>
    </section>
  );
}
