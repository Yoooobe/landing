"use client";

import { isSanityConfigured } from "@/sanity/env";
import { VisualEditing } from "next-sanity";

/**
 * O overlay visual fica ligado em dev para apoiar o Presentation Tool sem
 * comprometer o export estatico do GitHub Pages em producao.
 */
export default function MarketingVisualEditing() {
  if (!isSanityConfigured() || process.env.NODE_ENV !== "development") {
    return null;
  }

  return <VisualEditing basePath="" trailingSlash />;
}
