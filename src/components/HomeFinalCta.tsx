"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

export default function HomeFinalCta() {
  const { m } = useLocaleMessages();
  return (
    <section className="section-gradient-bg border-t border-white/5 py-24 text-center">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">{m.home.finalCta.title}</h2>
        <p className="mb-10 font-sans text-xl text-white/70">{m.home.finalCta.body}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://calendly.com/yoobeco/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-xl bg-yoobe-purple px-10 font-sans text-lg font-bold text-white shadow-2xl shadow-yoobe-purple/20 transition-all hover:scale-105 hover:bg-yoobe-purple/90 sm:w-auto"
          >
            {m.home.finalCta.demo}
          </a>
          <a
            href="https://wa.me/554187582060"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-xl bg-[#25D366] px-10 font-sans text-lg font-bold text-white shadow-2xl shadow-[#25D366]/20 transition-all hover:scale-105 hover:bg-[#128C7E] sm:w-auto"
          >
            {m.home.finalCta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
