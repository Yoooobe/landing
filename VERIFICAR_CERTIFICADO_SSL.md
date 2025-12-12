# 🔒 Verificar Status do Certificado SSL

## 📋 O Que Verificar

O Load Balancer está configurado corretamente, mas precisamos verificar o **status do certificado SSL**.

---

## ✅ PASSO 1: Verificar Status do Certificado

1. No Load Balancer `yoobe-co-lb-url-map`, vá para a aba **"Frontend"**

2. Clique no certificado `yoobe-co-cert`

3. Verifique o **status**:
   - **"Active"** = Certificado ativo e funcionando ✅
   - **"Provisioning"** = Ainda sendo provisionado (normal, pode levar 1-2 horas) ⏳
   - **"Failed"** = Erro no provisionamento ⚠️

---

## 🔍 PASSO 2: Verificar Detalhes do Certificado

No certificado, verifique:

1. **Domains:**

   - Deve incluir: `yoobe.co`
   - Pode incluir: `www.yoobe.co`

2. **Status:**

   - **"Active"**: Certificado pronto ✅
   - **"Provisioning"**: Ainda sendo provisionado ⏳
   - **"Failed"**: Erro ⚠️

3. **Managed certificate status:**
   - Se estiver "Provisioning", pode mostrar:
     - "Waiting for domain verification"
     - "DNS propagation in progress"

---

## ⏳ Se Certificado Estiver "Provisioning"

**Isso é normal!** O certificado SSL pode levar:

- **1-2 horas** após o DNS propagar completamente
- **Até 24 horas** em casos raros

**O que acontece:**

1. Google Cloud verifica se o DNS está propagado
2. Verifica se o domínio aponta para o Load Balancer
3. Provisiona o certificado SSL automaticamente

**Enquanto isso:**

- ⚠️ HTTPS pode não funcionar (retornar erro de certificado)
- ✅ HTTP deve funcionar mesmo assim

---

## 🧪 Testar HTTP (Mesmo Sem Certificado)

Execute no terminal:

```bash
curl -I http://yoobe.co
```

**Se retornar `200 OK`:**

- ✅ Load Balancer está funcionando
- ✅ Backend está funcionando
- ⏳ Apenas aguardar certificado SSL

**Se retornar erro:**

- ⚠️ Pode haver outro problema
- ⚠️ Verifique logs do Load Balancer

---

## 🧪 Testar HTTPS (Pode Ter Erro de Certificado)

Execute no terminal:

```bash
curl -I https://yoobe.co
```

**Se retornar `200 OK`:**

- ✅ Certificado está pronto e funcionando! 🎉

**Se retornar erro de certificado:**

- ⏳ Certificado ainda está sendo provisionado (normal)
- ⏳ Aguarde 1-2 horas

**Se retornar outro erro:**

- ⚠️ Pode haver problema na configuração
- ⚠️ Verifique logs do Load Balancer

---

## 🔍 Verificar Logs do Load Balancer

1. Acesse: https://console.cloud.google.com/logs/query?project=institucional-480905

2. Filtre por:

   - **Resource type:** `http_load_balancer`
   - **Load balancer name:** `yoobe-co-lb-url-map`

3. Verifique se há erros recentes

**Erros comuns:**

- `502 Bad Gateway` = Problema no backend
- `503 Service Unavailable` = Backend não está respondendo
- `404 Not Found` = Arquivo não encontrado no bucket

---

## 🎯 Próximos Passos

1. **Verifique o status do certificado SSL:**

   - No Load Balancer → Frontend → Clique no certificado
   - Qual é o status? (Active/Provisioning/Failed)

2. **Teste HTTP:**

   ```bash
   curl -I http://yoobe.co
   ```

   - O que retorna?

3. **Teste HTTPS:**
   ```bash
   curl -I https://yoobe.co
   ```
   - O que retorna?

**Envie essas informações para eu ajudar a identificar o problema!** 🔍
