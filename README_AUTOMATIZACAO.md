# 🤖 Automação: Configurar Load Balancer Automaticamente

## 🚀 Script Automatizado

Criei um script bash que configura **TUDO automaticamente** usando a CLI do Google Cloud!

---

## 📋 Pré-requisitos

### **1. Instalar Google Cloud SDK**

Se ainda não tem instalado:

**macOS:**
```bash
brew install google-cloud-sdk
```

**Linux:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

**Windows:**
- Baixe e instale: https://cloud.google.com/sdk/docs/install

### **2. Autenticar**

```bash
gcloud auth login
```

### **3. Verificar Permissões**

Você precisa ter permissões de:
- **Compute Admin** ou **Owner** no projeto `institucional-480905`

---

## 🎯 Como Usar o Script

### **PASSO 1: Tornar o Script Executável**

```bash
cd /Users/genautech/landing
chmod +x setup-load-balancer.sh
```

### **PASSO 2: Executar o Script**

```bash
./setup-load-balancer.sh
```

### **PASSO 3: Aguardar Conclusão**

O script irá:
1. ✅ Verificar se o bucket existe
2. ✅ Criar Backend Bucket
3. ✅ Reservar IP estático
4. ✅ Criar certificado SSL
5. ✅ Criar URL Map
6. ✅ Criar Target HTTPS Proxy
7. ✅ Criar Forwarding Rule
8. ✅ Mostrar resumo com o IP para DNS

**Tempo estimado:** 2-5 minutos

---

## 📝 O Que o Script Faz

O script `setup-load-balancer.sh` automatiza:

1. **Backend Bucket:**
   - Nome: `yoobe-co-backend`
   - Bucket: `yoobe.co`
   - Cloud CDN: Habilitado

2. **IP Estático:**
   - Nome: `yoobe-co-ip`
   - Tipo: Global IPv4
   - **O IP será exibido no final!**

3. **Certificado SSL:**
   - Nome: `yoobe-co-cert`
   - Domínios: `yoobe.co` e `www.yoobe.co`
   - Tipo: Google-managed

4. **Load Balancer:**
   - Nome: `yoobe-co-lb`
   - Tipo: Global external Application Load Balancer
   - Protocol: HTTPS (porta 443)

---

## ⚠️ Importante

### **Antes de Executar:**

- ✅ Certifique-se de que o bucket `yoobe.co` existe e está público
- ✅ Certifique-se de que está autenticado: `gcloud auth login`
- ✅ Verifique o projeto: `gcloud config get-value project`

### **Após Executar:**

1. **Anote o IP exibido** - você precisará dele para DNS
2. **Configure o DNS** do domínio `yoobe.co`:
   - Tipo: A
   - Valor: O IP exibido pelo script
3. **Aguarde propagação:**
   - DNS: 1-2 horas
   - Certificado SSL: Até 1 hora após DNS propagar

---

## 🆘 Troubleshooting

### Erro: "Permission denied"

**Solução:**
```bash
# Verificar permissões
gcloud projects get-iam-policy institucional-480905

# Ou solicitar permissões ao administrador do projeto
```

### Erro: "Bucket not found"

**Solução:**
- Crie o bucket `yoobe.co` primeiro no console
- Ou ajuste o nome do bucket no script

### Erro: "Resource already exists"

**Solução:**
- O script detecta recursos existentes e pula a criação
- Isso é normal e seguro!

### Erro: "gcloud: command not found"

**Solução:**
- Instale o Google Cloud SDK (veja pré-requisitos acima)
- Ou use: `brew install google-cloud-sdk` (macOS)

---

## 🔍 Verificar Status

Após executar o script, verifique:

```bash
# Ver Backend Buckets
gcloud compute backend-buckets list

# Ver IPs reservados
gcloud compute addresses list --global

# Ver Certificados SSL
gcloud compute ssl-certificates list --global

# Ver Load Balancers
gcloud compute forwarding-rules list --global
```

---

## 📊 Comparação: Manual vs Automático

| Método | Tempo | Complexidade | Erros |
|--------|-------|--------------|-------|
| **Manual (Console)** | 30-60 min | Alta | Fácil errar |
| **Automático (Script)** | 2-5 min | Baixa | Praticamente zero |

---

## ✅ Vantagens do Script

- ✅ **Rápido:** 2-5 minutos vs 30-60 minutos
- ✅ **Sem erros:** Configuração consistente
- ✅ **Repetível:** Pode executar novamente se necessário
- ✅ **Idempotente:** Detecta recursos existentes e não duplica
- ✅ **Documentado:** Mostra exatamente o que foi criado

---

## 🎉 Pronto!

Execute o script e em poucos minutos tudo estará configurado!

```bash
cd /Users/genautech/landing
chmod +x setup-load-balancer.sh
./setup-load-balancer.sh
```

Depois é só configurar o DNS e aguardar! 🚀
