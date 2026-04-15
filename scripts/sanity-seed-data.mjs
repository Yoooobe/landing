function portableTextBlocks(paragraphs) {
  return paragraphs.map((paragraph, index) => ({
    _key: `block-${index + 1}`,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `span-${index + 1}`,
        _type: "span",
        marks: [],
        text: paragraph,
      },
    ],
  }));
}

function heroBlock(key, values) {
  return {
    _key: key,
    _type: "heroBlock",
    ...values,
  };
}

function richTextSection(key, title, paragraphs) {
  return {
    _key: key,
    _type: "richTextSection",
    title,
    content: portableTextBlocks(paragraphs),
  };
}

function ctaBlock(key, values) {
  return {
    _key: key,
    _type: "ctaBlock",
    ...values,
  };
}

function featureGridBlock(key, values) {
  return {
    _key: key,
    _type: "featureGridBlock",
    ...values,
    items: (values.items || []).map((item, index) => ({
      _key: `${key}-feature-${index + 1}`,
      ...item,
    })),
  };
}

function splitContentBlock(key, values) {
  return {
    _key: key,
    _type: "splitContentBlock",
    ...values,
    body: values.body ? portableTextBlocks(values.body) : [],
  };
}

function logoStripBlock(key, values) {
  return {
    _key: key,
    _type: "logoStripBlock",
    ...values,
    items: (values.items || []).map((item, index) => ({
      _key: `${key}-logo-${index + 1}`,
      ...item,
    })),
  };
}

function caseStudyGridBlock(key, values) {
  return {
    _key: key,
    _type: "caseStudyGridBlock",
    ...values,
    items: (values.items || []).map((item, index) => ({
      _key: `${key}-case-${index + 1}`,
      ...item,
      metrics: (item.metrics || []).map((metric, metricIndex) => ({
        _key: `${key}-case-${index + 1}-metric-${metricIndex + 1}`,
        ...metric,
      })),
    })),
  };
}

function faqBlock(key, title, items) {
  return {
    _key: key,
    _type: "faqBlock",
    title,
    items: items.map((item, index) => ({
      _key: `${key}-item-${index + 1}`,
      ...item,
    })),
  };
}

function statsBlock(key, title, items) {
  return {
    _key: key,
    _type: "statsBlock",
    title,
    items: items.map((item, index) => ({
      _key: `${key}-stat-${index + 1}`,
      ...item,
    })),
  };
}

function testimonialBlock(key, title, items) {
  return {
    _key: key,
    _type: "testimonialBlock",
    title,
    items: items.map((item, index) => ({
      _key: `${key}-testimonial-${index + 1}`,
      ...item,
    })),
  };
}

function legacySectionBlock(key, section, note) {
  return {
    _key: key,
    _type: "legacySectionBlock",
    section,
    ...(note ? { note } : {}),
  };
}

function inteligenciaBlocks(locale) {
  const isEn = locale === "en";
  const page = isEn
    ? {
        hero: {
          badge: "4Unik AI Layer",
          titleBefore: "Intelligence applied to",
          titleGradient: "employee engagement",
          sub: "Turn campaigns, rewards, and journeys into more personalized, measurable, scalable actions-a new era of recognition infrastructure.",
        },
        cards: [
          {
            title: "AI Campaign Builder",
            desc: "Launch campaigns from goals, audience, and budget in minutes-with suggested rules and ready-to-use copy.",
            icon: "brain-circuit",
          },
          {
            title: "AI Kit Builder",
            desc: "Build kits by context and value band with real-time budgets and fast mockups.",
            icon: "package",
          },
          {
            title: "Smart Recommendations",
            desc: "Recommend unique rewards and experiences based on consumption profile, active campaigns, and balance.",
            icon: "target",
          },
          {
            title: "AI insights for HR",
            desc: "See where to act, which groups to activate proactively, and how to maximize program ROI.",
            icon: "bar-chart-3",
          },
        ],
        workvivo: {
          titleBefore: "Workvivo",
          titleGradient: "+ 4Unik AI Layer",
          sub: "An intelligence layer that turns events, comms, and recognition into highly actionable, trackable campaigns and rewards.",
          cases: [
            {
              title: "Automatic recognition",
              desc: "The system spots milestones and suggests actionable recognition right in the social feed.",
              icon: "zap",
            },
            {
              title: "Prompt-driven campaigns",
              desc: "HR launches segmented campaigns from intent alone-the platform handles the rest.",
              icon: "message-square",
            },
            {
              title: "Reward suggestions",
              desc: "Contextual prize suggestions that can triple conversion among employees.",
              icon: "target",
            },
            {
              title: "Disengagement detection",
              desc: "Monitor at-risk teams and prioritize actions before attrition.",
              icon: "shield",
            },
            {
              title: "Smart budgeting",
              desc: "Flexible budget allocation and forecasting across initiatives.",
              icon: "coins",
            },
            {
              title: "Culture ROI",
              desc: "Track and prove gamification impact on productivity and turnover reduction.",
              icon: "bar-chart-3",
            },
          ],
        },
        faq: {
          title: "Questions about Intelligence at 4Unik",
          items: [
            {
              question: "What does “Intelligence” mean at 4Unik?",
              answer:
                "It is 4Unik's B2B framing for AI applied to engagement: campaign and kit builders, recommendations, and insights-without overpromising AGI; the focus is productivity and orchestration for HR.",
            },
            {
              question: "How does 4Unik work with Workvivo?",
              answer:
                "The integration pairs social feed events with actionable campaigns and rewards; the intelligence layer adds suggestions, recognition signals, and disengagement risk cues.",
            },
            {
              question: "What is on the AI roadmap?",
              answer:
                "Prompt-assisted campaigns, personalized kits, reward recommendations, and HR insights-progressive autonomy over time, as described on this page.",
            },
            {
              question: "Does 4Unik replace my HRIS or ERP?",
              answer:
                "No. 4Unik is reward and engagement infrastructure that integrates; systems of record stay the source of truth.",
            },
          ],
        },
        cta: {
          title: "A natively intelligent strategy",
          sub: "Get ready to orchestrate organic, data-guided recognition-modern HR infrastructure.",
          button: "See the AI roadmap",
        },
      }
    : {
        hero: {
          badge: "4Unik AI Layer",
          titleBefore: "Inteligência aplicada ao",
          titleGradient: "engajamento corporativo",
          sub: "Transforme campanhas, recompensas e jornadas em ações mais personalizadas, mensuráveis e escaláveis. Uma nova era de infraestrutura de reconhecimento.",
        },
        cards: [
          {
            title: "AI Campaign Builder",
            desc: "Crie campanhas a partir de objetivos, público e budget em minutos, com regras sugeridas e copy pronto.",
            icon: "brain-circuit",
          },
          {
            title: "AI Kit Builder",
            desc: "Monte kits personalizados por contexto e faixa de valor, com orçamentos em tempo real e mockups rápidos.",
            icon: "package",
          },
          {
            title: "Smart Recommendations",
            desc: "Sugira recompensas e experiências únicas com base em perfil de consumo, campanhas ativas e saldo.",
            icon: "target",
          },
          {
            title: "AI Insights for RH",
            desc: "Descubra onde agir, quais grupos ativar proativamente e como maximizar o ROI do seu programa.",
            icon: "bar-chart-3",
          },
        ],
        workvivo: {
          titleBefore: "Workvivo",
          titleGradient: "+ 4Unik AI Layer",
          sub: "Uma camada de inteligência para transformar eventos, comunicação e reconhecimento em campanhas e recompensas altamente acionáveis e rastreáveis.",
          cases: [
            {
              title: "Reconhecimento automático",
              desc: "A inteligência identifica marcos e sugere reconhecimentos acionáveis diretamente no feed social.",
              icon: "zap",
            },
            {
              title: "Campanhas por prompt",
              desc: "RH cria campanhas segmentadas escrevendo apenas intenções, e a plataforma cuida do resto.",
              icon: "message-square",
            },
            {
              title: "Sugestão de recompensas",
              desc: "Sugestões de prêmios contextualizados que geram o triplo de conversão entre os colaboradores.",
              icon: "target",
            },
            {
              title: "Detecção de desengajamento",
              desc: "Monitoramento de times em risco e sugestão de ações prioritárias antes da evasão.",
              icon: "shield",
            },
            {
              title: "Budget inteligente",
              desc: "Distribuição e previsão de orçamentos flexíveis aplicados a diferentes iniciativas.",
              icon: "coins",
            },
            {
              title: "ROI de Cultura",
              desc: "Acompanhe e comprove o impacto da gamificação na produtividade e redução de turnover.",
              icon: "bar-chart-3",
            },
          ],
        },
        faq: {
          title: "Dúvidas sobre Inteligência na 4Unik",
          items: [
            {
              question: "O que significa “Inteligência” na 4Unik?",
              answer:
                "É o posicionamento B2B da 4Unik para recursos de IA aplicados ao engajamento: builders de campanha e kits, recomendações e insights - sem prometer AGI; foco em produtividade e orquestração para RH.",
            },
            {
              question: "Como a 4Unik se relaciona com Workvivo?",
              answer:
                "A integração combina eventos e feed social com campanhas e recompensas acionáveis; a camada de inteligência sugere reações, campanhas e sinais de desengajamento em cima desse fluxo.",
            },
            {
              question: "Quais capacidades estão na roadmap de IA?",
              answer:
                "Incluem campanhas assistidas por prompt, kits personalizados, recomendações de recompensas e insights para RH - evolução gradual até fluxos mais autônomos, conforme descrito na página.",
            },
            {
              question: "A 4Unik substitui o meu HRIS ou ERP?",
              answer:
                "Não. A 4Unik é infraestrutura de recompensas e engajamento que se integra; dados mestres e folha continuam nos sistemas de origem.",
            },
          ],
        },
        cta: {
          title: "Sua estratégia nativamente inteligente",
          sub: "Prepare-se para orquestrar reconhecimento orgânico guiado por dados. A infraestrutura para RH moderno.",
          button: "Quero conhecer a evolução AI",
        },
      };

  return [
    heroBlock("hero", {
      headline: `${page.hero.titleBefore} ${page.hero.titleGradient}`,
      subheadline: page.hero.sub,
      ctaText: page.cta.button,
      ctaLink: "https://calendly.com/yoobeco/demo",
      imagePath: "public/cms-seed/intelligence-hero.svg",
      imageAlt: isEn
        ? "AI layer overview for employee engagement"
        : "Visão editorial da camada de inteligência aplicada ao engajamento",
    }),
    featureGridBlock("core-capabilities", {
      eyebrow: page.hero.badge,
      title: isEn ? "What the intelligence layer unlocks" : "O que a camada de inteligência desbloqueia",
      description: isEn
        ? "Core capabilities that turn engagement operations into a more adaptive, personalized, and measurable program."
        : "Capacidades centrais para transformar a operação de engajamento em algo mais adaptativo, personalizado e mensurável.",
      imagePath: "public/cms-seed/intelligence-core-capabilities.svg",
      imageAlt: isEn
        ? "Visual composition of AI capabilities for campaigns, kits, and recommendations"
        : "Composição visual das capacidades de IA para campanhas, kits e recomendações",
      columns: "2",
      items: page.cards,
    }),
    featureGridBlock("workvivo-ai", {
      eyebrow: isEn ? "Workvivo + AI" : "Workvivo + IA",
      title: `${page.workvivo.titleBefore} ${page.workvivo.titleGradient}`,
      description: page.workvivo.sub,
      imagePath: "public/cms-seed/intelligence-workvivo-ai.svg",
      imageAlt: isEn
        ? "Workvivo and AI orchestration visual"
        : "Visual da orquestração entre Workvivo e a camada de IA",
      columns: "3",
      items: page.workvivo.cases,
    }),
    faqBlock("faq", page.faq.title, page.faq.items),
    ctaBlock("cta", {
      eyebrow: isEn ? "Next step" : "Próximo passo",
      title: page.cta.title,
      description: page.cta.sub,
      primaryLabel: page.cta.button,
      primaryHref: "https://calendly.com/yoobeco/demo",
      imagePath: "public/cms-seed/intelligence-hero.svg",
      imageAlt: isEn
        ? "AI layer visual for the final CTA"
        : "Visual da camada de inteligência para o CTA final",
    }),
  ];
}

