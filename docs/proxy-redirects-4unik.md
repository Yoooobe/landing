# Proxy 4unik — redirects sem `/landing` e migração SEO

A landing exportada vive em `gh-pages` com `BASE_PATH=/landing`. O proxy em `plataforma.4unik.com.br` mapeia **`/landing/*`** → raiz da branch. Pedidos a **`/plataforma/...`** (sem prefixo) **nunca chegam** ao static export — devolvem 404 até a infra aplicar redirect.

## Regra desejada (301 permanente)

Prefixar `/landing` em rotas conhecidas, **sem fundir** páginas de gamificação:

| Pedido | Destino |
|--------|---------|
| `/plataforma/*` | `/landing/plataforma/*` |
| `/api-integracoes/*` | `/landing/api-integracoes/*` |
| `/inteligencia/*` | `/landing/inteligencia/*` |
| `/casos-de-uso/*` | `/landing/casos-de-uso/*` |
| `/blog/*` | `/landing/blog/*` |
| `/en/*` | `/landing/en/*` |
| `/gamificacao/` | `/landing/gamificacao/` (atalho legado; não substitui motor nem campanhas) |

**Landings de gamificação (destinos finais distintos):**

- Gamificação Corporativa (motor): `/landing/plataforma/motor-gamificacao/`
- Campanhas: `/landing/plataforma/campanhas-gamificacao/`

## Snippet nginx

```nginx
# Antes do proxy_pass para gh-pages /landing/
location ~ ^/(plataforma|api-integracoes|inteligencia|casos-de-uso|blog|en|gamificacao)(/.*)?$ {
  return 301 https://$host/landing$request_uri;
}
```

## Cloudflare Redirect Rule (exemplo)

- **Expression:** `(http.host eq "plataforma.4unik.com.br" and starts_with(http.request.uri.path, "/plataforma"))`
- **Target:** dynamic — `/landing${http.request.uri.path}`

## Validação

```bash
npm run validate:landing-routes -- --smoke https://plataforma.4unik.com.br/landing

curl -sI "https://plataforma.4unik.com.br/plataforma/motor-gamificacao/" | head -5
# Esperado após proxy: HTTP/2 301
# Location: https://plataforma.4unik.com.br/landing/plataforma/motor-gamificacao/
```

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
