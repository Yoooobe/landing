# 🔧 Corrigir IP do DNS e Nameservers no name.com

## ⚠️ Problemas Identificados

1. **Registro A com IP errado:**

   - ❌ IP atual no name.com: `199.36.158.100`
   - ✅ IP correto: `34.8.255.48`

2. **Nameservers não configurados:**
   - ⚠️ Aviso: "This domain is not using name.com nameservers"
   - Isso impede que as mudanças DNS sejam aplicadas!

---

## 🔧 Solução: Corrigir Ambos os Problemas

### **PASSO 1: Atualizar Nameservers (FAZER PRIMEIRO!)**

1. Na página de DNS do name.com, você verá o aviso no topo

2. Clique no botão **"Update Nameservers"** (botão cinza escuro)

3. Configure para usar os nameservers padrão do name.com:

   - Selecione **"Use name.com nameservers"** ou **"Default nameservers"**
   - Salve

4. ⚠️ **IMPORTANTE:** Aguarde alguns minutos após atualizar os nameservers antes de editar os registros DNS

---

### **PASSO 2: Editar o Registro A**

1. Na lista de registros DNS, encontre o registro **A** para `yoobe.co`

2. Você verá:

   - **TYPE:** A
   - **HOST:** `yoobe.co`
   - **ANSWER:** `199.36.158.100` ← **IP ERRADO!**

3. Clique em **"Edit"** (ao lado do registro A)

4. No campo **"ANSWER"**, altere de:

   - `199.36.158.100` (IP antigo/errado)

5. Para:

   - `34.8.255.48` (IP correto do Load Balancer)

6. Clique em **"Save"** ou **"Update"**

---

### **PASSO 3: Verificar Após Salvar**

Após salvar, o registro deve mostrar:

- **TYPE:** A
- **HOST:** `yoobe.co`
- **ANSWER:** `34.8.255.48` ✅ (IP correto)

---

## ⏱️ Aguardar Propagação

Após corrigir ambos:

1. **Nameservers:** 1-48 horas para propagar
2. **DNS Records:** 1-24 horas após nameservers propagarem
3. **Certificado SSL:** Até 1 hora após DNS propagar

---

## ✅ Verificação

### **Após 1-2 horas, verifique:**

1. **Nameservers:**

   ```bash
   whois yoobe.co | grep -i "name server"
   ```

   Deve mostrar nameservers do name.com

2. **DNS:**

   ```bash
   nslookup yoobe.co 8.8.8.8
   ```

   Deve mostrar: `34.8.255.48`

3. **Verificação Global:**
   - https://www.whatsmydns.net/#A/yoobe.co
   - Deve começar a mostrar `34.8.255.48` em vários locais

---

## 📋 Checklist

- [ ] Atualizou nameservers para name.com (clicou em "Update Nameservers")
- [ ] Aguardou alguns minutos após atualizar nameservers
- [ ] Editou registro A: `yoobe.co` → `34.8.255.48`
- [ ] Salvou as alterações
- [ ] Verificou que não há mais aviso sobre nameservers
- [ ] Aguardou propagação (1-48 horas)

---

## 🎯 Ordem Correta

**IMPORTANTE:** Faça nesta ordem:

1. ✅ **PRIMEIRO:** Atualizar nameservers
2. ⏳ **AGUARDE:** Alguns minutos
3. ✅ **DEPOIS:** Editar registro A para `34.8.255.48`
4. ⏳ **AGUARDE:** Propagação (1-48 horas)

---

## 🆘 Por Que o IP Está Diferente?

O registro A no name.com mostra `199.36.158.100`, mas o DNS global mostra `34.63.42.231`. Isso pode acontecer porque:

1. **Nameservers não estão configurados** → As mudanças no name.com não são aplicadas
2. **DNS está sendo resolvido pelos nameservers antigos** → Que apontam para `34.63.42.231`
3. **Registro A no name.com não está sendo usado** → Porque nameservers não são do name.com

**Solução:** Atualizar nameservers PRIMEIRO, depois editar o registro A.

---

## 🚀 Próximos Passos

1. ✅ **Atualizar nameservers** (clique em "Update Nameservers")
2. ⏳ **Aguardar alguns minutos**
3. ✅ **Editar registro A** para `34.8.255.48`
4. ⏳ **Aguardar propagação** (1-48 horas)
5. ✅ **Verificar** com `nslookup` e sites de verificação global

---

## 📝 Resumo

**Problemas encontrados:**

- ❌ Registro A com IP errado: `199.36.158.100`
- ❌ Nameservers não configurados para name.com

**Solução:**

1. Atualizar nameservers para name.com
2. Editar registro A para `34.8.255.48`
3. Aguardar propagação

**Após corrigir:**

- Nameservers propagarão (1-48 horas)
- DNS começará a apontar para `34.8.255.48`
- Certificado SSL será provisionado
- Site funcionará em `https://yoobe.co`

Corrija ambos os problemas e aguarde a propagação! 🎯
