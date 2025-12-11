# 🔍 Como Verificar o Deploy no Console do Google Cloud

## 📋 Passo a Passo Detalhado

### **MÉTODO 1: Verificar no Cloud Storage (Mais Simples)**

#### **Passo 1: Acessar o Cloud Storage**

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

#### **Passo 2: Encontrar o Bucket**

1. Na lista de buckets, procure por: **`yoobe.co`**

2. **Clique no nome do bucket** `yoobe.co`

#### **Passo 3: Verificar o Arquivo**

1. Dentro do bucket, você verá uma lista de arquivos

2. Procure pelo arquivo: **`index.html`**

3. Verifique as informações:

   - **Nome:** `index.html`
   - **Tamanho:** Deve ter alguns KB (ex: 4-5 KB)
   - **Tipo:** `text/html`
   - **Última modificação:** Deve ser a data/hora do último deploy
   - **Criado:** Data de criação

4. **Se o arquivo está lá com data recente:** ✅ Deploy foi concluído com sucesso!

---

### **MÉTODO 2: Verificar Configuração do Site Estático**

#### **Passo 1: Acessar as Configurações do Bucket**

1. Siga os passos do Método 1 até abrir o bucket `yoobe.co`

2. No topo da página, clique na aba **"PERMISSIONS"** ou **"CONFIGURATION"**

3. **OU** clique no botão **"EDIT"** (lápis) no topo da página

#### **Passo 2: Verificar Website Configuration**

1. Procure pela seção **"Website configuration"** ou **"Configuração do site"**

2. Verifique se está configurado:

   - **Main page:** `index.html`
   - **Error page (404):** `404.html` (opcional)

3. Se não estiver configurado, você precisa configurar:
   - Clique em **"Edit website configuration"**
   - Main page: `index.html`
   - Error page: `404.html` (ou deixe em branco)
   - Clique em **"Save"**

---

### **MÉTODO 3: Verificar Logs do Cloud Build (Se Usar)**

#### **Passo 1: Acessar Cloud Build**

1. Acesse:

   ```
   https://console.cloud.google.com/cloud-build/builds?project=institucional-480905
   ```

2. **OU** siga este caminho:
   - Menu lateral (☰) → **"Cloud Build"** → **"History"**

#### **Passo 2: Verificar Builds Recentes**

1. Você verá uma lista de builds recentes

2. Procure por builds com:

   - **Status:** ✓ Success (verde) ou ⏳ In Progress (amarelo)
   - **Trigger:** GitHub push ou manual
   - **Data:** Recente

3. Clique em um build para ver os detalhes e logs

---

### **MÉTODO 4: Verificar via gsutil (Linha de Comando)**

Se você tem o Google Cloud SDK instalado localmente:

```bash
# Verificar se o arquivo existe
gsutil ls gs://yoobe.co/

# Ver detalhes do arquivo
gsutil stat gs://yoobe.co/index.html

# Ver configuração do site
gsutil web get gs://yoobe.co/
```

---

## ✅ Checklist de Verificação

Use este checklist para garantir que tudo está correto:

- [ ] Bucket `yoobe.co` existe no projeto `institucional-480905`
- [ ] Arquivo `index.html` está presente no bucket
- [ ] Data de modificação do `index.html` é recente (últimas horas)
- [ ] Tamanho do arquivo está correto (não está vazio)
- [ ] Website configuration está ativada no bucket
- [ ] Main page está configurada como `index.html`
- [ ] Permissões do bucket permitem acesso público (se necessário)

---

## 🔍 O Que Procurar

### ✅ **Sinais de Sucesso:**

- Arquivo `index.html` presente no bucket
- Data de modificação recente (últimas horas)
- Tamanho do arquivo > 0 bytes
- Website configuration ativada
- Ao acessar `gs://yoobe.co/index.html` diretamente, o conteúdo aparece

### ⚠️ **Sinais de Problema:**

- Arquivo `index.html` não encontrado
- Data de modificação muito antiga
- Tamanho do arquivo = 0 bytes
- Website configuration não está ativada
- Erro de permissão ao acessar

---

## 🆘 Troubleshooting

### Problema: "Bucket não encontrado"

**Solução:**

1. Verifique se está no projeto correto: `institucional-480905`
2. Verifique se o bucket `yoobe.co` existe
3. Se não existir, crie o bucket:
   - Clique em **"CREATE BUCKET"**
   - Nome: `yoobe.co`
   - Escolha a região apropriada

### Problema: "Arquivo index.html não encontrado"

**Solução:**

1. Verifique se o deploy do GitHub Actions foi concluído com sucesso
2. Verifique os logs do GitHub Actions para erros
3. Tente fazer um novo deploy manualmente

### Problema: "Website configuration não ativada"

**Solução:**

1. No bucket `yoobe.co`, vá em **"PERMISSIONS"** ou **"CONFIGURATION"**
2. Procure por **"Website configuration"**
3. Ative e configure:
   - Main page: `index.html`
   - Error page: `404.html` (opcional)
4. Salve as alterações

---

## 📊 Links Úteis

- **Cloud Storage Browser:** https://console.cloud.google.com/storage/browser?project=institucional-480905
- **Bucket específico:** https://console.cloud.google.com/storage/browser/yoobe.co?project=institucional-480905
- **Cloud Build History:** https://console.cloud.google.com/cloud-build/builds?project=institucional-480905
- **IAM & Admin:** https://console.cloud.google.com/iam-admin?project=institucional-480905

---

## 💡 Dica Rápida

A forma mais rápida de verificar:

1. Acesse diretamente: https://console.cloud.google.com/storage/browser/yoobe.co?project=institucional-480905
2. Verifique se `index.html` está lá
3. Verifique a data de modificação (deve ser recente)

Se o arquivo está lá com data recente, o deploy foi concluído! ✅
