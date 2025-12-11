# 📤 Como Fazer Upload do Arquivo index.html

## ✅ Status Atual

Ótimo! O bucket já está configurado corretamente:

- ✅ Bucket público
- ✅ Public access prevention desabilitado

**Nota:** A opção "Website configuration" não está mais disponível na interface do Google Cloud Storage, mas isso não é um problema! Podemos acessar o arquivo diretamente.

---

## 📋 Passo a Passo: Fazer Upload

### **PASSO 1: Ir para a Aba Objects**

1. Na página do bucket `yoobe.co`, clique na aba **"Objects"** (ao lado de "Configuration")

2. Você verá uma lista vazia ou os arquivos que já estão no bucket

---

### **PASSO 2: Fazer Upload do Arquivo**

1. Clique no botão **"UPLOAD"** (botão azul no topo da página)

2. Uma janela de seleção de arquivo abrirá

3. Navegue até o arquivo:

   - Localização: `/Users/genautech/landing/index.html`
   - **OU** arraste e solte o arquivo na área de upload

4. Selecione o arquivo `index.html`

5. Clique em **"OPEN"** ou **"UPLOAD"**

6. Aguarde o upload concluir (pode levar alguns segundos)

---

### **PASSO 3: Verificar Upload**

Após o upload:

1. Você deve ver o arquivo `index.html` na lista de objetos

2. Verifique:
   - ✅ Nome: `index.html`
   - ✅ Tamanho: alguns KB (não está vazio)
   - ✅ Tipo: `text/html`
   - ✅ Data: recente

---

## 🌐 Como Acessar o Site

Após fazer upload, o site estará disponível em:

### **URL Principal:**

```
https://storage.googleapis.com/yoobe.co/index.html
```

### **URL Alternativa (se configurado):**

```
https://yoobe.co
```

**Nota:** Para usar `https://yoobe.co` diretamente (sem `/index.html`), você precisaria configurar um Load Balancer ou Cloud CDN, mas a URL do `storage.googleapis.com` funciona perfeitamente!

---

## 🚀 Testar o Site

1. Abra uma nova aba do navegador

2. Acesse: **https://storage.googleapis.com/yoobe.co/index.html**

3. Você deve ver a página de "Em Atualização" com o logo da Yoobe!

---

## 🔄 Deploy Automático (Opcional)

Se quiser que o deploy seja automático a cada push:

1. Verifique se o workflow está funcionando: https://github.com/Yoooobe/landing/actions

2. Se não estiver rodando, faça um pequeno ajuste:

```bash
cd /Users/genautech/landing
# Adicione um espaço ou comentário no index.html
git add .
git commit -m "Trigger deploy automático"
git push origin main
```

3. O GitHub Actions fará o upload automaticamente!

---

## ✅ Checklist Final

- [x] Bucket público ✅
- [x] Public access prevention desabilitado ✅
- [ ] Arquivo `index.html` feito upload
- [ ] Site acessível em `https://storage.googleapis.com/yoobe.co/index.html`

---

## 🆘 Troubleshooting

### Erro ao fazer upload

- Verifique se você tem permissão de "Storage Admin" no projeto
- Verifique se o arquivo não está corrompido
- Tente fazer upload novamente

### Site não aparece após upload

- Aguarde alguns minutos (propagação do CDN)
- Verifique se o arquivo realmente está no bucket
- Tente acessar em modo anônimo do navegador
- Faça hard refresh: `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)

---

## 📝 Nota sobre Website Configuration

A opção "Website configuration" não está mais disponível na interface do Google Cloud Storage. Isso não é um problema porque:

1. ✅ Podemos acessar o arquivo diretamente via URL
2. ✅ O bucket está público, então qualquer um pode acessar
3. ✅ Para um site simples, isso funciona perfeitamente

Se você precisar usar `https://yoobe.co` diretamente (sem `/index.html`), seria necessário configurar um Load Balancer, mas para a maioria dos casos, a URL do `storage.googleapis.com` é suficiente!

---

## 🎉 Pronto!

Após fazer upload, seu site estará funcionando! 🚀
