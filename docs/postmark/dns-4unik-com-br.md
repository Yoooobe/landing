# DNS Postmark — domínio 4unik.com.br

Verificação necessária para enviar com remetente `@4unik.com.br` (leads, auto-reply).

Painel: [Postmark → Server 19497979 → DNS Settings](https://account.postmarkapp.com/servers/19497979/domains)

## Registos a adicionar

| Tipo | Host / nome | Valor |
| --- | --- | --- |
| **TXT** | `20260609000851pm._domainkey` | `k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDTrjijcmH6Xsu3PjVRRet1VSGA7owd+F0HMR7kkYZDYYqhKxQKmLLByaClx0Uwv2Tfrij4YIHZG0fDROXFYD6K5fd1vBHVLccpp3yX/i1wcdFJPqwi06V5s7PB+aK0LpeDStZY8JQn+L14difGb2mydNHLHzr+hqzHylNdt/t52WIDAQAB` |
| **CNAME** | `pm-bounces` | `pm.mtasv.net` |

Notas:

- O host DKIM pode ser inserido como `20260609000851pm._domainkey.4unik.com.br` ou só o subdomínio, conforme o painel DNS.
- SPF já é tratado pelo Postmark; não é necessário registo SPF manual adicional.
- Após propagar (minutos a horas), clicar **Verify** no Postmark até DKIM e Return-Path ficarem activos.

## Remetente

Depois da verificação DNS, criar **Sender Signature** no server (ex.: `leads@4unik.com.br`) em [Sender Signatures](https://account.postmarkapp.com/signatures) ou no painel do server **19497979**. Sem isto, a API devolve erro 422: *not a Sender Signature*.

Usar o mesmo endereço em `LEADS_FROM_EMAIL` na Vercel (`leads-ingest-api`).

Opcional depois: DMARC (botão *Set up DMARC* no Postmark).
