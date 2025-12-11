# 🌐 Configurar DNS no Google Cloud DNS (Sem Mudar Nameservers)

## ⚠️ Situação Especial

Você tem:

- ✅ **Emails no Google Workspace** (precisam dos nameservers do Google)
- ✅ **Subdomínio `catalogo.yoobe.co`** funcionando (não deve ser mudado)
- ✅ **Repositório na Vercel**

**Solução:** Manter nameservers do Google Cloud e configurar DNS diretamente no Google Cloud DNS!

---

## ✅ Por Que Manter Nameservers do Google

- ✅ **Emails continuam funcionando** (Google Workspace precisa dos nameservers do Google)
- ✅ **Subdomínio `catalogo.yoobe.co` continua funcionando**
- ✅ **Não quebra nada que já está funcionando**
- ✅ **Apenas adiciona o registro A para `yoobe.co`**

---

## 📋 Passo a Passo: Configurar no Google Cloud DNS

### **PASSO 1: Acessar Google Cloud DNS**

1. Acesse: https://console.cloud.google.com/net-services/dns/zones?project=institucional-480905

2. **OU** siga este caminho:
   - Menu lateral (☰) → **"Network Services"** → **"Cloud DNS"**

### **PASSO 2: Encontrar ou Criar Zona DNS**

1. **Se já existe uma zona para `yoobe.co`:**

   - Clique na zona existente
   - Vá para a aba **"DNS records"** ou **"Registros DNS"**

2. **Se NÃO existe uma zona:**
   - Clique em **"CREATE ZONE"**
   - Configure:
     - **Zone type:** **"Public"**
     - **Zone name:** `yoobe-co-zone`
     - **DNS name:** `yoobe.co.` (com ponto no final!)
     - Clique em **"CREATE"**

### **PASSO 3: Adicionar Registro A para yoobe.co**

1. Na zona DNS, clique em **"ADD RECORD SET"** ou **"Adicionar registro"**

2. Configure o registro A:

   - **DNS name:** `yoobe.co.` (com ponto no final) OU deixe em branco se for o domínio raiz
   - **Resource record type:** `A`
   - **IPv4 address:** `34.8.255.48` (IP do Load Balancer)
   - **TTL:** `3600` (ou deixe padrão)

3. ⚠️ **IMPORTANTE:** Não delete ou modifique outros registros existentes!

   - Deixe os registros de email (MX) intactos
   - Deixe os registros do subdomínio `catalogo.yoobe.co` intactos
   - Apenas adicione o novo registro A

4. Clique em **"CREATE"** ou **"Salvar"**

### **PASSO 4: (Opcional) Adicionar CNAME para www**

Se quiser que `www.yoobe.co` também funcione:

1. Clique em **"ADD RECORD SET"** novamente

2. Configure:

   - **DNS name:** `www.yoobe.co.` (com ponto no final)
   - **Resource record type:** `CNAME`
   - **Canonical name:** `yoobe.co.` (com ponto no final)
   - **TTL:** `3600`

3. Clique em **"CREATE"**

---

## ✅ Verificar Registros Existentes

Antes de adicionar, verifique quais registros já existem:

1. Na zona DNS, veja a lista de registros

2. **Registros que NÃO devem ser alterados:**

   - Registros **MX** (para emails do Google Workspace)
   - Registros **TXT** (para verificação do Google Workspace)
   - Registros **CNAME** para `catalogo.yoobe.co`
   - Qualquer outro registro que já esteja funcionando

3. **Apenas adicione** o novo registro A para `yoobe.co`

---

## ⏱️ Aguardar Propagação

Após adicionar o registro:

1. **DNS:** 1-24 horas para propagar (geralmente mais rápido que mudar nameservers)

2. **Verificar:**

   ```bash
   nslookup yoobe.co 8.8.8.8
   ```

   Deve mostrar: `34.8.255.48`

3. **Verificação global:**
   - https://www.whatsmydns.net/#A/yoobe.co
   - Deve começar a mostrar `34.8.255.48`

---

## 🔍 Verificar se Não Quebrou Nada

Após adicionar o registro, verifique:

1. **Emails ainda funcionam?**

   - Teste enviando um email para um endereço do Google Workspace

2. **Subdomínio ainda funciona?**

   - Acesse: `https://catalogo.yoobe.co`
   - Deve continuar funcionando normalmente

3. **Novo domínio funciona?**
   - Após propagar, acesse: `https://yoobe.co`
   - Deve mostrar a página de "Em Atualização"

---

## 📋 Checklist

- [ ] Acessou Google Cloud DNS
- [ ] Encontrou ou criou zona DNS para `yoobe.co`
- [ ] Verificou registros existentes (MX, TXT, CNAME do catálogo)
- [ ] Adicionou registro A: `yoobe.co` → `34.8.255.48`
- [ ] (Opcional) Adicionou CNAME: `www.yoobe.co` → `yoobe.co`
- [ ] Não modificou registros existentes
- [ ] Aguardou propagação (1-24 horas)
- [ ] Verificou que emails ainda funcionam
- [ ] Verificou que `catalogo.yoobe.co` ainda funciona
- [ ] Verificou que `yoobe.co` funciona

---

## 🎯 Resumo

**O que fazer:**

- ✅ Manter nameservers do Google Cloud (não mudar!)
- ✅ Adicionar registro A no Google Cloud DNS: `yoobe.co` → `34.8.255.48`
- ✅ Não modificar registros existentes (emails, catálogo)

**O que NÃO fazer:**

- ❌ Não mudar nameservers para name.com
- ❌ Não deletar registros MX (emails)
- ❌ Não modificar registros do `catalogo.yoobe.co`

---

## 🚀 Próximo Passo

1. **Acesse Google Cloud DNS:**

   - https://console.cloud.google.com/net-services/dns/zones?project=institucional-480905

2. **Encontre a zona DNS para `yoobe.co`**

3. **Adicione apenas o registro A:**

   - `yoobe.co` → `34.8.255.48`

4. **Aguarde propagação** (1-24 horas)

5. **Teste:**
   - Emails: devem continuar funcionando ✅
   - Catálogo: deve continuar funcionando ✅
   - yoobe.co: deve funcionar após propagar ✅

Tudo funcionará sem quebrar nada! 🎉
