#!/bin/bash

# Script para fazer upload da logo para o bucket do GCP
# Execute este script no Cloud Shell ou localmente com gsutil instalado

set -e

BUCKET="yoobe.co"
PROJECT="institucional-480905"
LOGO_FILE="logo.png"

echo "📤 Fazendo upload da logo para o bucket..."

# Verificar se o arquivo existe
if [ ! -f "$LOGO_FILE" ]; then
    echo "❌ Erro: Arquivo $LOGO_FILE não encontrado!"
    exit 1
fi

# Fazer upload
echo "📤 Enviando $LOGO_FILE para gs://$BUCKET/..."
gsutil cp "$LOGO_FILE" gs://$BUCKET/

# Tornar público
echo "🔓 Tornando a logo pública..."
gsutil acl ch -u AllUsers:R gs://$BUCKET/$LOGO_FILE

# Verificar
echo "✅ Logo enviada com sucesso!"
echo ""
echo "🌐 Acesse: https://yoobe.co/logo.png"
echo "   ou: https://storage.googleapis.com/$BUCKET/$LOGO_FILE"
