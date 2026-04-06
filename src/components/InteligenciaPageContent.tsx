"use client";

import AiFeatureMockups from "@/components/AiFeatureMockups";
import AiRoadmap from "@/components/AiRoadmap";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import {
  AlertCircle,
  ArrowRight,
  BarChart,
  BrainCircuit,
  Briefcase,
  Cpu,
  MessageSquare,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

const cardIcons = [CommandIcon, Briefcase, Target, BarChart] as const;
const workvivoIcons = [Zap, MessageSquare, Target, AlertCircle, Cpu, TrendingUp] as const;

export default function InteligenciaPageContent() {
  const { m } = useLocaleMessages();
  const p = m.inteligenciaPage;

  return (
    <div className="bg-brand-navy-dark text-white min-h-screen font-sans selection:bg-brand-orange/30">
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yoobe-purple/20 blur-[150px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-400/10 blur-[130px] rounded-full pointer-events-none -translate-x-1/2"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl max-auto mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 mb-8 mx-auto">
              <BrainCircuit className="h-4 w-4 text-yoobe-purple" />
              <span className="text-sm font-semibold text-yoobe-purple uppercase tracking-wider">{p.hero.badge}</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight font-heading">
              {p.hero.titleBefore} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-cyan-400">
                {p.hero.titleGradient}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 leading-relaxed lg:max-w-3xl mx-auto mb-10">{p.hero.sub}</p>
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {p.cards.map((card, i) => {
              const Icon = cardIcons[i] ?? BrainCircuit;
              return (
                <div
                  key={card.title}
                  className="glass-panel-dark p-8 group hover:-translate-y-2 transition-all duration-300 border border-white/10 hover:border-yoobe-purple/50 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yoobe-purple/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="bg-white/5 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-yoobe-purple/30 group-hover:bg-yoobe-purple/10 transition-colors">
                    <Icon className="h-6 w-6 text-yoobe-purple" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-4 text-white group-hover:text-yoobe-purple transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-lg text-white/70 leading-relaxed font-sans">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AiFeatureMockups />

      <AiRoadmap />

      <section className="py-24 relative overflow-hidden bg-black/50 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading">
              {p.workvivo.titleBefore}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-brand-orange">
                {p.workvivo.titleGradient}
              </span>
            </h2>
            <p className="text-xl text-white/70">{p.workvivo.sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.workvivo.cases.map((wc, index) => {
              const Icon = workvivoIcons[index] ?? Zap;
              return (
                <div
                  key={wc.title}
                  className="glass-panel-dark p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-colors relative group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/10 p-2.5 rounded-lg text-white/80 group-hover:text-white transition-colors group-hover:bg-yoobe-purple/20 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-lg font-bold font-heading">{wc.title}</h4>
                  </div>
                  <p className="text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">{wc.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-brand-navy-dark to-black text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yoobe-purple/20 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">{p.cta.title}</h2>
          <p className="text-xl text-white/70 mb-10 font-sans">{p.cta.sub}</p>
          <div className="flex justify-center">
            <a
              href="https://calendly.com/yoobeco/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-white px-10 font-bold text-brand-navy-dark text-lg shadow-2xl shadow-white/10 transition-all hover:scale-105 font-sans whitespace-nowrap"
            >
              {p.cta.button}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function CommandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  );
}
