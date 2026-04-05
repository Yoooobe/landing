import { withBasePath } from "@/lib/basePath";

/**
 * Logo Yoobe (PNG oficial) com anel na paleta atual (`yoobe-blue`).
 */
type YoobeMarkProps = {
  className?: string;
  "aria-label"?: string;
  title?: string;
};

export default function YoobeMark({
  className = "h-12 w-12",
  "aria-label": ariaLabel = "Yoobe",
  title,
}: YoobeMarkProps) {
  return (
    <img
      src={withBasePath("/partners/yoobe-mark.png")}
      alt={ariaLabel}
      title={title}
      width={96}
      height={96}
      className={`rounded-full object-cover shadow-[0_0_24px_rgba(30,58,95,0.45)] ring-2 ring-yoobe-blue/40 ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}
