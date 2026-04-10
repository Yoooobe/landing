"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/studioConfig";

import StudioErrorBoundary from "./StudioErrorBoundary";

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
