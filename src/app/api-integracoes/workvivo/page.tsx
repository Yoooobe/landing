import type { Metadata } from "next";
import WorkvivoLanding from "@/components/workvivo/WorkvivoLanding";
import { workvivoMeta } from "@/content/workvivo";

const PRODUCTION_URL = "https://yoooobe.github.io/landing";

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_URL),
  title: workvivoMeta.pt.title,
  description: workvivoMeta.pt.description,
  alternates: {
    canonical: "/api-integracoes/workvivo/",
    languages: {
      "pt-BR": "/api-integracoes/workvivo/",
      en: "/en/api-integracoes/workvivo/",
    },
  },
  openGraph: {
    title: workvivoMeta.pt.title,
    description: workvivoMeta.pt.description,
    url: "/api-integracoes/workvivo/",
    locale: "pt_BR",
  },
};

export default function WorkvivoApiPage() {
  return <WorkvivoLanding locale="pt" apiHub />;
}
