/** Canonical client logo registry — single source for fallbacks, seeds and scales. */

import { withBasePath } from "@/lib/basePath";
import type { ClientLogoTreatment } from "@/lib/clientLogoStyles";

export type ClientLogoEntry = {
  name: string;
  src: string;
  scale?: number;
  treatment?: ClientLogoTreatment;
};

const logo = (
  name: string,
  file: string,
  scale = 1,
  treatment: ClientLogoTreatment = "color",
): ClientLogoEntry => ({
  name,
  src: withBasePath(`/clients/${file}`),
  scale,
  treatment,
});

/** Core enterprise logos (trust bar + grid). */
export const CORE_CLIENT_LOGOS: ClientLogoEntry[] = [
  logo("PRIO", "prio.svg", 0.82),
  logo("Hapvida", "hapvida.webp", 0.72),
  logo("Tecnospeed", "tecnospeed.svg", 0.78),
  logo("O Boticário", "boticario.webp", 0.68),
];

/** Newer partner brands shown in the trust bar and grid. */
export const PARTNER_CLIENT_LOGOS: ClientLogoEntry[] = [
  logo("Grupo Permaneo", "permaneo.webp", 0.95),
  logo("Cast AI", "cast-ai.webp", 0.95),
  logo("Join", "join.webp", 0.72),
  logo("CASP", "casp.webp", 0.95),
];

/** Additional grid-only logos. */
export const EXTENDED_CLIENT_LOGOS: ClientLogoEntry[] = [
  logo("W1 Consultoria", "w1-consultoria.svg", 0.72, "mono-light"),
  logo("Contabilizei", "contabilizei.svg", 0.7),
  logo("AMARO", "amaro.svg", 0.62),
  logo("Auto Compara", "auto-compara.svg", 0.88),
  logo("Be.multti", "be-multti.svg", 0.82),
  logo("bling!", "bling.svg", 0.72),
  logo("BMS", "bms.svg", 0.78),
  logo("Cashin", "cashin.svg", 0.68),
  logo("Centauro", "centauro.svg", 0.82),
  logo("HUBLA", "hubla.svg", 0.62),
  logo("Claro", "claro.svg", 0.72),
];

export const FALLBACK_TRUST_LOGOS = [...CORE_CLIENT_LOGOS, ...PARTNER_CLIENT_LOGOS];

export const FALLBACK_CLIENTS_GRID_LOGOS = [
  ...CORE_CLIENT_LOGOS,
  ...PARTNER_CLIENT_LOGOS,
  ...EXTENDED_CLIENT_LOGOS,
];

export type FallbackClientLogo = ClientLogoEntry & {
  alt?: string;
  href?: string;
};

/** Relative paths for Sanity seed scripts (`public/clients/...`). */
export const CLIENT_LOGO_SEED_ROWS = [
  ...CORE_CLIENT_LOGOS,
  ...PARTNER_CLIENT_LOGOS,
  ...EXTENDED_CLIENT_LOGOS,
].map((entry) => ({
  name: entry.name,
  file: entry.src.split("/clients/")[1] ?? "",
  scale: entry.scale ?? 1,
  treatment: entry.treatment ?? "color",
}));
