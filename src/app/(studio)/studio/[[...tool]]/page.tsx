import { Suspense } from "react";
import { isSanityConfigured } from "@/sanity/env";

import StudioClient from "./StudioClient";
import StudioSetup from "./StudioSetup";

export { metadata, viewport } from "next-sanity/studio";

/** Required for `output: 'export'` (GitHub Pages static hosting). */
export function generateStaticParams() {
  return [{ tool: [] as string[] }];
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
