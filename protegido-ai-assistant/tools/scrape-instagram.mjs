#!/usr/bin/env node
/**
 * scrape-instagram.mjs — roda apify/instagram-scraper e salva posts + legendas.
 *
 * Uso:
 *   APIFY_TOKEN=... node scrape-instagram.mjs [username] [limit]

 *
 * Lê APIFY_TOKEN de process.env ou de tools/.env
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ApifyClient } from 'apify-client';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvFile() {
  const envPath = join(__dirname, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const [, key, raw] = m;
    if (process.env[key]) continue;
    process.env[key] = raw.replace(/^['"]|['"]$/g, '');
  }
}

loadEnvFile();

const username = (process.argv[2] || '4unik').replace(/^@/, '');
const resultsLimit = Number(process.argv[3] || 30);
const outDir = process.argv[4]
  ? process.argv[4]
  : join(__dirname, '..', '4unik-ai-assistant', 'assets', 'instagram', username);

const token = process.env.APIFY_TOKEN;
if (!token) {
  console.error('[ERRO] Defina APIFY_TOKEN (env ou tools/.env)');
  process.exit(1);
}

const client = new ApifyClient({ token });

const input = {
  directUrls: [`https://www.instagram.com/${username}/`],
  resultsType: 'posts',
  resultsLimit,
  addParentData: true,
};

console.log(`Iniciando apify/instagram-scraper @${username} (limit=${resultsLimit})...`);
const run = await client.actor('apify/instagram-scraper').call(input, {
  waitSecs: 300,
});

console.log(`Run ID: ${run.id} | status: ${run.status}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();

mkdirSync(outDir, { recursive: true });

const stamp = new Date().toISOString().slice(0, 10);
const rawPath = join(outDir, `${stamp}_raw.json`);
const postsPath = join(outDir, `${stamp}_posts.json`);
const captionsPath = join(outDir, `${stamp}_legendas.md`);

const posts = items.map((item, i) => ({
  index: i + 1,
  id: item.id || item.shortCode || null,
  shortCode: item.shortCode || null,
  url: item.url || (item.shortCode ? `https://www.instagram.com/p/${item.shortCode}/` : null),
  type: item.type || item.productType || null,
  timestamp: item.timestamp || item.takenAtTimestamp || null,
  caption: item.caption || item.text || '',
  likesCount: item.likesCount ?? item.likes ?? null,
  commentsCount: item.commentsCount ?? item.comments ?? null,
  ownerUsername: item.ownerUsername || item.owner?.username || username,
  hashtags: item.hashtags || [],
  mentions: item.mentions || [],
  displayUrl: item.displayUrl || item.display_url || null,
}));

writeFileSync(rawPath, JSON.stringify(items, null, 2));
writeFileSync(postsPath, JSON.stringify({ username, scrapedAt: new Date().toISOString(), count: posts.length, posts }, null, 2));

const md = [
  `# Instagram @${username} — últimas ${posts.length} postagens`,
  '',
  `Scraped em: ${new Date().toISOString()}`,
  `Actor: apify/instagram-scraper`,
  '',
  '---',
  '',
  ...posts.flatMap((p) => [
    `## ${p.index}. ${p.shortCode || p.id || 'post'}`,
    '',
    `- URL: ${p.url || '—'}`,
    `- Data: ${p.timestamp || '—'}`,
    `- Tipo: ${p.type || '—'}`,
    `- Likes: ${p.likesCount ?? '—'} | Comentários: ${p.commentsCount ?? '—'}`,
    '',
    '### Legenda',
    '',
    p.caption ? p.caption : '_(sem legenda)_',
    '',
    '---',
    '',
  ]),
].join('\n');

writeFileSync(captionsPath, md);

console.log(`OK — ${posts.length} posts salvos em:`);
console.log(`  ${rawPath}`);
console.log(`  ${postsPath}`);
console.log(`  ${captionsPath}`);
