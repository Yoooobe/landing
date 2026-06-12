#!/usr/bin/env bash
# Build de produção + push para gh-pages (sem GitHub Actions).
# Usar quando CI falha por billing ou para deploy imediato com env local.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

ENV_FILE="${ROOT}/.env.local"
if [[ -f "${ENV_FILE}" ]]; then
  echo "==> Carregando ${ENV_FILE}"
  set -a
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
  set +a
else
  echo "==> Aviso: ${ENV_FILE} não encontrado (npm run env:init)"
fi

export NEXT_PUBLIC_SITE_URL="https://plataforma.4unik.com.br/landing"
export NEXT_PUBLIC_SANITY_PROJECT_ID="${NEXT_PUBLIC_SANITY_PROJECT_ID:?Defina NEXT_PUBLIC_SANITY_PROJECT_ID em .env.local}"
export NEXT_PUBLIC_SANITY_DATASET="${NEXT_PUBLIC_SANITY_DATASET:-production}"
export NEXT_PUBLIC_SANITY_API_VERSION="${NEXT_PUBLIC_SANITY_API_VERSION:-2024-03-17}"

if [[ -z "${NEXT_PUBLIC_GA_ID:-}" || "${NEXT_PUBLIC_GA_ID}" == "G-XXXXXXXXXX" ]]; then
  echo "==> Aviso: NEXT_PUBLIC_GA_ID ausente ou placeholder — GA4 não será embutido no build."
fi

echo "==> Build produção (SITE_URL=${NEXT_PUBLIC_SITE_URL})"
npm run build

echo "==> Verificar GA4 inlined no export"
node scripts/verify-ga-build.mjs
node scripts/verify-ga-404-fallback.mjs
node scripts/verify-ga-pages.mjs

if [[ ! -f out/.nojekyll ]]; then
  touch out/.nojekyll
fi

echo "==> Publicando out/ → gh-pages"
npx gh-pages -d out -t -m "chore: production deploy ($(date -u +%Y-%m-%dT%H:%MZ))"

echo "==> Deploy concluído. Site: ${NEXT_PUBLIC_SITE_URL}/"
echo "    Se Actions estiver bloqueado: docs/github-actions-billing-recovery.md"
