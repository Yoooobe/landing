"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import ShowcaseImage from "@/components/ui/ShowcaseImage";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { rewardInfrastructurePath } from "@/lib/rewardInfrastructurePaths";

/**
 * Posiciona esta landing como complemento técnico ao site institucional 4unik.com.br.
 */
export default function FourUnikComplementStrip({
  homeContent = null,
}: {
  homeContent?: ResolvedHomeContent | null;
}) {
  const { m, locale } = useLocaleMessages();
  const u = homeContent?.fourUnik ?? {
    ...m.home.fourUnik,
    ctaHref: "https://4unik.com.br",
  };
  const pillarLinkLabel =
    "pillarLinkLabel" in u && typeof u.pillarLinkLabel === "string"
      ? u.pillarLinkLabel
      : m.home.fourUnik.pillarLinkLabel;
  return (
    <section
      className="relative border-y border-white/10 bg-white/3 py-8"
      aria-labelledby="fourunik-complement-heading"
    >
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-brand-navy-dark/60 px-6 py-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
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
          {u.sectionImage ? (
            <div className="w-full max-w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg md:w-[220px]">
              <ShowcaseImage
                image={u.sectionImage}
                alt={u.sectionImage.alt?.trim() || u.kicker || "Imagem complementar"}
                variant="card"
                className="rounded-xl"
                sizes="220px"
              />
            </div>
          ) : null}
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {pillarLinkLabel ? (
              <Link
                href={rewardInfrastructurePath(locale)}
                className="rounded-full border border-brand-orange/40 bg-brand-orange/10 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-orange/20"
              >
                {pillarLinkLabel}
              </Link>
            ) : null}
            <Link
              href={u.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:border-brand-orange/50 hover:bg-white/10"
            >
              {u.cta}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
