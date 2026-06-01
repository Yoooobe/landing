"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import config from "@/sanity/studioConfig";
import { BASE_PATH } from "@/lib/basePath";
import {
  getCanonicalMarketingPageStudioPath,
  resolveStudioRestoreTarget,
  SANITY_STUDIO_RESTORE_PATH_KEY,
} from "@/sanity/studioDeepLink";

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

function StudioLoadingShell() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-950 text-sm text-zinc-400">
      A carregar o Studio…
    </div>
  );
}

/**
 * Client-only: evita erros de SSR / createContext ao recolher dados da rota Studio com `output: 'export'`.
 */
export default function StudioClient() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const searchSuffix = search ? `?${search}` : "";
  const [studioReady, setStudioReady] = useState(false);

  useLayoutEffect(() => {
    setStudioReady(false);

    try {
      const stored = sessionStorage.getItem(SANITY_STUDIO_RESTORE_PATH_KEY);
      if (stored) {
        sessionStorage.removeItem(SANITY_STUDIO_RESTORE_PATH_KEY);
        const target = resolveStudioRestoreTarget(stored, BASE_PATH);
        const current = `${pathname ?? ""}${searchSuffix}`;
        if (target !== current) {
          router.replace(target);
          return;
        }
      }
    } catch {
      /* sessionStorage indisponível */
    }

    const canonicalPath = getCanonicalMarketingPageStudioPath(pathname, searchSuffix);
    if (canonicalPath) {
      router.replace(canonicalPath);
      return;
    }

    setStudioReady(true);
  }, [pathname, router, searchSuffix]);

  if (!studioReady) {
    return <StudioLoadingShell />;
  }

  return (
    <StudioErrorBoundary>
      <NextStudio config={config} />
    </StudioErrorBoundary>
  );
}
