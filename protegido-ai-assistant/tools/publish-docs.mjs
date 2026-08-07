import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'docs');

const CONCEITOS = [
  ['i1-planilha', 'Ideia 01', 'Reconhecimento em planilha não escala.'],
  ['i2-jornada', 'Ideia 02', 'Quatro passos. Nenhum deles é operacional.'],
  ['i3-presente', 'Ideia 03', 'Ponto que não vira presente é só número na tela.'],
  ['i4-auditoria', 'Ideia 04', 'Seu programa passaria numa auditoria?'],
  ['i5-integracao', 'Ideia 05', 'Não é para trocar o seu sistema.'],
];

const DOCS = [
  {
    grupo: 'campanha',
    slug: 'painel',
    file: 'entregas/CAMPANHAS-ADS.md',
    nome: 'Painel de campanhas',
    desc: 'Status de cada conceito, o que ainda falta e o passo a passo de cada post.',
  },
  {
    grupo: 'campanha',
    slug: 'calendario',
    file: 'entregas/CALENDARIO.md',
    nome: 'Calendário de publicação',
    desc: 'A ordem das cinco semanas, de 11/08 a 10/09, e por que ela segue o funil.',
  },
  {
    grupo: 'campanha',
    slug: 'entregas',
    file: 'entregas/README.md',
    nome: 'Como ler as entregas',
    desc: 'O que cada pasta contém e como os arquivos são nomeados.',
  },
  ...CONCEITOS.map(([slug, num, frase]) => ({
    grupo: 'legendas',
    slug: `legendas-${slug}`,
    file: `entregas/2026-08-06_${slug}/LEGENDAS.md`,
    nome: `${num} — ${frase}`,
    desc: 'Legenda pronta de cada peça, estrutura do e-mail e as regras que valem na hora de postar.',
    conceito: slug,
  })),
  {
    grupo: 'dna',
    slug: 'dna-estrategia',
    file: 'dna/4unik-dna.md',
    nome: '1 · DNA operacional',
    desc: 'Estratégia, persona, pilares de conteúdo e o que a plataforma faz.',
  },
  {
    grupo: 'dna',
    slug: 'dna-voz',
    file: 'dna/4unik-voice.md',
    nome: '2 · Voz e tom',
    desc: 'Como a marca escreve, o que ela nunca diz e a lista de anti-slop.',
  },
  {
    grupo: 'dna',
    slug: 'dna-visual',
    file: 'dna/4unik-visual.md',
    nome: '3 · Sistema visual',
    desc: 'Cores, tipografia, composição e os tamanhos mínimos de cada elemento.',
  },
  {
    grupo: 'dna',
    slug: 'dna-anti-patterns',
    file: 'dna/4unik-anti-patterns.md',
    nome: '4 · Anti-patterns',
    desc: 'O que nunca entra numa peça — e a auditoria que roda antes de publicar.',
  },
  {
    grupo: 'dna',
    slug: 'dna-refs',
    file: 'dna/4unik-refs.md',
    nome: '5 · Referências',
    desc: 'Sites oficiais, prints reais disponíveis, prova social e o que pode ser citado.',
  },
  {
    grupo: 'dna',
    slug: 'dna-prompts',
    file: 'dna/4unik-prompts.md',
    nome: '6 · Engine de prompts',
    desc: 'Como um prompt de imagem é montado, com o sufixo e a lista de negativos.',
  },
];

const GRUPOS = [
  {
    id: 'campanha',
    titulo: 'Campanha de agosto/2026',
    sub: 'O que rege a publicação. Editar aqui muda o que vai ao ar.',
  },
  {
    id: 'legendas',
    titulo: 'Legendas, peça a peça',
    sub: 'Um documento por conceito, com a legenda de cada formato e as regras do post.',
  },
  {
    id: 'dna',
    titulo: 'DNA da marca',
    sub: 'A ordem de leitura é obrigatória antes de qualquer criativo — de 1 a 6.',
  },
];

