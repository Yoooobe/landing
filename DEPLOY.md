# Deploy da landing (GitHub Pages)

## ⚠️ Estado atual (jun/2026): site congelado — ação de admin necessária

Diagnóstico verificado:

- **GitHub Pages está em modo `GitHub Actions` (`build_type: workflow`)** — confirmado via `gh api repos/Yoooobe/landing/pages`.
- **O workflow de deploy falha em ~2s sem logs** (conta bloqueada por billing — ver secção abaixo). Último deploy bem-sucedido de Pages: **11/abr/2026**.
- **Resultado:** o site (`yoooobe.github.io/landing/` e o domínio `plataforma.4unik.com.br/landing/`) serve conteúdo de abril. **Pushes para a branch `gh-pages` são ignorados** porque o Pages não está em modo branch — por isso `npm run deploy:gh-pages` publica a branch mas o site não muda.

**Correção (escolher uma — ambas exigem permissões que o token `push` não tem):**

1. **Recomendado — admin do repo:** _Settings → Pages → Build and deployment → Source =_ **Deploy from a branch** → branch **`gh-pages`** / pasta **`/ (root)`**. Isto serve a branch `gh-pages` (já atualizada) diretamente, **sem depender de Actions/billing**. Via API (token com admin):

   ```bash
   gh api -X PUT repos/Yoooobe/landing/pages --input - <<'JSON'
   {"build_type":"legacy","source":{"branch":"gh-pages","path":"/"}}
   JSON
   ```

2. **Alternativa — owner/billing da org:** regularizar a cobrança do GitHub Actions e re-disparar o workflow `Deploy to GitHub Pages`.

A branch `gh-pages` já contém o build correto (inclui `plataforma/campanhas-gamificacao/`); após a opção 1, basta aguardar 1–2 min e correr o smoke test no fim deste doc.

## O commit funciona; o que pode falhar é o GitHub Actions

Se o push para `main` **subiu** mas o site em `https://yoooobe.github.io/landing/` **não atualiza**, abra **Actions** no repositório. Se aparecer:

`The job was not started because your account is locked due to a billing issue.`

isso **não é problema de commit**: a organização/conta do GitHub precisa **regularizar cobrança** para os runners de Actions voltarem a rodar.

Enquanto isso, use o deploy **sem Actions**, abaixo.

## Opção A — GitHub Actions (quando a conta estiver ok)

1. **Settings → Pages → Build and deployment → Source:** **GitHub Actions** (workflow em `.github/workflows/deploy.yml`).
2. Push na `main` dispara o build; o artefato `out/` é publicado automaticamente (inclui **`out/.nojekyll`** para o Jekyll não ignorar `_next/`).
3. **Opcional — Sanity:** após **publicar** conteúdo no CMS, podes disparar o mesmo deploy com um webhook (PAT + projeção GROQ) — ver [docs/sanity-github-webhook.md](docs/sanity-github-webhook.md).

## Opção B — Deploy pela branch `gh-pages` (não depende de Actions)

Útil quando Actions está bloqueado por billing ou indisponível.

1. **Settings → Pages → Source:** **Deploy from a branch** (não “GitHub Actions”).
2. **Branch:** `gh-pages`, pasta **`/ (root)`**, Save.
3. Na sua máquina, no repositório:

   ```bash
   npm install
   npm run deploy:gh-pages
   ```

   Isso executa `scripts/deploy-gh-pages.sh`: `next build` (export para `out/`), garante **`.nojekyll`** e publica **`out/`** na branch **`gh-pages`** via pacote `gh-pages` (flag **`-t`** = incluir dotfiles).

   Sem **`.nojekyll`**, o Jekyll do Pages **ignora pastas com `_`**, e **`_next/`** some — o site fica sem CSS/JS.

   **Alternativa só com Git** (sem depender do binário `gh-pages` no PATH, só `git`):

   ```bash
   bash scripts/deploy-gh-pages-git-only.sh
   ```

   **Atalho** (equivalente ao antigo): `npm run deploy:gh-pages:quick`

4. Aguarde 1–2 minutos e teste `https://plataforma.4unik.com.br/landing/` (ou hard refresh).

**Proxy / URLs sem `/landing`:** se `/plataforma/...` (sem prefixo) devolver 404, configure redirects na infra 4unik — ver [docs/proxy-redirects-4unik.md](docs/proxy-redirects-4unik.md).

**Validação local pós-build:**

```bash
npm run validate:landing-routes
npm run validate:landing-routes -- --smoke https://plataforma.4unik.com.br/landing
```

**Nota:** não use as duas origens ao mesmo tempo de forma conflitante. Com **branch `gh-pages`**, não é necessário o workflow de Actions para publicar o site.

## Desenvolvimento local

Com `basePath` `/landing`, abra:

`http://localhost:3000/landing`
