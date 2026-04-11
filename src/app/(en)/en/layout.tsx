import LocaleRootLayout from "@/components/site-settings/LocaleRootLayout";
import { htmlLangForLocale } from "@/lib/locale";
import { buildEnSegmentLayoutMetadata } from "@/lib/seo/routeMetadata";
import { getMarketingHomeSeo } from "@/sanity/lib/marketingPages";
import type { Metadata } from "next";
import "../../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const homeSeo = await getMarketingHomeSeo("en");
  return buildEnSegmentLayoutMetadata(homeSeo);
}

export default async function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homeSeo = await getMarketingHomeSeo("en");

  return (
    <LocaleRootLayout lang={htmlLangForLocale("en")} seoDescription={homeSeo.description}>
      {children}
    </LocaleRootLayout>
  );
}