function casosBlocks(locale) {
  const isEn = locale === "en";
  const page = isEn
    ? {
        hero: {
          badge: "Global case studies",
          titleBefore: "Real outcomes from",
          titleGradient: "market leaders",
          titleAfter: ".",
          sub: "How SAP, Deloitte, IBM, Microsoft, and CaLLogix used gamification infrastructure to solve complex HR, sales, and community problems.",
        },
        caseStudies: {
          challengeLabel: "Challenge solved",
          resultsLabel: "Proven results",
          cases: [
            {
              company: "SAP",
              industry: "Enterprise technology",
              title: "Gamification in the SAP Community Network",
              description:
                "SAP redesigned its developer community reputation system and rolled out gamified learning platforms.",
              challenge: "Low community participation and the need to improve retention of technical knowledge.",
              metrics: [
                { value: "+400%", label: "Community usage" },
                { value: "+96%", label: "Feedback" },
                { value: "-25%", label: "Training costs", tone: "success" },
              ],
            },
            {
              company: "Deloitte",
              industry: "Consulting & audit",
              title: "Gamified leadership at Deloitte University",
              description:
                "Deloitte transformed its leadership curriculum with gamification, turning mandatory training into engaging experiences.",
              challenge: "Low completion rates for leadership programs-leaders weren’t finishing courses on time.",
              metrics: [
                { value: "+50%", label: "Course completion" },
                { value: "+47%", label: "Return rate" },
                { value: "3x", label: "More engagement" },
              ],
            },
            {
              company: "CaLLogix",
              industry: "Contact center",
              title: "Turnover reduction with gamification",
              description:
                "CaLLogix faced high churn and absenteeism. It implemented gamification focused on behavioral rewards.",
              challenge: "Very high turnover and chronic absenteeism in contact centers, driving up costs.",
              metrics: [
                { value: "-50%", label: "Turnover", tone: "success" },
                { value: "-80%", label: "Absenteeism", tone: "success" },
                { value: "US$ 380k", label: "Annual savings", tone: "accent" },
              ],
            },
            {
              company: "IBM",
              industry: "Technology",
              title: "Elite seller training",
              description:
                "IBM ran gamified programs to upskill sellers on technical topics, blending simulations and regional challenges.",
              challenge: "Sellers needed deep technical skills, but training saw low adoption.",
              metrics: [
                { value: "+18%", label: "Sales lift" },
                { value: "+70%", label: "Knowledge retention" },
                { value: "2x", label: "Onboarding speed" },
              ],
            },
            {
              company: "Microsoft",
              industry: "Security & OS",
              title: "Language Quality Game & beta testing",
              description:
                "Microsoft used gamification to improve Windows OS translations and dramatically increase beta participation.",
              challenge: "Inconsistent translation quality and low employee participation in bug review.",
              metrics: [
                { value: "+400%", label: "Beta participation" },
                { value: "26k", label: "Tasks completed" },
                { value: "4,500", label: "Bugs reported" },
              ],
            },
          ],
        },
        faq: {
          title: "Questions on use cases and 4Unik",
          items: [
            {
              question: "What is 4Unik in the context of corporate gamification?",
              answer:
                "4Unik is reward infrastructure: API, catalog, and fulfillment for teams that already run or are building engagement-often integrated with the 4unik V3 platform for gamification and incentive programs.",
            },
            {
              question: "Do these case studies use 4Unik directly?",
              answer:
                "The stories highlight enterprises that invested in gamification and community programs with public outcomes. They illustrate the class of problems engagement infrastructure solves; 4Unik positions itself as reward infrastructure and integrations for similar programs.",
            },
            {
              question: "How should I choose reward infrastructure for my program?",
              answer:
                "Evaluate API-first integration, catalog depth and logistics coverage, privacy compliance, and whether you need a standalone catalog or a full platform with a gamification engine-criteria aligned with what 4Unik delivers alongside 4unik V3.",
            },
            {
              question: "Where can I read about APIs and integrations?",
              answer:
                "The API & integrations section covers webhooks, ecosystem, and partners; 4Unik emphasizes API integration so rewards fit your stack.",
            },
          ],
        },
        cta: {
          title: "Ready to be our next success story?",
          body: "4Unik’s abstract infrastructure spans call-center engagement to software-engineer training programs.",
          button: "Discuss my use case",
        },
      }
    : {
        hero: {
          badge: "Estudos de Caso Global",
          titleBefore: "Resultados reais de",
          titleGradient: "gigantes",
          titleAfter: " do mercado.",
          sub: "Veja como SAP, Deloitte, IBM, Microsoft e CaLLogix utilizaram infraestruturas de gamificação para resolver problemas complexos de RH, vendas e comunidade.",
        },
        caseStudies: {
          challengeLabel: "O Desafio Resolvido",
          resultsLabel: "Resultados Comprovados",
          cases: [
            {
              company: "SAP",
              industry: "Tecnologia Enterprise",
              title: "Gamificação no SAP Community Network",
              description:
                "A SAP regamificou seu sistema de reputação na comunidade de desenvolvedores e implementou plataformas de aprendizado gamificadas.",
              challenge: "Baixa participação na comunidade e necessidade de melhorar a retenção de conhecimento técnico.",
              metrics: [
                { value: "+400%", label: "Uso da comunidade" },
                { value: "+96%", label: "Feedback" },
                { value: "-25%", label: "Custos de treinamento", tone: "success" },
              ],
            },
            {
              company: "Deloitte",
              industry: "Consultoria & Auditoria",
              title: "Liderança gamificada na Deloitte University",
              description:
                "A Deloitte transformou seu programa de capacitação de líderes com gamificação, tornando treinamentos obrigatórios em experiências engajadoras.",
              challenge: "Baixa taxa de conclusão em programas de liderança. Líderes não completavam os cursos em tempo hábil.",
              metrics: [
                { value: "+50%", label: "Conclusão de cursos" },
                { value: "+47%", label: "Taxa de retorno" },
                { value: "3x", label: "Mais engajamento" },
              ],
            },
            {
              company: "CaLLogix",
              industry: "Contact Center",
              title: "Redução de turnover com gamificação",
              description:
                "A CaLLogix enfrentava altos índices de rotatividade e absenteísmo. Implementou gamificação focada em recompensas comportamentais.",
              challenge: "Rotatividade altíssima e absenteísmo crônico no setor de contact center, gerando altos custos.",
              metrics: [
                { value: "-50%", label: "Rotatividade", tone: "success" },
                { value: "-80%", label: "Absenteísmo", tone: "success" },
                { value: "US$ 380k", label: "Economia anual", tone: "accent" },
              ],
            },
            {
              company: "IBM",
              industry: "Tecnologia",
              title: "Treinamento de vendedores de elite",
              description:
                "A IBM implementou programas gamificados para capacitar vendedores em habilidades técnicas, combinando simulações e desafios regionais.",
              challenge: "Vendedores precisavam dominar habilidades técnicas complexas, mas treinamentos tinham baixa adesão.",
              metrics: [
                { value: "+18%", label: "Aumento em vendas" },
                { value: "+70%", label: "Retenção de conhecimento" },
                { value: "2x", label: "Velocidade onboarding" },
              ],
            },
            {
              company: "Microsoft",
              industry: "Segurança & OS",
              title: "Language Quality Game & Beta Testing",
              description:
                "A Microsoft usou gamificação para melhorar traduções do Windows OS e para ampliar drasticamente a participação em testes beta.",
              challenge: "Qualidade inconsistente de traduções e baixa participação de funcionários em revisão de bugs.",
              metrics: [
                { value: "+400%", label: "Participação beta" },
                { value: "26k", label: "Tarefas completadas" },
                { value: "4.500", label: "Bugs reportados" },
              ],
            },
          ],
        },
        faq: {
          title: "Perguntas sobre casos de uso e 4Unik",
          items: [
            {
              question: "O que é a 4Unik em relação à gamificação corporativa?",
              answer:
                "A 4Unik é uma camada de infraestrutura de recompensas (Reward Infrastructure): API, catálogo e fulfillment para quem já tem ou está construindo engajamento - frequentemente integrada à plataforma 4unik V3 para gamificação e programas de incentivo.",
            },
            {
              question: "Estes casos usam a 4Unik diretamente?",
              answer:
                "Os estudos citam gigantes que investiram em gamificação e comunidades com resultados públicos. Eles ilustram o tipo de problema que infraestrutura de engajamento resolve; a 4Unik posiciona-se como infraestrutura de recompensas e integrações para programas semelhantes.",
            },
            {
              question: "Como escolher uma infraestrutura de recompensas para o meu programa?",
              answer:
                "Avalie integração por API, catálogo e cobertura logística, conformidade (LGPD), e se o modelo é catálogo avulso ou plataforma completa com motor de gamificação - critérios alinhados ao que a 4Unik oferece em conjunto com a 4unik V3.",
            },
            {
              question: "Onde vejo integrações e API?",
              answer:
                "Na área de API e integrações do site encontram-se visão de webhooks, ecossistema e parceiros; a 4Unik enfatiza integração por API para encaixar recompensas no seu fluxo.",
            },
          ],
        },
        cta: {
          title: "Pronto para ser o nosso próximo case?",
          body: "A infraestrutura abstrata da 4Unik resolve desde engajamento de call centers até treinamento de engenheiros de software.",
          button: "Discutir Meu Caso de Uso",
        },
      };

  return [
    heroBlock("hero", {
      headline: `${page.hero.titleBefore} ${page.hero.titleGradient}${page.hero.titleAfter || ""}`,
      subheadline: page.hero.sub,
    }),
    caseStudyGridBlock("case-studies", {
      challengeLabel: page.caseStudies.challengeLabel,
      resultsLabel: page.caseStudies.resultsLabel,
      items: page.caseStudies.cases,
    }),
    faqBlock("faq", page.faq.title, page.faq.items),
    ctaBlock("cta", {
      eyebrow: isEn ? "Next step" : "Próximo passo",
      title: page.cta.title,
      description: page.cta.body,
      primaryLabel: page.cta.button,
      primaryHref: "https://calendly.com/yoobeco/demo",
    }),
  ];
}

