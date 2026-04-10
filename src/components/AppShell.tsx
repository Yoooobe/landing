"use client";

import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { localeFromPathname } from "@/lib/locale";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useMemo(() => localeFromPathname(pathname), [pathname]);

  return (
    <LocaleMessagesProvider locale={locale}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LocaleMessagesProvider>
  );
}
