import AppShell from "@/components/AppShell";
import AppProviders from "@/components/site-settings/AppProviders";
import MarketingVisualEditing from "@/components/site-settings/MarketingVisualEditing";
import JsonLdScript from "@/components/seo/JsonLdScript";
import ThirdPartyChatLoader from "@/components/ThirdPartyChatLoader";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/jsonLd";
import {
  jakarta,
  ROOT_BODY_CLASSNAME,
} from "@/components/site-settings/rootLayoutTheme";
import type { ReactNode } from "react";

type Props = {
  lang: "pt-BR" | "en";
  seoDescription: string;
  children: ReactNode;
};

export default function LocaleRootLayout({
  lang,
  seoDescription,
  children,
}: Props) {
  return (
    <html
      lang={lang}
      className={`dark scroll-smooth ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body className={ROOT_BODY_CLASSNAME} suppressHydrationWarning>
        <JsonLdScript data={{ ...buildOrganizationJsonLd(seoDescription) }} />
        <JsonLdScript data={{ ...buildWebsiteJsonLd() }} />
        <AppProviders>
          <AppShell>{children}</AppShell>
          <MarketingVisualEditing />
          <ThirdPartyChatLoader />
        </AppProviders>
      </body>
    </html>
  );
}
