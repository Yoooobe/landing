import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Evita indexação do Studio em motores de busca (complementa `disallow` em robots.ts). */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Viewport a full height para o Studio; metadata vem de `page.tsx` (next-sanity/studio).
 */
export default function StudioToolLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] m-0 flex min-h-0 flex-col bg-zinc-950 p-0 [&_*]:box-border">
      {children}
    </div>
  );
}
