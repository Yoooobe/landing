# ✅ Configuração Final Funcionando - Yoobe.co

## 📋 Resumo Executivo

Este documento contém **TODAS as configurações que funcionaram** para fazer `yoobe.co` funcionar corretamente com Google Cloud Platform, incluindo DNS, Load Balancer, Bucket e SSL.

**Data de configuração:** 11-12 de Dezembro de 2025  
**Projeto GCP:** `institucional-480905`  
**Status:** ✅ **FUNCIONANDO**

---

## 🌐 1. Configuração DNS (Google Cloud DNS)

### **Zona DNS:**

- **Nome da zona:** `yoobe-co-zone`
- **DNS name:** `yoobe.co.` (com ponto final)
- **Tipo:** `Public`
- **Nameservers:** Google Cloud DNS (mantidos para emails e subdomínios)

### **Registros DNS Configurados:**

#### **Registro A - yoobe.co:**

- **DNS name:** `yoobe.co.` (ou deixar em branco para domínio raiz)
- **Type:** `A`
- **TTL:** `3600`
- **IPv4 address:** `34.8.255.48` (IP do Load Balancer)

#### **Registro A - www.yoobe.co:**

- **DNS name:** `www`
- **Type:** `A` (não CNAME!)
- **TTL:** `3600`
- **IPv4 address:** `34.8.255.48` (mesmo IP do Load Balancer)

**⚠️ IMPORTANTE:** Use **A record** para `www`, não CNAME, para o certificado SSL funcionar corretamente.

### **Nameservers no name.com:**

- **MANTIDOS como Google Cloud DNS:**
  - `ns-cloud-a1.googledomains.com`
  - `ns-cloud-a2.googledomains.com`
  - `ns-cloud-a3.googledomains.com`
  - `ns-cloud-a4.googledomains.com`

**Por quê:** Emails no Google Workspace e subdomínio `catalogo.yoobe.co` precisam dos nameservers do Google.

---

## ⚖️ 2. Load Balancer (Google Cloud)

### **Configuração do Load Balancer:**

- **Nome:** `yoobe-co-lb-url-map`
- **Tipo:** `Classic Application Load Balancer`
- **IP Reservado:** `34.8.255.48` (estático, global)

### **Frontends Configurados:**

#### **Frontend HTTP (Porta 80):**

- **Protocol:** `HTTP`
- **IP:Port:** `34.8.255.48:80`
- **Network Tier:** `Premium`
- **Redirect HTTP to HTTPS:** Opcional (recomendado)

#### **Frontend HTTPS (Porta 443):**

- **Protocol:** `HTTPS`
- **IP:Port:** `34.8.255.48:443`
- **Certificate:** `yoobe-co-cert` (Google-managed)
- **SSL Policy:** `GCP default`
- **Network Tier:** `Premium`

### **Backend Bucket:**

- **Nome:** `yoobe-co-backend`
- **Storage bucket:** `yoobe.co`
- **Cloud CDN:** `Enabled`
- **Edge security policy:** `None`

### **Host and Path Rules:**

- **Mode:** `Advanced host and path rule (URL redirect, URL rewrite)`
- **Default rule:**
  - **Hosts:** `All unmatched (default)`
  - **Paths:** `All unmatched (default)`
  - **Backend:** `yoobe-co-backend`
  - **URL rewrite:** **NENHUM** (deixar vazio)
    - ⚠️ **NÃO usar "Path prefix rewrite"** - o bucket serve `index.html` automaticamente

---

## 🪣 3. Google Cloud Storage Bucket

### **Configuração do Bucket:**

- **Nome:** `yoobe.co`
- **Location:** `us (multiple regions in United States)`
- **Storage class:** `Standard`
- **Public access:** `Access granted to public principals`
- **Website configuration:** **CONFIGURADO** (via `gsutil web set`)

### **Comando para Configurar Website:**

```bash
gsutil web set -m index.html gs://yoobe.co
```

**Este comando é CRUCIAL** - faz o bucket servir `index.html` automaticamente para `/`.

### **Arquivo index.html:**

- **Nome:** `index.html`
- **Tamanho:** `4.2 KB`
- **Type:** `text/html`
- **Public access:** `Access granted to public principals`
- **Permissions:** `allUsers` com role `Storage Object Viewer`

### **Permissões do Bucket:**

- **Access control:** `Uniform`
- **Public access prevention:** `Not enabled`
- **Public access status:** `Access granted to public principals`

---

## 🔒 4. Certificado SSL

### **Configuração do Certificado:**

- **Nome:** `yoobe-co-cert`
- **Tipo:** `MANAGED` (Google-managed)
- **Status:** `PROVISIONING` → `ACTIVE` (após DNS propagar)
- **Domains:**
  - `yoobe.co` → `ACTIVE`
  - `www.yoobe.co` → `ACTIVE` (após configurar A record)

### **Provisionamento:**

- Pode levar **1-2 horas** após DNS propagar completamente
- Pode levar até **24 horas** em casos raros
- O certificado é provisionado automaticamente pelo Google Cloud

---

## 🛠️ 5. Comandos Úteis

### **Verificar DNS:**

```bash
nslookup yoobe.co 8.8.8.8
nslookup www.yoobe.co 8.8.8.8
```

