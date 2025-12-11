# ✅ O Que Fazer Após Trocar os Nameservers

## 🎯 Status Atual

Você já trocou os nameservers para o name.com! Agora os registros DNS que você configurou no name.com vão começar a funcionar.

---

## ✅ O Que Já Está Configurado

- ✅ Nameservers: Agora usando name.com
- ✅ Registro A: `yoobe.co` → `34.8.255.48` ✅
- ✅ Registro CNAME: `www.yoobe.co` → `yoobe.co` ✅

**Tudo está correto!** Agora é só aguardar a propagação.

---

## ⏱️ Aguardar Propagação

### **Tempos Esperados:**

1. **Nameservers:** 1-48 horas para propagar globalmente
2. **DNS Records:** Após nameservers propagarem, os registros A e CNAME começarão a funcionar
3. **Certificado SSL:** Até 1 hora após o DNS propagar

---

## ✅ Verificar Propagação

### **1. Verificar Nameservers:**

```bash
whois yoobe.co | grep -i "name server"
```

Ou use: https://www.whatsmydns.net/#NS/yoobe.co

**Resultado esperado:** Deve mostrar nameservers do name.com (ex: `ns1.name.com`, `ns2.name.com`)

### **2. Verificar DNS (Registro A):**

```bash
nslookup yoobe.co
```

Ou:

```bash
dig yoobe.co
```

**Resultado esperado:** Deve mostrar o IP `34.8.255.48`

Ou use: https://www.whatsmydns.net/#A/yoobe.co

---

## 🔒 Verificar Certificado SSL

Após o DNS propagar, verifique o certificado:

1. Acesse: https://console.cloud.google.com/net-services/load-balancing/ssl-certificates?project=institucional-480905

2. Procure pelo certificado: `yoobe-co-cert`

3. Verifique o status:
   - **"Active"** ou **"Provisioned"** = ✅ Pronto!
   - **"Provisioning"** = ⏳ Ainda sendo provisionado (aguarde até 1 hora)
   - **"Failed"** = ❌ Erro (verifique se DNS está correto)

---

## 🚀 Testar o Site

Após tudo propagar:

1. **Aguarde:** 1-2 horas (pode levar até 48 horas)

2. **Teste o DNS:**

   ```bash
   nslookup yoobe.co
   ```

   Deve mostrar: `34.8.255.48`

3. **Teste o site:**
   - Acesse: **https://yoobe.co**
   - Você deve ver a página de "Em Atualização"!

---

## 📋 Checklist de Verificação

- [x] Nameservers trocados para name.com ✅
- [x] Registro A configurado: `yoobe.co` → `34.8.255.48` ✅
- [x] Registro CNAME configurado: `www.yoobe.co` → `yoobe.co` ✅
- [ ] Nameservers propagados (verificado com `whois` ou site online)
- [ ] DNS propagado (verificado com `nslookup` - deve mostrar `34.8.255.48`)
- [ ] Certificado SSL está "Active" ou "Provisioning"
- [ ] Site acessível em `https://yoobe.co`

---

## 🆘 Troubleshooting

### Nameservers não propagaram após 2 horas:

- Isso é normal! Pode levar até 48 horas
- Verifique em diferentes locais: https://www.whatsmydns.net/#NS/yoobe.co
- Alguns locais podem propagar mais rápido que outros

### DNS não mostra o IP correto:

- Aguarde mais tempo (pode levar até 48 horas)
- Verifique se o registro A está correto no name.com
- Limpe o cache do DNS local: `sudo dscacheutil -flushcache` (macOS)

### Certificado não provisiona:

- Verifique se o DNS está propagado corretamente
- Verifique se o IP aponta para `34.8.255.48`
- Aguarde até 1 hora após o DNS propagar
- O certificado só será provisionado após o DNS estar correto

### Site não carrega:

- Verifique se o DNS propagou: `nslookup yoobe.co`
- Verifique se o certificado está "Active"
- Verifique se o arquivo `index.html` está no bucket `yoobe.co`
- Aguarde até 48 horas para propagação completa

---

## 💡 Dicas

### **Acelerar Verificação:**

1. Use sites de verificação global:

   - https://www.whatsmydns.net/#A/yoobe.co
   - https://dnschecker.org/#A/yoobe.co

2. Verifique de diferentes locais para ver o progresso da propagação

### **Monitorar Progresso:**

1. **Agora (0 horas):** Nameservers podem não ter propagado ainda
2. **1-2 horas:** Nameservers começam a propagar
3. **2-24 horas:** DNS começa a funcionar em vários locais
4. **24-48 horas:** Propagação completa globalmente

---

## 🎯 Resumo

**O que você fez:**

- ✅ Trocou nameservers para name.com
- ✅ Configurou registros DNS corretamente

**O que falta:**

- ⏳ Aguardar propagação (1-48 horas)
- ⏳ Certificado SSL ser provisionado (até 1 hora após DNS propagar)

**Ação necessária:**

- ⏳ **Apenas aguardar!** Tudo está configurado corretamente.

---

## 🎉 Próximos Passos

1. **Aguarde 1-2 horas** e verifique a propagação:

   ```bash
   nslookup yoobe.co
   ```

2. **Após DNS propagar**, verifique o certificado SSL no console do GCP

3. **Teste o site:**

   - https://yoobe.co
   - https://www.yoobe.co

4. **Pronto!** 🚀

---

## 📞 Se Precisar de Ajuda

Se após 48 horas ainda não funcionar:

1. Verifique se os registros DNS estão corretos no name.com
2. Verifique se o Load Balancer está "Active" no GCP
3. Verifique se o certificado SSL foi provisionado
4. Verifique se o arquivo `index.html` está no bucket

Tudo está configurado corretamente! Agora é só aguardar a propagação! 🎉