function plataformaBlocks(locale) {
  const isEn = locale === "en";
  const page = isEn
    ? {
        hero: {
          titleLine1: "Total visibility.",
          titleGradient: "Faster decisions.",
          sub: "Real-time analytics with eNPS, ROI, and redemption metrics. Budget approvals, bulk import, and direct ERP export—with full privacy compliance.",
        },
        pageCta: {
          title: "Ready for full control?",
          cta: "Request a demo",
        },
        adminDashboard: {
          badge: "Manager console (admin)",
          titleBefore: "Own the rules of the ",
          titleGradient: "game",
          titleAfter: ".",
          body: "Where supervisors, HR, and budget owners govern the rules—e-commerce / ERP-style visibility over currency, SLAs, and reward logistics.",
          bullets: [
            {
              title: "SLA monitoring",
              body: "See where every kit is—from warehouse to doorstep—with integrated last-mile tracking and D+1 delivery.",
            },
            {
              title: "Cost centers (budgeting)",
              body: "Manage approvals, split billing by department, and ship unified reports to finance—no loose spreadsheets.",
            },
            {
              title: "User base & levels",
              body: "Map roles, set starting coin balances, and separate operational vs. admin groups.",
            },
            {
              title: "Visual charts (BI)",
              body: "Spot top redeemed items each quarter and monitor ongoing team satisfaction.",
            },
          ],
        },
        gamificationEngine: {
          badge: "Gamification engine",
          titleBefore: "The ",
          titleGradient: "heart",
          titleAfter: " of engagement.",
          body: "Turn one-off or ongoing org goals (e.g. monthly sales, culture, feedback) into points inside a psychologically sound reward loop.",
          cards: [
            {
              title: "Time-bound campaigns",
              body: "Set start, end, and prize rules for a “Q3 sales push.” The engine scores conversion and awards badges when goals close.",
            },
            {
              title: "Peer-to-peer points",
              body: "Let employees send gratitude points that reinforce company values and 360° recognition.",
            },
          ],
          flowTitle: "Logical flow (autonomous events)",
          flow: {
            node1Title: "CRM webhook",
            node2Title: "4unik engine",
            node3Title: "Push app",
          },
        },
        store: {
          badge: "Premium VIP catalog",
          titleBefore: "A VIP store with ",
          titleGradient: "your brand",
          titleAfter: " front and center.",
          bodyBefore:
            "Stop managing stock or buying products employees don’t want. 4unik V3 fills the store with 5,000+ quality SWAGs featuring ",
          bodyStrong: "YOUR BRAND",
          bodyAfter: " with on-demand shipping.",
          features: [
            {
              title: "B2C-grade experience for B2B",
              desc: "Filters, categories, rich product mockups, and fast transparent checkouts in the “coins” your company defines.",
            },
            {
              title: "Physical & digital mix",
              desc: "Blend swag with iFood, Uber, streaming, or VISA gift cards—so every generation at work finds something they want.",
            },
          ],
        },
        logistics: {
          title: "End-to-end logistics.",
          sub: "We’re not just software—we run the warehouse. Every redeemed reward is picked, packed, and shipped from our facilities with military precision.",
          cards: [
            {
              title: "Owned inventory",
              body: "Store corporate swag with us or use our partner catalog. B2C fulfillment straight to each employee’s home.",
            },
            {
              title: "National coverage",
              body: "Deep carrier integrations for optimized freight and tracked delivery—even to remote regions.",
            },
            {
              title: "Issue resolution",
              body: "Lost or damaged? We handle reship and reverse logistics automatically—no HR fire drills.",
            },
          ],
        },
        security: {
          badge: "Enterprise security",
          title: "Security, corporate SSO & privacy",
          body: "We protect highly sensitive people data (shipping addresses, tax IDs, department names). Our platform meets strict due diligence from banks and global tech enterprises.",
          items: [
            {
              title: "SAML / SSO (Active Directory)",
              body: "Microsoft Entra ID (Azure AD), Okta, or Google Workspace. When someone leaves, access is revoked instantly.",
            },
            {
              title: "Encryption & audit logs",
              body: "Every coin movement or HR permission change is recorded immutably in audit logs for five years.",
            },
          ],
        },
        faq: {
          titleBefore: "Questions about the",
          titleGradient: "4unik V3 platform",
          titleAfter: "",
          items: [
            {
              q: "Is 4unik V3 just a swag catalog?",
              a: "No. 4unik V3 is reward infrastructure: administration, gamification engine (on the 4unik V3 stack), catalog, fulfillment, and integrations—built for engagement and incentive programs, not a standalone storefront.",
            },
            {
              q: "How does reward fulfillment work?",
              a: "Operations cover catalog, stock, shipping, and post-sale support; managers track SLAs and deliveries in the console, with tracking and reverse logistics when needed.",
            },
            {
              q: "Does the platform scale to thousands of employees?",
              a: "Yes—cost-center separation, roles, SSO, and reporting for large populations, with an enterprise-grade architecture.",
            },
            {
              q: "Where do APIs and integrations fit?",
              a: "Events and data flow through APIs and webhooks to CRMs, HRIS, and channels like Workvivo; the API section of the site explains the ecosystem.",
            },
          ],
        },
      }
    : {
        hero: {
          titleLine1: "Visibilidade total.",
          titleGradient: "Decisões mais rápidas.",
          sub: "Dashboard analítico em tempo real com métricas de eNPS, ROI e taxas de resgate. Aprovação de orçamentos, importação em massa e exportação direta para o ERP — com conformidade total à LGPD.",
        },
        pageCta: {
          title: "Pronto para ter o controle total?",
          cta: "Solicitar Demonstração",
        },
        adminDashboard: {
          badge: "Painel do Gestor (Admin)",
          titleBefore: "Governe as regras do ",
          titleGradient: "jogo",
          titleAfter: ".",
          body: "O ambiente onde supervisores, RH e gestores orçamentais governam as regras. Inspirado em painéis de e-commerce e ERPs, mantendo visibilidade 100% sobre R$, prazos e entregas logísticas dos prêmios.",
          bullets: [
            {
              title: "Monitoramento de SLA's",
              body: "Saiba extamente onde está cada kit enviado para a casa dos funcionários corporativos com rastreio Last-Mile integrado D+1.",
            },
            {
              title: "Centros de Custo (Budgeting)",
              body: "Controle aprovações, segregue faturamentos por departamentos e emita relatórios unificados para o time financeiro sem planilhas soltas.",
            },
            {
              title: "Base de Usuários & Níveis",
              body: "Mapeie cargos, determine o balanço inicial de moedas e crie grupos operacionais e administrativos separados.",
            },
            {
              title: "Gráficos Visuais (BI)",
              body: "Identifique os itens mais resgatados do trimestre. Monitore o índice de satisfação contínua da equipe.",
            },
          ],
        },
        gamificationEngine: {
          badge: "Motor de Gamificação",
          titleBefore: "O ",
          titleGradient: "coração",
          titleAfter: " do engajamento.",
          body: "Converta objetivos organizacionais pontuais ou contínuos (ex: venda do mês, cultura e feedbacks) em pontos dentro de um ciclo de recompensa comprovado psicologicamente.",
          cards: [
            {
              title: "Campanhas Temporárias",
              body: 'Defina o Início, o Fim e a Premiação X de uma "Campanha de Vendas Q3". O sistema calcula a conversão e aplica os Badges apropriados ao fim da meta.',
            },
            {
              title: "Pontuação Peer-to-Peer",
              body: "Permita que funcionários enviem frações de pontos de gratidão para colegas validando Valores da Empresa e cultura (Reconhecimento 360).",
            },
          ],
          flowTitle: "Fluxo Lógico (Eventos Autônomos)",
          flow: {
            node1Title: "Webhook CRM",
            node2Title: "Motor 4unik",
            node3Title: "Push App",
          },
        },
        store: {
          badge: "Catálogo Premium VIP",
          titleBefore: "Uma loja VIP com a marca da sua ",
          titleGradient: "empresa",
          titleAfter: ".",
          bodyBefore:
            "Esqueça gerenciar estoques ou comprar produtos que seus funcionários sequer querem. A 4unik V3 preenche automaticamente a loja com mais de 5.000 SWAGs de alta qualidade com a ",
          bodyStrong: "MARCA DA SUA EMPRESA",
          bodyAfter: " e envios on-demand.",
          features: [
            {
              title: "Experiência B2C para B2B",
              desc: 'Filtros, categorias, mockups detalhados de produtos impressos, e checkouts velozes e transparentes no valor em "moedas" que sua empresa estipulou.',
            },
            {
              title: "Mix Físico & Digital",
              desc: "Incorpore aos Swags os GiftCards p/ Ifood, Uber, Streaming ou Cartões Presente VISA, abrigando qualquer preferência das mais variadas gerações no trabalho.",
            },
          ],
        },
        logistics: {
          title: "Logística ponta a ponta.",
          sub: "Não somos apenas um software. Somos os donos do armazém. O prêmio resgatado é processado, embalado e despachado pelas nossas facilities com precisão militar.",
          cards: [
            {
              title: "Estoque Próprio",
              body: "Armazene seus brindes corporativos (swag) conosco ou utilize o nosso catálogo de parceiros. Fulfillment B2C para a residência de cada colaborador.",
            },
            {
              title: "Cobertura Nacional",
              body: "Integração profunda com correios e transportadoras privadas para garantir frete otimizado e entrega rastreada até as regiões mais remotas.",
            },
            {
              title: "Resolução de Sinistros",
              body: "Extraviou? Quebrou? Nós fazemos o reenvio e a logística reversa automaticamente sem acionar a sua equipe de RH.",
            },
          ],
        },
        security: {
          badge: "Segurança Enterprise",
          title: "Segurança, SSO Corporativo & LGPD",
          body: "Lidamos com dados da sua equipe de altíssima prioridade (endereços de entrega, CPFs, nomes de departamento). Nossa plataforma passa pelas mais estritas due-diligences de bancos e empresas Globais de tech.",
          items: [
            {
              title: "SAML / SSO Active Directory",
              body: "Integração com Microsoft Entra ID (Azure AD), Okta ou Google Workspace. Se um colaborador sai da empresa, o acesso é quebrado instantaneamente na plataforma.",
            },
            {
              title: "Criptografia e Logs (Audit Trail)",
              body: "Qualquer movimentação de moedas ou mudança de permissões do RH fica impressa de forma imutável nos logs de auditoria do sistema por 5 anos.",
            },
          ],
        },
        faq: {
          titleBefore: "Perguntas sobre a",
          titleGradient: "plataforma",
          titleAfter: "4unik V3",
          items: [
            {
              q: "A 4unik V3 é só um catálogo de brindes?",
              a: "Não. A 4unik V3 é infraestrutura de recompensas: administração, motor de gamificação (na stack 4unik V3), catálogo, fulfillment e integrações — pensada para programas de engajamento e incentivo, não para um e‑commerce avulso.",
            },
            {
              q: "Como funciona o fulfillment de recompensas?",
              a: "A operação cobre catálogo, estoque, envio e suporte pós-venda; o gestor acompanha SLAs e entregas no painel, com rastreio e logística reversa quando necessário.",
            },
            {
              q: "A plataforma escala para milhares de colaboradores?",
              a: "Sim: segregação por centro de custo, perfis e SSO, com relatórios e governança para grandes bases — arquitetura alinhada a programas enterprise.",
            },
            {
              q: "Onde entram API e integrações?",
              a: "Eventos e dados fluem por API e webhooks para CRM, HRIS e canais como Workvivo; a área de API do site detalha o ecossistema.",
            },
          ],
        },
      };
  const roadmap = isEn
    ? {
        badge: "Intelligent assistant",
        titleBefore: "Intelligence and assistants woven through ",
        titleGradient: "the entire journey",
        titleAfter: " of engagement and gamification.",
        stages: [
          {
            title: "Campaign creation",
            status: "Proactive",
            items: ["AI Campaign Builder", "Automatic segmentation", "Data-grounded context", "Predictive engagement"],
          },
          {
            title: "Reward management",
            status: "Personalization",
            items: ["AI Kit Builder", "Smart recommendations", "Dynamic catalog", "Reward intelligence"],
          },
          {
            title: "Continuous orchestration",
            status: "Automation",
            items: ["Adaptive missions", "Event-driven actions", "Feed integrations", "Agentic engagement"],
          },
          {
            title: "Strategy & ROI",
            status: "Decision",
            items: ["AI insights for HR", "Budget copilot", "Retention analysis", "Attrition forecasting"],
          },
        ],
      }
    : {
        badge: "Assistente Inteligente",
        titleBefore: "Inteligência e assistentes integrados em ",
        titleGradient: "toda a jornada",
        titleAfter: " de engajamento e gamificação.",
        stages: [
          {
            title: "Criação de Campanhas",
            status: "Proatividade",
            items: ["AI Campaign Builder", "Segmentação automática", "Contexto base em dados", "Engajamento preditivo"],
          },
          {
            title: "Gestão de Recompensas",
            status: "Personalização",
            items: ["AI Kit Builder", "Smart Recommendations", "Catálogo dinâmico", "Reward intelligence"],
          },
          {
            title: "Orquestração Contínua",
            status: "Automação",
            items: ["Missões adaptativas", "Ações por evento", "Feed integrations", "Agentic engagement"],
          },
          {
            title: "Estratégia e ROI",
            status: "Decisão",
            items: ["AI Insights for RH", "Budget copilot", "Análise de retenção", "Previsão de evasão"],
          },
        ],
      };

  return [
    heroBlock("hero", {
      headline: `${page.hero.titleLine1} ${page.hero.titleGradient}`,
      subheadline: page.hero.sub,
      ctaText: page.pageCta.cta,
      ctaLink: "https://calendly.com/yoobeco/demo",
      imagePath: "public/cms-seed/platform-hero-overview.svg",
      imageAlt: isEn
        ? "Platform overview visual for 4Unik reward infrastructure"
        : "Visual editorial da visão geral da plataforma 4Unik",
    }),
    splitContentBlock("admin-dashboard", {
      eyebrow: page.adminDashboard.badge,
      title: `${page.adminDashboard.titleBefore}${page.adminDashboard.titleGradient}${page.adminDashboard.titleAfter}`,
      body: [page.adminDashboard.body],
      bullets: page.adminDashboard.bullets.map((item) => `${item.title}: ${item.body}`),
      imageSide: "right",
      imagePath: "public/cms-seed/platform-admin-dashboard.svg",
      imageAlt: isEn
        ? "Manager dashboard mockup for the 4Unik platform"
        : "Mockup do painel do gestor da plataforma 4Unik",
    }),
    splitContentBlock("gamification-engine-intro", {
      eyebrow: page.gamificationEngine.badge,
      title: `${page.gamificationEngine.titleBefore}${page.gamificationEngine.titleGradient}${page.gamificationEngine.titleAfter}`,
      body: [page.gamificationEngine.body],
      bullets: [
        `${page.gamificationEngine.flowTitle}: ${page.gamificationEngine.flow.node1Title} -> ${page.gamificationEngine.flow.node2Title} -> ${page.gamificationEngine.flow.node3Title}`,
      ],
      imageSide: "left",
      imagePath: "public/cms-seed/platform-gamification-flow.svg",
      imageAlt: isEn
        ? "Visual flow of the 4Unik gamification engine"
        : "Fluxo visual do motor de gamificação da 4Unik",
    }),
    featureGridBlock("gamification-engine-cards", {
      eyebrow: isEn ? "Engine mechanics" : "Mecânicas do motor",
      title: isEn ? "How the platform turns goals into reward loops" : "Como a plataforma transforma metas em ciclos de recompensa",
      description: isEn
        ? "Use campaigns, peer recognition, and event-driven logic as reusable building blocks."
        : "Use campanhas, reconhecimento entre pares e lógica orientada a eventos como blocos reutilizáveis.",
      columns: "2",
      items: page.gamificationEngine.cards.map((item, index) => ({
        title: item.title,
        description: item.body,
        icon: index === 0 ? "target" : "coins",
      })),
    }),
    splitContentBlock("store-intro", {
      eyebrow: page.store.badge,
      title: `${page.store.titleBefore}${page.store.titleGradient}${page.store.titleAfter}`,
      body: [`${page.store.bodyBefore}${page.store.bodyStrong}${page.store.bodyAfter}`],
      imageSide: "right",
      imagePath: "public/cms-seed/platform-store-showcase.svg",
      imageAlt: isEn
        ? "Rewards storefront mockup for the 4Unik platform"
        : "Mockup da loja de recompensas da plataforma 4Unik",
    }),
    featureGridBlock("store-features", {
      eyebrow: isEn ? "Store operations" : "Operação da loja",
      title: isEn ? "A catalog experience employees actually want to use" : "Uma experiência de catálogo que os colaboradores realmente querem usar",
      description: isEn
        ? "Blend physical and digital rewards into one redemption flow."
        : "Combine recompensas físicas e digitais em um único fluxo de resgate.",
      columns: "2",
      items: page.store.features.map((item, index) => ({
        title: item.title,
        description: item.desc,
        icon: index === 0 ? "store" : "sparkles",
      })),
    }),
    featureGridBlock("logistics", {
      eyebrow: isEn ? "Fulfillment" : "Fulfillment",
      title: page.logistics.title,
      description: page.logistics.sub,
      imagePath: "public/cms-seed/platform-logistics-panel.svg",
      imageAlt: isEn
        ? "Integrated logistics and delivery tracking visual panel"
        : "Painel visual da logística integrada e rastreio de entregas",
      columns: "3",
      items: page.logistics.cards.map((item, index) => ({
        title: item.title,
        description: item.body,
        icon: index === 0 ? "package" : index === 1 ? "globe-2" : "shield",
      })),
    }),
    featureGridBlock("ai-roadmap", {
      eyebrow: roadmap.badge,
      title: `${roadmap.titleBefore}${roadmap.titleGradient}${roadmap.titleAfter}`,
      description: isEn
        ? "The same platform can evolve from operational control to intelligent orchestration."
        : "A mesma plataforma pode evoluir do controle operacional para a orquestração inteligente.",
      columns: "4",
      items: roadmap.stages.map((stage, index) => ({
        eyebrow: stage.status,
        title: stage.title,
        description: stage.items.join(" • "),
        icon: index === 0 ? "sparkles" : index === 1 ? "coins" : index === 2 ? "zap" : "bar-chart-3",
      })),
    }),
    splitContentBlock("security", {
      eyebrow: page.security.badge,
      title: page.security.title,
      body: [page.security.body],
      bullets: page.security.items.map((item) => `${item.title}: ${item.body}`),
      imageSide: "left",
      imagePath: "public/cms-seed/platform-security-panel.svg",
      imageAlt: isEn
        ? "Enterprise security, SSO, and audit panel"
        : "Painel visual de segurança enterprise, SSO e auditoria",
    }),
    faqBlock(
      "faq",
      `${page.faq.titleBefore} ${page.faq.titleGradient} ${page.faq.titleAfter}`.trim(),
      page.faq.items.map((item) => ({
        question: item.q,
        answer: item.a,
      })),
    ),
    ctaBlock("cta", {
      eyebrow: isEn ? "Next step" : "Próximo passo",
      title: page.pageCta.title,
      primaryLabel: page.pageCta.cta,
      primaryHref: "https://calendly.com/yoobeco/demo",
      imagePath: "public/cms-seed/platform-hero-overview.svg",
      imageAlt: isEn
        ? "Platform overview visual for the final CTA"
        : "Visual editorial da plataforma para o CTA final",
    }),
  ];
}

