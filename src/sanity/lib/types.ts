/** Bloco hero (object) em `page.content`. */
export type HeroBlockDoc = {
  _key?: string;
  _type: "heroBlock";
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: SanityImageDoc | null;
};

export type SeoDoc = {
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: SanityImageDoc | null;
};

export type SanityImageDoc = {
  asset?: {
    _ref?: string;
    url?: string;
  } | null;
  alt?: string;
};

export type MenuItemDoc = {
  label?: string;
  description?: string;
  href?: string;
  badge?: string;
  icon?: string;
  openInNewTab?: boolean;
};

export type MenuSectionDoc = {
  title?: string;
  items?: MenuItemDoc[];
};

export type MenuDoc = {
  _id?: string;
  title?: string;
  menuKey?: "header" | "footer" | string;
  locale?: "pt" | "en" | string;
  sections?: MenuSectionDoc[];
};

export type LogoCollectionItemDoc = {
  name?: string;
  href?: string;
  logo?: SanityImageDoc | null;
};

export type LogoCollectionDoc = {
  _id?: string;
  title?: string;
  collectionKey?: "trustBar" | "clientsGrid" | string;
  items?: LogoCollectionItemDoc[];
};

export type SiteSettingsDoc = {
  environmentLabel?: string | null;
  notes?: string | null;
  gaMeasurementId?: string | null;
  gtmContainerId?: string | null;
  metaPixelId?: string | null;
  linkedinPartnerId?: string | null;
  calendlyUrl?: string | null;
  whatsappUrl?: string | null;
  contactEmail?: string | null;
  appLoginUrl?: string | null;
  rewardsCatalogUrl?: string | null;
  companySiteUrl?: string | null;
  privacyUrl?: string | null;
  termsUrl?: string | null;
  headerWordmarkImage?: SanityImageDoc | null;
  footerWordmarkImage?: SanityImageDoc | null;
  defaultOgImage?: SanityImageDoc | null;
  headerMenuPt?: MenuDoc | null;
  headerMenuEn?: MenuDoc | null;
  footerMenuPt?: MenuDoc | null;
  footerMenuEn?: MenuDoc | null;
  trustLogoCollection?: LogoCollectionDoc | null;
  clientsLogoCollection?: LogoCollectionDoc | null;
} | null;

export type PortableTextSpan = {
  _type: "span";
  text?: string;
  marks?: string[];
};

export type PortableTextMarkDefinition = {
  _key?: string;
  _type?: string;
  href?: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type: "block";
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDefinition[];
  listItem?: "bullet" | "number";
};

export type BlogPostListItem = {
  _id: string;
  title: string;
  slug: string;
  locale: "pt" | "en";
  excerpt: string;
  category: string;
  publishedAt: string;
  readTimeMinutes: number;
  featured?: boolean;
  coverImage?: SanityImageDoc | null;
  author?: string;
  tags?: string[];
  aiGenerated?: boolean;
};

export type BlogPostDoc = BlogPostListItem & {
  body?: PortableTextBlock[];
  relatedKeywords?: string[];
  seo?: SeoDoc | null;
};

export type CtaBlockDoc = {
  _key?: string;
  _type: "ctaBlock";
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  showLeadForm?: boolean;
  leadFormVariant?:
    | "marketing"
    | "home"
    | "plataforma"
    | "api"
    | "gamificacao"
    | "casos"
    | "inteligencia";
  image?: SanityImageDoc | null;
};

export type RichTextSectionDoc = {
  _key?: string;
  _type: "richTextSection";
  title?: string;
  content?: PortableTextBlock[];
  image?: SanityImageDoc | null;
};

export type FaqItemDoc = {
  question?: string;
  answer?: string;
};

export type FaqBlockDoc = {
  _key?: string;
  _type: "faqBlock";
  title?: string;
  items?: FaqItemDoc[];
  image?: SanityImageDoc | null;
};

export type StatsItemDoc = {
  value?: string;
  label?: string;
  supportingText?: string;
};

export type StatsBlockDoc = {
  _key?: string;
  _type: "statsBlock";
  title?: string;
  items?: StatsItemDoc[];
  image?: SanityImageDoc | null;
};

export type TestimonialItemDoc = {
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
};

export type TestimonialBlockDoc = {
  _key?: string;
  _type: "testimonialBlock";
  title?: string;
  items?: TestimonialItemDoc[];
  image?: SanityImageDoc | null;
};

export type FeatureGridItemDoc = {
  _key?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  icon?: string;
  href?: string;
};

