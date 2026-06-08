/** Shared visual treatment for client / trust logos on dark surfaces. */

import type { CSSProperties } from "react";

export type ClientLogoTreatment = "mono-light" | "color";

export type ClientLogoDisplay = "compact" | "grid";

const COMPACT_IMAGE =
  "h-8 w-auto max-w-[min(100%,7rem)] object-contain md:h-10 md:max-w-36";
const GRID_IMAGE =
  "h-auto w-full max-w-[min(100%,11rem)] object-contain md:max-h-[3.25rem]";

const MONO_LIGHT =
  "brightness-0 invert opacity-75 transition-all duration-300 group-hover:opacity-100";
const COLOR =
  "opacity-80 transition-all duration-300 group-hover:opacity-100";

export function clientLogoImageClass(
  display: ClientLogoDisplay,
  treatment: ClientLogoTreatment = "mono-light",
): string {
  const size = display === "compact" ? COMPACT_IMAGE : GRID_IMAGE;
  const tone = treatment === "color" ? COLOR : MONO_LIGHT;
  const hover =
    display === "grid"
      ? " group-hover:scale-[1.04]"
      : " group-hover:scale-[1.03]";

  return [size, tone, hover].join(" ");
}

export function clientLogoSlotClass(display: ClientLogoDisplay): string {
  if (display === "compact") {
    return "group flex h-10 items-center justify-center md:h-12";
  }

  return "group flex h-16 items-center justify-center rounded-xl border border-white/8 px-4 py-3 md:h-[4.5rem] md:px-5";
}

export function clientLogoScaleStyle(scale?: number | null): CSSProperties | undefined {
  const value = typeof scale === "number" && Number.isFinite(scale) ? scale : 1;
  if (value === 1) return undefined;
  return { transform: `scale(${value})`, transformOrigin: "center" };
}

/** Default per-brand scale tweaks when CMS scale is unset. */
export const CLIENT_LOGO_DEFAULT_SCALES: Record<string, number> = {
  "W1 Consultoria": 0.82,
  "W1": 0.82,
  Contabilizei: 0.92,
  "O Boticário": 0.88,
  "O Boticario": 0.88,
  Hapvida: 0.9,
  PRIO: 1,
  Tecnospeed: 0.95,
};

export function resolveClientLogoScale(name?: string, cmsScale?: number | null): number {
  if (typeof cmsScale === "number" && Number.isFinite(cmsScale) && cmsScale > 0) {
    return cmsScale;
  }
  if (!name) return 1;
  return CLIENT_LOGO_DEFAULT_SCALES[name] ?? 1;
}
