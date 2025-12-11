# 🚀 Passo a Passo Completo: Criar Load Balancer para yoobe.co

## 📋 Pré-requisitos

Antes de começar, certifique-se de que:

- ✅ Bucket `yoobe.co` existe e está público
- ✅ Arquivo `index.html` está no bucket (ou você fará upload depois)

---

## 🎯 PASSO 1: Criar Backend Bucket (FAZER PRIMEIRO!)

### **1.1 Acessar Backend Buckets**

1. Acesse: https://console.cloud.google.com/net-services/load-balancing/backends/buckets?project=institucional-480905

2. **OU** siga este caminho:
   - Menu lateral (☰) → **"Network Services"** → **"Load balancing"**
   - Clique na aba **"Backends"**
   - Clique em **"CREATE BACKEND BUCKET"**

### **1.2 Configurar Backend Bucket**

1. **Name:** Digite: `yoobe-co-backend`

2. **Bucket:** Clique no dropdown e selecione: `yoobe.co`

3. **Enable Cloud CDN:** Marque esta opção ✅ (recomendado)

4. Clique em **"CREATE"**

5. Aguarde alguns segundos até criar

---

## 🎯 PASSO 2: Criar Load Balancer

### **2.1 Acessar Load Balancing**

1. Acesse: https://console.cloud.google.com/net-services/load-balancing/list?project=institucional-480905

2. Clique no botão azul **"Create load balancer"**

### **2.2 Escolher Tipo**

1. Selecione: **"Application Load Balancer (HTTP/HTTPS)"** (primeira opção)

2. Clique em **"START CONFIGURATION"**

### **2.3 Escolher Direção**

1. Selecione: **"From Internet to my VMs"** ou **"Internet facing"**

2. Clique em **"CONTINUE"**

### **2.4 Escolher Deployment**

1. Selecione: **"Global workloads"**

2. Clique em **"CONTINUE"**

### **2.5 Escolher Geração**

1. Selecione: **"Global external Application Load Balancer"**

2. Clique em **"CONTINUE"**

---

## 🎯 PASSO 3: Configurar Frontend

### **3.1 Nome do Load Balancer**

1. No topo da página, no campo **"Load Balancer name \*"**:
   - Digite: `yoobe-co-lb`

### **3.2 Configurar Frontend IP e Port**

Na seção **"New Frontend IP and port"**:

1. **Name:** Digite: `yoobe-co-frontend`

2. **Description:** (opcional) Deixe em branco

3. **Protocol:** ⚠️ **SELECIONE "HTTPS"**

   - Clique no dropdown
   - Escolha: **"HTTPS (includes HTTP/2 and HTTP/3)"**

4. **IP address:** ⚠️ **CRIAR IP ESTÁTICO**

   - Clique no dropdown
   - Clique em **"CREATE IP ADDRESS"**
   - Na janela:
     - **Name:** `yoobe-co-ip`
     - **IP version:** **"IPv4"**
     - **Type:** **"Global"** (importante!)
     - Clique em **"RESERVE"**
   - ⚠️ **ANOTE O IP CRIADO!** Você precisará dele para DNS

5. **Port:** Digite: `443` (porta HTTPS)

6. **Certificate:** ⚠️ **CRIAR CERTIFICADO SSL**

   - Clique no dropdown **"Certificate \*"**
   - Selecione **"Create a new certificate"**
   - Na janela que abrir:
     - **Name:** `yoobe-co-cert`
     - **Type:** Selecione **"Google-managed certificate"**
     - **Domain names:**
       - Digite: `yoobe.co`
       - Clique em **"ADD DOMAIN"** e adicione: `www.yoobe.co` (opcional)
     - Clique em **"CREATE"**
   - Aguarde alguns segundos
   - O certificado será selecionado automaticamente

7. **SSL policy:** Deixe como **"GCP default"**

8. Clique no botão **"DONE"** (botão azul no final da seção)

---

## 🎯 PASSO 4: Configurar Backend

### **4.1 Adicionar Backend**

1. Na seção **"Backend configuration"**, clique em **"ADD BACKEND"** ou **"Backend services & backend buckets"**

2. Selecione a aba **"Backend bucket"** (não "Backend service")

3. No dropdown, selecione: **`yoobe-co-backend`** (criado no PASSO 1)

4. **Cloud CDN:** Já deve estar habilitado

5. Clique em **"DONE"**

---

## 🎯 PASSO 5: Configurar Routing Rules

### **5.1 Configurar Host e Path**

1. Na seção **"Host and path rules"**:

2. **Host:** Deixe em branco OU digite:

   - `yoobe.co`
   - `www.yoobe.co` (se quiser suportar www)