export type FeatureGridBlockDoc = {
  _key?: string;
  _type: "featureGridBlock";
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: SanityImageDoc | null;
  columns?: "2" | "3" | "4" | string;
  items?: FeatureGridItemDoc[];
};

export type SplitContentBlockDoc = {
  _key?: string;
  _type: "splitContentBlock";
  eyebrow?: string;
  title?: string;
  body?: PortableTextBlock[];
  bullets?: string[];
  imageSide?: "left" | "right" | string;
  image?: SanityImageDoc | null;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type LogoStripItemDoc = {
  _key?: string;
  name?: string;
  href?: string;
  logo?: SanityImageDoc | null;
};

export type LogoStripBlockDoc = {
  _key?: string;
  _type: "logoStripBlock";
  displayStyle?: "compact" | "grid" | string;
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  collection?: LogoCollectionDoc | null;
  items?: LogoStripItemDoc[];
};

export type CaseStudyMetricDoc = {
  value?: string;
  label?: string;
  tone?: "default" | "success" | "accent" | string;
};

export type CaseStudyItemDoc = {
  company?: string;
  industry?: string;
  title?: string;
  description?: string;
  challenge?: string;
  href?: string;
  metrics?: CaseStudyMetricDoc[];
};

export type CaseStudyGridBlockDoc = {
  _key?: string;
  _type: "caseStudyGridBlock";
  title?: string;
  challengeLabel?: string;
  resultsLabel?: string;
  items?: CaseStudyItemDoc[];
};

export type LegacySectionKey =
  | "homeHero"
  | "homeFourUnik"
  | "homeTrustBar"
  | "homeBentoFeatures"
  | "homePlatformTabs"
  | "homeStatsBar"
  | "homeWhySection"
  | "homeGamificationSummary"
  | "homeGamificationDuality"
  | "homeEnterpriseCases"
  | "homeDedicatedIntegrations"
  | "homeStoreSection"
  | "homeApiSection"
  | "homeAiRoadmap"
  | "homeManagementSection"
  | "homeHowItWorks"
  | "homePricingSection"
  | "homeTestimonialsSection"
  | "homeClientsSection"
  | "homeFinalCta"
  | "apiIntegracoesPage"
  | "gamificacaoHero"
  | "gamificacaoProblem"
  | "gamificacaoMechanics"
  | "gamificacaoFlow"
  | "gamificacaoCases"
  | "gamificacaoTrends"
  | "gamificacaoStats"
  | "gamificacaoKpis"
  | "gamificacaoDeepUsecases"
  | "gamificacaoFaq"
  | "gamificacaoCta"
  | "plataformaHero"
  | "plataformaAdminDashboard"
  | "plataformaGamificationEngine"
  | "plataformaStore"
  | "plataformaLogistics"
  | "plataformaAiRoadmap"
  | "plataformaSecurity"
  | "plataformaFaq"
  | "plataformaCta"
  | "inteligenciaPage"
  | "casosHero"
  | "casosGrid"
  | "casosFaq"
  | "casosCta";

export type LegacySectionBlockDoc = {
  _key?: string;
  _type: "legacySectionBlock";
  section: LegacySectionKey;
  note?: string;
};

export type MarketingPageContentBlock =
  | HeroBlockDoc
  | FeatureGridBlockDoc
  | CaseStudyGridBlockDoc
  | SplitContentBlockDoc
  | LogoStripBlockDoc
  | LegacySectionBlockDoc
  | RichTextSectionDoc
  | CtaBlockDoc
  | FaqBlockDoc
  | StatsBlockDoc
  | TestimonialBlockDoc;

export type MarketingPageDoc = {
  _id: string;
  title: string;
  slug: string;
  locale: "pt" | "en";
  summary?: string;
  seo?: SeoDoc | null;
  content?: MarketingPageContentBlock[];
};

export type MarketingStrategyDoc = {
  _id: string;
  title: string;
  slug: string;
  locale: "pt" | "en";
  pillar?: string;
  status?: "draft" | "active" | "archived";
  summary: string;
  seo?: SeoDoc | null;
  body?: Array<PortableTextBlock | CtaBlockDoc | FaqBlockDoc | StatsBlockDoc>;
};

export type HomeSeoDoc = {
  title?: string;
  description?: string;
};

export type HomeHeroContentDoc = {
  badge?: string;
  brand?: string;
  afterBrand?: string;
  line1b?: string;
  line2?: string;
  sub?: string;
  ctaDemo?: string;
  ctaDemoHref?: string;
  ctaExplore?: string;
  ctaExploreHref?: string;
  floatAdhesion?: string;
  floatAdhesionValue?: string;
  floatAdhesionSub?: string;
  floatRh?: string;
  floatRhValue?: string;
  floatRhSub?: string;
  floatEnps?: string;
  floatEnpsValue?: string;
  floatEnpsSub?: string;
  platformImage?: SanityImageDoc | null;
  supportingImage?: SanityImageDoc | null;
};

export type HomeFourUnikContentDoc = {
  kicker?: string;
  bodyBefore?: string;
  brand?: string;
  bodyMid?: string;
  here?: string;
  bodyAfter?: string;
  cta?: string;
  ctaHref?: string;
  sectionImage?: SanityImageDoc | null;
};

export type HomeTrustContentDoc = {
  title?: string;
};

export type HomeShowcaseStoreUsecaseDoc = {
  emoji?: string;
  image?: SanityImageDoc | null;
};

export type HomeShowcaseRoadmapStageDoc = {
  icon?: string;
  accentTone?: "orange" | "purple" | "cyan" | "emerald" | string;
  image?: SanityImageDoc | null;
};

export type HomeShowcaseIntegrationDoc = {
  logoImage?: SanityImageDoc | null;
  previewImage?: SanityImageDoc | null;
};

export type HomeShowcaseMediaDoc = {
  _id?: string;
  title?: string;
  mediaKey?: string;
  locale?: "pt" | "en" | string;
  bento?: {
    primaryCardImage?: SanityImageDoc | null;
    storeCardImage?: SanityImageDoc | null;
  };
  platformTabs?: {
    managementImage?: SanityImageDoc | null;
    storeImage?: SanityImageDoc | null;
    campaignsImage?: SanityImageDoc | null;
  };
  enterpriseCases?: {
    hapvidaLogoImage?: SanityImageDoc | null;
    hapvidaCaseImage?: SanityImageDoc | null;
    prioLogoImage?: SanityImageDoc | null;
    prioCaseImage?: SanityImageDoc | null;
  };
  storeSection?: {
    usecaseCards?: HomeShowcaseStoreUsecaseDoc[];
  };
  howItWorks?: {
    architectureImage?: SanityImageDoc | null;
  };
  aiRoadmap?: {
    stages?: HomeShowcaseRoadmapStageDoc[];
  };
  dedicatedIntegrations?: {
    workvivo?: HomeShowcaseIntegrationDoc | null;
    beehome?: HomeShowcaseIntegrationDoc | null;
  };
  managementSection?: {
    featureCards?: HomeShowcaseStoreUsecaseDoc[];
  };
};

export type ImageWithEmojiDoc = {
  emoji?: string;
  image?: SanityImageDoc | null;
};

export type PlatformShowcaseMediaDoc = {
  _id?: string;
  title?: string;
  pageKey?: string;
  locale?: "pt" | "en" | string;
  adminDashboardImage?: SanityImageDoc | null;
  storeMockupImage?: SanityImageDoc | null;
  logisticsPanelImage?: SanityImageDoc | null;
  securityPanelImage?: SanityImageDoc | null;
  gestaoFeatureCards?: ImageWithEmojiDoc[];
  gamificacaoFeatureCards?: ImageWithEmojiDoc[];
  lojaFeatureCards?: ImageWithEmojiDoc[];
  apiFeatureCards?: ImageWithEmojiDoc[];
  /** Loja Corporativa — imagens da página /plataforma/loja-resgate/ */
  storeHomeImage?: SanityImageDoc | null;
  productDetailImage?: SanityImageDoc | null;
  cartImage?: SanityImageDoc | null;
  giftWizardImage?: SanityImageDoc | null;
  adminUsersImage?: SanityImageDoc | null;
  adminSettingsImage?: SanityImageDoc | null;
  orderDetailImage?: SanityImageDoc | null;
};

export type GamificacaoShowcaseCaseVisualDoc = {
  company?: string;
  logoImage?: SanityImageDoc | null;
  featuredImage?: SanityImageDoc | null;
};

export type GamificacaoShowcaseMediaDoc = {
  _id?: string;
  title?: string;
  mediaKey?: string;
  locale?: "pt" | "en" | string;
  hero?: {
    showcaseImage?: SanityImageDoc | null;
  };
  mechanics?: {
    items?: ImageWithEmojiDoc[];
  };
  cases?: {
    items?: GamificacaoShowcaseCaseVisualDoc[];
  };
  trends?: {
    items?: ImageWithEmojiDoc[];
  };
  kpis?: {
    items?: ImageWithEmojiDoc[];
  };
  deepUsecases?: {
    items?: ImageWithEmojiDoc[];
  };
};

export type ApiIntegracoesShowcasePlatformDoc = {
  platformName?: string;
  logoImage?: SanityImageDoc | null;
  previewImage?: SanityImageDoc | null;
};

export type ApiIntegracoesShowcaseMediaDoc = {
  _id?: string;
  title?: string;
  mediaKey?: string;
  locale?: "pt" | "en" | string;
  hero?: {
    showcaseImage?: SanityImageDoc | null;
  };
  integrations?: {
    platforms?: ApiIntegracoesShowcasePlatformDoc[];
  };
  features?: {
    items?: ImageWithEmojiDoc[];
  };
  modules?: {
    items?: ImageWithEmojiDoc[];
  };
};

/** Documento dedicado à página Workvivo × 4Unik (`/api-integracoes/workvivo/`). */
export type WorkvivoShowcaseMediaDoc = {
  _id?: string;
  title?: string;
  mediaKey?: string;
  locale?: "pt" | "en" | string;
  /** Screenshot do feed Workvivo com AI companion — secção "O que é o Workvivo". */
  heroImage?: SanityImageDoc | null;
  /** Screenshot Comms Orchestration. */
  commsImage?: SanityImageDoc | null;
  /** Screenshot People Intelligence analytics. */
  intelligenceImage?: SanityImageDoc | null;
  /** Screenshot Frontline App mobile. */
  frontlineImage?: SanityImageDoc | null;
  /** Screenshot shoutout no desktop escuro — secção de gap (o que o Workvivo entrega). */
  shoutoutImage?: SanityImageDoc | null;
  /** Screenshot alternativo do feed com shoutout em modo claro. */
  feedShoutoutImage?: SanityImageDoc | null;
};

export type HomeFinalCtaContentDoc = {
  title?: string;
  body?: string;
  demo?: string;
  demoHref?: string;
  whatsapp?: string;
  whatsappHref?: string;
  sectionImage?: SanityImageDoc | null;
};

export type HomeMirrorPayloadDoc = {
  seo?: HomeSeoDoc;
  hero?: HomeHeroContentDoc;
  fourUnik?: HomeFourUnikContentDoc;
  trust?: HomeTrustContentDoc;
  showcaseMedia?: HomeShowcaseMediaDoc | null;
  finalCta?: HomeFinalCtaContentDoc;
};

export type ResolvedHomeContent = {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    brand: string;
    afterBrand: string;
    line1b: string;
    line2: string;
    sub: string;
    ctaDemo: string;
    ctaDemoHref: string;
    ctaExplore: string;
    ctaExploreHref: string;
    floatAdhesion: string;
    floatAdhesionValue: string;
    floatAdhesionSub: string;
    floatRh: string;
    floatRhValue: string;
    floatRhSub: string;
    floatEnps: string;
    floatEnpsValue: string;
    floatEnpsSub: string;
    platformImage?: SanityImageDoc | null;
    supportingImage?: SanityImageDoc | null;
  };
  fourUnik: {
    kicker: string;
    bodyBefore: string;
    brand: string;
    bodyMid: string;
    here: string;
    bodyAfter: string;
    cta: string;
    ctaHref: string;
    sectionImage?: SanityImageDoc | null;
  };
  trust: {
    title: string;
  };
  showcaseMedia?: HomeShowcaseMediaDoc | null;
  finalCta: {
    title: string;
    body: string;
    demo: string;
    demoHref: string;
    whatsapp: string;
    whatsappHref: string;
    sectionImage?: SanityImageDoc | null;
  };
};

