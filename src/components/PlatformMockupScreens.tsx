/**
 * Platform UI mockup components — styled JSX that simulate real platform screenshots.
 * Used as fallbacks in FeatureScreensCarousel, floating hero cards, and Bento cards
 * when actual /public/screens/*.png files are not available.
 */

// ─── Admin: Dashboard ────────────────────────────────────────────────────────

export function AdminDashboardMockup() {
  const bars = [65, 82, 54, 91, 73, 88, 60];
  const campaigns = [
    { name: "Campanha Q4 Vendas", pts: "1.200 pts", status: "ativa", color: "#22c55e" },
    { name: "Reconhecimento RH", pts: "800 pts", status: "rascunho", color: "#f59e0b" },
    { name: "Metas Logística", pts: "2.500 pts", status: "ativa", color: "#22c55e" },
  ];
  return (
    <div className="h-full w-full overflow-hidden bg-[#0d1424] text-white select-none" style={{ fontFamily: "system-ui, sans-serif", fontSize: 11 }}>
      {/* Top nav */}
      <div className="flex items-center justify-between border-b border-white/8 bg-[#111827] px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm bg-brand-orange opacity-90" style={{ background: "#f97316" }} />
          <span className="font-bold text-white/70" style={{ fontSize: 9 }}>gestor.4unik.io</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 rounded-full bg-white/8" />
          <div className="h-5 w-5 rounded-full bg-yoobe-purple/40" style={{ background: "rgba(139,92,246,0.4)" }} />
        </div>
      </div>

      <div className="flex h-full">
        {/* Sidebar */}
        <div className="hidden shrink-0 flex-col gap-1 border-r border-white/5 bg-[#0a0f18] p-2 sm:flex" style={{ width: 36 }}>
          {["▦", "📊", "🎯", "🛒", "⚙"].map((ic, i) => (
            <div key={i} className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: i === 0 ? "rgba(249,115,22,0.2)" : "transparent", fontSize: 8 }}>{ic}</div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-2 overflow-hidden p-2.5">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "Campanhas ativas", val: "12", sub: "+3 esse mês", color: "#22c55e" },
              { label: "Pontos emitidos", val: "48.2K", sub: "↑ 18%", color: "#f97316" },
              { label: "Participantes", val: "1.840", sub: "↑ 9%", color: "#8b5cf6" },
            ].map((kpi, i) => (
              <div key={i} className="rounded-lg border border-white/8 bg-[#111827] p-1.5">
                <div style={{ color: kpi.color, fontSize: 9, fontWeight: 700 }}>{kpi.val}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 8 }}>{kpi.label}</div>
                <div style={{ color: kpi.color, fontSize: 7, marginTop: 2 }}>{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Mini bar chart */}
          <div className="rounded-lg border border-white/8 bg-[#111827] p-2">
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 8, marginBottom: 4 }}>Pontos / semana</div>
            <div className="flex items-end gap-1" style={{ height: 28 }}>
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 5 ? "#f97316" : "rgba(249,115,22,0.3)" }} />
              ))}
            </div>
            <div className="mt-1 flex justify-between" style={{ color: "rgba(255,255,255,0.25)", fontSize: 7 }}>
              {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(d => <span key={d}>{d}</span>)}
            </div>
          </div>

          {/* Campaign list */}
          <div className="flex flex-col gap-1">
            {campaigns.map((c, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border border-white/5 bg-[#111827]/80 px-2 py-1">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 8 }}>{c.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 7 }}>{c.pts}</span>
                  <span className="rounded-full px-1.5" style={{ background: `${c.color}22`, color: c.color, fontSize: 7, border: `1px solid ${c.color}44` }}>{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin: Campaign Identity ─────────────────────────────────────────────────

export function AdminCampaignIdentityMockup() {
  return (
    <div className="h-full w-full overflow-hidden bg-[#0d1424] text-white select-none" style={{ fontFamily: "system-ui, sans-serif", fontSize: 11 }}>
      <div className="flex items-center justify-between border-b border-white/8 bg-[#111827] px-3 py-1.5">
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>Nova campanha — Identidade</div>
        <div className="flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", fontSize: 8, color: "#f97316" }}>
          <span className="inline-block h-1 w-1 rounded-full" style={{ background: "#f97316" }} />
          Preview ao vivo
        </div>
      </div>
      <div className="flex h-full gap-0">
        {/* Form side */}
        <div className="flex flex-1 flex-col gap-2 p-3">
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 8, marginBottom: 3 }}>Nome da campanha</div>
            <div className="rounded-md border border-white/10 bg-[#111827] px-2 py-1.5" style={{ fontSize: 9, color: "rgba(255,255,255,0.8)" }}>Campanha Q4 Vendas 2024</div>
          </div>
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 8, marginBottom: 3 }}>Slug único</div>
            <div className="flex items-center gap-1 rounded-md border border-white/10 bg-[#111827] px-2 py-1.5">
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 8 }}>gestor.4unik.io/c/</span>
              <span style={{ color: "#8b5cf6", fontSize: 9 }}>q4-vendas-2024</span>
            </div>
          </div>
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 8, marginBottom: 4 }}>Cor principal</div>
            <div className="flex gap-1.5">
              {["#f97316", "#8b5cf6", "#0ea5e9", "#22c55e", "#ec4899"].map(c => (
                <div key={c} className="h-4 w-4 rounded-full" style={{ background: c, outline: c === "#f97316" ? "2px solid white" : "none", outlineOffset: 1 }} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 8, marginBottom: 3 }}>Logo da campanha</div>
            <div className="flex h-8 items-center justify-center rounded-md border border-dashed border-white/15 bg-[#111827]" style={{ fontSize: 8, color: "rgba(255,255,255,0.3)" }}>
              + Enviar logo
            </div>
          </div>
          <div className="mt-auto">
            <div className="rounded-lg px-3 py-1.5 text-center" style={{ background: "#f97316", fontSize: 9, fontWeight: 700, color: "#fff" }}>Salvar e continuar →</div>
          </div>
        </div>
        {/* Preview side */}
        <div className="flex w-20 flex-col gap-1 border-l border-white/5 bg-[#0a0f18] p-2">
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 7, textTransform: "uppercase", letterSpacing: "0.08em" }}>Preview</div>
          <div className="rounded-lg border border-orange-500/20 bg-[#111827] p-1.5" style={{ background: "rgba(249,115,22,0.06)" }}>
            <div className="rounded-md px-1.5 py-1 text-center" style={{ background: "#f97316", fontSize: 8, fontWeight: 700, color: "#fff" }}>Q4 Vendas</div>
            <div className="mt-1 rounded-sm bg-white/5 p-1" style={{ fontSize: 7, color: "rgba(255,255,255,0.4)" }}>
              <div className="mb-0.5 h-1 w-10 rounded-full bg-white/15" />
              <div className="h-1 w-7 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin: Campaign Products ─────────────────────────────────────────────────

