# 🔍 Onde Encontrar o Load Balancer no Google Cloud

## 📍 Localização Rápida

### **Método 1: Via Menu Lateral (Mais Fácil)**

1. Acesse: https://console.cloud.google.com

2. No menu lateral esquerdo (☰), procure por:
   - **"Network Services"** (ou "Rede" em português)
   - Clique para expandir

3. Dentro de "Network Services", clique em:
   - **"Load balancing"** ← Aqui está!

4. Você verá a página de Load Balancing com as abas:
   - **"Load balancers"** (aqui você verá seus Load Balancers criados)
   - "Backends"
   - "Frontends"
   - "Service LB policies"

---

### **Método 2: Via Link Direto**

Acesse diretamente:
```
https://console.cloud.google.com/net-services/load-balancing/list?project=institucional-480905
```

---

### **Método 3: Via Busca**

1. No topo do console, use a barra de busca
2. Digite: `load balancing` ou `load balancer`
3. Selecione "Load balancing" nos resultados

---

## 📋 O Que Você Verá

### **Se NÃO Criou Nenhum Load Balancer Ainda:**

- Página vazia com ilustração
- Texto: "Load balancers distribute incoming network traffic..."
- Botão azul: **"Create load balancer"**

### **Se JÁ Criou um Load Balancer:**

- Tabela com seus Load Balancers listados
- Colunas: Name, Type, Status, IP address, etc.
- Você pode clicar no nome para ver detalhes

---

## 🔍 Verificar Status do Load Balancer

Se você já estava criando um Load Balancer:

1. Acesse: https://console.cloud.google.com/net-services/load-balancing/list?project=institucional-480905

2. Procure pelo Load Balancer:
   - **Name:** `yoobe-co-lb` (ou o nome que você usou)
   - **Status:** Pode estar como "Creating..." ou "Active"

3. Clique no nome do Load Balancer para ver:
   - Detalhes completos
   - Frontend configuration
   - Backend configuration
   - Status do certificado SSL
   - IP address (importante para DNS!)

---

## 🆘 Se Não Encontrar o Load Balancer

### Possíveis Motivos:

1. **Ainda não foi criado:**
   - Você pode ter cancelado o processo
   - Ou ainda está em criação (pode levar alguns minutos)

2. **Projeto errado:**
   - Verifique se está no projeto: `institucional-480905`
   - No topo do console, confira o seletor de projetos

3. **Permissões:**
   - Verifique se você tem permissão para ver Load Balancers
   - Precisa de "Network Admin" ou "Owner"

---

## 📝 Links Úteis

- **Lista de Load Balancers:** https://console.cloud.google.com/net-services/load-balancing/list?project=institucional-480905
- **Backend Buckets:** https://console.cloud.google.com/net-services/load-balancing/backends/buckets?project=institucional-480905
- **Certificados SSL:** https://console.cloud.google.com/net-services/load-balancing/ssl-certificates?project=institucional-480905

---

## 💡 Dica Rápida

**Caminho completo no menu:**
```
Google Cloud Console
  → Network Services (menu lateral)
    → Load balancing
      → Load balancers (aba)
```

---

## ✅ Checklist

- [ ] Acessou o Google Cloud Console
- [ ] Expandiu "Network Services" no menu lateral
- [ ] Clicou em "Load balancing"
- [ ] Está na aba "Load balancers"
- [ ] Verificou se está no projeto correto: `institucional-480905`

---

## 🚀 Próximo Passo

Se você estava criando um Load Balancer e não o encontra:

1. Verifique se completou todas as etapas e clicou em "Create"
2. Aguarde alguns minutos (pode estar sendo criado)
3. Verifique o projeto correto
4. Se não encontrar, você pode criar um novo clicando em "Create load balancer"
