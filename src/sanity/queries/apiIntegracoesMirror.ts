import { groq } from "next-sanity";
import type { ApiIntegracoesPayloadDoc } from "@/sanity/lib/types";

const imageFields = `{
  alt,
  asset->{
    _ref,
    url
  }
}`;

export const apiIntegracoesMirrorByIdQuery = groq`
  *[_id == $id][0]{
    apiIntegracoesPayload{
      seo{
        title,
        description,
        openGraphDescription
      },
      hero{
        badge,
        title,
        description,
        primaryCtaLabel,
        primaryCtaHref,
        secondaryCtaLabel,
        secondaryCtaHref,
        codeWindowTitle,
        codeSnippet
      },
      features{
        title,
        description,
        items[]{
          title,
          description,
          icon,
          colSpan
        }
      },
      integrations{
        badge,
        title,
        titleGradient,
        titleAfter,
        description,
        mainPlatforms[]{
          name,
          by,
          logo,
          badge,
          color,
          description,
          features
        },
        extraIntegrations,
        extraIntegrationsLabel
      },
      modules{
        badge,
        titleBefore,
        titleGradient,
        titleAfter,
        description,
        items[]{
          icon,
          title,
          description
        }
      },
      finalCta{
        title,
        description,
        buttonLabel,
        buttonHref
      },
      "showcaseMedia": showcaseMedia->{
        _id,
        title,
        mediaKey,
        hero{
          showcaseImage ${imageFields}
        },
        integrations{
          platforms[]{
            platformName,
            logoImage ${imageFields},
            previewImage ${imageFields}
          }
        },
        features{
          items[]{
            emoji,
            image ${imageFields}
          }
        },
        modules{
          items[]{
            emoji,
            image ${imageFields}
          }
        }
      }
    }
  }
`;

export type ApiIntegracoesMirrorQueryResult = {
  apiIntegracoesPayload?: ApiIntegracoesPayloadDoc | null;
} | null;
