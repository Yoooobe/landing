# ⚙️ Configurar Frontend do Load Balancer

## ✅ Status Atual

Você está na etapa **"Frontend configuration"** - vamos configurar para HTTPS!

---

## 📋 Passo a Passo: Configurar Frontend

### **PASSO 1: Nome do Load Balancer**

1. No topo da página, no campo **"Load Balancer name \*"**:
   - Digite: `yoobe-co-lb`
   - (ou qualquer nome que preferir, em minúsculas, sem espaços)

---

### **PASSO 2: Configurar Frontend IP e Port**

Na seção **"New Frontend IP and port"**:

#### **2.1 Nome do Frontend:**

- **Name:** Digite: `yoobe-co-frontend`
- **Description:** (opcional) Deixe em branco ou digite: "Frontend para yoobe.co"

#### **2.2 Protocolo:**

- **Protocol:** ⚠️ **MUDE DE "HTTP" PARA "HTTPS"**
  - Clique no dropdown
  - Selecione **"HTTPS"**

#### **2.3 IP Address:**

- **IP address:** ⚠️ **MUDE DE "Ephemeral" PARA UM IP ESTÁTICO**
  - Clique no dropdown
  - Clique em **"CREATE IP ADDRESS"** ou **"Reserve a new static IP address"**
  - Na janela que abrir:
    - **Name:** `yoobe-co-ip`
    - **IP version:** **"IPv4"**
    - **Type:** **"Global"** (importante!)
    - Clique em **"RESERVE"** ou **"CREATE"**
  - Aguarde alguns segundos
  - O IP será criado e selecionado automaticamente

#### **2.4 Porta:**

- **Port:** ⚠️ **MUDE DE "80" PARA "443"**
  - Apague o "80"
  - Digite: `443` (porta padrão para HTTPS)

#### **2.5 Outras Configurações:**

- **IP version:** Deixe como **"IPv4"**
- **Network Service Tier:** Deve estar como **"Premium"** (não pode mudar)

---

### **PASSO 3: Configurar Certificado SSL**

Após mudar para HTTPS, uma nova seção aparecerá para **"Certificate"**:

1. **Certificate:** Selecione **"Create a new certificate"** ou **"Google-managed certificate"**

2. Na janela que abrir:

   - **Name:** `yoobe-co-cert`
   - **Type:** Selecione **"Google-managed certificate"**
   - **Domain names:**
     - Digite: `yoobe.co`
     - Clique em **"ADD DOMAIN"** e adicione: `www.yoobe.co` (opcional)
   - Clique em **"CREATE"**

3. ⚠️ **IMPORTANTE:** O certificado pode levar até 1 hora para ser provisionado. Você pode continuar a configuração do Load Balancer, mas o site só funcionará após o certificado estar ativo.

---

### **PASSO 4: Finalizar Frontend**

1. Revise todas as configurações:

   - ✅ Name: `yoobe-co-frontend`
   - ✅ Protocol: **HTTPS**
   - ✅ IP address: IP estático criado (ex: `34.102.136.180`)
   - ✅ Port: **443**
   - ✅ Certificate: Certificado criado

2. Clique no botão **"DONE"** (botão azul no final da seção)

---

## ⚠️ IMPORTANTE: Anotar o IP Criado

**ANTES DE CONTINUAR**, anote o IP que foi criado:

1. No campo **"IP address"**, você verá o IP (ex: `34.102.136.180`)
2. **COPIE ESTE IP** - você precisará dele para configurar o DNS depois!

---

## ✅ Checklist do Frontend

- [ ] Load Balancer name preenchido
- [ ] Frontend name preenchido
- [ ] Protocol: **HTTPS** (não HTTP!)
- [ ] IP address: IP estático criado (não Ephemeral!)
- [ ] Port: **443** (não 80!)
- [ ] Certificate: Certificado SSL criado
- [ ] IP anotado para configurar DNS depois
- [ ] Clicou em "DONE"

---

## 🚀 Próximo Passo

Após clicar em "DONE", você irá para:

- **Backend configuration** ← Aqui você selecionará o `yoobe-co-backend` que criou

---

## 🆘 Troubleshooting

### Erro ao criar IP estático:

- Verifique se tem permissões de "Compute Admin" ou "Owner"
- Tente criar o IP em outra aba primeiro

### Certificado não aparece:

- Certifique-se de que mudou o Protocol para HTTPS primeiro
- O campo de certificado só aparece após selecionar HTTPS

### Não consigo mudar o Protocol:

- Certifique-se de que está na etapa correta
- Tente recarregar a página

---

## 💡 Dica

Se você ainda não criou o Backend Bucket, faça isso agora em outra aba:

- https://console.cloud.google.com/net-services/load-balancing/backends/buckets?project=institucional-480905
- Você precisará dele no próximo passo!
