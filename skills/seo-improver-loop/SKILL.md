---
name: seo-improver-loop
description: Loop recorrente de SEO/AEO para a landing 4unik — mede (GA4/GSC), orquestra as skills de marketing existentes, aplica correções de baixo risco no Sanity e abre PR para mudanças estruturais.
triggers:
  - loop de seo
  - seo improver
  - rodar seo loop
  - otimizar seo agora
disable-model-invocation: true
---

# SEO Improver Loop

Substitui o agente `seo-improver` do `atom-eve` (registry quebrada para o CLI `0.1.4` em 2026-07 — ver nota no fim) por um loop nativo que reusa a infraestrutura já existente no repo: scripts GA4/GSC, MCP `4unik-marketing`, MCP `Sanity`, MCP `github`, e as skills de marketing já mapeadas em [`marketing-strategy-orchestrator`](../marketing-strategy-orchestrator/SKILL.md).

Não depende de DataForSEO nem de sandbox Eve/Vercel — os dados de ranking vêm do Google Search Console via MCP/scripts locais.

## Cadência

Semanal, segunda 9h (mesmo cron do agente original: `0 9 * * 1`). Agendado como rotina cloud (skill `schedule`) ou via `/loop` local. Pode também ser disparado manualmente pelos triggers acima.

## Passo 1 — Medir

Rodar em paralelo:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/4unik/landing-ga4-reader.json"
npm run fetch:ga4-snapshot
npm run check:gsc-indexing
npm run validate:landing-routes -- --smoke https://plataforma.4unik.com.br/landing
```

MCP `4unik-marketing`:
- `get_knowledge_freshness` — decide se roda `notebooklm-knowledge-curator` antes de tudo
- `get_ga4_metrics` + `get_landing_optimization_snapshot`
- `get_seo_health`
- `get_aeo_landing_checklist`
- `get_content_sync_registry`
- `suggest_growth_opportunities`

## Passo 2 — Orquestrar (tema `seo`)

Seguir a ordem já definida no orquestrador:

1. `marketing-page-ideator` — gaps de página/funil
2. `marketing-growth-hacker` — priorização por CAC/LTV/conversão
3. `marketing-ai-citation-strategist` — AEO/GEO, schema, FAQs

## Passo 3 — Priorizar

Consolidar achados dos passos 1–2 em backlog P0/P1/P2, cruzando com [`docs/landing-improvement-backlog.md`](../../docs/landing-improvement-backlog.md). Não duplicar itens já abertos.

## Passo 4 — Aplicar (baixo risco, automático)

Só os seguintes tipos de mudança podem ser aplicados direto, via MCP Sanity (`patch_documents`) ou edição de `src/messages/segments/*`:

- `seo.metaTitle` (≤60 chars), `seo.metaDescription` (≤160 chars), `seo.openGraphDescription` (≤200 chars) — schema em `src/sanity/schemaTypes/seoType.ts`
- Texto de FAQ/schema.org existentes (sem inventar claims — ver regra AEO abaixo)
- Alt text de imagens

**Nunca auto-aplicar:**
- Novas rotas/páginas, mudanças em `src/app/`
- IDs de GA4, `NEXT_PUBLIC_GA_ID`, qualquer acesso dinâmico `process.env[key]` em `src/lib/site.ts` (regra fixa — ver [`integrations.md`](../../docs/knowledge-base/integrations.md))
- Claims de citação garantida em IA (proibido pela `marketing-ai-citation-strategist`)

Toda auto-aplicação registra o diff no relatório do Passo 6.

## Passo 5 — Propor (PR) para mudanças estruturais

Para o que não é baixo risco: abrir branch + PR via MCP `github` (`create_branch`, `create_or_update_file`, `create_pull_request`), descrevendo a mudança e linkando o item do backlog. Não fazer merge automático.

## Passo 6 — Relatório

Atualizar (ou criar) `docs/reviews/agent-seo-traffic-<YYYY-MM>.md` seguindo o formato dos relatórios existentes ([`agent-seo-traffic-2026-07.md`](../../docs/reviews/agent-seo-traffic-2026-07.md)):

1. Tabela resumo (SEO técnico, funil GA4, GSC, tráfego orgânico)
2. Comparação GA4 com snapshot anterior
3. GSC/indexação
4. Entregas desde a revisão anterior (o que foi auto-aplicado + PRs abertos)
5. Veredito provisório
6. Checklist para a próxima revisão

Linkar a revisão anterior no topo do arquivo.

## Passo 7 — Handoff Paperclip

Os agentes Paperclip são externos e sincronizam a partir deste repo (não são invocados diretamente daqui). Depois de qualquer PR mergeado ou edição de Sanity, o relatório deve deixar claro o que mudou para que a próxima sincronização Paperclip (ver [`integrations.md`](../../docs/knowledge-base/integrations.md)) pegue o estado atualizado. Não reintroduzir configuração dinâmica de tracking — essa é a regra que já causou retrabalho antes.

## Política de três camadas (herdada do orquestrador)

1. Estratégia → `docs/knowledge-base/`
2. Copy → Sanity + `src/messages/segments/`
3. Código → `src/app/` só depois de **Ready** (via PR, nunca auto-merge)

---

### Nota sobre `atom-eve add seo-improver`

Em 2026-07 a registry `elie222/atom-eve` migrou de `atom.json` para `README.md`/`SETUP.md`/`agent/` (PR #116), mas o CLI publicado no npm (`atom-eve@0.1.4`) ainda espera `atom.json` — `npx atom-eve add seo-improver --target eve` falha com 404. Esta skill reimplementa o essencial do agente original (medir → priorizar → aplicar → relatar, cron semanal) usando MCPs e skills já existentes no repo, sem exigir DataForSEO nem sandbox Eve.
