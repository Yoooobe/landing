# 🚀 Iniciando a Criação do Load Balancer

## ✅ Você Está no Lugar Certo!

Você está na página de **"Load balancing"** e está tudo certo para começar!

---

## 📋 Próximo Passo: Criar Load Balancer

### **PASSO 1: Clicar em "Create load balancer"**

1. Na página atual, você verá um botão azul grande no centro:

   - **"Create load balancer"** ← **CLIQUE AQUI!**

2. Uma nova página abrirá com as opções de tipos de Load Balancer

---

### **PASSO 2: Escolher o Tipo**

Após clicar em "Create load balancer", você verá várias opções:

1. **Selecione:** **"HTTP(S) Load Balancing"** (primeira opção, geralmente no topo)

2. Clique em **"START CONFIGURATION"** ou **"Continue"**

---

### **PASSO 3: Escolher a Direção**

Na próxima tela, você verá opções de direção:

1. **Selecione:** **"From Internet to my VMs"** ou **"Internet facing"**

2. Clique em **"CONTINUE"**

---

## ⚠️ IMPORTANTE: Criar Backend Bucket Primeiro

**Antes de continuar com o Load Balancer**, você precisa criar o **Backend Bucket** primeiro!

### **Criar Backend Bucket Agora:**

1. **Opção A - Via Menu:**

   - No menu lateral esquerdo, clique em **"Backends"** (aba ao lado de "Load balancers")
   - Clique em **"CREATE BACKEND BUCKET"**

2. **Opção B - Via Link Direto:**

   - Acesse: https://console.cloud.google.com/net-services/load-balancing/backends/buckets?project=institucional-480905

3. Configure:

   - **Name:** `yoobe-co-backend`
   - **Bucket:** Selecione `yoobe.co` da lista
   - **Enable Cloud CDN:** Marque esta opção ✅
   - Clique em **"CREATE"**

4. Aguarde alguns segundos até criar

---

## 🔄 Ordem Correta dos Passos

1. ✅ **Criar Backend Bucket** (faça isso primeiro!)
2. ✅ **Criar Load Balancer** (depois)
3. ✅ **Configurar DNS** (por último)

---

## 📝 O Que Você Verá Depois

Após criar o Backend Bucket e voltar para criar o Load Balancer:

- **Frontend:** Configurar HTTPS, IP, certificado SSL
- **Backend:** Selecionar o `yoobe-co-backend` que você criou
- **Routing:** Configurar regras de roteamento

---

## 🎯 Resumo do Próximo Passo

**AGORA:** Crie o Backend Bucket primeiro (via aba "Backends" ou link direto acima)

**DEPOIS:** Volte para criar o Load Balancer e selecione o backend bucket criado

---

## 💡 Dica

Se você já clicou em "Create load balancer", não tem problema! Você pode:

- Criar o Backend Bucket em outra aba
- Voltar para o Load Balancer depois
- Ou cancelar e começar do início na ordem correta

O importante é ter o Backend Bucket criado antes de configurar o backend do Load Balancer!
