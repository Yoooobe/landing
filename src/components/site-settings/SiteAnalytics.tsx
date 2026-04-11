"use client";

import { useResolvedGaMeasurementId } from "@/contexts/SiteSettingsContext";
import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * Injeta GA4 após resolver env (prioridade) ou documento Sanity `siteSettings`.
 */
export default function SiteAnalytics() {
  const gaId = useResolvedGaMeasurementId();
  if (!gaId) {
    return null;
  }
  return <GoogleAnalytics key={gaId} gaId={gaId} />;
}
