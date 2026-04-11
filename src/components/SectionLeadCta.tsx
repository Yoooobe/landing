"use client";

import LeadCaptureForm from "@/components/LeadCaptureForm";
import type { LeadFormVariant } from "@/components/LeadCaptureForm";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import type { ResolvedHomeContent } from "@/sanity/lib/types";

export type SectionLeadCtaZone = "afterPlatform" | "afterCampaigns" | "afterOperations";

const ZONE_ANCHOR: Record<SectionLeadCtaZone, string> = {
  afterPlatform: "contato-pos-plataforma",
  afterCampaigns: "contato-pos-campanhas",
  afterOperations: "contato-pos-operacoes",
};

type Props = {
  homeContent: ResolvedHomeContent | null;
  zone: SectionLeadCtaZone;
  variant?: LeadFormVariant;
};

export default function SectionLeadCta({ homeContent, zone, variant = "home" }: Props) {
  const { m } = useLocaleMessages();
  const block = m.sectionLeadCta[zone];
  const { common } = m.sectionLeadCta;
  const c = homeContent?.finalCta ?? {
    ...m.home.finalCta,
    demoHref: "https://calendly.com/yoobeco/demo",
    whatsappHref: "https://wa.me/554187582060",
  };

  return (
    <section
      id={ZONE_ANCHOR[zone]}
      className="section-gradient-bg border-y border-white/5 py-16"
      aria-labelledby={`section-lead-heading-${block.source}`}
    >
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:items-start">
          <div className="text-center lg:text-left">
            <h2
              id={`section-lead-heading-${block.source}`}
              className="mb-4 font-heading text-2xl font-black text-white md:text-4xl"
            >
              {block.title}
            </h2>
            <p className="font-sans text-lg text-white/70">{block.body}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-white/45">
              {common.secondaryHint}
            </p>
            <div className="mt-3 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <a
                href={c.demoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-xl bg-yoobe-purple px-6 font-sans text-sm font-bold text-white shadow-lg shadow-yoobe-purple/20 transition hover:bg-yoobe-purple/90"
              >
                {c.demo}
              </a>
              <a
                href={c.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-xl bg-[#25D366] px-6 font-sans text-sm font-bold text-white shadow-lg transition hover:bg-[#128C7E]"
              >
                {c.whatsapp}
              </a>
            </div>
          </div>
          <LeadCaptureForm
            variant={variant}
            source={block.source}
            className="w-full max-lg:mx-auto max-lg:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
