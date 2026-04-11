import type { StructureBuilder, StructureResolver } from "sanity/structure";

import { apiVersion } from "./env";
import { PagePreviewPane } from "./components/PagePreviewPane";

const SITE_SETTINGS_ID = "siteSettings";
const HIDDEN_TYPES = new Set([
  "siteSettings",
  "blogPost",
  "contentMirror",
  "marketingPage",
  "marketingStrategy",
  "homeShowcaseMedia",
  "gamificacaoShowcaseMedia",
  "apiIntegracoesShowcaseMedia",
  "workvivoShowcaseMedia",
  "logoCollection",
  "page",
  "menu",
  "platformShowcaseMedia",
]);

function asciiId(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function marketingPageDocumentList(
  S: StructureBuilder,
  options?: {
    id: string;
    title: string;
    locale?: "pt" | "en";
  },
) {
  const locale = options?.locale;

  return S.documentList()
    .id(options?.id || "marketingPage")
    .title(options?.title || "Landing Pages de Marketing")
    .schemaType("marketingPage")
    .apiVersion(apiVersion)
    .filter(locale ? '_type == $type && locale == $locale' : "_type == $type")
    .params(locale ? { type: "marketingPage", locale } : { type: "marketingPage" })
    .defaultOrdering([
      { field: "locale", direction: "asc" },
      { field: "title", direction: "asc" },
    ])
    .child((docId) =>
      S.document()
        .documentId(docId)
        .schemaType("marketingPage")
        .views([
          S.view.form().title("Editor"),
          S.view.component(PagePreviewPane).title("Miniatura da página"),
        ]),
    );
}

function blogPostDocumentWithPreview(S: StructureBuilder) {
  return (docId: string) =>
    S.document()
      .documentId(docId)
      .schemaType("blogPost")
      .views([
        S.view.form().title("Editor"),
        S.view.component(PagePreviewPane).title("Miniatura da página"),
      ]);
}

/**
 * Singleton no topo da árvore + demais tipos de documento (sem duplicar siteSettings).
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Configurações do site")
        .id("siteSettingsSingleton")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId(SITE_SETTINGS_ID)
            .title("Configurações do site"),
        ),
      S.divider(),
      S.listItem()
        .title("Blog — Engaja, time!")
        .id("blog-root")
        .child(
          S.list()
            .title("Blog — Engaja, time!")
            .items([
              S.listItem()
                .title("📋 Todos os Posts")
                .id("blog-all")
                .schemaType("blogPost")
                .child(
                  S.documentList()
                    .id("blog-all-list")
                    .title("Todos os Posts")
                    .schemaType("blogPost")
                    .apiVersion(apiVersion)
                    .filter('_type == "blogPost"')
                    .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
                    .child(blogPostDocumentWithPreview(S)),
                ),
              S.listItem()
                .title("🤖 Rascunhos IA (aguardando revisão)")
                .id("blog-ai-drafts")
                .schemaType("blogPost")
                .child(
                  S.documentList()
                    .id("blog-ai-drafts-list")
                    .title("Rascunhos gerados por IA")
                    .schemaType("blogPost")
                    .apiVersion(apiVersion)
                    .filter('_type == "blogPost" && aiGenerated == true && !defined(publishedAt)')
                    .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
                    .child(blogPostDocumentWithPreview(S)),
                ),
              S.listItem()
                .title("⭐ Destaques")
                .id("blog-featured")
                .schemaType("blogPost")
                .child(
                  S.documentList()
                    .id("blog-featured-list")
                    .title("Posts em Destaque")
                    .schemaType("blogPost")
                    .apiVersion(apiVersion)
                    .filter('_type == "blogPost" && featured == true')
                    .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
                    .child(blogPostDocumentWithPreview(S)),
                ),
              S.divider(),
              S.listItem()
                .title("Por Categoria")
                .id("blog-by-category")
                .child(
                  S.list()
                    .title("Categorias do Blog")
                    .items([
                      {
                        label: "🏆 Engajamento",
                        value: "Engajamento",
                      },
                      {
                        label: "🎮 Gamificação de Times",
                        value: "Gamificação de Times",
                      },
                      {
                        label: "💡 4unik na Prática",
                        value: "4unik na Prática",
                      },
                      {
                        label: "🎁 Eventos & Brindes",
                        value: "Eventos & Brindes",
                      },
                      {
                        label: "📈 Crescimento",
                        value: "Crescimento",
                      },
                      {
                        label: "🧠 Gestão de Pessoas",
                        value: "Gestão de Pessoas",
                      },
                      {
                        label: "🎯 Motivação & Reconhecimento",
                        value: "Motivação & Reconhecimento",
                      },
                    ].map(({ label, value }) => {
                      const categoryId = asciiId(value);
                      return S.listItem()
                        .title(label)
                        .id(`blog-cat-${categoryId}`)
                        .schemaType("blogPost")
                        .child(
                          S.documentList()
                            .id(`blog-cat-${categoryId}-list`)
                            .title(label)
                            .schemaType("blogPost")
                            .apiVersion(apiVersion)
                            .filter('_type == "blogPost" && category == $category')
                            .params({ category: value })
                            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
                            .child(blogPostDocumentWithPreview(S)),
                        );
                    })),
                ),
            ]),
        ),
      S.listItem()
        .title("Landing pages")
        .id("marketingPage")
        .schemaType("marketingPage")
        .child(
          marketingPageDocumentList(S, {
            id: "marketingPage",
            title: "Landing Pages de Marketing",
          }),
        ),
      S.listItem()
        .title("Landing pages PT")
        .id("marketingPage-pt")
        .schemaType("marketingPage")
        .child(
          marketingPageDocumentList(S, {
            id: "marketingPage-pt",
            title: "Landing pages PT",
            locale: "pt",
          }),
        ),
      S.listItem()
        .title("Landing pages EN")
        .id("marketingPage-en")
        .schemaType("marketingPage")
        .child(
          marketingPageDocumentList(S, {
            id: "marketingPage-en",
            title: "Landing pages EN",
            locale: "en",
          }),
        ),
      S.listItem()
        .title("Estratégias de marketing")
        .id("marketing-strategies")
        .schemaType("marketingStrategy")
        .child(S.documentTypeList("marketingStrategy").title("Estratégias de Marketing")),
      S.listItem()
        .title("Espelho editorial do codigo")
        .id("content-mirror")
        .schemaType("contentMirror")
        .child(
          S.documentTypeList("contentMirror")
            .title("Espelho editorial do codigo")
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.listItem()
        .title("Páginas estruturais (legado)")
        .id("legacy-pages")
        .schemaType("page")
        .child(S.documentTypeList("page").title("Páginas da Landing Page (legado)")),
      S.listItem()
        .title("Menus")
        .id("menus")
        .schemaType("menu")
        .child(S.documentTypeList("menu").title("Menus de Navegação")),
      S.listItem()
        .title("Coleções de logos")
        .id("logo-collections")
        .schemaType("logoCollection")
        .child(S.documentTypeList("logoCollection").title("Coleções de logos")),
      S.listItem()
        .title("Mídia de showcase da home")
        .id("home-showcase-media")
        .schemaType("homeShowcaseMedia")
        .child(
          S.documentTypeList("homeShowcaseMedia")
            .title("Mídia de showcase da home")
            .child((docId) =>
              S.document()
                .documentId(docId)
                .schemaType("homeShowcaseMedia")
                .views([
                  S.view.form().title("Editor"),
                  S.view.component(PagePreviewPane).title("Miniatura da página"),
                ]),
            ),
        ),
      S.listItem()
        .title("Mídia de showcase da plataforma")
        .id("platform-showcase-media")
        .schemaType("platformShowcaseMedia")
        .child(
          S.documentTypeList("platformShowcaseMedia")
            .title("Mídia de showcase da plataforma")
            .child((docId) =>
              S.document()
                .documentId(docId)
                .schemaType("platformShowcaseMedia")
                .views([
                  S.view.form().title("Editor"),
                  S.view.component(PagePreviewPane).title("Miniatura da página"),
                ]),
            ),
        ),
      S.listItem()
        .title("Mídia de showcase — Gamificação")
        .id("gamificacao-showcase-media")
        .schemaType("gamificacaoShowcaseMedia")
        .child(
          S.documentTypeList("gamificacaoShowcaseMedia")
            .title("Mídia de showcase — Gamificação")
            .child((docId) =>
              S.document()
                .documentId(docId)
                .schemaType("gamificacaoShowcaseMedia")
                .views([
                  S.view.form().title("Editor"),
                  S.view.component(PagePreviewPane).title("Miniatura da página"),
                ]),
            ),
        ),
      S.listItem()
        .title("Mídia de showcase — API e Integrações")
        .id("api-integracoes-showcase-media")
        .schemaType("apiIntegracoesShowcaseMedia")
        .child(
          S.documentTypeList("apiIntegracoesShowcaseMedia")
            .title("Mídia de showcase — API e Integrações")
            .child((docId) =>
              S.document()
                .documentId(docId)
                .schemaType("apiIntegracoesShowcaseMedia")
                .views([
                  S.view.form().title("Editor"),
                  S.view.component(PagePreviewPane).title("Miniatura da página"),
                ]),
            ),
        ),
      S.listItem()
        .title("Mídia de showcase — Workvivo")
        .id("workvivo-showcase-media")
        .schemaType("workvivoShowcaseMedia")
        .child(
          S.documentTypeList("workvivoShowcaseMedia")
            .title("Mídia de showcase — Workvivo")
            .child((docId) =>
              S.document()
                .documentId(docId)
                .schemaType("workvivoShowcaseMedia")
                .views([
                  S.view.form().title("Editor"),
                  S.view.component(PagePreviewPane).title("Miniatura da página"),
                ]),
            ),
        ),
      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_TYPES.has(String(item.getId())),
      ),
    ]);
