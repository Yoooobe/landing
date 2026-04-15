import { Suspense } from "react";
import { isSanityConfigured } from "@/sanity/env";

import StudioClient from "./StudioClient";
import StudioSetup from "./StudioSetup";

export { metadata, viewport } from "next-sanity/studio";

/**
 * Required for `output: 'export'` (GitHub Pages static hosting).
 * Each Sanity Studio tool must be explicitly listed so Next.js pre-renders
 * the corresponding static HTML file (e.g. /studio/presentation/index.html).
 */
export function generateStaticParams() {
  return [
    { tool: [] as string[] },
    { tool: ["structure"] },
    { tool: ["presentation"] },
  ];
}

export default function StudioPage() {
  if (!isSanityConfigured()) {
    return <StudioSetup />;
  }
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-zinc-950" />}>
      <StudioClient />
    </Suspense>
  );
}
