"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

import StudioCorsErrorFallback from "./StudioCorsErrorFallback";

type Props = { children: ReactNode };

type State = { error: Error | null };

function isCorsLikeError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const name = err.name ?? "";
  const msg = (err.message ?? "").toLowerCase();
  return (
    name === "CorsOriginError" ||
    name.includes("Cors") ||
    msg.includes("cors") ||
    msg.includes("origin")
  );
}

/**
 * Captura falhas do NextStudio (ex.: CORS não configurado no projeto Sanity).
 */
export default class StudioErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[Sanity Studio]", error, errorInfo);
  }

  render() {
    if (this.state.error && isCorsLikeError(this.state.error)) {
      return <StudioCorsErrorFallback />;
    }
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-950 px-6 text-center text-zinc-200">
          <p className="text-sm font-medium">Erro ao carregar o Studio</p>
          <pre className="max-w-lg overflow-auto rounded-lg bg-zinc-900 p-4 text-left text-xs text-red-300">
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