const blogPosts = [
  {
    _id: "blogPost.pt.guia-definitivo-gamificacao-rh-moderno",
    _type: "blogPost",
    title: "O Guia Definitivo da Gamificacao no RH Moderno",
    slug: { _type: "slug", current: "guia-definitivo-gamificacao-rh-moderno" },
    locale: "pt",
    excerpt:
      "Descubra como empresas lideres usam mecanicas de jogo para reduzir turnover e aumentar o engajamento da equipe.",
    category: "Engajamento",
    publishedAt: "2026-03-12T00:00:00.000Z",
    readTimeMinutes: 8,
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    imageAlt: "Equipe de RH analisando metricas de engajamento",
    relatedKeywords: ["gamificacao no RH", "engajamento", "turnover"],
    seo: {
      metaTitle: "Guia de gamificacao para RH | 4unik",
      metaDescription:
        "Veja como programas de gamificacao ajudam RHs modernos a reduzir turnover e elevar o engajamento.",
    },
    body: portableTextBlocks([
      "Gamificacao em RH nao e sobre distribuir badges aleatoriamente. O que gera resultado e alinhar objetivos de negocio, reconhecimento e jornadas claras para lideres e colaboradores.",
      "As empresas que melhor executam este modelo criam missoes recorrentes, feedback visivel e recompensas ligadas a comportamentos que ja importam para a cultura, como colaboracao, aprendizagem e consistencia operacional.",
      "Quando o programa esta conectado a uma plataforma de comunicacao, reconhecimento e resgate, o colaborador entende rapidamente o valor da participacao e a gestao passa a ter sinais reais sobre adesao, evolucao e impacto.",
    ]),
  },
  {
    _id: "blogPost.pt.sla-logistica-premiacoes-d1",
    _type: "blogPost",
    title: "SLA de Logistica em Premiacao: Por que D+1 muda tudo",
    slug: { _type: "slug", current: "sla-logistica-premiacao-d1" },
    locale: "pt",
    excerpt:
      "A frustracao do colaborador com o premio atrasado pode destruir toda a experiencia. Veja como a infraestrutura 4unik resolve isso.",
    category: "Logistica",
    publishedAt: "2026-03-05T00:00:00.000Z",
    readTimeMinutes: 5,
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop",
    imageAlt: "Centro logistico com pacotes e rastreamento",
    relatedKeywords: ["logistica de premiacao", "SLA", "D+1"],
    seo: {
      metaTitle: "SLA D+1 em premiacao corporativa | 4unik",
      metaDescription:
        "Entenda por que a velocidade de entrega muda a percepcao do colaborador sobre programas de incentivo.",
    },
    body: portableTextBlocks([
      "Num programa de incentivos, a promessa termina apenas quando o colaborador recebe o premio. Se a entrega falha, toda a narrativa de reconhecimento perde credibilidade.",
      "Por isso o SLA logistico precisa ser tratado como parte da experiencia, e nao como operacao de bastidor. D+1 cria previsibilidade, reduz ansiedade e protege a percepcao de valor da campanha.",
      "A gestao ganha ainda mais quando consegue rastrear pedidos, antecipar rupturas e integrar fulfillment com catalogo, saldo e regras de resgate num unico fluxo.",
    ]),
  },
  {
    _id: "blogPost.pt.reconhecimento-360-peer-to-peer",
    _type: "blogPost",
    title: "Reconhecimento 360: o poder do feedback peer-to-peer",
    slug: { _type: "slug", current: "reconhecimento-360-peer-to-peer" },
    locale: "pt",
    excerpt:
      "Como estruturar um sistema onde colaboradores reconhecem colegas, promovendo a cultura da empresa de forma organica.",
    category: "Cultura",
    publishedAt: "2026-02-28T00:00:00.000Z",
    readTimeMinutes: 6,
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
    imageAlt: "Colegas trocando feedback em equipe",
    relatedKeywords: ["peer-to-peer", "reconhecimento 360", "cultura"],
    seo: {
      metaTitle: "Reconhecimento 360 e peer-to-peer | 4unik",
      metaDescription:
        "Saiba como desenhar programas de reconhecimento entre pares que reforcam cultura e colaboracao.",
    },
    body: portableTextBlocks([
      "Programas peer-to-peer funcionam porque tiram o reconhecimento do ciclo exclusivo da lideranca e permitem que a cultura seja validada no dia a dia, entre pessoas que trabalham juntas.",
      "Para evitar ruido, e essencial definir criterios claros, limites de uso e visibilidade suficiente para que o reconhecimento seja inspirador, mas nao inflacionado.",
      "Quando o reconhecimento e conectado a dados de equipe, campanhas tematicas e recompensas, a empresa transforma pequenos gestos recorrentes num ativo mensuravel de cultura.",
    ]),
  },
  {
    _id: "blogPost.pt.welcome-kits-primeira-impressao",
    _type: "blogPost",
    title: "Welcome Kits: causando a melhor primeira impressao",
    slug: { _type: "slug", current: "welcome-kits-primeira-impressao" },
    locale: "pt",
    excerpt:
      "O onboarding e crucial. Veja exemplos de cases de sucesso em kits de boas-vindas corporativos montados na plataforma 4unik V3.",
    category: "Kits & Eventos",
    publishedAt: "2026-02-15T00:00:00.000Z",
    readTimeMinutes: 4,
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2670&auto=format&fit=crop",
    imageAlt: "Kit de boas-vindas corporativo sobre uma mesa",
    relatedKeywords: ["welcome kits", "onboarding", "employee experience"],
    seo: {
      metaTitle: "Welcome kits e onboarding | 4unik",
      metaDescription:
        "Veja como kits de boas-vindas podem reforcar branding interno e acelerar o onboarding.",
    },
    body: portableTextBlocks([
      "A primeira entrega fisica que um colaborador recebe da empresa define expectativa. Um welcome kit bem desenhado comunica cultura, cuidado e preparacao.",
      "As melhores operacoes combinam personalizacao, logistica confiavel e integracao com campanhas de onboarding, para que o kit nao seja um brinde isolado, mas parte de uma jornada.",
      "Quando RH e marketing interno trabalham a mesma narrativa, o welcome kit deixa de ser custo de admissao e passa a ser ativo de marca empregadora.",
    ]),
  },
  {
    _id: "blogPost.en.definitive-guide-hr-gamification",
    _type: "blogPost",
    title: "The definitive guide to HR gamification",
    slug: { _type: "slug", current: "definitive-guide-hr-gamification" },
    locale: "en",
    excerpt:
      "How leading companies use game mechanics to reduce turnover and lift team engagement.",
    category: "Engagement",
    publishedAt: "2026-03-12T00:00:00.000Z",
    readTimeMinutes: 8,
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    imageAlt: "HR team reviewing engagement metrics",
    relatedKeywords: ["HR gamification", "engagement", "turnover"],
    seo: {
      metaTitle: "HR gamification guide | 4unik",
      metaDescription:
        "Learn how modern HR teams use gamification to improve engagement and retention.",
    },
    body: portableTextBlocks([
      "Effective HR gamification is not about adding points on top of existing workflows. It is about making progress visible, rewarding the right behaviors, and creating momentum across teams.",
      "The strongest programs tie missions and recognition to business priorities such as onboarding quality, learning, collaboration, and leadership consistency.",
      "When the experience is connected to a single engagement and rewards platform, HR gains operational clarity while employees get a simple and motivating journey.",
    ]),
  },
  {
    _id: "blogPost.en.rewards-logistics-sla-d1",
    _type: "blogPost",
    title: "Rewards logistics SLAs: why D+1 changes everything",
    slug: { _type: "slug", current: "rewards-logistics-sla-d1" },
    locale: "en",
    excerpt:
      "A late prize can ruin the experience - see how 4unik infrastructure fixes delivery expectations.",
    category: "Logistics",
    publishedAt: "2026-03-05T00:00:00.000Z",
    readTimeMinutes: 5,
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop",
    imageAlt: "Logistics warehouse with package tracking",
    relatedKeywords: ["rewards logistics", "SLA", "D+1"],
    seo: {
      metaTitle: "D+1 SLA for rewards logistics | 4unik",
      metaDescription:
        "See why fast delivery is a core part of the employee rewards experience.",
    },
    body: portableTextBlocks([
      "An incentive campaign is only complete when the reward is actually delivered. If the handoff fails, trust in the whole program drops with it.",
      "That is why logistics SLAs must be designed as part of the experience layer, not as a backstage operation. D+1 reduces friction and protects perceived value.",
      "With the right stack, teams can track orders, connect catalogs and balance rules, and turn fulfillment into a strategic capability instead of a bottleneck.",
    ]),
  },
  {
    _id: "blogPost.en.recognition-360-peer-to-peer",
    _type: "blogPost",
    title: "360 recognition: the power of peer-to-peer feedback",
    slug: { _type: "slug", current: "recognition-360-peer-to-peer" },
    locale: "en",
    excerpt:
      "How to structure programs where peers recognize peers and reinforce culture organically.",
    category: "Culture",
    publishedAt: "2026-02-28T00:00:00.000Z",
    readTimeMinutes: 6,
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
    imageAlt: "Colleagues sharing recognition in the office",
    relatedKeywords: ["peer-to-peer", "360 recognition", "culture"],
    seo: {
      metaTitle: "Peer-to-peer recognition programs | 4unik",
      metaDescription:
        "Build peer recognition programs that strengthen culture without creating noise.",
    },
    body: portableTextBlocks([
      "Peer recognition works because it moves appreciation closer to the work itself. Teams see the behaviors that matter and can reinforce them in real time.",
      "The system only scales well when it has clear rules, healthy limits, and enough visibility to keep recognition meaningful instead of performative.",
      "When connected to campaigns, rewards, and team insights, peer-to-peer recognition becomes a measurable lever for culture building.",
    ]),
  },
  {
    _id: "blogPost.en.welcome-kits-first-impression",
    _type: "blogPost",
    title: "Welcome kits: making the best first impression",
    slug: { _type: "slug", current: "welcome-kits-first-impression" },
    locale: "en",
    excerpt:
      "Onboarding matters - examples of standout welcome kits built on the 4unik V3 platform.",
    category: "Kits & events",
    publishedAt: "2026-02-15T00:00:00.000Z",
    readTimeMinutes: 4,
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2670&auto=format&fit=crop",
    imageAlt: "Corporate welcome kit arranged on a desk",
    relatedKeywords: ["welcome kits", "onboarding", "employee experience"],
    seo: {
      metaTitle: "Welcome kits for onboarding | 4unik",
      metaDescription:
        "Use welcome kits to strengthen employer brand and improve the first employee experience.",
    },
    body: portableTextBlocks([
      "The first physical experience a new employee has with a company shapes expectations immediately. A strong welcome kit signals care, clarity, and readiness.",
      "The best programs combine personalization, reliable logistics, and onboarding campaigns so the kit feels like a meaningful part of the journey.",
      "When HR and internal marketing align on the same story, welcome kits become more than swag - they become a branded onboarding asset.",
    ]),
  },
];

