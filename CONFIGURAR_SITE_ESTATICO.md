# 🌐 Configurar Bucket como Site Estático

## ✅ Status Atual

Ótimo! O bucket já está público:
- ✅ Public access: **"Access granted to public principals"**
- ✅ Public access prevention: **"Not enabled"**

Agora falta apenas configurar como site estático e fazer upload do arquivo!

---

## 📋 Passo a Passo: Configurar Site Estático

### **PASSO 1: Ativar Website Configuration**

1. Na página de **"CONFIGURATION"** do bucket `yoobe.co` (onde você está agora)

2. Role a página até encontrar a seção **"Website configuration"**

3. Se não estiver visível, procure por:
   - **"Static website hosting"**
   - **"Website"**
   - Ou vá para a aba **"Objects"** e procure por configurações de site

4. Clique em **"Edit website configuration"** ou **"Enable"** ou **"Configure"**

---

### **PASSO 2: Configurar Páginas**

1. Na janela que abrir, configure:

   - **Main page (index page) ou Index page:**
     - Digite: `index.html`
   
   - **Error page (404 page) ou Error page:** (opcional)
     - Deixe em branco
     - OU digite: `404.html` (se você criar uma página de erro depois)

2. Clique em **"SAVE"** ou **"Update"**

---

### **PASSO 3: Fazer Upload do Arquivo**

Agora você precisa fazer upload do arquivo `index.html`:

#### **Opção A: Upload Manual (Rápido)**

1. Vá para a aba **"Objects"** (no topo da página)

2. Clique no botão **"UPLOAD"** (botão azul)

3. Selecione o arquivo:
   - Localização: `/Users/genautech/landing/index.html`
   - Ou arraste e solte o arquivo na área de upload

4. Aguarde o upload concluir

5. Verifique se o arquivo `index.html` aparece na lista

#### **Opção B: Deploy Automático (Recomendado)**

O GitHub Actions fará o upload automaticamente:

1. Acesse: https://github.com/Yoooobe/landing/actions

2. Verifique se há um workflow rodando ou que falhou

3. Se não houver workflow recente, faça um pequeno ajuste para disparar:

```bash
cd /Users/genautech/landing
# Adicione um espaço ou comentário no index.html
git add .
git commit -m "Trigger deploy após configurar bucket"
git push origin main
```

---

## ✅ Verificação Final

Após seguir os passos:

- [ ] Website configuration ativada
- [ ] Main page configurada como `index.html`
- [ ] Arquivo `index.html` está no bucket (verifique na aba "Objects")
- [ ] Status do arquivo mostra tamanho > 0 bytes

---

## 🚀 Testar o Site

Após fazer upload do arquivo:

1. Acesse: **https://yoobe.co**
   - OU: **https://storage.googleapis.com/yoobe.co/index.html**

2. Você deve ver a página de "Em Atualização"

3. Se não aparecer:
   - Aguarde alguns minutos (propagação do CDN)
   - Faça hard refresh: `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
   - Tente em modo anônimo

---

## 🎉 Pronto!

Após configurar o site estático e fazer upload do arquivo, seu site estará funcionando!

**URLs disponíveis:**
- https://yoobe.co
- https://storage.googleapis.com/yoobe.co/index.html

---

## 🆘 Se Não Encontrar "Website Configuration"

Alguns buckets podem não ter essa opção visível. Nesse caso:

1. O deploy automático via GitHub Actions já configura isso automaticamente
2. OU você pode usar o gcloud CLI:

```bash
gsutil web set -m index.html gs://yoobe.co/
```

---

## 📝 Nota

Se você fizer upload manual agora, o deploy automático continuará funcionando normalmente. A cada push no GitHub, o arquivo será atualizado automaticamente! 🚀
