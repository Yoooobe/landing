"use client";

import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";
import { getMessages, type Messages } from "@/messages";
import { createContext, useCallback, useContext, useMemo } from "react";

type Ctx = {
  locale: Locale;
  m: Messages;
  path: (p: string) => string;
};

const LocaleMessagesContext = createContext<Ctx | null>(null);

export function LocaleMessagesProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const m = useMemo(() => getMessages(locale), [locale]);
  const path = useCallback((p: string) => localizedPath(p, locale), [locale]);
  const value = useMemo(() => ({ locale, m, path }), [locale, m, path]);

  return (
    <LocaleMessagesContext.Provider value={value}>{children}</LocaleMessagesContext.Provider>
  );
}

export function useLocaleMessages(): Ctx {
  const ctx = useContext(LocaleMessagesContext);
  if (!ctx) {
    throw new Error("useLocaleMessages must be used within LocaleMessagesProvider");
  }
  return ctx;
}

/** Para componentes fora do provider (ex.: testes): só `path`. */
export function useLocalizedPath(locale: Locale) {
  return useCallback((p: string) => localizedPath(p, locale), [locale]);
}
