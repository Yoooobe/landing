#!/usr/bin/env node
/**
 * Compositor de criativos 4Unik — HTML → PNG via Playwright.
 *
 *   node compose.mjs <spec.json> [--out entregas/YYYY-MM-DD_slug]
 *
 * Aplica o design system de `dna/design-system/` e falha alto quando a copy
 * não cabe nos tamanhos mínimos do DNA em vez de encolher a tipografia.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DS = path.join(ROOT, 'dna/design-system');

// Mínimos do DNA, medidos em canvas de 1080px (peça social vertical, lida no
// feed do celular). Em peça horizontal a leitura é em tela e a referência passa
// a ser a menor dimensão — ver `scaleOf`.
const MIN = { headline: 64, body: 36, eyebrow: 30, cta: 34 };

const scaleOf = (fmt) =>
  (fmt.orient === 'h' ? Math.min(fmt.w, fmt.h) : fmt.w) / 1080;

// `safeBottom`: faixa que a UI do Instagram cobre no story (campo de resposta,
// botão de compartilhar). Nada de copy nem brand bar entra aí.
const FORMATS = {
  story:  { w: 1080, h: 1920, orient: 'v', imageRatio: 0.52, safeBottom: 250 },
  feed45: { w: 1080, h: 1350, orient: 'v', imageRatio: 0.55 },
  feed11: { w: 1080, h: 1080, orient: 'v', imageRatio: 0.50 },
  og:     { w: 1200, h: 630,  orient: 'h', imageRatio: 0.44 },
  email:  { w: 1200, h: 600,  orient: 'h', imageRatio: 0.44 },
};

const dataUri = (p, mime) =>
  `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`;

function fontFaces() {
  const css = fs.readFileSync(path.join(DS, 'fonts/plus-jakarta-sans.css'), 'utf8');
  return css.replace(/url\("([^"]+)"\)/g, (_, f) =>
    `url(${dataUri(path.join(DS, 'fonts', f), 'font/woff2')})`);
}

function buildHtml(piece, fmt, ctx) {
  const { w, h, orient, imageRatio, safeBottom = 0 } = fmt;
  const s = scaleOf(fmt);                   // fator de escala vs. canvas base
  const px = (n) => `${(n * s).toFixed(1)}px`;

  // `"screenshot"` = print real da plataforma. Entra contido numa moldura, sem
  // corte nem fade — recortar UI real mente sobre o produto. O anti-pattern
  // proíbe interface gerada por IA, então este caminho não passa por `image`.
  const shotSrc = piece.screenshot ?? null;
  const shot = shotSrc ? dataUri(path.resolve(ROOT, shotSrc), 'image/png') : null;
  // `"image": null` no spec = card puramente tipográfico (miolo de carrossel).
  const src = shot ? null : piece.image === null ? null : (piece.image ?? ctx.image);
  const img = src ? dataUri(path.resolve(ROOT, src), 'image/png') : null;
  const logo = dataUri(path.join(DS, 'logos/4unik-lockup-fundo-escuro.png'), 'image/png');
  const vertical = orient === 'v';

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<style>
${fontFaces()}
${fs.readFileSync(path.join(DS, 'colors_and_type.css'), 'utf8')}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${w}px;height:${h}px;overflow:hidden}
body{background:var(--brand-primary-dark);font-family:'Plus Jakarta Sans',system-ui,sans-serif;
  display:flex;flex-direction:column}
/* a brand bar fica fora do palco para atravessar a peça inteira também no
   formato horizontal, onde a imagem ocupa só uma coluna */
.stage{flex:1;min-height:0;position:relative;
  display:flex;flex-direction:${vertical ? 'column' : 'row-reverse'}}

/* No horizontal a foto é fundo inteiro, não coluna: recortar 44% da largura
   de uma 16:9 sobra o meio da cena — justo onde não há ninguém. */
.art{position:relative;flex:0 0 ${imageRatio * 100}%;overflow:hidden}
${vertical ? '' : `.art{position:absolute;inset:0;flex:none}
.copy{flex:0 0 ${Math.round((1 - imageRatio) * 100 + 14)}%}`}
/* as fotos 9:16 têm a pessoa no terço superior; centralizar o crop corta os
   rostos na borda de cima. 38% puxa o recorte para o alto e mantém o assunto. */
