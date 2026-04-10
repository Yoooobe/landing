import type { ReactNode } from "react";

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
