# 4UNIK — SISTEMA VISUAL

> Tokens e direção de arte para criativos. Extraído do site oficial
> (plataforma.4unik.com.br) e da identidade visual 4Unik.  
> Última atualização: 2026-08-05.

---

## 1. ESSÊNCIA VISUAL

**Moderna · tecnológica · eficiente · integrada · profissional · escalável.**  
Esquema de cores predominantemente escuro com elementos vibrantes em
azul/roxo (`--brand-secondary-blue`) e acentos de verde (`--brand-accent-green`)
ou laranja (`--brand-accent-orange`).

O logotipo com o número '4' estilizado e o texto 'Unik' sugere inovação,
conexão e multiplicidade de soluções. Use essa metáfora com intencionalidade.

---

## 2. CORES (canônicas)

### Brand

| Token | Hex | Uso |
|---|---|---|
| `--brand-primary-dark` | `#0B0A14` | Primária — Fundos, áreas escuras, void |
| `--brand-secondary-blue` | `#6455D4` | Acento principal da **Plataforma** — links, CTAs, destaques de UI |
| `--brand-accent-green` | `#00D294` | Sucesso, check, destaque secundário, elementos positivos |
| `--brand-accent-orange` | `#EC7C0E` | Alerta, destaque terciário, elementos de urgência |
| `--brand-white` | `#FFFFFF` | Texto principal em fundos escuros, elementos claros |
| `--brand-grey-muted` | `#9C9EA5` | Texto secundário em fundos escuros, meta informações |
| `--brand-dark-blue` | `#2D285B` | Variação mais escura do azul/roxo para gradientes e profundidade |

### Gradiente da marca (extraído do logo oficial, 2026-08-06)

O símbolo da 4Unik **não é azul** — é um gradiente diagonal quente. Cores medidas
pixel a pixel em `logos/4unik-simbolo.png`:

| Token | Hex | Posição no gradiente |
|---|---|---|
| `--brand-gradient-start` | `#FFEB00` | Amarelo — extremo superior direito |
| `--brand-gradient-end` | `#BC4319` | Laranja queimado — extremo inferior esquerdo |

```css
background: linear-gradient(225deg, #FFEB00 0%, #FFAF00 45%, #BC4319 100%);
```

**Divergência a respeitar, não a "corrigir":** o azul/roxo (`#6455D4`) é a
linguagem da **interface da Plataforma**; o gradiente quente é a **identidade da
marca** (logo, brindes, Instagram). Não recolorir o logo para azul, e não trocar
a UI da plataforma por laranja. Em peça que fala das duas frentes, o gradiente
entra no logo e o azul/roxo nos elementos de produto.

### Superfícies

| Token | Hex | Uso |
|---|---|---|
| `--surface-void` | `#0B0A14` | Hero dark / fundos profundos |
| `--surface-ink` | `#08090D` | Preto quase absoluto |
| `--surface-panel` | `#101116` | Cards em dark mode, painéis |
| `--surface-light` | `#F9FAFC` | Canvas claro, seções claras (se aplicável) |
| `--surface-soft` | `#F0F2F5` | Fundos suaves / seções claras secundárias |
| `--surface-white` | `#FFFFFF` | Cards claros (se aplicável) |

### Texto (em fundos claros, se houver)

| Token | Hex | Uso |
|---|---|---|
| `--text-primary-light` | `#191A1F` | Corpo em light mode |
| `--text-muted-light` | `#6F7178` | Secundário em light mode |

### Status

| Token | Hex |
|---|---|
| Perigo | `#EE0F1F` / `#FF6568` |
| Alerta | `#EC7C0E` / `#FCBB00` |
| Sucesso | `#00D294` |

### Gradientes oficiais

```
brand-gradient-blue-purple: linear-gradient(90deg, #6455D4 0%, #2D285B 100%)
brand-glow-blue: #6455D4 @ ~18% opacity (blur grande, ambient)
```

---

## 3. TIPOGRAFIA

**Display / UI:** `Plus Jakarta Sans`, `Inter` ou similar sans-serif moderna (Manter `Plus Jakarta Sans`)
**Fallback:** `system-ui, sans-serif`  
**Mono (raro):** `ui-monospace` — códigos, dados técnicos