.art img{width:100%;height:100%;object-fit:cover;object-position:center 38%}
/* fade para o fundo escuro — sem costura dura entre imagem e tipografia */
.art::after{content:'';position:absolute;inset:0;background:linear-gradient(
  ${vertical
    ? '180deg, transparent 55%, rgba(11,10,20,.75) 82%, var(--brand-primary-dark) 100%'
    : '90deg, var(--brand-primary-dark) 22%, rgba(11,10,20,.92) 42%,'
      + ' rgba(11,10,20,.55) 62%, rgba(11,10,20,.12) 84%, transparent 100%'})}

/* print real: contido numa moldura, nunca cortado nem coberto por gradiente */
/* O teto vai na imagem, em px absoluto — max-height percentual não resolve
   dentro da figure (que não tem altura própria) e acabaria cortando o print.
   Print vertical encolhe até caber; panorâmico segue com a largura inteira. */
.shot{flex:0 0 auto;display:flex;align-items:center;justify-content:center;
  padding:${px(56)} ${px(56)} 0}
.shot figure{display:flex;max-width:100%;border-radius:${px(20)};overflow:hidden;
  border:1px solid rgba(255,255,255,.14);
  box-shadow:0 ${px(24)} ${px(64)} rgba(0,0,0,.55)}
.shot img{display:block;max-width:100%;max-height:${Math.round(h * 0.44)}px;
  width:auto;height:auto}

/* min-height:0 é o que faz o flex item respeitar o container em vez de crescer —
   sem isso scrollHeight nunca passa clientHeight e o estouro passa batido. */
.copy{flex:1;min-height:0;overflow:hidden;
  display:flex;flex-direction:column;justify-content:${img ? 'flex-end' : 'center'};
  padding:${px(64)};gap:${px(24)};${img && vertical ? `margin-top:${px(-40)}` : ''};z-index:2}
/* sem isto os filhos encolhem e o texto some por dentro, sem acusar estouro */
.copy > *{flex:none}
/* card tipográfico: filete do gradiente da marca no topo, sem imagem */
.rule{width:${px(120)};height:${px(8)};border-radius:${px(8)};
  background:var(--gradient-brand);margin-bottom:${px(12)}}

.eyebrow{font-size:${px(MIN.eyebrow)};font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;color:var(--brand-accent-green)}
.headline{font-size:${px(MIN.headline)};font-weight:800;line-height:1.08;letter-spacing:-.02em;
  color:var(--brand-white);text-wrap:balance}
/* pontuação final solta em corpo display depois de letra redonda */
.headline .pt{margin-left:-.05em}
.body{font-size:${px(MIN.body)};font-weight:400;line-height:1.42;color:var(--brand-grey-muted)}
/* faixa de clientes: nome em texto, nunca logo de terceiro — não temos o
   arquivo oficial de nenhuma dessas marcas e redesenhar marca alheia é
   anti-pattern. Só entra marca com case publicado no portfólio. */
.brands{display:flex;flex-wrap:wrap;gap:${px(14)}}
.brands span{font-size:${px(MIN.body)};font-weight:700;color:var(--brand-white);
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.16);
  border-radius:${px(12)};padding:${px(12)} ${px(22)}}
.cta{align-self:flex-start;font-size:${px(MIN.cta)};font-weight:700;
  color:var(--brand-primary-dark);background:var(--brand-accent-green);
  padding:${px(18)} ${px(38)};border-radius:${px(100)};margin-top:${px(8)}}

.bar{display:flex;align-items:center;justify-content:space-between;
  padding:${px(28)} ${px(64)} ${px(28 + safeBottom)};
  border-top:1px solid rgba(255,255,255,.10);z-index:2}
