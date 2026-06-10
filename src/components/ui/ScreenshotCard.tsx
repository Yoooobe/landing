"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type ReactNode } from "react";

type Props = {
  /** Fully resolved image src (caller applies withBasePath / Sanity URL). */
  src: string;
  alt: string;
  /** CSS aspect-ratio string for the framed area. Defaults to "16/10". */
  aspectRatio?: string;
  /** Optional caption rendered below the framed image. */
  caption?: ReactNode;
  /** next/image sizes hint. */
  sizes?: string;
  /** Extra classes for the outer wrapper. */
  className?: string;
  /** Disable hover/tap zoom (e.g. very small thumbnails). */
  disableZoom?: boolean;
  /** Zoom factor applied on hover/tap. Defaults to 1.6. */
  zoom?: number;
  unoptimized?: boolean;
  priority?: boolean;
};

/**
 * Unified screenshot frame for product UI shots inside cards.
 * Uses object-contain over a dark letterbox so images are always shown whole
 * (no crop, no distortion), with an in-place magnify on hover/tap (no modal).
 */
export default function ScreenshotCard({
  src,
  alt,
  aspectRatio = "16/10",
  caption,
  sizes = "(min-width: 1024px) 45vw, 100vw",
  className = "",
  disableZoom = false,
  zoom = 1.6,
  unoptimized,
  priority,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disableZoom) return;
      const rect = frameRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setOrigin({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    },
    [disableZoom],
  );

  const handleEnter = useCallback(() => {
    if (!disableZoom) setActive(true);
  }, [disableZoom]);

  const handleLeave = useCallback(() => {
    setActive(false);
    setOrigin({ x: 50, y: 50 });
  }, []);

  const handleTap = useCallback(() => {
    if (disableZoom) return;
    setOrigin({ x: 50, y: 50 });
    setActive((prev) => !prev);
  }, [disableZoom]);

  return (
    <figure className={`group/screenshot ${className}`}>
      <div
        ref={frameRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={handleMove}
        onClick={handleTap}
        className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e14] shadow-2xl ${
          disableZoom ? "" : "cursor-zoom-in"
        }`}
        style={{ aspectRatio }}
      >
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{
            transform: active ? `scale(${zoom})` : "scale(1)",
            transformOrigin: `${origin.x}% ${origin.y}%`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-contain"
            unoptimized={unoptimized}
            priority={priority}
            decoding="async"
          />
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-4 text-sm leading-relaxed text-white/60">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