const marketingPages = [
  {
    _id: "marketingPage.pt.reward-infrastructure",
    _type: "marketingPage",
    title: "Infraestrutura de recompensas para employee engagement",
    slug: { _type: "slug", current: "infraestrutura-de-recompensas" },
    locale: "pt",
    summary:
      "Landing editorial base para explicar como a 4unik V3 conecta engajamento, recompensas e logistica.",
    seo: {
      metaTitle: "Infraestrutura de recompensas e engagement | 4unik",
      metaDescription:
        "Entenda como a plataforma conecta campanhas, API, catalogo e fulfillment para operacoes de engagement.",
    },
    content: [
      heroBlock("hero", {
        headline: "4unik conecta engajamento, recompensas e logistica",
        subheadline:
          "Uma base editorial para explicar a plataforma, posicionar a oferta e acelerar a migracao gradual da landing para o CMS.",
        ctaText: "Agendar demonstracao",
        ctaLink: "https://calendly.com/yoobeco/demo",
      }),
      richTextSection("context", "Como esta pagina deve ser usada", [
        "Esta landing page no Sanity serve como primeira fonte editorial para substituir gradualmente o conteudo estatico do site. O objetivo e testar fluxo de criacao, revisao e publicacao para o time de marketing.",
        "O posicionamento principal combina plataforma de engagement, catalogo de recompensas, operacao logistica e integracoes para RH, comunicacao interna e squads tecnicos.",
      ]),
      featureGridBlock("features", {
        eyebrow: "Editor visual",
        title: "Blocos que o marketing consegue rearranjar sem mexer no código",
        description:
          "Este documento agora demonstra um page builder real no Studio. O time pode combinar grids, seções com imagem, faixas de logos, CTA e texto rico.",
        columns: "3",
        items: [
          {
            eyebrow: "Narrativa",
            title: "Grade de features",
            description: "Cards com ícones, título, descrição e link opcional para montar propostas de valor e diferenciais.",
            icon: "sparkles",
          },
          {
            eyebrow: "Storytelling",
            title: "Texto + imagem",
            description: "Seções editoriais com rich text, bullets, CTAs e mídia lateral para construir páginas mais densas.",
            icon: "brain-circuit",
          },
          {
            eyebrow: "Credibilidade",
            title: "Faixa de logos",
            description: "Espaço para clientes, parceiros ou integrações sem depender de componentes hardcoded do frontend.",
            icon: "shield",
          },
        ],
      }),
      splitContentBlock("builder-story", {
        eyebrow: "Modo WYSIWYG",
        title: "Edite a landing como conteúdo, não como deploy",
        body: [
          "O Studio passa a oferecer blocos mais próximos de um editor visual. Você continua com estrutura e consistência, mas sem ficar preso apenas a blocos legados.",
          "O ideal aqui não é um campo HTML solto. O ideal é um construtor por blocos com rich text, imagens e CTAs, porque isso mantém SEO, responsividade e identidade visual sob controle.",
        ],
        bullets: [
          "Reordenar seções direto no Studio",
          "Editar rich text com links, listas e destaques",
          "Montar páginas novas combinando blocos reaproveitáveis",
        ],
        imageSide: "right",
        primaryLabel: "Abrir Studio",
        primaryHref: "https://yoooobe.github.io/landing/studio/",
      }),
      statsBlock("stats", "Indicadores que sustentam a narrativa", [
        {
          value: "92%",
          label: "Adesao do time",
          supportingText: "Media esperada nos primeiros 30 dias de campanha bem operada",
        },
        {
          value: "0%",
          label: "Trabalho manual do RH em resgates",
          supportingText: "Quando catalogo, pontos e fulfillment estao integrados",
        },
        {
          value: "+42 pts",
          label: "Impacto potencial em eNPS",
          supportingText: "Usar como referencia comercial e editorial, nao como promessa fixa",
        },
      ]),
      faqBlock("faq", "Perguntas frequentes para a versao inicial", [
        {
          question: "Esta pagina ja substitui a home publica?",
          answer:
            "Ainda nao. Nesta fase, ela vive no admin como documento editorial enquanto o frontend e migrado gradualmente para consumir blocos do Sanity.",
        },
        {
          question: "Quando um conteudo da landing exige rebuild?",
          answer:
            "Sempre que ele for renderizado no build estatico do Next.js, incluindo SEO, hero e futuras paginas de marketing publicadas a partir do CMS.",
        },
        {
          question: "Quem deve editar este documento?",
          answer:
            "Times de marketing, conteudo e growth com acesso convidado no Sanity Studio e alinhamento com o fluxo de publicacao descrito em docs/cms.md.",
        },
      ]),
      testimonialBlock("testimonials", "Mensagens-chave para vendas e marketing", [
        {
          quote:
            "Unificar engagement, recompensas e logistica numa narrativa so acelera vendas e reduz atrito na operacao.",
          author: "Time 4Unik",
          role: "Marketing e Growth",
          company: "4Unik / 4unik V3",
        },
        {
          quote:
            "O admin precisa funcionar como fonte unica de verdade para blog, landing pages e estrategias em evolucao.",
          author: "Time editorial",
          role: "Conteudo",
          company: "4Unik / 4unik V3",
        },
      ]),
      logoStripBlock("logos", {
        eyebrow: "Exemplo visual",
        title: "Use logos e marcas como prova social",
        description:
          "Os itens aceitam imagem ou só nome. Isso permite publicar rapidamente uma faixa de parceiros mesmo antes do time subir todos os assets finais.",
        items: [
          { name: "Workvivo", href: "https://www.workvivo.com/" },
          { name: "Zoom", href: "https://www.zoom.us/" },
          { name: "4Unik", href: "https://4unik.com.br/" },
          { name: "Yoobe", href: "https://yoooobe.github.io/landing/" },
        ],
      }),
      ctaBlock("cta", {
        eyebrow: "Proximo passo",
        title: "Transformar esta base editorial em pagina publica",
        description:
          "A proxima etapa e ligar as paginas de marketing do frontend a estes blocos, mantendo fallback seguro e rebuild quando necessario.",
        primaryLabel: "Agendar demonstracao",
        primaryHref: "https://calendly.com/yoobeco/demo",
        secondaryLabel: "Falar no WhatsApp",
        secondaryHref: "https://wa.me/554187582060",
      }),
    ],
  },
  {
    _id: "marketingPage.en.reward-infrastructure",
    _type: "marketingPage",
    title: "Reward infrastructure for employee engagement",
    slug: { _type: "slug", current: "reward-infrastructure" },
    locale: "en",
    summary:
      "Initial marketing page used to explain how 4unik V3 connects engagement, rewards, and logistics.",
    seo: {
      metaTitle: "Reward infrastructure for engagement | 4unik",
      metaDescription:
        "See how the platform combines campaigns, API, catalog, and fulfillment in one operational layer.",
    },
    content: [
      heroBlock("hero", {
        headline: "4unik connects engagement, rewards, and logistics",
        subheadline:
          "A first editorial landing page in Sanity to support the gradual migration away from static marketing copy.",
        ctaText: "Book a demo",
        ctaLink: "https://calendly.com/yoobeco/demo",
      }),
      richTextSection("context", "How this page should be used", [
        "This marketing page acts as the first editorial source of truth for replacing static landing content over time. It gives the team a controlled workflow for drafting, reviewing, and publishing.",
        "The core positioning combines engagement platform capabilities, rewards catalog, logistics, and integrations for HR, internal comms, and technical squads.",
      ]),
      featureGridBlock("features", {
        eyebrow: "Visual editor",
        title: "Blocks marketing can rearrange without touching code",
        description:
          "This document now demonstrates a real page builder inside Studio. The team can combine grids, split sections, logo bands, CTAs, and rich text.",
        columns: "3",
        items: [
          {
            eyebrow: "Narrative",
            title: "Feature grid",
            description: "Cards with icons, titles, descriptions, and optional links for value props and differentiators.",
            icon: "sparkles",
          },
          {
            eyebrow: "Storytelling",
            title: "Split content",
            description: "Editorial sections with rich text, bullets, CTAs, and side media for denser landing pages.",
            icon: "brain-circuit",
          },
          {
            eyebrow: "Credibility",
            title: "Logo strip",
            description: "A dedicated area for customers, partners, or integrations without hardcoded frontend sections.",
            icon: "shield",
          },
        ],
      }),
      splitContentBlock("builder-story", {
        eyebrow: "WYSIWYG mode",
        title: "Edit the landing as content, not as a deploy",
        body: [
          "Studio now offers blocks that behave much closer to a visual editor. You keep structure and consistency without being trapped in legacy-only sections.",
          "A freeform HTML field is not the right default here. A block builder with rich text, imagery, and CTAs preserves SEO, responsiveness, and brand control.",
        ],
        bullets: [
          "Reorder sections directly in Studio",
          "Edit rich text with links, lists, and emphasis",
          "Assemble new pages from reusable blocks",
        ],
        imageSide: "right",
        primaryLabel: "Open Studio",
        primaryHref: "https://yoooobe.github.io/landing/studio/",
      }),
      statsBlock("stats", "Numbers that support the story", [
        {
          value: "92%",
          label: "Team adoption",
          supportingText: "Reference target for the first 30 days of a well-run campaign",
        },
        {
          value: "0%",
          label: "Manual HR work in reward handling",
          supportingText: "When catalog, balance, and fulfillment live in the same flow",
        },
        {
          value: "+42 pts",
          label: "Potential eNPS impact",
          supportingText: "Use as editorial framing, not as a fixed promise",
        },
      ]),
      faqBlock("faq", "Initial FAQ", [
        {
          question: "Does this page already replace the public home page?",
          answer:
            "Not yet. At this stage it lives in the admin as editorial content while the frontend is gradually wired to read marketing blocks from Sanity.",
        },
        {
          question: "When does landing content require a rebuild?",
          answer:
            "Whenever the content is rendered at build time in the static Next.js export, including SEO, hero sections, and future CMS-backed marketing pages.",
        },
        {
          question: "Who should edit this document?",
          answer:
            "Marketing, growth, and content teams with invited access to Sanity Studio and alignment with the publishing flow documented in docs/cms.md.",
        },
      ]),
      testimonialBlock("testimonials", "Editorial positioning notes", [
        {
          quote:
            "Combining engagement, rewards, and logistics into one narrative helps both sales conversations and operational clarity.",
          author: "4Unik team",
          role: "Marketing and Growth",
          company: "4Unik / 4unik V3",
        },
      ]),
      logoStripBlock("logos", {
        eyebrow: "Visual example",
        title: "Use logos and brands as social proof",
        description:
          "Items accept either an image or just a name, so the team can publish partner bands before every final asset is uploaded.",
        items: [
          { name: "Workvivo", href: "https://www.workvivo.com/" },
          { name: "Zoom", href: "https://www.zoom.us/" },
          { name: "4Unik", href: "https://4unik.com.br/" },
          { name: "Yoobe", href: "https://yoooobe.github.io/landing/" },
        ],
      }),
      ctaBlock("cta", {
        eyebrow: "Next step",
        title: "Turn this editorial base into a public page",
        description:
          "The next milestone is wiring public marketing routes to these CMS blocks while preserving safe fallbacks and rebuild guidance.",
        primaryLabel: "Book a demo",
        primaryHref: "https://calendly.com/yoobeco/demo",
        secondaryLabel: "Talk on WhatsApp",
        secondaryHref: "https://wa.me/554187582060",
      }),
    ],
  },
  {
    _id: "marketingPage.pt.home",
    _type: "marketingPage",
    title: "Home",
    slug: { _type: "slug", current: "home" },
    locale: "pt",
    summary: "Home principal da landing, promovida para composicao nativa no marketingPage com apoio de midia compartilhada.",
    seo: {
      metaTitle: "4Unik - Reward Infrastructure | Gamificacao e Recompensas",
      metaDescription:
        "Infraestrutura de recompensas para plataformas de gamificacao e employee engagement. API, catalogo e fulfillment em um so lugar.",
    },
    content: [
      legacySectionBlock("home-hero", "homeHero"),
      legacySectionBlock("home-four-unik", "homeFourUnik"),
      logoStripBlock("home-trust", {
        displayStyle: "compact",
        title: "Empresas que confiam na 4Unik",
        collection: { _type: "reference", _ref: "logoCollection.trustBar" },
      }),
      legacySectionBlock("home-bento", "homeBentoFeatures"),
      legacySectionBlock("home-platform", "homePlatformTabs"),
      legacySectionBlock("home-stats", "homeStatsBar"),
      legacySectionBlock("home-why", "homeWhySection"),
      legacySectionBlock("home-gamification-summary", "homeGamificationSummary"),
      legacySectionBlock("home-gamification-duality", "homeGamificationDuality"),
      legacySectionBlock("home-enterprise-cases", "homeEnterpriseCases"),
      legacySectionBlock("home-integrations", "homeDedicatedIntegrations"),
      legacySectionBlock("home-store", "homeStoreSection"),
      legacySectionBlock("home-api", "homeApiSection"),
      legacySectionBlock("home-ai", "homeAiRoadmap"),
      legacySectionBlock("home-management", "homeManagementSection"),
      legacySectionBlock("home-how", "homeHowItWorks"),
      legacySectionBlock("home-pricing", "homePricingSection"),
      legacySectionBlock("home-testimonials", "homeTestimonialsSection"),
      logoStripBlock("home-clients", {
        displayStyle: "grid",
        sectionId: "clientes",
        eyebrow: "Quem confia na 4Unik",
        title: "Empresas que já transformaram seu RH",
        description:
          "De startups a grandes corporações, ajudamos equipes de RH a criar programas de reconhecimento que funcionam.",
        collection: { _type: "reference", _ref: "logoCollection.clientsGrid" },
      }),
      legacySectionBlock("home-final-cta", "homeFinalCta"),
    ],
  },
  {
    _id: "marketingPage.en.home",
    _type: "marketingPage",
    title: "Home",
    slug: { _type: "slug", current: "home" },
    locale: "en",
    summary: "Main landing home page, promoted to native marketingPage composition with shared showcase media.",
    seo: {
      metaTitle: "4Unik - Reward Infrastructure | Gamification & Rewards",
      metaDescription:
        "Reward infrastructure for gamification and employee engagement platforms. API, catalog, and fulfillment in one place.",
    },
    content: [
      legacySectionBlock("home-hero", "homeHero"),
      legacySectionBlock("home-four-unik", "homeFourUnik"),
      logoStripBlock("home-trust", {
        displayStyle: "compact",
        title: "Companies that trust 4Unik",
        collection: { _type: "reference", _ref: "logoCollection.trustBar" },
      }),
      legacySectionBlock("home-bento", "homeBentoFeatures"),
      legacySectionBlock("home-platform", "homePlatformTabs"),
      legacySectionBlock("home-stats", "homeStatsBar"),
      legacySectionBlock("home-why", "homeWhySection"),
      legacySectionBlock("home-gamification-summary", "homeGamificationSummary"),
      legacySectionBlock("home-gamification-duality", "homeGamificationDuality"),
      legacySectionBlock("home-enterprise-cases", "homeEnterpriseCases"),
      legacySectionBlock("home-integrations", "homeDedicatedIntegrations"),
      legacySectionBlock("home-store", "homeStoreSection"),
      legacySectionBlock("home-api", "homeApiSection"),
      legacySectionBlock("home-ai", "homeAiRoadmap"),
      legacySectionBlock("home-management", "homeManagementSection"),
      legacySectionBlock("home-how", "homeHowItWorks"),
      legacySectionBlock("home-pricing", "homePricingSection"),
      legacySectionBlock("home-testimonials", "homeTestimonialsSection"),
      logoStripBlock("home-clients", {
        displayStyle: "grid",
        sectionId: "clientes",
        eyebrow: "Who trusts 4Unik",
        title: "Companies that have already transformed their people programs",
        description:
          "From startups to large enterprises, we help HR teams run recognition programs that work.",
        collection: { _type: "reference", _ref: "logoCollection.clientsGrid" },
      }),
      legacySectionBlock("home-final-cta", "homeFinalCta"),
    ],
  },
  {
    _id: "marketingPage.pt.api-integracoes",
    _type: "marketingPage",
    title: "API e Integracoes",
    slug: { _type: "slug", current: "api-integracoes" },
    locale: "pt",
    summary: "Pagina principal da oferta de API e integracoes, promovida para blocos nativos no marketingPage.",
    seo: {
      metaTitle: "API e Integracoes | 4unik",
      metaDescription:
        "API REST, webhooks e integracoes para recompensas corporativas, catalogo e fulfillment na plataforma 4unik.",
    },
    content: [legacySectionBlock("api-full-page", "apiIntegracoesPage")],
  },
  {
    _id: "marketingPage.en.api-integracoes",
    _type: "marketingPage",
    title: "API & Integrations",
    slug: { _type: "slug", current: "api-integracoes" },
    locale: "en",
    summary: "Primary API and integrations page promoted to native marketingPage blocks.",
    seo: {
      metaTitle: "API & Integrations | 4unik",
      metaDescription:
        "REST API, webhooks, and integrations for corporate rewards, catalog, and fulfillment - aligned with the 4unik platform.",
    },
    content: [legacySectionBlock("api-full-page", "apiIntegracoesPage")],
  },
  {
    _id: "marketingPage.pt.gamificacao",
    _type: "marketingPage",
    title: "Gamificacao Corporativa",
    slug: { _type: "slug", current: "gamificacao" },
    locale: "pt",
    summary: "Pagina da oferta de gamificacao corporativa em migracao para blocos nativos do marketingPage com composicao visual editavel.",
    seo: {
      metaTitle: "Gamificacao Corporativa | 4unik",
      metaDescription:
        "Motor de gamificacao corporativa com pontos, rankings, desafios, recompensas reais e analytics para RH e liderancas.",
    },
    content: [
      legacySectionBlock("gamificacao-hero", "gamificacaoHero"),
      legacySectionBlock("gamificacao-problem", "gamificacaoProblem"),
      legacySectionBlock("gamificacao-mechanics", "gamificacaoMechanics"),
      legacySectionBlock("gamificacao-flow", "gamificacaoFlow"),
      legacySectionBlock("gamificacao-cases", "gamificacaoCases"),
      legacySectionBlock("gamificacao-trends", "gamificacaoTrends"),
      legacySectionBlock("gamificacao-stats", "gamificacaoStats"),
      legacySectionBlock("gamificacao-kpis", "gamificacaoKpis"),
      legacySectionBlock("gamificacao-usecases", "gamificacaoDeepUsecases"),
      legacySectionBlock("gamificacao-faq", "gamificacaoFaq"),
      legacySectionBlock("gamificacao-cta", "gamificacaoCta"),
    ],
  },
  {
    _id: "marketingPage.en.gamificacao",
    _type: "marketingPage",
    title: "Corporate Gamification",
    slug: { _type: "slug", current: "gamificacao" },
    locale: "en",
    summary: "Gamification offer page migrating to native marketingPage blocks with editable visual composition.",
    seo: {
      metaTitle: "Corporate Gamification | 4unik",
      metaDescription:
        "Corporate gamification engine with points, rankings, missions, real rewards, and analytics for HR and business leaders.",
    },
    content: [
      legacySectionBlock("gamificacao-hero", "gamificacaoHero"),
      legacySectionBlock("gamificacao-problem", "gamificacaoProblem"),
      legacySectionBlock("gamificacao-mechanics", "gamificacaoMechanics"),
      legacySectionBlock("gamificacao-flow", "gamificacaoFlow"),
      legacySectionBlock("gamificacao-cases", "gamificacaoCases"),
      legacySectionBlock("gamificacao-trends", "gamificacaoTrends"),
      legacySectionBlock("gamificacao-stats", "gamificacaoStats"),
      legacySectionBlock("gamificacao-kpis", "gamificacaoKpis"),
      legacySectionBlock("gamificacao-usecases", "gamificacaoDeepUsecases"),
      legacySectionBlock("gamificacao-faq", "gamificacaoFaq"),
      legacySectionBlock("gamificacao-cta", "gamificacaoCta"),
    ],
  },
  {
    _id: "marketingPage.pt.plataforma",
    _type: "marketingPage",
    title: "Plataforma",
    slug: { _type: "slug", current: "plataforma" },
    locale: "pt",
    summary: "Visao geral da plataforma estruturada em blocos nativos do marketingPage, com composicao visual editavel no CMS.",
    seo: {
      metaTitle: "Plataforma | 4unik V3 - Reward Infrastructure",
      metaDescription:
        "Painel analitico, motor de gamificacao, loja de resgates, logistica e seguranca enterprise. Infraestrutura de recompensas e fulfillment para programas de engajamento.",
    },
    content: plataformaBlocks("pt"),
  },
  {
    _id: "marketingPage.en.plataforma",
    _type: "marketingPage",
    title: "Platform",
    slug: { _type: "slug", current: "plataforma" },
    locale: "en",
    summary: "Platform overview page modeled with native marketingPage blocks and editable visual composition in the CMS.",
    seo: {
      metaTitle: "Platform | 4unik V3 - Reward Infrastructure",
      metaDescription:
        "Analytics console, gamification engine, redemption store, logistics, and enterprise security. Reward infrastructure and fulfillment for engagement programs.",
    },
    content: plataformaBlocks("en"),
  },
  {
    _id: "marketingPage.pt.inteligencia",
    _type: "marketingPage",
    title: "Inteligencia",
    slug: { _type: "slug", current: "inteligencia" },
    locale: "pt",
    summary: "Narrativa de inteligencia aplicada ao engajamento estruturada em blocos nativos com composicao visual editavel.",
    seo: {
      metaTitle: "Inteligencia | 4Unik - Reward Infrastructure",
      metaDescription:
        "Camada de inteligencia para engajamento: campanhas assistidas, kits, recomendacoes e integracao com Workvivo. Roadmap de IA aplicada ao RH.",
    },
    content: inteligenciaBlocks("pt"),
  },
  {
    _id: "marketingPage.en.inteligencia",
    _type: "marketingPage",
    title: "Intelligence",
    slug: { _type: "slug", current: "inteligencia" },
    locale: "en",
    summary: "AI and intelligence narrative structured with native blocks and editable visual composition.",
    seo: {
      metaTitle: "Intelligence | 4Unik - Reward Infrastructure",
      metaDescription:
        "An intelligence layer for engagement: assisted campaigns, kits, recommendations, and Workvivo integration. A practical AI roadmap for HR.",
    },
    content: inteligenciaBlocks("en"),
  },
  {
    _id: "marketingPage.pt.casos-de-uso",
    _type: "marketingPage",
    title: "Casos de Uso",
    slug: { _type: "slug", current: "casos-de-uso" },
    locale: "pt",
    summary: "Pagina de estudos de caso e provas de mercado organizada com blocos nativos reutilizaveis.",
    seo: {
      metaTitle: "Casos de uso | 4Unik - Reward Infrastructure",
      metaDescription:
        "Estudos de caso de empresas globais em gamificacao corporativa e comunidades. Como gigantes escalam engajamento - e como a 4Unik fornece infraestrutura de recompensas.",
    },
    content: casosBlocks("pt"),
  },
  {
    _id: "marketingPage.en.casos-de-uso",
    _type: "marketingPage",
    title: "Use Cases",
    slug: { _type: "slug", current: "casos-de-uso" },
    locale: "en",
    summary: "Case studies and proof points page organized through reusable legacy sections.",
    seo: {
      metaTitle: "Use cases | 4Unik - Reward Infrastructure",
      metaDescription:
        "Global enterprise case studies in corporate gamification and communities. How market leaders scale engagement-and how 4Unik provides reward infrastructure.",
    },
    content: casosBlocks("en"),
  },
];