export type ApiFeatureItemDoc = {
  title?: string;
  description?: string;
  icon?: string;
  colSpan?: string;
};

export type ApiIntegrationPlatformDoc = {
  name?: string;
  by?: string;
  logo?: string;
  badge?: string;
  color?: string;
  description?: string;
  features?: string[];
};

export type ApiModuleItemDoc = {
  icon?: string;
  title?: string;
  description?: string;
};

export type ApiIntegracoesPayloadDoc = {
  seo?: {
    title?: string;
    description?: string;
    openGraphDescription?: string;
  };
  hero?: {
    badge?: string;
    title?: string;
    description?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
    codeWindowTitle?: string;
    codeSnippet?: string;
  };
  features?: {
    title?: string;
    description?: string;
    items?: ApiFeatureItemDoc[];
  };
  integrations?: {
    badge?: string;
    title?: string;
    titleGradient?: string;
    titleAfter?: string;
    description?: string;
    mainPlatforms?: ApiIntegrationPlatformDoc[];
    extraIntegrations?: string[];
    extraIntegrationsLabel?: string;
  };
  modules?: {
    badge?: string;
    titleBefore?: string;
    titleGradient?: string;
    titleAfter?: string;
    description?: string;
    items?: ApiModuleItemDoc[];
  };
  finalCta?: {
    title?: string;
    description?: string;
    buttonLabel?: string;
    buttonHref?: string;
  };
  showcaseMedia?: ApiIntegracoesShowcaseMediaDoc | null;
};

