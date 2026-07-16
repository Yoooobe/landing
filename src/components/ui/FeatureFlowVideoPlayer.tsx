"use client";

import { withBasePath } from "@/lib/basePath";
import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  body?: string;
  playLabel: string;
  webm: string;
  mp4: string;
  poster: string;
};

export default function FeatureFlowVideoPlayer({
  title,
  body,
  playLabel,
  webm,
  mp4,
  poster,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [webm]);

  const start = () => {
    setPlaying(true);
    requestAnimationFrame(() => {
      void videoRef.current?.play();
    });
  };

  return (
    <div className="glass-panel-dark relative overflow-hidden rounded-[1.75rem] border-t border-t-white/15 shadow-2xl">
      <div className="relative aspect-video w-full bg-[#0b0e14]">
        {!playing ? (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 z-10 flex items-center justify-center"
            aria-label={playLabel}
          >
            <Image
              src={withBasePath(poster)}
              alt={title}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-contain object-top opacity-90 transition group-hover:opacity-100"
              unoptimized
            />
            <span className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white shadow-lg backdrop-blur-md transition group-hover:scale-105">
              <Play className="h-7 w-7 fill-current" />
            </span>
          </button>
        ) : null}
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-contain ${playing ? "opacity-100" : "opacity-0"}`}
          poster={withBasePath(poster)}
          controls={playing}
          playsInline
          preload="none"
          onEnded={() => setPlaying(false)}
        >
          <source src={withBasePath(webm)} type="video/webm" />
          <source src={withBasePath(mp4)} type="video/mp4" />
        </video>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-3.5">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          {body ? <p className="mt-0.5 text-xs leading-relaxed text-white/50">{body}</p> : null}
        </div>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
      </div>
    </div>
  );
}
