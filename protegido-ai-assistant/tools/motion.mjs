#!/usr/bin/env node
/**
 * Compositor de vídeo 4Unik — HTML → MP4 via Playwright + ffmpeg.
 *
 *   node motion.mjs <spec.json> [--out entregas/YYYY-MM-DD_slug]
 *
 * Herda fontes, tokens e mínimos tipográficos de `compose.mjs`: o Reel sai do
 * mesmo design system das peças estáticas, não de um segundo sistema paralelo.
 *
 * A animação é determinística — nenhuma animação CSS, nenhum requestAnimationFrame.
 * `setFrame(f)` calcula o estado de cada elemento a partir do número do frame e
 * aplica inline. O mesmo frame sempre renderiza igual, então dá para reexportar,
 * revisar um frame isolado e comparar duas versões.
 */

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { dataUri, fontFaces, MIN, ROOT, DS } from './compose.mjs';

const FPS = 30;
const W = 1080;
const H = 1920;

// UI do Instagram cobre topo e rodapé do Reel. Nada de copy nem logo entra aí.
const SAFE_TOP = 140;
const SAFE_BOTTOM = 250;

// Duração das transições, em frames. ENTER e EXIT saem do overlap entre cenas:
// cenas vizinhas se cruzam por EXIT frames, então a troca nunca tem preto.
const ENTER = 14;
const EXIT = 12;
const STAGGER = 4; // atraso entre palavras da headline

const px = (n) => `${Math.round(n)}px`;

function buildHtml(spec) {
  const scenes = spec.scenes.map((sc) => ({
    ...sc,
    _img: sc.image ? dataUri(path.resolve(ROOT, sc.image), 'image/png') : null,
    _shot: sc.screenshot
      ? dataUri(path.resolve(ROOT, sc.screenshot), 'image/png')
      : null,
  }));

  const logo = dataUri(
    path.join(DS, 'logos/4unik-lockup-fundo-escuro.png'),
    'image/png',
  );

  const words = (s) =>
    s
      .split(' ')
      .map((w) => `<span class="w">${w}</span>`)
      .join(' ');

  const sceneHtml = (sc, i) => {
    const inner = [];

    if (sc._img) {
      inner.push(
        `<div class="art"><img src="${sc._img}" alt=""></div><div class="scrim"></div>`,
      );
    }

    const copy = [];
    if (sc.eyebrow) copy.push(`<div class="eyebrow el">${sc.eyebrow}</div>`);
    if (sc.headline)
      copy.push(`<div class="headline el">${words(sc.headline)}</div>`);
    if (sc._shot)
      copy.push(
        `<div class="shot el"><figure><img src="${sc._shot}" alt=""></figure></div>`,
      );
    if (sc.items)
      copy.push(
        `<div class="items">${sc.items
          .map((t) => `<span class="item">${t}</span>`)
          .join('')}</div>`,
      );
    if (sc.body) copy.push(`<div class="body el">${sc.body}</div>`);
    if (sc.cta) copy.push(`<div class="cta el">${sc.cta}</div>`);

    return `<section class="scene" style="z-index:${i + 1}">
  ${inner.join('')}
  <div class="copy">${copy.join('')}</div>
</section>`;
  };

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<style>
${fontFaces()}
${fs.readFileSync(path.join(DS, 'colors_and_type.css'), 'utf8')}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${px(W)};height:${px(H)};overflow:hidden}
body{background:var(--brand-primary-dark);
  font-family:'Plus Jakarta Sans',system-ui,sans-serif}

.scene{position:absolute;inset:0;display:flex;flex-direction:column;
  justify-content:flex-end;overflow:hidden;
  padding:${px(SAFE_TOP)} ${px(64)} ${px(SAFE_BOTTOM + 120)};
  will-change:transform,opacity,filter}

.art{position:absolute;inset:0}
.art img{width:100%;height:100%;object-fit:cover;will-change:transform}
/* o degradê garante a legibilidade da copy sobre a foto — sem ele a headline
   depende da sorte do frame da imagem */
.scrim{position:absolute;inset:0;
  background:linear-gradient(180deg,
    rgba(11,10,20,.06) 0%, rgba(11,10,20,.20) 38%,
    rgba(11,10,20,.72) 60%, rgba(11,10,20,.95) 76%,
    var(--brand-primary-dark) 100%)}

.copy{position:relative;display:flex;flex-direction:column;gap:${px(26)};z-index:2}

.eyebrow{font-size:${px(MIN.eyebrow)};font-weight:600;letter-spacing:.14em;
  text-transform:uppercase;color:var(--brand-accent-green)}
