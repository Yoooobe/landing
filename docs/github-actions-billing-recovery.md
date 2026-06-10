# GitHub Actions — recuperação de billing (org Yoooobe)

Quando os workflows **Deploy to GitHub Pages** ou **CI validate** falham em ~3–5s com:

> *The job was not started because your account is locked due to a billing issue.*

o GitHub **não executa nenhum minuto de Actions** na conta/org associada. Isto **não** bloqueia o deploy manual para `gh-pages` (`npm run deploy:production`).

## Diagnóstico rápido

```bash
gh run list --repo Yoooobe/landing --limit 5
# Falha imediata (~3s) + annotation "billing issue" → billing lock
```

Repositório: org **Yoooobe** (plano **Free**, repo público `landing`).

## Quem pode corrigir

Precisas de **Organization owner** ou **Billing manager** em:

[https://github.com/organizations/Yoooobe/settings/billing](https://github.com/organizations/Yoooobe/settings/billing)

Conta CLI actual (`gh auth status`) pode não ter `admin:org` — só owners veem e alteram billing.

## Passos (org owner)

1. Abrir **Yoooobe → Settings → Billing and plans** (link acima).
2. Ver banner vermelho / alerta de conta bloqueada ou pagamento falhado.
3. **Payment information** — adicionar ou actualizar cartão válido (GitHub exige método de pagamento mesmo em plano Free para Actions em algumas contas/regiões).
4. **Pending invoices** — pagar facturas em atraso, se existirem.
5. **Spending limits** — Actions → confirmar que não há limite $0 ou budget esgotado.
6. Se a org usar **Enterprise** ou billing na conta pessoal do owner, verificar também [github.com/settings/billing](https://github.com/settings/billing) na conta que paga a org.
7. Após corrigir, aguardar **5–15 min** e re-disparar CI:

   ```bash
   gh workflow run "Deploy to GitHub Pages" --repo Yoooobe/landing
   gh workflow run "CI validate" --repo Yoooobe/landing
   ```

   Ou push vazio: `git commit --allow-empty -m "chore: trigger CI after billing fix" && git push`

## Verificar que voltou a funcionar

```bash
gh run watch --repo Yoooobe/landing
# Esperado: job "build" corre >30s (npm ci + next build), não falha aos 3s
```

## Enquanto Actions estiver bloqueado

| Tarefa | Alternativa |
|--------|-------------|
| Deploy produção | `npm run deploy:production` (build + push `gh-pages`) |
| Validar tipos/rotas | `npx tsc --noEmit && npm run validate:blog-ctas && npm run validate:landing-routes` |
| Pages online | Fonte **Deploy from branch `gh-pages`** — o workflow nativo `pages-build-deployment` pode continuar a correr quando há push na branch |

Ver também [github-pages-setup.md](github-pages-setup.md) e [AGENTS.md](../AGENTS.md).

## CLI com permissões de org admin

Para inspecionar billing via API (só com scope `admin:org`):

```bash
gh auth refresh -h github.com -s admin:org,read:org
gh api orgs/Yoooobe/settings/billing/actions
```

## Contacto GitHub Support

Se billing estiver correcto e o lock persistir >24h: [GitHub Support → Billing](https://support.github.com/request/billing) com org `Yoooobe` e exemplo de run ID (ex. `27311556606`).
