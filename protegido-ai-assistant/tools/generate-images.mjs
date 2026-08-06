import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const exec = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'assets/generated_images/v2');
const brief = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/image-brief.json'), 'utf8'));

const only = process.argv.slice(2);

const jobs = [];
for (const [slug, cenas] of Object.entries(brief.conceitos)) {
  if (only.length && !only.includes(slug)) continue;
  for (const c of cenas) {
    jobs.push({
      file: path.join(OUT, `${slug}_${c.id}_${c.ar.replace(':', 'x')}.png`),
      ar: c.ar,
      prompt: `${c.cena} ${brief.sufixo}`,
    });
  }
}

fs.mkdirSync(OUT, { recursive: true });

// O plano free tem crédito contado; gerar em série evita estourar o saldo com
// jobs simultâneos que já foram cobrados quando o limite bate.
let ok = 0;
for (const j of jobs) {
  const name = path.basename(j.file);
  if (fs.existsSync(j.file)) {
    console.log(`· ${name} (já existe)`);
    ok++;
    continue;
  }
  try {
    const { stdout } = await exec(
      'higgsfield',
      ['generate', 'create', brief.model, '--aspect_ratio', j.ar, '--wait', '--wait-timeout', '10m', '--prompt', j.prompt],
      { maxBuffer: 1 << 24 },
    );
    const url = stdout.trim().split('\n').filter((l) => l.startsWith('http')).pop();
    if (!url) throw new Error(`sem URL:\n${stdout}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`download ${res.status}`);
    fs.writeFileSync(j.file, Buffer.from(await res.arrayBuffer()));
    console.log(`✓ ${name}`);
    ok++;
  } catch (e) {
    console.error(`✗ ${name} — ${e.message.split('\n')[0]}`);
  }
}

console.log(`\n${ok}/${jobs.length} em assets/generated_images/v2/`);
