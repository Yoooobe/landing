import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import type { SanityImageDoc } from "@/sanity/lib/types";

const builder = projectId && dataset ? imageUrlBuilder({ projectId, dataset }) : null;

type SanityImageUrlOptions = {
  width?: number;
  height?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  quality?: number;
};

function appendDirectImageParams(
  directUrl: string,
  { width, height, fit, quality }: SanityImageUrlOptions,
): string {
  try {
    const url = new URL(directUrl);
    url.searchParams.set("auto", "format");
    if (width) url.searchParams.set("w", String(width));
    if (height) url.searchParams.set("h", String(height));
    if (fit) url.searchParams.set("fit", fit);
    if (quality) url.searchParams.set("q", String(quality));
    return url.toString();
  } catch {
    return directUrl;
  }
}

export function getSanityImageUrl(
  image?: SanityImageDoc | null,
  options: SanityImageUrlOptions = {},
): string | null {
  if (!image) return null;

  const directUrl = image.asset?.url?.trim();
  if (directUrl) {
    return appendDirectImageParams(directUrl, options);
  }
  if (!builder || !image.asset?._ref) return null;

  let imageBuilder = builder.image(image).width(options.width ?? 1600).auto("format");
  if (options.height) imageBuilder = imageBuilder.height(options.height);
  if (options.fit) imageBuilder = imageBuilder.fit(options.fit);
  if (options.quality) imageBuilder = imageBuilder.quality(options.quality);
  return imageBuilder.url();
}
