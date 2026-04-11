"use client";

import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";
import EnvironmentBadge from "@/components/site-settings/EnvironmentBadge";
import EnvMarketingScripts from "@/components/site-settings/EnvMarketingScripts";
import MarketingScripts from "@/components/site-settings/MarketingScripts";
import SiteAnalytics from "@/components/site-settings/SiteAnalytics";
import type { ReactNode } from "react";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <EnvMarketingScripts />
      <SiteSettingsProvider>
        {children}
        <SiteAnalytics />
        <MarketingScripts />
        <EnvironmentBadge />
      </SiteSettingsProvider>
    </>
  );
}
