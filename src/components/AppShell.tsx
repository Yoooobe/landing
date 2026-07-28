"use client";

import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { localeFromPathname } from "@/lib/locale";
import Footer from "@/components/Footer";
import GlobalConversionDock from "@/components/GlobalConversionDock";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useMemo(() => localeFromPathname(pathname), [pathname]);

  return (
    <LocaleMessagesProvider locale={locale}>
      <div className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-navy-dark focus:shadow-lg focus:ring-2 focus:ring-brand-orange/70"
        >
          {locale === "en" ? "Skip to content" : "Ir para o conteúdo"}
        </a>
        <Header />
        <main id="main-content" className="flex-1 pb-28 sm:pb-24 lg:pb-6" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <GlobalConversionDock />
      </div>
    </LocaleMessagesProvider>
  );
}
