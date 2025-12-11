# 🌐 Como Configurar o Bucket como Público e Site Estático

## ⚠️ Problema Identificado

O bucket `yoobe.co` foi criado, mas:

- ❌ Está vazio (sem arquivo `index.html`)
- ❌ Está como "Not public" (precisa ser público)
- ❌ Não está configurado como site estático

---

## 📋 Passo a Passo para Configurar

### **PASSO 1: Tornar o Bucket Público**

1. Na página do bucket `yoobe.co`, clique na aba **"PERMISSIONS"** (no topo)

2. Você verá uma seção chamada **"Public access"** que mostra **"Not public"**

3. Clique no botão **"GRANT ACCESS"** ou **"Add principal"** (botão azul)

4. Na janela que abrir:

   - **New principals:** Digite: `allUsers`
   - **Select a role:** Escolha: **"Storage Object Viewer"**
   - Clique em **"SAVE"**

5. Uma confirmação aparecerá avisando sobre acesso público:

   - Clique em **"ALLOW PUBLIC ACCESS"** para confirmar

6. Agora o bucket deve mostrar **"Public"** em vez de "Not public"

---

### **PASSO 2: Configurar como Site Estático**

1. Ainda na página do bucket, clique na aba **"CONFIGURATION"** ou **"PERMISSIONS"**

2. Role a página até encontrar a seção **"Website configuration"**

3. Clique em **"Edit website configuration"** ou **"Enable"**

4. Configure:

   - **Main page (index page):** Digite: `index.html`
   - **Error page (404 page):** Deixe em branco ou digite: `404.html` (opcional)

5. Clique em **"SAVE"**

---

### **PASSO 3: Fazer Upload do Arquivo (Temporário)**

Enquanto o deploy automático não funciona, você pode fazer upload manual:

1. Na aba **"Objects"** do bucket

2. Clique no botão **"UPLOAD"** (botão azul)

3. Selecione o arquivo `index.html` do seu computador:

   - Localização: `/Users/genautech/landing/index.html`

4. Clique em **"OPEN"** ou **"UPLOAD"**

5. Aguarde o upload concluir

---

### **PASSO 4: Verificar o Deploy Automático**

Após configurar o bucket, o deploy automático deve funcionar:

1. Acesse: https://github.com/Yoooobe/landing/actions

2. Verifique se há um workflow rodando ou que falhou

3. Se não houver workflow recente, faça um pequeno ajuste e commit:

```bash
cd /Users/genautech/landing
# Adicione um espaço ou comentário no index.html
git add .
git commit -m "Trigger deploy após configurar bucket"
git push origin main
```

---

## ✅ Checklist Final

Após seguir os passos acima, verifique:

- [ ] Bucket está configurado como **"Public"**
- [ ] Website configuration está ativada
- [ ] Main page configurada como `index.html`
- [ ] Arquivo `index.html` está no bucket (via upload manual ou deploy automático)
- [ ] Workflow do GitHub Actions está rodando/funcionando

---

## 🚀 Testar o Site

Após configurar tudo:

1. Acesse: **https://yoobe.co** ou **https://storage.googleapis.com/yoobe.co/index.html**

2. Você deve ver a página de "Em Atualização"

3. Se não aparecer:
   - Aguarde alguns minutos (propagação do CDN)
   - Faça hard refresh: `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
   - Tente em modo anônimo

---

## 🆘 Troubleshooting

### Erro: "Permission denied" ao fazer upload

- Verifique se você tem permissão de "Storage Admin" no projeto
- Verifique se está no projeto correto: `institucional-480905`

### Erro: "Bucket not found" no deploy

- Verifique se o nome do bucket está correto: `yoobe.co`
- Verifique se o projeto está correto no workflow: `institucional-480905`

### Site não aparece mesmo após configurar

- Verifique se o arquivo `index.html` está realmente no bucket
- Verifique se o bucket está público
- Verifique se a website configuration está ativada
- Aguarde alguns minutos para propagação

---

## 📞 Próximos Passos

1. ✅ Configure o bucket como público (PASSO 1)
2. ✅ Configure como site estático (PASSO 2)
3. ✅ Faça upload manual do `index.html` (PASSO 3) OU aguarde o deploy automático
4. ✅ Teste o site

Após isso, o deploy automático funcionará a cada push! 🎉