export type ResolvedApiIntegracoesContent = {
  seo: {
    title: string;
    description: string;
    openGraphDescription: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    codeWindowTitle: string;
    codeSnippet: string;
  };
  features: {
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
      colSpan: string;
    }>;
  };
  integrations: {
    badge: string;
    title: string;
    titleGradient: string;
    titleAfter: string;
    description: string;
    mainPlatforms: Array<{
      name: string;
      by: string;
      logo: string;
      badge: string;
      color: string;
      description: string;
      features: string[];
    }>;
    extraIntegrations: string[];
    extraIntegrationsLabel: string;
  };
  modules: {
    badge: string;
    titleBefore: string;
    titleGradient: string;
    titleAfter: string;
    description: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  finalCta: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
};

export type GamificacaoSeoDoc = {
  title?: string;
  description?: string;
  openGraphDescription?: string;
};

export type GamificacaoHeroDoc = {
  floatLevel?: string;
  floatLevelSub?: string;
  floatProgress?: string;
  badge?: string;
  titleLine1?: string;
  titleGradient?: string;
  titleLine2?: string;
  sub?: string;
  cta?: string;
  ctaHref?: string;
};

export type GamificacaoProblemCardDoc = {
  stat?: string;
  title?: string;
  body?: string;
  cite?: string;
};

