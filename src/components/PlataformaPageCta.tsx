"use client";

import TrackedOutboundLink from "@/components/analytics/TrackedOutboundLink";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { primaryContactSectionIdAttr } from "@/lib/contactAnchor";
import { DEFAULT_CALENDLY_URL } from "@/lib/calendly";

export default function PlataformaPageCta({
  contactSectionId,
}: {
  contactSectionId?: string | null;
} = {}) {
  const { m } = useLocaleMessages();
  const lf = m.leadForm;

  return (
    <section id={primaryContactSectionIdAttr(contactSectionId)} className="border-t border-white/5 py-24">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 font-heading text-3xl font-bold text-white">{m.plataforma.pageCta.title}</h2>
        <p className="mb-8 text-sm text-white/50">{lf.altCalendly}</p>
        <LeadCaptureForm variant="plataforma" source="plataforma" className="mx-auto max-w-lg text-left" />
        <TrackedOutboundLink
          href={DEFAULT_CALENDLY_URL}
          source="plataforma-page-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
        >
          {m.plataforma.pageCta.cta}
        </TrackedOutboundLink>
      </div>
    </section>
  );
}
