#!/bin/bash
# Weekly SEO/AEO loop — invokes the seo-improver-loop skill headlessly via Claude Code.
# Scheduled by crontab: 0 9 * * 1 (Mondays 9am America/Sao_Paulo)
set -euo pipefail

# Força o uso do login claude.ai (assinatura) em vez de créditos de API
unset ANTHROPIC_API_KEY ANTHROPIC_AUTH_TOKEN

cd "$(dirname "$0")/.."

LOG_DIR="logs/seo-improver-loop"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/$(date +%Y-%m-%d).log"

CLAUDE_BIN="$(command -v claude || echo "$HOME/.local/share/dense/bin/claude")"

"$CLAUDE_BIN" -p "Rode a skill seo-improver-loop (skills/seo-improver-loop/SKILL.md) para o projeto 4unik landing. Siga o fluxo completo: medir (GA4/GSC), orquestrar via marketing-strategy-orchestrator, priorizar backlog, aplicar mudanças de baixo risco no Sanity, abrir PR para mudanças estruturais, e atualizar o relatório em docs/reviews/. Reporte um resumo do que foi feito ao final." \
  --allow-dangerously-skip-permissions \
  --dangerously-skip-permissions \
  >> "$LOG_FILE" 2>&1

echo "seo-improver-loop run finished at $(date)" >> "$LOG_FILE"
