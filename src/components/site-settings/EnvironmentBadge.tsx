"use client";

import { useEnvironmentLabel, useSiteSettings } from "@/contexts/SiteSettingsContext";

/**
 * Indicador discreto quando o ambiente não é production (Sanity ou NEXT_PUBLIC_ENVIRONMENT_LABEL).
 */
export default function EnvironmentBadge() {
  const { loading } = useSiteSettings();
  const label = useEnvironmentLabel();

  if (loading || !label) {
    return null;
  }
  const normalized = label.toLowerCase();
  if (normalized === "production" || normalized === "prod") {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed bottom-3 left-3 z-[100] rounded-md border border-amber-500/40 bg-amber-950/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-amber-200/95 shadow-lg backdrop-blur-sm"
      role="status"
      aria-label={`Ambiente: ${label}`}
    >
      {label}
    </div>
  );
}
