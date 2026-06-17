# Proxy 4unik — redirects sem `/landing` e migração SEO

A landing exportada vive em `gh-pages` com `BASE_PATH=/landing`. O proxy em `plataforma.4unik.com.br` mapeia **`/landing/*`** → raiz da branch. Pedidos a **`/plataforma/...`** (sem prefixo) **nunca chegam** ao static export — devolvem 404 até a infra aplicar redirect.

## Regra desejada (301 permanente)

### `/landing` sem barra final

Pedidos a **`/landing`** (sem `/` no fim) não correspondem a `/landing/*` no proxy nem a `index.html` no gh-pages — GitHub Pages devolve `404.html` (redirect stub). Para GA4 Tag Coverage e SEO, aplicar **antes** do `proxy_pass`:

```nginx
location = /landing {
  return 301 https://$host/landing/;
}
```

Snippet completo: [`infra/plataforma-4unik-nginx-redirects.conf`](../infra/plataforma-4unik-nginx-redirects.conf). O export também embute gtag em `out/404.html` quando `NEXT_PUBLIC_GA_ID` está no build (`scripts/patch-studio-spa-fallback.mjs`).

**Aplicar no servidor (301 em vez de 404):**

```bash
# Com SSH ao host do proxy (nginx)
PLATAFORMA_PROXY_SSH=user@plataforma-host \
PLATAFORMA_NGINX_SNIPPET=/etc/nginx/snippets/plataforma-4unik-landing-redirects.conf \
npm run infra:apply-proxy-redirects

# Sem SSH — imprime o snippet e passos manuais
npm run infra:apply-proxy-redirects
```

- Exemplo de `server` block: [`infra/plataforma-4unik-nginx-server.example.conf`](../infra/plataforma-4unik-nginx-server.example.conf)
- Se a resposta tem `via: varnish` (sem nginx direto): [`infra/varnish-landing-trailing-slash.vcl`](../infra/varnish-landing-trailing-slash.vcl)
- Cloudflare: [`infra/cloudflare-redirect-landing-exact.md`](../infra/cloudflare-redirect-landing-exact.md)

```bash
curl -sI https://plataforma.4unik.com.br/landing | head -5
# Esperado após aplicar: HTTP/2 301 + location: https://plataforma.4unik.com.br/landing/
```

### Prefixar `/landing` em rotas conhecidas

**Sem fundir** páginas de gamificação:

| Pedido | Destino |
|--------|---------|
| `/plataforma/*` | `/landing/plataforma/*` |
| `/api-integracoes/*` | `/landing/api-integracoes/*` |
| `/inteligencia/*` | `/landing/inteligencia/*` |
| `/casos-de-uso/*` | `/landing/casos-de-uso/*` |
| `/blog/*` | `/landing/blog/*` |
| `/en/*` | `/landing/en/*` |
| `/gamificacao/` | `/landing/gamificacao/` (atalho legado; não substitui motor nem campanhas) |
| `/para-plataformas/*` | `/landing/para-plataformas/*` |
| `/educacao/*` | `/landing/educacao/*` |
| `/vendas/*` | `/landing/vendas/*` |
| `/comunidades/*` | `/landing/comunidades/*` |
| `/eventos/*` | `/landing/eventos/*` |
| `/pricing/*` | `/landing/pricing/*` |
| `/seguranca/*` | `/landing/seguranca/*` |
| `/workvivo/*` | `/landing/workvivo/*` (legado; preferir `/api-integracoes/workvivo/`) |
| `/infraestrutura-de-recompensas/*` | `/landing/infraestrutura-de-recompensas/*` |

**Landings de gamificação (destinos finais distintos):**

- Gamificação Corporativa (motor): `/landing/plataforma/motor-gamificacao/`
- Campanhas: `/landing/plataforma/campanhas-gamificacao/`

## Snippet nginx

Snippet pronto para copiar: [`infra/plataforma-4unik-nginx-redirects.conf`](../infra/plataforma-4unik-nginx-redirects.conf)

```nginx
# Antes do proxy_pass para gh-pages /landing/
location = /landing {
  return 301 https://$host/landing/;
}

location ~ ^/(plataforma|api-integracoes|inteligencia|casos-de-uso|blog|en|gamificacao|para-plataformas|educacao|vendas|comunidades|eventos|pricing|seguranca|workvivo|infraestrutura-de-recompensas)(/.*)?$ {
  return 301 https://$host/landing$request_uri;
}
```

## Cloudflare Redirect Rule (exemplo)

- **`/landing` sem barra:** ver [`infra/cloudflare-redirect-landing-exact.md`](../infra/cloudflare-redirect-landing-exact.md)
- **Prefixo `/plataforma`:** `(http.host eq "plataforma.4unik.com.br" and starts_with(http.request.uri.path, "/plataforma"))` → dynamic `/landing${http.request.uri.path}`

## Validação

```bash
npm run validate:landing-routes -- --smoke https://plataforma.4unik.com.br/landing

curl -sI "https://plataforma.4unik.com.br/plataforma/motor-gamificacao/" | head -5
# Esperado após proxy: HTTP/2 301
# Location: https://plataforma.4unik.com.br/landing/plataforma/motor-gamificacao/
```

### Estado da aplicação

| Data | Snippet repo | Produção |
|------|--------------|----------|
| 2026-06-17 | Atualizado (`infraestrutura-de-recompensas` incluído) | **Pendente** — aplicar via `PLATAFORMA_PROXY_SSH=… npm run infra:apply-proxy-redirects` |

Até aplicar no nginx, smoke reporta 404 nos paths sem `/landing` (comportamento esperado).

## Cache

Após publicar `gh-pages` novo, **invalidar cache** CDN/proxy se `Last-Modified` continuar antigo (ex. conteúdo de abril/2026).

## 301 `yoooobe.github.io` → 4unik

Opções (escolher uma com infra):

1. **Custom domain** no GitHub Pages → `plataforma.4unik.com.br`
2. **Redirect CDN** de `https://yoooobe.github.io/landing/*` → `https://plataforma.4unik.com.br/landing/*`
3. **Complemento no build:** `scripts/patch-studio-spa-fallback.mjs` redirecciona client-side quando `hostname === yoooobe.github.io` (não substitui 301 HTTP para crawlers)

### Search Console

1. Propriedade: `https://plataforma.4unik.com.br/`
2. Sitemap: `https://plataforma.4unik.com.br/landing/sitemap.xml`
3. **Change of address** desde `https://yoooobe.github.io/landing/` quando 301 estiver activo
4. Bing Webmaster: reenviar sitemap

Ver também [site-url-migration.md](site-url-migration.md) e [DEPLOY.md](../DEPLOY.md).
