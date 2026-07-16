"use client";

import { ZoomableScreenshot } from "@/components/ui/ScreenshotLightbox";
import { withBasePath } from "@/lib/basePath";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Gift, Megaphone, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type FlowId = "campanha" | "brinde";

type FlowStep = {
  number: string;
  title: string;
  desc: string;
  img: string;
  accent: string;
};

type FlowConfig = {
  id: FlowId;
  label: string;
  labelEn: string;
  icon: typeof Megaphone;
  accent: string;
  steps: FlowStep[];
  video: {
    webm: string;
    mp4: string;
    poster: string;
  };
};

const FLOWS: FlowConfig[] = [
  {
    id: "campanha",
    label: "Criar campanha",
    labelEn: "Create campaign",
    icon: Megaphone,
    accent: "#f98f16",
    steps: [
      {
        number: "01",
        title: "Dados iniciais e slug",
        desc: "Nome, URL amigável e identidade da landing de resgate.",
        img: "/screens/flows/campanha-passo-1.webp",
        accent: "#2563eb",
      },
      {
        number: "02",
        title: "Mensagem de boas-vindas",
        desc: "Banner, títulos e copy que explicam a mecânica ao participante.",
        img: "/screens/flows/campanha-passo-2.webp",
        accent: "#8338ec",
      },
      {
        number: "03",
        title: "Empresa e produtos",
        desc: "Escolha a empresa e monte a vitrine de recompensas.",
        img: "/screens/flows/campanha-passo-3.webp",
        accent: "#f98f16",
      },
      {
        number: "04",
        title: "Configurações finais",
        desc: "Regras, vigência e publicação da campanha.",
        img: "/screens/flows/campanha-passo-4.webp",
        accent: "#22d3ee",
      },
    ],
    video: {
      webm: "/screens/flows/fluxo-campanha.webm",
      mp4: "/screens/flows/fluxo-campanha.mp4",
      poster: "/screens/flows/fluxo-campanha-poster.webp",
    },
  },
  {
    id: "brinde",
    label: "Enviar brinde",
    labelEn: "Send a gift",
    icon: Gift,
    accent: "#8338ec",
    steps: [
      {
        number: "01",
        title: "Empresa e notas",
        desc: "Selecione a empresa, nome do brinde e notas internas.",
        img: "/screens/flows/brinde-passo-1.webp",
        accent: "#2563eb",
      },
      {
        number: "02",
        title: "Seleção do produto",
        desc: "Escolha o item do catálogo que será enviado.",
        img: "/screens/flows/brinde-passo-2.webp",
        accent: "#8338ec",
      },
      {
        number: "03",
        title: "Destinatário",
        desc: "Informe quem recebe o brinde e os dados de entrega.",
        img: "/screens/flows/brinde-passo-3.webp",
        accent: "#f98f16",
      },
      {
        number: "04",
        title: "Envio e finalização",
        desc: "Método de envio e confirmação do pedido.",
        img: "/screens/flows/brinde-passo-4.webp",
        accent: "#22d3ee",
      },
    ],
    video: {
      webm: "/screens/flows/fluxo-brinde.webm",
      mp4: "/screens/flows/fluxo-brinde.mp4",
      poster: "/screens/flows/fluxo-brinde-poster.webp",
    },
  },
];

const AUTO_MS = 4200;

type Props = {
  locale?: "pt" | "en";
};

