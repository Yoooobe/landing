"use client";
/* eslint-disable @next/next/no-img-element */

import { ClientLogoMark } from "@/components/ClientLogoMark";
import { FALLBACK_TRUST_LOGOS } from "@/config/client-logos-fallback";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import type { ClientLogoTreatment } from "@/lib/clientLogoStyles";
import { getSanityImageUrl } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import { useMemo } from "react";

type TrustLogo = {
  src: string;
  alt: string;
  name?: string;
  href?: string;
  scale?: number;
  treatment?: ClientLogoTreatment;
};

export default function TrustBar() {
  const { m, locale } = useLocaleMessages();
  const { sanity } = useSiteSettings();
  const fallbackLogos = useMemo<TrustLogo[]>(
    () => FALLBACK_TRUST_LOGOS.map((logo) => ({ ...logo, name: logo.alt })),
    [],
  );

  const logos = useMemo<TrustLogo[]>(() => {
    const items = sanity?.trustLogoCollection?.items;
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
          treatment: (item.treatment as ClientLogoTreatment | undefined) ?? "mono-light",
        };
      })
      .filter(Boolean) as TrustLogo[];

    return mapped.length ? mapped : fallbackLogos;
  }, [fallbackLogos, sanity?.trustLogoCollection?.items]);

  return (
    <section className="border-b border-t border-white/5 bg-surface-page py-12">
      <div className="container mx-auto px-4 text-center">
        <motion.p
          className="mb-8 text-sm font-bold tracking-widest text-white/40 uppercase"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {m.home.trust.title}
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
          {logos.map((logo, i) => (
            <motion.div
              key={`${logo.src}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
    </section>
  );
}
