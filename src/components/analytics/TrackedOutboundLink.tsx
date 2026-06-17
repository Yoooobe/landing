"use client";

import { outboundConversionEventName } from "@/lib/analyticsEvents";
import { sendGAEvent } from "@next/third-parties/google";
import type { ComponentProps } from "react";

export function trackOutboundConversion(href: string, source: string) {
  const event = outboundConversionEventName(href);
  if (!event) return;
  sendGAEvent("event", event, { source, link_url: href });
}

type TrackedOutboundLinkProps = ComponentProps<"a"> & {
  /** Identifies where the click happened (e.g. header-demo, home-final-cta-whatsapp). */
  source: string;
};

/**
 * External `<a>` that fires `schedule_demo` or `contact_whatsapp` before navigation.
 */
export default function TrackedOutboundLink({
  href,
  source,
  onClick,
  ...props
}: TrackedOutboundLinkProps) {
  const url = typeof href === "string" ? href : "";

  return (
    <a
      href={href}
      {...props}
      onClick={(event) => {
        if (url) trackOutboundConversion(url, source);
        onClick?.(event);
      }}
    />
  );
}
