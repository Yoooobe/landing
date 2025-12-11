# ✅ Passo 2: Continuar Configuração do Load Balancer

## ✅ Status Atual

Perfeito! Você já selecionou:

- ✅ **Application Load Balancer (HTTP/HTTPS)** ← Correto!

---

## 📋 Próximo Passo

### **Clique em "Next"**

1. Na parte inferior da página, você verá um botão azul **"Next"**

2. Clique em **"Next"** para continuar

---

## ⚠️ IMPORTANTE: Criar Backend Bucket (Se Ainda Não Criou)

**Antes de continuar**, certifique-se de ter criado o Backend Bucket:

### **Opção 1: Criar em Outra Aba (Recomendado)**

1. Abra uma **nova aba** no navegador

2. Acesse: https://console.cloud.google.com/net-services/load-balancing/backends/buckets?project=institucional-480905

3. Clique em **"CREATE BACKEND BUCKET"**

4. Configure:

   - **Name:** `yoobe-co-backend`
   - **Bucket:** Selecione `yoobe.co` da lista
   - **Enable Cloud CDN:** Marque ✅
   - Clique em **"CREATE"**

5. Volte para a aba do Load Balancer e continue

### **Opção 2: Continuar e Criar Depois**

Você pode continuar configurando o Load Balancer e criar o Backend Bucket depois. Quando chegar na parte de configurar o backend, você precisará criá-lo.

---

## 🔄 Próximas Etapas Após Clicar em "Next"

1. **Public facing or internal:** Escolha **"Public facing (external)"**

2. **Global or single region:** Escolha **"Global workloads"**

3. **Load balancer generation:** Escolha **"Global external Application Load Balancer"**

4. **Create load balancer:** Configurar frontend, backend, etc.

---

## 💡 Dica

Se você ainda não criou o Backend Bucket:

- Crie agora em outra aba (é rápido, leva 30 segundos)
- Depois volte para o Load Balancer
- Isso evita ter que voltar depois

---

## ✅ Checklist

- [x] Tipo de Load Balancer selecionado: Application Load Balancer (HTTP/HTTPS) ✅
- [ ] Backend Bucket criado (crie em outra aba se ainda não criou)
- [ ] Clicar em "Next" para continuar

---

## 🚀 Próximo Passo

**Clique em "Next"** e continue a configuração!
