# Entregas finais da 4Unik

Salvar em subpastas `YYYY-MM-DD_tipo/`. Cada pasta traz os PNGs e o MP4 prontos
para postar e um `LEGENDAS.md` com copy, ordem dos cards, stickers e estrutura
de e-mail.

Os specs que geram as peças estáticas ficam em `specs/` (compostos por
`tools/compose.mjs`); os dos Reels ficam em `specs/motion/` (`tools/motion.mjs`).

Campanha de agosto/2026 — cinco conceitos, um por pilar do DNA, cobrindo o
funil de topo a fundo.

| Pasta | Conceito | Funil | Peças |
|---|---|---|---|
| `2026-08-06_i1-planilha` | "Reconhecimento em planilha não escala." | topo · dor | carrossel 5, 3 stories, e-mail hero, OG, Reel 15s |
| `2026-08-06_i2-jornada` | "Quatro passos. Nenhum deles é operacional." | meio · educação | carrossel 5, 4 stories, e-mail hero, OG, Reel 17s |
| `2026-08-06_i3-presente` | "Ponto que não vira presente é só número na tela." | meio · desejo | post único 4:5 e 1:1, carrossel 3, 3 stories, e-mail hero, OG, Reel 14s |
| `2026-08-06_i4-auditoria` | "Seu programa passaria numa auditoria?" | fundo · objeção | carrossel 3, 3 stories, e-mail hero, OG, Reel 14s |
| `2026-08-06_i5-integracao` | "Não é para trocar o seu sistema." | fundo · decisão | post único 4:5 e 1:1, carrossel 4, 3 stories, e-mail hero, OG, Reel 19s |

55 PNGs (50 peças + 5 capas de Reel) e 5 MP4. Quatro peças estáticas e quatro
cenas de Reel mostram a interface da 4Unik, todas com **print real** da
plataforma (inventário em `dna/4unik-refs.md` §5) — nenhuma UI sai de modelo
de imagem.

Os Reels saem **mudos**: a trilha entra na hora do post, escolhida na biblioteca
do Instagram. Áudio embutido sem licença derruba alcance e o framework de motion
(`frameworks/Human Motion/`) proíbe locução.

`CALENDARIO.md` traz a ordem e as datas de publicação — um conceito por semana,
seguindo o funil. Revisão visual aprovada em 2026-08-06.

`CONTACT-SHEET.html` abre as 55 peças numa página só, agrupadas por conceito e
na ordem de upload, para revisão visual antes de postar. É um arquivo local
(miniaturas embutidas em base64) — abrir direto no navegador, não precisa de
servidor. Regerar não é automático: se a copy mudar, recompor os specs e gerar
o contact sheet de novo.

O kit previa um formato LinkedIn de 1200×627. O OG de 1200×630 cobre esse uso e
não vale gerar cinco arquivos por 3px de diferença — subir o `_og.png` no
LinkedIn.

Pendência que depende de autorização, não de composição: o depoimento do e-mail
de `i5-integracao` precisa de frase, nome e cargo liberados por escrito. A faixa
de clientes foi autorizada em 06/08 e já está composta. Detalhes no
`LEGENDAS.md` da pasta.

Para recompor depois de editar a copy:

```bash
cd tools
node compose.mjs ../entregas/specs/i1-planilha.json        # estáticas
node motion.mjs  ../entregas/specs/motion/i1-planilha.json # Reel
```
