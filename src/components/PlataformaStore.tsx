"use client";

import FeatureScreensCarousel from "@/components/FeatureScreensCarousel";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { PlatformShowcaseMediaDoc } from "@/sanity/lib/types";
import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, Filter } from "lucide-react";
import Image from "next/image";

const featureIcons = [Filter, CreditCard] as const;

export default function PlataformaStore({
  showcaseMedia = null,
}: {
  showcaseMedia?: PlatformShowcaseMediaDoc | null;
}) {
  const { m } = useLocaleMessages();
  const s = m.plataforma.store;
  const storeMockupImageUrl = getSanityImageUrl(showcaseMedia?.storeMockupImage);

  return (
    <section id="loja" className="py-24 bg-brand-navy relative overflow-hidden">
      <div
        id="wallet"
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 h-px w-px opacity-0"
      />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yoobe-purple/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 order-1">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">
              <ShoppingBag className="w-4 h-4 text-yoobe-purple" />
              {s.badge}
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight font-heading">
              {s.titleBefore}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yoobe-purple to-brand-orange">{s.titleGradient}</span>
              {s.titleAfter}
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-10 font-light">
              {s.bodyBefore}
              <strong className="text-white">{s.bodyStrong}</strong>
              {s.bodyAfter}
            </p>

            <div className="space-y-6">
              {s.features.map((feat, i) => {
                const Icon = featureIcons[i] ?? Filter;
                return (
                  <div
                    key={feat.title}
                    className="flex items-start gap-4 rounded-2xl border border-white/5 bg-surface-panel p-5 transition-colors hover:bg-white/5"
                  >
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                      <Icon className={`w-6 h-6 ${i === 0 ? "text-brand-orange" : "text-yoobe-neon-pink"}`} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{feat.title}</h4>
                      <p className="text-sm text-white/50 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-1/2 order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden bg-[#0d1522] border border-white/10 shadow-2xl"
            >
              {storeMockupImageUrl ? (
                <div className="relative aspect-5/4 w-full overflow-hidden">
                  <Image
                    src={storeMockupImageUrl}
                    alt={
                      showcaseMedia?.storeMockupImage?.alt?.trim() ||
                      s.badge ||
                      "Mockup da loja de recompensas"
                    }
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="p-4">
                  <FeatureScreensCarousel variant="member" intervalMs={4000} />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
