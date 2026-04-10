import PlataformaSubpageStub from "@/components/PlataformaSubpageStub";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { getPlataformaStubSeo } from "@/lib/publicRouteFallbacks";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(getPlataformaStubSeo("pt", "loja"), {
      canonicalPath: "/plataforma/loja-resgate/",
      languages: {
        "pt-BR": "/plataforma/loja-resgate/",
        en: "/en/plataforma/loja-resgate/",
      },
      openGraphPath: "/plataforma/loja-resgate/",
      ogLocale: "pt_BR",
      robots: {
        index: false,
        follow: true,
      },
    });
}

export default async function LojaResgatePage() {
  return (
    <LocaleMessagesProvider locale="pt">
      <PlataformaSubpageStub variant="loja" />
    </LocaleMessagesProvider>
  );
}
