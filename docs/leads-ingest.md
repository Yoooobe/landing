# Lead capture (formulário de contacto)

O site publica-se em **export estático** (GitHub Pages). Os Route Handlers em `src/app/api/leads/route.ts` **não** fazem parte desse bundle; em produção o envio depende de um endpoint externo.

## Variável de ambiente

| Variável | Obrigatória em produção | Descrição |
| --- | --- | --- |
| `NEXT_PUBLIC_LEADS_INGEST_URL` | Sim, para envio real | URL absoluta (HTTPS) que aceita `POST` com corpo JSON. O cliente envia o payload validado (nome, email, empresa, telefone/mensagem opcionais, consentimento, `source`, `locale`, honeypot). O serviço deve permitir CORS a partir do domínio do site. |

Se estiver vazia em produção estática, o formulário continua a validar no cliente mas mostra a mensagem de configuração em vez de simular envio.

## Desenvolvimento local

Com `npm run dev`, se `NEXT_PUBLIC_LEADS_INGEST_URL` não estiver definida, o cliente usa `POST` para `/landing/api/leads` (com `basePath`), útil para testar o fluxo sem um provider externo.

## Providers típicos

Exemplos de serviços que aceitam POST JSON + CORS: Formspree, Getform, Web3Forms, ou um worker/edge próprio. Configure o URL completo do endpoint no painel do provider e copie-o para `NEXT_PUBLIC_LEADS_INGEST_URL` nas variáveis de build (GitHub Actions / ambiente de CI).

## Sanity (`ctaBlock`)

Blocos `ctaBlock` nas páginas de marketing podem expor o mesmo componente com `showLeadForm` e `leadFormVariant`; ver `docs/cms.md`.

## Âncora `#contato` e dock global

- O bloco principal de formulário em cada rota de marketing expõe `id="contato"` (constante `PRIMARY_CONTACT_SECTION_ID` em `src/lib/contactAnchor.ts`). Na home existem ainda âncoras intermédias: `contato-pos-plataforma`, `contato-pos-campanhas`, `contato-pos-operacoes`.
- O helper `resolvePrimaryContactHref` em `src/lib/resolvePrimaryContactHref.ts` devolve o URL localizado certo para o formulário: blog e stubs de plataforma redireccionam para home ou `/plataforma#contato`; `/workvivo` (legado) para `/api-integracoes/workvivo#contato`.
- `GlobalConversionDock` (WhatsApp + pedido de contacto) e o link **Contacto** no header usam esse contrato; o Studio (`/studio`) não mostra o dock.
