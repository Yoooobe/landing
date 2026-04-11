# Estratégia de conteúdo enterprise (pilares)

Este documento fixa **pilares temáticos** e um **mapa de URLs** para alinhar Sanity, blog e landing com compradores B2B (RH, produto, engenharia). O site é export estático: novas rotas exigem código e rebuild.

## Pilares (3–5) e intenção

| Pilar | Público | Promessa |
| --- | --- | --- |
| **Reward infrastructure** | CTO, engenharia, produto | API, webhooks, catálogo e fulfillment como camada única |
| **Engajamento e gamificação** | RH, people | Campanhas, reconhecimento e operação sem virar logística manual |
| **Integrações enterprise** | TI, RHIS | SSO, ecossistema HR tech, integrações nomeadas (ex.: Workvivo) |
| **Escala e governança** | Segurança, compliance | Papéis, auditoria, LGPD/privacidade em linguagem responsável |
| **Prova social** | Comprador | Casos, logos, métricas anonimizadas quando possível |

## Mapa de URLs (existentes vs futuro)

| Rota (com `basePath` `/landing`) | Função |
| --- | --- |
| `/`, `/en/` | Home — proposta de valor e prova |
| `/plataforma/`, `/en/plataforma/` | Visão da plataforma |
| `/api-integracoes/`, `/en/api-integracoes/` | API e integrações |
| `/gamificacao/`, `/en/gamificacao/` | Oferta de gamificação |
| `/blog/`, `/en/blog/` | Autoridade e keywords long-tail |
| Futuro (exemplos) | `/seguranca/`, `/recursos/sla/` — só após decisão de IA e copy |

## Calendário editorial (Sanity)

1. **Frequência**: mínimo 2 posts/mês PT (1 espelhado EN quando fizer sentido).
2. **Workflow**: rascunho no Studio → revisão humana → `publishedAt` → rebuild estático (GitHub Actions / deploy).
3. **Clusters**: cada pilar deve ter 1 artigo pilar por trimestre + 2–3 satélites (how-to, glossário, comparações educativas).
4. **Tags e categorias**: usar `category` e `tags` no `blogPost` para o bloco **Leia também** (mesma categoria) no detalhe do post.

## Paridade PT/EN

Manter significado alinhado entre `src/messages/segments/pt-*.ts` e `en-*.ts` e documentos `marketingPage` por idioma no Sanity.
