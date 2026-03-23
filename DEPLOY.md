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

   Isso roda `next build` (export estático) e envia o conteúdo de `out/` para a branch **`gh-pages`**.

   O script usa a flag **`-t` (`--dotfiles`)** do `gh-pages` para incluir o arquivo **`.nojekyll`** na raiz do deploy. Sem isso, o GitHub Pages (Jekyll) **ignora pastas que começam com `_`**, e a pasta **`_next/`** (CSS/JS do Next) some — o site carrega sem estilo (CSS “quebrado”).

4. Aguarde 1–2 minutos e teste `https://yoooobe.github.io/landing/` (ou hard refresh).

**Nota:** não use as duas origens ao mesmo tempo de forma conflitante. Com **branch `gh-pages`**, não é necessário o workflow de Actions para publicar o site.

## Desenvolvimento local

Com `basePath` `/landing`, abra:

`http://localhost:3000/landing`
