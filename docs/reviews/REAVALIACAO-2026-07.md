# Reavaliação de tráfego — julho 2026

**Data alvo:** ~**15/jul/2026** (4 semanas após revisão inicial de 17/jun/2026)  
**Revisão base:** [`agent-seo-traffic-2026-06.md`](agent-seo-traffic-2026-06.md)  
**Snapshot inicial:** [`ga4-snapshots/2026-06-17.json`](ga4-snapshots/2026-06-17.json)  
**Baseline intercalar:** [`agent-seo-traffic-2026-07.md`](agent-seo-traffic-2026-07.md)  
**Ops manuais:** [`MANUAL-OPS-CHECKLIST.md`](MANUAL-OPS-CHECKLIST.md)

## Pré-requisitos

1. `landing-ga4-reader@institucional-480905.iam.gserviceaccount.com` com **Viewer** na propriedade GA4 `327916606`.
2. `generate_lead` marcado como **key event** no Admin GA4.
3. Proxy 301 aplicado no host `plataforma.4unik.com.br` (paths sem `/landing`).

## Checklist (~15/jul/2026)

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/4unik/landing-ga4-reader.json"
export GA_PROPERTY_ID=327916606
export GA4_STREAM_ID=15052677461

# Snapshot com período B estendido (12/jun – hoje)
npm run fetch:ga4-snapshot

# Comparar com snapshot 2026-06-17
diff <(jq '.periods[].result.metrics.sessions' docs/reviews/ga4-snapshots/2026-06-17.json) \
     <(jq '.periods[].result.metrics.sessions' docs/reviews/ga4-snapshots/$(date +%Y-%m-%d).json) || true

npm run check:gsc-indexing
npm run validate:landing-routes -- --smoke https://plataforma.4unik.com.br/landing
```

## Entregável

Criar ou atualizar `docs/reviews/agent-seo-traffic-2026-07.md` com:

1. Tabela GA4 períodos A/B/C (B = 12/jun – 15/jul) vs snapshot 17/jun.
2. Variação % sessões, utilizadores, `generate_lead`, taxa lead/sessão.
3. Top páginas e canais (organic vs direct).
4. GSC: impressões/cliques em ICPs, motor-gamificacao, reward-infrastructure.
5. Veredito: infra vs crescimento orgânico comprovado.

## Métricas de sucesso (orientativas)

| Métrica | O que observar |
|---------|----------------|
| Sessões organic | Tendência ascendente vs junho (lag 2–4 semanas pós-ICPs/home) |
| `generate_lead` / sessão | Estabilidade ou melhoria pós-redesign (1 CTA home) |
| Indexação GSC | URLs ICP + motor-gamificacao sem erros 404 no host raiz |

## Automação opcional

Ver secção **4. Monthly GA4 snapshot** em [`docs/cursor-automations-growth.md`](../cursor-automations-growth.md).
