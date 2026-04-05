import type { Metadata } from "next";
import WorkvivoLanding from "@/components/workvivo/WorkvivoLanding";
import { workvivoMeta } from "@/content/workvivo";

const PRODUCTION_URL = "https://yoooobe.github.io/landing";

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_URL),
  title: workvivoMeta.pt.title,
  description: workvivoMeta.pt.description,
  alternates: {
    canonical: "/workvivo/",
    languages: {
      "pt-BR": "/workvivo/",
      en: "/en/workvivo/",
    },
  },
  openGraph: {
    title: workvivoMeta.pt.title,
    description: workvivoMeta.pt.description,
    url: "/workvivo/",
    locale: "pt_BR",
  },
};

export default function WorkvivoPage() {
  return <WorkvivoLanding locale="pt" />;
}
