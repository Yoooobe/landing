# COMECE AQUI — 4Unik AI Assistant

Olá, Genau. Este pacote é o **ambiente do agente de IA de conteúdo** da
4Unik. Use este arquivo como primeiro prompt em Claude,
Cursor ou ChatGPT-like com acesso a pastas.

---

## O que é isto?

Uma pasta pronta com:

1. **DNA de marca** (estratégia, voz, visual, anti-patterns, referências)
2. **Design system** (cores, tipografia, logos)
3. **Frameworks** de produção de conteúdo (carrossel, motion, imagens, time)
4. **Ferramenta Apify** para (futura) atualização de referências sociais.

Não é o site. Não é o CRM. É o cérebro criativo + método de produção.

---

## Passo 1 — Abrir a pasta no agente

1. Abra a pasta `4unik-ai-assistant` no Cursor / Claude Code / similar
2. Cole (ou aponte) este arquivo + o `CLAUDE.md`
3. Peça: *“Leia COMECE-AQUI.md e CLAUDE.md, depois carregue o DNA da 4Unik.”*

---

## Passo 2 — Instalar o mínimo técnico (no seu Mac)

```bash
# Node (se ainda não tiver)
node -v   # ideal v18+

# (Opcional) Playwright para compor slides PNG
npx playwright install chromium

# (Opcional) Higgsfield CLI — geração de imagens
# siga o setup da sua conta Higgsfield / hf

# (Opcional) ffmpeg — para vídeo/frames
brew install ffmpeg
```

Token Apify (se for usado no futuro, em `tools/.env`):

```
APIFY_TOKEN=sua_chave_apify
```

---

## Passo 3 — O agente deve ler isto SEMPRE antes de criar

Ordem obrigatória:

1. `dna/4unik-dna.md`
2. `dna/4unik-voice.md`
3. `dna/4unik-visual.md`
4. `dna/4unik-anti-patterns.md`
5. `dna/4unik-refs.md` ← (referências futuras)

Design system: `dna/design-system/colors_and_type.css`  
Logos: `dna/design-system/logos/`

---

## Passo 4 — Primeiro briefing de teste

Peça ao agente:

> Crie 3 conceitos de post (só texto) no pilar INOVAÇÃO/TECNOLOGIA sobre
> "escalabilidade do reconhecimento", alinhado ao DNA 4Unik e
> referenciando o tom de voz em `4unik-voice.md`. Aguarde eu escolher.

Se o tom parecer escritório genérico ou "SaaS", mande releitura do DNA.

---

## Passo 5 — Atualizar referências sociais (se aplicável)

(No futuro, se houver um scraper para 4Unik):

```bash
cd tools
node scrape-instagram.mjs 4unikoficial 30
```

Saída em `assets/instagram/4unik/`.  
Depois peça ao agente: *“Atualize o catálogo em dna/4unik-refs.md com o scrape novo.”*

---

## Onde colocar entregas

- Brutos / matéria-prima → `assets/`
- Peças finais → `entregas/YYYY-MM-DD_tipo/`

Crie a pasta `entregas/` na primeira entrega se ainda não existir.

---

## Mapa rápido

| Quero… | Abra |
|---|---|
| Entender a marca | `dna/4unik-dna.md` |
| Ver cores/fontes | `dna/4unik-visual.md` + `design-system/` |
| Ver posts de referência | `dna/4unik-refs.md` ou `assets/instagram/` (futuro) |
| Ver o que a pasta sabe fazer | `INDICE-GERAL-HABILIDADES.md` |
| Método de carrossel/vídeo | `frameworks/` |
| Scraping Instagram (futuro) | `tools/scrape-instagram.mjs` |

---

## Contatos da marca (não alterar sem dono)

- Site Institucional: https://4unik.com.br (brindes corporativos B2B)
- Site Plataforma: https://plataforma.4unik.com.br
- Painel do gestor: domínio de produto, não divulgado — não citar em peça pública
- Instagram: @4unikoficial · LinkedIn: linkedin.com/company/4unik
- Facebook: facebook.com/4unik · YouTube: canal UC_VzSfDEQJADesk_kssGCfw
- WhatsApp / Telefone: wa.me/551126844724 · (11) 2684-4724
- Demonstração: calendly.com/4unik/30min
- CNPJ: 35.459.697/0001-48

Lista completa e verificada em `dna/4unik-refs.md`.

---

## Prompt único para colar na IA

```
Você é o agente de conteúdo da 4Unik.
1) Leia COMECE-AQUI.md e CLAUDE.md.
2) Carregue os 5 arquivos do DNA em dna/ (ordem do README).
3) Nunca invente promessas de performance ou de "garantia de resultado" sem base em dados ou cases auditados.
4) Português brasileiro com acentuação correta.
5) Antes de gerar peças finais, proponha 3 conceitos e espere minha escolha.
Confirme com: "DNA 4Unik carregado. Pode mandar o briefing."
```
