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

1. Marcar key events no Admin (ver [`MANUAL-OPS-CHECKLIST.md`](MANUAL-OPS-CHECKLIST.md)).
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
**Crescimento orgânico:** ainda **não comprovado** — aguardar janela até 15/jul + key events + deploy da página RH.

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