.bar img{height:${px(38)};width:auto}
.bar span{font-size:${px(26)};font-weight:600;color:var(--brand-grey-muted);letter-spacing:.04em}
</style></head><body>
<div class="stage">
${img ? `<div class="art"><img src="${img}" alt=""></div>` : ''}
${shot ? `<div class="shot"><figure><img src="${shot}" alt=""></figure></div>` : ''}
  <div class="copy">
    ${img || shot ? '' : '<div class="rule"></div>'}
    ${piece.eyebrow ? `<div class="eyebrow">${piece.eyebrow}</div>` : ''}
    <div class="headline" id="hl">${piece.headline.replace(/([.?!…])/g, '<span class="pt">$1</span>')}</div>
    ${piece.body ? `<div class="body">${piece.body}</div>` : ''}
    ${piece.brands ? `<div class="brands">${piece.brands
      .map((b) => `<span>${b}</span>`).join('')}</div>` : ''}
    ${piece.cta ? `<div class="cta">${piece.cta}</div>` : ''}
  </div>
</div>
<div class="bar"><img src="${logo}" alt="4Unik"><span>${ctx.handle ?? '@4unikoficial'}</span></div>
</body></html>`;
}

/**
 * Auto-ajusta a headline entre um teto generoso e o mínimo do DNA.
 * Se nem no mínimo couber, devolve overflow — a copy é que precisa encurtar.
 */
async function fitHeadline(page, fmt) {
  const min = MIN.headline * scaleOf(fmt);
  return page.evaluate(({ min }) => {
    const hl = document.getElementById('hl');
    const copy = hl.closest('.copy');

    // scrollHeight não enxerga estouro para cima (justify-content:flex-end
    // empurra o topo para fora), então medimos os filhos contra o content-box.
    const fits = () => {
      const cs = getComputedStyle(copy);
      const box = copy.getBoundingClientRect();
      const top = box.top + parseFloat(cs.paddingTop);
      const bottom = box.bottom - parseFloat(cs.paddingBottom);
      return [...copy.children].every((el) => {
        const r = el.getBoundingClientRect();
        return r.top >= top - 0.5 && r.bottom <= bottom + 0.5;
      });
    };

    const max = min * 1.6;
    let lo = min, hi = max, best = min;
    for (let i = 0; i < 22; i++) {
      const mid = (lo + hi) / 2;
      hl.style.fontSize = mid + 'px';
      if (fits()) { best = mid; lo = mid; }
      else hi = mid;
    }
    hl.style.fontSize = best + 'px';
    return { size: Math.round(best), min: Math.round(min), overflow: !fits() };
  }, { min });
}

async function main() {
  const [specPath, ...rest] = process.argv.slice(2);
  if (!specPath) {
    console.error('uso: node compose.mjs <spec.json> [--out <dir>]');
    process.exit(1);
  }
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  const outFlag = rest.indexOf('--out');
  const date = new Date().toISOString().slice(0, 10);
  const outDir = path.resolve(ROOT, outFlag > -1
    ? rest[outFlag + 1]
    : `entregas/${date}_${spec.slug}`);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const problems = [];

  for (const piece of spec.pieces) {
    const fmt = FORMATS[piece.format];
    if (!fmt) throw new Error(`formato desconhecido: ${piece.format}`);

    const page = await browser.newPage({
      viewport: { width: fmt.w, height: fmt.h },
      deviceScaleFactor: 1,
    });
    await page.setContent(buildHtml(piece, fmt, spec), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);

    const fit = await fitHeadline(page, fmt);
    const name = `${spec.slug}_${piece.format}${piece.variant ? '_' + piece.variant : ''}.png`;
    await page.screenshot({ path: path.join(outDir, name) });
    await page.close();

    const flag = fit.overflow ? '  ⚠ ESTOUROU' : '';
    console.log(`  ${name.padEnd(46)} headline ${fit.size}px (mín ${fit.min})${flag}`);
    if (fit.overflow) problems.push({ name, ...fit });
  }

  await browser.close();
  console.log(`\n→ ${path.relative(ROOT, outDir)}`);

  if (problems.length) {
    console.log('\n⚠ Copy não cabe no tamanho mínimo do DNA — encurtar a headline:');
    for (const p of problems) console.log(`   ${p.name}`);
    process.exit(2);
  }
}

export { buildHtml, fitHeadline, FORMATS, dataUri, fontFaces, scaleOf, MIN, ROOT, DS };

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
