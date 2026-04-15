/* eslint-disable @next/next/no-img-element */

type Layout = "articleCover" | "inlineFigure" | "cardThumb" | "featuredSplit";

const wrapperClass: Record<Layout, string> = {
  articleCover:
    "relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0a101c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] aspect-[16/9] max-h-[min(58vh,560px)] sm:max-h-[min(52vh,600px)]",
  inlineFigure:
    "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a101c] aspect-[16/10] max-h-[min(70vh,520px)]",
  cardThumb: "absolute inset-0 h-full w-full overflow-hidden bg-[#0a101c]",
  featuredSplit: "relative h-full min-h-[16rem] w-full overflow-hidden bg-[#0a101c] md:absolute md:inset-0 md:min-h-0",
};

const sizesAttr: Record<Layout, string> = {
  articleCover: "(max-width: 896px) 100vw, 896px",
  inlineFigure: "(max-width: 896px) 100vw, 800px",
  cardThumb: "(max-width: 768px) 100vw, 320px",
  featuredSplit: "(max-width: 768px) 100vw, 50vw",
};

type Props = {
  src: string;
  alt: string;
  layout: Layout;
  /** Capa do artigo: carregar logo (LCP). */
  priority?: boolean;
  className?: string;
  /** Classes na `<img>` (ex. `group-hover:scale-105` em cartões com `group` no link). */
  imgClassName?: string;
};

/**
 * Figura editorial: contentor com aspect-ratio fixo + img com object-cover/center
 * para evitar distorção e áreas vazias quando a foto tem proporção diferente.
 */
export default function BlogContentImage({ src, alt, layout, priority, className, imgClassName }: Props) {
  const wrap = [wrapperClass[layout], className].filter(Boolean).join(" ");
  const imgCls = ["absolute inset-0 h-full w-full object-cover object-center", imgClassName]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={wrap}>
      <img
        src={src}
        alt={alt}
        sizes={sizesAttr[layout]}
        width={layout === "inlineFigure" ? 1280 : layout === "cardThumb" ? 900 : 1600}
        height={layout === "inlineFigure" ? 800 : layout === "cardThumb" ? 520 : 900}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={imgCls}
      />
    </div>
  );
}
