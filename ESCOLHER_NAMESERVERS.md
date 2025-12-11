# 🔀 Escolher Nameservers: Template name.com ou Manter Google Cloud?

## 📋 Situação Atual

Você tem duas opções:

1. **Usar nameservers do name.com** (recomendado para sua situação)
2. **Manter nameservers do Google Cloud** e configurar DNS lá

---

## ✅ Opção 1: Usar Template do name.com (RECOMENDADO)

### **Por Que Recomendo Esta Opção:**

- ✅ Você já está configurando DNS no name.com
- ✅ Mais simples - tudo em um lugar só
- ✅ O registro A já está correto no name.com (`34.8.255.48`)
- ✅ Funciona imediatamente após mudar nameservers

### **Como Fazer:**

1. Na página "Manage Nameservers", você verá o botão **"Use Default Nameservers"**

2. **OU** use o template:

   - Clique no dropdown **"Nameserver Templates"**
   - Selecione: **`[ns1-ns4].name.com`**
   - Isso preencherá automaticamente os 4 nameservers do name.com

3. Clique em **"Save"** ou **"Update"**

4. Os nameservers serão atualizados para:

   - `ns1.name.com`
   - `ns2.name.com`
   - `ns3.name.com`
   - `ns4.name.com`

5. Aguarde alguns minutos

6. Após isso, os registros DNS que você configurou no name.com começarão a funcionar!

---

## ✅ Opção 2: Manter Google Cloud DNS

### **Se Você Quiser Manter os Nameservers do Google Cloud:**

Você pode manter os nameservers atuais (`ns-cloud-d1.googledomains.com`, etc.) e configurar o DNS diretamente no Google Cloud DNS.

### **Como Fazer:**

1. **Mantenha os nameservers do Google Cloud** (não mude nada)

2. **Acesse Google Cloud DNS:**

   - https://console.cloud.google.com/net-services/dns/zones?project=institucional-480905

3. **Encontre ou crie a zona DNS para `yoobe.co`**

4. **Adicione o registro A:**

   - **DNS name:** `yoobe.co.` (com ponto no final)
   - **Resource record type:** `A`
   - **IPv4 address:** `34.8.255.48`
   - **TTL:** `3600`

5. Salve

### **Vantagens:**

- ✅ Mantém tudo no Google Cloud
- ✅ Integração com outros serviços GCP

### **Desvantagens:**

- ⚠️ Precisa configurar em outro lugar (Google Cloud DNS)
- ⚠️ O registro A no name.com não será usado

---

## 🎯 Recomendação

**Use o template do name.com** porque:

1. ✅ Você já configurou o registro A no name.com (`34.8.255.48`)
2. ✅ É mais simples - tudo em um lugar
3. ✅ Funciona imediatamente após mudar nameservers
4. ✅ Não precisa configurar em outro lugar

---

## 📋 Passo a Passo: Usar Template name.com

### **PASSO 1: Selecionar Template**

1. Na página "Manage Nameservers"
2. Clique no dropdown **"Nameserver Templates"**
3. Selecione: **`[ns1-ns4].name.com`**

### **PASSO 2: Verificar Nameservers**

Os nameservers devem ser preenchidos automaticamente:

- `ns1.name.com`
- `ns2.name.com`
- `ns3.name.com`
- `ns4.name.com`

### **PASSO 3: Salvar**

1. Clique em **"Save"** ou **"Update"**
2. Confirme a ação se solicitado
3. Aguarde alguns minutos

### **PASSO 4: Verificar**

Após alguns minutos, verifique:

```bash
whois yoobe.co | grep -i "name server"
```

Deve mostrar os nameservers do name.com.

---

## ⏱️ Após Mudar Nameservers

1. **Nameservers:** 1-48 horas para propagar
2. **DNS Records:** Após nameservers propagarem, o registro A (`34.8.255.48`) começará a funcionar
3. **Certificado SSL:** Até 1 hora após DNS propagar

---

## ✅ Verificação

### **Após 1-2 horas:**

1. **Verificar nameservers:**

   ```bash
   whois yoobe.co | grep -i "name server"
   ```

   Deve mostrar: `ns1.name.com`, `ns2.name.com`, etc.

2. **Verificar DNS:**

   ```bash
   nslookup yoobe.co 8.8.8.8
   ```

   Deve mostrar: `34.8.255.48`

3. **Verificação global:**
   - https://www.whatsmydns.net/#A/yoobe.co
   - Deve começar a mostrar `34.8.255.48`

---

## 🎯 Resumo

**Recomendação:** Use o template `[ns1-ns4].name.com`

**Por quê:**

- Você já configurou tudo no name.com
- Mais simples e direto
- Funciona imediatamente

**Como fazer:**

1. Selecione o template `[ns1-ns4].name.com`
2. Salve
3. Aguarde propagação (1-48 horas)

---

## 📝 Checklist

- [ ] Selecionou template `[ns1-ns4].name.com`
- [ ] Nameservers foram atualizados
- [ ] Salvou as alterações
- [ ] Aguardou alguns minutos
- [ ] Verificou nameservers com `whois`
- [ ] Aguardou propagação (1-48 horas)
- [ ] Verificou DNS com `nslookup`

---

## 🚀 Próximo Passo

**Use o template do name.com!** Selecione `[ns1-ns4].name.com` no dropdown e salve. Em algumas horas, tudo estará funcionando! 🎉
