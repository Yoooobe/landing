"use client";

import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { primaryContactSectionIdAttr } from "@/lib/contactAnchor";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import Image from "next/image";

export default function HomeFinalCta({
  homeContent = null,
  contactSectionId,
}: {
  homeContent?: ResolvedHomeContent | null;
  /** `null` remove o id (bloco intermédio no CMS). Omit = âncora principal. */
  contactSectionId?: string | null;
}) {
  const { m } = useLocaleMessages();
  const lf = m.leadForm;
  const c = homeContent?.finalCta ?? {
    ...m.home.finalCta,
    demoHref: "https://calendly.com/yoobeco/demo",
    whatsappHref: "https://wa.me/554187582060",
  };
  const sectionImageUrl = getSanityImageUrl(c.sectionImage);

  return (
    <section
      id={primaryContactSectionIdAttr(contactSectionId)}
      className="section-gradient-bg border-t border-white/5 py-24"
    >
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:items-start">
          <div className="text-center lg:text-left">
            <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">{c.title}</h2>
            <p className="mb-0 font-sans text-xl text-white/70">{c.body}</p>
          </div>
          <LeadCaptureForm variant="home" source="home-footer" className="w-full max-lg:mx-auto max-lg:max-w-md" />
          <div className="border-t border-white/10 pt-8 text-center lg:col-span-2 lg:text-left">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/45">{lf.altCalendly}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href={c.demoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-xl bg-yoobe-purple px-8 font-sans text-base font-bold text-white shadow-xl shadow-yoobe-purple/20 transition-all hover:scale-105 hover:bg-yoobe-purple/90 sm:w-auto"
              >
                {c.demo}
              </a>
              <a
                href={c.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-xl bg-[#25D366] px-8 font-sans text-base font-bold text-white shadow-xl shadow-[#25D366]/20 transition-all hover:scale-105 hover:bg-[#128C7E] sm:w-auto"
              >
                {c.whatsapp}
              </a>
            </div>
          </div>
        </div>
        {sectionImageUrl ? (
          <div className="mx-auto mt-12 w-full max-w-[400px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl backdrop-blur-sm lg:max-w-2xl">
            <Image
              src={sectionImageUrl}
              alt={c.sectionImage?.alt?.trim() || c.title || "Imagem do CTA final"}
              width={640}
              height={640}
              sizes="(min-width: 1024px) 672px, 100vw"
              className="h-full w-full rounded-[1.4rem] object-cover"
              unoptimized
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
