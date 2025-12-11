# 🔍 Testar Site com curl

## 📋 Teste HTTP

Execute no terminal:

```bash
curl -I http://yoobe.co
```

**O que esperar:**

- `200 OK` = Site está funcionando ✅
- `301/302` = Redirecionamento (pode ser normal)
- `403 Forbidden` = Problema de permissão ⚠️
- `404 Not Found` = Arquivo não encontrado ⚠️
- `502 Bad Gateway` = Problema no Load Balancer ⚠️
- `503 Service Unavailable` = Serviço não disponível ⚠️
- Timeout = DNS ou Load Balancer não está respondendo ⚠️

---

## 📋 Teste HTTPS

Execute no terminal:

```bash
curl -I https://yoobe.co
```

**O que esperar:**

- `200 OK` = Site está funcionando ✅
- `301/302` = Redirecionamento (pode ser normal)
- Erro de certificado = Normal se certificado ainda não estiver pronto
- `403 Forbidden` = Problema de permissão ⚠️
- `404 Not Found` = Arquivo não encontrado ⚠️
- `502 Bad Gateway` = Problema no Load Balancer ⚠️
- `503 Service Unavailable` = Serviço não disponível ⚠️
- Timeout = DNS ou Load Balancer não está respondendo ⚠️

---

## 📋 Teste Completo (Ver Resposta Completa)

Para ver a resposta completa:

```bash
curl -v http://yoobe.co
```

Isso mostrará:

- Headers completos
- Status code
- Mensagens de erro detalhadas

---

## 📋 Teste Forçando IP Correto

Para testar diretamente com o IP do Load Balancer:

```bash
curl -I -H "Host: yoobe.co" http://34.8.255.48
```

**Se isso funcionar:**

- ✅ Load Balancer está funcionando
- ⚠️ Problema é apenas DNS local

**Se isso não funcionar:**

- ⚠️ Problema no Load Balancer ou backend

---

## 🎯 Execute Estes Testes e Me Envie os Resultados

1. **Teste HTTP:**

   ```bash
   curl -I http://yoobe.co
   ```

2. **Teste HTTPS:**

   ```bash
   curl -I https://yoobe.co
   ```

3. **Teste com IP direto:**
   ```bash
   curl -I -H "Host: yoobe.co" http://34.8.255.48
   ```

**Envie os resultados de cada comando!** 🔍
