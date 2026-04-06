import type { Locale } from "@/lib/locale";
import { deepMerge } from "@/messages/deepMerge";
import { enOverlay } from "@/messages/en";
import { ptMessages, type Messages } from "@/messages/pt";

export type { Messages } from "@/messages/pt";

export function getMessages(locale: Locale): Messages {
  if (locale === "en") {
    return deepMerge(
      ptMessages as unknown as Record<string, unknown>,
      enOverlay as unknown as Record<string, unknown>,
    ) as Messages;
  }
  return ptMessages;
}
