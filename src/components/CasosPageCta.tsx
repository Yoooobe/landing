"use client";

import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { primaryContactSectionIdAttr } from "@/lib/contactAnchor";

export default function CasosPageCta({ contactSectionId }: { contactSectionId?: string | null } = {}) {
  const { m } = useLocaleMessages();
  const lf = m.leadForm;
  const c = m.casos.pageCta;

  return (
    <section
      id={primaryContactSectionIdAttr(contactSectionId)}
      className="relative overflow-hidden border-t border-white/5 bg-[#0f172a] py-24 text-center"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/10 to-transparent opacity-50" />
      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        <h2 className="mb-6 font-heading text-3xl font-black text-white lg:text-5xl">{c.title}</h2>
        <p className="mx-auto mb-4 max-w-2xl text-lg text-white/60">{c.body}</p>
        <p className="mx-auto mb-10 max-w-xl text-sm italic text-white/45">{c.socialProof}</p>
        <LeadCaptureForm variant="casos" source="casos-de-uso" className="mx-auto w-full max-w-lg text-left" />
        <p className="mt-10 text-sm font-semibold uppercase tracking-wider text-white/45">{lf.altCalendly}</p>
        <a
          href="https://calendly.com/yoobeco/demo"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex h-14 items-center justify-center rounded-2xl bg-brand-orange px-10 text-lg font-bold text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all hover:scale-105 hover:bg-[#ff512f]"
        >
          {c.cta}
        </a>
      </div>
    </section>
  );
}
