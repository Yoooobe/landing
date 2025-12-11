#!/bin/bash

# Script para configurar automaticamente o Load Balancer para yoobe.co
# Requer: gcloud CLI instalado e autenticado

set -e  # Parar em caso de erro

PROJECT_ID="institucional-480905"
BUCKET_NAME="yoobe.co"
BACKEND_BUCKET_NAME="yoobe-co-backend"
LOAD_BALANCER_NAME="yoobe-co-lb"
FRONTEND_NAME="yoobe-co-frontend"
IP_NAME="yoobe-co-ip"
CERT_NAME="yoobe-co-cert"
DOMAIN="yoobe.co"
WWW_DOMAIN="www.yoobe.co"

echo "🚀 Iniciando configuração automática do Load Balancer..."
echo ""

# Configurar projeto
echo "📋 Configurando projeto: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Verificar se o bucket existe
echo "🔍 Verificando se o bucket $BUCKET_NAME existe..."
if ! gsutil ls -b gs://$BUCKET_NAME/ &>/dev/null; then
    echo "❌ Bucket $BUCKET_NAME não encontrado!"
    echo "   Por favor, crie o bucket primeiro no console do Google Cloud."
    exit 1
fi
echo "✅ Bucket encontrado!"

# Criar Backend Bucket
echo ""
echo "🪣 Criando Backend Bucket: $BACKEND_BUCKET_NAME"
if gcloud beta compute backend-buckets describe $BACKEND_BUCKET_NAME --global &>/dev/null; then
    echo "⚠️  Backend Bucket já existe, pulando criação..."
else
    gcloud beta compute backend-buckets create $BACKEND_BUCKET_NAME \
        --gcs-bucket-name=$BUCKET_NAME \
        --enable-cdn \
        --global
    echo "✅ Backend Bucket criado!"
fi

# Reservar IP estático
echo ""
echo "🌐 Reservando IP estático: $IP_NAME"
if gcloud compute addresses describe $IP_NAME --global &>/dev/null; then
    echo "⚠️  IP já existe, obtendo endereço..."
    IP_ADDRESS=$(gcloud compute addresses describe $IP_NAME --global --format="value(address)")
    echo "✅ IP encontrado: $IP_ADDRESS"
else
    gcloud compute addresses create $IP_NAME \
        --global \
        --ip-version=IPV4
    IP_ADDRESS=$(gcloud compute addresses describe $IP_NAME --global --format="value(address)")
    echo "✅ IP criado: $IP_ADDRESS"
fi

echo ""
echo "📝 IMPORTANTE: Anote este IP para configurar o DNS: $IP_ADDRESS"
echo ""

# Criar certificado SSL
echo "🔒 Criando certificado SSL: $CERT_NAME"
if gcloud beta compute ssl-certificates describe $CERT_NAME --global &>/dev/null; then
    echo "⚠️  Certificado já existe, pulando criação..."
else
    gcloud beta compute ssl-certificates create $CERT_NAME \
        --domains=$DOMAIN,$WWW_DOMAIN \
        --global
    echo "✅ Certificado SSL criado!"
    echo "⚠️  NOTA: O certificado levará até 1 hora para ser provisionado após o DNS estar configurado."
fi

# Criar URL Map
echo ""
echo "🗺️  Criando URL Map..."
URL_MAP_NAME="$LOAD_BALANCER_NAME-url-map"
if gcloud compute url-maps describe $URL_MAP_NAME --global &>/dev/null; then
    echo "⚠️  URL Map já existe, pulando criação..."
else
    gcloud compute url-maps create $URL_MAP_NAME \
        --default-backend-bucket=$BACKEND_BUCKET_NAME \
        --global
    echo "✅ URL Map criado!"
fi

# Criar Target HTTPS Proxy
echo ""
echo "🎯 Criando Target HTTPS Proxy..."
HTTPS_PROXY_NAME="$LOAD_BALANCER_NAME-https-proxy"
if gcloud compute target-https-proxies describe $HTTPS_PROXY_NAME --global &>/dev/null; then
    echo "⚠️  Target HTTPS Proxy já existe, pulando criação..."
else
    gcloud compute target-https-proxies create $HTTPS_PROXY_NAME \
        --url-map=$URL_MAP_NAME \
        --ssl-certificates=$CERT_NAME \
        --global
    echo "✅ Target HTTPS Proxy criado!"
fi

# Criar Forwarding Rule
echo ""
echo "➡️  Criando Forwarding Rule..."
FORWARDING_RULE_NAME="$LOAD_BALANCER_NAME-forwarding-rule"
if gcloud compute forwarding-rules describe $FORWARDING_RULE_NAME --global &>/dev/null; then
    echo "⚠️  Forwarding Rule já existe, pulando criação..."
else
    gcloud compute forwarding-rules create $FORWARDING_RULE_NAME \
        --address=$IP_NAME \
        --global \
        --target-https-proxy=$HTTPS_PROXY_NAME \
        --ports=443
    echo "✅ Forwarding Rule criada!"
fi

# Resumo final
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ CONFIGURAÇÃO CONCLUÍDA!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📋 Resumo:"
echo "   • Backend Bucket: $BACKEND_BUCKET_NAME"
echo "   • Load Balancer: $LOAD_BALANCER_NAME"
echo "   • IP Address: $IP_ADDRESS"
echo "   • Certificado SSL: $CERT_NAME"
echo ""
echo "🌐 PRÓXIMOS PASSOS:"
echo ""
echo "1. Configure o DNS do domínio $DOMAIN:"
echo "   • Tipo: A"
echo "   • Valor: $IP_ADDRESS"
echo ""
echo "2. Aguarde a propagação do DNS (1-2 horas)"
echo ""
echo "3. O certificado SSL será provisionado automaticamente"
echo "   após o DNS estar configurado (pode levar até 1 hora)"
echo ""
echo "4. Após tudo propagar, acesse:"
echo "   • https://$DOMAIN"
echo "   • https://$WWW_DOMAIN"
echo ""
echo "═══════════════════════════════════════════════════════════"
