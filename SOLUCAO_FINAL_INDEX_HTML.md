# 🔧 Solução Final: Fazer index.html Aparecer Corretamente

## 🎯 Problema Identificado

O Load Balancer está configurado com **"Path prefix rewrite: index.html"**, mas está retornando **404 NoSuchKey** quando acessa `http://yoobe.co/`.

O problema é que o **"Path prefix rewrite"** adiciona o prefixo ao path original, mas o bucket não está encontrando o arquivo.

---

## ✅ Solução: Ajustar URL Rewrite no Load Balancer

### **Opção 1: Usar Path Rewrite Completo (Recomendado)**

O **"Path prefix rewrite"** adiciona um prefixo. Para substituir completamente o path, precisamos usar uma abordagem diferente.

#### **Passo a Passo:**

1. **Acesse o Load Balancer:**
   - https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list?project=institucional-480905

2. **Clique em `yoobe-co-lb-url-map` → `Edit`**

3. **Vá em `Host and path rules`**

4. **Na regra padrão, expanda `Add-on action (URL rewrite)`**

5. **Ajuste o `Path prefix rewrite`:**
   - **Tente primeiro:** Deixe vazio e salve
   - **Depois teste:** `curl -I --resolve yoobe.co:80:34.8.255.48 http://yoobe.co/`
   - **Se ainda não funcionar:** Configure como `/index.html` (com barra no início)

6. **OU crie uma regra específica para `/`:**
   - Clique em **"Add path rule"**
   - **Paths:** `/` (exato)
   - **Action:** Route traffic to a single backend
   - **Backend:** `yoobe-co-backend`
   - **Add-on action (URL rewrite):**
     - **Path prefix rewrite:** `/index.html` (com barra)
   - **Save**

7. **Salve tudo e aguarde alguns minutos**

---

### **Opção 2: Configurar Bucket como Website Estático**

Se o URL rewrite não funcionar, podemos configurar o bucket para servir como website estático:

#### **Via gsutil (no Cloud Shell):**

```bash
# Configurar o bucket como website estático
gsutil web set -m index.html -e 404.html gs://yoobe.co

# Verificar configuração
gsutil web get gs://yoobe.co
```

**Depois disso:**
- Remova o URL rewrite do Load Balancer
- O bucket servirá `index.html` automaticamente para `/`

---

### **Opção 3: Usar gcloud para Atualizar URL Map**

Se você tiver permissões, pode tentar atualizar via CLI:

```bash
# Criar um path rule com rewrite
gcloud compute url-maps add-path-matcher yoobe-co-lb-url-map \
  --default-backend-bucket=yoobe-co-backend \
  --path-matcher-name=default \
  --path-rules="/=yoobe-co-backend" \
  --project=institucional-480905
```

**Mas isso pode não funcionar se você não tiver permissões completas.**

---

## 🧪 Testes

Após fazer qualquer ajuste, teste:

```bash
# Teste 1: Root path
curl -I --resolve yoobe.co:80:34.8.255.48 http://yoobe.co/

# Teste 2: Com verbose para ver detalhes
curl -v --resolve yoobe.co:80:34.8.255.48 http://yoobe.co/

# Teste 3: Acesso direto ao arquivo
curl -I --resolve yoobe.co:80:34.8.255.48 http://yoobe.co/index.html
```

**Resultado esperado:**
- `HTTP/1.1 200 OK`
- `Content-Type: text/html`
- Conteúdo do `index.html`

---

## 🔍 Debugging

Se ainda não funcionar, verifique:

1. **O arquivo existe e está público:**
   ```bash
   curl -I https://storage.googleapis.com/yoobe.co/index.html
   ```
   Deve retornar `200 OK`

2. **O backend bucket está correto:**
   - No Load Balancer → Backend → Verifique se `yoobe-co-backend` aponta para `yoobe.co`

3. **O URL rewrite está configurado:**
   - No Load Balancer → Host and path rules → Verifique o "Path prefix rewrite"

4. **Cache do CDN:**
   - Invalide o cache: Load Balancer → Cache invalidation → `/*`

---

## 📋 Checklist Final

- [ ] Arquivo `index.html` existe no bucket `yoobe.co`
- [ ] Arquivo `index.html` está público (`allUsers` com `Storage Object Viewer`)
- [ ] Backend bucket `yoobe-co-backend` aponta para `yoobe.co`
- [ ] URL rewrite configurado no Load Balancer
- [ ] Cache do CDN invalidado
- [ ] Teste com `curl` retorna `200 OK` e `text/html`

---

## 🎯 Recomendação

**Tente primeiro a Opção 1** (ajustar URL rewrite no console). Se não funcionar, use a **Opção 2** (configurar bucket como website estático via `gsutil`).

A **Opção 2** é mais simples e geralmente funciona melhor para servir arquivos estáticos.
