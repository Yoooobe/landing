"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import config from "@/sanity/studioConfig";

import StudioErrorBoundary from "./StudioErrorBoundary";

/**
 * Sanity Studio (styled-components) não deve SSR: hashes de classe diferem entre servidor e cliente
 * e causam hydration mismatch. Só montar no browser.
 */
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-zinc-950 text-sm text-zinc-400">
        A carregar o Studio…
      </div>
    ),
  },
);

const MARKETING_PAGE_DOCUMENT_ID_RE = /^marketingPage\.(pt|en)\.[^/;]+$/;

function getCanonicalMarketingPageStudioPath(
  pathname: string | null,
  search: string,
): string | null {
  if (!pathname) {
    return null;
  }

  const structurePrefix = "/studio/structure/";
  const prefixIndex = pathname.indexOf(structurePrefix);

  if (prefixIndex === -1) {
    return null;
  }

  const panePath = pathname.slice(prefixIndex + structurePrefix.length);
  const segments = panePath.split(";").filter(Boolean);
  const documentId = segments.at(-1);

  if (!documentId || !MARKETING_PAGE_DOCUMENT_ID_RE.test(documentId)) {
    return null;
  }

  const canonicalPanePath = `marketingPage;${documentId}`;

  if (panePath === canonicalPanePath) {
    return null;
  }

  const basePath = pathname.slice(0, prefixIndex + structurePrefix.length);
  return `${basePath}${canonicalPanePath}${search}`;
}

/**
 * Client-only: evita erros de SSR / createContext ao recolher dados da rota Studio com `output: 'export'`.
 */
export default function StudioClient() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const canonicalPath = getCanonicalMarketingPageStudioPath(
    pathname,
    search ? `?${search}` : "",
  );

  useEffect(() => {
    if (canonicalPath) {
      router.replace(canonicalPath);
    }
  }, [canonicalPath, router]);

  if (canonicalPath) {
    return null;
  }

  return (
    <StudioErrorBoundary>
      <NextStudio config={config} />
    </StudioErrorBoundary>
  );
}
