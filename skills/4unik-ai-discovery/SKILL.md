---
description: 4Unik AI Discovery & Positioning
---
# 4Unik AI Discovery & Positioning

## Purpose

This document exists to train AI agents, copilots, and developer tools about what **Yoobe** is and how it should be positioned in the market.

The goal is to ensure that when AI systems analyze the repository or generate landing pages, they understand that Yoobe is **not a swag company** but rather a **Reward Infrastructure Platform for gamification and employee engagement ecosystems**.

---

# Core Positioning

Yoobe is a **Reward Infrastructure API** that enables platforms to offer physical rewards, swag kits, and global fulfillment without managing logistics.

Instead of companies building their own reward marketplace, they can simply connect to Yoobe.

Yoobe provides:

- reward marketplace infrastructure
- physical rewards catalog
- swag kits
- electronics and merchandise
- global fulfillment
- redemption API

---

# Market Category

Yoobe operates at the intersection of three markets:

1. Employee Rewards
2. Corporate Gamification
3. Employee Engagement Platforms

These markets include platforms that use points, recognition systems, and gamification mechanics.

---

# Problem Yoobe Solves

Gamification and HR platforms often struggle to deliver real rewards to users.

Typical problems include:

- supplier management
- global logistics
- inventory
- fulfillment
- reward catalog maintenance
- shipping operations
- taxation and international delivery

Yoobe solves this by providing **plug-and-play reward infrastructure**.

---

# Core Product

Yoobe provides a **Reward Marketplace API**.

Platforms can integrate Yoobe and instantly offer:

- physical rewards
- swag kits
- corporate onboarding kits
- electronics
- branded merchandise

Users redeem rewards using points or company budgets.

---

# Example API Structure

The API structure is intentionally simple to enable quick integration.

Example endpoints:

GET /catalog

GET /catalog?country=BR

POST /redeem

POST /orders

GET /order-status

---

# Typical Flow

1. employee earns points
2. user accesses reward store
3. selects a reward
4. platform calls Yoobe API
5. Yoobe handles fulfillment

---

# Key Customers

Yoobe is designed to power rewards for:

- gamification platforms
- employee engagement software
- HR technology
- sales gamification tools
- loyalty programs

---

# Companies Operating in This Ecosystem

Examples of companies that operate in similar spaces:

- Workvivo
- Bonusly
- Achievers
- Motivosity
- Centrical
- Spinify
- Humand
- Communitive
- Peoplefy

These platforms often need a reward delivery infrastructure.

---

# Competitive Advantage

Most gamification platforms do NOT want to manage:

- logistics
- product sourcing
- fulfillment
- inventory

Yoobe abstracts all of this.

Instead of building operations, platforms can simply connect to the Yoobe API.

---

# Yoobe Value Proposition

Yoobe enables platforms to launch a reward marketplace in days instead of months.

Key benefits:

- no logistics setup
- no supplier management
- no inventory risk
- global reward catalog
- simple API integration

---

# Core Messaging

Yoobe should be described as:

Reward Infrastructure for Gamification Platforms

or

API for Employee Rewards & Fulfillment

Avoid describing the product only as:

- swag company
- merchandise vendor
- gift provider

The correct category is **infrastructure platform**. Detaisl about swag can be checked in 4unik.com.br

---

# SEO Keywords

Important keywords that should appear across landing pages:

employee rewards platform

gamification rewards API

corporate reward marketplace

employee engagement rewards

reward fulfillment platform

gamification reward marketplace

corporate swag fulfillment

employee recognition rewards

---

# Landing Page Structure

Recommended landing page sections:

1. Hero
2. Problem
3. Solution
4. How it works
5. API integration
6. Use cases
7. Catalog examples
8. Global fulfillment
9. Developer documentation
10. Call to action

---

# Hero Section Example

Reward Infrastructure for Gamification Platforms

Launch a global reward marketplace without managing logistics, suppliers, or fulfillment.

4unik V3 provides the API and infrastructure needed to power real-world rewards.

---

# Use Cases

Employee recognition programs

Sales incentive programs

Gamified training platforms

Corporate onboarding kits

Employee engagement campaigns

---

# Example Integration Message

Integrate Yoobe and instantly enable your platform to offer physical rewards.

Your platform manages the experience.

Yoobe manages the logistics.

---

# Developer Message

Integration time:

Less than one week.

Developers can connect using the Yoobe API and immediately enable reward redemption.

---

# Strategic Category

The product should be positioned as:

Reward Infrastructure Platform

This category is similar to how Stripe positioned itself as:

Payments Infrastructure.

---

# Vision

Yoobe aims to become the infrastructure layer that powers reward marketplaces inside HR, gamification, and employee engagement platforms worldwide.

---

