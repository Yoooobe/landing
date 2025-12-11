# ⚖️ Como Configurar Load Balancer para yoobe.co

## 🎯 Objetivo

Configurar um Load Balancer HTTP(S) no Google Cloud Platform para servir o site estático do bucket `yoobe.co` através do domínio `https://yoobe.co` diretamente.

---

## 📋 Pré-requisitos

- ✅ Bucket `yoobe.co` criado e público
- ✅ Arquivo `index.html` no bucket
- ✅ Domínio `yoobe.co` registrado
- ✅ Acesso ao Google Cloud Console com permissões de "Network Admin" ou "Owner"

---

## 🚀 Passo a Passo Completo

### **PASSO 1: Criar Backend Bucket**

1. Acesse: https://console.cloud.google.com/net-services/load-balancing/backends/buckets?project=institucional-480905

2. **OU** siga este caminho:

   - Menu lateral (☰) → **"Network Services"** → **"Load Balancing"**
   - Clique em **"Backend services"** ou **"Backends"**
   - Clique em **"CREATE BACKEND BUCKET"**

3. Configure o Backend Bucket:
   - **Name:** `yoobe-co-backend`
   - **Bucket:** Selecione `yoobe.co` da lista
   - **Enable Cloud CDN:** Marque esta opção (recomendado para melhor performance)
   - Clique em **"CREATE"**

---

### **PASSO 2: Criar Load Balancer HTTP(S)**

1. Acesse: https://console.cloud.google.com/net-services/load-balancing/list?project=institucional-480905

2. Clique em **"CREATE LOAD BALANCER"**

3. Escolha o tipo:

   - Selecione **"HTTP(S) Load Balancing"** (primeira opção)
   - Clique em **"START CONFIGURATION"**

4. Escolha a opção:
   - Selecione **"From Internet to my VMs"** ou **"Internet facing"**
   - Clique em **"CONTINUE"**

---

### **PASSO 3: Configurar Frontend (HTTPS)**

1. Na seção **"Frontend configuration"**:

   **Basic configuration:**

   - **Name:** `yoobe-co-frontend`
   - **Protocol:** Selecione **"HTTPS"**
   - **IP version:** **"IPv4"**
   - **IP address:** Clique em **"CREATE IP ADDRESS"**
     - **Name:** `yoobe-co-ip`
     - **Type:** **"Global"**
     - Clique em **"RESERVE"**
   - **Port:** `443` (padrão para HTTPS)

2. **Certificate:**
   - Se você já tem um certificado SSL:
     - Selecione **"Create a new certificate"** ou **"Use an existing certificate"**
   - Se não tem, selecione **"Create a new certificate"**:
     - **Name:** `yoobe-co-cert`
     - **Create Google-managed certificate:** Marque esta opção
     - **Domain names:** Digite: `yoobe.co` e `www.yoobe.co` (se quiser suportar www)
     - Clique em **"CREATE"**

---

### **PASSO 4: Configurar Backend**

1. Na seção **"Backend configuration"**:

   - Clique em **"ADD BACKEND"** ou **"Backend services & backend buckets"**

   - Selecione **"Backend bucket"** (não "Backend service")

   - **Backend bucket:** Selecione `yoobe-co-backend` (criado no PASSO 1)

   - **Cloud CDN:** Já deve estar habilitado

   - Clique em **"DONE"**

---

### **PASSO 5: Configurar Routing Rules**

1. Na seção **"Host and path rules"**:

   - **Host:** Deixe em branco ou configure:

     - `yoobe.co`
     - `www.yoobe.co` (opcional)

   - **Path:** Deixe como `/` ou `/ *`

   - **Backends:** Selecione `yoobe-co-backend`

   - Clique em **"DONE"**

---

### **PASSO 6: Revisar e Criar**

1. Revise todas as configurações

2. Clique em **"CREATE"** ou **"CREATE LOAD BALANCER"**

3. Aguarde alguns minutos para o Load Balancer ser criado

---

### **PASSO 7: Configurar DNS**

Após criar o Load Balancer, você precisa apontar o DNS do domínio:

