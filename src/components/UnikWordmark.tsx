/* eslint-disable @next/next/no-img-element */
import { withBasePath } from "@/lib/basePath";

/** Dimensões nativas do lockup 1× `brand/4unik-logo-lockup.webp` (187×55). */
export const UNIK_WORDMARK_NATURAL = { w: 187, h: 55 } as const;

const variantClass = {
  /** Barra fixa: altura estável, largura pelo aspect do lockup. */
  header:
    "h-9 w-[122px] sm:h-10 sm:w-[136px] md:h-11 md:w-[150px] max-w-[min(150px,52vw)]",
  /** Rodapé: um pouco menor, alinhado à coluna de texto. */
  footer: "h-7 w-[95px] sm:h-8 sm:w-[109px] md:h-9 md:w-[122px]",
  /** Mockups e UI compacta. */
  compact: "h-5 w-[68px]",
  /** Destaque na home (acima do fold) — cap ≤ native 1× width to avoid soft upscale. */
  hero: "mx-auto h-11 w-[150px] sm:h-12 sm:w-[163px] md:h-[55px] md:w-[187px]",
} as const;

const variantSizes = {
  header: "(min-width: 768px) 150px, (min-width: 640px) 136px, 122px",
  footer: "(min-width: 768px) 122px, (min-width: 640px) 109px, 95px",
  compact: "68px",
  hero: "(min-width: 768px) 187px, (min-width: 640px) 163px, 150px",
} as const;

export type UnikWordmarkVariant = keyof typeof variantClass;

type Props = {
  variant?: UnikWordmarkVariant;
  className?: string;
  alt?: string;
};

/** Lockup oficial 4Unik (mark + wordmark) usando o asset publicado. */
export default function UnikWordmark({
  variant = "header",
  className = "",
  alt = "4Unik",
}: Props) {
  const src1x = withBasePath("/brand/4unik-logo-lockup.webp");
  const src2x = withBasePath("/brand/4unik-logo-lockup-2x.webp");

  const isAboveFold = variant === "header" || variant === "hero";

  return (
    <img
      src={src1x}
      srcSet={`${src1x} ${UNIK_WORDMARK_NATURAL.w}w, ${src2x} ${UNIK_WORDMARK_NATURAL.w * 2}w`}
      sizes={variantSizes[variant]}
      width={UNIK_WORDMARK_NATURAL.w}
      height={UNIK_WORDMARK_NATURAL.h}
      alt={alt}
      className={`object-contain object-left ${variantClass[variant]} ${className}`}
      decoding="async"
      fetchPriority={isAboveFold ? "high" : "auto"}
    />
  );
}
