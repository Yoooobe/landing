"use client";

/**
 * GTM, Meta Pixel e LinkedIn apenas a partir de `NEXT_PUBLIC_*` — não depende de
 * `SiteSettingsProvider` nem de fetch ao Sanity, para injeção mais cedo no paint.
 */
import {
  getGoogleTagManagerIdFromEnv,
  getLinkedinPartnerIdFromEnv,
  getMetaPixelIdFromEnv,
} from "@/lib/site";
import Script from "next/script";
import { useMemo } from "react";

export default function EnvMarketingScripts() {
  const gtm = getGoogleTagManagerIdFromEnv();
  const pixel = getMetaPixelIdFromEnv();
  const linkedin = getLinkedinPartnerIdFromEnv();

  const gtmScript = useMemo(() => {
    if (!gtm || !/^GTM-[A-Z0-9]+$/i.test(gtm)) return null;
    return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtm}');`;
  }, [gtm]);

  const fbScript = useMemo(() => {
    if (!pixel || !/^\d+$/.test(pixel)) return null;
    return `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixel}');
fbq('track', 'PageView');`;
  }, [pixel]);

  const linkedinScript = useMemo(() => {
    if (!linkedin || !/^[a-zA-Z0-9_-]+$/.test(linkedin)) return null;
    const id = linkedin.replace(/'/g, "");
    return `(function(){
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push('${id}');
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
})();`;
  }, [linkedin]);

  return (
    <>
      {gtmScript ? (
        <Script id="gtm-env" strategy="afterInteractive">
          {gtmScript}
        </Script>
      ) : null}
      {gtm && /^GTM-[A-Z0-9]+$/i.test(gtm) ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtm)}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      ) : null}
      {fbScript ? (
        <Script id="fb-pixel-env" strategy="afterInteractive">
          {fbScript}
        </Script>
      ) : null}
      {linkedinScript ? (
        <Script id="linkedin-insight-env" strategy="afterInteractive">
          {linkedinScript}
        </Script>
      ) : null}
    </>
  );
}
