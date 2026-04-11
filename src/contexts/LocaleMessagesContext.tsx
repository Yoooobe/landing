"use client";

import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";
import { getMessages, type Messages } from "@/messages";
import { deepMerge } from "@/messages/deepMerge";
import { createContext, useCallback, useContext, useMemo } from "react";

type Ctx = {
  locale: Locale;
  m: Messages;
  path: (p: string) => string;
};

const LocaleMessagesContext = createContext<Ctx | null>(null);

export function LocaleMessagesProvider({
  locale,
  messagesOverride,
  children,
}: {
  locale: Locale;
  messagesOverride?: Partial<Messages>;
  children: React.ReactNode;
}) {
  const m = useMemo(() => {
    const base = getMessages(locale);
    if (!messagesOverride) return base;
    return deepMerge(
      base as unknown as Record<string, unknown>,
      messagesOverride as unknown as Record<string, unknown>,
    ) as Messages;
  }, [locale, messagesOverride]);
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
