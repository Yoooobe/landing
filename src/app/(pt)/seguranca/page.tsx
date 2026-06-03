import SegurancaLandingPage from "@/components/SegurancaLandingPage";
import { growthPageRobots } from "@/lib/growthPagePublish";
import { pageAbsoluteUrl } from "@/lib/site";
import { ptSegurancaPage } from "@/messages/segments/pt-seguranca-page";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonical = pageAbsoluteUrl("/seguranca/");
  return {
    title: ptSegurancaPage.seo.title,
    description: ptSegurancaPage.seo.description,
    robots: growthPageRobots(),
    alternates: {
      canonical,
      languages: {
        "pt-BR": canonical,
        en: pageAbsoluteUrl("/en/seguranca/"),
      },
    },
  };
}

export default function SegurancaPage() {
  return <SegurancaLandingPage />;
}
