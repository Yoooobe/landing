import ApiFeaturesGrid from "@/components/ApiFeaturesGrid";
import ApiHero from "@/components/ApiHero";
import ApiPlatformModules from "@/components/ApiPlatformModules";
import IntegrationsTicker from "@/components/IntegrationsTicker";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import NativeIntegrations from "@/components/NativeIntegrations";
import { PRIMARY_CONTACT_SECTION_ID } from "@/lib/contactAnchor";
import { getMessages } from "@/messages";
import type { Locale } from "@/lib/locale";
import type { ApiIntegracoesShowcaseMediaDoc, ResolvedApiIntegracoesContent } from "@/sanity/lib/types";

export default function ApiIntegracoesPageSections({
  content,
  showcaseMedia = null,
  locale,
}: {
  content: ResolvedApiIntegracoesContent;
  showcaseMedia?: ApiIntegracoesShowcaseMediaDoc | null;
  locale: Locale;
}) {
  const leadCopy = getMessages(locale).leadForm;

  return (
    <div className="min-h-screen bg-[#0a0f18] text-white">
      <ApiHero
        content={content.hero}
        showcaseImage={showcaseMedia?.hero?.showcaseImage}
        locale={locale}
      />
      <IntegrationsTicker />
      <ApiFeaturesGrid content={content.features} showcaseItems={showcaseMedia?.features?.items} />
      <NativeIntegrations content={content.integrations} showcasePlatforms={showcaseMedia?.integrations?.platforms} />
      <ApiPlatformModules content={content.modules} showcaseItems={showcaseMedia?.modules?.items} />

      <section
        id={PRIMARY_CONTACT_SECTION_ID}
        className="relative overflow-hidden border-t border-white/5 bg-[#0a0f18] py-24"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-cyan-500/5 blur-[100px]"></div>
        <div className="container relative z-10 mx-auto max-w-5xl px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-6 font-mono text-3xl font-black text-white lg:text-5xl">{content.finalCta.title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-white/50">{content.finalCta.description}</p>
          </div>
          <div className="mx-auto max-w-lg">
            <LeadCaptureForm variant="api" source="api-integracoes" />
          </div>
          <p className="mt-10 text-center text-sm text-white/45">{leadCopy.altTechnical}</p>
          <div className="mt-4 flex justify-center">
            <a
              href={content.finalCta.buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-cyan-500 px-8 text-base font-bold text-[#0a0f18] shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105 hover:bg-cyan-400"
            >
              {content.finalCta.buttonLabel}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
