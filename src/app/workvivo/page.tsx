"use client";

import WorkvivoRouteRedirect from "@/components/WorkvivoRouteRedirect";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

export default function WorkvivoLegacyRedirectPage() {
  const { path, m } = useLocaleMessages();
  return (
    <WorkvivoRouteRedirect
      href={path("/api-integracoes/workvivo/")}
      message={m.workvivoRedirect.message}
    />
  );
}
