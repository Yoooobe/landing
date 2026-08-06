# Ideia 05 — "Não é para trocar o seu sistema."

Pilar: Casos de sucesso / Integração · Funil: fundo (decisão) · Composição: 2026-08-06

Mata a objeção de implantação e conversa com o time técnico que valida a compra.

---

## Feed — post único

- 4:5 (1080×1350): `i5-integracao_feed45_post-unico.png` — formato principal
- 1:1 (1080×1080): `i5-integracao_feed11_post-unico.png` — alternativa de grade

## Feed — carrossel 4:5 (alternativa)

1. `i5-integracao_feed45_carrossel1-capa.png`
2. `i5-integracao_feed45_carrossel2-caminhos.png`
3. `i5-integracao_feed45_carrossel3-clientes.png`
4. `i5-integracao_feed45_carrossel4-cta.png`

O card 3 traz oito marcas do portfólio — Google, Microsoft, Itaú, Bradesco,
Mercado Livre, Magazine Luiza, Hapvida e Mercedes-Benz. Todas com case
publicado e link verificado em `4unik.com.br/portfolio/<slug>` (conferidos em
2026-08-06). Os nomes entram **em texto**, não em logo: não temos o arquivo
oficial de nenhuma dessas marcas e redesenhar marca de terceiro é
anti-pattern. A peça diz "marcas atendidas" — em nenhum momento atribui
resultado, número ou depoimento a elas.

### Legenda

> A pergunta que mais aparece na primeira reunião: "vamos ter que trocar de
> sistema?"
>
> Não. A 4Unik conecta na intranet, no HRIS ou nas plataformas de engajamento
> que a empresa já usa, via API e webhooks — e também opera sozinha pelo
> console, se for o caso.
>
> O colaborador continua entrando onde sempre entrou. O que muda é o que
> acontece depois: pontos creditados automaticamente, catálogo disponível e
> logística resolvida.
>
> Documentação e API para devs: plataforma.4unik.com.br
>
> #API #webhooks #integração #HRIS #intranet #tecnologiaparaRH

---

## Stories (1080×1920)

| Arquivo | Sticker |
|---|---|
| `i5-integracao_story_frame1-pergunta.png` | — |
| `i5-integracao_story_frame2-painel.png` | — |
| `i5-integracao_story_frame3-cta.png` | Link → `plataforma.4unik.com.br` ("Solicitar acesso à API") |

**Frame 2 usa print real**, não UI gerada por IA (`4unik-anti-patterns.md`).
A tela é `assets/screenshots/dashboard-geral.png`, baixada da própria landing
da plataforma (`/landing/plataforma/painel-gestor/`). Os números visíveis (13
pedidos, 225 usuários, 2.400 pontos) são **dados de demonstração da interface**
— por isso a peça diz "números ilustrativos" no corpo. Não legendar como
resultado de cliente.

---

## E-mail — fundo de funil (técnico e comercial)

- **Assunto**: Sua stack não precisa mudar.
- **Preheader**: API, webhooks e integração com intranet e HRIS.
- **Bloco 1 · hero**: `i5-integracao_email_hero.png` (1200×600)
- **Bloco 2 · três caminhos**: via API · via intranet/HRIS · via console 4Unik.
- **Bloco 3 · prova social**: duas camadas.
  - **Marcas** (pronto): mesma lista do card 3 do carrossel, em texto.
  - **Depoimento** (pendente): falta a frase, o nome e o cargo. Sem isso, o
    depoimento sai e o bloco fica só com as marcas.
- **Bloco 4 · CTA duplo**: "Agendar demonstração" → `calendly.com/4unik/30min`
  + "Documentação e API para devs →" → `plataforma.4unik.com.br`

---

## OG / blog

`i5-integracao_og.png` (1200×630)

---

## Pendências antes de publicar

- [x] **Faixa de clientes**: autorizada em 2026-08-06. Composta no card 3 do
      carrossel, com oito marcas do portfólio.
- [ ] **Depoimento do e-mail** (bloco 3): falta o texto, o nome e o cargo de
      quem assina. Autorização de uso de marca já concedida, mas depoimento é
      citação de pessoa — precisa da frase real. Enquanto não vier, o bloco 3
      sai do e-mail; não substituir por número genérico.

## Reel — 9:16 (1080×1920 · 19s)

`i5-integracao_reel.mp4` · capa `i5-integracao_reel-capa.png`

Cinco cenas: a objeção → os três caminhos (API, intranet/HRIS, console) → o
painel do gestor em print real → a faixa de oito marcas do portfólio → CTA.

**Legenda:** a mesma do post único.

**Trilha:** biblioteca do Instagram no momento do post.

---

## Checklist de publicação

- [ ] Nenhum número de resultado inventado.
- [ ] Nenhuma UI de plataforma gerada por IA.
- [ ] Handle `@4unikoficial` na brand bar.
- [ ] Um CTA por frame.
