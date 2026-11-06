#!/usr/bin/env bash
# Publica o site Yoobe (out/ do Next) no projeto Vercel "landing" (yoobe.co, www.yoobe.co).
# Sem flag: preview. Com --prod: produção.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ "${1:-}" == "--prod" ]]; then
  vercel deploy --prod --yes
  echo "==> Publicado. Verificar: https://www.yoobe.co/"
else
  vercel deploy --yes
fi
