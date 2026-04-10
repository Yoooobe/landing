import PlataformaSubpageStub from "@/components/PlataformaSubpageStub";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { getPlataformaStubSeo } from "@/lib/publicRouteFallbacks";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(getPlataformaStubSeo("en", "motor"), {
      canonicalPath: "/en/plataforma/motor-gamificacao/",
      languages: {
        "pt-BR": "/plataforma/motor-gamificacao/",
        en: "/en/plataforma/motor-gamificacao/",
      },
      openGraphPath: "/en/plataforma/motor-gamificacao/",
      ogLocale: "en_US",
      robots: {
        index: false,
        follow: true,
      },
    });
}

export default async function EnMotorGamificacaoPage() {
  return (
    <LocaleMessagesProvider locale="en">
      <PlataformaSubpageStub variant="motor" />
    </LocaleMessagesProvider>
  );
}