const marketingStrategies = [
  {
    _id: "marketingStrategy.pt.pilar-engajamento-recompensas",
    _type: "marketingStrategy",
    title: "Pilar editorial: engajamento e infraestrutura de recompensas",
    slug: { _type: "slug", current: "pilar-engajamento-recompensas" },
    locale: "pt",
    pillar: "Engajamento e performance",
    status: "active",
    summary:
      "Documento base para orientar temas de blog, landing pages e campanhas sobre engagement, gamificacao e operacao de recompensas.",
    seo: {
      metaTitle: "Pilar editorial de engajamento | 4unik",
      metaDescription:
        "Base estrategica para conteudo de engagement, reconhecimento, recompensas e logistica.",
    },
    body: [
      ...portableTextBlocks([
        "Este documento organiza a narrativa editorial da marca em torno de tres frentes: aumento de engajamento, reducao de esforco operacional do RH e consistencia na experiencia de recompensas.",
        "O blog deve explorar dores, dados e casos praticos. As landing pages devem traduzir essas mensagens em proposta de valor e CTA. As campanhas devem usar a mesma linguagem para evitar desalinhamento entre canais.",
      ]),
      statsBlock("core-metrics", "Metricas para orientar conteudo", [
        {
          value: "3",
          label: "Frentes narrativas principais",
          supportingText: "Engajamento, eficiencia operacional e experiencia de recompensa",
        },
        {
          value: "1",
          label: "Fonte unica de verdade",
          supportingText: "Sanity Studio como admin para blog, marketing e evolucao editorial",
        },
      ]),
      faqBlock("editorial-faq", "Perguntas que o conteudo deve responder", [
        {
          question: "Como a plataforma reduz trabalho manual do RH?",
          answer:
            "Mostrando integracao entre pontos, catalogo, resgate, notificacoes e fulfillment num fluxo unico e auditavel.",
        },
        {
          question: "Como provar valor para decisores?",
          answer:
            "Combinando provas de operacao, clareza de implementacao, narrativa de impacto em cultura e indicadores de adesao.",
        },
      ]),
      ctaBlock("editorial-cta", {
        eyebrow: "Acao recomendada",
        title: "Converter esta estrategia em calendario editorial",
        description:
          "Use este documento para priorizar os proximos artigos, FAQs, paginas de oferta e campanhas da 4Unik.",
        primaryLabel: "Abrir Studio",
        primaryHref: "https://yoooobe.github.io/landing/studio/",
      }),
    ],
  },
  {
    _id: "marketingStrategy.en.engagement-rewards-editorial-pillar",
    _type: "marketingStrategy",
    title: "Editorial pillar: engagement and reward infrastructure",
    slug: { _type: "slug", current: "engagement-rewards-editorial-pillar" },
    locale: "en",
    pillar: "Engagement and performance",
    status: "active",
    summary:
      "Starter strategy document for blog themes, landing pages, and campaign narratives around engagement, gamification, and reward operations.",
    seo: {
      metaTitle: "Engagement editorial pillar | 4unik",
      metaDescription:
        "Strategic foundation for content about engagement, recognition, rewards, and logistics.",
    },
    body: [
      ...portableTextBlocks([
        "This document defines the editorial narrative around three themes: stronger engagement, less manual HR work, and a more reliable reward experience.",
        "Blog posts should explore pain points, proof, and practical examples. Landing pages should translate those ideas into positioning and clear calls to action. Campaigns should reuse the same message architecture across channels.",
      ]),
      statsBlock("core-metrics", "Editorial operating points", [
        {
          value: "3",
          label: "Core narrative themes",
          supportingText: "Engagement, operational efficiency, and reward experience",
        },
        {
          value: "1",
          label: "Source of truth",
          supportingText: "Sanity Studio as the admin layer for blog and marketing content",
        },
      ]),
      faqBlock("editorial-faq", "Questions the content should answer", [
        {
          question: "How does the platform reduce manual HR work?",
          answer:
            "By connecting points, catalog, redemption, notifications, and fulfillment into one trackable operating flow.",
        },
        {
          question: "How do we prove value to decision-makers?",
          answer:
            "By combining operational proof, implementation clarity, cultural impact, and adoption indicators in one consistent story.",
        },
      ]),
      ctaBlock("editorial-cta", {
        eyebrow: "Recommended action",
        title: "Turn this strategy into an editorial calendar",
        description:
          "Use this document to prioritize upcoming articles, FAQs, offer pages, and campaigns in Sanity.",
        primaryLabel: "Open Studio",
        primaryHref: "https://yoooobe.github.io/landing/studio/",
      }),
    ],
  },
];

