"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

export default function PlataformaPageCta() {
  const { m } = useLocaleMessages();
  return (
    <section className="border-t border-white/5 py-24 text-center">
      <h2 className="mb-6 font-heading text-3xl font-bold text-white">{m.plataforma.pageCta.title}</h2>
      <a
        href="https://calendly.com/yoobeco/demo"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-bold text-brand-navy-dark shadow-xl transition-all hover:scale-105"
      >
        {m.plataforma.pageCta.cta}
      </a>
    </section>
  );
}
