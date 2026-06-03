import SegurancaLandingPage from "@/components/SegurancaLandingPage";
import { growthPageRobots } from "@/lib/growthPagePublish";
import { pageAbsoluteUrl } from "@/lib/site";
import { enSegurancaPage } from "@/messages/segments/en-seguranca-page";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonical = pageAbsoluteUrl("/en/seguranca/");
  return {
    title: enSegurancaPage.seo.title,
    description: enSegurancaPage.seo.description,
    robots: growthPageRobots(),
    alternates: {
      canonical,
      languages: {
        "pt-BR": pageAbsoluteUrl("/seguranca/"),
        en: canonical,
      },
    },
  };
}

export default function EnSegurancaPage() {
  return <SegurancaLandingPage />;
}
