import PlataformaSubpageStub from "@/components/PlataformaSubpageStub";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { getPlataformaStubSeo } from "@/lib/publicRouteFallbacks";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(getPlataformaStubSeo("pt", "logistica"), {
      canonicalPath: "/plataforma/logistica-integrada/",
      languages: {
        "pt-BR": "/plataforma/logistica-integrada/",
        en: "/en/plataforma/logistica-integrada/",
      },
      openGraphPath: "/plataforma/logistica-integrada/",
      ogLocale: "pt_BR",
      robots: {
        index: false,
        follow: true,
      },
    });
}

export default async function LogisticaIntegradaPage() {
  return (
    <LocaleMessagesProvider locale="pt">
      <PlataformaSubpageStub variant="logistica" />
    </LocaleMessagesProvider>
  );
}
