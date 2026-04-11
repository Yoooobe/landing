import groq from "groq";
import type { HomeMirrorPayloadDoc } from "@/sanity/lib/types";

const imageFields = `{
  alt,
  asset->{
    _ref,
    url
  }
}`;

export const homeMirrorByIdQuery = groq`
  *[_id == $id][0]{
    homePayload{
      seo{
        title,
        description
      },
      hero{
        badge,
        brand,
        afterBrand,
        line1b,
        line2,
        sub,
        ctaDemo,
        ctaDemoHref,
        ctaExplore,
        ctaExploreHref,
        floatAdhesion,
        floatAdhesionValue,
        floatAdhesionSub,
        floatRh,
        floatRhValue,
        floatRhSub,
        floatEnps,
        floatEnpsValue,
        floatEnpsSub,
        platformImage ${imageFields},
        supportingImage ${imageFields}
      },
      fourUnik{
        kicker,
        bodyBefore,
        brand,
        bodyMid,
        here,
        bodyAfter,
        cta,
        ctaHref,
        sectionImage ${imageFields}
      },
      trust{
        title
      },
      "showcaseMedia": showcaseMedia->{
        _id,
        title,
        mediaKey,
        bento{
          primaryCardImage ${imageFields},
          storeCardImage ${imageFields}
        },
        platformTabs{
          managementImage ${imageFields},
          storeImage ${imageFields},
          campaignsImage ${imageFields}
        },
        enterpriseCases{
          hapvidaLogoImage ${imageFields},
          hapvidaCaseImage ${imageFields},
          prioLogoImage ${imageFields},
          prioCaseImage ${imageFields}
        },
        storeSection{
          usecaseCards[]{
            emoji,
            image ${imageFields}
          }
        },
        howItWorks{
          architectureImage ${imageFields}
        },
        aiRoadmap{
          stages[]{
            icon,
            accentTone,
            image ${imageFields}
          }
        },
        dedicatedIntegrations{
          workvivo{
            logoImage ${imageFields},
            previewImage ${imageFields}
          },
          beehome{
            logoImage ${imageFields},
            previewImage ${imageFields}
          }
        },
        managementSection{
          featureCards[]{
            emoji,
            image ${imageFields}
          }
        }
      },
      finalCta{
        title,
        body,
        demo,
        demoHref,
        whatsapp,
        whatsappHref,
        sectionImage ${imageFields}
      }
    }
  }
`;

export type HomeMirrorQueryResult = {
  homePayload?: HomeMirrorPayloadDoc | null;
} | null;
