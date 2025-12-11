# ✅ Passo a Passo Rápido: Tornar Bucket Público

## 🎯 Solução Simples (2 Passos)

### **PASSO 1: Remover Public Access Prevention**

1. Na página de **"PERMISSIONS"** do bucket `yoobe.co`

2. Na seção **"Public access"** (card no topo esquerdo), você verá:

   - Status: **"Not public"**
   - Texto explicando que o acesso público está sendo prevenido
   - Botão azul: **"Remove Public Access Prevention"** ← **CLIQUE AQUI!**

3. Uma confirmação aparecerá - clique em **"CONFIRM"** ou **"REMOVE"**

4. Aguarde alguns segundos - o status deve mudar

---

### **PASSO 2: Tornar o Bucket Público**

1. Após remover o Public Access Prevention, clique no botão **"+ Grant access"** (no topo da tabela de permissões)

2. Na janela que abrir:

   - **New principals:** Digite: `allUsers`
   - **Select a role:** Escolha: **"Storage Object Viewer"**

3. Clique em **"SAVE"**

4. Uma confirmação aparecerá - clique em **"ALLOW PUBLIC ACCESS"**

5. Pronto! O bucket agora está público ✅

---

### **PASSO 3: Configurar como Site Estático**

1. Vá para a aba **"CONFIGURATION"** (ao lado de "PERMISSIONS")

2. Role até encontrar **"Website configuration"**

3. Clique em **"Edit website configuration"** ou **"Enable"**

4. Configure:

   - **Main page (index page):** `index.html`
   - **Error page (404 page):** Deixe em branco

5. Clique em **"SAVE"**

---

## ✅ Verificação Final

Após seguir os 3 passos acima:

- [ ] Public Access Prevention removido
- [ ] Status mostra **"Public"** em vez de "Not public"
- [ ] `allUsers` aparece na lista de permissões com role "Storage Object Viewer"
- [ ] Website configuration ativada com Main page: `index.html`

---

## 🚀 Próximo Passo: Upload do Arquivo

Agora você pode:

1. **Upload manual:** Na aba "Objects", clique em "UPLOAD" e selecione `index.html`
2. **OU aguarde o deploy automático:** O GitHub Actions fará o upload automaticamente

---

## 🎉 Pronto!

Após isso, seu site estará disponível em:

- https://yoobe.co
- https://storage.googleapis.com/yoobe.co/index.html
