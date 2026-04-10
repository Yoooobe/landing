import PlataformaSubpageStub from "@/components/PlataformaSubpageStub";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { getPlataformaStubSeo } from "@/lib/publicRouteFallbacks";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(getPlataformaStubSeo("en", "loja"), {
      canonicalPath: "/en/plataforma/loja-resgate/",
      languages: {
        "pt-BR": "/plataforma/loja-resgate/",
        en: "/en/plataforma/loja-resgate/",
      },
      openGraphPath: "/en/plataforma/loja-resgate/",
      ogLocale: "en_US",
      robots: {
        index: false,
        follow: true,
      },
    });
}

export default async function EnLojaResgatePage() {
  return (
    <LocaleMessagesProvider locale="en">
      <PlataformaSubpageStub variant="loja" />
    </LocaleMessagesProvider>
  );
}
