# 📤 Como Fazer Upload da Logo

## 🚀 Opção 1: Via Script Automático (Recomendado)

Execute no **Cloud Shell do GCP**:

```bash
cd ~
git clone https://github.com/Yoooobe/landing.git
cd landing
chmod +x upload-logo.sh
./upload-logo.sh
```

---

## 🚀 Opção 2: Via gsutil Manual

Execute no **Cloud Shell do GCP**:

```bash
# Fazer upload
gsutil cp logo.png gs://yoobe.co/

# Tornar público
gsutil acl ch -u AllUsers:R gs://yoobe.co/logo.png
```

---

## 🚀 Opção 3: Via Console GCP

1. Acesse: https://console.cloud.google.com/storage/browser/yoobe.co?project=institucional-480905
2. Clique em **Upload**
3. Selecione o arquivo `logo.png`
4. Após upload, clique no arquivo
5. Vá em **Permissions**
6. Clique em **Grant Access**
7. **New principals:** `allUsers`
8. **Role:** `Storage Object Viewer`
9. **Save**

---

## ✅ Verificar se Funcionou

Após fazer upload, teste:

```bash
curl -I https://yoobe.co/logo.png
```

**Deve retornar:** `HTTP/1.1 200 OK` e `Content-Type: image/png`

---

## 📝 Nota sobre GitHub Actions

O GitHub Actions faz deploy automático do `index.html`, mas **não faz upload da logo automaticamente**. Você precisa fazer upload da logo manualmente uma vez usando uma das opções acima.

---

## 🎯 Depois do Upload

1. A logo aparecerá automaticamente no site
2. O deploy do `index.html` já está configurado para usar `logo.png`
3. Se não aparecer, limpe o cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R)
