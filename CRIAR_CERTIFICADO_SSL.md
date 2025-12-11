# 🔒 Criar Certificado SSL para o Load Balancer

## ✅ Status Atual

Ótimo progresso! Você já configurou:

- ✅ Load Balancer name: `yoobe-co-lb`
- ✅ Protocol: HTTPS
- ✅ IP estático: `yoobe-co-ip` (criado com sucesso!)
- ✅ Port: 443

Agora só falta criar o **Certificado SSL**!

---

## 📋 Passo a Passo: Criar Certificado SSL

### **PASSO 1: Selecionar Campo Certificate**

1. Na seção **"New Frontend IP and port"**, procure pelo campo **"Certificate \*"** (com asterisco, obrigatório)

2. Clique no dropdown do campo **"Certificate"**

---

### **PASSO 2: Criar Novo Certificado**

1. No dropdown, você verá opções como:

   - "Create a new certificate"
   - Lista de certificados existentes (se houver)

2. Selecione **"Create a new certificate"** ou **"Google-managed certificate"**

---

### **PASSO 3: Configurar Certificado**

Uma janela popup ou nova página abrirá:

1. **Name:**

   - Digite: `yoobe-co-cert`

2. **Type:**

   - Selecione **"Google-managed certificate"** ou **"Google-managed SSL certificate"**
   - ⚠️ **IMPORTANTE:** Escolha o certificado gerenciado pelo Google (gratuito e automático)

3. **Domain names:**

   - No campo de domínios, digite: `yoobe.co`
   - Clique em **"ADD DOMAIN"** ou **"+"** para adicionar mais domínios
   - Adicione também: `www.yoobe.co` (opcional, mas recomendado)

4. **Outras opções:**

   - Deixe as outras configurações como padrão

5. Clique em **"CREATE"** ou **"SAVE"**

---

### **PASSO 4: Aguardar Criação**

1. O certificado será criado, mas pode levar alguns segundos

2. Você será redirecionado de volta para a configuração do Frontend

3. O certificado criado deve aparecer selecionado no dropdown **"Certificate"**

---

### **PASSO 5: Verificar Configuração**

Após criar o certificado, verifique:

- [ ] Campo **"Certificate"** mostra o certificado criado (`yoobe-co-cert`)
- [ ] Domínios configurados: `yoobe.co` (e `www.yoobe.co` se adicionou)

---

## ⚠️ IMPORTANTE: Provisionamento do Certificado

**O certificado SSL pode levar até 1 hora para ser provisionado!**

- ✅ Você pode continuar configurando o Load Balancer
- ✅ O Load Balancer será criado normalmente
- ⚠️ Mas o site só funcionará após o certificado estar **"Active"** ou **"Provisioned"**

Você pode verificar o status do certificado depois em:

- Network Services → Load Balancing → Certificates

---

## ✅ Checklist do Certificado

- [ ] Campo Certificate preenchido
- [ ] Certificado criado: `yoobe-co-cert`
- [ ] Tipo: Google-managed certificate
- [ ] Domínios: `yoobe.co` (e `www.yoobe.co` se quiser)
- [ ] Certificado aparece selecionado no dropdown

---

## 🚀 Próximo Passo

Após criar e selecionar o certificado:

1. Revise todas as configurações do Frontend
2. Clique no botão **"DONE"** (botão azul no final da seção)
3. Você irá para a próxima etapa: **"Backend configuration"**

---

## 🆘 Troubleshooting

### Erro ao criar certificado:

- Verifique se o domínio `yoobe.co` está acessível publicamente
- Certifique-se de que o DNS do domínio está configurado (pode estar em outro projeto)
- O certificado precisa que o DNS aponte para o IP do Load Balancer (mas você pode criar o certificado antes)

### Certificado não aparece no dropdown:

- Aguarde alguns segundos após criar
- Recarregue a página
- Verifique se o certificado foi criado com sucesso

### Mensagem de erro sobre DNS:

- É normal ver uma mensagem sobre DNS não configurado ainda
- Você pode criar o certificado mesmo assim
- Configure o DNS depois (apontando para o IP do Load Balancer)

---

## 💡 Dica

**Anote o IP do Load Balancer** (`yoobe-co-ip`) - você precisará dele para:

1. Configurar o DNS do domínio `yoobe.co`
2. O certificado só será provisionado após o DNS estar configurado corretamente

---

## 📝 Nota sobre DNS

Para o certificado SSL funcionar:

1. O DNS do domínio `yoobe.co` precisa apontar para o IP do Load Balancer
2. Isso pode levar algumas horas para propagar
3. Após o DNS propagar, o certificado será provisionado automaticamente

Mas você pode criar o Load Balancer completo primeiro e configurar o DNS depois!
