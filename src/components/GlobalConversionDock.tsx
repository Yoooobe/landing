"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import {
  resolvePrimaryContactHref,
  scrollToPrimaryContact,
  shouldScrollPrimaryContactInPlace,
} from "@/lib/resolvePrimaryContactHref";
import { MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const WHATSAPP_FALLBACK = "https://wa.me/554187582060";

export default function GlobalConversionDock() {
  const pathname = usePathname();
  const router = useRouter();
  const { m, path } = useLocaleMessages();
  const { sanity } = useSiteSettings();
  const d = m.conversionDock;

  if (!pathname || pathname.includes("/studio")) {
    return null;
  }

  const whatsappUrl = sanity?.whatsappUrl?.trim() || WHATSAPP_FALLBACK;
  const contactHref = resolvePrimaryContactHref(pathname, path);
  const scrollInPlace = shouldScrollPrimaryContactInPlace(pathname, path);

  function goToForm(e: React.MouseEvent) {
    e.preventDefault();
    if (scrollInPlace) {
      scrollToPrimaryContact();
    } else {
      router.push(contactHref);
    }
  }

  return (
    <div
      className="pointer-events-none fixed bottom-0 right-0 z-40 flex flex-col items-end gap-2 p-3 sm:bottom-4 sm:right-4 sm:p-0 md:gap-3"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="pointer-events-auto flex w-full max-w-[100vw] flex-col gap-2 sm:w-auto sm:min-w-[200px]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 text-sm font-bold text-white shadow-lg shadow-black/30 transition hover:bg-[#128C7E] sm:h-11 sm:text-[0.85rem]"
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
          {d.whatsappCta}
        </a>
        {scrollInPlace ? (
          <button
            type="button"
            onClick={goToForm}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-yoobe-purple px-4 text-sm font-bold text-white shadow-lg shadow-yoobe-purple/25 transition hover:bg-yoobe-purple/90 sm:h-11 sm:text-[0.85rem]"
          >
            <Send className="h-4 w-4 shrink-0" aria-hidden />
            {d.formCta}
          </button>
        ) : (
          <Link
            href={contactHref}
            scroll
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-yoobe-purple px-4 text-sm font-bold text-white shadow-lg shadow-yoobe-purple/25 transition hover:bg-yoobe-purple/90 sm:h-11 sm:text-[0.85rem]"
          >
            <Send className="h-4 w-4 shrink-0" aria-hidden />
            {d.formCta}
          </Link>
        )}
      </div>
    </div>
  );
}
