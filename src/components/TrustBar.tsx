"use client";
/* eslint-disable @next/next/no-img-element */

import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { getSanityImageUrl } from "@/sanity/lib/image";
import { isExternalShellHref, resolveShellHref } from "@/lib/siteShell";
import Link from "next/link";
import { useMemo } from "react";

type TrustLogo = {
  src: string;
  alt: string;
  href?: string;
};

export default function TrustBar() {
  const { m, locale } = useLocaleMessages();
  const { sanity } = useSiteSettings();
  const fallbackLogos = useMemo<TrustLogo[]>(
    () => [
      { src: withBasePath("/clients/yampi.svg"), alt: "Yampi" },
      { src: withBasePath("/clients/prio.svg"), alt: "PRIO" },
      { src: withBasePath("/clients/hapvida.webp"), alt: "Hapvida" },
      { src: withBasePath("/clients/join.png"), alt: "Join RH" },
      { src: withBasePath("/clients/tecnospeed.svg"), alt: "Tecnospeed" },
      { src: withBasePath("/clients/boticario.webp"), alt: "O Boticário" },
    ],
    [],
  );

  const logos = useMemo<TrustLogo[]>(() => {
    const items = sanity?.trustLogoCollection?.items;
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
      .filter(Boolean) as TrustLogo[];

    return mapped.length ? mapped : fallbackLogos;
  }, [fallbackLogos, sanity?.trustLogoCollection?.items]);

  return (
    <section className="border-b border-t border-white/5 bg-surface-page py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-bold tracking-widest text-white/40 uppercase mb-8">{m.home.trust.title}</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {logos.map((logo, i) => (
            <div key={i} className="h-8 md:h-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              {logo.href ? (
                isExternalShellHref(resolveShellHref(logo.href, locale)) ? (
                  <a
                    href={resolveShellHref(logo.href, locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={logo.src} alt={logo.alt} loading="lazy" className="h-auto max-h-full max-w-[min(100%,8rem)] object-contain md:max-w-36" />
                  </a>
                ) : (
                  <Link href={resolveShellHref(logo.href, locale)}>
                    <img src={logo.src} alt={logo.alt} loading="lazy" className="h-auto max-h-full max-w-[min(100%,8rem)] object-contain md:max-w-36" />
                  </Link>
                )
              ) : (
                <img src={logo.src} alt={logo.alt} loading="lazy" className="h-auto max-h-full max-w-[min(100%,8rem)] object-contain md:max-w-36" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
