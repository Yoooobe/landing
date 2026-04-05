import type { Metadata } from "next";
import WorkvivoLanding from "@/components/workvivo/WorkvivoLanding";
import { workvivoMeta } from "@/content/workvivo";

const PRODUCTION_URL = "https://yoooobe.github.io/landing";

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_URL),
  title: workvivoMeta.en.title,
  description: workvivoMeta.en.description,
  alternates: {
    canonical: "/en/api-integracoes/workvivo/",
    languages: {
      "pt-BR": "/api-integracoes/workvivo/",
      en: "/en/api-integracoes/workvivo/",
    },
  },
  openGraph: {
    title: workvivoMeta.en.title,
    description: workvivoMeta.en.description,
    url: "/en/api-integracoes/workvivo/",
    locale: "en_US",
  },
};

export default function WorkvivoApiEnPage() {
  return <WorkvivoLanding locale="en" apiHub />;
}
