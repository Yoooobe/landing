#!/usr/bin/env bash
# Deploy estático (pasta out/) para a branch gh-pages — não usa GitHub Actions.
# Pré-requisitos: Node, npm ci, git remote origin, permissão de push.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Build (next build → out/)"
npm run build

if [[ ! -f out/.nojekyll ]]; then
  echo "==> Criando out/.nojekyll (evita Jekyll ignorar _next/)"
  touch out/.nojekyll
fi

echo "==> Publicando out/ na branch gh-pages (inclui dotfiles: .nojekyll)"
npx gh-pages -d out -t -m "chore: deploy static export ($(date -u +%Y-%m-%dT%H:%MZ))"

echo "==> Feito. Em GitHub: Settings → Pages → Source = branch gh-pages, pasta / (root)."
echo "    Site: https://yoooobe.github.io/landing/ (pode levar 1–2 min)"