/* ---------------- markdown ---------------- */

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function inline(s) {
  let t = esc(s);
  // o código inline sai de cena antes das outras regras: o que está dentro de
  // crase não pode virar link, negrito nem itálico.
  const cofre = [];
  t = t.replace(/`([^`]+)`/g, (_, c) => `\u0000${cofre.push(`<code>${c}</code>`) - 1}\u0000`);
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  t = t.replace(/(^|[\s(])(https?:\/\/[^\s<)]+[^\s<).,;])/g, '$1<a href="$2">$2</a>');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^*\w])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  t = t.replace(/\u0000(\d+)\u0000/g, (_, i) => cofre[i]);
  return t;
}

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function md2html(src) {
  const linhas = src.split('\n');
  const out = [];
  const sumario = [];
  let i = 0;

  const ehBloco = (l) =>
    /^\s*$/.test(l) ||
    /^#{1,6}\s/.test(l) ||
    /^```/.test(l) ||
    /^\|/.test(l) ||
    /^>/.test(l) ||
    /^\s*([-*+]|\d+[.)])\s/.test(l) ||
    /^(-{3,}|_{3,})\s*$/.test(l);

  while (i < linhas.length) {
    const l = linhas[i];

    if (/^\s*$/.test(l)) {
      i++;
    } else if (/^```/.test(l)) {
      const lang = l.slice(3).trim();
      const corpo = [];
      i++;
      while (i < linhas.length && !/^```/.test(linhas[i])) corpo.push(linhas[i++]);
      i++;
      out.push(`<pre class="code"${lang ? ` data-lang="${esc(lang)}"` : ''}><code>${esc(corpo.join('\n'))}</code></pre>`);
    } else if (/^(#{1,6})\s+(.*)$/.test(l)) {
      const [, hashes, texto] = l.match(/^(#{1,6})\s+(.*)$/);
      const n = hashes.length;
      const id = slugify(texto);
      if (n === 2) sumario.push({ id, texto: texto.replace(/[*`]/g, '') });
      out.push(`<h${n} id="${id}">${inline(texto)}</h${n}>`);
      i++;
    } else if (/^(-{3,}|_{3,})\s*$/.test(l)) {
      out.push('<hr>');
      i++;
    } else if (/^\|/.test(l)) {
      const bloco = [];
      while (i < linhas.length && /^\|/.test(linhas[i])) bloco.push(linhas[i++]);
      const celulas = (r) =>
        r
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((c) => c.trim());
      const cab = celulas(bloco[0]);
      const corpo = bloco.slice(/^[|\s:-]+$/.test(bloco[1] ?? '') ? 2 : 1);
      out.push(
        `<div class="tw"><table><thead><tr>${cab.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>` +
          corpo
            .map((r) => `<tr>${celulas(r).map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
            .join('') +
          '</tbody></table></div>',
      );
    } else if (/^>/.test(l)) {
      const corpo = [];
      while (i < linhas.length && /^>/.test(linhas[i])) corpo.push(linhas[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote>${md2html(corpo.join('\n')).html}</blockquote>`);
    } else if (/^\s*([-*+]|\d+[.)])\s/.test(l)) {
      const itens = [];
      while (i < linhas.length && (/^\s*([-*+]|\d+[.)])\s/.test(linhas[i]) || /^\s{2,}\S/.test(linhas[i]))) {
        const m = linhas[i].match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);
        if (m) itens.push({ nivel: Math.floor(m[1].length / 2), ord: /\d/.test(m[2]), texto: m[3] });
        else if (itens.length) itens[itens.length - 1].texto += ' ' + linhas[i].trim();
        i++;
      }
      out.push(renderLista(itens, 0).html);
    } else {
      const p = [];
      while (i < linhas.length && !ehBloco(linhas[i])) p.push(linhas[i++]);
      out.push(`<p>${inline(p.join(' '))}</p>`);
    }
  }

  return { html: out.join('\n'), sumario };
}

function renderLista(itens, inicio) {
  const nivel = itens[inicio].nivel;
  const tag = itens[inicio].ord ? 'ol' : 'ul';
  const partes = [];
  let i = inicio;
  while (i < itens.length && itens[i].nivel >= nivel) {
    if (itens[i].nivel > nivel) {
      const filho = renderLista(itens, i);
      partes[partes.length - 1] = partes[partes.length - 1].replace(/<\/li>$/, filho.html + '</li>');
      i = filho.fim;
      continue;
    }
    const t = itens[i].texto;
    const chk = t.match(/^\[([ xX])\]\s*(.*)$/);
    partes.push(
      chk
        ? `<li class="task${chk[1] === ' ' ? '' : ' feito'}">${inline(chk[2])}</li>`
        : `<li>${inline(t)}</li>`,
    );
    i++;
  }
  return { html: `<${tag}>${partes.join('')}</${tag}>`, fim: i };
}

function frontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return { meta: {}, corpo: src };
  const meta = {};
  for (const linha of m[1].split('\n')) {
    const kv = linha.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return { meta, corpo: src.slice(m[0].length) };
}

/* ---------------- página ---------------- */

const CSS = `
:root{
  --bg:#F6F6F9;--panel:#FFFFFF;--ink:#14151C;--muted:#63656F;--line:#E3E3EA;
  --blue:#4B3FB0;--green:#00785A;--orange:#B35F07;
  --font:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;
  --mono:'JetBrains Mono',ui-monospace,SFMono-Regular,monospace;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:84px}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--font);
  line-height:1.65;-webkit-font-smoothing:antialiased}
.wrap{max-width:860px;margin:0 auto;padding:0 24px}
nav{position:sticky;top:0;z-index:20;background:rgba(246,246,249,.88);
  backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
nav .wrap{display:flex;align-items:center;gap:20px;height:60px}
nav a{color:var(--muted);text-decoration:none;font-size:13.5px;font-weight:500}
nav a:hover{color:var(--ink)}
nav .brand{font-weight:800;color:var(--ink);font-size:15px;margin-right:auto}
nav .brand .mark{color:var(--blue)}
header.doc{padding:44px 0 8px}
header.doc .kicker{font-family:var(--mono);font-size:11.5px;letter-spacing:.08em;
  text-transform:uppercase;color:var(--blue);font-weight:600}
header.doc h1{font-size:clamp(26px,4vw,38px);line-height:1.14;letter-spacing:-.02em;margin:10px 0 12px}
header.doc .desc{color:var(--muted);font-size:15.5px;max-width:60ch;margin:0}
.barra{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:22px 0 8px;
  padding:14px 16px;background:var(--panel);border:1px solid var(--line);border-radius:12px}
.barra .caminho{font-family:var(--mono);font-size:12px;color:var(--muted);margin-right:auto;
  word-break:break-all}
.btn{font-family:var(--font);font-size:12.5px;font-weight:600;cursor:pointer;
  padding:7px 13px;border-radius:8px;border:1px solid var(--line);
  background:#FAFAFC;color:var(--ink)}
.btn:hover{border-color:var(--blue);color:var(--blue)}
.btn.on{background:var(--blue);border-color:var(--blue);color:#fff}
.aviso{margin:0 0 26px;font-size:13px;color:var(--muted)}
main{padding:8px 0 60px}
main h2{font-size:23px;letter-spacing:-.01em;margin:38px 0 12px;padding-top:10px;
  border-top:1px solid var(--line)}
main h1{font-size:27px;margin:30px 0 12px}
main h3{font-size:17px;margin:26px 0 8px}
main h4{font-size:14.5px;margin:20px 0 6px;color:var(--muted);
  text-transform:uppercase;letter-spacing:.05em;font-family:var(--mono)}
main p{margin:0 0 14px}
main a{color:var(--blue);text-decoration:none;border-bottom:1px solid rgba(75,63,176,.3)}
main a:hover{border-bottom-color:var(--blue)}
main ul,main ol{margin:0 0 16px;padding-left:22px}
main li{margin:0 0 6px}
main li.task{list-style:none;position:relative;padding-left:26px}
main li.task::before{content:'';position:absolute;left:0;top:5px;width:15px;height:15px;
  border:1.5px solid var(--line);border-radius:4px;background:#fff}
main li.task.feito::before{content:'✓';background:var(--green);border-color:var(--green);
  color:#fff;font-size:11px;font-weight:700;line-height:15px;text-align:center}
main li.task.feito{color:var(--muted)}
main hr{border:0;border-top:1px solid var(--line);margin:26px 0}
main blockquote{margin:0 0 18px;padding:12px 16px;background:#FAFAFC;
  border-left:3px solid var(--blue);border-radius:0 10px 10px 0;color:var(--muted)}
main blockquote p{margin:0 0 6px}
main blockquote p:last-child{margin:0}
code{font-family:var(--mono);font-size:.88em;background:#F2F2F6;
  border:1px solid var(--line);border-radius:5px;padding:1px 5px;color:var(--blue)}
pre.code{background:#14151C;border-radius:12px;padding:16px;overflow-x:auto;margin:0 0 18px}
pre.code code{background:none;border:0;padding:0;color:#E4E6EC;font-size:12.5px;line-height:1.7}
.tw{overflow-x:auto;margin:0 0 20px;border:1px solid var(--line);border-radius:12px;
  background:var(--panel)}
table{border-collapse:collapse;width:100%;font-size:13.5px}
th,td{padding:10px 14px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}
th{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);
  background:#FAFAFC;font-weight:700;white-space:nowrap}
tbody tr:last-child td{border-bottom:0}
td code{color:var(--green)}
textarea{display:none;width:100%;min-height:70vh;margin:0 0 20px;padding:18px;
  font-family:var(--mono);font-size:12.5px;line-height:1.7;color:var(--ink);
  background:var(--panel);border:1px solid var(--line);border-radius:12px;resize:vertical}
body.fonte main>:not(textarea){display:none}
body.fonte textarea{display:block}
footer{border-top:1px solid var(--line);padding:26px 0 50px;color:var(--muted);font-size:13px}
footer a{color:var(--green);text-decoration:none;border-bottom:1px solid rgba(0,120,90,.3)}
@media(max-width:640px){.barra .caminho{width:100%;margin-bottom:6px}}
`;

const HEAD = (titulo, descricao) => `<!doctype html><html lang="pt-BR"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive,nosnippet">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${CSS}</style></head><body>`;

const NAV = (nivel) => {
  const raiz = nivel === 'index' ? '' : '';
  return `<nav><div class="wrap">
  <span class="brand"><span class="mark">4</span>Unik · documentos</span>
  <a href="index.html">Índice</a>
  <!-- caminhos do pacote; tools/publish-kit.py reescreve para index.html /
       contact-sheet.html ao copiar para public/campanha/ -->
  <a href="../4unik_kit_conteudo_ago2026.html">Kit</a>
  <a href="../entregas/CONTACT-SHEET.html">Peças</a>
</div></nav>${raiz}`;
};

/* ---------------- geração ---------------- */

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let gerados = 0;
for (const doc of DOCS) {
  const abs = path.join(ROOT, doc.file);
  if (!fs.existsSync(abs)) {
    console.error(`  ! ${doc.file} não existe`);
    continue;
  }
  const bruto = fs.readFileSync(abs, 'utf8');
  const { meta, corpo } = frontmatter(bruto);
  const { html } = md2html(corpo);
  const linhas = bruto.split('\n').length;
  const nomeArquivo = path.basename(doc.file);
  const grupo = GRUPOS.find((g) => g.id === doc.grupo);

  const pecas = doc.conceito
    ? `<a href="../contact-sheet.html#${doc.conceito}">ver as peças deste conceito</a> · `
    : '';

  const pagina = `${HEAD(`${doc.nome} · 4Unik`, doc.desc)}
${NAV()}
<div class="wrap">
<header class="doc">
  <span class="kicker">${esc(grupo.titulo)}</span>
  <h1>${esc(doc.nome)}</h1>
  <p class="desc">${esc(doc.desc)}</p>
  <div class="barra">
    <span class="caminho">${esc(doc.file)} · ${linhas} linhas${meta.updated ? ` · atualizado em ${esc(meta.updated)}` : ''}</span>
    <button class="btn" id="ver">Ver a fonte</button>
    <button class="btn" id="copiar">Copiar</button>
    <button class="btn" id="baixar">Baixar .md</button>
  </div>
  <p class="aviso">${pecas}O arquivo de verdade é <code>${esc(doc.file)}</code> no repositório. O que você digitar aqui serve para redigir e copiar — esta página não grava.</p>
</header>
<main>
${html}
<textarea id="fonte" spellcheck="false">${esc(bruto)}</textarea>
</main>
<footer>
  <a href="index.html">← todos os documentos</a> · <a href="../index.html">kit da campanha</a> · <a href="../contact-sheet.html">as 55 peças</a>
</footer>
</div>
<script>
(function(){
  var ver=document.getElementById('ver'),ta=document.getElementById('fonte');
  ver.onclick=function(){
    var on=document.body.classList.toggle('fonte');
    ver.classList.toggle('on',on);
    ver.textContent=on?'Ver formatado':'Ver a fonte';
  };
  document.getElementById('copiar').onclick=function(){
    var b=this;navigator.clipboard.writeText(ta.value).then(function(){
      b.textContent='Copiado';setTimeout(function(){b.textContent='Copiar'},1600);
    });
  };
  document.getElementById('baixar').onclick=function(){
    var a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([ta.value],{type:'text/markdown'}));
    a.download=${JSON.stringify(nomeArquivo)};a.click();URL.revokeObjectURL(a.href);
  };
})();
</script>
</body></html>`;

  fs.writeFileSync(path.join(OUT, `${doc.slug}.html`), pagina);
  doc.linhas = linhas;
  gerados++;
}

const cardsDe = (id) =>
  DOCS.filter((d) => d.grupo === id && d.linhas)
    .map(
      (d) => `<a class="card" href="${d.slug}.html">
    <b>${esc(d.nome)}</b>
    <span class="d">${esc(d.desc)}</span>
    <span class="f">${esc(d.file)} · ${d.linhas} linhas</span>
  </a>`,
    )
    .join('\n  ');

const indice = `${HEAD('Documentos da campanha e DNA · 4Unik', 'Os documentos que regem a campanha de agosto/2026 e o DNA da marca 4Unik.')}
${NAV('index')}
<div class="wrap">
<header class="doc">
  <span class="kicker">4Unik · agosto de 2026</span>
  <h1>Documentos</h1>
  <p class="desc">O que rege a campanha e o DNA que rege a marca. Cada página abre o
  arquivo formatado, com a fonte em markdown a um clique — para ler, revisar e copiar.</p>
</header>
<main>
${GRUPOS.map(
  (g) => `<section>
  <h2>${esc(g.titulo)}</h2>
  <p>${esc(g.sub)}</p>
  <div class="cards">
  ${cardsDe(g.id)}
  </div>
</section>`,
).join('\n')}
</main>
<footer>
  Gerado por <code>tools/publish-docs.mjs</code> a partir dos arquivos do repositório ·
  <a href="../index.html">kit da campanha</a> · <a href="../contact-sheet.html">as 55 peças</a>
</footer>
</div>
<style>
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;margin:16px 0 8px}
.card{display:flex;flex-direction:column;gap:6px;padding:16px 18px;background:var(--panel);
  border:1px solid var(--line);border-radius:12px;text-decoration:none;color:var(--ink)}
.card:hover{border-color:var(--blue);box-shadow:0 3px 14px rgba(75,63,176,.09)}
.card b{font-size:15px;line-height:1.3}
.card .d{font-size:13px;color:var(--muted);line-height:1.5}
.card .f{font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:auto;padding-top:4px}
main section h2:first-child{border-top:0;padding-top:0}
</style>
</body></html>`;

fs.writeFileSync(path.join(OUT, 'index.html'), indice);

const kb = (n) => (fs.statSync(path.join(OUT, n)).size / 1024).toFixed(0);
console.log(`→ docs/ · ${gerados} documentos + índice · ${kb('index.html')} KB no índice`);
