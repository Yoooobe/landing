"use client";

import FeatureScreensCarousel from "@/components/FeatureScreensCarousel";
import HeroThemeBackdrop from "@/components/HeroThemeBackdrop";
import { motion } from "framer-motion";
import Image from "next/image";
import { Webhook, Terminal, Code2 } from "lucide-react";
import type { ResolvedApiIntegracoesContent, SanityImageDoc } from "@/sanity/lib/types";
import { getSanityImageUrl } from "@/sanity/lib/image";

export default function ApiHero({
  content,
  showcaseImage,
}: {
  content: ResolvedApiIntegracoesContent["hero"];
  showcaseImage?: SanityImageDoc | null;
}) {
  const showcaseImageUrl = getSanityImageUrl(showcaseImage);
  const codeSnippet = content.codeSnippet.trim();

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
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2 space-y-8">
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
              className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight font-heading"
            >
              {content.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/60 leading-relaxed font-light font-sans"
            >
              {content.description}
            </motion.p>

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

          <div className="lg:w-1/2 w-full flex flex-col gap-6">
            {/* Code snippet card */}
            <motion.div
              initial={{ opacity: 0, rotateY: 10, x: 50 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="glass-panel-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-[#1e1e1e]/80 flex items-center justify-between px-4 py-3 border-b border-white/5 backdrop-blur-md">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs text-white/40 font-mono tracking-wider">{content.codeWindowTitle}</div>
                <div className="w-10" />
              </div>
              <div className="p-5 bg-[#0d121c]/90">
                <pre className="text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre-wrap max-h-[180px]">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </motion.div>

            {/* Live screens carousel or CMS showcase image */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              {showcaseImageUrl ? (
                <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={showcaseImageUrl}
                    alt={showcaseImage?.alt?.trim() || "Screenshot da plataforma 4unik API"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <FeatureScreensCarousel variant="pix" />
              )}
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
