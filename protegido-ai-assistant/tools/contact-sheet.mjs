import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'entregas', 'CONTACT-SHEET.html');
const THUMB = 420;
const FPS = 30;

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

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

// Datas de publicação vêm do calendário para a página não repetir a informação
// num segundo lugar que possa divergir dele.
const agenda = {};
for (const line of fs.readFileSync(path.join(ROOT, 'entregas/CALENDARIO.md'), 'utf8').split('\n')) {
  const col = line.split('|').map((c) => c.trim());
  if (col.length < 6 || !/^\d$/.test(col[1])) continue;
  const slug = (col[4].match(/i\d-[a-z]+/) ?? [])[0];
  if (!slug) continue;
  (agenda[slug] ??= []).push({
    data: col[2],
    canal: col[3].replace(/\*\*/g, '').replace(/`/g, ''),
  });
}

const GRUPOS = [
  { id: 'feed', titulo: 'Feed do Instagram', formatos: ['feed45', 'feed11'] },
  { id: 'story', titulo: 'Stories', formatos: ['story'] },
  { id: 'email', titulo: 'E-mail', formatos: ['email'] },
  { id: 'og', titulo: 'LinkedIn e blog', formatos: ['og'] },
];

const DIMENSAO = {
  feed45: '1080×1350',
  feed11: '1080×1080',
  story: '1080×1920',
  email: '1200×600',
  og: '1200×630',
};

// "carrossel3-clientes" → "carrossel 3 · clientes"; "frame3-cta" → "frame 3 · CTA"
const rotulo = (variant) => {
  if (!variant) return '';
  return variant
    .split('-')
    .map((t) => t.replace(/^([a-z]+)(\d+)$/, '$1 $2').replace(/^cta$/, 'CTA').replace(/^unico$/, 'único'))
    .join(' · ');
};

const browser = await chromium.launch();
const page = await browser.newPage();

const thumb = async (abs) => {
  const b64 = fs.readFileSync(abs).toString('base64');
  // reduzir no browser: sem dependência de imagemagick/sharp e o resultado
  // fica embutido no HTML, que assim abre sem servidor e sem pasta ao lado.
  return page.evaluate(
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
};

const conceitos = [];
let totalEstaticas = 0;

for (const dir of dirs) {
  const slug = dir.replace(/^\d{4}-\d{2}-\d{2}_/, '');
  const spec = specOf(slug, 'static');
  const motion = specOf(slug, 'motion');
  const abs = (f) => path.join(ROOT, 'entregas', dir, f);
  const arquivos = fs.readdirSync(path.join(ROOT, 'entregas', dir));
  const mp4 = arquivos.find((f) => f.endsWith('.mp4'));

  const pecas = [];
  for (const p of spec?.pieces ?? []) {
    const file = `${slug}_${p.format}${p.variant ? '_' + p.variant : ''}.png`;
    if (!fs.existsSync(abs(file))) {
      console.error(`  ! ${dir}/${file} declarado no spec e ausente na pasta`);
      continue;
    }
    pecas.push({ ...p, file, src: await thumb(abs(file)) });
    totalEstaticas++;
  }

  const capaFile = arquivos.find((f) => f.endsWith('_reel-capa.png'));
  const capa = capaFile ? { file: capaFile, src: await thumb(abs(capaFile)) } : null;
  if (capa) totalEstaticas++;

  // Peças na pasta que nenhum spec reivindica: melhor aparecer do que sumir.
  const declarados = new Set([...pecas.map((p) => p.file), capaFile]);
  for (const f of arquivos.filter((f) => f.endsWith('.png') && !declarados.has(f)).sort()) {
    pecas.push({ format: 'extra', file: f, src: await thumb(abs(f)) });
    totalEstaticas++;
  }

  const cenas = (motion?.scenes ?? []).map((s, i) => ({
    n: i + 1,
    de: (s.frames?.[0] ?? 0) / FPS,
    ate: (s.frames?.[1] ?? 0) / FPS,
    eyebrow: s.eyebrow,
    headline: s.headline,
    items: s.items,
    screenshot: !!s.screenshot,
  }));

  conceitos.push({
    dir,
    slug,
    titulo: spec?.pieces?.[0]?.headline ?? slug,
    mp4,
    capa,
    cenas,
    pecas,
    agenda: agenda[slug] ?? [],
  });
}

await browser.close();

const copyBloco = (p) => `
      ${p.eyebrow ? `<div class="ey">${esc(p.eyebrow)}</div>` : ''}
      ${p.headline ? `<div class="hl">${esc(p.headline)}</div>` : ''}
      ${p.body ? `<p class="bd">${esc(p.body)}</p>` : ''}
      ${p.items?.length ? `<ul class="it">${p.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}
      ${p.brands?.length ? `<p class="bd">${p.brands.map(esc).join(' · ')}</p>` : ''}
      ${p.cta ? `<div class="ct">${esc(p.cta)}</div>` : ''}`;

const cardHtml = (c, p) => {
  const dim = DIMENSAO[p.format] ?? '';
  const tags = [
    p.file.endsWith('_reel-capa.png') ? '<span class="tag capa">capa do Reel</span>' : '',
    p.screenshot ? '<span class="tag shot">print real</span>' : '',
  ].join('');
  return `<figure>
    <a href="${c.dir}/${p.file}" target="_blank" rel="noopener"><img src="${p.src}" alt="${esc(p.file)}" loading="lazy"></a>
    <figcaption>
      <div class="dest">${tags}${esc(rotulo(p.variant) || (p.format === 'email' ? 'hero' : p.format === 'og' ? 'card de link' : 'peça'))}${dim ? ` <span class="dim">${dim}</span>` : ''}</div>
      ${copyBloco(p)}
      <code>${esc(p.file)}</code>
    </figcaption>
  </figure>`;
};

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>4Unik · peças de agosto/2026</title>
<style>
 *{margin:0;padding:0;box-sizing:border-box}
 body{background:#F6F6F9;color:#14151C;font:14px/1.5 system-ui,sans-serif;padding:32px 28px 72px}
 .wrap{max-width:1240px;margin:0 auto}
 h1{font-size:26px;letter-spacing:-.02em;margin-bottom:4px}
 .sub{color:#63656F;margin-bottom:10px}
 .back{display:inline-block;margin-bottom:8px;font-size:13px;font-weight:600;
   color:#4B3FB0;text-decoration:none;border-bottom:1px solid rgba(100,85,212,.3)}
 .conceito{margin-top:46px;padding-top:26px;border-top:1px solid #E3E3EA}
 h2{font-size:20px;letter-spacing:-.01em;margin-bottom:2px}
 h2 code{font:600 13px/1 ui-monospace,SFMono-Regular,monospace;color:#4B3FB0;
   background:#EFEDFB;border-radius:6px;padding:4px 7px;margin-right:8px;vertical-align:2px}
 .quando{color:#63656F;font-size:13px;margin:6px 0 4px}
 .quando b{color:#14151C}
 h3{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#63656F;
   margin:26px 0 12px;font-weight:700}
 .reel{display:flex;gap:20px;align-items:flex-start;padding:18px;max-width:760px;
   background:#fff;border:1px solid #E3E3EA;border-radius:16px}
 .reel video{width:230px;flex:none;border-radius:10px;background:#0B0A14;display:block}
 .reel .meta{font-size:13px;color:#63656F}
 .reel .meta b{display:block;color:#14151C;font-size:14.5px;margin-bottom:6px}
 .cenas{list-style:none;margin:10px 0 0;border-top:1px solid #E3E3EA}
 .cenas li{padding:8px 0;border-bottom:1px solid #E3E3EA;font-size:12.5px;color:#14151C}
 .cenas .t{display:inline-block;min-width:64px;color:#63656F;
   font:12px/1.5 ui-monospace,SFMono-Regular,monospace}
 .cenas .e{color:#4B3FB0;font-weight:600}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));
   gap:18px;align-items:start}
 figure{background:#fff;border-radius:14px;overflow:hidden;border:1px solid #E3E3EA;
   display:flex;flex-direction:column}
 figure a{display:block}
 img{display:block;width:100%;height:auto}
 figcaption{padding:12px 13px 14px;font-size:12.5px}
 .dest{font-weight:700;color:#14151C;margin-bottom:8px}
 .dim{font-weight:400;color:#63656F;font-size:11.5px}
 .ey{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:#4B3FB0;font-weight:700}
 .hl{font-size:14px;font-weight:600;line-height:1.35;margin:2px 0 4px}
 .bd{color:#4A4C57;margin-bottom:4px}
 .it{margin:0 0 6px 16px;color:#4A4C57}
 .ct{display:inline-block;background:#EFEDFB;color:#4B3FB0;font-weight:600;
   border-radius:6px;padding:3px 8px;margin:2px 0 6px}
 figcaption code{display:block;margin-top:8px;color:#8A8D99;word-break:break-all;
   font:11px/1.5 ui-monospace,SFMono-Regular,monospace}
 .tag{display:inline-block;font-size:10px;font-weight:700;border-radius:6px;
   padding:2px 6px;margin-right:6px;vertical-align:1px}
 .shot{background:#00785A;color:#fff}
 .capa{background:#6455D4;color:#fff}
 @media(max-width:620px){.reel{flex-direction:column}.reel video{width:100%}}
</style></head><body><div class="wrap">
<h1>Campanha agosto/2026 — 5 conceitos</h1>
<div class="sub">${totalEstaticas} peças estáticas e ${conceitos.filter((c) => c.mp4).length} Reels · cada arte com a copy que carrega e o lugar onde vai · clique para abrir em tamanho real</div>
<a class="back" href="../4unik_kit_conteudo_ago2026.html">← voltar ao kit</a>
${conceitos
  .map((c) => {
    const grupos = GRUPOS.map((g) => ({
      ...g,
      itens: c.pecas.filter((p) => g.formatos.includes(p.format)),
    })).filter((g) => g.itens.length);
    const extras = c.pecas.filter((p) => p.format === 'extra');

    return `<section class="conceito">
<h2><code>${c.slug}</code>${esc(c.titulo)}</h2>
<div class="quando">${c.agenda.map((a) => `<b>${esc(a.data)}</b> — ${esc(a.canal)}`).join(' · ') || 'sem data no calendário'}</div>
${
  c.mp4
    ? `<h3>Reel</h3>
<div class="reel">
  <video controls preload="none"${c.capa ? ` poster="${c.capa.src}"` : ''} src="${c.dir}/${c.mp4}"></video>
  <div class="meta"><b>Reel 1080×1920 · ${(Math.max(...c.cenas.map((s) => s.ate), 0)).toFixed(0)}s</b>
    Exporta mudo — a trilha entra na hora de postar, escolhida na biblioteca do Instagram.
    A capa está entre as peças abaixo.
    <ul class="cenas">${c.cenas
      .map(
        (s) => `<li><span class="t">${s.de.toFixed(1)}–${s.ate.toFixed(1)}s</span>
        <span class="e">${esc(s.eyebrow ?? '')}</span> ${esc(s.headline ?? '')}${
          s.items?.length ? ` <span class="dim">(${s.items.map(esc).join(', ')})</span>` : ''
        }${s.screenshot ? ' <span class="tag shot">print real</span>' : ''}</li>`,
      )
      .join('')}</ul>
  </div>
</div>`
    : ''
}
${grupos
  .map(
    (g) => `<h3>${g.titulo}</h3>
<div class="grid">${g.itens.map((p) => cardHtml(c, p)).join('')}</div>`,
  )
  .join('\n')}
${
  c.capa || extras.length
    ? `<h3>Capa do Reel${extras.length ? ' e avulsas' : ''}</h3>
<div class="grid">${[...(c.capa ? [c.capa] : []), ...extras].map((p) => cardHtml(c, p)).join('')}</div>`
    : ''
}
</section>`;
  })
  .join('\n')}
</div></body></html>`;

fs.writeFileSync(OUT, html);
console.log(
  `→ ${path.relative(ROOT, OUT)} · ${totalEstaticas} peças · ${conceitos.filter((c) => c.mp4).length} Reels · ${(html.length / 1e6).toFixed(1)} MB`,
);
