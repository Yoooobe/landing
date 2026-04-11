"use client";

import { createBrowserSanityClient } from "@/sanity/lib/browserClient";
import {
  siteSettingsQuery,
  type SiteSettingsQueryResult,
} from "@/sanity/queries/siteSettings";
import { isSanityConfigured } from "@/sanity/env";
import type { MenuDoc } from "@/sanity/lib/types";
import type { Locale } from "@/lib/locale";
import { getGoogleAnalyticsIdFromEnv } from "@/lib/site";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type SiteSettingsState = {
  /** Carregamento inicial da query Sanity (false se Sanity não configurado). */
  loading: boolean;
  error: Error | null;
  /** Documento Sanity ou null se inexistente / erro. */
  sanity: SiteSettingsQueryResult;
};

const defaultState: SiteSettingsState = {
  loading: true,
  error: null,
  sanity: null,
};

const SiteSettingsContext = createContext<SiteSettingsState>(defaultState);

function resolveGaMeasurementId(sanity: SiteSettingsQueryResult): string | undefined {
  const envId = getGoogleAnalyticsIdFromEnv();
  if (envId) {
    return envId;
  }
  const raw = sanity?.gaMeasurementId?.trim();
  if (!raw || raw === "G-XXXXXXXXXX" || !/^G-[A-Z0-9]+$/i.test(raw)) {
    return undefined;
  }
  return raw;
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(isSanityConfigured());
  const [error, setError] = useState<Error | null>(null);
  const [sanity, setSanity] = useState<SiteSettingsQueryResult>(null);

  const fetchSettings = useCallback(async () => {
    if (!isSanityConfigured()) {
      setLoading(false);
      return;
    }
    const client = createBrowserSanityClient();
    if (!client) {
      setLoading(false);
      return;
    }
    try {
      const doc = await client.fetch<SiteSettingsQueryResult>(siteSettingsQuery);
      setSanity(doc);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSettings();
  }, [fetchSettings]);

  const value = useMemo<SiteSettingsState>(
    () => ({
      loading,
      error,
      sanity,
    }),
    [loading, error, sanity],
  );

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettingsState {
  return useContext(SiteSettingsContext);
}

export function useResolvedGaMeasurementId(): string | undefined {
  const { sanity } = useSiteSettings();
  return useMemo(() => resolveGaMeasurementId(sanity), [sanity]);
}

export function useEnvironmentLabel(): string | undefined {
  const { sanity } = useSiteSettings();
  const envOverride = process.env.NEXT_PUBLIC_ENVIRONMENT_LABEL?.trim();
  if (envOverride) {
    return envOverride;
  }
  return sanity?.environmentLabel?.trim() || undefined;
}

export function useSiteShellMenu(
  location: "header" | "footer",
  locale: Locale,
): MenuDoc | null {
  const { sanity } = useSiteSettings();

  if (location === "header") {
    return locale === "en" ? sanity?.headerMenuEn ?? null : sanity?.headerMenuPt ?? null;
  }

  return locale === "en" ? sanity?.footerMenuEn ?? null : sanity?.footerMenuPt ?? null;
}