export function AdminCampaignProductsMockup() {
  const products = [
    { name: "Fone BT Pro", pts: "1.200", cat: "Eletrônicos" },
    { name: "Voucher Ifood", pts: "450", cat: "Alimentação" },
    { name: "Kit Esporte", pts: "890", cat: "Esporte" },
    { name: "Curso Online", pts: "600", cat: "Educação" },
    { name: "SPA Day", pts: "1.800", cat: "Bem-estar" },
    { name: "Smartwatch", pts: "3.200", cat: "Eletrônicos" },
  ];
  return (
    <div className="h-full w-full overflow-hidden bg-[#0d1424] text-white select-none" style={{ fontFamily: "system-ui, sans-serif", fontSize: 11 }}>
      <div className="flex items-center justify-between border-b border-white/8 bg-[#111827] px-3 py-1.5">
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>Nova campanha — Produtos & Recompensas</div>
        <div className="flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", fontSize: 8, color: "#8b5cf6" }}>
          ✦ Assistente IA
        </div>
      </div>
      <div className="p-2.5">
        <div className="mb-2 flex gap-1.5">
          {["Todos", "Eletrônicos", "Vouchers", "Bem-estar"].map((cat, i) => (
            <div key={cat} className="rounded-full px-2 py-0.5" style={{ background: i === 0 ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${i === 0 ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.08)"}`, fontSize: 8, color: i === 0 ? "#f97316" : "rgba(255,255,255,0.5)" }}>{cat}</div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {products.map((p, i) => (
            <div key={i} className="relative rounded-lg border border-white/8 bg-[#111827] p-1.5" style={{ border: i < 2 ? "1px solid rgba(249,115,22,0.3)" : undefined }}>
              {i < 2 && <div className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full" style={{ background: "#22c55e" }} />}
              <div className="mb-1 h-6 w-full rounded-md" style={{ background: ["rgba(249,115,22,0.15)", "rgba(34,197,94,0.15)", "rgba(139,92,246,0.15)", "rgba(14,165,233,0.15)", "rgba(236,72,153,0.15)", "rgba(249,115,22,0.15)"][i] }} />
              <div style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{p.name}</div>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,0.35)" }}>{p.cat}</div>
              <div style={{ fontSize: 8, fontWeight: 700, color: "#f97316", marginTop: 2 }}>{p.pts} pts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Admin: Campaign Config (desktop/mobile preview) ─────────────────────────

export function AdminCampaignConfigMockup() {
  return (
    <div className="h-full w-full overflow-hidden bg-[#0d1424] text-white select-none" style={{ fontFamily: "system-ui, sans-serif", fontSize: 11 }}>
      <div className="flex items-center justify-between border-b border-white/8 bg-[#111827] px-3 py-1.5">
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>Preview · Desktop & Mobile</div>
        <div className="flex gap-1">
          {["⬜", "📱"].map((ic, i) => (
            <div key={i} className="rounded px-1.5 py-0.5" style={{ background: i === 0 ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.05)", fontSize: 9 }}>{ic}</div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 p-2.5">
        {/* Desktop preview */}
        <div className="flex-1 rounded-lg border border-orange-500/20 bg-[#111827] p-2">
          <div className="mb-1.5 rounded-md px-2 py-1" style={{ background: "#f97316", fontSize: 8, fontWeight: 700, textAlign: "center", color: "#fff" }}>Q4 Vendas 2024</div>
          <div className="mb-1 flex gap-1">
            {[3, 2, 3].map((w, i) => <div key={i} className="rounded" style={{ width: `${w * 12}px`, height: 6, background: "rgba(255,255,255,0.08)" }} />)}
          </div>
          <div className="grid grid-cols-2 gap-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="rounded-md" style={{ height: 14, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.15)" }} />
            ))}
          </div>
        </div>
        {/* Mobile preview */}
        <div className="w-16 rounded-xl border border-white/10 bg-[#111827] p-1.5" style={{ borderRadius: 14 }}>
          <div className="mb-1 rounded px-1 py-0.5 text-center" style={{ background: "#f97316", fontSize: 7, fontWeight: 700, color: "#fff" }}>Q4 Vendas</div>
          <div className="flex flex-col gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-md" style={{ height: 10, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.12)" }} />
            ))}
          </div>
          <div className="mt-1.5 rounded-md py-0.5 text-center" style={{ background: "#f97316", fontSize: 7, fontWeight: 700, color: "#fff" }}>Resgatar</div>
        </div>
      </div>
    </div>
  );
}

// ─── Member: Store Home ───────────────────────────────────────────────────────

export function MemberStoreHomeMockup() {
  const products = [
    { name: "Fone BT Pro", pts: "1.200", color: "rgba(249,115,22,0.15)" },
    { name: "Voucher Ifood", pts: "450", color: "rgba(34,197,94,0.15)" },
    { name: "Kit Esporte", pts: "890", color: "rgba(139,92,246,0.15)" },
    { name: "Curso Online", pts: "600", color: "rgba(14,165,233,0.15)" },
  ];
  return (
    <div className="h-full w-full overflow-hidden bg-[#f8fafc] select-none" style={{ fontFamily: "system-ui, sans-serif", fontSize: 11 }}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-1.5">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm" style={{ background: "#f97316" }} />
          <span style={{ fontSize: 9, fontWeight: 700, color: "#111827" }}>Loja de recompensas</span>
        </div>
        <div className="rounded-full px-2 py-0.5" style={{ background: "rgba(249,115,22,0.1)", fontSize: 8, color: "#f97316", fontWeight: 700 }}>🏆 4.820 pts</div>
      </div>
      {/* Categories */}
      <div className="flex gap-1.5 overflow-hidden border-b border-gray-100 bg-white px-3 py-1">
        {["Todos", "Eletrônicos", "Vouchers", "Esporte"].map((c, i) => (
          <div key={c} className="rounded-full px-2 py-0.5" style={{ background: i === 0 ? "#f97316" : "transparent", border: `1px solid ${i === 0 ? "#f97316" : "#e5e7eb"}`, fontSize: 7, color: i === 0 ? "#fff" : "#6b7280" }}>{c}</div>
        ))}
      </div>
      {/* Product grid */}
      <div className="grid grid-cols-2 gap-1.5 p-2">
        {products.map((p, i) => (
          <div key={i} className="rounded-lg border border-gray-100 bg-white p-1.5 shadow-sm">
            <div className="mb-1 h-10 rounded-md" style={{ background: p.color }} />
            <div style={{ fontSize: 8, fontWeight: 600, color: "#111827" }}>{p.name}</div>
            <div style={{ fontSize: 8, fontWeight: 700, color: "#f97316", marginTop: 2 }}>{p.pts} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Member: Orders ───────────────────────────────────────────────────────────

export function MemberOrdersMockup() {
  const orders = [
    { name: "Fone BT Pro", date: "12 Nov 2024", status: "Entregue", color: "#22c55e" },
    { name: "Voucher Ifood", date: "08 Nov 2024", status: "A caminho", color: "#f59e0b" },
    { name: "Kit Esporte", date: "01 Nov 2024", status: "Entregue", color: "#22c55e" },
    { name: "Curso Online", date: "22 Out 2024", status: "Entregue", color: "#22c55e" },
  ];
  return (
    <div className="h-full w-full overflow-hidden bg-[#f8fafc] select-none" style={{ fontFamily: "system-ui, sans-serif", fontSize: 11 }}>
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-1.5">
        <span style={{ fontSize: 9, fontWeight: 700, color: "#111827" }}>Meus pedidos</span>
        <span style={{ fontSize: 8, color: "#6b7280" }}>4 pedidos</span>
      </div>
      <div className="flex flex-col gap-1 p-2">
        {orders.map((o, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-2 py-1.5 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md" style={{ background: ["rgba(249,115,22,0.12)", "rgba(34,197,94,0.12)", "rgba(139,92,246,0.12)", "rgba(14,165,233,0.12)"][i] }} />
              <div>
                <div style={{ fontSize: 8, fontWeight: 600, color: "#111827" }}>{o.name}</div>
                <div style={{ fontSize: 7, color: "#9ca3af" }}>{o.date}</div>
              </div>
            </div>
            <div className="rounded-full px-1.5 py-0.5" style={{ background: `${o.color}18`, border: `1px solid ${o.color}44`, fontSize: 7, color: o.color, fontWeight: 600 }}>{o.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Member: Points History ───────────────────────────────────────────────────

export function MemberPointsMockup() {
  const transactions = [
    { label: "Meta de vendas atingida", pts: "+500", color: "#22c55e" },
    { label: "Voucher Ifood resgatado", pts: "-450", color: "#ef4444" },
    { label: "Treinamento concluído", pts: "+200", color: "#22c55e" },
    { label: "Bônus de equipe", pts: "+1.200", color: "#22c55e" },
  ];
  return (
    <div className="h-full w-full overflow-hidden bg-[#f8fafc] select-none" style={{ fontFamily: "system-ui, sans-serif", fontSize: 11 }}>
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-1.5">
        <span style={{ fontSize: 9, fontWeight: 700, color: "#111827" }}>Histórico de pontos</span>
      </div>
      {/* Balance card */}
      <div className="m-2 rounded-xl p-3 text-center" style={{ background: "linear-gradient(135deg, #f97316, #8b5cf6)" }}>
        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.7)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Saldo atual</div>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>4.820</div>
        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.6)" }}>pontos disponíveis</div>
      </div>
      {/* Transactions */}
      <div className="flex flex-col gap-1 px-2">
        {transactions.map((t, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-2 py-1.5">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: t.color }} />
              <span style={{ fontSize: 8, color: "#374151" }}>{t.label}</span>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: t.color }}>{t.pts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pix: Step 1 – Bank selection ─────────────────────────────────────────────

export function PixStep1BanksMockup() {
  const banks = [
    { name: "Nubank", color: "#8b5cf6", abbr: "Nu" },
    { name: "Itaú", color: "#0ea5e9", abbr: "Iᵢ" },
    { name: "Santander", color: "#ef4444", abbr: "Sa" },
    { name: "Bradesco", color: "#e11d48", abbr: "Br" },
    { name: "C6 Bank", color: "#374151", abbr: "C₆" },
    { name: "Inter", color: "#f97316", abbr: "In" },
  ];
  return (
    <div className="h-full w-full overflow-hidden bg-white select-none" style={{ fontFamily: "system-ui, sans-serif", fontSize: 11 }}>
      <div className="border-b border-gray-100 px-3 py-1.5">
        <div style={{ fontSize: 9, fontWeight: 700, color: "#111827" }}>Selecione seu banco</div>
        <div style={{ fontSize: 8, color: "#6b7280" }}>Open Finance seguro e regulado</div>
      </div>
      <div className="mb-2 px-3 pt-2">
        <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2 py-1">
          <span style={{ fontSize: 8, color: "#9ca3af" }}>🔍</span>
          <span style={{ fontSize: 8, color: "#9ca3af" }}>Buscar banco...</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 px-3">
        {banks.map((b, i) => (
          <div key={i} className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-2 shadow-sm" style={{ border: i === 0 ? "1.5px solid rgba(139,92,246,0.4)" : undefined }}>
            <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full font-bold text-white" style={{ background: b.color, fontSize: 9 }}>{b.abbr}</div>
            <div style={{ fontSize: 7, color: "#374151", textAlign: "center" }}>{b.name}</div>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-2 flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-1">
        <span style={{ fontSize: 8 }}>🔒</span>
        <span style={{ fontSize: 7, color: "#1e40af" }}>Conexão segura via Open Finance · Powered by Pluggy</span>
      </div>
    </div>
  );
}

// ─── Pix: Step 2 – Form ───────────────────────────────────────────────────────

export function PixStep2FormMockup() {
  return (
    <div className="h-full w-full overflow-hidden bg-white select-none" style={{ fontFamily: "system-ui, sans-serif", fontSize: 11 }}>
      <div className="border-b border-gray-100 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-green-600" style={{ fontSize: 8 }}>✓</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#111827" }}>Banco conectado · Nubank</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <div>
          <div style={{ fontSize: 8, fontWeight: 600, color: "#374151", marginBottom: 3 }}>CPF / CNPJ</div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5" style={{ fontSize: 9, color: "#111827" }}>123.456.789-00</div>
        </div>
        <div>
          <div style={{ fontSize: 8, fontWeight: 600, color: "#374151", marginBottom: 3 }}>Valor a receber</div>
          <div className="flex items-center rounded-lg border border-blue-200 bg-blue-50 px-2 py-1.5" style={{ gap: 4 }}>
            <span style={{ fontSize: 8, color: "#6b7280" }}>R$</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>1.200,00</span>
          </div>
        </div>
        <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-2">
          <div style={{ fontSize: 7, color: "#92400e", fontWeight: 600 }}>Referente a:</div>
          <div style={{ fontSize: 8, color: "#78350f" }}>Meta de vendas · Campanha Q4 2024</div>
        </div>
        <div className="rounded-lg py-2 text-center" style={{ background: "#0ea5e9", fontSize: 9, fontWeight: 700, color: "#fff" }}>Confirmar pagamento via Pix</div>
        <div className="text-center" style={{ fontSize: 7, color: "#9ca3af" }}>🔒 Autenticação biométrica solicitada pelo banco</div>
      </div>
    </div>
  );
}

// ─── Pix: Step 3 – Success ────────────────────────────────────────────────────

export function PixStep3SuccessMockup() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white select-none" style={{ fontFamily: "system-ui, sans-serif" }}>
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.4)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div style={{ fontSize: 12, fontWeight: 800, color: "#111827", marginBottom: 2 }}>Pagamento confirmado!</div>
      <div style={{ fontSize: 9, color: "#6b7280", marginBottom: 8, textAlign: "center" }}>Seu Pix foi processado com sucesso</div>
      <div className="rounded-xl border border-green-100 bg-green-50 p-3 text-center" style={{ width: "80%" }}>
        <div style={{ fontSize: 8, color: "#15803d", fontWeight: 600 }}>VALOR RECEBIDO</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: "#15803d" }}>R$ 1.200,00</div>
        <div style={{ fontSize: 7, color: "#6b7280", marginTop: 4 }}>Comprovante nº E00038166202411</div>
      </div>
      <div className="mt-3" style={{ fontSize: 8, color: "#9ca3af" }}>100% automatizado · Powered by Pluggy</div>
    </div>
  );
}
