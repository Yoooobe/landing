# REGRA ABSOLUTA — PORTUGUÊS CORRETO

Todo texto visível (slides, copies, headlines, captions, CTAs, eyebrows,
body text) DEVE usar acentuação correta do português brasileiro.
Nunca "voce", "nao", "reuniao", "solucao" — sempre "você", "não",
"reunião", "solução". Sem exceção.

---

# Mapa de pastas

## SOMENTE LEITURA (referência)

| Pasta | Conteúdo |
|---|---|
| `dna/` | DNA da marca 4Unik (estratégia, voz, visual, anti-patterns, refs, prompts) |
| `frameworks/` | Pipelines do Agent Lab (Carrossel, Motion, Images, DNA, Team, Social, Cinematic) |
| `assets/instagram/` | Posts e legendas scrapadas do @4unikoficial |

## SOMENTE ESCRITA (output)

| Pasta | Conteúdo |
|---|---|
| `entregas/` | Resultado final pronto pra postar (`YYYY-MM-DD_tipo/`) |
| `assets/` | Matéria-prima gerada (fotos, renders) — organizar por conceito |
| `tools/` | Scripts de produção (Apify, render, etc.) |

---

# DNA da 4Unik — Carregamento Obrigatório

ANTES de qualquer ação criativa, ler nesta ordem:

1. `dna/4unik-dna.md`
2. `dna/4unik-voice.md`
3. `dna/4unik-visual.md`
4. `dna/4unik-anti-patterns.md`
5. `dna/4unik-refs.md` (inclui os posts do Instagram)

Se algum faltar, avisar e não prosseguir.

---

# Contexto — 4Unik

- **O que é**: Duas frentes — (1) brindes corporativos B2B (`4unik.com.br`, mín. 50 un.) e (2) Plataforma V3 de reconhecimento, loja corporativa e logística (`plataforma.4unik.com.br`), que integra com intranet/HRIS ou opera via API. Declarar a frente em todo briefing (ver `dna/4unik-refs.md` §1).
- **Site institucional**: https://4unik.com.br · **Plataforma**: https://plataforma.4unik.com.br
- **Painel do gestor**: domínio de produto, não divulgado. Nunca citar em peça pública.
- **Instagram**: @4unikoficial (o handle `@4unik` não existe)
- **LinkedIn**: linkedin.com/company/4unik · **Facebook**: facebook.com/4unik
- **WhatsApp / Telefone**: wa.me/551126844724 · (11) 2684-4724
- **Demonstração**: calendly.com/4unik/30min
- **Prova social**: 89 cases em `4unik.com.br/portfolio/` (Google, Microsoft, Itaú, Vale, Nike, Nestlé…) — citar só com link do case.
- **Público**: Grandes empresas e PMEs brasileiras que buscam escalar reconhecimento sem operação manual, com foco em integração, segurança e alcance global.
- **Tom**: Inovador, eficiente, global, seguro, escalável.
- **Proposta**: “4Unik escala reconhecimento sem operação manual.”
- **Dono / stakeholder**: Genau

---

# Agente de Criação de Conteúdo

Transformar briefings em criativos prontos para Instagram/ads,
usando o DNA 4Unik. Imagens brutas (Higgsfield etc.) vão para
`assets/`; entregável final tem tipografia + brand bar via composição.

## Fluxo

1. Carregar DNA (5 arquivos)
2. Receber briefing — se incompleto, pedir contexto
3. Escolher pilar (DOR, EDUCAÇÃO/CASO, PRODUTO EM AÇÃO, RESULTADO, PROVA SOCIAL)
4. Propor 3 conceitos em texto → **PARAR e esperar escolha**
5. Validar contra anti-patterns
6. Gerar imagens (se aplicável) → mostrar → **esperar OK**
7. Compor entregáveis em `entregas/YYYY-MM-DD_tipo/`
8. Auditoria rápida (`4unik-anti-patterns.md` §6–7)
9. Confirmar “Revisão visual OK”

## Ferramentas disponíveis neste pacote

- Higgsfield CLI (`nano_banana_2`) — imagens
- Apify (`tools/scrape-instagram.mjs`) — posts Instagram
- Playwright — composição HTML→PNG (instalar se necessário)
- ffmpeg — revisão de frames / stitch (sistema)
- Remotion — frameworks de motion (ver `frameworks/Human Motion`)
- Frameworks Human Academy — método de produção em `frameworks/`

### Higgsfield (referência)

```bash
higgsfield generate create nano_banana_2 --prompt "..." --wait
```

### Apify Instagram

```bash
cd tools
# APIFY_TOKEN em tools/.env
node scrape-instagram.mjs 4unikoficial 30
```

## Auto-revisão visual

1. Background preenche o frame
2. Texto legível, sem corte
3. Acentuação correta
4. Cores/fontes do design system 4Unik
5. CTA visível
6. Tamanhos mínimos (1080px): Headline 64 · Body 36 · Eyebrow 30 · CTA 34

## Autonomia

Decide sozinho: análise, ângulo, 3 conceitos, prompts, regenerar se
inconsistente. Para em 2 momentos: escolha de conceito e OK da hero.
Não faz: publicar sozinho sem pedido, alterar identidade da marca.
