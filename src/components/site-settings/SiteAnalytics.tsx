"use client";

import { useResolvedGaMeasurementId } from "@/contexts/SiteSettingsContext";
import { getGoogleAdsIdFromEnv } from "@/lib/site";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

/**
 * Injeta GA4 após resolver env (prioridade) ou documento Sanity `siteSettings`.
 */
export default function SiteAnalytics() {
  const gaId = useResolvedGaMeasurementId();
  const googleAdsId = getGoogleAdsIdFromEnv();

  if (!gaId && !googleAdsId) {
    return null;
  }

  // Carrega gtag uma única vez. Quando GA4 está presente ele é o destino
  // principal; o Ads é apenas configurado na mesma dataLayer, sem duplicar a
  // biblioteca enviada pelo snippet padrão do Google.
  const loaderId = gaId ?? googleAdsId;

  return (
    <>
      <GoogleAnalytics key={loaderId} gaId={loaderId!} />
      {gaId && googleAdsId ? (
        <Script id="google-ads-config" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('config','${googleAdsId}');`}
        </Script>
      ) : null}
    </>
  );
}