### Escala mínima para criativos 1080px

| Papel | Mínimo |
|---|---|
| Headline | 64px |
| Body / subtítulo | 36px |
| Eyebrow | 30px |
| CTA | 34px |
| Brand mark | ≥ 160px largura, opacity 1.0 (garantir visibilidade) |

Nunca usar opacity &lt; 0.7 em texto legível.

---

## 4. LOGO

Diretório de logos: `dna/design-system/logos/` — assets reais baixados de
`4unik.com.br` em 2026-08-06.

| Arquivo | Dimensão | Quando usar |
|---|---|---|
| `4unik-simbolo.png` | 700×700, RGBA | Símbolo isolado. Avatar, selo, watermark, peça onde a marca já foi apresentada. Fundo transparente — funciona em claro e escuro. |
| `4unik-lockup-fundo-escuro.png` | 187×55 | Lockup com wordmark **branco**. Único a usar sobre `#0B0A14` e fundos escuros — é o caso padrão dos criativos. |
| `4unik-lockup-fundo-claro.png` | 121×35 | Lockup com wordmark **cinza**. Só sobre fundo claro. |

Os lockups são pequenos (187px e 121px de largura): **nunca ampliar acima do
tamanho nativo** em peça 1080px — vai serrilhar. Para brand bar em 1080, usar o
lockup em escala 1:1 ou o símbolo (700px) redimensionado para baixo.

### Regras
- Manter proporção e cores oficiais (`--brand-secondary-blue` e variações).
- Respeitar área de respiro.
- Em fundos escuros: manter alto contraste (branco ou cores claras da paleta).
- Não distorcer, não recolorir o símbolo fora da paleta oficial.

### Handle / menções
- Site Institucional: `4unik.com.br`
- Site Plataforma: `plataforma.4unik.com.br`
- Instagram: `@4unikoficial`

---

## 5. COMPOSIÇÃO DE CRIATIVOS

### Layouts preferidos
1. **Dark hero** — fundo `#0B0A14` + headline branca + acentos em azul/roxo ou verde.
2. **Infográfico de dados** — gráficos limpos, cores da paleta, fundo dark ou soft.
3. **Caso de sucesso** — imagem real da empresa/interface + overlay discreto + texto descritivo.
4. **Interface da plataforma** — screenshots limpas da UI, destaque de funcionalidades.

### Hierarquia
Eyebrow → Headline → Body (opcional) → CTA → brand bar

### Brand bar
Faixa inferior com logo 4Unik + URL ou @ — sempre legível, sem fade, alinhado ao DNA visual.

---

## 6. FOTOGRAFIA / IMAGEM

- Preferir cenários corporativos modernos, equipes engajadas, interfaces de
  software, gráficos de dados, tecnologia e conceitos abstratos de conexão.
- Evitar stock genérico de "aperto de mão" ou clichês corporativos vazios.
- Evitar visuais excessivamente informais ou infantis.
- IA-generated: só com direção clara do DNA 4Unik; sem texto inventado na imagem
  (texto tipográfico entra na composição Playwright).

---

## 7. MOTION (quando houver vídeo)

- Transições limpas e dinâmicas, fluidas e eficientes.
- Pacing adequado para comunicação B2B, sem ser lento ou agressivo.
- Accent bars com as cores da 4Unik em elementos de destaque.
- Tipografia grande, clara e legível no celular.
- Áudio: voz profissional, trilha sonora moderna e não intrusiva.

---

## 8. CHECKLIST VISUAL RÁPIDO

- [ ] Cores batem com tokens 4Unik (azul, verde, laranja, tons de cinza/dark).
- [ ] Logo 4Unik sem distorção, com as cores oficiais.
- [ ] Contraste AA em texto.
- [ ] Tamanhos mínimos de fonte respeitados.
- [ ] CTA visível e alinhado à paleta.
- [ ] Sem bordas brancas indesejadas no frame.
- [ ] Nada de referência a outras marcas de software/SaaS alheias.
