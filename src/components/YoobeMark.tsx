/* eslint-disable @next/next/no-img-element */
import { withBasePath } from "@/lib/basePath";

const sizes = {
  hero: "h-14 w-14 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]",
  compact: "h-8 w-8",
} as const;

type YoobeMarkProps = {
  variant?: keyof typeof sizes;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
  title?: string;
};

/** Símbolo redondo oficial da Yoobe — usado onde o wordmark do header já aparece, para não duplicar o logo. */
export default function YoobeMark({
  variant,
  className = "h-12 w-12",
  "aria-label": ariaLabel = "Yoobe",
  "aria-hidden": ariaHidden,
  title,
}: YoobeMarkProps) {
  const size = variant ? sizes[variant] : className;
  return (
    <img
      src={withBasePath("/brand/yoobe-mark.webp")}
      width={512}
      height={512}
      alt={ariaHidden ? "" : ariaLabel}
      aria-hidden={ariaHidden}
      title={title}
      className={`shrink-0 rounded-full object-contain ${size} ${variant ? className.replace("h-12 w-12", "") : ""}`}
      decoding="async"
      fetchPriority={variant === "hero" ? "high" : "auto"}
    />
  );
}
