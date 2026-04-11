import { groq } from "next-sanity";
import type { MarketingPageDoc, MarketingStrategyDoc } from "@/sanity/lib/types";

const marketingPageProjection = groq`
  _id,
  title,
  "slug": slug.current,
  locale,
  summary,
  seo{
    metaTitle,
    metaDescription
  },
  content[]{
    ...,
    _type == "logoStripBlock" => {
      displayStyle,
      sectionId,
      "collection": collection->{
        _id,
        title,
        collectionKey,
        items[]{
          name,
          href,
          logo
        }
      }
    },
    markDefs[]{
      ...,
      _key,
      _type,
      href
    }
  }
`;

export const marketingPageListQuery = groq`
  *[_type == "marketingPage" && locale == $locale] | order(title asc){
    ${marketingPageProjection}
  }
`;

export const marketingPageBySlugQuery = groq`
  *[_type == "marketingPage" && locale == $locale && slug.current == $slug][0]{
    ${marketingPageProjection}
  }
`;

export const marketingStrategyListQuery = groq`
  *[_type == "marketingStrategy" && locale == $locale] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    locale,
    pillar,
    status,
    summary,
    seo{
      metaTitle,
      metaDescription
    },
    body[]{
      ...,
      markDefs[]{
        ...,
        _key,
        _type,
        href
      }
    }
  }
`;

export type MarketingPageListQueryResult = MarketingPageDoc[];
export type MarketingStrategyListQueryResult = MarketingStrategyDoc[];
export type MarketingPageBySlugQueryResult = MarketingPageDoc | null;
