"use client";

import TrackedOutboundLink from "@/components/analytics/TrackedOutboundLink";
import type { BlogCtaVariant } from "@/sanity/lib/types";
import type { ReactNode } from "react";

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export default function BlogInlineCtaLink({
  href,
  label,
  source,
  className,
  children,
}: {
  href: string;
  label: string;
  source: `blog-cta-${BlogCtaVariant}`;
  className?: string;
  children?: ReactNode;
}) {
  const external = isExternalHref(href);
  if (external) {
    return (
      <TrackedOutboundLink
        href={href}
        source={source}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children ?? label}
      </TrackedOutboundLink>
    );
  }

  return (
    <a href={href} className={className}>
      {children ?? label}
    </a>
  );
}
