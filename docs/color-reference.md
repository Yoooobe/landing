# Referência de cores (4unik + demo Yoobe)

Valores iniciais alinhados ao plano de produto. Para extrair hex exatos dos sites ao vivo:

```bash
export FIRECRAWL_API_KEY="sua_chave"
npx firecrawl-cli scrape https://4unik.com.br -o .firecrawl/4unik.md --format markdown --wait-for 4000
npx firecrawl-cli scrape "https://demo.yoobe.co/membro/gamificacao" -o .firecrawl/demo-gamificacao.md --format markdown --wait-for 6000
```

Depois ajuste os tokens em `src/app/globals.css` (`@theme`).

| Token | Hex | Uso |
|-------|-----|-----|
| 4unik primary | `#2563EB` | Hierarquia institucional, links de confiança |
| Demo progress | `#22D3EE` | Nível, progresso, gamificação “membro” |
| Page gradient | `#030712` → `#0c1a2e` → `#0f172a` | Fundos de seção |
