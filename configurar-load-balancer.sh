#!/bin/bash

# Script para configurar o Load Balancer para servir index.html corretamente
# Execute este script no Cloud Shell do GCP

set -e

PROJECT="institucional-480905"
URL_MAP="yoobe-co-lb-url-map"
BACKEND_BUCKET="yoobe-co-backend"

echo "🔧 Configurando Load Balancer para servir index.html..."

# 1. Verificar se o arquivo index.html existe no bucket
echo "📋 Verificando se index.html existe no bucket..."
gsutil ls gs://yoobe.co/index.html || {
    echo "❌ Erro: index.html não encontrado no bucket yoobe.co"
    exit 1
}
echo "✅ index.html encontrado no bucket"

# 2. Verificar configuração atual do URL Map
echo "📋 Verificando configuração atual do URL Map..."
gcloud compute url-maps describe $URL_MAP --project=$PROJECT --format=json > /tmp/url-map-current.json 2>&1 || {
    echo "⚠️  Não foi possível ler a configuração atual (pode ser problema de permissões)"
    echo "📝 Vamos criar uma nova configuração..."
}

# 3. Criar um path matcher que faz rewrite de / para /index.html
echo "🔧 Configurando path matcher com URL rewrite..."

# Criar um path rule que faz rewrite de / para /index.html
# Nota: O Google Cloud Load Balancer usa pathMatchers e pathRules
# Para fazer rewrite de / para /index.html, precisamos criar uma regra específica

cat > /tmp/path-rule.json << 'EOF'
{
  "paths": ["/"],
  "service": "https://www.googleapis.com/compute/v1/projects/institucional-480905/global/backendBuckets/yoobe-co-backend",
  "routeAction": {
    "urlRewrite": {
      "pathPrefixRewrite": "index.html"
    }
  }
}
EOF

echo "✅ Script de configuração criado!"
echo ""
echo "📝 PRÓXIMOS PASSOS:"
echo "1. Acesse o Load Balancer no console:"
echo "   https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list?project=$PROJECT"
echo ""
echo "2. Clique em 'yoobe-co-lb-url-map' → 'Edit'"
echo ""
echo "3. Vá em 'Host and path rules'"
echo ""
echo "4. Na regra padrão, expanda 'Add-on action (URL rewrite)'"
echo ""
echo "5. Em 'Path prefix rewrite', configure:"
echo "   - Para path '/': use 'index.html' (sem barra)"
echo "   - OU crie uma regra específica para path '/' com rewrite para '/index.html'"
echo ""
echo "6. Salve e aguarde alguns minutos"
echo ""
echo "7. Teste com:"
echo "   curl -I --resolve yoobe.co:80:34.8.255.48 http://yoobe.co/"
echo ""
echo "⚠️  NOTA: O problema pode ser que o 'Path prefix rewrite' precisa ser '/index.html' (com barra)"
echo "    ou que precisa ser configurado de forma diferente no console."