export const seedDocuments = {
  siteSettings: {
    _id: "siteSettings",
    _type: "siteSettings",
    environmentLabel: "production",
    calendlyUrl: "https://calendly.com/yoobeco/demo",
    whatsappUrl: "https://wa.me/554187582060",
    contactEmail: "comercial@4unik.com.br",
    appLoginUrl: "https://4unik.yoobe.me/",
    rewardsCatalogUrl: "https://catalogo.yoobe.co",
    companySiteUrl: "https://4unik.com.br",
    privacyUrl: "https://4unik.com.br/politica-de-privacidade",
    termsUrl: "https://4unik.com.br/termos-de-uso",
    headerMenuPt: { _type: "reference", _ref: "menu.header.pt" },
    headerMenuEn: { _type: "reference", _ref: "menu.header.en" },
    footerMenuPt: { _type: "reference", _ref: "menu.footer.pt" },
    footerMenuEn: { _type: "reference", _ref: "menu.footer.en" },
    trustLogoCollection: { _type: "reference", _ref: "logoCollection.trustBar" },
    clientsLogoCollection: { _type: "reference", _ref: "logoCollection.clientsGrid" },
    headerWordmarkPath: "public/brand/4unik-wordmark.png",
    headerWordmarkAlt: "4Unik",
    footerWordmarkPath: "public/brand/4unik-wordmark.png",
    footerWordmarkAlt: "4Unik",
  },
  menus: [
    {
      _id: "menu.header.pt",
      _type: "menu",
      title: "Header PT",
      menuKey: "header",
      locale: "pt",
      sections: [
        {
          _key: "produto",
          title: "Plataforma",
          items: [
            {
              _key: "overview",
              label: "Visão Geral",
              description: "A base da sua operação e gestão.",
              href: "/plataforma",
              icon: "overview",
            },
            {
              _key: "gamification",
              label: "Gamificação",
              description: "Engaje e premie seu time com mecânicas de jogos.",
              href: "/plataforma/motor-gamificacao",
              badge: "CORE",
              icon: "gamification",
            },
            {
              _key: "intelligence",
              label: "Inteligência",
              description: "IA avançada para campanhas e recomendações.",
              href: "/inteligencia",
              badge: "NEW",
              icon: "intelligence",
            },
          ],
        },
        {
          _key: "solucoes",
          title: "Soluções",
          items: [
            {
              _key: "cases",
              label: "Casos de Sucesso",
              description: "Veja quem já transforma o RH.",
              href: "/casos-de-uso",
              icon: "cases",
            },
            {
              _key: "rewards",
              label: "Hub de Prêmios",
              description: "Milhares de opções incríveis para encantar.",
              href: "https://catalogo.yoobe.co",
              icon: "rewards",
              openInNewTab: true,
            },
          ],
        },
        {
          _key: "api",
          title: "API",
          items: [
            {
              _key: "apiHub",
              label: "API & Integrações",
              description: "Conecte a 4Unik ao seu ecossistema.",
              href: "/api-integracoes",
              icon: "api",
            },
            {
              _key: "workvivo",
              label: "Workvivo × 4Unik",
              description: "Add-on na área de API — recompensas e loja.",
              href: "/api-integracoes/workvivo/",
              icon: "workvivo",
            },
          ],
        },
      ],
    },
    {
      _id: "menu.header.en",
      _type: "menu",
      title: "Header EN",
      menuKey: "header",
      locale: "en",
      sections: [
        {
          _key: "product",
          title: "Platform",
          items: [
            {
              _key: "overview",
              label: "Overview",
              description: "The foundation of your operations and management.",
              href: "/plataforma",
              icon: "overview",
            },
            {
              _key: "gamification",
              label: "Gamification",
              description: "Engage and reward your team with game mechanics.",
              href: "/plataforma/motor-gamificacao",
              badge: "CORE",
              icon: "gamification",
            },
            {
              _key: "intelligence",
              label: "Intelligence",
              description: "Advanced AI for campaigns and recommendations.",
              href: "/inteligencia",
              badge: "NEW",
              icon: "intelligence",
            },
          ],
        },
        {
          _key: "solutions",
          title: "Solutions",
          items: [
            {
              _key: "cases",
              label: "Success stories",
              description: "See who is already transforming HR.",
              href: "/casos-de-uso",
              icon: "cases",
            },
            {
              _key: "rewards",
              label: "Rewards hub",
              description: "Thousands of options to delight your people.",
              href: "https://catalogo.yoobe.co",
              icon: "rewards",
              openInNewTab: true,
            },
          ],
        },
        {
          _key: "api",
          title: "API",
          items: [
            {
              _key: "apiHub",
              label: "API & integrations",
              description: "Connect 4Unik to your ecosystem.",
              href: "/api-integracoes",
              icon: "api",
            },
            {
              _key: "workvivo",
              label: "Workvivo × 4Unik",
              description: "API-area add-on — rewards and store.",
              href: "/api-integracoes/workvivo/",
              icon: "workvivo",
            },
          ],
        },
      ],
    },
    {
      _id: "menu.footer.pt",
      _type: "menu",
      title: "Footer PT",
      menuKey: "footer",
      locale: "pt",
      sections: [
        {
          _key: "platform",
          title: "Plataforma",
          items: [
            { _key: "motor", label: "Motor de Gamificação", href: "/plataforma/motor-gamificacao" },
            { _key: "wallets", label: "Controle de Carteiras (Wallets)", href: "/plataforma/controle-carteiras" },
            { _key: "manager", label: "Painel do Gestor", href: "/plataforma/painel-gestor" },
            { _key: "cases", label: "Casos de Uso", href: "/casos-de-uso" },
          ],
        },
        {
          _key: "resources",
          title: "Recursos",
          items: [
            { _key: "api", label: "API & Webhooks", href: "/api-integracoes" },
            {
              _key: "catalog",
              label: "Catálogo de Recompensas",
              href: "https://catalogo.yoobe.co",
              openInNewTab: true,
            },
            {
              _key: "company",
              label: "Logística (Site 4Unik)",
              href: "https://4unik.com.br",
              openInNewTab: true,
            },
          ],
        },
        {
          _key: "contact",
          title: "Contato",
          items: [
            {
              _key: "demo",
              label: "Agendar Demonstração",
              href: "https://calendly.com/yoobeco/demo",
              openInNewTab: true,
            },
            {
              _key: "sales",
              label: "Falar com Comercial",
              href: "https://wa.me/554187582060",
              openInNewTab: true,
            },
          ],
        },
      ],
    },
    {
      _id: "menu.footer.en",
      _type: "menu",
      title: "Footer EN",
      menuKey: "footer",
      locale: "en",
      sections: [
        {
          _key: "platform",
          title: "Platform",
          items: [
            { _key: "motor", label: "Gamification engine", href: "/plataforma/motor-gamificacao" },
            { _key: "wallets", label: "Wallet control", href: "/plataforma/controle-carteiras" },
            { _key: "manager", label: "Manager dashboard", href: "/plataforma/painel-gestor" },
            { _key: "cases", label: "Use cases", href: "/casos-de-uso" },
          ],
        },
        {
          _key: "resources",
          title: "Resources",
          items: [
            { _key: "api", label: "API & webhooks", href: "/api-integracoes" },
            {
              _key: "catalog",
              label: "Rewards catalog",
              href: "https://catalogo.yoobe.co",
              openInNewTab: true,
            },
            {
              _key: "company",
              label: "Logistics (4unik site)",
              href: "https://4unik.com.br",
              openInNewTab: true,
            },
          ],
        },
        {
          _key: "contact",
          title: "Contact",
          items: [
            {
              _key: "demo",
              label: "Book a demo",
              href: "https://calendly.com/yoobeco/demo",
              openInNewTab: true,
            },
            {
              _key: "sales",
              label: "Talk to sales",
              href: "https://wa.me/554187582060",
              openInNewTab: true,
            },
          ],
        },
      ],
    },
  ],
  logoCollections: [
    {
      _id: "logoCollection.trustBar",
      _type: "logoCollection",
      title: "Trust bar institucional",
      collectionKey: "trustBar",
      items: [
        {
          _key: "yampi",
          name: "Yampi",
          logoPath: "public/clients/yampi.svg",
          logoAlt: "Logo da Yampi",
        },
        {
          _key: "prio",
          name: "PRIO",
          logoPath: "public/clients/prio.svg",
          logoAlt: "Logo da PRIO",
        },
        {
          _key: "hapvida",
          name: "Hapvida",
          logoPath: "public/clients/hapvida.png",
          logoAlt: "Logo da Hapvida",
        },
        {
          _key: "join",
          name: "Join RH",
          logoPath: "public/clients/join.png",
          logoAlt: "Logo do Join RH",
        },
        {
          _key: "tecnospeed",
          name: "Tecnospeed",
          logoPath: "public/clients/tecnospeed.svg",
          logoAlt: "Logo da Tecnospeed",
        },
        {
          _key: "boticario",
          name: "O Boticário",
          logoPath: "public/clients/boticario.png",
          logoAlt: "Logo do O Boticário",
        },
      ],
    },
    {
      _id: "logoCollection.clientsGrid",
      _type: "logoCollection",
      title: "Grid de clientes",
      collectionKey: "clientsGrid",
      items: [
        {
          _key: "yampi",
          name: "Yampi",
          logoPath: "public/clients/yampi.svg",
          logoAlt: "Logo da Yampi",
        },
        {
          _key: "prio",
          name: "PRIO",
          logoPath: "public/clients/prio.svg",
          logoAlt: "Logo da PRIO",
        },
        {
          _key: "hapvida",
          name: "Hapvida",
          logoPath: "public/clients/hapvida.png",
          logoAlt: "Logo da Hapvida",
        },
        {
          _key: "join",
          name: "Join RH",
          logoPath: "public/clients/join.png",
          logoAlt: "Logo do Join RH",
        },
        {
          _key: "tecnospeed",
          name: "Tecnospeed",
          logoPath: "public/clients/tecnospeed.svg",
          logoAlt: "Logo da Tecnospeed",
        },
        {
          _key: "boticario",
          name: "O Boticário",
          logoPath: "public/clients/boticario.png",
          logoAlt: "Logo do O Boticário",
        },
        {
          _key: "w1",
          name: "W1 Consultoria",
          logoPath: "public/clients/w1-consultoria.svg",
          logoAlt: "Logo da W1 Consultoria",
        },
        {
          _key: "contabilizei",
          name: "Contabilizei",
          logoPath: "public/clients/contabilizei.svg",
          logoAlt: "Logo da Contabilizei",
        },
      ],
    },
  ],
  homeShowcaseMedia: [
    {
      _id: "homeShowcaseMedia.home-default",
      _type: "homeShowcaseMedia",
      title: "Home showcase padrão",
      mediaKey: "home-default",
      bento: {
        primaryCardImagePath: "public/cms-seed/home-bento-dashboard.svg",
        primaryCardImageAlt: "Mockup do dashboard principal da 4Unik",
        storeCardImagePath: "public/cms-seed/home-bento-store.svg",
        storeCardImageAlt: "Mockup do catálogo de recompensas da 4Unik",
      },
      platformTabs: {
        managementImagePath: "public/cms-seed/home-platform-management.svg",
        managementImageAlt: "Tela da visão de gestão da plataforma 4Unik",
        storeImagePath: "public/cms-seed/home-platform-store.svg",
        storeImageAlt: "Tela da loja de recompensas da plataforma 4Unik",
        campaignsImagePath: "public/cms-seed/home-platform-campaigns.svg",
        campaignsImageAlt: "Tela de campanhas da plataforma 4Unik",
      },
      enterpriseCases: {
        hapvidaLogoImagePath: "public/clients/hapvida.png",
        hapvidaLogoImageAlt: "Logo da Hapvida",
        hapvidaCaseImagePath: "public/cms-seed/home-enterprise-hapvida.svg",
        hapvidaCaseImageAlt: "Mockup do case enterprise Hapvida",
        prioLogoImagePath: "public/clients/prio.svg",
        prioLogoImageAlt: "Logo da Prio",
        prioCaseImagePath: "public/cms-seed/home-enterprise-prio.svg",
        prioCaseImageAlt: "Mockup do case enterprise Prio",
      },
      storeSection: {
        usecaseCards: [
          {
            emoji: "🎉",
            imagePath: "public/cms-seed/home-store-welcome.svg",
            imageAlt: "Ilustração de welcome kits corporativos",
          },
          {
            emoji: "🏆",
            imagePath: "public/cms-seed/home-store-recognition.svg",
            imageAlt: "Ilustração de reconhecimento e premiações",
          },
          {
            emoji: "🎁",
            imagePath: "public/cms-seed/home-store-partners.svg",
            imageAlt: "Ilustração de presentes para clientes e parceiros",
          },
          {
            emoji: "🎓",
            imagePath: "public/cms-seed/home-store-events.svg",
            imageAlt: "Ilustração de kits para eventos e feiras",
          },
        ],
      },
      howItWorks: {
        architectureImagePath: "public/cms-seed/home-how-it-works.svg",
        architectureImageAlt: "Arquitetura da operação de engajamento e recompensas da 4Unik",
      },
      aiRoadmap: {
        stages: [
          {
            icon: "sparkles",
            accentTone: "orange",
            imagePath: "public/cms-seed/home-ai-roadmap-stage-1.svg",
            imageAlt: "Visual de criação de campanhas com IA",
          },
          {
            icon: "command",
            accentTone: "purple",
            imagePath: "public/cms-seed/home-ai-roadmap-stage-2.svg",
            imageAlt: "Visual de gestão de recompensas com IA",
          },
          {
            icon: "brain-circuit",
            accentTone: "cyan",
            imagePath: "public/cms-seed/home-ai-roadmap-stage-3.svg",
            imageAlt: "Visual de orquestração contínua com IA",
          },
          {
            icon: "activity",
            accentTone: "emerald",
            imagePath: "public/cms-seed/home-ai-roadmap-stage-4.svg",
            imageAlt: "Visual de estratégia e ROI com IA",
          },
        ],
      },
      dedicatedIntegrations: {
        workvivo: {
          logoImagePath: "public/partners/workvivo-logo-white.svg",
          logoImageAlt: "Logo da Workvivo",
          previewImagePath: "public/cms-seed/home-integrations-workvivo.svg",
          previewImageAlt: "Preview da integração Workvivo com recompensas 4Unik",
        },
        beehome: {
          logoImagePath: "public/cms-seed/beehome-logo.svg",
          logoImageAlt: "Logo da Beehome",
          previewImagePath: "public/cms-seed/home-integrations-beehome.svg",
          previewImageAlt: "Preview da integração Beehome com operação 4Unik",
        },
      },
      managementSection: {
        featureCards: [
          {
            emoji: "📊",
            imagePath: "public/cms-seed/home-management-analytics.svg",
            imageAlt: "Visual do dashboard analítico de gestão",
          },
          {
            emoji: "📦",
            imagePath: "public/cms-seed/home-management-logistics.svg",
            imageAlt: "Visual da logística integrada e entregas",
          },
          {
            emoji: "👥",
            imagePath: "public/cms-seed/home-management-people.svg",
            imageAlt: "Visual da gestão de colaboradores e saldos",
          },
          {
            emoji: "🔒",
            imagePath: "public/cms-seed/home-management-security.svg",
            imageAlt: "Visual de segurança e compliance",
          },
        ],
      },
    },
  ],
  platformShowcaseMedia: [
    {
      _id: "platformShowcaseMedia.plataforma-pt",
      _type: "platformShowcaseMedia",
      title: "Showcase da plataforma (PT)",
      pageKey: "plataforma",
      locale: "pt",
      adminDashboardImagePath: "public/cms-seed/platform-admin-dashboard.svg",
      adminDashboardImageAlt:
        "Mockup editorial do painel do gestor da plataforma 4Unik",
      storeMockupImagePath: "public/cms-seed/platform-store-showcase.svg",
      storeMockupImageAlt:
        "Mockup editorial da loja de recompensas da plataforma 4Unik",
      logisticsPanelImagePath: "public/cms-seed/platform-logistics-panel.svg",
      logisticsPanelImageAlt:
        "Painel visual da logística integrada e rastreamento de entregas",
      securityPanelImagePath: "public/cms-seed/platform-security-panel.svg",
      securityPanelImageAlt:
        "Painel visual de segurança enterprise, SSO e auditoria",
    },
    {
      _id: "platformShowcaseMedia.plataforma-en",
      _type: "platformShowcaseMedia",
      title: "Platform showcase (EN)",
      pageKey: "plataforma",
      locale: "en",
      adminDashboardImagePath: "public/cms-seed/platform-admin-dashboard.svg",
      adminDashboardImageAlt:
        "Editorial mockup of the 4Unik manager dashboard",
      storeMockupImagePath: "public/cms-seed/platform-store-showcase.svg",
      storeMockupImageAlt:
        "Editorial mockup of the 4Unik rewards storefront",
      logisticsPanelImagePath: "public/cms-seed/platform-logistics-panel.svg",
      logisticsPanelImageAlt:
        "Visual panel for integrated logistics and delivery tracking",
      securityPanelImagePath: "public/cms-seed/platform-security-panel.svg",
      securityPanelImageAlt:
        "Visual panel for enterprise security, SSO, and audit trails",
    },
  ],
  blogPosts,
  marketingPages,
  marketingStrategies,
};
