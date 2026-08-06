---
name: apify
description: >
  Web scraping and automation platform. Extrai dados de qualquer site,
  execute scrapers prontos (Actors) e automatize fluxos de trabalho web
  com milhares de ferramentas da Apify Store.
type: mcp
version: "1.1.0"
mcp:
  server_name: apify
  command: npx
  args: ["-y", "@apify/actors-mcp-server@latest"]
env:
  - APIFY_TOKEN
categories: [scraping, data, automation]
---

# Apify Web Scraper

## When to use

Use Apify when you need to extract data from websites, scrape social media profiles, run search engine queries, or automate web data collection workflows. Apify provides thousands of pre-built scrapers (called Actors) that handle common scraping tasks out of the box.

## Setup neste projeto

1. Token em `tools/.env`:
   ```
   APIFY_TOKEN=apify_api_...
   ```
2. Dependência: `apify-client` em `tools/` (`npm install`).
3. Script pronto: `tools/scrape-instagram.mjs`

## Instagram — posts + legendas (para 4Unik)

Actor oficial: **`apify/instagram-scraper`**

```bash
cd tools
node scrape-instagram.mjs 4unik 30
# node scrape-instagram.mjs <username> <limit> [outdir]
```

Input típico do Actor:
```json
{
  "directUrls": ["https://www.instagram.com/4unik/"],
  "resultsType": "posts",
  "resultsLimit": 30,
  "addParentData": true
}
```

Saída padrão: `4unik-ai-assistant/assets/instagram/<username>/`
- `YYYY-MM-DD_posts.json` — posts normalizados
- `YYYY-MM-DD_legendas.md` — legendas em markdown
- `YYYY-MM-DD_raw.json` — dataset bruto

### Dataset já coletado (será populado para 4Unik)

- `@4unikoficial` — 30 posts em `assets/instagram/4unikoficial/` (2026-08-06)

## Instructions

You have access to Apify tools for web scraping and data extraction.

### Key capabilities

- Use Apify Actors (pre-built scrapers) to extract data from websites
- Popular Actors: web-scraper, instagram-scraper, google-search-scraper, youtube-scraper, twitter-scraper, tiktok-scraper
- Each Actor has its own input schema -- check documentation before running

### Best practices

- Start with the simplest Actor that meets the need
- Use `resultsLimit` / `maxItems` to limit results and avoid excessive costs
- Check Actor pricing before running (some have per-result costs)
- Parse results and extract only the fields you need
- Prefer o script local `scrape-instagram.mjs` para Instagram de marcas deste projeto

## Available operations

- **Run Actor** -- Execute any Apify Actor with custom input parameters
- **Web Scraping** -- Extract structured data from any website
- **Social Media Scraping** -- Scrape profiles, posts, and engagement data from Instagram, YouTube, Twitter/X, TikTok
- **Search Scraping** -- Run Google, Bing, or other search engine queries and collect results
- **Data Export** -- Retrieve scraped datasets in JSON format
