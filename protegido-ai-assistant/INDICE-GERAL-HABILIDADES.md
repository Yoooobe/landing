# ÍNDICE GERAL DE HABILIDADES — 4unik-ai-assistant

Tudo que este pacote permite fazer com um agente de IA de conteúdo,
organizado por capacidade. Última atualização: 2026-08-05.

---

## 1. Identidade e governança de marca

| Habilidade | Onde |
|---|---|
| Estratégia, persona, JTBD, pilares | `dna/4unik-dna.md` |
| Voz, tom, anti-slop | `dna/4unik-voice.md` |
| Cores, tipo, logo, composição | `dna/4unik-visual.md` + `dna/design-system/` |
| O que nunca fazer | `dna/4unik-anti-patterns.md` |
| Referências oficiais + futuras referências | `dna/4unik-refs.md` |
| Prompts de imagem | `dna/4unik-prompts.md` |
| Regras do agente | `CLAUDE.md` |
| Onboarding humano (Genau) | `COMECE-AQUI.md` |

---

## 2. Inteligência de conteúdo para 4Unik (futuro)

| Habilidade | Onde |
|---|---|
| Scraping de posts/legendas (Apify) | `tools/scrape-instagram.mjs` (adaptado para @4unikoficial) |
| Dataset @4unikoficial | `assets/instagram/4unikoficial/` (30 posts, 2026-08-06) |
| Skill Apify (MCP + uso local) | `frameworks/Human Team/skills/apify/` |
| Análise de ângulos de comunicação | `dna/4unik-refs.md` (futuro) |

**Actor usado:** `apify/instagram-scraper` (adaptado para 4Unik)

---

## 3. Produção de criativos (método)

| Habilidade | Framework |
|---|---|
| DNA / discovery de marca (método genérico) | `frameworks/Human DNA/` |
| Carrosséis | `frameworks/Human Carroussel/` |
| Imagens / prompts | `frameworks/Human Images/` + `dna/4unik-prompts.md` |
| Motion / Remotion (método) | `frameworks/Human Motion/` |
| Social / desdobramento | `frameworks/Human Social/` |
| Cinematic / Seedance / vídeo | `frameworks/Human Cinematic/` |
| Time de agentes / squads | `frameworks/Human Team/` |
| Skill cinema de produto | `frameworks/Skills/product-ad-cinema/` |
| BUD (auxiliar) | `frameworks/BUD/` |

> Os frameworks são **métodos de produção**. Toda saída deve ser adaptada ao
> DNA **4Unik** (plataforma de reconhecimento), nunca a outra marca.

---

## 4. Integrações e ferramentas externas

| Integração | Status neste pacote | Como usar |
|---|---|---|
| **Apify** | Instalado em `tools/` | `node scrape-instagram.mjs 4unik` |
| **Higgsfield / nanoBanana** | Documentado | CLI `higgsfield` (conta própria) |
| **Playwright** | Opcional | Composição HTML→PNG de slides |
| **ffmpeg** | Sistema | Frames, stitch, revisão de vídeo |
| **Remotion** | Via frameworks | Projetos motion sob demanda |
| **ElevenLabs** | Mencionado nos frameworks DNA | TTS se configurar chave própria |
| **Zernio** | Não incluso neste pacote limpo | Publicação social — configurar à parte se quiser |

---

## 5. Fluxos prontos para pedir à IA

1. **Post informativo** — pilar INOVAÇÃO/TECNOLOGIA (escalabilidade, API, integrações)
2. **Case de sucesso** — estilo feed (Hapvida, Prio) → lição 4Unik
3. **Criativo de eficiência** — “automatize o reconhecimento do seu RH”
4. **Prova social** — depoimentos, cases (só com fatos reais)
5. **Story/ads** — headline + CTA “Agendar demonstração”
6. **Atualizar referências sociais** — rodar Apify e refrescar `4unik-refs.md` (futuro)
7. **Auditoria de peça** — passar em anti-patterns §6–7
8. **Geração de imagem** — prompts do DNA + Higgsfield + composição

---

## 6. Estrutura de pastas (visão operacional)

```
4unik-ai-assistant/
├── COMECE-AQUI.md
├── INDICE-GERAL-HABILIDADES.md
├── CLAUDE.md
├── dna/                    ← cérebro da marca
├── frameworks/             ← métodos de produção
├── assets/instagram/       ← referências sociais (futuro)
├── tools/                  ← Apify + scripts
└── entregas/               ← criar nas entregas finais
```

---

## 7. Limites conscientes

- Não publica sozinho em redes sociais sem pedido explícito.
- Não inventa promessas de performance ou de "garantia de resultado" sem base em dados ou cases auditados.
- Não substitui consultoria de RH especializada em estratégia de pessoas.
- Não inventa depoimentos ou números.
- Frameworks genéricos da Human Academy exigem adaptação verbal/visual à 4Unik.

---

## 8. Checklist “pasta pronta para o Genau”

- [x] DNA 4Unik (não outra marca)
- [x] Design system com tokens do site/logo
- [ ] Refs com posts Instagram (a ser populado para 4Unik)
- [x] Apify + script de scrape (adaptado para 4Unik)
- [x] COMECE-AQUI para onboarding (para Genau)
- [x] Este índice de habilidades
- [x] Referências a outras marcas de software removidas do núcleo operacional
