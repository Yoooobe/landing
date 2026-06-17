# 🔐 Guia Passo a Passo: Criar Service Account no Google Cloud

## 📋 Passo a Passo Completo

### **PASSO 1: Acessar a Página de Service Accounts**

1. Abra seu navegador e acesse:

   ```
   https://console.cloud.google.com/iam-admin/serviceaccounts?project=institucional-480905
   ```

2. **OU** siga este caminho manual:
   - Acesse: https://console.cloud.google.com
   - No topo da página, clique no **seletor de projetos** (ao lado do logo do Google Cloud)
   - Digite ou selecione: `institucional-480905`
   - No menu lateral esquerdo (☰), clique em **"IAM & Admin"**
   - No submenu que aparece, clique em **"Service Accounts"**

---

### **PASSO 2: Criar Nova Service Account**

1. Na página de Service Accounts, você verá um botão no topo:
   - Clique no botão **"+ CREATE SERVICE ACCOUNT"** (botão azul no topo da página)

---

### **PASSO 3: Preencher Dados da Service Account**

1. **Service account name:**

   - Digite: `github-actions-deploy`
   - (Este é apenas um nome identificador)

2. **Service account ID:**

   - Será preenchido automaticamente baseado no nome
   - Você pode deixar como está ou personalizar

3. **Service account description (opcional):**

   - Digite: `Service account para deploy automático via GitHub Actions`
   - (Campo opcional, mas recomendado)

4. Clique no botão **"CREATE AND CONTINUE"** (botão azul no canto inferior direito)

---

### **PASSO 4: Conceder Permissões (Roles)**

1. Na seção **"Grant this service account access to project"**, você verá um campo **"Select a role"**

2. **Primeira permissão - Storage Admin:**

   - Clique no campo **"Select a role"**
   - Digite na busca: `Storage Admin`
   - Selecione a opção: **"Storage Admin"** (deve aparecer com ícone de bucket)
   - Clique em **"ADD ANOTHER ROLE"** (link abaixo do campo)

3. **Segunda permissão - App Engine Deployer:**

   - No segundo campo **"Select a role"** que apareceu
   - Digite na busca: `App Engine Deployer`
   - Selecione a opção: **"App Engine Deployer"** (deve aparecer com ícone do App Engine)

4. Clique no botão **"CONTINUE"** (botão azul no canto inferior direito)

---

### **PASSO 5: Conceder Acesso a Usuários (Opcional)**

1. Na seção **"Grant users access to this service account"**, você pode:

   - **Deixar em branco** (não é necessário para GitHub Actions)
   - OU adicionar seu email se quiser acessar manualmente

2. Clique no botão **"DONE"** (botão azul no canto inferior direito)

---

### **PASSO 6: Criar e Baixar a Chave JSON**

1. Você será redirecionado para a lista de Service Accounts

   - Procure pela service account que você acabou de criar: **"github-actions-deploy"**
   - Clique no **email da service account** (formato: `github-actions-deploy@institucional-480905.iam.gserviceaccount.com`)

2. Na página de detalhes da service account:

   - Vá para a aba **"KEYS"** (no topo da página, ao lado de "PERMISSIONS", "MEMBERS", etc.)
   - Clique no botão **"+ ADD KEY"**
   - No menu que aparece, clique em **"Create new key"**

3. Na janela popup que abrir:

   - Selecione o tipo: **"JSON"** (já deve estar selecionado por padrão)
   - Clique no botão **"CREATE"** (botão azul)

4. O arquivo JSON será baixado automaticamente para seu computador
   - O nome do arquivo será algo como: `institucional-480905-xxxxx.json`
   - **GUARDE ESTE ARQUIVO EM LOCAL SEGURO!** Ele contém credenciais de acesso

---

### **PASSO 7: Adicionar Secret no GitHub**

1. Abra uma nova aba e acesse:

   ```
   https://github.com/Yoooobe/landing/settings/secrets/actions
   ```

2. **OU** siga este caminho:

   - Acesse: https://github.com/Yoooobe/landing
   - Clique na aba **"Settings"** (no topo do repositório)
   - No menu lateral esquerdo, clique em **"Secrets and variables"**
   - Clique em **"Actions"**

3. Na página de Secrets:

   - Clique no botão **"New repository secret"** (botão verde no canto superior direito)

4. Preencher o secret:
   - **Name:** Digite exatamente: `GCP_SA_KEY`
   - **Secret:**
     - Abra o arquivo JSON que você baixou (use um editor de texto)
     - Selecione TODO o conteúdo do arquivo (Ctrl+A / Cmd+A)
     - Copie (Ctrl+C / Cmd+C)
     - Cole no campo "Secret" (Ctrl+V / Cmd+V)
   - Clique no botão **"Add secret"** (botão verde)

