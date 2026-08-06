import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const V2 = 'assets/generated_images/v2';
const v = (slug, id) => `${V2}/${slug}_${id}_${id === 'd' ? '16x9' : '9x16'}.png`;

// Índice da cena/peça → letra da imagem no brief. `null` mantém o print real.
const MAP = {
  static: {
    'i1-planilha':   ['a', 'b', 'a', null, 'c', 'a', 'b', 'c', 'd', 'd'],
    'i2-jornada':    ['b', 'a', null, 'b', 'c', 'a', 'b', 'a', 'c', 'd', 'd'],
    'i3-presente':   ['a', 'a', 'b', 'a', 'c', 'b', null, 'c', 'd', 'd'],
    'i4-auditoria':  ['a', 'b', 'c', 'a', 'b', 'c', 'd', 'd'],
    'i5-integracao': ['a', 'a', 'a', 'b', 'c', 'b', 'a', null, 'b', 'd', 'd'],
  },
  motion: {
    'i1-planilha':   ['a', 'b', null, 'c'],
    'i2-jornada':    ['b', 'a', null, 'b', 'c'],
    'i3-presente':   ['a', 'b', null, 'c'],
    'i4-auditoria':  ['a', 'b', 'a', 'c'],
    'i5-integracao': ['a', 'b', null, 'c', 'a'],
  },
};

let faltando = 0;
for (const [kind, bySlug] of Object.entries(MAP)) {
  for (const [slug, letters] of Object.entries(bySlug)) {
    const file = path.join(ROOT, 'entregas/specs', kind === 'motion' ? 'motion' : '', `${slug}.json`);
    const spec = JSON.parse(fs.readFileSync(file, 'utf8'));
    const list = kind === 'motion' ? spec.scenes : spec.pieces;
    if (list.length !== letters.length) throw new Error(`${kind}/${slug}: ${list.length} itens, mapa tem ${letters.length}`);

    delete spec.image; // sem herança: cada peça declara a sua imagem
    list.forEach((item, i) => {
      const letter = letters[i];
      if (letter === null) {
        delete item.image; // peça de print real
        return;
      }
      const rel = v(slug, letter);
      if (!fs.existsSync(path.join(ROOT, rel))) {
        console.error(`  ! ${kind}/${slug}[${i}] → ${rel} não existe`);
        faltando++;
      }
      item.image = rel;
    });

    fs.writeFileSync(file, JSON.stringify(spec, null, 2) + '\n');
    console.log(`✓ ${kind}/${slug} (${letters.filter(Boolean).length} imagens)`);
  }
}

if (faltando) {
  console.error(`\n${faltando} arquivo(s) faltando — rode tools/generate-images.mjs antes de compor.`);
  process.exit(1);
}
