import Image from "next/image";
import { getSanityImageUrl, SANITY_IMAGE_PRESETS } from "@/sanity/lib/image";
import type { SanityImageDoc } from "@/sanity/lib/types";

type ShowcaseVariant = "thumb" | "card" | "banner";

const PRESET_BY_VARIANT = {
  thumb: SANITY_IMAGE_PRESETS.showcaseThumb,
  card: SANITY_IMAGE_PRESETS.showcaseCard,
  banner: SANITY_IMAGE_PRESETS.sectionBanner,
} as const;

const DIMENSIONS_BY_VARIANT = {
  thumb: { width: 256, height: 256 },
  card: { width: 720, height: 540 },
  banner: { width: 1280, height: 800 },
} as const;

type Props = {
  image?: SanityImageDoc | null;
  alt: string;
  variant?: ShowcaseVariant;
  /** Sobrepõe o object-fit do preset (banners podem querer cover). */
  fit?: "contain" | "cover";
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Imagem de showcase do CMS com defaults que evitam corte duplo (CDN + CSS).
 * `thumb`/`card` usam `object-contain` para mostrar a imagem inteira; `banner`
 * usa `object-cover` por defeito. Retorna `null` quando não há imagem (o chamador
 * decide o fallback de emoji/ícone).
 */
export default function ShowcaseImage({
  image,
  alt,
  variant = "thumb",
  fit,
  className = "",
  sizes,
  priority = false,
}: Props) {
  const url = getSanityImageUrl(image, PRESET_BY_VARIANT[variant]);
  if (!url) return null;

  const objectFit = (fit ?? (variant === "banner" ? "cover" : "contain")) === "cover"
    ? "object-cover"
    : "object-contain";
  const { width, height } = DIMENSIONS_BY_VARIANT[variant];

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={`h-full w-full ${objectFit} ${className}`.trim()}
      sizes={sizes}
      priority={priority}
      unoptimized
    />
  );
}
