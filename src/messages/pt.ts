import { ptNav } from "@/messages/segments/pt-nav";
import { ptFooter } from "@/messages/segments/pt-footer";
import { ptHome } from "@/messages/segments/pt-home";
import { ptGamificacao } from "@/messages/segments/pt-gamificacao";
import { ptPlataforma } from "@/messages/segments/pt-plataforma";
import { ptCasos } from "@/messages/segments/pt-casos";
import { ptStatsBentoTabsWhy } from "@/messages/segments/pt-stats-bento-tabs-why";
import { ptRest } from "@/messages/segments/pt-rest";
import { ptGamificacaoPage } from "@/messages/segments/pt-gamificacao-page";
import { ptLandingMore } from "@/messages/segments/pt-landing-more";
import { ptCasosPage } from "@/messages/segments/pt-casos-page";
import { ptInteligenciaPage } from "@/messages/segments/pt-inteligencia-page";
import { ptBlogPage } from "@/messages/segments/pt-blog-page";

export const ptMessages = {
  nav: ptNav,
  footer: ptFooter,
  home: ptHome,
  gamificacao: ptGamificacao,
  plataforma: ptPlataforma,
  casos: ptCasos,
  statsBar: ptStatsBentoTabsWhy.statsBar,
  bento: ptStatsBentoTabsWhy.bento,
  platformTabs: ptStatsBentoTabsWhy.platformTabs,
  why: ptStatsBentoTabsWhy.why,
  gamificationSummary: ptStatsBentoTabsWhy.gamificationSummary,
  demoStrip: ptStatsBentoTabsWhy.demoStrip,
  gamificacaoPage: ptGamificacaoPage,
  landingMore: ptLandingMore,
  casosPage: ptCasosPage,
  inteligenciaPage: ptInteligenciaPage,
  blogPage: ptBlogPage,
  ...ptRest,
} as const;

export type Messages = typeof ptMessages;
