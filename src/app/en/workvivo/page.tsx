import type { Metadata } from "next";
import WorkvivoLanding from "@/components/workvivo/WorkvivoLanding";
import { workvivoMeta } from "@/content/workvivo";

const PRODUCTION_URL = "https://yoooobe.github.io/landing";

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_URL),
  title: workvivoMeta.en.title,
  description: workvivoMeta.en.description,
  alternates: {
    canonical: "/en/workvivo/",
    languages: {
      "pt-BR": "/workvivo/",
      en: "/en/workvivo/",
    },
  },
  openGraph: {
    title: workvivoMeta.en.title,
    description: workvivoMeta.en.description,
    url: "/en/workvivo/",
    locale: "en_US",
  },
};

export default function WorkvivoEnPage() {
  return <WorkvivoLanding locale="en" />;
}
