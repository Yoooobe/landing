import ApiIntegracoesPageSections from "@/components/ApiIntegracoesPageSections";
import type { Metadata } from "next";
import { siteMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: siteMetadataBase(),
  title: "API & Integrations | 4unik",
  description:
    "REST API, webhooks, and integrations for corporate rewards, catalog, and fulfillment — aligned with the 4unik platform.",
  alternates: {
    canonical: "/en/api-integracoes/",
    languages: {
      "pt-BR": "/api-integracoes/",
      en: "/en/api-integracoes/",
    },
  },
  openGraph: {
    title: "API & Integrations | 4unik",
    description:
      "REST API, webhooks, and integrations for corporate rewards, catalog, and fulfillment.",
    url: "/en/api-integracoes/",
    locale: "en_US",
  },
};

export default function EnApiIntegracoesOverviewPage() {
  return <ApiIntegracoesPageSections />;
}
