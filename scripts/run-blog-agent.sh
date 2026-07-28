#!/usr/bin/env bash
# Blog agent: gera 1 post (categoria em rotação), publica no Sanity e redeploya
# o site (posts são estáticos via generateStaticParams — exigem rebuild).
# Chave de LLM: OPENAI_API_KEY ou GEMINI_API_KEY em .env.local ou .env.blog-agent.
set -uo pipefail

LANDING_DIR="/Users/genautech/landing"
STATE_FILE="$LANDING_DIR/logs/.blog-agent-category-idx"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

cd "$LANDING_DIR"
mkdir -p logs

set -a
[ -f .env.local ] && . .env.local
[ -f .env.blog-agent ] && . .env.blog-agent
set +a

if [ -z "${OPENAI_API_KEY:-}" ] && [ -z "${GEMINI_API_KEY:-}" ] && [ -z "${GOOGLE_API_KEY:-}" ] && [ -z "${KIMI_API_KEY:-}" ]; then
  echo "[$(date '+%F %T')] ERRO: sem OPENAI_API_KEY/GEMINI_API_KEY/KIMI_API_KEY — defina em .env.blog-agent"
  exit 1
fi

CATEGORIES=("Engajamento" "Gamificação de Times" "Eventos & Brindes" "Crescimento" "Gestão de Pessoas" "Motivação & Reconhecimento")
IDX=$(cat "$STATE_FILE" 2>/dev/null || echo 0)
CAT="${CATEGORIES[$((IDX % ${#CATEGORIES[@]}))]}"
echo $(((IDX + 1) % ${#CATEGORIES[@]})) > "$STATE_FILE"

echo "[$(date '+%F %T')] Gerando post — categoria: $CAT"
if npx tsx scripts/generate-blog-posts.ts --count 1 --category "$CAT" --publish; then
  echo "[$(date '+%F %T')] Post publicado no Sanity; redeployando site"
  NEXT_PUBLIC_SITE_URL=https://plataforma.4unik.com.br/landing bash scripts/deploy-gh-pages.sh
  echo "[$(date '+%F %T')] Deploy concluído (exit $?)"
else
  echo "[$(date '+%F %T')] ERRO na geração do post (exit $?)"
  exit 1
fi
