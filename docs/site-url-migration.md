# URL canónica e migração SEO (domínio definitivo)

A URL pública provisória (ex.: GitHub Pages) está centralizada em **`NEXT_PUBLIC_SITE_URL`**, lida em build e derivada em:

- [`config/public-site.json`](../config/public-site.json) — **fallback** do repositório quando a variável não está definida (único sítio para alterar o default “em código”)
- [`src/lib/parsePublicSiteUrl.ts`](../src/lib/parsePublicSiteUrl.ts) — regra partilhada (origem, `basePath`, URL base)
- [`src/lib/publicSite.ts`](../src/lib/publicSite.ts) — `SITE_ORIGIN`, `BASE_PATH`, `SITE_URL`
- [`next.config.ts`](../next.config.ts) — `basePath` / `assetPrefix` iguais ao `BASE_PATH`
- [`src/lib/site.ts`](../src/lib/site.ts) — `pageAbsoluteUrl`, metadata, JSON-LD
- [`src/app/robots.ts`](../src/app/robots.ts) e [`src/app/sitemap.ts`](../src/app/sitemap.ts) — URLs absolutas via `pageAbsoluteUrl`
- [`scripts/generate-llms-txt.ts`](../scripts/generate-llms-txt.ts) — `public/llms.txt` (executado em `npm run build`)

**Fallback** se a variável não existir: o valor de `defaultSiteUrl` em `config/public-site.json` (hoje o equivalente a `https://yoooobe.github.io/landing`).

## Formato de `NEXT_PUBLIC_SITE_URL`

- Incluir **esquema** e, se aplicável, **path** do site (ex.: subpasta do repositório no Pages):
  - `https://yoooobe.github.io/landing`
  - `https://www.empresa.com` (site na raiz do host → `BASE_PATH` vazio)
  - `https://landing.empresa.com/app` (subpath customizado)

Sem variável: mantém-se o fallback acima.

## Checklist ao mudar para o domínio definitivo

1. **CI / ambiente de build**  
   Definir `NEXT_PUBLIC_SITE_URL` nos secrets de cada pipeline (GitHub Actions: secret opcional `NEXT_PUBLIC_SITE_URL`; Vercel; Cloud Build no GCP; etc.) com o valor **final** desejado para esse deploy. Se o secret estiver vazio, mantém-se o fallback GitHub Pages.

2. **Rebuild e deploy**  
   `npm run build` (já corre `generate:llms`) e publicar `out/` ou o artefacto equivalente.

3. **Validação rápida**  
   - Abrir `…/sitemap.xml`, `…/robots.txt`, `…/llms.txt` e confirmar URLs absolutas.  
   - Validar uma página com [Schema.org validator](https://validator.schema.org/) (JSON-LD).

4. **Sanity**  
   - **Presentation / preview**: `allowOrigins` em [`sanity.config.ts`](../sanity.config.ts) usa a **origem** de `NEXT_PUBLIC_SITE_URL`.  
   - **CORS (API)**: no projeto Sanity → API → CORS origins, incluir a(s) origem(ns) reais (ex.: `https://www.empresa.com`). Pode ser necessário manter a origem antiga temporariamente durante a transição.

5. **Search Console / Bing Webmaster**  
   Nova propriedade ou mudança de endereço; reenviar sitemap na URL nova.

6. **Redirects (301)**  
   Configurar **fora** do export estático, na infraestrutura:
   - Load balancer / URL map (GCP), regras no Vercel, Cloudflare, ou DNS conforme o caso.  
   - Redirecionar URL antiga → URL canónica para não duplicar SEO.

7. **Vários hosts em paralelo (Git + Vercel + GCP)**  
   Evitar três URLs “oficiais” sem redirects: escolher **uma** canónica; as outras devem 301 para ela ou servir o mesmo `NEXT_PUBLIC_SITE_URL` no build que corresponde ao domínio servido.

## Ficheiros HTML legacy na raiz do repo

Ficheiros como [`index.html`](../index.html) na raiz (fora do Next) podem conter URLs antigas. Tratá-los como **legado** ou atualizar OG/canon manualmente quando o domínio mudar — não são gerados pelo build.

- **Blog:** não existe pasta `blog/` estática na raiz; os links de navegação devem apontar para o export Next (ex.: `https://yoooobe.github.io/landing/blog/` enquanto o fallback do site for GitHub Pages). Se o domínio canónico mudar, atualizar esses `href` à mão ou alinhar com o valor final de `NEXT_PUBLIC_SITE_URL`.
- **Deploy:** a publicação destes HTML não passa pelo workflow [`deploy.yml`](../.github/workflows/deploy.yml); só o conteúdo de `out/` após `npm run build`.