.headline{font-size:${px(102)};font-weight:800;line-height:1.06;
  letter-spacing:-.02em;color:var(--brand-white);text-wrap:balance}
.headline .w{display:inline-block;will-change:transform,opacity,filter}
.body{font-size:${px(MIN.body)};font-weight:500;line-height:1.4;
  color:var(--brand-grey-muted)}
.cta{align-self:flex-start;font-size:${px(MIN.cta)};font-weight:700;
  color:var(--brand-primary-dark);background:var(--brand-accent-green);
  border-radius:${px(999)};padding:${px(22)} ${px(44)}}

.items{display:flex;flex-wrap:wrap;gap:${px(14)}}
.item{font-size:${px(MIN.body)};font-weight:700;color:var(--brand-white);
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.16);
  border-radius:${px(12)};padding:${px(14)} ${px(26)};
  will-change:transform,opacity,filter}

/* print real da plataforma: moldura, nunca corte nem gradiente por cima */
.shot figure{display:flex;border-radius:${px(20)};overflow:hidden;
  border:1px solid rgba(255,255,255,.14);
  box-shadow:0 ${px(24)} ${px(64)} rgba(0,0,0,.55)}
/* teto absoluto: a cena alinha pelo rodapé e corta o excesso, então print
   vertical alto empurra o eyebrow para fora do topo e ele some no corte.
   38% da altura deixa folga para headline de tres linhas mais o body. */
.shot img{display:block;max-width:100%;max-height:${Math.round(H * 0.38)}px;
  width:auto;height:auto}

.bar{position:absolute;left:0;right:0;bottom:0;z-index:99;
  display:flex;align-items:center;justify-content:space-between;
  padding:${px(28)} ${px(64)} ${px(28 + SAFE_BOTTOM)};
  border-top:1px solid rgba(255,255,255,.10);
  background:var(--brand-primary-dark)}
.bar img{height:${px(38)};width:auto}
.bar span{font-size:${px(28)};font-weight:600;color:var(--brand-grey-muted)}
</style></head><body>
${scenes.map(sceneHtml).join('\n')}
<div class="bar"><img src="${logo}" alt="4Unik"><span>${
    spec.handle ?? '@4unikoficial'
  }</span></div>
<script>
const SCENES = ${JSON.stringify(
    spec.scenes.map((s) => ({ frames: s.frames, dir: s.dir ?? -1 })),
  )};
const ENTER = ${ENTER}, EXIT = ${EXIT}, STAGGER = ${STAGGER};

const cl = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
const outCubic = (t) => 1 - Math.pow(1 - t, 3);
const inCubic  = (t) => t * t * t;
const outQuint = (t) => 1 - Math.pow(1 - t, 5);
const outQuad  = (t) => 1 - Math.pow(1 - t, 2);

const els = [...document.querySelectorAll('.scene')];

