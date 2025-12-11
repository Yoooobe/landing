# 🌐 Configurar DNS do Domínio yoobe.co

## ✅ Status Atual

O Load Balancer foi criado com sucesso! Agora só falta configurar o DNS.

**IP do Load Balancer:** `34.8.255.48` ← **ANOTE ESTE IP!**

---

## 📋 Passo a Passo: Configurar DNS

### **PASSO 1: Acessar o Painel do Seu Registrador de Domínio**

1. Acesse o site do seu registrador de domínio (onde você comprou `yoobe.co`)

   - Exemplos: GoDaddy, Namecheap, Google Domains, Registro.br, etc.

2. Faça login na sua conta

3. Vá para as configurações de **DNS** ou **Gerenciamento de DNS**

---

### **PASSO 2: Adicionar Registro A**

1. Procure por uma opção como:

   - **"Adicionar registro"**
   - **"Add record"**
   - **"Gerenciar DNS"**
   - **"DNS Records"**

2. Adicione um novo registro **A**:

   - **Tipo:** `A` (ou "A Record")
   - **Nome/Host:**
     - `@` OU
     - `yoobe.co` OU
     - Deixe em branco (depende do seu provedor)
   - **Valor/Conteúdo:** `34.8.255.48` (IP do Load Balancer)
   - **TTL:** `3600` ou deixe o padrão

3. Salve o registro

---

### **PASSO 3: (Opcional) Adicionar Registro CNAME para www**

Se você quiser que `www.yoobe.co` também funcione:

1. Adicione um novo registro **CNAME**:

   - **Tipo:** `CNAME`
   - **Nome/Host:** `www`
   - **Valor/Conteúdo:** `yoobe.co`
   - **TTL:** `3600` ou deixe o padrão

2. Salve o registro

---

## ⏱️ Aguardar Propagação

### **Tempos Esperados:**

1. **DNS:** 1-2 horas (pode levar até 48 horas)
2. **Certificado SSL:** Até 1 hora após o DNS propagar

---

## ✅ Verificar Propagação do DNS

### **Método 1: Via Terminal**

```bash
nslookup yoobe.co
```

Ou:

```bash
dig yoobe.co
```

**Resultado esperado:** Deve mostrar o IP `34.8.255.48`

### **Método 2: Via Site Online**

Acesse: https://www.whatsmydns.net/#A/yoobe.co

Verifique se o IP `34.8.255.48` aparece em vários locais do mundo.

---

## ✅ Verificar Status do Certificado SSL

Após o DNS propagar, verifique o certificado:

1. Acesse: https://console.cloud.google.com/net-services/load-balancing/ssl-certificates?project=institucional-480905

2. Procure pelo certificado: `yoobe-co-cert`

3. Verifique o status:
   - **"Active"** ou **"Provisioned"** = ✅ Pronto!
   - **"Provisioning"** = ⏳ Ainda sendo provisionado (aguarde)
   - **"Failed"** = ❌ Erro (verifique DNS)

---

## 🚀 Testar o Site

Após o DNS propagar e o certificado estar ativo:

1. Acesse: **https://yoobe.co**
2. Você deve ver a página de "Em Atualização"!

---

## 🆘 Troubleshooting

### DNS não propaga após 2 horas:

- Verifique se o registro A está correto
- Verifique se o IP está correto: `34.8.255.48`
- Tente limpar o cache do DNS: `sudo dscacheutil -flushcache` (macOS)

### Certificado não provisiona:

- Verifique se o DNS está propagado corretamente
- Verifique se o IP aponta para `34.8.255.48`
- Aguarde até 1 hora após o DNS propagar

### Site não carrega:

- Verifique se o DNS propagou: `nslookup yoobe.co`
- Verifique se o certificado está "Active"
- Verifique se o arquivo `index.html` está no bucket
- Aguarde até 48 horas para propagação completa

---

## 📝 Checklist Final

- [ ] Registro A criado apontando para `34.8.255.48`
- [ ] Registro CNAME para www criado (opcional)
- [ ] DNS propagado (verificado com `nslookup`)
- [ ] Certificado SSL está "Active"
- [ ] Site acessível em `https://yoobe.co`

---

## 🎉 Pronto!

Após configurar o DNS e aguardar a propagação, seu site estará disponível em:

- ✅ **https://yoobe.co**
- ✅ **https://www.yoobe.co**

Parabéns! 🚀