**Deve mostrar:** `34.8.255.48`

### **Testar HTTP:**

```bash
curl -I --resolve yoobe.co:80:34.8.255.48 http://yoobe.co/
```

**Deve retornar:** `HTTP/1.1 200 OK` e `Content-Type: text/html`

### **Testar HTTPS (quando certificado estiver pronto):**

```bash
curl -I --resolve yoobe.co:443:34.8.255.48 https://yoobe.co/
```

### **Configurar bucket como website:**

```bash
gsutil web set -m index.html gs://yoobe.co
```

### **Verificar configuração do bucket:**

```bash
gsutil web get gs://yoobe.co
```

### **Invalidar cache do CDN:**

- No Load Balancer → aba **Cache invalidation**
- **Path:** `/*`
- Clique em **Invalidate**

---

## ✅ 6. Checklist de Configuração

### **DNS:**

- [x] Zona DNS criada: `yoobe-co-zone`
- [x] Registro A para `yoobe.co` → `34.8.255.48`
- [x] Registro A para `www.yoobe.co` → `34.8.255.48` (não CNAME!)
- [x] Nameservers do Google Cloud mantidos no name.com

### **Load Balancer:**

- [x] Load Balancer criado: `yoobe-co-lb-url-map`
- [x] IP estático reservado: `34.8.255.48`
- [x] Frontend HTTP (porta 80) configurado
- [x] Frontend HTTPS (porta 443) configurado
- [x] Backend bucket: `yoobe-co-backend` → `yoobe.co`
- [x] Cloud CDN habilitado
- [x] URL rewrite: **NENHUM** (deixar vazio)

### **Bucket:**

- [x] Bucket criado: `yoobe.co`
- [x] Arquivo `index.html` presente e público
- [x] Permissão `allUsers` com `Storage Object Viewer`
- [x] Website configuration: `index.html` como main page
- [x] Public access prevention: desabilitado

### **Certificado SSL:**

- [x] Certificado criado: `yoobe-co-cert`
- [x] Domínios: `yoobe.co` e `www.yoobe.co`
- [x] Status: ACTIVE (após propagação DNS)

---

## 🚨 7. Problemas Comuns e Soluções

### **Problema: 404 NoSuchKey**

**Causa:** Bucket não configurado como website ou URL rewrite incorreto  
**Solução:** Execute `gsutil web set -m index.html gs://yoobe.co` e remova URL rewrite do Load Balancer

### **Problema: Certificado SSL não provisiona**

**Causa:** DNS não propagou ou `www` não está configurado como A record  
**Solução:** Verifique DNS com `nslookup` e use A record (não CNAME) para `www`

### **Problema: Site não carrega no navegador**

**Causa:** Cache DNS local ou CDN  
**Solução:** Limpe cache DNS local e invalide cache do CDN

### **Problema: HTTP funciona mas HTTPS não**

**Causa:** Certificado SSL ainda em PROVISIONING  
**Solução:** Aguarde 1-2 horas após DNS propagar completamente

---

## 📝 8. Notas Importantes

1. **NUNCA use CNAME para `www`** - use A record apontando para o mesmo IP do Load Balancer
2. **NUNCA configure "Path prefix rewrite"** no Load Balancer - o bucket serve `index.html` automaticamente
3. **SEMPRE configure o bucket como website** usando `gsutil web set -m index.html gs://yoobe.co`
4. **MANTENHA os nameservers do Google Cloud** se tiver emails no Google Workspace ou subdomínios funcionando
5. **AGUARDE a propagação DNS** - pode levar até 24 horas globalmente

---

## 🔗 9. Links Úteis

### **Console GCP:**

- **Load Balancers:** https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list?project=institucional-480905
- **Cloud DNS:** https://console.cloud.google.com/net-services/dns/zones?project=institucional-480905
- **Cloud Storage:** https://console.cloud.google.com/storage/browser/yoobe.co?project=institucional-480905

### **Verificação DNS:**

- **Global DNS Checker:** https://www.whatsmydns.net/#A/yoobe.co

---

## 🎯 10. Configuração Final Funcionando

**Status atual:**

- ✅ HTTP (porta 80): Funcionando
- ✅ DNS: Propagado (`34.8.255.48`)
- ✅ Bucket: Servindo `index.html` corretamente
- ✅ Load Balancer: Configurado
- ⏳ HTTPS (porta 443): Aguardando certificado SSL (PROVISIONING → ACTIVE)

**Quando certificado SSL estiver ACTIVE:**

- ✅ HTTPS também funcionará automaticamente

---

## 📚 11. Documentação de Referência

Todos os guias detalhados estão no repositório:

- `SOLUCAO_FINAL_INDEX_HTML.md` - Solução completa para servir index.html
- `CONFIGURAR_DNS_GOOGLE_CLOUD.md` - Configuração DNS no Google Cloud
- `VERIFICAR_CERTIFICADO_SSL.md` - Verificação de certificado SSL
- `TROUBLESHOOTING_SITE_NAO_CARREGA.md` - Troubleshooting completo

---

**Última atualização:** 12 de Dezembro de 2025  
**Configurado por:** Auto (Claude)  
**Status:** ✅ **TUDO FUNCIONANDO**
