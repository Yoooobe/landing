"use client";
/* eslint-disable @next/next/no-img-element */

import {
  clientLogoImageClass,
  clientLogoScaleStyle,
  clientLogoSlotClass,
  resolveClientLogoScale,
  type ClientLogoDisplay,
  type ClientLogoTreatment,
} from "@/lib/clientLogoStyles";
import { isExternalShellHref, resolveShellHref } from "@/lib/siteShell";
import type { Locale } from "@/lib/locale";
import Link from "next/link";

export type ClientLogoMarkProps = {
  src: string;
  alt: string;
  name?: string;
  href?: string;
  locale: Locale;
  display: ClientLogoDisplay;
  scale?: number | null;
  treatment?: ClientLogoTreatment;
};

export function ClientLogoMark({
  src,
  alt,
  name,
  href,
  locale,
  display,
  scale,
  treatment = "mono-light",
}: ClientLogoMarkProps) {
  const resolvedScale = resolveClientLogoScale(name ?? alt, scale);
  const image = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={clientLogoImageClass(display, treatment)}
      style={clientLogoScaleStyle(resolvedScale)}
    />
  );

  const slot = (
    <div className={clientLogoSlotClass(display)} title={alt}>
      {image}
    </div>
  );

  if (!href) {
    return slot;
  }

  const resolvedHref = resolveShellHref(href, locale);
  if (isExternalShellHref(resolvedHref)) {
    return (
      <a href={resolvedHref} target="_blank" rel="noopener noreferrer" className="inline-flex">
        {slot}
      </a>
    );
  }

  return (
    <Link href={resolvedHref} className="inline-flex">
      {slot}
    </Link>
  );
}
