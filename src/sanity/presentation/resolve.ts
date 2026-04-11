import { withBasePath } from "@/lib/basePath";
import { localizedPath } from "@/lib/locale";
import type { PresentationPluginOptions } from "sanity/presentation";
import { defineLocations } from "sanity/presentation";

function marketingHref(slug: string | undefined, locale: "pt" | "en" | undefined) {
  const safeLocale = locale === "en" ? "en" : "pt";
  const pathname =
    !slug || slug === "home" ? localizedPath("/", safeLocale) : localizedPath(`/${slug}/`, safeLocale);

  return withBasePath(pathname);
}

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    marketingPage: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
        locale: "locale",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Landing page",
            href: marketingHref(doc?.slug, doc?.locale),
          },
        ],
      }),
    }),
    blogPost: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
        locale: "locale",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Blog post",
            href: withBasePath(
              localizedPath(`/blog/${doc?.slug || ""}/`, doc?.locale === "en" ? "en" : "pt"),
            ),
          },
          {
            title: doc?.locale === "en" ? "Blog index" : "Indice do blog",
            href: withBasePath(localizedPath("/blog/", doc?.locale === "en" ? "en" : "pt")),
          },
        ],
      }),
    }),
    siteSettings: defineLocations({
      message:
        "Este documento afeta cabecalho, rodape, scripts e configuracoes compartilhadas em toda a landing.",
      tone: "caution",
    }),
    page: defineLocations({
      message:
        "Modelo legado: manter apenas para compatibilidade enquanto as landing pages migram para marketingPage.",
      tone: "caution",
    }),
    marketingStrategy: defineLocations({
      message:
        "Documento editorial sem rota publica direta. Use-o como fonte de estrategia para blog, landing pages e campanhas.",
      tone: "positive",
    }),
    homeShowcaseMedia: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Home showcase",
            href: withBasePath("/"),
          },
        ],
      }),
    }),
    platformShowcaseMedia: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Plataforma showcase",
            href: withBasePath("/plataforma/"),
          },
        ],
      }),
    }),
    gamificacaoShowcaseMedia: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Gamificação showcase",
            href: withBasePath("/gamificacao/"),
          },
        ],
      }),
    }),
    apiIntegracoesShowcaseMedia: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "API e Integrações showcase",
            href: withBasePath("/api-integracoes/"),
          },
        ],
      }),
    }),
    workvivoShowcaseMedia: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Workvivo showcase",
            href: withBasePath("/api-integracoes/workvivo/"),
          },
        ],
      }),
    }),
    contentMirror: defineLocations({
      message:
        "Espelho editorial do codigo: nao ha rota publica dedicada. Edite aqui e sincronize com o repositorio conforme o fluxo interno.",
      tone: "caution",
    }),
    menu: defineLocations({
      message:
        "Menus de navegacao: consumidos pelo Header e Footer via siteSettings. Nao ha pagina publica unica para este documento.",
      tone: "positive",
    }),
    logoCollection: defineLocations({
      message:
        "Colecao de logos: usada como prova social na home e noutras seccoes. Nao ha rota publica direta.",
      tone: "positive",
    }),
  },
};
