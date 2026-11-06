#!/usr/bin/env bash
# Publica o export estático (out/) na Vercel com ficheiros em /landing/*
# para casar com NEXT_PUBLIC_SITE_URL …/landing. Requer `out/` já gerado
# (npm run deploy:production ou npm run build).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f "${ROOT}/out/index.html" ]]; then
  echo "deploy-vercel: out/index.html em falta — corre npm run build primeiro" >&2
  exit 1
fi

node scripts/stage-vercel-out.mjs
vercel deploy "${ROOT}/.vercel-out" --prod --yes --project landing --cwd "${ROOT}/.vercel-out"
