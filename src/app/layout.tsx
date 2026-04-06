import AppShell from "@/components/AppShell";
import { getGoogleAnalyticsMeasurementId, siteMetadataBase, SITE_URL } from "@/lib/site";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteMetadataBase(),
  title: "Yoobe — Reward Infrastructure | Gamificação e Recompensas",
  description: "Infraestrutura de recompensas para plataformas de gamificação e employee engagement. API, catálogo e fulfillment em um só lugar.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: SITE_URL,
    title: "Yoobe — Reward Infrastructure | Gamificação e Recompensas",
    description:
      "Infraestrutura de recompensas para plataformas de gamificação e employee engagement. API, catálogo e fulfillment em um só lugar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = getGoogleAnalyticsMeasurementId();

  return (
    <html
      lang="pt-BR"
      className={`dark scroll-smooth ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`font-sans antialiased min-h-screen flex flex-col bg-brand-navy-dark text-white selection:bg-brand-orange/30`}
        suppressHydrationWarning
      >
        <AppShell>{children}</AppShell>
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
