import { withBasePath } from "@/lib/basePath";
import type { Locale } from "@/lib/locale";
import Link from "next/link";

type Props = {
  locale: Locale;
};

/**
 * Shown when a marketing route has no CMS blocks to render (missing doc, empty `content`, or unknown slug).
 */
export default function MarketingPageEmptyState({ locale }: Props) {
  const isEn = locale === "en";
  const homeHref = withBasePath(locale === "en" ? "/en/" : "/");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-brand-navy-dark px-4 py-24 text-center text-white">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 px-8 py-10 backdrop-blur-sm">
        <h1 className="font-heading text-2xl font-black text-white md:text-3xl">
          {isEn ? "This page has no published content yet" : "Esta página ainda não tem conteúdo publicado"}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-white/65">
          {isEn
            ? "Publish blocks in Sanity Studio for this page, or return to the homepage."
            : "Publique blocos no Sanity Studio para esta página ou volte à página inicial."}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={homeHref}
            className="inline-flex rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy-dark transition hover:opacity-90"
          >
            {isEn ? "Back to home" : "Voltar ao início"}
          </Link>
          <a
            href="https://calendly.com/yoobeco/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
          >
            {isEn ? "Talk to us" : "Falar connosco"}
          </a>
        </div>
      </div>
    </div>
  );
}
