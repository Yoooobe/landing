/* eslint-disable @next/next/no-img-element */
import { getBlogImageUrl } from "@/lib/blogImageUrl";
import type { BlogCtaBlock, BlogCtaVariant } from "@/sanity/lib/types";
import { ArrowRight, CalendarDays, Layers } from "lucide-react";
import type { ReactNode } from "react";

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function CtaLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children?: ReactNode;
}) {
  const external = isExternalHref(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children ?? label}
    </a>
  );
}

const variantDefaults: Record<
  BlogCtaVariant,
  { icon: typeof Layers; eyebrowFallback: string }
> = {
  feature: { icon: Layers, eyebrowFallback: "Feature" },
  demo: { icon: CalendarDays, eyebrowFallback: "Demo" },
  platform: { icon: ArrowRight, eyebrowFallback: "Plataforma" },
};

export default function BlogInlineCta({ block }: { block: BlogCtaBlock }) {
  const variant: BlogCtaVariant = block.variant ?? "platform";
  const href = block.ctaHref?.trim() || "#";
  const label = block.ctaLabel?.trim() || "Saber mais";
  const title = block.title?.trim() || "";
  const description = block.description?.trim();
  const eyebrow = block.eyebrow?.trim() || variantDefaults[variant].eyebrowFallback;
  const { icon: Icon } = variantDefaults[variant];
  const imageUrl = getBlogImageUrl(block.featureImage ?? undefined, "ctaFeature");

  if (variant === "feature") {
    return (
      <aside
        className="my-10 overflow-hidden rounded-2xl border border-white/10 bg-white/4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
        data-blog-cta={variant}
      >
        <div className="grid gap-0 md:grid-cols-[1fr_minmax(0,280px)]">
          <div className="flex flex-col justify-center p-6 md:p-8">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-orange">
              <Icon className="size-4 shrink-0" aria-hidden />
              {eyebrow}
            </p>
            {title ? (
              <h3 className="mb-3 font-heading text-xl font-bold text-white md:text-2xl">{title}</h3>
            ) : null}
            {description ? <p className="mb-6 text-base leading-relaxed text-white/70">{description}</p> : null}
            <CtaLink
              href={href}
              label={label}
              className="inline-flex h-11 w-fit items-center justify-center rounded-xl bg-brand-orange px-5 text-sm font-semibold text-white transition hover:bg-brand-orange/90"
            />
          </div>
          {imageUrl ? (
            <div className="relative min-h-[200px] border-t border-white/10 md:border-l md:border-t-0">
              <img
                src={imageUrl}
                alt={block.featureImage?.alt || title || ""}
                className="h-full w-full object-cover object-center md:absolute md:inset-0 md:max-h-none"
              />
            </div>
          ) : null}
        </div>
      </aside>
    );
  }

  if (variant === "demo") {
    return (
      <aside
        className="my-10 rounded-2xl border-2 border-brand-orange/35 bg-linear-to-br from-brand-orange/10 to-transparent p-8 text-center md:p-10"
        data-blog-cta={variant}
      >
        <div className="mx-auto flex max-w-xl flex-col items-center">
          <span className="mb-3 inline-flex size-12 items-center justify-center rounded-full border border-brand-orange/40 bg-brand-orange/15 text-brand-orange">
            <CalendarDays className="size-6" aria-hidden />
          </span>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-orange">{eyebrow}</p>
          {title ? (
            <h3 className="mb-3 font-heading text-2xl font-bold text-white md:text-3xl">{title}</h3>
          ) : null}
          {description ? <p className="mb-8 text-base text-white/75">{description}</p> : null}
          <CtaLink
            href={href}
            label={label}
            className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-xl bg-brand-orange px-8 text-base font-semibold text-white shadow-lg shadow-brand-orange/20 transition hover:bg-brand-orange/90"
          />
        </div>
      </aside>
    );
  }

  /* platform */
  return (
    <aside
      className="my-10 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/3 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:p-8"
      data-blog-cta={variant}
    >
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/45">{eyebrow}</p>
        {title ? <h3 className="font-heading text-lg font-bold text-white md:text-xl">{title}</h3> : null}
        {description ? <p className="mt-2 text-sm text-white/65">{description}</p> : null}
      </div>
      <CtaLink
        href={href}
        label={label}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-brand-orange/50 hover:bg-white/10"
      >
        <>
          <span>{label}</span>
          <ArrowRight className="size-4 shrink-0" aria-hidden />
        </>
      </CtaLink>
    </aside>
  );
}
