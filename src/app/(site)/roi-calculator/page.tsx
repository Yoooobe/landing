import RoiCalculatorComponent from "@/components/RoiCalculatorComponent";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { buildFaqPageJsonLd } from "@/lib/jsonLd";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { pageAbsoluteUrl } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(
    {
      title: "Employee Engagement ROI Calculator | Yoobe",
      description:
        "Calculate your return on investment with Yoobe: reduce turnover, streamline reward logistics, and boost productivity with corporate gamification.",
      openGraphDescription:
        "Estimate your annual savings with corporate gamification, talent retention, and automated reward logistics.",
    },
    {
      canonicalPath: "/roi-calculator/",
      languages: {
        en: "/roi-calculator/",
      },
      openGraphPath: "/roi-calculator/",
      ogLocale: "en_US",
      ogRouteKey: "roiCalculator",
    },
  );
}

export default function EnCalculadoraRoiPage() {
  const pagePath = "/roi-calculator/";
  const faqItems = [
    {
      q: "How does the Yoobe ROI calculator estimate turnover savings?",
      a: "The estimate uses average replacement costs (1.5x monthly salary) and applies a conservative 25% turnover reduction from gamified recognition and engagement campaigns.",
    },
    {
      q: "What savings are achieved in reward logistics and inventory?",
      a: "With Yoobe digital reward store and D+1 fulfillment, companies eliminate up to 40% of costs associated with unsold physical inventory, unused swag kits, and duplicate shipping fees.",
    },
  ];

  const faqLd = buildFaqPageJsonLd(pageAbsoluteUrl(pagePath), faqItems);

  return (
    <>
      <JsonLdScript data={{ ...faqLd }} />
      <RoiCalculatorComponent locale="en" />
    </>
  );
}