---

### **PASSO 8: Verificar se Funcionou**

1. Volte para a página do repositório:

   ```
   https://github.com/Yoooobe/landing
   ```

2. Clique na aba **"Actions"** (no topo do repositório)

3. Você deve ver um workflow rodando chamado **"Deploy to Google Cloud Storage"**

4. Clique no workflow para ver os detalhes e acompanhar o progresso

5. Se aparecer um erro, verifique:
   - Se o secret `GCP_SA_KEY` foi criado corretamente
   - Se as permissões da service account estão corretas
   - Se o bucket `gs://yoobe.co/` existe no projeto

---

## ✅ Checklist Final

- [ ] Service Account criada com nome `github-actions-deploy`
- [ ] Permissão "Storage Admin" adicionada
- [ ] Permissão "App Engine Deployer" adicionada
- [ ] Chave JSON baixada e guardada em local seguro
- [ ] Secret `GCP_SA_KEY` criado no GitHub com o conteúdo do JSON
- [ ] Workflow do GitHub Actions executado com sucesso

---

## 🆘 Troubleshooting

### Erro: "Permission denied"

- Verifique se as permissões da service account estão corretas
- Verifique se o projeto está correto: `institucional-480905`

### Erro: "Bucket not found"

- O bucket `gs://yoobe.co/` precisa existir
- Crie o bucket manualmente no Cloud Storage se necessário

### Erro: "Invalid JSON"

- Certifique-se de copiar TODO o conteúdo do arquivo JSON
- Não adicione quebras de linha extras
- O JSON deve começar com `{` e terminar com `}`

---

## 📞 Precisa de Ajuda?

Se encontrar algum problema, verifique:

1. Os logs do GitHub Actions em: https://github.com/Yoooobe/landing/actions
2. A documentação do Google Cloud: https://cloud.google.com/iam/docs/service-accounts

---

## GA4 Data API (landing — MCP e snapshots)

Service account dedicada (sem roles GCP pesadas; acesso GA4 é no **Admin do Analytics**):

| Campo | Valor |
|-------|-------|
| **Email** | `landing-ga4-reader@institucional-480905.iam.gserviceaccount.com` |
| **Projeto GCP** | `institucional-480905` |
| **API** | [Google Analytics Data API](https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com?project=institucional-480905) |
| **Propriedade GA4** | `327916606` |
| **Stream** | `Plataforma Landing` — ID `15052677461`, measurement `G-SMJDYCENBC` |
| **JSON local (não commitar)** | `~/.config/4unik/landing-ga4-reader.json` |

### Erro OAuth `This app is blocked`

O comando `gcloud auth application-default login` com scopes Analytics usa o cliente OAuth genérico do Google Cloud SDK, que **Google bloqueia** para `analytics.edit` / `analytics.manage.users` em contas normais.

**Não use** `npm run setup:ga4-admin` até ter um OAuth client próprio verificado no GCP — para a landing, o caminho mais rápido é **manual no Admin GA4** (abaixo) + `npm run fetch:ga4-snapshot` (a SA já tem chave JSON local).

### Passos manuais (recomendado, ~3 min)

1. Criar SA `landing-ga4-reader` (ou usar a existente) e baixar chave JSON.
2. Ativar **Analytics Data API** no projeto `institucional-480905`.
3. [GA4 Admin → Acesso à propriedade](https://analytics.google.com/analytics/web/#/a66932658p327916606/admin/property/access) → **+** → email da SA → papel **Viewer**.
4. Exportar credenciais:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/4unik/landing-ga4-reader.json"
   export GA_PROPERTY_ID=327916606
   export GA4_STREAM_ID=15052677461
   ```
5. Testar: `npm run fetch:ga4-snapshot`
6. Cursor MCP: variáveis em [`.cursor/mcp.json`](../.cursor/mcp.json) (caminho absoluto do JSON).

### Key event `generate_lead`

1. [GA4 → Admin → Eventos](https://analytics.google.com/analytics/web/#/a66932658p327916606/admin/events)
2. Localizar `generate_lead` → **Marcar como evento principal** (key event).
3. Confirmar após submit de teste em produção (Relatórios → Tempo real).

### Erro 403 na API

A SA tem chave GCP válida mas **não** foi adicionada como Viewer na propriedade `327916606`. IAM do projeto GCP não substitui este passo.

