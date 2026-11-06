# Estudo de ferramentas e recursos — plataforma.4unik.com.br → yoobe.co

Data: 2026-11-06. Levantado no repo `Yoooobe/landing` e nas contas ligadas.

## Hospedagem e deploy

| Recurso | O que faz | Onde está | No yoobe.co | Observação |
|---|---|---|---|---|
| GitHub Pages (`gh-pages`) | Serve o 4unik em `/landing/` | branch `gh-pages`, publicado à mão por `scripts/deploy-production.sh` (último 2026-08-17) | não | Actions `deploy.yml` falha desde ago/2026 (billing). Script ficou só no `4unik-legacy`. |
| Proxy nginx `plataforma.4unik.com.br` | Encaminha `/` → gh-pages `/landing/` | servidor 177.136.235.130 (`infra/` no legado) | não | Será o ponto dos 301 quando o 4unik for simplificado. |
| Vercel `landing` | yoobe.co / www / landing.yoobe.co | time `yoobe-devs-s-team` | **sim** | Agora recebe o build Next (`scripts/deploy-yoobe-co.sh`). |
| Vercel `4unik-landing` | Cópia do 4unik em Vercel | mesmo time | não | Sem deploy desde a migração; candidato a remoção. |
| Vercel `leads-ingest-api` | Leads 4unik → Sanity + Postmark | mesmo time | não | Intocado. |
| Vercel `yoobe-leads-ingest` | Leads yoobe.co → genau@yoobe.co | mesmo time | **sim** | Criado; falta token/template Postmark. |
| Vercel `nano-banana-api` | Geração de imagem (Gemini) para o Studio | `nano-banana-api/` | opcional | Depende de chave Gemini AI Studio (hoje 429/pré-pago acabou). |

## Conteúdo e dados

| Recurso | No yoobe.co | Observação |
|---|---|---|
| Sanity `hin8ivz0` / `production` | não (só leitura para migrar) | Plano não permite dataset privado. 11 `leadSubmission` + 667 `emailTrackingEvent` legíveis sem token — corrigir migrando para `_id` com ponto. |
| Sanity `hin8ivz0` / `yoobe` | **sim** | 82 docs de conteúdo + 19 posts EN. Público, mas leads novos usam `leads.<uuid>` (só com token). |
| Sanity Studio `/studio` | **sim** | Mesmo schema; aponta para o dataset do build. |
| `src/lib/blogFallback.ts` | só fallback | Usado apenas se o Sanity não responder. |
| Webhook Sanity → `repository_dispatch` | não | Era o rebuild do GH Pages. Para o yoobe.co: criar deploy hook do Vercel `landing` e webhook do dataset `yoobe`. |

## E-mail, agenda, contato

| Recurso | Configuração yoobe.co |
|---|---|
| Postmark (server 19497979) | Domínio yoobe.co verificado (usuário). Template Yoobe pronto em `docs/postmark/yoobe-lead-auto-reply-template.*`; falta criar no Postmark. |
| Calendly | `calendly.com/yoobeco/demo` |
| WhatsApp | `+55 41 98760-7512` |
| E-mail público | `vendas@yoobe.co`; notificação de leads → `genau@yoobe.co` |

## Medição

| Recurso | 4unik | yoobe.co |
|---|---|---|
| GA4 | `G-SMJDYCENBC` | propriedade nova (pendente — precisa de login gcloud com escopo analytics ou ID criado no painel) |
| Google Ads | `AW-860167767` | desligado até ID Yoobe |
| Meta Pixel / LinkedIn | via `siteSettings` | desligados |
| Search Console | propriedade 4unik | `yoobe.co` por DNS (zona em `ns-cloud-d*.googledomains.com`) |

## Automação e IA

| Recurso | Estado | Recomendação |
|---|---|---|
| Cron `run-seo-improver-loop.sh` (seg 9h, usa `claude`) | **pausado** | Reapontar para `~/landing` main (yoobe.co) só depois do merge; revisar prompts (falam de 4unik). |
| Cron `run-blog-agent.sh` (ter/qui 8h) | **pausado**; já falhava ("Permission denied", sem `+x`) | Reescrever para gravar no dataset `yoobe` em EN. |
| `src/lib/kimiClient.ts` | chama `api.kimi.com/coding` (chave morta, 401) | Trocar para Moonshot direto `kimi-k2.6` — e recarregar saldo (Moonshot suspensa por saldo em 2026-11-06). |
| MCP `mcps/4unik-marketing` (SEO health, blog seeds, GA4) | ativo localmente | Renomear para `yoobe-marketing` e apontar GA4/Sanity novos. |
| Hermes (`hermes/`, projeto `landing-4unik`) | ativo | Criar projeto `landing-yoobe`; atualizar URL canônica no `REGISTRY.md`. |
| `skills/` (11 skills de marketing, `4unik-ai-discovery`) | ativo | Revisar nomes/prompts com 4unik antes de reusar. |
| `agent-os/`, sync Obsidian, `scripts/fetch-ga4-*`, `gsc-indexing-check` | ativo | Reapontar IDs (GA4 property `327916606` é da 4unik). |
| LaunchAgents `com.4unik.mail*` | ativo | Fora do site; ligado ao 4unik.mail. |

## Saldo das chaves de LLM (testado 2026-11-06)

Moonshot: conta suspensa por saldo · Vertex (`gen-lang-client-0239954679`): sem billing · OpenAI: sem créditos · OpenRouter: zerado (CLAUDE.md). A tradução do blog foi feita por subagentes Claude desta sessão.

## Para descartar na simplificação do 4unik

`4unik-landing` (Vercel), workflow `deploy.yml`, webhook `sanity-publish`, `public/campanha`, `infra/` nginx (depois dos 301), skills/MCP com nome 4unik (após renomear), dataset `production` (depois de mover os leads).
