/* eslint-disable @next/next/no-img-element */
import BlogInlineCta from "@/components/BlogInlineCta";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type {
  BlogCtaBlock,
  BlogPostBodyItem,
  PortableTextBlock,
  PortableTextMarkDefinition,
  PortableTextSpan,
} from "@/sanity/lib/types";
import type { ReactNode } from "react";

type Props = {
  blocks?: BlogPostBodyItem[];
};

function isTextBlock(item: BlogPostBodyItem): item is PortableTextBlock {
  return item._type === "block";
}

function isBlogCtaBlock(item: BlogPostBodyItem): item is BlogCtaBlock {
  return item._type === "blogCta";
}

function renderSpan(
  span: PortableTextSpan,
  markDefs: PortableTextMarkDefinition[] | undefined,
  key: string,
): ReactNode {
  const base = span.text || "";
  return (span.marks || []).reduce<ReactNode>((node, mark) => {
    if (mark === "strong") return <strong key={`${key}-${mark}`}>{node}</strong>;
    if (mark === "em") return <em key={`${key}-${mark}`}>{node}</em>;
    if (mark === "underline") return <span key={`${key}-${mark}`} className="underline">{node}</span>;

    const def = markDefs?.find((item) => item._key === mark && item._type === "link");
    if (def?.href) {
      return (
        <a
          key={`${key}-${mark}`}
          href={def.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-orange underline decoration-brand-orange/40 underline-offset-4 transition-colors hover:text-white"
        >
          {node}
        </a>
      );
    }

    return node;
  }, base);
}

function renderBlock(block: PortableTextBlock) {
  const content = (block.children || []).map((span, index) =>
    renderSpan(span, block.markDefs, `${block._key || "block"}-${index}`),
  );

  if (block.style === "h2") {
    return <h2 className="mt-12 text-3xl font-black font-heading text-white">{content}</h2>;
  }

  if (block.style === "h3") {
    return <h3 className="mt-10 text-xl font-bold font-heading text-white md:text-2xl">{content}</h3>;
  }

  if (block.style === "blockquote") {
    return (
      <blockquote className="border-l-2 border-brand-orange/60 pl-6 italic text-white/80">
        {content}
      </blockquote>
    );
  }

  return <p className="text-lg leading-8 text-white/75">{content}</p>;
}

export default function PortableTextContent({ blocks = [] }: Props) {
  const groups: ReactNode[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const item = blocks[index];

    if (item._type === "image") {
      const url = getSanityImageUrl({ asset: item.asset ?? undefined, alt: item.alt });
      groups.push(
        <figure
          key={item._key || `img-${index}`}
          className="my-8 overflow-hidden rounded-2xl border border-white/10"
        >
          {url ? (
            <img
              src={url}
              alt={item.alt || ""}
              className="h-auto max-h-[480px] w-full object-cover"
            />
          ) : null}
        </figure>,
      );
      continue;
    }

    if (isBlogCtaBlock(item)) {
      groups.push(<BlogInlineCta key={item._key || `cta-${index}`} block={item} />);
      continue;
    }

    if (!isTextBlock(item)) {
      continue;
    }

    const block = item;

    if (block.listItem === "bullet" || block.listItem === "number") {
      const items: PortableTextBlock[] = [];
      let offset = index;

      while (offset < blocks.length) {
        const b = blocks[offset];
        if (!isTextBlock(b) || b.listItem !== block.listItem) break;
        items.push(b);
        offset += 1;
      }

      const ListTag = block.listItem === "number" ? "ol" : "ul";
      const listClassName =
        block.listItem === "number"
          ? "list-decimal space-y-3 pl-6 text-white/75"
          : "list-disc space-y-3 pl-6 text-white/75";

      groups.push(
        <ListTag key={block._key || `list-${index}`} className={listClassName}>
          {items.map((listBlock, itemIndex) => (
            <li key={listBlock._key || `item-${itemIndex}`}>
              {(listBlock.children || []).map((span, spanIndex) =>
                renderSpan(span, listBlock.markDefs, `${listBlock._key || "li"}-${spanIndex}`),
              )}
            </li>
          ))}
        </ListTag>,
      );

      index = offset - 1;
      continue;
    }

    groups.push(
      <div key={block._key || `block-${index}`}>
        {renderBlock(block)}
      </div>,
    );
  }

  return <div className="space-y-6">{groups}</div>;
}
