import PlataformaSubpageStub from "@/components/PlataformaSubpageStub";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { getPlataformaStubSeo } from "@/lib/publicRouteFallbacks";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(getPlataformaStubSeo("en", "logistica"), {
      canonicalPath: "/en/plataforma/logistica-integrada/",
      languages: {
        "pt-BR": "/plataforma/logistica-integrada/",
        en: "/en/plataforma/logistica-integrada/",
      },
      openGraphPath: "/en/plataforma/logistica-integrada/",
      ogLocale: "en_US",
      robots: {
        index: false,
        follow: true,
      },
    });
}

export default async function EnLogisticaIntegradaPage() {
  return (
    <LocaleMessagesProvider locale="en">
      <PlataformaSubpageStub variant="logistica" />
    </LocaleMessagesProvider>
  );
}
