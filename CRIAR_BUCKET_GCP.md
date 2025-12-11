# 🪣 Como Criar o Bucket no Google Cloud Storage

## ⚠️ Problema Identificado

O bucket `yoobe.co` não existe no projeto `institucional-480905`. É necessário criá-lo antes do deploy funcionar.

---

## 📋 Passo a Passo para Criar o Bucket

### **PASSO 1: Acessar Cloud Storage**

1. Abra seu navegador e acesse:

   ```
   https://console.cloud.google.com/storage/browser?project=institucional-480905
   ```

2. **OU** siga este caminho manual:
   - Acesse: https://console.cloud.google.com
   - No topo da página, clique no **seletor de projetos** (ao lado do logo do Google Cloud)
   - Digite ou selecione: `institucional-480905`
   - No menu lateral esquerdo (☰), clique em **"Cloud Storage"**
   - Clique em **"Buckets"**

---

### **PASSO 2: Criar Novo Bucket**

1. Na página de Buckets, você verá um botão no topo:
   - Clique no botão **"+ CREATE"** ou **"Create bucket"** (botão azul)

---

### **PASSO 3: Configurar o Bucket**

#### **3.1 Nome do Bucket**

1. No campo **"Name your bucket"**:

   - Digite exatamente: `yoobe.co`
   - ⚠️ **IMPORTANTE:** O nome deve ser exatamente `yoobe.co` (sem espaços, sem maiúsculas)

2. Clique em **"CONTINUE"** (botão azul no canto inferior direito)

#### **3.2 Escolher Localização**

1. Na seção **"Choose where to store your data"**:

   - **Location type:** Selecione **"Region"** (recomendado) ou **"Multi-region"**
   - **Location:** Escolha uma região próxima (ex: `us-central1`, `southamerica-east1` para Brasil)
   - Para Brasil, recomendo: `southamerica-east1` (São Paulo)

2. Clique em **"CONTINUE"**

#### **3.3 Escolher Classe de Armazenamento**

1. Na seção **"Choose a default storage class for your data"**:

   - Selecione: **"Standard"** (recomendado para sites)
   - Ou pode escolher outra classe se preferir

2. Clique em **"CONTINUE"**

#### **3.4 Escolher Controle de Acesso**

1. Na seção **"Choose how to control access to objects"**:

   - Selecione: **"Uniform"** (mais simples) ou **"Fine-grained"** (mais controle)
   - Para site estático, **"Uniform"** é suficiente

2. Clique em **"CONTINUE"**

#### **3.5 Proteção de Dados (Opcional)**

1. Na seção **"Choose data protection"**:

   - Você pode deixar as opções padrão ou configurar conforme necessário
   - Para um site simples, pode deixar tudo desmarcado

2. Clique em **"CREATE"** (botão azul no canto inferior direito)

---

### **PASSO 4: Configurar o Bucket como Site Estático**

#### **4.1 Acessar Configurações do Bucket**

1. Após criar o bucket, você será redirecionado para a lista de buckets
2. Clique no nome do bucket: **`yoobe.co`**

#### **4.2 Ativar Website Configuration**

1. No topo da página do bucket, clique na aba **"PERMISSIONS"** ou **"CONFIGURATION"**

2. **OU** clique no botão **"EDIT"** (ícone de lápis) no topo da página

3. Procure pela seção **"Website configuration"** ou role a página até encontrá-la

4. Clique em **"Edit website configuration"** ou **"Enable"**

#### **4.3 Configurar Páginas**

1. Na janela que abrir, configure:

   - **Main page (index page):** Digite: `index.html`
   - **Error page (404 page):** Deixe em branco ou digite: `404.html` (opcional)

2. Clique em **"SAVE"** ou **"Save"**

---

### **PASSO 5: Configurar Permissões Públicas (Se Necessário)**

Se você quiser que o site seja acessível publicamente:

1. Na página do bucket, vá para a aba **"PERMISSIONS"**

2. Clique em **"GRANT ACCESS"** ou **"Add principal"**

3. Configure:

   - **New principals:** Digite: `allUsers`
   - **Select a role:** Escolha: **"Storage Object Viewer"** ou **"Storage Legacy Bucket Reader"**

4. Clique em **"SAVE"**

5. Uma confirmação aparecerá avisando sobre acesso público - clique em **"ALLOW PUBLIC ACCESS"**

---

## ✅ Verificação Final

Após criar o bucket, verifique:

1. ✅ Bucket `yoobe.co` aparece na lista de buckets
2. ✅ Website configuration está ativada
3. ✅ Main page configurada como `index.html`
4. ✅ Permissões configuradas (se necessário)

---

## 🚀 Próximo Passo: Fazer Deploy

Após criar o bucket:

1. Volte para o GitHub: https://github.com/Yoooobe/landing/actions
2. Se houver um workflow que falhou, clique em **"Re-run jobs"** ou faça um novo push
3. O deploy deve funcionar agora!

**OU** faça um pequeno ajuste e faça commit:

```bash
cd /Users/genautech/landing
# Faça uma pequena alteração (adicione um espaço ou comentário)
git add .
git commit -m "Trigger deploy após criar bucket"
git push origin main
```

---

## 🆘 Troubleshooting

### Erro: "Bucket name already exists"

- O nome `yoobe.co` já está em uso globalmente
- Tente: `yoobe-co` ou `yoobe-co-website` ou outro nome único

### Erro: "Permission denied"

- Verifique se você tem permissão para criar buckets no projeto
- Entre em contato com o administrador do projeto

### Erro: "Invalid bucket name"

- O nome deve conter apenas letras minúsculas, números e hífens
- Não pode começar ou terminar com hífen
- Deve ter entre 3-63 caracteres

---

## 📞 Precisa de Ajuda?

Se encontrar problemas:

1. Verifique se está no projeto correto: `institucional-480905`
2. Verifique suas permissões no projeto
3. Consulte a documentação: https://cloud.google.com/storage/docs/creating-buckets
