#!/usr/bin/env node
/**
 * Garante que o build do yoobe.co lê o dataset privado `yoobe` com token.
 * Falha se: dataset ≠ yoobe, sem siteSettings, sem blogPost EN (exceto --allow-empty-blog),
 * ou se leads/tracking forem legíveis sem token (o plano não permite dataset privado;
 * a proteção é o _id com ponto, ex. "leads.<uuid>").
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
const allowEmptyBlog = process.argv.includes("--allow-empty-blog");

function fail(msg) {
  console.error(`check-sanity-yoobe: ${msg}`);
  process.exit(1);
}

if (dataset !== "yoobe") fail(`NEXT_PUBLIC_SANITY_DATASET deve ser "yoobe" (atual: ${dataset || "vazio"})`);
if (!projectId) fail("NEXT_PUBLIC_SANITY_PROJECT_ID ausente");
if (!token) fail("SANITY_READ_TOKEN ausente (dataset privado)");

const base = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`;
const query = encodeURIComponent('{"settings":count(*[_type=="siteSettings"]),"posts":count(*[_type=="blogPost" && locale=="en" && !(_id in path("drafts.**"))])}');

const res = await fetch(`${base}?query=${query}`, { headers: { Authorization: `Bearer ${token}` } });
if (!res.ok) fail(`consulta com token falhou: HTTP ${res.status}`);
const { result } = await res.json();
if (!result.settings) fail("dataset yoobe sem siteSettings");
if (!result.posts && !allowEmptyBlog) fail("dataset yoobe sem blogPost EN publicado");

const anonQuery = encodeURIComponent('count(*[_type in ["leadSubmission","emailTrackingEvent"]])');
const anon = await fetch(`${base}?query=${anonQuery}`);
const anonBody = anon.ok ? await anon.json() : null;
if (anonBody && anonBody.result > 0) fail(`${anonBody.result} lead(s)/evento(s) legíveis sem token no dataset yoobe`);

console.log(`check-sanity-yoobe: OK (siteSettings=${result.settings}, posts EN=${result.posts})`);
