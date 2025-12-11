# 💻 Onde Executar o Script: Cloud Shell vs Terminal Local

## ✅ Opção 1: Cloud Shell do GCP (RECOMENDADO!)

O **Cloud Shell** já vem com tudo instalado e configurado! É a opção mais fácil.

### **PASSO 1: Abrir Cloud Shell**

1. Acesse: https://console.cloud.google.com

2. No topo da página, procure pelo ícone **">\_"** (terminal) no canto superior direito

3. Clique no ícone para abrir o Cloud Shell

4. Aguarde alguns segundos até o terminal carregar

### **PASSO 2: Verificar gcloud**

No Cloud Shell, execute:

```bash
gcloud --version
```

Você deve ver algo como:

```
Google Cloud SDK 450.0.0
```

✅ Se aparecer a versão, está pronto!

### **PASSO 3: Configurar Projeto**

```bash
gcloud config set project institucional-480905
```

### **PASSO 4: Clonar o Repositório**

```bash
git clone https://github.com/Yoooobe/landing.git
cd landing
```

### **PASSO 5: Executar o Script**

```bash
chmod +x setup-load-balancer.sh
./setup-load-balancer.sh
```

---

## ✅ Opção 2: Terminal Local (Seu Computador)

Se preferir usar seu terminal local:

### **PASSO 1: Verificar se tem gcloud**

Abra o Terminal (macOS) ou Prompt de Comando (Windows) e execute:

```bash
gcloud --version
```

### **Se NÃO tiver instalado:**

**macOS:**

```bash
brew install google-cloud-sdk
```

**Linux:**

```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

**Windows:**

- Baixe: https://cloud.google.com/sdk/docs/install
- Execute o instalador

### **PASSO 2: Autenticar**

```bash
gcloud auth login
```

Isso abrirá o navegador para você fazer login.

### **PASSO 3: Configurar Projeto**

```bash
gcloud config set project institucional-480905
```

### **PASSO 4: Executar o Script**

```bash
cd /Users/genautech/landing
chmod +x setup-load-balancer.sh
./setup-load-balancer.sh
```

---

## 🎯 Comparação: Cloud Shell vs Terminal Local

| Recurso                 | Cloud Shell            | Terminal Local                 |
| ----------------------- | ---------------------- | ------------------------------ |
| **gcloud instalado**    | ✅ Sim (pronto)        | ❌ Precisa instalar            |
| **Autenticação**        | ✅ Automática          | ⚠️ Precisa `gcloud auth login` |
| **Projeto configurado** | ✅ Já no projeto certo | ⚠️ Precisa configurar          |
| **Acesso à internet**   | ✅ Sim                 | ✅ Sim                         |
| **Fácil de usar**       | ✅ Muito fácil         | ⚠️ Requer instalação           |

---

## 💡 Recomendação

**Use o Cloud Shell!** É mais fácil porque:

- ✅ Já tem tudo instalado
- ✅ Já está autenticado
- ✅ Já está no projeto correto (geralmente)
- ✅ Não precisa instalar nada
- ✅ Funciona em qualquer computador (só precisa do navegador)

---

## 📋 Passo a Passo Rápido no Cloud Shell

1. **Abrir Cloud Shell:**

   - Acesse: https://console.cloud.google.com
   - Clique no ícone **">\_"** no topo direito

2. **Clonar repositório:**

   ```bash
   git clone https://github.com/Yoooobe/landing.git
   cd landing
   ```

3. **Executar script:**

   ```bash
   chmod +x setup-load-balancer.sh
   ./setup-load-balancer.sh
   ```

4. **Pronto!** Em 2-5 minutos tudo estará configurado! 🎉

---

## 🆘 Troubleshooting

### Cloud Shell não abre:

- Tente em outro navegador
- Limpe o cache do navegador
- Acesse diretamente: https://shell.cloud.google.com

### Erro "gcloud: command not found" no Cloud Shell:

- Isso não deveria acontecer, mas se acontecer:
  - Feche e abra o Cloud Shell novamente
  - Ou execute: `gcloud components update`

### Erro de permissão:

- Verifique se está no projeto correto: `gcloud config get-value project`
- Deve mostrar: `institucional-480905`

---

## ✅ Checklist

**Para Cloud Shell:**

- [ ] Abriu o Cloud Shell (ícone ">\_" no topo do console)
- [ ] Executou `gcloud --version` (deve mostrar versão)
- [ ] Clonou o repositório
- [ ] Executou o script

**Para Terminal Local:**

- [ ] Instalou Google Cloud SDK
- [ ] Executou `gcloud auth login`
- [ ] Configurou projeto: `gcloud config set project institucional-480905`
- [ ] Executou o script

---

## 🚀 Pronto para Começar!

**Recomendação:** Use o Cloud Shell - é mais rápido e fácil!

Acesse: https://console.cloud.google.com e clique no ícone do terminal no topo! 🎯
