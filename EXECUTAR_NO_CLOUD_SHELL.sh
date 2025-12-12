#!/bin/bash

# Execute este script no Cloud Shell do GCP
# Ele configura o bucket para servir index.html automaticamente

set -e

BUCKET="yoobe.co"
PROJECT="institucional-480905"

echo "🔧 Configurando bucket $BUCKET como website estático..."

# 1. Verificar se o arquivo existe
echo "📋 Verificando se index.html existe..."
gsutil ls gs://$BUCKET/index.html || {
    echo "❌ Erro: index.html não encontrado no bucket $BUCKET"
    exit 1
}
echo "✅ index.html encontrado"

# 2. Configurar bucket como website estático
echo "🔧 Configurando website estático..."
gsutil web set -m index.html gs://$BUCKET

# 3. Verificar configuração
echo "📋 Verificando configuração..."
gsutil web get gs://$BUCKET

echo ""
echo "✅ Configuração concluída!"
echo ""
echo "📝 PRÓXIMOS PASSOS:"
echo "1. No Load Balancer, REMOVA o 'Path prefix rewrite' (deixe vazio)"
echo "2. Salve as mudanças"
echo "3. Invalide o cache do CDN: Load Balancer → Cache invalidation → /*"
echo "4. Aguarde alguns minutos"
echo "5. Teste: curl -I --resolve yoobe.co:80:34.8.255.48 http://yoobe.co/"
echo ""
echo "🎯 O bucket agora servirá index.html automaticamente para /"
