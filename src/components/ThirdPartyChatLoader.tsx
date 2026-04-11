"use client";

import Script from "next/script";

/**
 * Optional third-party chat widget (Intercom, Crisp, etc.).
 * Set `NEXT_PUBLIC_CHAT_SCRIPT_URL` to the vendor script URL — no backend required for static export.
 */
export default function ThirdPartyChatLoader() {
  const src = process.env.NEXT_PUBLIC_CHAT_SCRIPT_URL?.trim();
  if (!src) return null;
  return <Script src={src} strategy="lazyOnload" />;
}
