"use client";

import { useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";
import {
  leadAudienceSettingsQuery,
  leadStatsQuery,
  recentLeadsQuery,
} from "@/sanity/queries/leads";
import { apiVersion } from "@/sanity/env";

type RecentLead = {
  _id: string;
  submittedAt?: string;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: string;
  locale?: string;
  status?: string;
};

type LeadStats = {
  total: number;
  last7Days: number;
  last30Days: number;
  byLocale: { pt: number; en: number };
  leadsForAggregation: { source?: string }[];
};

type AudienceSettings = {
  gaMeasurementId?: string;
  gtmContainerId?: string;
  metaPixelId?: string;
  linkedinPartnerId?: string;
  calendlyUrl?: string;
  contactEmail?: string;
};

function aggregateBySource(leads: { source?: string }[]): { source: string; count: number }[] {
  const map = new Map<string, number>();
  for (const row of leads) {
    const key = row.source?.trim() || "unknown";
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

function formatWhen(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("pt-BR");
  } catch {
    return iso;
  }
}

const cardStyle: React.CSSProperties = {
  background: "var(--card-bg-color, #fff)",
  border: "1px solid var(--card-border-color, #e2e8f0)",
  borderRadius: 8,
  padding: 16,
};

export default function LeadAudienceDashboard() {
  const client = useClient({ apiVersion });
  const [recent, setRecent] = useState<RecentLead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [settings, setSettings] = useState<AudienceSettings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [recentRows, statsRow, settingsRow] = await Promise.all([
          client.fetch<RecentLead[]>(recentLeadsQuery),
          client.fetch<LeadStats>(leadStatsQuery, { sevenDaysAgo, thirtyDaysAgo }),
          client.fetch<AudienceSettings | null>(leadAudienceSettingsQuery),
        ]);
        if (cancelled) return;
        setRecent(recentRows ?? []);
        setStats(statsRow ?? null);
        setSettings(settingsRow ?? null);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Erro ao carregar leads");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [client]);

  const bySource = useMemo(
    () => aggregateBySource(stats?.leadsForAggregation ?? []),
    [stats?.leadsForAggregation],
  );

  if (loading) {
    return <p style={{ padding: 16 }}>A carregar leads…</p>;
  }

  if (error) {
    return <p style={{ padding: 16, color: "#b91c1c" }}>{error}</p>;
  }

  return (
    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ margin: "0 0 4px", fontSize: 20 }}>Leads e audiência</h2>
        <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>
          Submissões dos formulários da landing (via Postmark + ingest API). Audiência abaixo =
          stack de tracking configurado em Configurações do site.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
        {[
          { label: "Total", value: stats?.total ?? 0 },
          { label: "Últimos 7 dias", value: stats?.last7Days ?? 0 },
          { label: "Últimos 30 dias", value: stats?.last30Days ?? 0 },
          { label: "PT", value: stats?.byLocale?.pt ?? 0 },
          { label: "EN", value: stats?.byLocale?.en ?? 0 },
        ].map((item) => (
          <div key={item.label} style={cardStyle}>
            <div style={{ fontSize: 12, color: "#64748b" }}>{item.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>Por origem (source)</h3>
        {bySource.length === 0 ? (
          <p style={{ margin: 0, color: "#64748b" }}>Nenhum lead registado ainda.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 0", borderBottom: "1px solid #e2e8f0" }}>Origem</th>
                <th style={{ textAlign: "right", padding: "6px 0", borderBottom: "1px solid #e2e8f0" }}>Leads</th>
              </tr>
            </thead>
            <tbody>
              {bySource.map((row) => (
                <tr key={row.source}>
                  <td style={{ padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>{row.source}</td>
                  <td style={{ padding: "8px 0", textAlign: "right", borderBottom: "1px solid #f1f5f9" }}>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>Audiência — tracking configurado</h3>
        <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "160px 1fr", gap: "8px 16px", fontSize: 14 }}>
          {(
            [
              ["GA4", settings?.gaMeasurementId || "—"],
              ["GTM", settings?.gtmContainerId || "—"],
              ["Meta Pixel", settings?.metaPixelId || "—"],
              ["LinkedIn", settings?.linkedinPartnerId || "—"],
              ["Calendly", settings?.calendlyUrl || "—"],
              ["Email contacto", settings?.contactEmail || "—"],
            ] as const
          ).map(([label, value]) => (
            <div key={label} style={{ display: "contents" }}>
              <dt style={{ color: "#64748b" }}>{label}</dt>
              <dd style={{ margin: 0, wordBreak: "break-all" }}>{value}</dd>
            </div>
          ))}
        </dl>
        <p style={{ margin: "12px 0 0", fontSize: 12, color: "#94a3b8" }}>
          Métricas GA4 em tempo real não estão integradas neste painel — edite IDs em Configurações do site.
        </p>
      </div>

      <div style={cardStyle}>
        <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>Últimos 20 leads</h3>
        {recent.length === 0 ? (
          <p style={{ margin: 0, color: "#64748b" }}>Nenhum lead ainda.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  {["Quando", "Nome", "Empresa", "Email", "Origem", "Idioma"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "6px 8px", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((lead) => (
                  <tr key={lead._id}>
                    <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9", whiteSpace: "nowrap" }}>{formatWhen(lead.submittedAt)}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{lead.name}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{lead.company}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{lead.email}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{lead.source || "—"}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{lead.locale || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
