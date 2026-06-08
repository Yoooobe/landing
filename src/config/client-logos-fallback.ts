import { withBasePath } from "@/lib/basePath";
import type { ClientLogoTreatment } from "@/lib/clientLogoStyles";

/** Static fallback logos when Sanity is empty or image fails. */
export const FALLBACK_TRUST_LOGOS = [
  { src: withBasePath("/clients/prio-mono.svg"), alt: "PRIO", treatment: "mono-light" as const },
  { src: withBasePath("/clients/hapvida-mono.svg"), alt: "Hapvida", treatment: "mono-light" as const },
  { src: withBasePath("/clients/tecnospeed.svg"), alt: "Tecnospeed", treatment: "mono-light" as const },
  { src: withBasePath("/clients/boticario-mono.svg"), alt: "O Boticário", treatment: "mono-light" as const },
] as const;

export const FALLBACK_CLIENTS_GRID_LOGOS = [
  ...FALLBACK_TRUST_LOGOS,
  { src: withBasePath("/clients/w1-consultoria.svg"), alt: "W1 Consultoria", treatment: "mono-light" as const, scale: 0.82 },
  { src: withBasePath("/clients/contabilizei-mono.svg"), alt: "Contabilizei", treatment: "mono-light" as const, scale: 0.92 },
] as const;

export type FallbackClientLogo = {
  src: string;
  alt: string;
  href?: string;
  scale?: number;
  treatment?: ClientLogoTreatment;
};
