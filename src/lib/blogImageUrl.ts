import { buildDirectImageUrl, getSanityImageUrl } from "@/sanity/lib/image";
import type { SanityImageDoc } from "@/sanity/lib/types";

/**
 * Presets para pedir ao CDN (Sanity ou Unsplash via query string) dimensões e crop coerentes
 * com os contentores do blog — reduz imagens “estouradas” e recortes aleatórios.
 */
export const BLOG_IMAGE_PRESETS = {
  /** Capa no topo do artigo (contentor ~16:9, max-width 4xl). */
  articleCover: {
    width: 1600,
    height: 900,
    fit: "crop" as const,
    quality: 85,
    crop: "entropy",
  },
  /** Figuras inline no corpo (Portable Text). */
  inlineFigure: {
    width: 1280,
    height: 800,
    fit: "crop" as const,
    quality: 82,
    crop: "entropy",
  },
  /** Thumbnail na grelha do índice (h-44). */
  cardThumb: {
    width: 900,
    height: 520,
    fit: "crop" as const,
    quality: 80,
    crop: "entropy",
  },
  /** Metade do cartão “destaque” no índice (split layout). */
  featuredSplit: {
    width: 1200,
    height: 880,
    fit: "crop" as const,
    quality: 85,
    crop: "entropy",
  },
  /** Imagem lateral no CTA “feature”. */
  ctaFeature: {
    width: 720,
    height: 520,
    fit: "crop" as const,
    quality: 84,
    crop: "entropy",
  },
} as const;

export type BlogImagePreset = keyof typeof BLOG_IMAGE_PRESETS;

export function getBlogImageUrl(
  image: SanityImageDoc | null | undefined,
  preset: BlogImagePreset,
): string | null {
  return getSanityImageUrl(image, BLOG_IMAGE_PRESETS[preset]);
}

/** Normaliza uma URL externa (ex. Unsplash) para o mesmo preset usado no site. */
export function optimizeBlogDirectUrl(rawUrl: string, preset: BlogImagePreset): string {
  return buildDirectImageUrl(rawUrl, BLOG_IMAGE_PRESETS[preset]);
}
