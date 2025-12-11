# 🔐 Resolver Erro de Autenticação no Cloud Shell

## ⚠️ Problema

O erro `ACCESS_TOKEN_SCOPE_INSUFFICIENT` acontece porque o Cloud Shell está usando uma service account com permissões limitadas.

---

## ✅ Solução: Autenticar com Sua Conta Pessoal

### **PASSO 1: Autenticar no Cloud Shell**

No Cloud Shell, execute:

```bash
gcloud auth login
```

Isso abrirá uma janela no navegador para você fazer login com sua conta Google.

### **PASSO 2: Selecionar Conta**

1. Na janela que abrir, selecione sua conta Google (a que tem acesso ao projeto `institucional-480905`)
2. Autorize o acesso
3. Volte para o Cloud Shell

### **PASSO 3: Verificar Autenticação**

```bash
gcloud auth list
```

Você deve ver sua conta pessoal listada como ativa.

### **PASSO 4: Configurar Projeto**

```bash
gcloud config set project institucional-480905
```

### **PASSO 5: Executar Script Novamente**

```bash
cd ~/landing
./setup-load-balancer.sh
```

---

## 🔄 Alternativa: Usar gcloud auth application-default login

Se `gcloud auth login` não funcionar, tente:

```bash
gcloud auth application-default login
```

Isso também autenticará sua conta pessoal.

---

## ✅ Verificar Permissões

Após autenticar, verifique se você tem as permissões necessárias:

```bash
gcloud projects get-iam-policy institucional-480905 --flatten="bindings[].members" --filter="bindings.members:user:$(gcloud config get-value account)"
```

Você precisa ter uma das seguintes roles:
- **Owner**
- **Editor**
- **Compute Admin**

---

## 🆘 Se Ainda Não Funcionar

### **Opção 1: Solicitar Permissões**

Se você não tem as permissões necessárias, peça ao administrador do projeto para adicionar:
- Role: **Compute Admin** ou **Owner**
- Seu email: (o que aparece em `gcloud config get-value account`)

### **Opção 2: Usar Terminal Local**

Se o Cloud Shell continuar dando problemas, use seu terminal local:

1. Instale Google Cloud SDK (se não tiver)
2. Execute: `gcloud auth login`
3. Execute: `gcloud config set project institucional-480905`
4. Execute o script

---

## 📝 Comandos Rápidos

```bash
# 1. Autenticar
gcloud auth login

# 2. Verificar conta ativa
gcloud auth list

# 3. Configurar projeto
gcloud config set project institucional-480905

# 4. Executar script
cd ~/landing
./setup-load-balancer.sh
```

---

## ✅ Checklist

- [ ] Executou `gcloud auth login`
- [ ] Fez login com conta que tem acesso ao projeto
- [ ] Verificou com `gcloud auth list` que a conta está ativa
- [ ] Configurou projeto: `gcloud config set project institucional-480905`
- [ ] Executou o script novamente

---

## 🎯 Próximo Passo

Após autenticar corretamente, execute o script novamente e tudo deve funcionar! 🚀
