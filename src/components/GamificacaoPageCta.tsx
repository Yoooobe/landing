"use client";

import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { PRIMARY_CONTACT_SECTION_ID } from "@/lib/contactAnchor";
import type { ResolvedGamificacaoContent } from "@/sanity/lib/types";

export default function GamificacaoPageCta({
  content,
}: {
  content: ResolvedGamificacaoContent["finalCta"];
}) {
  const { m } = useLocaleMessages();
  const lf = m.leadForm;

  return (
    <section
      id={PRIMARY_CONTACT_SECTION_ID}
      className="relative overflow-hidden border-t border-white/5 bg-brand-navy py-32 text-center"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-yoobe-purple/20 blur-[100px]" />
      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        <h2 className="mb-6 font-heading text-4xl font-black text-white md:text-6xl">{content.title}</h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-white/60">{content.body}</p>
        <LeadCaptureForm variant="gamificacao" source="gamificacao" className="mx-auto w-full max-w-lg text-left" />
        <p className="mt-10 text-sm font-semibold uppercase tracking-wider text-white/45">{lf.altCalendly}</p>
        <a
          href={content.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex h-14 items-center justify-center rounded-2xl bg-linear-to-r from-yoobe-purple to-fuchsia-600 px-10 text-lg font-bold text-white shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-transform hover:scale-105"
        >
          {content.cta}
        </a>
      </div>
    </section>
  );
}
