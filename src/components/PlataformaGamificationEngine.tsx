"use client";

import FeatureScreensCarousel from "@/components/FeatureScreensCarousel";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import type { ImageWithEmojiDoc } from "@/sanity/lib/types";
import { getSanityImageUrl } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link2, Sparkles, Target } from "lucide-react";
import { useCallback, useState } from "react";

const DEFAULT_CARD_ICONS = [Target, Link2] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

type Props = {
  gamificacaoFeatureCards?: ImageWithEmojiDoc[];
};

/** Card 0 (campanhas): destaque nos slides 0–1 do demo. Card 1 (integração): slide 2 (preview / fluxo completo). */
export default function PlataformaGamificationEngine({
  gamificacaoFeatureCards,
}: Props) {
  const { m, locale } = useLocaleMessages();
  const g = m.plataforma.gamificationEngine;
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselInteractionNonce, setCarouselInteractionNonce] = useState(0);

  const bumpCarouselPause = useCallback(() => {
    setCarouselInteractionNonce((n) => n + 1);
  }, []);

  const selectCampaignCard = useCallback(() => {
    setActiveSlide(0);
    bumpCarouselPause();
  }, [bumpCarouselPause]);

  const selectIntegrationCard = useCallback(() => {
    setActiveSlide(2);
    bumpCarouselPause();
  }, [bumpCarouselPause]);

  const onCarouselIndexChange = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const card0Selected = activeSlide === 0 || activeSlide === 1;
  const card1Selected = activeSlide === 2;

  return (
    <section
      id="gamificacao"
      className="py-24 bg-[#0a0f18] relative overflow-hidden text-white border-t border-white/5"
    >
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Text column — animated */}
          <motion.div
            className="w-full lg:w-1/2 space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold">
                <Sparkles className="h-5 w-5 shrink-0 text-brand-orange" aria-hidden />
                {g.badge}
              </div>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-black text-white leading-tight font-heading"
            >
              {g.titleBefore}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-500">{g.titleGradient}</span>
              {g.titleAfter}
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lg text-white/60 leading-relaxed font-light font-sans">
              {g.body}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 font-sans">
              {g.cards.map((card, i) => {
                const cardShowcase = gamificacaoFeatureCards?.[i];
                const cardImageUrl = getSanityImageUrl(cardShowcase?.image);
                const DefaultIcon = DEFAULT_CARD_ICONS[i] ?? Target;
                const selected = i === 0 ? card0Selected : card1Selected;
                const onSelect = i === 0 ? selectCampaignCard : selectIntegrationCard;
                return (
                  <motion.button
                    key={card.title}
                    type="button"
                    variants={fadeUp}
                    onClick={onSelect}
                    aria-pressed={selected}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-2xl p-6 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange/60 ${
                      i === 0
                        ? selected
                          ? "border border-brand-orange/35 bg-white/4 border-l-4 border-l-brand-orange shadow-lg shadow-brand-orange/5"
                          : "border border-white/10 border-l-4 border-l-transparent hover:border-brand-orange/25 hover:border-l-brand-orange/50"
                        : selected
                          ? "border border-yoobe-purple/35 bg-white/4 border-l-4 border-l-yoobe-purple shadow-lg shadow-yoobe-purple/5"
                          : "border border-white/10 border-l-4 border-l-transparent hover:border-yoobe-purple/25 hover:border-l-yoobe-purple/50"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-2.5">
                        {cardImageUrl ? (
                          <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                            <Image
                              src={cardImageUrl}
                              alt={cardShowcase?.image?.alt?.trim() || card.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : cardShowcase?.emoji ? (
                          <span className="flex h-8 w-8 items-center justify-center text-2xl leading-none">
                            {cardShowcase.emoji}
                          </span>
                        ) : (
                          <DefaultIcon className="h-8 w-8 text-white/70" aria-hidden />
                        )}
                      </div>
                      <div className="min-w-0 flex-1 space-y-2">
                        <h4 className="text-white font-bold text-lg font-heading leading-snug">{card.title}</h4>
                        <p className="text-sm text-white/50 leading-relaxed">{card.body}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Carousel column — slide in from right */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
          >
            <FeatureScreensCarousel
              variant="campaign"
              locale={locale}
              intervalMs={4500}
              activeIndex={activeSlide}
              onActiveIndexChange={onCarouselIndexChange}
              interactionNonce={carouselInteractionNonce}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
