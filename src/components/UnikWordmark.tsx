/* eslint-disable @next/next/no-img-element */
import { withBasePath } from "@/lib/basePath";

/** Dimensões nativas do asset publicado `brand/4unik-wordmark@2x.png`. */
export const UNIK_WORDMARK_NATURAL = { w: 374, h: 110 } as const;

const variantClass = {
  /** Barra fixa: altura estável, largura automática (não distorce). */
  header:
    "h-10 w-[164px] sm:h-11 sm:w-[180px] md:h-12 md:w-[196px] max-w-[min(196px,58vw)]",
  /** Rodapé: um pouco menor, alinhado à coluna de texto. */
  footer: "h-8 w-[136px] sm:h-9 sm:w-[148px] md:h-10 md:w-[164px]",
  /** Mockups e UI compacta. */
  compact: "h-6 w-[96px]",
  /** Destaque na home (acima do fold). */
  hero: "mx-auto h-12 w-[172px] sm:h-14 sm:w-[204px] md:h-16 md:w-[236px]",
} as const;

export type UnikWordmarkVariant = keyof typeof variantClass;

type Props = {
  variant?: UnikWordmarkVariant;
  className?: string;
  alt?: string;
};

/** Wordmark oficial 4unik usando sempre o PNG publicado. */
export default function UnikWordmark({
  variant = "header",
  className = "",
  alt = "4unik",
}: Props) {
  const src = withBasePath("/brand/4unik-wordmark@2x.webp");

  const isAboveFold = variant === "header" || variant === "hero";

  return (
    <img
      src={src}
      width={UNIK_WORDMARK_NATURAL.w}
      height={UNIK_WORDMARK_NATURAL.h}
      alt={alt}
      className={`object-contain object-left ${variantClass[variant]} ${className}`}
      decoding="async"
      fetchPriority={isAboveFold ? "high" : "auto"}
    />
  );
}
