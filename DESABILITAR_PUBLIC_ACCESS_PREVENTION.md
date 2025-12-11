# 🔓 Como Desabilitar Public Access Prevention

## ⚠️ Problema Identificado

Você está recebendo o erro:

> **"Principals allUsers and allAuthenticatedUsers cannot be added since public access prevention is enforced on this bucket."**

Isso acontece porque o bucket tem **"Public Access Prevention"** habilitado, que impede acesso público.

---

## 📋 Passo a Passo para Desabilitar

### **PASSO 1: Acessar Configurações do Bucket**

1. Na página do bucket `yoobe.co`, clique na aba **"PERMISSIONS"** (no topo)

2. **OU** clique no botão **"EDIT"** (ícone de lápis) no topo da página

---

### **PASSO 2: Desabilitar Public Access Prevention**

1. Na página de configurações, procure pela seção **"Public access prevention"**

2. Você verá que está configurado como **"Enforced"** (habilitado)

3. Clique no botão **"EDIT"** ao lado de "Public access prevention"

4. Na janela que abrir:

   - Selecione a opção: **"Not enforced"** ou **"Off"**
   - ⚠️ **ATENÇÃO:** Uma mensagem de aviso aparecerá informando sobre os riscos de tornar o bucket público
   - Isso é esperado para um site estático público

5. Clique em **"SAVE"** ou **"Update"**

6. Confirme a ação se solicitado

---

### **PASSO 3: Agora Tornar o Bucket Público**

Após desabilitar o Public Access Prevention, você pode seguir os passos anteriores:

1. Na aba **"PERMISSIONS"**, clique em **"GRANT ACCESS"** ou **"Add principal"**

2. Configure:

   - **New principals:** Digite: `allUsers`
   - **Select a role:** Escolha: **"Storage Object Viewer"**

3. Clique em **"SAVE"**

4. Confirme clicando em **"ALLOW PUBLIC ACCESS"**

---

## ✅ Verificação

Após seguir os passos:

- [ ] Public Access Prevention está como **"Not enforced"** ou **"Off"**
- [ ] Bucket está configurado como **"Public"**
- [ ] Permissão `allUsers` com role "Storage Object Viewer" foi adicionada

---

## 🆘 Se Não Encontrar a Opção

### Alternativa: Via gcloud CLI

Se não conseguir encontrar a opção no console, você pode usar a linha de comando:

```bash
# Desabilitar Public Access Prevention
gsutil pap set unenforced gs://yoobe.co/

# Tornar público
gsutil iam ch allUsers:objectViewer gs://yoobe.co/
```

---

## 📝 Nota de Segurança

⚠️ **Importante:** Ao desabilitar o Public Access Prevention e tornar o bucket público:

- Qualquer pessoa na internet poderá acessar os arquivos
- Certifique-se de que não há informações sensíveis no bucket
- Para um site estático público, isso é o comportamento esperado

---

## 🚀 Próximos Passos

Após tornar o bucket público:

1. ✅ Configure como site estático (Main page: `index.html`)
2. ✅ Faça upload do arquivo `index.html` ou aguarde o deploy automático
3. ✅ Teste o site em: https://yoobe.co
