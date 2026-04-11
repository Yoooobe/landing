"use client";
/* eslint-disable @next/next/no-img-element */

import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { getSanityImageUrl } from "@/sanity/lib/image";
import { isExternalShellHref, resolveShellHref } from "@/lib/siteShell";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";

type ClientLogo = {
  src: string;
  alt: string;
  href?: string;
};

export default function ClientsSection() {
  const { m, locale } = useLocaleMessages();
  const { sanity } = useSiteSettings();
  const c = m.clients;

  const fallbackLogos = useMemo<ClientLogo[]>(
    () => [
      { src: withBasePath("/clients/yampi.svg"), alt: "Yampi" },
      { src: withBasePath("/clients/prio.svg"), alt: "PRIO" },
      { src: withBasePath("/clients/hapvida.webp"), alt: "Hapvida" },
      { src: withBasePath("/clients/join.png"), alt: "Join RH" },
      { src: withBasePath("/clients/tecnospeed.svg"), alt: "Tecnospeed" },
      { src: withBasePath("/clients/boticario.webp"), alt: "O Boticário" },
      { src: withBasePath("/clients/w1-consultoria.svg"), alt: "W1 Consultoria" },
      { src: withBasePath("/clients/contabilizei.svg"), alt: "Contabilizei" },
    ],
    [],
  );

  const logos = useMemo<ClientLogo[]>(() => {
    const items = sanity?.clientsLogoCollection?.items;
    if (!items?.length) {
      return fallbackLogos;
    }

    const mapped = items
      .map((item) => {
        const src = getSanityImageUrl(item.logo);
        if (!src) return null;

        return {
          src,
          alt: item.logo?.alt || item.name || "Logo",
          href: item.href || undefined,
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

        <div className="relative z-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group flex min-h-[120px] items-center justify-center rounded-2xl border border-white/5 bg-surface-elevated p-6"
              title={logo.alt}
            >
              {logo.href ? (
                isExternalShellHref(resolveShellHref(logo.href, locale)) ? (
                  <a
                    href={resolveShellHref(logo.href, locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      className="h-auto max-h-14 w-full max-w-[min(100%,12rem)] transform object-contain opacity-65 grayscale transition-all duration-300 group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:opacity-100 md:max-h-16"
                    />
                  </a>
                ) : (
                  <Link href={resolveShellHref(logo.href, locale)}>
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      className="h-auto max-h-14 w-full max-w-[min(100%,12rem)] transform object-contain opacity-65 grayscale transition-all duration-300 group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:opacity-100 md:max-h-16"
                    />
                  </Link>
                )
              ) : (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-auto max-h-14 w-full max-w-[min(100%,12rem)] transform object-contain opacity-65 grayscale transition-all duration-300 group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:opacity-100 md:max-h-16"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
