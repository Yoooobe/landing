#!/usr/bin/env bash
# Alternativa sem pacote gh-pages: copia out/ para um worktree e dá push --force na gh-pages.
# Uso: bash scripts/deploy-gh-pages-git-only.sh
# Atenção: reescreve o histórico da branch remota gh-pages (deploy único).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Build"
npm run build
if [[ ! -f out/.nojekyll ]]; then
  touch out/.nojekyll
fi

WORK="$(mktemp -d)"
cleanup() { rm -rf "$WORK"; }
trap cleanup EXIT

echo "==> Copiando out/ → worktree temporário"
cp -a out/. "$WORK/"

cd "$WORK"
git init -q
git checkout -q --orphan gh-pages
git add -A
git -c user.email="deploy@local" -c user.name="Deploy" commit -q -m "chore: deploy static export ($(date -u +%Y-%m-%dT%H:%MZ))"

echo "==> Push para origin gh-pages (force)"
cd "$ROOT"
REMOTE="$(git remote get-url origin)"
git -C "$WORK" remote add origin "$REMOTE"
git -C "$WORK" push -f origin gh-pages

echo "==> OK. Verifique Pages em Settings e a URL do projeto."
