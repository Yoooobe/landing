import RoiCalculatorComponent from "@/components/RoiCalculatorComponent";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { buildFaqPageJsonLd } from "@/lib/jsonLd";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { pageAbsoluteUrl } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(
    {
      title: "Employee Engagement ROI Calculator | 4unik",
      description:
        "Calculate your return on investment with 4unik: reduce turnover, streamline reward logistics, and boost productivity with corporate gamification.",
      openGraphTitle: "Employee Engagement ROI Calculator | 4unik",
      openGraphDescription:
        "Estimate your annual savings with corporate gamification, talent retention, and automated reward logistics.",
    },
    {
      canonicalPath: "/en/calculadora-roi/",
      languages: {
        "pt-BR": "/calculadora-roi/",
        en: "/en/calculadora-roi/",
      },
      openGraphPath: "/en/calculadora-roi/",
      ogLocale: "en_US",
      ogRouteKey: "roiCalculator",
    },
  );
}

export default function EnCalculadoraRoiPage() {
  const pagePath = "/en/calculadora-roi/";
  const faqItems = [
    {
      q: "How does the 4unik ROI calculator estimate turnover savings?",
      a: "The estimate uses average replacement costs (1.5x monthly salary) and applies a conservative 25% turnover reduction from gamified recognition and engagement campaigns.",
    },
    {
      q: "What savings are achieved in reward logistics and inventory?",
      a: "With 4unik digital reward store and D+1 fulfillment, companies eliminate up to 40% of costs associated with unsold physical inventory, unused swag kits, and duplicate shipping fees.",
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