window.setFrame = (f) => {
  els.forEach((el, i) => {
    const { frames: [a, b], dir } = SCENES[i];
    if (f < a || f > b) { el.style.display = 'none'; return; }
    el.style.display = 'flex';

    const local = f - a;
    const len = b - a;

    // Saída em quatro eixos ao mesmo tempo — opacidade, deslocamento, escala e
    // desfoque. Um só eixo lê como corte; os quatro leem como a cena se afastando.
    const tOut = cl((local - (len - EXIT)) / EXIT);
    const tIn = cl(local / ENTER);

    const eIn = outQuint(tIn);
    const eOut = inCubic(tOut);

    const y = (1 - eIn) * -dir * 70 + eOut * dir * 70;
    const sc = 0.985 + eIn * 0.015 - eOut * 0.04;
    const bl = (1 - eIn) * 10 + eOut * 14;

    // A opacidade sai numa curva mais rápida que o movimento: com a mesma
    // curva das duas, a cena velha continua quase opaca no meio da saída e o
    // cruzamento vira texto sobre texto. O deslocamento e o blur seguem em
    // inCubic — só o fade despenca cedo.
    el.style.opacity = String(eIn * (1 - outQuad(tOut)));
    el.style.transform = 'translateY(' + y + 'px) scale(' + sc + ')';
    el.style.filter = 'blur(' + bl.toFixed(2) + 'px)';

    // push-in contínuo: a imagem nunca fica parada enquanto a cena está no ar
    const art = el.querySelector('.art img');
    if (art) {
      const p = cl(local / Math.max(len, 1));
      art.style.transform = 'scale(' + (1.06 + p * 0.08).toFixed(4) + ')';
    }

    // headline palavra a palavra
    el.querySelectorAll('.headline .w').forEach((w, k) => {
      const t = cl((local - 6 - k * STAGGER) / 13);
      const e = outCubic(t);
      w.style.opacity = String(e);
      w.style.transform = 'translateY(' + ((1 - e) * 26).toFixed(2) + 'px)';
      w.style.filter = 'blur(' + ((1 - e) * 8).toFixed(2) + 'px)';
    });

    // cascata das tarefas: entram uma a uma, no ritmo de quem lista um problema
    el.querySelectorAll('.item').forEach((it, k) => {
      const t = cl((local - 30 - k * 7) / 12);
      const e = outCubic(t);
      it.style.opacity = String(e);
      it.style.transform =
        'translateY(' + ((1 - e) * 20).toFixed(2) + 'px) scale(' +
        (0.94 + e * 0.06).toFixed(3) + ')';
    });

    // demais elementos entram depois da headline, sem competir com ela
    el.querySelectorAll('.copy > .el:not(.headline)').forEach((x, k) => {
      const delay = x.classList.contains('eyebrow') ? 2 : 22 + k * 5;
      const t = cl((local - delay) / 14);
      const e = outCubic(t);
      x.style.opacity = String(e);
      x.style.transform = 'translateY(' + ((1 - e) * 18).toFixed(2) + 'px)';
    });
  });
};
window.setFrame(0);
</script></body></html>`;
}

async function main() {
  const specPath = process.argv[2];
  if (!specPath) {
    console.error('uso: node motion.mjs <spec.json> [--out <dir>]');
    process.exit(1);
  }
  const spec = JSON.parse(fs.readFileSync(path.resolve(specPath), 'utf8'));

  const flagIdx = process.argv.indexOf('--out');
  const outDir = path.resolve(
    ROOT,
    flagIdx > -1
      ? process.argv[flagIdx + 1]
      : `entregas/${new Date().toISOString().slice(0, 10)}_${spec.slug}`,
  );
  // `--out ../entregas/…` resolve para fora do projeto sem reclamar e some com
  // o arquivo. O caminho é sempre relativo à raiz do pacote, não ao cwd.
  if (!outDir.startsWith(ROOT + path.sep)) {
    console.error(`--out sai do pacote: ${outDir}\n(o caminho é relativo a ${ROOT})`);
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });

  const total = Math.max(...spec.scenes.map((s) => s.frames[1])) + 1;
  const outFile = path.join(outDir, `${spec.slug}_reel.mp4`);

  const html = buildHtml(spec);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
  });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  const ff = spawn(
    'ffmpeg',
    [
      '-y', '-loglevel', 'error',
      '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
      '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow',
      '-crf', '18', '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      outFile,
    ],
    { stdio: ['pipe', 'inherit', 'inherit'] },
  );

  const write = (buf) =>
    new Promise((res) => (ff.stdin.write(buf) ? res() : ff.stdin.once('drain', res)));

  const t0 = Date.now();
  for (let f = 0; f < total; f++) {
    await page.evaluate((n) => window.setFrame(n), f);
    await write(await page.screenshot({ type: 'png' }));
    if (f % 60 === 0) process.stdout.write(`  frame ${f}/${total}\r`);
  }

  // capa do Reel: frame com a headline inteira no ar, antes da saída da cena 1
  const coverFrame = spec.cover ?? Math.round(spec.scenes[0].frames[1] - EXIT - 6);
  await page.evaluate((n) => window.setFrame(n), coverFrame);
  await page.screenshot({ path: path.join(outDir, `${spec.slug}_reel-capa.png`) });

  ff.stdin.end();
  await new Promise((res, rej) =>
    ff.on('close', (c) => (c === 0 ? res() : rej(new Error(`ffmpeg saiu com ${c}`)))),
  );
  await browser.close();

  const secs = (total / FPS).toFixed(1);
  const kb = Math.round(fs.statSync(outFile).size / 1024);
  console.log(
    `\n${path.relative(ROOT, outFile)} · ${total} frames · ${secs}s · ${kb} KB` +
      ` · render ${((Date.now() - t0) / 1000).toFixed(0)}s`,
  );
  console.log(`${path.relative(ROOT, outDir)}/${spec.slug}_reel-capa.png (frame ${coverFrame})`);
  console.log('Vídeo sem áudio — a trilha entra na publicação, pela biblioteca licenciada do Instagram.');
}

export { buildHtml, FPS, W, H };

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
