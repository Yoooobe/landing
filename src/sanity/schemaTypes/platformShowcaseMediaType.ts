import { defineField, defineType } from "sanity";
import { LocaleSwitcherInput } from "@/sanity/components/LocaleSwitcherInput";

function imageField(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Texto alternativo",
        type: "string",
      }),
    ],
  });
}

function imageWithEmojiField(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    type: "object",
    description,
    fields: [
      defineField({
        name: "emoji",
        title: "Emoji de fallback",
        type: "string",
      }),
      imageField("image", "Imagem", "Se enviada, substitui o emoji do card."),
    ],
    preview: {
      select: {
        title: "emoji",
        media: "image",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prepare({ title, media }: { title?: string; media?: any }) {
        return {
          title: title || "Card visual",
          media,
        };
      },
    },
  });
}

export const platformShowcaseMediaType = defineType({
  name: "platformShowcaseMedia",
  title: "Mídia de showcase da plataforma",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título interno",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageKey",
      title: "Chave da página",
      type: "string",
      initialValue: "plataforma",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locale",
      title: "Idioma",
      type: "string",
      options: {
        list: [
          { title: "Português", value: "pt" },
          { title: "English", value: "en" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      components: { input: LocaleSwitcherInput },
    }),
    imageField(
      "adminDashboardImage",
      "Imagem do Admin Dashboard",
      "Substitui o grande mockup do painel do gestor na página Plataforma.",
    ),
    imageField(
      "storeMockupImage",
      "Imagem da loja de recompensas",
      "Substitui o mockup principal da seção PlataformaStore.",
    ),
    imageField(
      "logisticsPanelImage",
      "Painel visual de logística",
      "Painel editorial opcional exibido na seção de logística integrada.",
    ),
    imageField(
      "securityPanelImage",
      "Painel visual de segurança",
      "Painel editorial opcional exibido na seção de segurança enterprise.",
    ),
    defineField({
      name: "gestaoFeatureCards",
      title: "Cards de gestão (seção Funcionalidades)",
      type: "array",
      description:
        "Até 4 cards da seção de gestão na página Funcionalidades/Plataforma. A ordem segue a ordem dos cards na página.",
      of: [
        imageWithEmojiField(
          "gestaoCard",
          "Card de gestão",
          "Visual de um card de gestão (metas, relatórios, segmentação, etc.).",
        ),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "gamificacaoFeatureCards",
      title: "Cards de gamificação (seção Funcionalidades)",
      type: "array",
      description:
        "Até 4 cards da seção de gamificação na página Funcionalidades/Plataforma. A ordem segue a ordem dos cards na página.",
      of: [
        imageWithEmojiField(
          "gamificacaoCard",
          "Card de gamificação",
          "Visual de um card de gamificação (pontos, missões, ranking, etc.).",
        ),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "lojaFeatureCards",
      title: "Cards de loja (seção Funcionalidades)",
      type: "array",
      description:
        "Até 4 cards da seção de loja de recompensas na página Funcionalidades/Plataforma. A ordem segue a ordem dos cards na página.",
      of: [
        imageWithEmojiField(
          "lojaCard",
          "Card de loja",
          "Visual de um card da loja de recompensas (catálogo, pedidos, vouchers, etc.).",
        ),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "apiFeatureCards",
      title: "Cards de API (seção Funcionalidades)",
      type: "array",
      description:
        "Até 4 cards da seção de API na página Funcionalidades/Plataforma. A ordem segue a ordem dos cards na página.",
      of: [
        imageWithEmojiField(
          "apiCard",
          "Card de API",
          "Visual de um card de API (REST, webhooks, sandbox, SDKs, etc.).",
        ),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    // ── Loja Corporativa (/plataforma/loja-resgate/) ──────────────────────
    imageField(
      "storeHomeImage",
      "Loja Corporativa — vitrine principal",
      "Home da loja com catálogo de produtos. Substitui o static store-home.png no hero da página Loja Corporativa.",
    ),
    imageField(
      "productDetailImage",
      "Loja Corporativa — página de produto",
      "Detalhe de produto (ex: Alexa Echo Dot 5 em 4Ucoins). Usado na galeria da página Loja Corporativa.",
    ),
    imageField(
      "cartImage",
      "Loja Corporativa — carrinho",
      "Tela do carrinho com itens e resumo do pedido em pontos.",
    ),
    imageField(
      "giftWizardImage",
      "Loja Corporativa — wizard de presente (Revisão)",
      "Tela de revisão do wizard Editar Presente: nome, produtos e destinatários. Usada na galeria.",
    ),
    imageField(
      "adminUsersImage",
      "Loja Corporativa — painel de usuários (admin)",
      "Tela do admin mostrando lista de usuários e o modal de Gerenciar Pontos.",
    ),
    imageField(
      "adminSettingsImage",
      "Loja Corporativa — configurações de pontos",
      "Tela de configurações com Sistema de Pontos, Pagamento e Gamificação.",
    ),
    imageField(
      "orderDetailImage",
      "Loja Corporativa — detalhe do pedido entregue",
      "Tela do colaborador mostrando pedido com status Entregue e código de rastreio.",
    ),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "locale",
      media: "adminDashboardImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Mídia de showcase da plataforma",
        subtitle: subtitle ? `locale: ${subtitle}` : undefined,
        media,
      };
    },
  },
});
