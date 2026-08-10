# Reavaliação de tráfego e SEO — julho 2026

**Data desta revisão:** 2026-06-17 (baseline intercalar; reavaliação completa ~**15/jul/2026**)  
**Revisão anterior:** [`agent-seo-traffic-2026-06.md`](agent-seo-traffic-2026-06.md)  
**Snapshot GA4:** [`ga4-snapshots/2026-06-17.json`](ga4-snapshots/2026-06-17.json)

---

## 1. Resumo (baseline 17/jun)

| Dimensão | Veredito |
|----------|----------|
| **SEO técnico** | OK — build local 73 rotas; `validate:landing-routes` 21 pares; canonical/Growth OK; smoke produção OK em `/landing/*` |
| **Novas páginas** | `/gamificacao-para-rh/` PT+EN implementada no repo — **aguarda deploy** para indexação/GSC |
| **Funil GA4** | 3 eventos no código (`generate_lead`, `schedule_demo`, `contact_whatsapp`); snapshot com zeros (sem hits ainda) |
| **GSC / proxy** | `check:gsc-indexing` 19/19; 3 avisos proxy 301 paths sem `/landing` (pendente SSH) |
| **Tráfego orgânico** | Inconclusivo — janela curta; Direct domina canais |

---

## 2. GA4 — comparação com snapshot 17/jun

| Período | Janela | Sessões | `generate_lead` | `schedule_demo` | `contact_whatsapp` | Taxa funil/sessão |
|---------|--------|---------|-----------------|-----------------|-------------------|-------------------|
| A | 10–11/jun | 20 | 0 | 0 | 0 | 0.00% |
| B | 12–17/jun | 21 | 0 | 0 | 0 | 0.00% |
| C | 03–09/jun | 0 | 0 | 0 | 0 | — |

**Top canais (período B):** Direct (maioria), Referral, Unassigned.  
**Top páginas (período B):** `/landing/`, `/landing/plataforma/`, ICPs, motor-gamificacao.

### Ações antes de 15/jul

1. ~~Marcar key events no Admin~~ — **feito** 17/jun/2026.
2. Após deploy com funil completo: gerar hits de teste (form + Calendly + WhatsApp).
3. `npm run fetch:ga4-snapshot` com período B estendido até 15/jul.

---

## 3. GSC / indexação (17/jun)

| Check | Resultado |
|-------|-----------|
| `check:gsc-indexing` | **19/19 passed** |
| Sitemap produção | 56 URLs (pré-`/gamificacao-para-rh/` — esperar 58 após deploy) |
| Proxy 301 | WARN em `/plataforma/…`, `/pricing/`, `/para-plataformas/` no host raiz |

---

## 4. Entregas desde revisão jun

| Entrega | Estado |
|---------|--------|
| GA Data API + `fetch:ga4-snapshot` com funil 3 eventos | Feito |
| `TrackedOutboundLink` em CTAs Calendly/WhatsApp | Feito (`c8cdfa87` + sessão atual) |
| Docs/skills/MCP `STRATEGIC_PAGE_GAPS` alinhados | Feito |
| Página `/gamificacao-para-rh/` PT+EN | Feito (repo); deploy pendente |
| Blog CTAs slugs `7`/`8` → RH/educação | Feito |

---

## 5. Veredito provisório

**Infra de medição e SEO técnico:** confirmada e reforçada.  
**Crescimento orgânico:** ainda **não comprovado** — aguardar janela até 15/jul + dados pós key events.

---

## 6. Checklist 15/jul/2026

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/4unik/landing-ga4-reader.json"
npm run fetch:ga4-snapshot
npm run check:gsc-indexing
npm run validate:landing-routes -- --smoke https://plataforma.4unik.com.br/landing
```

Atualizar esta secção com:

1. Tabela GA4 períodos A/B/C (B = 12/jun – 15/jul) vs snapshot 17/jun.
2. Variação % sessões, utilizadores, eventos do funil.
3. GSC: impressões/cliques em ICPs, `gamificacao-para-rh`, motor-gamificacao.
4. Veredito final: infra vs crescimento orgânico.

Ver também [`REAVALIACAO-2026-07.md`](REAVALIACAO-2026-07.md).

---

## 7. Reavaliação 14/jul

**Snapshot GA4:** [`ga4-snapshots/2026-07-14.json`](ga4-snapshots/2026-07-14.json) · rodada do `seo-improver-loop` de 13–14/jul (medição em 13/jul; escrita aplicada em 15/jul).

| Período | Janela | Sessões | `generate_lead` | `schedule_demo` | `contact_whatsapp` | Taxa funil/sessão |
|---------|--------|---------|-----------------|-----------------|-------------------|-------------------|
| A | 10–11/jun | 20 | 0 | 0 | 0 | 0.00% |
| B | 12/jun–14/jul | 99 | 0 | 3 | 13 | ~16% |

- **Funil saiu de zero para 16 eventos** — os key events marcados em 17/jun estão captando em produção.
- **`generate_lead` = 0 não é bug**: `LeadCaptureForm.tsx` dispara `sendGAEvent` no sucesso do POST e o fallback de `config/leads-ingest.json` está correto. Zero hits = zero submissões reais no período medido; conferir volume no ingest (Sanity `leadSubmission`).
- **Canais:** Direct/Unassigned dominam; orgânico ainda não é motor de tráfego.
- **GSC:** não rodou nesta rodada (credencial bloqueada na sessão headless). Último estado: 19/19 em 17/jun. Obrigatório na próxima.

### Entregas desta rodada

| Entrega | Estado |
|---------|--------|
| FAQs `/pricing` e `/seguranca` 3→5 perguntas (PT+EN, JSON-LD `FAQPage` via `buildFaqPageJsonLd`) | Feito — logística incluída, começar sem vendas, LGPD/DPA, acesso por perfil (sem valores de plano nem claims de SLA/certificação) |
| Titles com keywords-alvo (gamificação corporativa, loja corporativa, recompensas; motor de gamificação) | Feito (`bc7ca549`, `60149bd5`) |
| Backlog "Next Up" (valores Scale/Enterprise, SLA/certificações) | Mantido com gate Jurídico/Financeiro — não auto-aplicável |

### Veredito provisório (14/jul)

**Infra de medição:** comprovada (funil captando em produção).  
**Crescimento orgânico:** ainda **não comprovado** — reavaliar ~**15/ago** com GSC obrigatório.

### Nota operacional

Rodada headless de 14/jul falhou por limite de uso do claude.ai (`monthly spend limit`); cron semanal segue ativo (segundas 9h). Elevar o limite ou aguardar o reset antes de 20/07.

