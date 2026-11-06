import type { Metadata } from "next";
import Link from "next/link";
import TrackedOutboundLink from "@/components/analytics/TrackedOutboundLink";
import { withBasePath } from "@/lib/basePath";
import { DEFAULT_WHATSAPP_URL } from "@/lib/whatsapp";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found | Yoobe",
  description: "The page you are looking for does not exist or has moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-ink-dark px-6 py-24 text-white">
      {/* Brand wordmark */}
      <Link href={withBasePath("/")} className="mb-16 block opacity-90 hover:opacity-100 transition-opacity">
        <img
          src={withBasePath("/brand/yoobe-wordmark@2x.webp")}
          alt="Yoobe"
          width={200}
          height={59}
          fetchPriority="high"
          className="h-10 w-auto object-contain"
        />
      </Link>

      {/* Error code */}
      <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-brand-primary/80">
        Error 404
      </p>
      <h1 className="mb-4 font-heading text-7xl font-black tracking-tight text-white sm:text-9xl">
        404
      </h1>
      <p className="mb-2 text-center text-2xl font-bold text-white/90 sm:text-3xl">
        Page not found
      </p>
      <p className="mb-12 max-w-md text-center leading-relaxed text-white/55">
        The page you are looking for does not exist or has moved. Go back home or talk to our team.
      </p>

      {/* CTAs */}
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href={withBasePath("/")}
          className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl bg-brand-primary px-8 font-bold text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-colors"
        >
          Back to home
        </Link>
        <TrackedOutboundLink
          href={DEFAULT_WHATSAPP_URL}
          source="not-found-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 font-bold text-white hover:bg-white/10 transition-colors"
        >
          Chat on WhatsApp
        </TrackedOutboundLink>
      </div>

      {/* Subtle decoration */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yoobe-purple/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-brand-primary/5 blur-[100px]" />
      </div>
    </div>
  );
}
