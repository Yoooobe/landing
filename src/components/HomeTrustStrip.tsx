"use client";
/* eslint-disable @next/next/no-img-element */

import { ClientLogoMark } from "@/components/ClientLogoMark";
import { FALLBACK_TRUST_LOGOS } from "@/config/client-logos-fallback";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import type { ClientLogoTreatment } from "@/lib/clientLogoStyles";
import { withBasePath } from "@/lib/basePath";
import { getSanityImageUrl } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import { Globe, Link2, Shield, TrendingUp } from "lucide-react";
import { useMemo } from "react";

const TRUST_ICONS = [Link2, Shield, TrendingUp, Globe] as const;

type TrustLogo = {
  src: string;
  alt: string;
  name?: string;
  href?: string;
  scale?: number;
  treatment?: ClientLogoTreatment;
};

export default function HomeTrustStrip() {
  const { m, locale } = useLocaleMessages();
  const { sanity } = useSiteSettings();
  const investor = m.investorBar;
  const enterprise = m.enterpriseTrustStrip;

  const fallbackLogos = useMemo<TrustLogo[]>(
    () =>
      FALLBACK_TRUST_LOGOS.map((entry) => ({
        src: entry.src,
        alt: entry.name,
        name: entry.name,
        scale: entry.scale,
        treatment: entry.treatment ?? "color",
      })),
    [],
  );

  const logos = useMemo<TrustLogo[]>(() => {
    const items = sanity?.trustLogoCollection?.items;
    if (!items?.length) return fallbackLogos;

    const mapped = items
      .map((item) => {
        const src = getSanityImageUrl(item.logo, { width: 320, fit: "max", quality: 90 });
        if (!src) return null;
        return {
          src,
          alt: item.logo?.alt || item.name || "Logo",
          name: item.name,
          href: item.href || undefined,
          scale: item.scale ?? undefined,
          treatment: (item.treatment as ClientLogoTreatment | undefined) ?? "color",
        };
      })
      .filter(Boolean) as TrustLogo[];

    return mapped.length ? mapped : fallbackLogos;
  }, [fallbackLogos, sanity?.trustLogoCollection?.items]);

  return (
    <section aria-label={enterprise.ariaLabel} className="border-b border-white/5 bg-surface-page">
      <div className="border-b border-white/5 bg-surface-trust/90 py-4">
        <div className="container mx-auto flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            {investor.label}
          </span>
          <img
            src={withBasePath("/partners/google-badge.jpg")}
            alt={investor.badgeAlt}
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
            className="h-14 w-14 rounded-lg object-cover opacity-95 grayscale transition-all duration-300 hover:grayscale-0 sm:h-16 sm:w-16"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 text-center">
        <p className="mb-6 text-sm font-bold tracking-widest text-white/40 uppercase">
          {m.home.trust.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
          {logos.map((logo, i) => (
            <motion.div
              key={`${logo.src}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
            >
              <ClientLogoMark
                src={logo.src}
                alt={logo.alt}
                name={logo.name}
                href={logo.href}
                locale={locale}
                display="compact"
                scale={logo.scale}
                treatment={logo.treatment}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 bg-surface-trust/60 py-6">
        <div className="container mx-auto max-w-6xl px-4">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {enterprise.items.map((item, i) => {
              const Icon = TRUST_ICONS[i] ?? Link2;
              return (
                <li
                  key={item.title}
                  className="flex gap-3 rounded-xl border border-white/5 bg-white/2 p-3 md:flex-col md:items-start"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-brand-orange">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <div className="text-left">
                    <h2 className="font-heading text-sm font-bold text-white">{item.title}</h2>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/55">{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
