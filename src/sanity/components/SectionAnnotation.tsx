"use client";

import { ObjectInputProps } from "sanity";

// ---------- wireframe data ------------------------------------------------

type Zone = {
  /** 0–1 relative to a 100-unit page height */
  top: number;
  /** 0–1 relative to page height */
  height: number;
  label: string;
  color: string;
};

const PAGE_SECTIONS: Record<string, Record<string, Zone>> = {
  gamificacao: {
    hero:        { top: 0,    height: 0.10, label: "Hero",          color: "#7c3aed" },
    mechanics:   { top: 0.10, height: 0.16, label: "Mecânicas",     color: "#f59e0b" },
    cases:       { top: 0.26, height: 0.14, label: "Cases",         color: "#10b981" },
    trends:      { top: 0.40, height: 0.14, label: "Tendências",    color: "#3b82f6" },
    kpis:        { top: 0.54, height: 0.14, label: "KPIs",          color: "#ec4899" },
    deepUsecases:{ top: 0.68, height: 0.18, label: "Casos de uso",  color: "#f97316" },
  },
  api: {
    hero:         { top: 0,    height: 0.12, label: "Hero",           color: "#7c3aed" },
    integrations: { top: 0.12, height: 0.18, label: "Integrações",    color: "#0ea5e9" },
    features:     { top: 0.30, height: 0.18, label: "Features",       color: "#10b981" },
    modules:      { top: 0.48, height: 0.18, label: "Módulos",        color: "#f59e0b" },
  },
  home: {
    bento:                 { top: 0,    height: 0.10, label: "Bento",                 color: "#7c3aed" },
    platformTabs:          { top: 0.10, height: 0.12, label: "Tabs da plataforma",    color: "#0ea5e9" },
    enterpriseCases:       { top: 0.22, height: 0.12, label: "Cases enterprise",      color: "#10b981" },
    storeSection:          { top: 0.34, height: 0.10, label: "Loja",                 color: "#f59e0b" },
    howItWorks:            { top: 0.44, height: 0.12, label: "Como funciona",         color: "#f97316" },
    aiRoadmap:             { top: 0.56, height: 0.10, label: "Roadmap IA",            color: "#8b5cf6" },
    dedicatedIntegrations: { top: 0.66, height: 0.10, label: "Integrações nativas",  color: "#ec4899" },
    managementSection:     { top: 0.76, height: 0.10, label: "Gestão",               color: "#3b82f6" },
  },
  plataforma: {
    adminDashboardImage:     { top: 0,    height: 0.18, label: "Painel do gestor",    color: "#7c3aed" },
    storeMockupImage:        { top: 0.18, height: 0.16, label: "Loja de recompensas", color: "#f59e0b" },
    logisticsPanelImage:     { top: 0.34, height: 0.16, label: "Logística",           color: "#10b981" },
    securityPanelImage:      { top: 0.50, height: 0.16, label: "Segurança",           color: "#3b82f6" },
    gestaoFeatureCards:      { top: 0.66, height: 0.08, label: "Cards Gestão",        color: "#f97316" },
    gamificacaoFeatureCards: { top: 0.74, height: 0.08, label: "Cards Gamificação",   color: "#ec4899" },
    lojaFeatureCards:        { top: 0.82, height: 0.08, label: "Cards Loja",          color: "#8b5cf6" },
    apiFeatureCards:         { top: 0.90, height: 0.08, label: "Cards API",           color: "#0ea5e9" },
  },
};

// ---------- wireframe SVG -------------------------------------------------

function PageWireframe({
  page,
  activeSection,
}: {
  page: string;
  activeSection: string;
}) {
  const sections = PAGE_SECTIONS[page] ?? {};
  const W = 120;
  const H = 200;

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      style={{ flexShrink: 0, borderRadius: 4, overflow: "hidden" }}
    >
      {/* Page background */}
      <rect x={0} y={0} width={W} height={H} fill="#0d1424" rx={3} />

      {/* Top bar */}
      <rect x={0} y={0} width={W} height={10} fill="#1a2035" />
      <circle cx={8} cy={5} r={2.5} fill="#ef4444" opacity={0.7} />
      <circle cx={16} cy={5} r={2.5} fill="#f59e0b" opacity={0.7} />
      <circle cx={24} cy={5} r={2.5} fill="#22c55e" opacity={0.7} />

      {/* All sections as faint strips */}
      {Object.entries(sections).map(([key, zone]) => {
        const isActive = key === activeSection;
        const y = 10 + zone.top * (H - 10);
        const h = zone.height * (H - 10);
        return (
          <rect
            key={key}
            x={0}
            y={y}
            width={W}
            height={h}
            fill={zone.color}
            opacity={isActive ? 0.35 : 0.07}
          />
        );
      })}

      {/* Active section highlighted border + label */}
      {sections[activeSection] && (() => {
        const zone = sections[activeSection];
        const y = 10 + zone.top * (H - 10);
        const h = zone.height * (H - 10);
        return (
          <>
            <rect
              x={1}
              y={y + 1}
              width={W - 2}
              height={h - 2}
              fill="none"
              stroke={zone.color}
              strokeWidth={1.5}
              rx={1}
            />
            {/* Label box */}
            <rect
              x={4}
              y={y + h / 2 - 5}
              width={zone.label.length * 4.5 + 8}
              height={10}
              fill={zone.color}
              rx={2}
              opacity={0.9}
            />
            <text
              x={8}
              y={y + h / 2 + 3.5}
              fontSize={6}
              fill="#fff"
              fontFamily="sans-serif"
              fontWeight="bold"
            >
              {zone.label}
            </text>
          </>
        );
      })()}
    </svg>
  );
}

// ---------- page URL labels -----------------------------------------------

const PAGE_URL: Record<string, string> = {
  gamificacao: "/plataforma/motor-gamificacao/",
  api:         "/api-integracoes/",
  home:        "/",
  plataforma:  "/plataforma/",
};

// ---------- main component ------------------------------------------------

type SectionAnnotationProps = ObjectInputProps & {
  page: string;
  section: string;
};

export function SectionAnnotation(props: SectionAnnotationProps) {
  const { page, section, renderDefault } = props;
  const zone = PAGE_SECTIONS[page]?.[section];
  const pageUrl = PAGE_URL[page] ?? "/";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Annotation banner */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          padding: "0.6rem 0.75rem",
          borderRadius: "6px 6px 0 0",
          background: zone ? `${zone.color}14` : "rgba(99,102,241,0.07)",
          borderBottom: zone ? `2px solid ${zone.color}40` : "2px solid rgba(99,102,241,0.2)",
          marginBottom: "0.1rem",
        }}
      >
        {/* Wireframe */}
        {zone && (
          <PageWireframe page={page} activeSection={section} />
        )}

        {/* Description */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "0.25rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: zone?.color ?? "#818cf8",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                color: zone?.color ?? "#818cf8",
              }}
            >
              {zone?.label ?? section}
            </span>
            <span
              style={{
                fontSize: "0.68rem",
                color: "#888",
                fontFamily: "monospace",
              }}
            >
              {pageUrl}
            </span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              color: "#777",
              lineHeight: 1.5,
            }}
          >
            As imagens carregadas aqui substituem os ícones e emojis desta seção na
            página renderizada. O ícone/emoji original é mantido como fallback se a
            imagem não estiver preenchida.
          </p>
        </div>
      </div>

      {/* Normal object fields */}
      <div>{renderDefault(props)}</div>
    </div>
  );
}
