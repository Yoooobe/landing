# tools — 4Unik

## Apify (Instagram)

```bash
npm install
# APIFY_TOKEN em .env
node scrape-instagram.mjs 4unikoficial 30
```

Saída padrão: `../assets/instagram/<username>/`

O handle correto é `@4unikoficial`. `@4unik` não existe publicamente e o
scraper devolve `no_items`.

## compose.mjs — HTML → PNG

Compõe as peças finais a partir de um spec JSON: aplica o design system de
`../dna/design-system/`, tipografia, brand bar e área segura do story.

```bash
npx playwright install chromium   # só na primeira vez
node compose.mjs ../entregas/specs/i1-planilha.json
node compose.mjs ../entregas/specs/i1-planilha.json --out ../entregas/2026-08-06_teste
```

Saída padrão: `../entregas/<data>_<slug>/`.

Formatos: `story` (1080×1920, 250px inferiores reservados para a UI do
Instagram), `feed45` (1080×1350), `feed11` (1080×1080), `og` (1200×630),
`email` (1200×600).

O spec é `{ slug, image, handle?, pieces: [...] }`. Em cada peça:

| Campo | Efeito |
|---|---|
| `format` | um dos formatos acima |
| `variant` | sufixo do nome do arquivo |
| `image` | sobrescreve a master; `null` = card tipográfico, sem imagem |
| `screenshot` | print real da plataforma; entra contido numa moldura e desliga `image` |
| `brands` | lista de marcas do portfólio, renderizadas em texto — nunca logo de terceiro |
| `eyebrow`, `headline`, `body`, `cta` | copy; só `headline` é obrigatória |

A headline cresce por busca binária até o limite do container. Se não couber
nem no mínimo do DNA (64px em canvas 1080), o arquivo é marcado `⚠ ESTOUROU`
e o processo sai com código 2 — encurtar a copy, não reduzir a fonte.

`screenshot` existe porque o anti-pattern proíbe UI da 4Unik gerada por IA:
tela de produto sai de print real (inventário em `dna/4unik-refs.md` §5). O
print nunca é cortado nem coberto por gradiente — encolhe até caber, com teto
de 44% da altura da peça para não espremer a headline.

## motion.mjs — HTML → MP4 (Reel 9:16)

Herda de `compose.mjs` as fontes locais, os tokens do design system e os mínimos
tipográficos. O Reel e o carrossel do mesmo conceito saem com a mesma cara
porque saem do mesmo CSS.

```bash
node motion.mjs ../entregas/specs/motion/<slug>.json
```

Saída: `<slug>_reel.mp4` (1080×1920, 30 fps, H.264) e `<slug>_reel-capa.png`
na pasta do conceito. O caminho de `--out` é sempre relativo à raiz do pacote.

Spec: `{ slug, handle?, scenes: [...] }`. Cada cena declara a janela de frames
e o conteúdo:

| Campo | Papel |
|---|---|
| `frames` | `[início, fim]` em frames a 30 fps. Janelas que se sobrepõem cruzam |
| `dir` | `-1` ou `1` — o lado de onde a cena entra e para onde sai |
| `image` | master de fundo, com scrim e push-in contínuo |
| `screenshot` | print real da plataforma, contido numa moldura |
| `eyebrow` · `headline` · `body` · `cta` | mesmos campos do `compose.mjs` |
| `items` | lista que entra em cascata, um item a cada 7 frames |
| `brands` | marcas do portfólio em texto |

A animação não usa CSS animation: cada frame é calculado por `setFrame(f)` e
capturado. Rende igual em qualquer máquina e permite conferir um frame
específico sem renderizar o vídeo todo.

O vídeo sai **mudo** por decisão, não por limitação: trilha embutida no arquivo
não conta como áudio da biblioteca do Instagram e perde distribuição.

## zoom.mjs — inspeção

Recorta e amplia um pedaço de um PNG para conferir tipografia.

```bash
node zoom.mjs <arquivo.png> <x> <y> <w> <h> [zoom] [saida.png]
```