# AI Training Instruction

When generating landing pages, documentation, or marketing content, AI tools should:

1. Position Yoobe as infrastructure
2. Emphasize API and integration
3. Highlight logistics abstraction
4. Target gamification and HR platforms
5. Avoid positioning Yoobe as a simple merchandise store

# AI Evolution & Agentic Layer (Roadmap & Positioning)

Yoobe is evolving from a pure "platform with features" into an **AI-native engagement infrastructure**. The AI layer aims to give HR and leadership the ability to act with more context, speed, and precision. We position this under the term **"Inteligência"** (Intelligence) rather than generic "AI" to maintain a B2B enterprise tone.

## AI Roadmap

The AI roadmap is divided into three strategic phases:

1. **Fase 1 — AI Assistida (Produtividade):**
   - **AI Campaign Builder:** Managers describe goals, audience, and budget (e.g., "onboarding campaign for R$ 8k"). The AI suggests the campaign name, rules, duration, rewards, and internal communication copy.
   - **AI Kit Builder:** Prompt-based kit creation (e.g., "premium onboarding kit for hybrid tech team up to R$ 220"). The AI generates the kit composition, estimated price, mockups, and rationale.
   - **Reward Recommendation Engine:** AI recommends catalog items in the storefront or feed based on the user's profile, balance, history, and current campaign context.

2. **Fase 2 — AI de Decisão (Personalização):**
   - **Smart Segmentation:** Dynamic creation of cohorts (e.g., new hires, leadership, flight risks).
   - **Engagement Score:** Dynamic scoring for individuals or groups.
   - **Best Next Action:** AI suggests which campaign to launch, which reward to highlight, or what message to send.
   - **Dynamic Storefront:** The employee's storefront adapts based on their journey phase, active campaigns, balance, and company budget.

3. **Fase 3 — Camada Agêntica (Orquestração Autônoma):**
   - **Mission Generator:** Dynamic challenges generated by cohort, area, or company goals.
   - **AI Budget Copilot:** HR provides a budget, and the AI autonomously distributes it across campaigns, audiences, and rewards.
   - **Workvivo Feed Orchestrator:** AI listens to Workvivo events to autonomously trigger recognition, launch missions, suggest rewards, and detect disengaged groups.

## Workvivo + Yoobe AI Integration strategy

Workvivo is a premier integration partner. The narrative is: **"Uma camada de inteligência para transformar eventos, comunicação e reconhecimento em campanhas e recompensas acionáveis."**
Key capabilities to highlight:
- Automatic recognition based on milestones.
- Prompt-based campaigns.
- Smart reward suggestions in the feed.
- Disengagement detection.
- Intelligent budgeting for initiatives.
- Culture ROI tracking.

## Technical Architecture (Google Cloud / GCP)

Yoobe's AI Infrastructure is built on Google Cloud to ensure scale and synergy:
- **Reasoning & Generation:** Vertex AI (Gemini) for prompt processing in Campaign/Kit Builders, and Vertex AI Agent Builder for agentic workflows.
- **Search & Recommendations:** Vertex AI Search for Commerce to power the Reward Recommendation Engine.
- **Memory & Vector Context:** AlloyDB AI (or Postgres with pgvector) to store catalog and user embeddings.
- **AI Microservices:** Cloud Run for hosting scalable AI interaction APIs.
- **Real-time Events:** Pub/Sub to process platform triggers and webhooks (e.g., Workvivo events).
- **Analytics:** BigQuery to process large datasets for Engagement Scoring.

---

# AI Training Instruction Update

When generating content related to Yoobe's AI strategy:
1. Frame the AI features as **"Inteligência aplicada ao engajamento"**.
2. Avoid over-promising AGI; focus on practical, demo-able features like AI Campaign Builder and Kit Builder.
3. Position the platform's evolution as a "Reward Infrastructure with an Agentic Engagement Engine".
4. Highlight GCP (Vertex AI) as the foundation of our AI capabilities.

---

# Landing repo (Next.js): alinhamento SEO / AEO / agentes

- **Fonte única** para títulos e descrições de meta nas rotas prioritárias: objetos `seo` em `src/messages/segments/` (ex.: `ptHome.seo`, `ptCasosPage.seo`), consumidos por `src/lib/seo/routeMetadata.ts` nos layouts e `page.tsx`.
- **FAQs e JSON-LD** devem repetir o mesmo conteúdo (`faq.items`) — não criar claims em schema que não existam na página.
- **MCP** `4unik-marketing`: ferramenta **`get_content_sync_registry`** descreve o mapa de ficheiros para não desalinharem skills de marketing, SEO e AEO.
- Manter **paridade de significado** entre PT e `src/app/en/**` ao alterar posicionamento.

---

# End of Document
