# 4UNIK — ENGINE DE PROMPTS DE IMAGEM

> Inteligência de prompt para geração de imagens (Higgsfield / nanoBanana
> e similares). Adaptado ao contexto de infraestrutura de recompensas e
> engajamento. Última atualização: 2026-08-05.

---

## 1. PRINCÍPIOS

1. Imagem comunica **benefício, funcionalidade, case de sucesso ou
   conceito tecnológico** — não "foto de produto na caixa".
2. Preferir direção editorial (corporativa moderna, tecnologia, equipes,
   dados, interfaces de software, abstrações de conexão).
3. Deixar espaço negativo claro para tipografia (composição Playwright depois).
4. Cores de cena alinhadas ao DNA 4Unik (consultar `4unik-visual.md`):
   `--brand-primary-dark`, `--brand-secondary-blue`, `--brand-accent-green`,
   `--brand-accent-orange`, `--brand-white`.
5. Nunca pedir texto longo dentro da imagem gerada — texto entra na composição.

---

## 2. TEMPLATE BASE

```
[formato: vertical 9:16 | quadrado 1:1 | 4:5]
[cena: descrição concreta do sujeito, ambiente corporativo moderno, interfaces de software,
  elementos tecnológicos, gráficos de dados, equipes colaborando]
[luz: soft key / editorial / high contrast dark / clean studio light]
[paleta: brand-primary-dark, brand-secondary-blue, brand-accent-green, brand-accent-orange, brand-white]
[espaço: negative space on upper/lower third for headline or data visualization]
[estilo: modern B2B tech brand marketing, professional, integrated, scalable, not generic stock photo]
[evitar: watermarks, unreadable fake text, distorted logos, informal elements, excessive abstract shapes without context]
```

---

## 3. TEMPLATES POR PILAR

### INOVAÇÃO / TECNOLOGIA
Cena que mostre interfaces digitais da 4Unik, equipes colaborando com tecnologia,
elementos de integração, abstrações de dados em ambientes limpos e modernos.
Foco na automação e na infraestrutura.

### CASOS DE SUCESSO
Imagens que transmitam sucesso e parceria: equipes celebrando com interfaces da
4Unik ao fundo, gráficos de performance claros, pessoas usando a plataforma
com satisfação.

### EFICIÊNCIA / AUTOMAÇÃO
Representações visuais de processos simplificados, fluxos de trabalho automatizados,
dashboards limpos e intuitivos da 4Unik, um "antes e depois" visual da carga
de trabalho do RH sendo otimizada.

### ENGAGAMENTO / PERFORMANCE
Ambientes de trabalho engajadores, celebração de metas e conquistas, pessoas
interagindo com elementos de gamificação, representação visual de "pontos"
ou "recompensas" de forma premium e valorizada.

### CONFIANÇA / SEGURANÇA
Representações visuais de segurança de dados (cadeados estilizados, escudos,
infraestrutura segura), governança (fluxogramas limpos e organizados),
capacidade robusta da plataforma.

---

## 4. NEGATIVE PROMPT SUGERIDO

```
blurry, low-res, watermark, generic stock photo, outdated office, unreadable text,
misspelled typography in image, irrelevant abstract shapes, distorted logo, child models,
informal elements, excessive cartoonish style, bad UI design, fake statistics, cheesy smiles,
people looking directly at camera in a forced way
```

---

## 5. PÓS-GERAÇÃO

1. Salvar bruto em `assets/` (não é entregável).
2. Compor com Playwright: headline + body + CTA + brand bar.
3. Auditar com `4unik-anti-patterns.md` seção 7.
4. Conferir acentuação do texto composto.