export type GamificacaoProblemDoc = {
  badge?: string;
  title?: string;
  titleGradient?: string;
  titleAfter?: string;
  cards?: GamificacaoProblemCardDoc[];
};

export type GamificacaoFeatureTextDoc = {
  icon?: string;
  text?: string;
};

export type GamificacaoMechanicItemDoc = {
  id?: string;
  badge?: string;
  title?: string;
  description?: string;
  features?: string[];
};

export type GamificacaoFlowStepDoc = {
  num?: string;
  role?: string;
  title?: string;
  desc?: string;
  features?: GamificacaoFeatureTextDoc[];
  align?: "left" | "right";
};

export type GamificacaoCaseMetricDoc = {
  value?: string;
  label?: string;
};

export type GamificacaoCaseItemDoc = {
  id?: string;
  company?: string;
  industry?: string;
  title?: string;
  desc?: string;
  challenge?: string;
  solution?: string;
  metrics?: GamificacaoCaseMetricDoc[];
};

export type GamificacaoTrendItemDoc = {
  icon?: string;
  title?: string;
  desc?: string;
  tag?: string;
  tagStyle?: number;
};

export type GamificacaoStatItemDoc = {
  value?: string;
  suffix?: string;
  desc?: string;
};

export type GamificacaoKpiItemDoc = {
  title?: string;
  subtitle?: string;
  desc?: string;
};

export type GamificacaoUsecaseItemDoc = {
  icon?: string;
  title?: string;
  desc?: string;
  hook?: string;
};

export type GamificacaoFaqItemDoc = {
  q?: string;
  a?: string;
};

export type GamificacaoSectionHeadingDoc = {
  badge?: string;
  titleBefore?: string;
  titleGradient?: string;
  titleAfter?: string;
  sub?: string;
};

