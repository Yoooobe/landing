"use client";

import ShowcaseImage from "@/components/ui/ShowcaseImage";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import type { ImageWithEmojiDoc, ResolvedGamificacaoContent } from "@/sanity/lib/types";
import { ArrowRight } from "lucide-react";

export default function GamificationDeepUsecases({
  content: u,
  showcaseItems,
}: {
  content: ResolvedGamificacaoContent["deepUsecases"];
  showcaseItems?: ImageWithEmojiDoc[];
}) {
  const { locale } = useLocaleMessages();
  const labels =
    locale === "en"
      ? { context: "Context", result: "Expected result", next: "Next step" }
      : { context: "Contexto", result: "Resultado esperado", next: "Próxima ação" };

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface-base py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">{u.badge}</span>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">
            {u.titleBefore}{" "}
            <span className="bg-linear-to-r from-yoobe-purple to-fuchsia-600 bg-clip-text text-transparent">{u.titleGradient}</span>
            {u.titleAfter ? ` ${u.titleAfter}` : ""}
          </h2>
          <p className="text-lg text-white/70">{u.sub}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {u.items.map((item, idx) => {
            const cardShowcase = showcaseItems?.[idx];
            return (
              <div
                key={idx}
                className="group flex flex-col rounded-2xl border border-white/10 bg-surface-panel p-8 transition-all hover:border-yoobe-purple/50 hover:bg-linear-to-br hover:from-surface-panel hover:to-surface-purple"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="text-4xl transition-transform group-hover:-translate-y-1">
                    {cardShowcase?.image ? (
                      <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                        <ShowcaseImage image={cardShowcase.image} alt={cardShowcase.image.alt || item.title} variant="thumb" sizes="48px" />
                      </div>
                    ) : cardShowcase?.emoji ? (
                      <span>{cardShowcase.emoji}</span>
                    ) : (
                      item.icon
                    )}
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-white/50">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-yoobe-purple">{item.title}</h3>
                <p className="mb-1 text-[10px] font-semibold tracking-wider text-white/45 uppercase">{labels.context}</p>
                <p className="mb-5 text-sm leading-relaxed text-white/70">{item.desc}</p>
                <div className="mt-auto space-y-3 border-t border-white/5 pt-4">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold tracking-wider text-yoobe-purple/80 uppercase">{labels.result}</p>
                    <p className="text-sm font-medium text-white/85">&quot;{item.hook}&quot;</p>
                  </div>
                  <p className="inline-flex items-center gap-1 text-xs font-semibold text-white/50 transition-colors group-hover:text-brand-orange">
                    {labels.next}
                    <ArrowRight className="h-3 w-3" />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
