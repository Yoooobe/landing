"use client";

import { BASE_PATH } from "@/lib/basePath";
import { useState, useCallback, useRef, useEffect } from "react";

const DEV_BASE = "http://localhost:3000";

/** Alinha com `NEXT_PUBLIC_SITE_URL` / `src/lib/basePath.ts` (basePath do Next). */
function appBasePrefix(): string {
  return BASE_PATH ? `${DEV_BASE}${BASE_PATH}` : DEV_BASE;
}

function showcaseTypeUrls(): Record<string, string> {
  const root = appBasePrefix();
  return {
    gamificacaoShowcaseMedia: `${root}/plataforma/motor-gamificacao/`,
    apiIntegracoesShowcaseMedia: `${root}/api-integracoes/`,
    platformShowcaseMedia: `${root}/plataforma/`,
    homeShowcaseMedia: `${root}/`,
    workvivoShowcaseMedia: `${root}/api-integracoes/workvivo/`,
  };
}

function getPreviewUrl(
  schemaType: string,
  document: Record<string, unknown> | null,
): string | null {
  const bp = BASE_PATH;

  if (schemaType === "marketingPage" && document) {
    const slug = (document.slug as { current?: string } | undefined)?.current;
    const locale = document.locale as string | undefined;
    if (!slug) return null;
    const path =
      slug === "home"
        ? `${bp}/`
        : slug === "gamificacao"
          ? locale === "en"
            ? `${bp}/en/plataforma/motor-gamificacao/`
            : `${bp}/plataforma/motor-gamificacao/`
          : locale === "en"
            ? `${bp}/en/${slug}/`
            : `${bp}/${slug}/`;
    return `${DEV_BASE}${path}`;
  }

  if (schemaType === "blogPost" && document) {
    const slug = (document.slug as { current?: string } | undefined)?.current;
    const locale = document.locale as string | undefined;
    if (!slug) return null;
    const path =
      locale === "en" ? `${bp}/en/blog/${slug}/` : `${bp}/blog/${slug}/`;
    return `${DEV_BASE}${path}`;
  }

  return showcaseTypeUrls()[schemaType] ?? null;
}

const SCALE = 0.35;

type Props = {
  document: {
    displayed: Record<string, unknown> | null;
  };
  documentId: string;
  schemaType: { name: string };
};

export function PagePreviewPane({ document: docProps, schemaType }: Props) {
  const [zoomed, setZoomed] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    setIsDev(window.location.hostname === "localhost");
  }, []);

  const previewUrl = getPreviewUrl(schemaType.name, docProps.displayed);

  const handleIframeLoad = useCallback(() => setLoaded(true), []);

  if (!isDev) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "2rem",
          gap: "1rem",
          color: "#888",
          textAlign: "center",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
        <p style={{ margin: 0, fontSize: "0.9rem", maxWidth: 280 }}>
          A miniatura da página só está disponível em desenvolvimento local
          (<code>localhost:3000</code>).
        </p>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#aaa" }}>
          Em produção, faça rebuild após publicar as alterações.
        </p>
      </div>
    );
  }

  if (!previewUrl) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#888" }}>
        <p>URL de preview não configurada para este tipo de documento.</p>
      </div>
    );
  }

  const CONTAINER_W = 1280;
  const CONTAINER_H = 900;
  const scaledW = Math.round(CONTAINER_W * SCALE);
  const scaledH = Math.round(CONTAINER_H * SCALE);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1.5rem",
          gap: "1rem",
          height: "100%",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", alignSelf: "stretch" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#888",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            Miniatura da página
          </span>
          <span style={{ flex: 1 }} />
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.75rem",
              color: "#2377C9",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            Abrir página
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* Thumbnail container */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Clique para ampliar preview da página"
          onClick={() => setZoomed(true)}
          onKeyDown={(e) => e.key === "Enter" && setZoomed(true)}
          style={{
            position: "relative",
            width: scaledW,
            height: scaledH,
            cursor: "zoom-in",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.08)",
            flexShrink: 0,
          }}
        >
          {!loaded && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#1a1a2e",
                color: "#555",
                fontSize: "0.8rem",
                gap: "0.5rem",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              Carregando...
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={previewUrl}
            title="Preview da página"
            onLoad={handleIframeLoad}
            style={{
              width: CONTAINER_W,
              height: CONTAINER_H,
              border: "none",
              transformOrigin: "top left",
              transform: `scale(${SCALE})`,
              pointerEvents: "none",
            }}
          />
          {/* Zoom hint overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              background: "rgba(0,0,0,0.65)",
              color: "#fff",
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: "0.65rem",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              backdropFilter: "blur(4px)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            Clique para ampliar
          </div>
        </div>

        <p style={{ margin: 0, fontSize: "0.72rem", color: "#888", textAlign: "center" }}>
          {previewUrl}
        </p>
      </div>

      {/* Zoom modal */}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Preview ampliado da página"
          onClick={() => setZoomed(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "3rem",
            cursor: "zoom-out",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "min(90vw, 1100px)",
              marginBottom: "0.75rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span style={{ color: "#ccc", fontSize: "0.8rem" }}>Preview ampliado — clique fora para fechar</span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: "0.75rem",
                  color: "#6eaff7",
                  textDecoration: "none",
                  padding: "4px 10px",
                  border: "1px solid #444",
                  borderRadius: 4,
                }}
              >
                Abrir em nova aba ↗
              </a>
              <button
                onClick={(e) => { e.stopPropagation(); setZoomed(false); }}
                style={{
                  background: "none",
                  border: "1px solid #555",
                  color: "#ccc",
                  borderRadius: 4,
                  padding: "4px 10px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                }}
              >
                ✕ Fechar
              </button>
            </div>
          </div>
          <div
            style={{
              width: "min(90vw, 1100px)",
              height: "min(80vh, 800px)",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
              cursor: "default",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={previewUrl}
              title="Preview ampliado da página"
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

// Sanity requires a default export for document view components
export default PagePreviewPane;

// Type alias expected by structureTool .views()
export type PagePreviewPaneComponent = typeof PagePreviewPane;
// Satisfy the DocumentPaneNode type requirement (views expect a React component)
PagePreviewPane.displayName = "PagePreviewPane";

// Make this usable as a Sanity document view
// The structureTool passes { document, documentId, schemaType } as props
declare module "sanity/structure" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface DocumentPaneNode {}
}