export type GamificacaoPayloadDoc = {
  seo?: GamificacaoSeoDoc;
  hero?: GamificacaoHeroDoc;
  problem?: GamificacaoProblemDoc;
  mechanics?: GamificacaoSectionHeadingDoc & { items?: GamificacaoMechanicItemDoc[] };
  flow?: GamificacaoSectionHeadingDoc & { steps?: GamificacaoFlowStepDoc[] };
  cases?: (GamificacaoSectionHeadingDoc & {
    challengeLabel?: string;
    solutionLabel?: string;
    items?: GamificacaoCaseItemDoc[];
  });
  trends?: (GamificacaoSectionHeadingDoc & {
    banner2025?: string;
    banner2033?: string;
    cagr?: string;
    value2025?: string;
    value2033?: string;
    items?: GamificacaoTrendItemDoc[];
  });
  stats?: {
    badge?: string;
    titleBefore?: string;
    titleGradient?: string;
    titleAfter?: string;
    items?: GamificacaoStatItemDoc[];
  };
  kpis?: GamificacaoSectionHeadingDoc & { items?: GamificacaoKpiItemDoc[] };
  deepUsecases?: GamificacaoSectionHeadingDoc & { items?: GamificacaoUsecaseItemDoc[] };
  faq?: {
    badge?: string;
    titleBefore?: string;
    titleGradient?: string;
    titleAfter?: string;
    items?: GamificacaoFaqItemDoc[];
  };
  finalCta?: {
    title?: string;
    body?: string;
    cta?: string;
    ctaHref?: string;
  };
  showcaseMedia?: GamificacaoShowcaseMediaDoc | null;
};

export type ResolvedGamificacaoContent = {
  seo: {
    title: string;
    description: string;
    openGraphDescription: string;
  };
  hero: {
    floatLevel: string;
    floatLevelSub: string;
    floatProgress: string;
    badge: string;
    titleLine1: string;
    titleGradient: string;
    titleLine2: string;
    sub: string;
    cta: string;
    ctaHref: string;
  };
  problem: {
    badge: string;
    title: string;
    titleGradient: string;
    titleAfter: string;
    cards: Array<{
      stat: string;
      title: string;
      body: string;
      cite: string;
    }>;
  };
  mechanics: {
    badge: string;
    titleBefore: string;
    titleGradient: string;
    titleAfter: string;
    sub: string;
    items: Array<{
      id: string;
      badge: string;
      title: string;
      description: string;
      features: string[];
    }>;
  };
  flow: {
    badge: string;
    titleBefore: string;
    titleGradient: string;
    titleAfter: string;
    sub: string;
    steps: Array<{
      num: string;
      role: string;
      title: string;
      desc: string;
      features: Array<{
        icon: string;
        text: string;
      }>;
      align: "left" | "right";
    }>;
  };
  cases: {
    badge: string;
    titleBefore: string;
    titleGradient: string;
    titleAfter: string;
    sub: string;
    challengeLabel: string;
    solutionLabel: string;
    items: Array<{
      id: string;
      company: string;
      industry: string;
      title: string;
      desc: string;
      challenge: string;
      solution: string;
      metrics: Array<{
        value: string;
        label: string;
      }>;
    }>;
  };
  trends: {
    badge: string;
    titleBefore: string;
    titleGradient: string;
    titleAfter: string;
    sub: string;
    banner2025: string;
    banner2033: string;
    cagr: string;
    value2025: string;
    value2033: string;
    items: Array<{
      icon: string;
      title: string;
      desc: string;
      tag: string;
      tagStyle: number;
    }>;
  };
  stats: {
    badge: string;
    titleBefore: string;
    titleGradient: string;
    titleAfter: string;
    items: Array<{
      value: string;
      suffix: string;
      desc: string;
    }>;
  };
  kpis: {
    badge: string;
    titleBefore: string;
    titleGradient: string;
    titleAfter: string;
    sub: string;
    items: Array<{
      title: string;
      subtitle: string;
      desc: string;
    }>;
  };
  deepUsecases: {
    badge: string;
    titleBefore: string;
    titleGradient: string;
    titleAfter: string;
    sub: string;
    items: Array<{
      icon: string;
      title: string;
      desc: string;
      hook: string;
    }>;
  };
  faq: {
    badge: string;
    titleBefore: string;
    titleGradient: string;
    titleAfter: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };
  finalCta: {
    title: string;
    body: string;
    cta: string;
    ctaHref: string;
  };
};

export type RouteSeoPayloadDoc = {
  title?: string;
  description?: string;
  openGraphDescription?: string;
};

export type RouteFaqItemPayloadDoc = {
  q?: string;
  a?: string;
};

export type RouteMirrorJsonPayloadDoc = {
  seo?: RouteSeoPayloadDoc;
  faqItems?: RouteFaqItemPayloadDoc[];
  messagesOverride?: Record<string, unknown>;
  redirectMessage?: string;
  stubSeo?: Record<string, RouteSeoPayloadDoc>;
  workvivoMeta?: Record<string, RouteSeoPayloadDoc>;
  workvivoContent?: Record<string, unknown>;
};
