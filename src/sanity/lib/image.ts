import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import type { SanityImageDoc } from "@/sanity/lib/types";

const builder = projectId && dataset ? imageUrlBuilder({ projectId, dataset }) : null;

/** Coluna principal do hero na home ~560px CSS; pedir ~2x ao CDN para retina sem ir a 1600px. */
export const SANITY_HOME_HERO_MAIN_WIDTH = 1120;
export const SANITY_HOME_HERO_SUPPORTING_WIDTH = 640;

export type SanityImageUrlOptions = {
  width?: number;
  height?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  quality?: number;
  /** Para URLs directas (ex. Unsplash): `entropy`, `focalpoint`, etc. */
  crop?: string;
  /** Ponto focal normalizado (0..1). Ex.: screenshots geralmente beneficiam de y mais alto. */
  focalPoint?: {
    x: number;
    y: number;
  };
};

/** Aplica parâmetros de CDN a uma URL directa (Unsplash, etc.) — útil em scripts e conteúdo estático. */
export function buildDirectImageUrl(directUrl: string, options: SanityImageUrlOptions = {}): string {
  return appendDirectImageParams(directUrl.trim(), options);
}

function appendDirectImageParams(
  directUrl: string,
  { width, height, fit, quality, crop, focalPoint }: SanityImageUrlOptions,
): string {
  try {
    const url = new URL(directUrl);
    url.searchParams.set("auto", "format");
    if (width) url.searchParams.set("w", String(width));
    if (height) url.searchParams.set("h", String(height));
    if (fit) url.searchParams.set("fit", fit);
    if (quality) url.searchParams.set("q", String(quality));
    if (crop) url.searchParams.set("crop", crop);
    if (focalPoint) {
      url.searchParams.set("crop", "focalpoint");
      url.searchParams.set("fp-x", String(focalPoint.x));
      url.searchParams.set("fp-y", String(focalPoint.y));
    }
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
    return buildDirectImageUrl(directUrl, options);
  }
  if (!builder || !image.asset?._ref) return null;

  const defaultWidth = options.width ?? 1600;
  let imageBuilder = builder.image(image).width(defaultWidth).auto("format");
  if (options.height) imageBuilder = imageBuilder.height(options.height);
  if (options.fit) imageBuilder = imageBuilder.fit(options.fit);
  if (options.quality) imageBuilder = imageBuilder.quality(options.quality);
  if (options.focalPoint) {
    imageBuilder = imageBuilder.focalPoint(options.focalPoint.x, options.focalPoint.y);
  }
  return imageBuilder.url();
}
