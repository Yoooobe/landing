import { withBasePath } from "@/lib/basePath";

/** Dimensões nativas do arquivo em `public/brand/` (proporção ~3,4:1). */
export const UNIK_WORDMARK_NATURAL = { w: 187, h: 55 } as const;

const variantClass = {
  /** Barra fixa: altura estável, largura automática (não distorce). */
  header:
    "h-10 w-auto max-h-[48px] sm:h-11 sm:max-h-[52px] md:h-12 md:max-h-[56px] max-w-[min(240px,58vw)]",
  /** Rodapé: um pouco menor, alinhado à coluna de texto. */
  footer: "h-8 w-auto max-h-9 sm:h-9 sm:max-h-10 md:h-10 md:max-h-11",
  /** Mockups e UI compacta. */
  compact: "h-6 w-auto max-h-6",
  /** Destaque na home (acima do fold). */
  hero: "h-11 w-auto max-h-12 sm:h-14 sm:max-h-14 md:h-16 md:max-h-16 mx-auto",
} as const;

export type UnikWordmarkVariant = keyof typeof variantClass;

type Props = {
  variant?: UnikWordmarkVariant;
  className?: string;
};

/**
 * Wordmark oficial 4unik (PNG + srcSet 2x). Cores preservadas; fundo transparente.
 */
export default function UnikWordmark({ variant = "header", className = "" }: Props) {
  const src = withBasePath("/brand/4unik-wordmark.png");
  const src2x = withBasePath("/brand/4unik-wordmark@2x.png");

  return (
    <img
      src={src}
      srcSet={`${src} 1x, ${src2x} 2x`}
      width={UNIK_WORDMARK_NATURAL.w}
      height={UNIK_WORDMARK_NATURAL.h}
      alt="4unik"
      className={`object-contain object-left ${variantClass[variant]} ${className}`}
      decoding="async"
    />
  );
}
