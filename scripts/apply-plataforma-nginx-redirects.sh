#!/usr/bin/env bash
# Copia infra/plataforma-4unik-nginx-redirects.conf ao servidor nginx e recarrega.
# Requer SSH com permissão de escrita em snippets nginx + nginx -t.
#
# Uso:
#   PLATAFORMA_PROXY_SSH=user@host \
#   PLATAFORMA_NGINX_SNIPPET=/etc/nginx/snippets/plataforma-4unik-landing-redirects.conf \
#   bash scripts/apply-plataforma-nginx-redirects.sh
#
# Dry-run (só imprime o que faria):
#   bash scripts/apply-plataforma-nginx-redirects.sh --dry-run
#
# Verificação local após aplicar:
#   curl -sI https://plataforma.4unik.com.br/landing | head -5
#   # Esperado: HTTP/2 301 + Location: .../landing/

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE="${ROOT}/infra/plataforma-4unik-nginx-redirects.conf"
DRY_RUN=false

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    -h|--help)
      sed -n '2,16p' "$0"
      exit 0
      ;;
  esac
done

if [[ ! -f "$SOURCE" ]]; then
  echo "apply-plataforma-nginx-redirects: ficheiro não encontrado: $SOURCE" >&2
  exit 1
fi

if ! grep -q 'location = /landing' "$SOURCE"; then
  echo "apply-plataforma-nginx-redirects: snippet sem location = /landing" >&2
  exit 1
fi

SSH_TARGET="${PLATAFORMA_PROXY_SSH:-}"
SNIPPET_PATH="${PLATAFORMA_NGINX_SNIPPET:-/etc/nginx/snippets/plataforma-4unik-landing-redirects.conf}"

if [[ -z "$SSH_TARGET" ]]; then
  echo "apply-plataforma-nginx-redirects: PLATAFORMA_PROXY_SSH não definido."
  echo ""
  echo "Passos manuais (nginx no host de plataforma.4unik.com.br):"
  echo "  1. Copiar conteúdo de infra/plataforma-4unik-nginx-redirects.conf"
  echo "  2. Incluir ANTES do location /landing/ no server block (ver infra/plataforma-4unik-nginx-server.example.conf)"
  echo "  3. nginx -t && systemctl reload nginx  (ou service nginx reload)"
  echo ""
  echo "Conteúdo a aplicar:"
  echo "---"
  cat "$SOURCE"
  echo "---"
  echo ""
  echo "Cloudflare (se não tiver nginx): ver infra/cloudflare-redirect-landing-exact.md"
  exit 1
fi

REMOTE_TMP="/tmp/plataforma-4unik-landing-redirects.conf"

if [[ "$DRY_RUN" == true ]]; then
  echo "[dry-run] scp $SOURCE → ${SSH_TARGET}:${SNIPPET_PATH}"
  echo "[dry-run] ssh ${SSH_TARGET} nginx -t && systemctl reload nginx"
  exit 0
fi

echo "==> Enviando snippet para ${SSH_TARGET}:${SNIPPET_PATH}"
scp "$SOURCE" "${SSH_TARGET}:${REMOTE_TMP}"
ssh "$SSH_TARGET" "sudo mkdir -p \"\$(dirname '${SNIPPET_PATH}')\" && sudo mv '${REMOTE_TMP}' '${SNIPPET_PATH}' && sudo nginx -t && sudo systemctl reload nginx"

echo "==> Feito. Verificar:"
echo "    curl -sI https://plataforma.4unik.com.br/landing | head -5"
