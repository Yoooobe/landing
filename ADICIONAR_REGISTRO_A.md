# ➕ Adicionar Registro A no Google Cloud DNS

## 📋 Situação Atual

Você já tem os registros automáticos:
- ✅ **SOA** (Start of Authority) - não mexer
- ✅ **NS** (Name Servers) - não mexer

**Agora precisa adicionar:** Registro **A** para `yoobe.co` → `34.8.255.48`

---

## ✅ Passo a Passo: Adicionar Registro A

### **PASSO 1: Na página de registros DNS**

Você está vendo a lista de registros. Agora:

1. Clique no botão **"ADD RECORD SET"** ou **"Adicionar registro"**
   - Geralmente está no topo da página, à direita

### **PASSO 2: Preencher o formulário**

Preencha os campos assim:

1. **DNS name:**
   - Deixe em **BRANCO** (vazio)
   - OU digite: `yoobe.co.` (com ponto no final)
   - ⚠️ Se deixar em branco, será para o domínio raiz (`yoobe.co`)

2. **Resource record type:**
   - Selecione: **`A`**

3. **TTL (seconds):**
   - Digite: `3600`
   - OU deixe o padrão (geralmente 300 ou 3600)

4. **IPv4 address:**
   - Digite: `34.8.255.48`
   - Este é o IP do seu Load Balancer

### **PASSO 3: Salvar**

1. Clique em **"CREATE"** ou **"Salvar"**

2. O registro será adicionado à lista

---

## ✅ Resultado Esperado

Após adicionar, você terá **3 tipos de registros**:

1. ✅ **SOA** - `yoobe.co.` (automático, não mexer)
2. ✅ **NS** - `yoobe.co.` (automático, não mexer)
3. ✅ **A** - `yoobe.co.` → `34.8.255.48` (você acabou de adicionar)

---

## 📸 Como Deve Ficar

Após adicionar, a lista deve mostrar algo assim:

```
DNS name          Type    TTL      Record data
─────────────────────────────────────────────────────────────
yoobe.co.         SOA     21600    ns-cloud-a1.googledomains.com. ...
yoobe.co.         NS      21600    ns-cloud-a1.googledomains.com.
                                   ns-cloud-a2.googledomains.com.
                                   ns-cloud-a3.googledomains.com.
                                   ns-cloud-a4.googledomains.com.
yoobe.co.         A       3600     34.8.255.48  ← NOVO!
```

---

## ⚠️ Importante

- ✅ **NÃO delete** os registros SOA e NS
- ✅ **NÃO modifique** os registros SOA e NS
- ✅ **Apenas adicione** o registro A
- ✅ Se houver outros registros (MX, TXT, CNAME), **não mexa neles**

---

## 🔍 Verificar Após Adicionar

1. **Na lista de registros:**
   - Deve aparecer o registro A com `34.8.255.48`

2. **Aguardar propagação:**
   - 1-24 horas (geralmente mais rápido)

3. **Testar:**
   ```bash
   nslookup yoobe.co 8.8.8.8
   ```
   Deve mostrar: `34.8.255.48`

---

## 🎯 Resumo

1. Clique em **"ADD RECORD SET"**
2. **DNS name:** deixe em branco OU `yoobe.co.`
3. **Type:** `A`
4. **TTL:** `3600`
5. **IPv4 address:** `34.8.255.48`
6. Clique em **"CREATE"**

Pronto! 🎉
