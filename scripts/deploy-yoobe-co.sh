#!/usr/bin/env bash
# Publica o site Yoobe (Next) no projeto Vercel linkado em .vercel/project.json — hoje "yoobe-corporate" (corporate.yoobe.co).
# Sem flag: preview. Com --prod: produção.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ "${1:-}" == "--prod" ]]; then
  vercel deploy --prod --yes
  echo "==> Publicado. Verificar: https://corporate.yoobe.co/"
else
  vercel deploy --yes
fi
