"use client";

import { BASE_PATH, withBasePath } from "@/lib/basePath";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Expand, X } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type LightboxProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
};

function resolveSrc(src: string) {
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }
  if (BASE_PATH && (src === BASE_PATH || src.startsWith(`${BASE_PATH}/`))) {
    return src;
  }
  return withBasePath(src);
}

export function ScreenshotLightbox({ open, onClose, src, alt }: LightboxProps) {
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="screenshot-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <button
            type="button"
            aria-label="Fechar preview"
            className="absolute inset-0 bg-brand-navy-dark/85 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-surface-panel shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <p id={titleId} className="truncate text-sm font-semibold text-white/80">
                {alt}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative min-h-[40vh] flex-1 bg-[#0b0e14]">
              <Image
                src={resolveSrc(src)}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
                unoptimized
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

type ZoomableProps = {
  src: string;
  alt: string;
  /** next/image sizes hint */
  sizes?: string;
  className?: string;
  imgClassName?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  unoptimized?: boolean;
  /** Extra overlay content (e.g. badges) — pointer-events-none recommended */
  children?: ReactNode;
  /** Disable click-to-expand */
  disableZoom?: boolean;
};

/**
 * Clickable screenshot that opens a fullscreen lightbox. Works with fill or fixed dims.
 */
export function ZoomableScreenshot({
  src,
  alt,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  imgClassName = "object-contain object-top",
  fill = true,
  width,
  height,
  priority,
  unoptimized,
  children,
  disableZoom = false,
}: ZoomableProps) {
  const [open, setOpen] = useState(false);
  const openLightbox = useCallback(() => {
    if (!disableZoom) setOpen(true);
  }, [disableZoom]);
  const closeLightbox = useCallback(() => setOpen(false), []);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox();
    }
  };

  const resolved = resolveSrc(src);

  return (
    <>
      <button
        type="button"
        onClick={openLightbox}
        onKeyDown={onKeyDown}
        disabled={disableZoom}
        aria-label={`${alt} — ampliar`}
        className={`group relative block w-full overflow-hidden text-left ${
          disableZoom ? "cursor-default" : "cursor-zoom-in"
        } ${className}`}
      >
        {fill ? (
          <Image
            src={resolved}
            alt={alt}
            fill
            sizes={sizes}
            className={imgClassName}
            priority={priority}
            unoptimized={unoptimized}
            decoding="async"
          />
        ) : (
          <Image
            src={resolved}
            alt={alt}
            width={width ?? 1360}
            height={height ?? 860}
            sizes={sizes}
            className={imgClassName}
            priority={priority}
            unoptimized={unoptimized}
            decoding="async"
          />
        )}
        {children}
        {!disableZoom ? (
          <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-white/85 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            <Expand className="h-3 w-3" />
            Ampliar
          </span>
        ) : null}
      </button>
      <ScreenshotLightbox open={open} onClose={closeLightbox} src={src} alt={alt} />
    </>
  );
}

export default ScreenshotLightbox;
