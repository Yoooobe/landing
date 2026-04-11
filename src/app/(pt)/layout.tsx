import LocaleRootLayout from "@/components/site-settings/LocaleRootLayout";
import { htmlLangForLocale } from "@/lib/locale";
import { buildRootLayoutMetadata } from "@/lib/seo/routeMetadata";
import { getMarketingHomeSeo } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const homeSeo = await getMarketingHomeSeo("pt");
  return buildRootLayoutMetadata(homeSeo);
}

export default async function PtRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homeSeo = await getMarketingHomeSeo("pt");

  return (
    <LocaleRootLayout lang={htmlLangForLocale("pt")} seoDescription={homeSeo.description}>
      {children}
    </LocaleRootLayout>
  );
}
