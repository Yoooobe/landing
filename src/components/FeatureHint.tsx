"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";

type Props = {
  hint: string;
};

const POPOVER_WIDTH = 224;
const VIEWPORT_MARGIN = 12;

export default function FeatureHint({ hint }: Props) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const rect = btnRef.current?.getBoundingClientRect();
      if (!rect) return;
      const left = Math.min(
        Math.max(rect.right - POPOVER_WIDTH, VIEWPORT_MARGIN),
        window.innerWidth - POPOVER_WIDTH - VIEWPORT_MARGIN,
      );
      setCoords({ top: rect.top - 8, left });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (btnRef.current?.contains(target)) return;
      if (popoverRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Mais detalhes sobre este recurso"
        className={`ml-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full align-middle transition-colors ${
          open ? "bg-accent-sky text-white" : "text-ink-muted/60 hover:text-accent-sky"
        }`}
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open && coords ? (
                <motion.div
                  ref={popoverRef}
                  initial={{ opacity: 0, y: 4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "fixed",
                    top: coords.top,
                    left: coords.left,
                    width: POPOVER_WIDTH,
                    transform: "translateY(-100%)",
                  }}
                  className="glass-panel-light z-[60] rounded-2xl p-3 text-left text-xs leading-relaxed text-ink-deep shadow-[0_12px_32px_rgba(22,40,58,0.15)]"
                >
                  {hint}
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
