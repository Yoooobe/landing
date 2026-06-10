/** Shared visual treatment for client / trust logos. */

import type { CSSProperties } from "react";

export type ClientLogoTreatment = "mono-light" | "color";

export type ClientLogoDisplay = "compact" | "grid";

const COMPACT_IMAGE =
  "h-8 w-auto max-w-[min(100%,8.5rem)] object-contain md:h-9 md:max-w-36";
const GRID_IMAGE =
  "h-9 w-auto max-w-[min(100%,9.5rem)] object-contain md:h-10 md:max-w-40";

const MONO_LIGHT =
  "brightness-0 opacity-80 transition-all duration-300 group-hover:opacity-100";
const COLOR = "opacity-100 transition-all duration-300 group-hover:scale-[1.02]";

export function clientLogoImageClass(
  display: ClientLogoDisplay,
  treatment: ClientLogoTreatment = "color",
): string {
  const size = display === "compact" ? COMPACT_IMAGE : GRID_IMAGE;
  const tone = treatment === "color" ? COLOR : MONO_LIGHT;
  return [size, tone].join(" ");
}

export function clientLogoSlotClass(display: ClientLogoDisplay): string {
  if (display === "compact") {
    return "group flex h-[4.25rem] w-[9.5rem] items-center justify-center rounded-2xl bg-white px-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)] md:h-[4.75rem] md:w-[10.5rem]";
  }

  return "group flex h-[5.5rem] w-full items-center justify-center rounded-2xl bg-white px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.16)] md:h-[6rem] md:px-5";
}

export function clientLogoScaleStyle(scale?: number | null): CSSProperties | undefined {
  const value = typeof scale === "number" && Number.isFinite(scale) ? scale : 1;
  if (value === 1) return undefined;
  return { transform: `scale(${value})`, transformOrigin: "center" };
}

/** Default per-brand scale tweaks when CMS scale is unset. */
export const CLIENT_LOGO_DEFAULT_SCALES: Record<string, number> = {
  PRIO: 0.82,
  Hapvida: 0.72,
  Tecnospeed: 0.78,
  "O Boticário": 0.68,
  "O Boticario": 0.68,
  "Grupo Permaneo": 0.95,
  "Cast AI": 0.95,
  Join: 0.72,
  CASP: 0.95,
  "W1 Consultoria": 0.72,
  W1: 0.72,
  Contabilizei: 0.7,
  AMARO: 0.62,
  "Auto Compara": 0.88,
  "Be.multti": 0.82,
  "bling!": 0.72,
  BMS: 0.78,
  Cashin: 0.68,
  Centauro: 0.82,
  HUBLA: 0.62,
  Claro: 0.72,
};

export function resolveClientLogoScale(name?: string, cmsScale?: number | null): number {
  if (typeof cmsScale === "number" && Number.isFinite(cmsScale) && cmsScale > 0) {
    return cmsScale;
  }
  if (!name) return 1;
  return CLIENT_LOGO_DEFAULT_SCALES[name] ?? 1;
}
