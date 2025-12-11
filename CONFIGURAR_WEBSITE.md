# 🌐 Configurar Website Configuration no Bucket

## ✅ Status Atual

Ótimo! O bucket já está configurado como público:

- ✅ Public access: "Access granted to public principals"
- ✅ Public access prevention: "Not enabled"

Agora só falta configurar como site estático!

---

## 📋 Passo a Passo: Configurar Website Configuration

### **PASSO 1: Encontrar Website Configuration**

1. Na página do bucket `yoobe.co`, você está na aba **"CONFIGURATION"** ✅

2. Role a página para baixo até encontrar a seção **"Website configuration"**

3. Se não encontrar, procure por:
   - **"Website configuration"**
   - **"Static website hosting"**
   - **"Hosting"**

---

### **PASSO 2: Ativar Website Configuration**

1. Na seção "Website configuration", você verá:

   - Status: Provavelmente "Not configured" ou "Disabled"

2. Clique em **"Edit website configuration"** ou **"Enable"** ou **"Configure"**

3. Na janela que abrir, configure:

   - **Main page (index page):** Digite: `index.html`
   - **Error page (404 page):** Deixe em branco OU digite: `404.html` (opcional)

4. Clique em **"SAVE"** ou **"Update"**

---

### **PASSO 3: Verificar Configuração**

Após salvar, verifique:

- [ ] Website configuration mostra: **"Enabled"** ou **"Configured"**
- [ ] Main page mostra: `index.html`
- [ ] Status mudou de "Not configured" para "Enabled"

---

## 🚀 Próximo Passo: Upload do Arquivo

Após configurar o website, você precisa fazer upload do arquivo `index.html`:

### **Opção A: Upload Manual (Rápido)**

1. Vá para a aba **"Objects"** (ao lado de "Configuration")

2. Clique no botão **"UPLOAD"** (botão azul)

3. Selecione o arquivo: `/Users/genautech/landing/index.html`

4. Clique em **"OPEN"** ou **"UPLOAD"**

5. Aguarde o upload concluir

### **Opção B: Deploy Automático**

O GitHub Actions deve fazer o upload automaticamente. Verifique:

1. Acesse: https://github.com/Yoooobe/landing/actions

2. Verifique se há um workflow rodando ou que foi concluído

3. Se não houver, faça um pequeno ajuste para disparar:

```bash
cd /Users/genautech/landing
# Adicione um espaço ou comentário
git add .
git commit -m "Trigger deploy"
git push origin main
```

---

## ✅ Checklist Final

- [ ] Bucket está público ✅ (já feito!)
- [ ] Website configuration ativada
- [ ] Main page configurada como `index.html`
- [ ] Arquivo `index.html` está no bucket (upload manual ou deploy automático)

---

## 🎉 Testar o Site

Após fazer upload do arquivo:

1. Acesse: **https://yoobe.co**
2. **OU** acesse: **https://storage.googleapis.com/yoobe.co/index.html**

Você deve ver a página de "Em Atualização"!

---

## 🆘 Se Não Encontrar Website Configuration

Alguns buckets podem não ter essa opção diretamente. Nesse caso:

1. O site ainda funcionará acessando diretamente: `https://storage.googleapis.com/yoobe.co/index.html`
2. Para usar `https://yoobe.co`, você precisará configurar um Load Balancer ou usar Cloud CDN
3. Para um site simples, acessar via `storage.googleapis.com` funciona perfeitamente!

---

## 📝 Nota

A Website configuration é útil para:

- Definir uma página inicial padrão (`index.html`)
- Definir uma página de erro 404 personalizada
- Facilitar o acesso ao site

Mesmo sem ela, o site funcionará se você acessar o arquivo diretamente!
