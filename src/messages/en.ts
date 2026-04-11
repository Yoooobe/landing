import { enNav } from "@/messages/segments/en-nav";
import { enFooter } from "@/messages/segments/en-footer";
import { enHome } from "@/messages/segments/en-home";
import { enGamificacao } from "@/messages/segments/en-gamificacao";
import { enPlataforma } from "@/messages/segments/en-plataforma";
import { enCasos } from "@/messages/segments/en-casos";
import { enStatsBentoTabsWhy } from "@/messages/segments/en-stats-bento-tabs-why";
import { enRest } from "@/messages/segments/en-rest";
import { enGamificacaoPage } from "@/messages/segments/en-gamificacao-page";
import { enLandingMore } from "@/messages/segments/en-landing-more";
import { enCasosPage } from "@/messages/segments/en-casos-page";
import { enInteligenciaPage } from "@/messages/segments/en-inteligencia-page";
import { enBlogPage } from "@/messages/segments/en-blog-page";
import { enLeadForm } from "@/messages/segments/en-lead-form";
import { enConversionDock } from "@/messages/segments/en-conversion-dock";
/** Overlay inglês sobre `ptMessages` (deepMerge em `getMessages`). */
export const enOverlay = {
  nav: enNav,
  footer: enFooter,
  home: enHome,
  gamificacao: enGamificacao,
  plataforma: enPlataforma,
  casos: enCasos,
  statsBar: enStatsBentoTabsWhy.statsBar,
  bento: enStatsBentoTabsWhy.bento,
  platformTabs: enStatsBentoTabsWhy.platformTabs,
  why: enStatsBentoTabsWhy.why,
  gamificationSummary: enStatsBentoTabsWhy.gamificationSummary,
  demoStrip: enStatsBentoTabsWhy.demoStrip,
  sectionLeadCta: enStatsBentoTabsWhy.sectionLeadCta,
  gamificacaoPage: enGamificacaoPage,
  landingMore: enLandingMore,
  casosPage: enCasosPage,
  inteligenciaPage: enInteligenciaPage,
  blogPage: enBlogPage,
  leadForm: enLeadForm,
  conversionDock: enConversionDock,
  ...enRest,
} as const;
