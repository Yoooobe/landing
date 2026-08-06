import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'entregas', 'CONTACT-SHEET.html');
const THUMB = 420;

const dirs = fs
  .readdirSync(path.join(ROOT, 'entregas'))
  .filter((d) => d.startsWith('2026-') && fs.statSync(path.join(ROOT, 'entregas', d)).isDirectory())
  .sort();

const specOf = (slug, kind) => {
  const p =
    kind === 'motion'
      ? path.join(ROOT, 'entregas/specs/motion', `${slug}.json`)
      : path.join(ROOT, 'entregas/specs', `${slug}.json`);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null;
};

const browser = await chromium.launch();
const page = await browser.newPage();
const cards = [];

for (const dir of dirs) {
  const slug = dir.replace(/^\d{4}-\d{2}-\d{2}_/, '');
  const spec = specOf(slug, 'static');
  const motion = specOf(slug, 'motion');
  const shots = new Set(
    [...(spec?.pieces ?? []), ...(motion?.scenes ?? [])].filter((p) => p.screenshot).map((p) => p.name ?? ''),
  );
  const files = fs
    .readdirSync(path.join(ROOT, 'entregas', dir))
    .filter((f) => f.endsWith('.png'))
    .sort();

  const mp4 = fs.readdirSync(path.join(ROOT, 'entregas', dir)).find((f) => f.endsWith('.mp4'));
  cards.push({ header: slug, mp4 });

  for (const f of files) {
    const abs = path.join(ROOT, 'entregas', dir, f);
    const b64 = fs.readFileSync(abs).toString('base64');
    // reduzir no browser: sem dependência de imagemagick/sharp e o resultado
    // fica embutido no HTML, que assim abre sem servidor e sem pasta ao lado.
    const small = await page.evaluate(
      async ([src, max]) => {
        const img = new Image();
        img.src = src;
        await img.decode();
        const s = Math.min(max / img.width, 1);
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * s);
        c.height = Math.round(img.height * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        return c.toDataURL('image/jpeg', 0.82);
      },
      [`data:image/png;base64,${b64}`, THUMB],
    );
    const isCapa = f.includes('_reel-capa');
    const isShot = [...shots].some((n) => n && f.includes(n));
    cards.push({ dir, file: f, src: small, isCapa, isShot });
  }
}

await browser.close();

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>4Unik · contact sheet agosto/2026</title>
<style>
 *{margin:0;padding:0;box-sizing:border-box}
 body{background:#0B0A14;color:#fff;font:14px/1.5 system-ui,sans-serif;padding:32px}
 h1{font-size:24px;margin-bottom:4px}
 .sub{color:#8b8a99;margin-bottom:28px}
 h2{font-size:18px;margin:36px 0 4px;color:#00D294}
 h2 span{color:#8b8a99;font-weight:400;font-size:13px}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
   gap:18px;align-items:start}
 figure{background:#15141f;border-radius:12px;overflow:hidden;
   border:1px solid rgba(255,255,255,.08)}
 img{display:block;width:100%;height:auto}
 figcaption{padding:8px 10px;font-size:11px;color:#a9a8b8;word-break:break-all}
 .tag{display:inline-block;font-size:10px;font-weight:700;border-radius:6px;
   padding:2px 6px;margin-right:4px;vertical-align:middle}
 .shot{background:#00D294;color:#0B0A14}
 .capa{background:#6455D4;color:#fff}
</style></head><body>
<h1>Campanha agosto/2026 — 5 conceitos</h1>
<div class="sub">${cards.filter((c) => c.src).length} peças · imagens regeradas em ${new Date().toISOString().slice(0, 10)}</div>
${dirs
  .map((dir) => {
    const slug = dir.replace(/^\d{4}-\d{2}-\d{2}_/, '');
    const items = cards.filter((c) => c.dir === dir);
    const mp4 = cards.find((c) => c.header === slug)?.mp4;
    return `<h2>${slug} <span>${items.length} peças${mp4 ? ` · ${mp4}` : ''}</span></h2>
<div class="grid">${items
      .map(
        (c) => `<figure><img src="${c.src}" alt="${c.file}"><figcaption>${
          c.isCapa ? '<span class="tag capa">capa do Reel</span>' : ''
        }${c.isShot ? '<span class="tag shot">print real</span>' : ''}${c.file}</figcaption></figure>`,
      )
      .join('')}</div>`;
  })
  .join('\n')}
</body></html>`;

fs.writeFileSync(OUT, html);
console.log(`→ ${path.relative(ROOT, OUT)} · ${cards.filter((c) => c.src).length} peças · ${(html.length / 1e6).toFixed(1)} MB`);
