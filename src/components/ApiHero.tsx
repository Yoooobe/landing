"use client";

import HeroThemeBackdrop from "@/components/HeroThemeBackdrop";
import type { Locale } from "@/lib/locale";
import { withBasePath } from "@/lib/basePath";
import { motion } from "framer-motion";
import Image from "next/image";
import { Webhook, Terminal, Code2 } from "lucide-react";
import type { ResolvedApiIntegracoesContent, SanityImageDoc } from "@/sanity/lib/types";
import { getSanityImageUrl } from "@/sanity/lib/image";

const FALLBACK_HERO_VISUAL = "/screens/api-integracoes-hero-request.png";

export default function ApiHero({
  content,
  showcaseImage,
  locale,
}: {
  content: ResolvedApiIntegracoesContent["hero"];
  showcaseImage?: SanityImageDoc | null;
  locale: Locale;
}) {
  const showcaseImageUrl = getSanityImageUrl(showcaseImage, {
    width: 2048,
    height: 716,
    fit: "max",
    quality: 88,
  });
  const heroVisualUrl = showcaseImageUrl || withBasePath(FALLBACK_HERO_VISUAL);
  const integrationVisualAlt =
    showcaseImage?.alt?.trim() ||
    (locale === "en"
      ? "Screenshot of an HTTP POST request to the 4Unik rewards API with JSON body (issue points example)."
      : "Captura de uma requisição HTTP POST à API de recompensas 4Unik com corpo JSON (exemplo de emissão de pontos).");
  const heroDescription = content.description.trim();

  return (
    <section
      id="docs"
      className="hero-theme-section relative overflow-hidden border-t border-white/5 bg-[#0d1424] pb-20 pt-12 md:pt-14"
    >
      <HeroThemeBackdrop theme="api" />
      {/* Developer Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBoLTQweiBNMzkuNSAwSDQwdjQwaC0uNXoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] bg-repeat"></div>
      </div>
      
      {/* Neon Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-yoobe-neon-pink/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">
          
          <div className="w-full max-w-xl shrink-0 space-y-8 lg:max-w-md xl:max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-sm"
            >
              <Terminal className="w-4 h-4" />
              <span className="font-sans">{content.badge}</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-5xl font-black leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              {content.title}
            </motion.h1>

            {heroDescription ? (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-sans text-xl font-light leading-relaxed text-white/60"
              >
                {content.description}
              </motion.p>
            ) : null}

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex flex-col sm:flex-row gap-4 pt-4"
            >
               <a href={content.primaryCtaHref} className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 font-bold text-[#0a0f18] shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all hover:bg-cyan-400 hover:text-[#0a0f18] hover:scale-105 gap-2 font-sans">
                 <Code2 className="w-5 h-5" /> {content.primaryCtaLabel}
               </a>
               <a href={content.secondaryCtaHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 gap-2 font-sans">
                 <Webhook className="w-5 h-5" /> {content.secondaryCtaLabel}
               </a>
            </motion.div>
          </div>

          <div className="relative w-full min-w-0 flex-1 lg:ml-auto lg:max-w-[min(100%,56rem)] xl:max-w-[min(100%,64rem)]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7 }}
              className="relative w-full"
            >
              <div className="relative aspect-[1024/358] w-full overflow-hidden rounded-2xl border border-cyan-500/15 bg-[#0a0f18] shadow-[0_28px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
                <Image
                  src={heroVisualUrl}
                  alt={integrationVisualAlt}
                  fill
                  className="object-contain object-center"
                  sizes="(min-width: 1280px) 56rem, (min-width: 1024px) 50vw, 96vw"
                  unoptimized
                  priority
                />
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
