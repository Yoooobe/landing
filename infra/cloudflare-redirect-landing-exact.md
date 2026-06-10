# Cloudflare — redirect `/landing` → `/landing/` (alternativa ao nginx)

Use se `plataforma.4unik.com.br` passa por Cloudflare e não tens acesso ao nginx/Varnish.

## Redirect Rule (Single Redirect)

| Campo | Valor |
|-------|--------|
| **If** | `(http.host eq "plataforma.4unik.com.br" and http.request.uri.path eq "/landing")` |
| **Then** | Dynamic redirect |
| **Expression** | `concat("https://", http.host, "/landing/")` |
| **Status** | 301 |

## Validação

```bash
curl -sI https://plataforma.4unik.com.br/landing | head -5
# HTTP/2 301
# location: https://plataforma.4unik.com.br/landing/
```

Se a resposta continua `404` com `server: GitHub.com`, o tráfego não passa por Cloudflare — aplicar [`plataforma-4unik-nginx-redirects.conf`](plataforma-4unik-nginx-redirects.conf) no proxy Varnish/nginx (ver `scripts/apply-plataforma-nginx-redirects.sh`).
