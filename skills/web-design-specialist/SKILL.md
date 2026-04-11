---
name: web-design-specialist
description: Expert guidance for ultra-modern landing page design with premium aesthetics, animations, performance optimization, and conversion-focused layout patterns for B2B SaaS/tech companies.
triggers:
  - web design
  - landing page design
  - modern design
  - premium layout
  - animations
  - micro-interactions
---

# Web Design Specialist — Premium Landing Pages

## Design System: 4unik V3

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-orange` | #f98f16ff | Primary CTAs, highlights, active states |
| `--brand-orange-dark` | #EA580C | Hover states, emphasis |
| `--brand-orange-light` | #FFF7ED | Light backgrounds, badges |
| `--brand-navy` | #1E293B | Text, dark sections, footer |
| `--brand-navy-dark` | #0F172A | Deep contrast backgrounds |
| `--brand-charcoal` | #2D2D2D | Body text, headings |
| `--brand-cream` | #F5F3EF | Page background |
| `--brand-warm-gray` | #78716C | Secondary text |
| `--surface-white` | #FFFFFF | Cards, elevated surfaces |
| `--surface-glass` | rgba(255,255,255,0.85) | Glassmorphism panels |
| `--gradient-primary` | linear-gradient(135deg, #F97316, #EA580C) | Primary buttons |
| `--gradient-hero` | linear-gradient(135deg, #0F172A, #1E293B, #334155) | Hero background |

### Typography
- **Headings**: `'Inter', sans-serif` — Weight 800 (ExtraBold)
- **Body**: `'Inter', sans-serif` — Weight 400–500
- **Scale**: 4.5rem (h1) → 3rem (h2) → 1.5rem (h3) → 1.125rem (body)

### Animation Library (AOS + Custom)
```css
/* Entrance animations */
[data-aos="fade-up"] { transform: translateY(40px); opacity: 0; }
[data-aos="zoom-in"] { transform: scale(0.9); opacity: 0; }

/* Floating elements */
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

/* Gradient shimmer for CTAs */
@keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

/* Counter animation */
@keyframes countUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
```

### Component Patterns

#### Pill Navigation Bar
- Sticky header with `backdrop-filter: blur(12px)`
- White/glass background with orange accent on active link
- Rounded pill container for nav items
- CTA button with gradient orange

#### Hero Section
- Dark gradient background (#0F172A → #1E293B)
- Large headline with orange highlight keyword
- Floating dashboard mockup with shadow
- Animated stat badges floating around hero

#### Feature Cards
- White cards with subtle border
- Icon in orange circle
- Bold title + short description
- Hover: slight translateY(-4px) + shadow increase

#### Pricing Cards
- 3-column layout (Starter / Pro / Enterprise)
- Popular plan highlighted with orange border + "Mais Popular" badge
- Feature list with checkmarks
- CTA button changes style per tier

#### Stats/Social Proof Bar
- Dark or gradient background
- 4 columns with animated counters
- Large number + descriptor text

### Performance Checklist
- [ ] Images: WebP format, lazy loading, `decoding="async"`
- [ ] Fonts: `font-display: swap`, preload critical fonts
- [ ] CSS: Critical CSS inlined, non-critical deferred
- [ ] Animations: `will-change` for animated elements, GPU-accelerated transforms
- [ ] LCP < 2.5s, FID < 100ms, CLS < 0.1

### SEO Technical Checklist
- [ ] Semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`)
- [ ] Single `<h1>` with primary keyword
- [ ] Meta title (50-60 chars) + description (150-160 chars)
- [ ] OpenGraph + Twitter Card meta tags
- [ ] Canonical URL
- [ ] Schema.org structured data (Organization + SoftwareApplication)
- [ ] Alt text on all images
- [ ] `lang="pt-BR"` attribute

## Estrutura da Landing Page 4unik V3 (Conversão SaaS B2B)

"Atue como um Web Designer especialista em conversão SaaS B2B. Crie a estrutura de blocos para a landing page da 4unik V3, utilizando a seguinte hierarquia:
Hero Section: Título principal focado em unificar gamificação e loja corporativa + CTA para 'Solicitar Demonstração'
.
Social Proof (Prova Social): Logos de empresas parceiras, como Grupo Boticário e Softplan
.
Como Funciona: Seção detalhando os 4 passos da operação: Integre, Configure, Engaje e Acompanhe
.
Pilares da Plataforma: Grid visual destacando Gamificação, Loja VIP, Dashboard de Gestão, Integrações e API
.
Catálogo & Logística: Destaque para os mais de 5.000 produtos reais e rastreio de envios para todo o Brasil
.
Depoimentos: Depoimentos de clientes destacando resultados, como o aumento de engajamento e redução de turnover
.
Planos e Preços: Tabela comparativa clara com os recursos dos planos Starter, Pro e Enterprise
.
CTA Final: Última chamada forte para falar com um especialista
."
