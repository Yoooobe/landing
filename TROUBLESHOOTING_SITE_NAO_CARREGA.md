# 🔍 Troubleshooting: Site Não Está Carregando

## 🔍 Diagnóstico Passo a Passo

Vamos verificar cada componente para identificar o problema.

---

## ✅ PASSO 1: Verificar DNS Global

Execute no terminal:

```bash
nslookup yoobe.co 8.8.8.8
```

**Resultado esperado:**
```
Address: 34.8.255.48
```

**Se mostrar IP diferente ou erro:**
- ⚠️ DNS ainda não propagou completamente
- ⏳ Aguarde mais tempo (pode levar até 24 horas)

**Se mostrar `34.8.255.48`:**
- ✅ DNS está correto, continue para próximo passo

---

## ✅ PASSO 2: Verificar Load Balancer Status

1. Acesse: https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list?project=institucional-480905

2. Clique no Load Balancer `yoobe-co-lb-url-map`

3. Verifique:
   - **Status:** Deve estar "Active" ou "Running"
   - **Frontend:** Deve mostrar `34.8.255.48:443`
   - **Backend:** Deve mostrar `yoobe-co-backend`

**Se Load Balancer não estiver ativo:**
- ⚠️ Pode levar alguns minutos para ativar
- ⏳ Aguarde 5-10 minutos e verifique novamente

---

## ✅ PASSO 3: Verificar Certificado SSL

1. No Load Balancer, vá para a aba **"Frontend"**

2. Verifique o status do certificado `yoobe-co-cert`:
   - **"Provisioning"**: Ainda sendo provisionado (normal, pode levar 1-2 horas)
   - **"Active"**: Certificado ativo ✅
   - **"Failed"**: Erro no provisionamento ⚠️

**Se certificado estiver "Provisioning":**
- ⏳ Isso é normal, pode levar 1-2 horas após DNS propagar
- ⚠️ HTTPS pode não funcionar até o certificado estar pronto
- ✅ HTTP deve funcionar mesmo assim

**Se certificado estiver "Failed":**
- ⚠️ Pode ser problema com DNS ainda não propagado
- ⏳ Aguarde DNS propagar completamente e o certificado será reprovisionado

---

## ✅ PASSO 4: Testar Acesso Direto ao Bucket

Teste se o bucket está acessível diretamente:

1. Acesse: https://console.cloud.google.com/storage/browser/yoobe.co?project=institucional-480905

2. Clique no arquivo `index.html`

3. Verifique a URL pública:
   - Deve aparecer algo como: `https://storage.googleapis.com/yoobe.co/index.html`

4. **Teste acessar essa URL diretamente no navegador**

**Se a URL direta funcionar:**
- ✅ Bucket está configurado corretamente
- ⚠️ Problema pode ser no Load Balancer ou DNS

**Se a URL direta não funcionar:**
- ⚠️ Problema com permissões do bucket
- ⚠️ Verifique se o bucket está realmente público

---

## ✅ PASSO 5: Verificar Permissões do Bucket

1. Acesse: https://console.cloud.google.com/storage/browser/yoobe.co?project=institucional-480905

2. Clique na aba **"Permissions"** ou **"Permissões"**

3. Verifique se existe uma permissão para:
   - **Principal:** `allUsers` ou `allAuthenticatedUsers`
   - **Role:** `Storage Object Viewer` ou `Storage Legacy Bucket Reader`

**Se não existir permissão pública:**
- ⚠️ Isso é o problema!
- ✅ Adicione permissão pública (veja próximo passo)

---

## ✅ PASSO 6: Adicionar Permissão Pública (Se Necessário)

Se o bucket não tiver permissão pública:

1. No bucket, clique em **"Permissions"** ou **"Permissões"**

2. Clique em **"Grant Access"** ou **"Conceder acesso"**

3. Preencha:
   - **New principals:** `allUsers`
   - **Role:** `Storage Object Viewer`

4. Clique em **"Save"**

---

## ✅ PASSO 7: Verificar Backend Bucket no Load Balancer

1. No Load Balancer, vá para a aba **"Backend"**

2. Clique em `yoobe-co-backend`

3. Verifique:
   - **Storage bucket name:** `yoobe.co` ✅
   - **Cloud CDN:** `Enabled` ✅

**Se algo estiver incorreto:**
- ⚠️ Pode ser necessário recriar o backend bucket

---

## ✅ PASSO 8: Testar com curl

Teste diretamente no terminal:

```bash
# Teste HTTP
curl -I http://yoobe.co

# Teste HTTPS
curl -I https://yoobe.co
```

**Resultado esperado:**
- **HTTP:** Deve retornar `200 OK`
- **HTTPS:** Pode retornar erro de certificado (normal se ainda não estiver pronto)

**Se retornar erro:**
- Anote a mensagem de erro
- Isso ajudará a identificar o problema

---

## ✅ PASSO 9: Verificar Logs do Load Balancer

1. Acesse: https://console.cloud.google.com/logs/query?project=institucional-480905

2. Filtre por:
   - **Resource type:** `http_load_balancer`
   - **Load balancer:** `yoobe-co-lb-url-map`

3. Verifique se há erros recentes

**Se houver erros:**
- Anote a mensagem de erro
- Isso ajudará a identificar o problema

---

## 🚨 Problemas Comuns e Soluções

### **Problema 1: DNS Ainda Não Propagou**

**Sintoma:**
- `nslookup yoobe.co 8.8.8.8` mostra IP antigo ou erro

**Solução:**
- ⏳ Aguarde até 24 horas para propagação completa
- ✅ DNS global já mostra IP correto, mas pode levar tempo para todos os servidores atualizarem

---

### **Problema 2: Certificado SSL Ainda Não Está Pronto**

**Sintoma:**
- HTTP não funciona OU HTTPS retorna erro de certificado

**Solução:**
- ⏳ Aguarde 1-2 horas após DNS propagar
- ✅ Certificado será provisionado automaticamente
- ⚠️ HTTP deve funcionar mesmo sem certificado SSL

---

### **Problema 3: Bucket Não Está Público**

**Sintoma:**
- URL direta do bucket não funciona
- Erro 403 Forbidden

**Solução:**
- ✅ Adicione permissão `allUsers` com role `Storage Object Viewer`
- ✅ Verifique se "Public access prevention" está desabilitado

---

### **Problema 4: Load Balancer Não Está Ativo**

**Sintoma:**
- Load Balancer mostra status diferente de "Active"

**Solução:**
- ⏳ Aguarde 5-10 minutos após criar
- ⚠️ Se não ativar, pode haver erro na configuração

---

## 🎯 Checklist de Diagnóstico

Execute estes testes e anote os resultados:

- [ ] `nslookup yoobe.co 8.8.8.8` mostra `34.8.255.48`?
- [ ] Load Balancer está "Active"?
- [ ] Certificado SSL está "Active" ou "Provisioning"?
- [ ] Bucket tem permissão pública (`allUsers`)?
- [ ] Arquivo `index.html` existe no bucket?
- [ ] URL direta do bucket funciona?
- [ ] `curl -I http://yoobe.co` retorna `200 OK`?
- [ ] `curl -I https://yoobe.co` retorna algo (mesmo que erro de certificado)?

---

## 📋 Próximos Passos

Após executar os testes acima, me informe:

1. **O que o `nslookup yoobe.co 8.8.8.8` mostra?**
2. **O Load Balancer está "Active"?**
3. **O certificado SSL está em que status?**
4. **O bucket tem permissão pública?**
5. **A URL direta do bucket funciona?**

Com essas informações, posso ajudar a identificar exatamente qual é o problema! 🔍
