import PlataformaSubpageStub from "@/components/PlataformaSubpageStub";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { getPlataformaStubSeo } from "@/lib/publicRouteFallbacks";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(getPlataformaStubSeo("pt", "motor"), {
      canonicalPath: "/plataforma/motor-gamificacao/",
      languages: {
        "pt-BR": "/plataforma/motor-gamificacao/",
        en: "/en/plataforma/motor-gamificacao/",
      },
      openGraphPath: "/plataforma/motor-gamificacao/",
      ogLocale: "pt_BR",
      robots: {
        index: false,
        follow: true,
      },
    });
}

export default async function MotorGamificacaoPage() {
  return (
    <LocaleMessagesProvider locale="pt">
      <PlataformaSubpageStub variant="motor" />
    </LocaleMessagesProvider>
  );
}