3. **Path:** Deixe como `/` ou `/ *`

4. **Backends:** Selecione `yoobe-co-backend`

5. Clique em **"DONE"**

---

## 🎯 PASSO 6: Revisar e Criar

### **6.1 Revisar Configurações**

1. Revise todas as configurações:

   - ✅ Load Balancer name: `yoobe-co-lb`
   - ✅ Frontend: HTTPS, Port 443, IP estático, Certificado SSL
   - ✅ Backend: `yoobe-co-backend`
   - ✅ Routing: Configurado

2. Role até o final da página

### **6.2 Criar Load Balancer**

1. Clique no botão **"CREATE"** ou **"Create load balancer"** (botão azul grande)

2. ⚠️ **AGUARDE!** O Load Balancer pode levar 5-10 minutos para ser criado

3. Você será redirecionado para a lista de Load Balancers

4. O status aparecerá como **"Creating..."** e depois **"Active"**

---

## 🎯 PASSO 7: Configurar DNS

### **7.1 Obter IP do Load Balancer**

1. Após o Load Balancer estar **"Active"**, clique nele para ver detalhes

2. Na seção **"Frontend"**, copie o **"IP address"** (ex: `34.102.136.180`)

### **7.2 Configurar DNS no Provedor**

1. Acesse o painel do seu registrador de domínio (onde você comprou `yoobe.co`)

2. Vá para as configurações de **DNS**

3. Adicione ou edite um registro **A**:

   - **Type:** `A`
   - **Name:** `@` ou `yoobe.co` (ou deixe em branco)
   - **Value:** Cole o IP do Load Balancer
   - **TTL:** `3600` ou padrão

4. (Opcional) Adicione um registro **CNAME** para www:

   - **Type:** `CNAME`
   - **Name:** `www`
   - **Value:** `yoobe.co`
   - **TTL:** `3600`

5. Salve as alterações

---

## ⏱️ Aguardar Propagação

### **Tempos Esperados:**

1. **Load Balancer:** 5-10 minutos para ficar "Active"

2. **DNS:** 1-2 horas (pode levar até 48 horas)

3. **Certificado SSL:** Até 1 hora após DNS propagar

---

## ✅ Verificação Final

### **Verificar Status do Load Balancer:**

1. Acesse: https://console.cloud.google.com/net-services/load-balancing/list?project=institucional-480905

2. Verifique se está **"Active"** (verde)

### **Verificar Certificado SSL:**

1. No Load Balancer, vá para **"Frontend"**

2. Verifique se o certificado mostra **"Active"** ou **"Provisioned"**

### **Testar o Site:**

1. Aguarde a propagação do DNS (1-2 horas)

2. Teste:
   - **http://yoobe.co** (deve redirecionar para HTTPS)
   - **https://yoobe.co** (deve mostrar o site)

---

## 🆘 Troubleshooting

### Erro ao criar IP estático:

- Verifique permissões de "Compute Admin" ou "Owner"
- Tente criar o IP em outra aba primeiro

### Certificado não provisiona:

- Verifique se o DNS está apontando corretamente para o IP
- Aguarde até 1 hora
- Verifique se o domínio está acessível publicamente

### Site não carrega:

- Verifique se o DNS propagou: `nslookup yoobe.co`
- Verifique se o Load Balancer está "Active"
- Verifique se o arquivo `index.html` está no bucket
- Aguarde até 48 horas para propagação completa do DNS

---

## 📝 Checklist Completo

- [ ] Backend Bucket `yoobe-co-backend` criado
- [ ] Load Balancer `yoobe-co-lb` criado
- [ ] Frontend configurado: HTTPS, Port 443, IP estático, Certificado SSL
- [ ] Backend configurado: `yoobe-co-backend` selecionado
- [ ] Routing rules configuradas
- [ ] Load Balancer está "Active"
- [ ] IP do Load Balancer anotado
- [ ] DNS configurado apontando para o IP
- [ ] Certificado SSL provisionado
- [ ] Site acessível em `https://yoobe.co`

---

## 💰 Lembrete sobre Custos

O Load Balancer tem custos:

- **~$18/mês** (fixo, mesmo sem tráfego)
- **~$0.008-0.025 por GB** de dados processados

Se preferir uma solução gratuita, use:

- `https://storage.googleapis.com/yoobe.co/index.html`

---

## 🎉 Pronto!

Após seguir todos os passos e aguardar a propagação, seu site estará disponível em:

- ✅ **https://yoobe.co**
- ✅ **https://www.yoobe.co** (se configurou)

Boa sorte! 🚀
