#!/usr/bin/env bash
# Publica a página institucional da Yoobe (sites/yoobe-co/) no projeto Vercel
# "landing", que responde por yoobe.co e www.yoobe.co.
#
# Atenção: a landing 4unik é outro projeto ("4unik-landing", domínio
# plataforma.4unik.com.br) — não misturar os deploys.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

SRC="${ROOT}/sites/yoobe-co"

if [[ ! -f "${SRC}/index.html" ]]; then
  echo "deploy-yoobe-co: ${SRC}/index.html não encontrado" >&2
  exit 1
fi

vercel deploy "${SRC}" --prod --yes --project landing

echo "==> Publicado. Verificar: https://www.yoobe.co/"
