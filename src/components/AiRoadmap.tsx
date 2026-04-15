"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Command,
  Cpu,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stageItemIcons = [
  [Sparkles, Target, Cpu, Zap],
  [Sparkles, Command, Activity, Target],
  [BrainCircuit, Zap, Cpu, Activity],
  [Sparkles, BrainCircuit, Target, Command],
] as const;

const stageBorderColors = ["#f97316", "#9333ea", "#22d3ee", "#34d399"] as const;

const stageToneConfig = {
  orange: {
    borderColor: "#f97316",
    glowClass: "bg-brand-orange/10",
    badgeClass: "border-brand-orange text-brand-orange bg-brand-orange/10",
  },
  purple: {
    borderColor: "#9333ea",
    glowClass: "bg-yoobe-purple/10",
    badgeClass: "border-yoobe-purple text-yoobe-purple bg-yoobe-purple/10",
  },
  cyan: {
    borderColor: "#22d3ee",
    glowClass: "bg-cyan-400/10",
    badgeClass: "border-cyan-400 text-cyan-400 bg-cyan-400/10",
  },
  emerald: {
    borderColor: "#34d399",
    glowClass: "bg-emerald-400/10",
    badgeClass: "border-emerald-400 text-emerald-400 bg-emerald-400/10",
  },
} as const;

const stageToneOrder = ["orange", "purple", "cyan", "emerald"] as const;

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  target: Target,
  cpu: Cpu,
  zap: Zap,
  command: Command,
  activity: Activity,
  "brain-circuit": BrainCircuit,
};

export default function AiRoadmap({
  homeContent = null,
}: {
  homeContent?: ResolvedHomeContent | null;
}) {
  const { m, path } = useLocaleMessages();
  const ar = m.landingMore.aiRoadmap;

  return (
    <section className="py-24 bg-[#050B14] relative overflow-hidden text-white font-sans border-y border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-yoobe-purple/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading flex flex-col md:flex-row gap-4 items-center md:items-start">
              <span className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider flex items-center gap-2 w-max text-white">
                <BrainCircuit className="h-4 w-4 text-yoobe-purple" />
                {ar.badge}
              </span>
            </h2>
            <h3 className="text-2xl md:text-4xl font-black font-heading tracking-tight leading-tight">
              {ar.titleBefore}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yoobe-purple to-cyan-400">
                {ar.titleGradient}
              </span>
              {ar.titleAfter}
            </h3>
          </div>
          <Link
            href={path("/inteligencia")}
            className="group flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40 shrink-0"
          >
            {ar.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ar.stages.map((stage, i) => (
            (() => {
              const visual = homeContent?.showcaseMedia?.aiRoadmap?.stages?.[i];
              const toneKey =
                visual?.accentTone &&
                visual.accentTone in stageToneConfig
                  ? (visual.accentTone as keyof typeof stageToneConfig)
                  : stageToneOrder[i] || stageToneOrder[0];
              const tone = stageToneConfig[toneKey];
              const stageImageUrl = getSanityImageUrl(visual?.image, { width: 1280, height: 800, fit: "crop", crop: "entropy", quality: 84 });
              const overrideIcon = visual?.icon ? iconMap[visual.icon] : undefined;

              return (
                <div
                  key={stage.title}
                  className="glass-panel-dark p-6 flex flex-col h-full border-t-2 relative overflow-hidden group hover:-translate-y-1 transition-all"
                  style={{ borderTopColor: tone?.borderColor || stageBorderColors[i] || stageBorderColors[0] }}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-150 transition-transform duration-700 ${tone.glowClass}`}
                  ></div>

                  {stageImageUrl ? (
                    <div className="relative mb-5 h-36 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <Image
                        src={stageImageUrl}
                        alt={visual?.image?.alt?.trim() || stage.title}
                        fill
                        sizes="(min-width: 1024px) 240px, 100vw"
                        className="object-cover"
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between mb-6 gap-3">
                    <h4 className="text-xl font-bold font-heading">{stage.title}</h4>
                    <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${tone.badgeClass}`}>
                      {stage.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 mt-auto">
                    {stage.items.map((name, j) => {
                      const Icon = overrideIcon || stageItemIcons[i]?.[j] || Sparkles;
                      return (
                        <div key={name} className="flex items-center gap-3 text-white/70">
                          <div className="p-1.5 rounded-md bg-white/5 border border-white/10 shrink-0 text-white">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium">{name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          ))}
        </div>
      </div>
    </section>
  );
}
