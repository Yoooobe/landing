# Deploy da landing (GitHub Pages)

## O commit funciona; o que pode falhar é o GitHub Actions

Se o push para `main` **subiu** mas o site em `https://yoooobe.github.io/landing/` **não atualiza**, abra **Actions** no repositório. Se aparecer:

`The job was not started because your account is locked due to a billing issue.`

isso **não é problema de commit**: a organização/conta do GitHub precisa **regularizar cobrança** para os runners de Actions voltarem a rodar.

Enquanto isso, use o deploy **sem Actions**, abaixo.

## Opção A — GitHub Actions (quando a conta estiver ok)

1. **Settings → Pages → Build and deployment → Source:** **GitHub Actions** (workflow em `.github/workflows/deploy.yml`).
2. Push na `main` dispara o build; o artefato `out/` é publicado automaticamente.

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

4. Aguarde 1–2 minutos e teste `https://yoooobe.github.io/landing/` (ou hard refresh).

**Nota:** não use as duas origens ao mesmo tempo de forma conflitante. Com **branch `gh-pages`**, não é necessário o workflow de Actions para publicar o site.

## Desenvolvimento local

Com `basePath` `/landing`, abra:

`http://localhost:3000/landing`
