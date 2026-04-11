# GitHub Pages — configurar para funcionar (Desktop, browser, CLI)

Não é possível configurar **faturação** ou **Pages → Source** a partir do GitHub Desktop: isso faz-se em **github.com** (ou API). O Desktop serve para **clonar, branches, commit, push e fetch**.

## 1. Faturação e GitHub Actions (bloqueio comum)

Se os workflows mostram *“account locked due to a billing issue”*:

- Conta pessoal: [github.com/settings/billing](https://github.com/settings/billing)
- Organização: **Settings → Billing** da org (precisas de permissão de admin)

Enquanto Actions estiver bloqueadas, o workflow **Deploy to GitHub Pages** (`.github/workflows/deploy.yml`) **não corre**. O deploy manual para a branch `gh-pages` (ver abaixo) **continua a funcionar** se tiveres push no repositório.

## 2. Escolher o que o GitHub Pages serve (obrigatório)

Em **uma** destas opções — o repositório só pode ter **uma** fonte ativa:

### Opção A — Branch `gh-pages` (recomendado se Actions estiver bloqueadas)

1. Abre o repositório no browser: `https://github.com/Yoooobe/landing`
2. **Settings** → **Pages** (menu esquerdo)
3. Em **Build and deployment** → **Source**:
   - Escolhe **Deploy from a branch**
   - Branch: **gh-pages**
   - Pasta: **/ (root)**
4. **Save**

O site passa a ser o conteúdo da branch `gh-pages` (gerada por `npm run deploy:gh-pages` ou `bash scripts/deploy-gh-pages.sh` após `npm run build`).

### Opção B — GitHub Actions

1. **Settings** → **Pages** → **Source**: **GitHub Actions**
2. Garante que a faturação permite correr workflows (passo 1)
3. Push a `main` ou *Run workflow* no separador **Actions**

O artefacto publicado vem da pasta `out/` gerada no CI, **não** da branch `gh-pages`.

**Nota:** Se tiveres **A** e **B** em conflito na cabeça: na UI só aparece **uma** fonte ativa. Para testar o deploy por script, usa **A** até Actions voltarem a estar disponíveis.

## 3. GitHub Desktop (o que podes fazer na app)

1. **Repository** → **Repository settings** ou verifica **Current branch** = `main` (para desenvolver) ou `gh-pages` (só para ver o que foi publicado — normalmente não editas à mão).
2. **Fetch origin** / **Pull** em `main` para ficar alinhado com o remoto.
3. Depois de commits locais: **Push origin** para enviar `main`.
4. A branch **gh-pages** aparece na lista de branches depois de um `fetch`; podes fazer checkout só para **inspeção** do que está online (o deploy automático costuma ser por script/CI, não por editar `gh-pages` no Desktop).

O Desktop **não** define Secrets, **não** muda a fonte do Pages e **não** resolve billing.

## 4. Ferramenta em linha de comandos: GitHub CLI (`gh`)

Útil para ver runs e, com permissões, gerir secrets:

```bash
# Ver se estás autenticado
gh auth status

# Listar workflows e últimos runs
gh workflow list
gh run list --workflow=deploy.yml --limit 5
```

Secrets (exemplo — substitui valores):

```bash
gh secret set NEXT_PUBLIC_SANITY_PROJECT_ID --body "teu-id-real" --repo Yoooobe/landing
```

Documentação dos secrets: [docs/cms.md](cms.md) e [AGENTS.md](../AGENTS.md).

## 5. Deploy manual do export estático (sem depender do workflow)

A partir da pasta do clone (com dependências instaladas):

```bash
NEXT_PUBLIC_SANITY_DATASET=production NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder npm run build
# ou, em alternativa, o script que faz build + push da pasta out/ para gh-pages:
bash scripts/deploy-gh-pages.sh
```

Requisitos: **git** com remote `origin` e permissão de push; **Node** com `npm ci` já executado.

## 6. Checklist rápido

- [ ] Billing / Actions desbloqueados **ou** Pages com source **branch gh-pages**
- [ ] Se usas Actions: secrets necessários em **Settings → Secrets and variables → Actions**
- [ ] Após mudar a fonte do Pages, espera 1–2 minutos e testa `https://yoooobe.github.io/landing/` e `…/llms.txt`
