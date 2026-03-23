import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Yoobe — Reward Infrastructure | Gamificação e Recompensas",
  description: "Infraestrutura de recompensas para plataformas de gamificação e employee engagement. API, catálogo e fulfillment em um só lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`dark scroll-smooth ${jakarta.variable}`}>
      <body
        className={`font-sans antialiased min-h-screen flex flex-col bg-brand-navy-dark text-white selection:bg-brand-orange/30`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'} />
      </body>
    </html>
  );
}
