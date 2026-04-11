import groq from "groq";
import type { SiteSettingsDoc } from "@/sanity/lib/types";

export const siteSettingsQuery = groq`
  *[_id == "siteSettings"][0]{
    environmentLabel,
    notes,
    gaMeasurementId,
    gtmContainerId,
    metaPixelId,
    linkedinPartnerId,
    calendlyUrl,
    whatsappUrl,
    contactEmail,
    appLoginUrl,
    rewardsCatalogUrl,
    companySiteUrl,
    privacyUrl,
    termsUrl,
    headerWordmarkImage,
    footerWordmarkImage,
    defaultOgImage,
    "headerMenuPt": headerMenuPt->{
      _id,
      title,
      menuKey,
      locale,
      sections[]{
        title,
        items[]{
          label,
          description,
          href,
          badge,
          icon,
          openInNewTab
        }
      }
    },
    "headerMenuEn": headerMenuEn->{
      _id,
      title,
      menuKey,
      locale,
      sections[]{
        title,
        items[]{
          label,
          description,
          href,
          badge,
          icon,
          openInNewTab
        }
      }
    },
    "footerMenuPt": footerMenuPt->{
      _id,
      title,
      menuKey,
      locale,
      sections[]{
        title,
        items[]{
          label,
          description,
          href,
          badge,
          icon,
          openInNewTab
        }
      }
    },
    "footerMenuEn": footerMenuEn->{
      _id,
      title,
      menuKey,
      locale,
      sections[]{
        title,
        items[]{
          label,
          description,
          href,
          badge,
          icon,
          openInNewTab
        }
      }
    },
    "trustLogoCollection": trustLogoCollection->{
      _id,
      title,
      collectionKey,
      items[]{
        name,
        href,
        logo
      }
    },
    "clientsLogoCollection": clientsLogoCollection->{
      _id,
      title,
      collectionKey,
      items[]{
        name,
        href,
        logo
      }
    }
  }
`;

export type SiteSettingsQueryResult = SiteSettingsDoc;
