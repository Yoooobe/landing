import MarketingPageScreen from "@/components/MarketingPageScreen";
import JsonLdScript from "@/components/seo/JsonLdScript";
import type { Locale } from "@/lib/locale";
import { buildMarketingPageBreadcrumbJsonLd } from "@/lib/marketingBreadcrumbs";
import { buildFaqPageJsonLd } from "@/lib/jsonLd";
import { pageAbsoluteUrl } from "@/lib/site";
import { getMarketingPageFaqItems } from "@/sanity/lib/marketingPages";

type Props = {
  locale: Locale;
  slug: string;
  pagePath: string;
};

export default async function MarketingPageWithFaq({
  locale,
  slug,
  pagePath,
}: Props) {
  const faqItems = await getMarketingPageFaqItems(locale, slug);
  const faqLd = faqItems.length > 0 ? buildFaqPageJsonLd(pageAbsoluteUrl(pagePath), faqItems) : null;
  const breadcrumbLd = buildMarketingPageBreadcrumbJsonLd(locale, slug, pagePath);

  return (
    <>
      {breadcrumbLd ? <JsonLdScript data={{ ...breadcrumbLd }} /> : null}
      {faqLd ? <JsonLdScript data={{ ...faqLd }} /> : null}
      <MarketingPageScreen locale={locale} slug={slug} />
    </>
  );
}
