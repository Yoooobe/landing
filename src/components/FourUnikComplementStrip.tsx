"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import Image from "next/image";
import Link from "next/link";

/**
 * Posiciona esta landing como complemento técnico ao site institucional 4unik.com.br.
 */
export default function FourUnikComplementStrip({
  homeContent = null,
}: {
  homeContent?: ResolvedHomeContent | null;
}) {
  const { m } = useLocaleMessages();
  const u = homeContent?.fourUnik ?? {
    ...m.home.fourUnik,
    ctaHref: "https://4unik.com.br",
  };
  const sectionImageUrl = getSanityImageUrl(u.sectionImage);

  return (
    <section
      className="relative border-y border-white/10 bg-white/3 py-8"
      aria-labelledby="fourunik-complement-heading"
    >
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-brand-navy-dark/60 px-6 py-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex-1">
            <p
              id="fourunik-complement-heading"
              className="text-xs font-semibold uppercase tracking-wider text-brand-orange"
            >
              {u.kicker}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/75 md:text-base">
              {u.bodyBefore}{" "}
              <span className="font-medium text-white">{u.brand}</span> {u.bodyMid}{" "}
              <span className="text-white/90">{u.here}</span> {u.bodyAfter}
            </p>
          </div>
          {sectionImageUrl ? (
            <div className="w-full max-w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg md:w-[220px]">
              <Image
                src={sectionImageUrl}
                alt={u.sectionImage?.alt?.trim() || u.kicker || "Imagem complementar"}
                width={440}
                height={280}
                sizes="220px"
                className="h-full w-full rounded-xl object-cover"
                unoptimized
              />
            </div>
          ) : null}
          <Link
            href={u.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:border-brand-orange/50 hover:bg-white/10"
          >
            {u.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
