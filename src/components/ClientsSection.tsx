"use client";

import { ClientLogoMark } from "@/components/ClientLogoMark";
import { FALLBACK_CLIENTS_GRID_LOGOS } from "@/config/client-logos-fallback";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import type { ClientLogoTreatment } from "@/lib/clientLogoStyles";
import { getSanityImageUrl } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import { useMemo } from "react";

type ClientLogo = {
  src: string;
  alt: string;
  name?: string;
  href?: string;
  scale?: number;
  treatment?: ClientLogoTreatment;
};

export default function ClientsSection() {
  const { m, locale } = useLocaleMessages();
  const { sanity } = useSiteSettings();
  const c = m.clients;

  const fallbackLogos = useMemo<ClientLogo[]>(
    () =>
      FALLBACK_CLIENTS_GRID_LOGOS.map((entry) => ({
        src: entry.src,
        alt: entry.name,
        name: entry.name,
        scale: entry.scale,
        treatment: entry.treatment ?? "color",
      })),
    [],
  );

  const logos = useMemo<ClientLogo[]>(() => {
    const items = sanity?.clientsLogoCollection?.items;
    if (!items?.length) {
      return fallbackLogos;
    }

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
      .filter(Boolean) as ClientLogo[];

    return mapped.length ? mapped : fallbackLogos;
  }, [fallbackLogos, sanity?.clientsLogoCollection?.items]);

  return (
    <section id="clientes" className="relative border-t border-white/5 bg-brand-navy-dark py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="relative z-10 mb-16 text-center text-white">
          <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm font-bold uppercase tracking-wide text-white/80">
            {c.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black md:text-5xl">
            {c.titleBefore}{" "}
            <span className="bg-linear-to-r from-brand-orange via-unik-blue-soft to-demo-cyan bg-clip-text text-transparent">{c.titleGradient}</span>{" "}
            {c.titleAfter}
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-white/50">{c.sub}</p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5">
          {logos.map((logo, i) => (
            <motion.div
              key={`${logo.alt}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex items-center justify-center"
            >
              <ClientLogoMark
                src={logo.src}
                alt={logo.alt}
                name={logo.name}
                href={logo.href}
                locale={locale}
                display="grid"
                scale={logo.scale}
                treatment={logo.treatment}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
