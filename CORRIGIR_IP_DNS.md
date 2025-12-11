# 🔧 Corrigir IP do DNS no name.com

## ⚠️ Problema Identificado

O DNS está propagando, mas está apontando para o IP **errado**:

- ❌ **IP atual:** `34.63.42.231` (incorreto)
- ✅ **IP correto:** `34.8.255.48` (IP do Load Balancer)

---

## 🔧 Solução: Corrigir o Registro A

### **PASSO 1: Acessar o Painel DNS do name.com**

1. Acesse: https://name.com/account/domain/details/yoobe.co/dns

2. Faça login na sua conta

---

### **PASSO 2: Editar o Registro A**

1. Na lista de registros DNS, encontre o registro **A** para `yoobe.co`

2. Você verá algo como:

   - **TYPE:** A
   - **HOST:** `yoobe.co`
   - **ANSWER:** `34.63.42.231` ← **ESTE É O IP ERRADO!**

3. Clique em **"Edit"** (ao lado do registro A)

---

### **PASSO 3: Atualizar o IP**

1. No campo **"ANSWER"** ou **"Value"**, altere de:

   - `34.63.42.231` (IP antigo/errado)

2. Para:

   - `34.8.255.48` (IP correto do Load Balancer)

3. Clique em **"Save"** ou **"Update"**

---

### **PASSO 4: Verificar**

Após salvar, o registro deve mostrar:

- **TYPE:** A
- **HOST:** `yoobe.co`
- **ANSWER:** `34.8.255.48` ✅ (IP correto)

---

## ⏱️ Aguardar Propagação

Após corrigir:

1. **DNS:** 1-2 horas para propagar (pode levar até 48 horas)

2. **Verificar:**
   ```bash
   nslookup yoobe.co
   ```
   Deve mostrar: `34.8.255.48` (não mais `34.63.42.231`)

---

## ✅ Verificação

### **Após 1-2 horas, verifique novamente:**

```bash
nslookup yoobe.co
```

**Resultado esperado:**

```
Name: yoobe.co
Address: 34.8.255.48  ← IP correto!
```

### **Ou use site online:**

Acesse: https://www.whatsmydns.net/#A/yoobe.co

Deve mostrar `34.8.255.48` em vários locais do mundo.

---

## 🆘 Se Não Conseguir Editar

### **Opção 1: Deletar e Recriar**

1. **Delete** o registro A antigo (com IP `34.63.42.231`)

2. **Crie** um novo registro A:

   - **TYPE:** A
   - **HOST:** `yoobe.co`
   - **ANSWER:** `34.8.255.48`
   - **TTL:** `300` ou `3600`

3. Salve

### **Opção 2: Verificar se Há Múltiplos Registros**

Pode haver mais de um registro A. Verifique:

1. Procure por **todos** os registros A na lista
2. Se houver múltiplos, edite ou delete os que estão com IP errado
3. Deixe apenas um registro A apontando para `34.8.255.48`

---

## 📋 Checklist

- [ ] Acessou o painel DNS do name.com
- [ ] Encontrou o registro A com IP `34.63.42.231`
- [ ] Editou o registro A para IP `34.8.255.48`
- [ ] Salvou as alterações
- [ ] Aguardou 1-2 horas
- [ ] Verificou com `nslookup yoobe.co` (deve mostrar `34.8.255.48`)

---

## 🎯 Resumo

**Problema:**

- DNS apontando para IP errado: `34.63.42.231`

**Solução:**

- Editar registro A no name.com para: `34.8.255.48`

**Após corrigir:**

- Aguardar propagação (1-2 horas)
- Verificar com `nslookup`
- Testar site em `https://yoobe.co`

---

## 🚀 Próximo Passo

1. **Edite o registro A** no name.com agora
2. **Aguarde 1-2 horas**
3. **Verifique novamente:**
   ```bash
   nslookup yoobe.co
   ```
4. **Teste o site:** https://yoobe.co

Corrija o IP no name.com e aguarde a propagação! 🎯
