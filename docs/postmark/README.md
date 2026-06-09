# Templates Postmark — leads da landing

## Template auto-reply (ID `45224995`)

1. Abrir [template 45224995](https://account.postmarkapp.com/servers/19497979/templates/45224995/edit) no server **19497979**.
2. **Subject:**

```handlebars
{{#equals locale "en"}}We received your message — 4unik{{else}}Recebemos o seu contacto — 4unik{{/equals}}
```

3. **HTML body:** copiar de [`lead-auto-reply-template.html`](lead-auto-reply-template.html).
4. **Text body:** copiar de [`lead-auto-reply-template.txt`](lead-auto-reply-template.txt).

### Variáveis (TemplateModel)

| Variável | Descrição |
| --- | --- |
| `name` | Nome do lead |
| `company` | Empresa |
| `locale` | `pt` ou `en` |
| `source` | Origem do formulário (ex. `home`) |
| `message_preview` | Prévia da mensagem (opcional) |
| `demo_url` | URL Calendly (de `siteSettings` ou fallback) |
| `site_url` | URL canónica da landing |

A notificação interna para `comercial@4unik.com.br` **não** usa este template — é email plain enviado pela API.

## DNS

Ver [`dns-4unik-com-br.md`](dns-4unik-com-br.md).