1. **Obter o IP do Load Balancer:**

   - No console do Load Balancer, copie o **"IP address"** (ex: `34.102.136.180`)

2. **Configurar DNS no seu provedor de domínio:**

   - Acesse o painel do seu registrador de domínio (onde você comprou `yoobe.co`)
   - Vá para as configurações de DNS
   - Adicione ou edite um registro **A**:
     - **Type:** `A`
     - **Name:** `@` ou `yoobe.co` (ou deixe em branco)
     - **Value:** Cole o IP do Load Balancer
     - **TTL:** `3600` ou padrão

3. **Opcional - Configurar www:**
   - Adicione um registro **CNAME**:
     - **Type:** `CNAME`
     - **Name:** `www`
     - **Value:** `yoobe.co`
     - **TTL:** `3600`

---

### **PASSO 8: Aguardar Propagação**

1. **DNS:** Pode levar de 5 minutos a 48 horas (geralmente 1-2 horas)

2. **Certificado SSL:** Pode levar até 1 hora para ser provisionado

3. **Load Balancer:** Geralmente fica pronto em 5-10 minutos

---

## ✅ Verificação

### Verificar Status do Load Balancer:

1. Acesse: https://console.cloud.google.com/net-services/load-balancing/list?project=institucional-480905

2. Verifique se o status está **"Active"** (verde)

### Verificar Certificado SSL:

1. No Load Balancer, clique em **"Frontend"**

2. Verifique se o certificado mostra **"Active"** ou **"Provisioned"**

### Testar o Site:

1. Aguarde a propagação do DNS (pode levar algumas horas)

2. Teste:
   - **http://yoobe.co** (deve redirecionar para HTTPS)
   - **https://yoobe.co** (deve mostrar o site)

---

## 🆘 Troubleshooting

### Erro: "Certificate provisioning failed"

- Verifique se o DNS está apontando corretamente para o IP do Load Balancer
- Aguarde até 1 hora para o certificado ser provisionado
- Verifique se o domínio está acessível publicamente

### Site não carrega após configurar DNS

- Verifique se o DNS propagou: use `nslookup yoobe.co` ou `dig yoobe.co`
- Aguarde até 48 horas para propagação completa
- Verifique se o Load Balancer está "Active"

### Erro 404 ou "Not Found"

- Verifique se o arquivo `index.html` está no bucket
- Verifique se o bucket está público
- Verifique se o backend bucket está configurado corretamente

---

## 💰 Custos

**Importante:** Load Balancers têm custos associados:

- **Load Balancer:** ~$18/mês (mesmo sem tráfego)
- **Dados processados:** ~$0.008-0.025 por GB
- **Certificado SSL:** Gratuito (Google-managed)

**Alternativa mais barata:** Se o custo for um problema, você pode usar apenas a URL do Cloud Storage:

- `https://storage.googleapis.com/yoobe.co/index.html` (gratuito)

---

## 📝 Notas Importantes

1. **Certificado SSL:** O Google provisiona automaticamente certificados SSL gratuitos, mas pode levar até 1 hora

2. **DNS:** A propagação do DNS pode levar de minutos a horas. Use ferramentas como `nslookup` ou `dig` para verificar

3. **CDN:** O Cloud CDN está habilitado por padrão, o que melhora a performance globalmente

4. **Custos:** Load Balancers têm custos fixos mensais, considere isso antes de criar

---

## 🎉 Pronto!

Após seguir todos os passos e aguardar a propagação do DNS, seu site estará disponível em:

- ✅ **https://yoobe.co** (sem precisar de `/index.html`)
- ✅ **https://www.yoobe.co** (se configurado)

---

## 🔄 Alternativa Mais Simples (Sem Load Balancer)

Se você não quiser configurar um Load Balancer (por causa dos custos), pode:

1. Usar a URL direta: `https://storage.googleapis.com/yoobe.co/index.html`
2. Configurar um redirect no seu provedor de DNS:
   - Criar um registro CNAME que redirecione `yoobe.co` para `storage.googleapis.com`
   - Alguns provedores permitem isso

Mas para ter `https://yoobe.co` funcionando diretamente, o Load Balancer é necessário.