function FlowVideoPlayer({
  video,
  accent,
  label,
  locale = "pt",
}: {
  video: FlowConfig["video"];
  accent: string;
  label: string;
  locale?: "pt" | "en";
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [video.webm]);

  const start = () => {
    setPlaying(true);
    requestAnimationFrame(() => {
      void videoRef.current?.play();
    });
  };

  return (
    <div className="glass-panel-dark relative overflow-hidden rounded-2xl border-t border-t-white/15 shadow-xl">
      <div className="relative aspect-video w-full bg-[#0b0e14]">
        {!playing ? (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 z-10 flex items-center justify-center"
            aria-label={locale === "en" ? "Play flow demo" : "Reproduzir fluxo"}
          >
            <Image
              src={withBasePath(video.poster)}
              alt={
                locale === "en"
                  ? `Screenshot preview of the “${label}” flow`
                  : `Preview em screenshot do fluxo “${label}”`
              }
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain object-top opacity-90 transition group-hover:opacity-100"
              unoptimized
            />
            <span
              className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white shadow-lg backdrop-blur-sm transition group-hover:scale-105"
              style={{ boxShadow: `0 0 0 1px ${accent}40` }}
            >
              <Play className="h-6 w-6 fill-current" />
            </span>
          </button>
        ) : null}
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-contain ${playing ? "opacity-100" : "opacity-0"}`}
          poster={withBasePath(video.poster)}
          controls={playing}
          playsInline
          preload="none"
          onEnded={() => setPlaying(false)}
        >
          <source src={withBasePath(video.webm)} type="video/webm" />
          <source src={withBasePath(video.mp4)} type="video/mp4" />
        </video>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5">
        <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-white/45">
          {locale === "en" ? "Full flow · on demand" : "Fluxo completo · sob demanda"}
        </span>
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
      </div>
    </div>
  );
}

export default function PlatformFlowsShowcase({ locale = "pt" }: Props) {
  const reduceMotion = useReducedMotion();
  const [flowId, setFlowId] = useState<FlowId>("campanha");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const flow = FLOWS.find((f) => f.id === flowId) ?? FLOWS[0];
  const step = flow.steps[active] ?? flow.steps[0];

  useEffect(() => {
    setActive(0);
    setPaused(false);
  }, [flowId]);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setInterval(() => {
      setActive((p) => (p + 1) % flow.steps.length);
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [paused, reduceMotion, flow.steps.length]);

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-brand-navy-dark py-20 md:py-28">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-brand-orange/15 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-yoobe-purple/12 blur-[100px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/55">
              {locale === "en" ? "Platform flows" : "Fluxos da plataforma"}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="mb-4 font-heading text-3xl font-black text-white md:text-5xl"
          >
            {locale === "en" ? (
              <>
                From setup to delivery in{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#f98f16,#8338ec)" }}>
                  4 steps
                </span>
              </>
            ) : (
              <>
                Do setup à entrega em{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#f98f16,#8338ec)" }}>
                  4 passos
                </span>
              </>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="mx-auto max-w-2xl text-lg text-white/50"
          >
            {locale === "en"
              ? "Real dashboard screens for campaign and gift wizards — plus an on-demand video of each full flow."
              : "Telas reais do dashboard nos wizards de campanha e brinde — e o vídeo sob demanda de cada fluxo completo."}
          </motion.p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {FLOWS.map((f) => {
            const Icon = f.icon;
            const selected = f.id === flowId;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFlowId(f.id);
                  setActive(0);
                  setPaused(false);
                }}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                  selected
                    ? "scale-105 bg-white text-black shadow-lg"
                    : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4" style={selected ? { color: f.accent } : undefined} />
                {locale === "en" ? f.labelEn : f.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          <div className="flex flex-col gap-3">
            {flow.steps.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={`${flow.id}-${s.number}`}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  className={`w-full rounded-2xl border text-left backdrop-blur-xl transition-all duration-300 ${
                    isActive
                      ? "border-white/20 bg-white/12 shadow-lg shadow-black/30"
                      : "border-white/8 bg-white/4 hover:bg-white/8"
                  }`}
                >
                  <div className="flex items-start gap-4 p-4 sm:p-5">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-black text-white"
                      style={{
                        backgroundColor: isActive ? s.accent : "rgba(255,255,255,0.08)",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                      }}
                    >
                      {s.number}
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-base font-bold text-white">{s.title}</p>
                      <AnimatePresence>
                        {isActive ? (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1 overflow-hidden text-sm leading-relaxed text-white/50"
                          >
                            {s.desc}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="pointer-events-none absolute -inset-3 rounded-3xl opacity-25 blur-2xl transition-colors duration-700"
                style={{ backgroundColor: step.accent }}
              />
              <div className="glass-panel-dark relative overflow-hidden rounded-2xl border-t border-t-white/20 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <span className="font-mono text-[0.6rem] tracking-wider text-white/40">
                    gestor.4unik.io · {flow.id === "campanha" ? "Campanha" : "Brinde"}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: `${step.accent}22`, color: step.accent }}
                  >
                    {step.number}
                  </span>
                </div>
                <div className="relative bg-[#0b0e14]" style={{ aspectRatio: "16/10" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${flow.id}-${active}`}
                      initial={reduceMotion ? false : { opacity: 0, scale: 1.02, x: 12 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, x: -12 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <ZoomableScreenshot
                        src={step.img}
                        alt={step.title}
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        imgClassName="object-contain object-top"
                        className="absolute inset-0 h-full w-full"
                        unoptimized
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <FlowVideoPlayer
              video={flow.video}
              accent={flow.accent}
              label={locale === "en" ? flow.labelEn : flow.label}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
