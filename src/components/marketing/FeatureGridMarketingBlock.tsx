import { getSanityImageUrl } from "@/sanity/lib/image";
import type { FeatureGridBlockDoc, FeatureGridItemDoc } from "@/sanity/lib/types";
import { fetchSanitizedSvgMarkup } from "@/lib/fetch-sanitized-svg";
import { getMarketingLucideIcon } from "@/lib/marketing-icon-registry";
import { marketingSectionId } from "@/lib/marketing-section-ids";
import Image from "next/image";

type ItemWithSvg = FeatureGridItemDoc & { inlineSvg?: string | null };

export default async function FeatureGridMarketingBlock({ block }: { block: FeatureGridBlockDoc }) {
  const imageUrl = getSanityImageUrl(block.image, { width: 1280, height: 800, fit: "crop", crop: "entropy", quality: 84 });
  const sectionId = marketingSectionId(block._key);
  const columnsClass =
    block.columns === "2"
      ? "md:grid-cols-2"
      : block.columns === "4"
        ? "md:grid-cols-2 xl:grid-cols-4"
        : "md:grid-cols-2 xl:grid-cols-3";

  const rawItems = block.items || [];
  const items: ItemWithSvg[] = await Promise.all(
    rawItems.map(async (item) => {
      const url = item.customSvgUrl?.trim();
      if (!url) return { ...item, inlineSvg: null };
      const inlineSvg = await fetchSanitizedSvgMarkup(url);
      return { ...item, inlineSvg };
    }),
  );

  return (
    <section id={sectionId} className="border-b border-white/5 bg-brand-navy-dark py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {(block.eyebrow || block.title || block.description) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {block.eyebrow ? (
              <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">
                {block.eyebrow}
              </div>
            ) : null}
            {block.title ? (
              <h2 className="font-heading text-3xl font-black text-white md:text-5xl">
                {block.title}
              </h2>
            ) : null}
            {block.description ? (
              <p className="mt-5 text-lg leading-8 text-white/65">{block.description}</p>
            ) : null}
          </div>
        )}
        {imageUrl ? (
          <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl">
            <Image
              src={imageUrl}
              alt={block.image?.alt?.trim() || block.title || "Imagem da seção"}
              width={1440}
              height={900}
              className="h-full w-full rounded-[1.4rem] object-cover"
              sizes="(min-width: 1024px) 960px, 100vw"
              unoptimized
            />
          </div>
        ) : null}
        <div className={`grid gap-6 ${columnsClass}`}>
          {items.map((item, index) => {
            const Icon = getMarketingLucideIcon(item.icon);
            const cardContent = (
              <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-brand-orange/30">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-orange/20 bg-brand-orange/10 [&_svg]:h-full [&_svg]:w-full">
                  {item.inlineSvg ? (
                    <span
                      className="flex h-6 w-6 items-center justify-center text-brand-orange [&_svg]:max-h-6 [&_svg]:max-w-6 [&_svg]:stroke-current"
                      aria-hidden
                      dangerouslySetInnerHTML={{ __html: item.inlineSvg }}
                    />
                  ) : (
                    <Icon className="h-6 w-6 text-brand-orange" aria-hidden />
                  )}
                </div>
                {item.eyebrow ? (
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                    {item.eyebrow}
                  </div>
                ) : null}
                <h3 className="font-heading text-2xl font-bold text-white">{item.title}</h3>
                {item.description ? (
                  <p className="mt-4 text-base leading-7 text-white/65">{item.description}</p>
                ) : null}
              </div>
            );

            if (item.href) {
              return (
                <a key={`${item.title || "feature"}-${index}`} href={item.href} className="block">
                  {cardContent}
                </a>
              );
            }

            return <div key={`${item.title || "feature"}-${index}`}>{cardContent}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
