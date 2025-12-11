# ✅ Verificar Status do Deploy Automático

## Como Verificar se o Deploy Está Funcionando

### 1. Verificar GitHub Actions

1. Acesse: https://github.com/Yoooobe/landing/actions

2. Você deve ver um workflow chamado **"Deploy to Google Cloud Storage"**

3. Clique no workflow mais recente para ver os detalhes

4. **Status Verde (✓):** Deploy realizado com sucesso! ✅
   - A página está disponível em: https://yoobe.co

5. **Status Amarelo (⏳):** Deploy em andamento
   - Aguarde alguns minutos

6. **Status Vermelho (✗):** Erro no deploy
   - Clique no workflow para ver os logs de erro
   - Verifique a seção de troubleshooting abaixo

---

## 🔍 Troubleshooting

### Erro: "Permission denied" ou "Access denied"

**Solução:**
- Verifique se o secret `GCP_SA_KEY` foi criado corretamente no GitHub
- Verifique se o conteúdo do JSON foi copiado completamente
- Verifique se as permissões da Service Account estão corretas:
  - Storage Admin ✓
  - App Engine Deployer ✓

### Erro: "Bucket not found: gs://yoobe.co/"

**Solução:**
1. Acesse: https://console.cloud.google.com/storage/browser?project=institucional-480905
2. Verifique se o bucket `yoobe.co` existe
3. Se não existir, crie o bucket:
   - Clique em "CREATE BUCKET"
   - Nome: `yoobe.co`
   - Escolha a região apropriada
   - Configure como público (para servir site estático)

### Erro: "Invalid JSON" ou "Malformed JSON"

**Solução:**
- O secret `GCP_SA_KEY` deve conter TODO o conteúdo do arquivo JSON
- Certifique-se de copiar desde o `{` inicial até o `}` final
- Não adicione espaços ou quebras de linha extras

---

## 🚀 Testar o Deploy Manualmente

Se quiser testar o deploy manualmente, você pode fazer um pequeno ajuste no arquivo:

1. Edite `index.html` (adicione um comentário ou mude uma palavra)
2. Faça commit e push:
   ```bash
   git add index.html
   git commit -m "Teste de deploy"
   git push origin main
   ```
3. O workflow será disparado automaticamente
4. Acompanhe em: https://github.com/Yoooobe/landing/actions

---

## 📊 Status Atual

- ✅ Service Account configurada
- ✅ Secret `GCP_SA_KEY` adicionado no GitHub
- ✅ Workflow de deploy configurado
- ⏳ Aguardando primeiro deploy automático

**Próximo passo:** Verifique o status em https://github.com/Yoooobe/landing/actions
