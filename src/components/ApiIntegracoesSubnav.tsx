"use client";

import { BASE_PATH } from "@/lib/basePath";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const copy = {
  pt: {
    sectionLabel: "API e integrações",
    overview: "Visão geral da API",
  },
  en: {
    sectionLabel: "API & integrations",
    overview: "API overview",
  },
};

export default function ApiIntegracoesSubnav() {
  const pathname = usePathname() ?? "";
  const pathAfterBase = pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length) || "/"
    : pathname;
  const pathNorm = pathAfterBase.replace(/\/$/, "") || "/";
  const isEn = pathNorm.startsWith("/en/");
  const t = isEn ? copy.en : copy.pt;

  const baseOverview = isEn ? "/en/api-integracoes/" : "/api-integracoes/";

  const onOverview =
    pathNorm === "/api-integracoes" ||
    pathNorm.endsWith("/api-integracoes");

  return (
    <nav
      aria-label={isEn ? "API section" : "Seção API"}
      className="border-b border-white/10 bg-[#0a0f18]/95 backdrop-blur-md"
    >
      <div className="container mx-auto max-w-7xl px-4 pt-20 pb-3 sm:px-6 md:pt-24 lg:px-8">
        <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cyan-400/80">
          {t.sectionLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={baseOverview}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              onOverview
                ? "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30"
                : "text-white/65 hover:bg-white/5 hover:text-white",
            )}
          >
            {t.overview}
          </Link>
        </div>
      </div>
    </nav>
  );
}
