import groq from "groq";
import type { BlogPostDoc, BlogPostListItem } from "@/sanity/lib/types";

export const blogPostListQuery = groq`
  *[_type == "blogPost" && locale == $locale] | order(featured desc, publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    locale,
    excerpt,
    category,
    publishedAt,
    readTimeMinutes,
    featured,
    author,
    tags,
    aiGenerated,
    coverImage{
      alt,
      asset->{
        _ref,
        url
      }
    }
  }
`;

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && locale == $locale && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const blogPostSlugExistsQuery = groq`
  count(*[_type == "blogPost" && locale == $locale && slug.current == $slug]) > 0
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && locale == $locale && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    locale,
    excerpt,
    category,
    publishedAt,
    readTimeMinutes,
    featured,
    author,
    tags,
    aiGenerated,
    relatedKeywords,
    seo{
      metaTitle,
      metaDescription,
      openGraphImage{
        asset->{
          _ref,
          url
        }
      }
    },
    coverImage{
      alt,
      asset->{
        _ref,
        url
      }
    },
    body[]{
      ...,
      markDefs[]{
        ...,
        _key,
        _type,
        href
      },
      asset->{
        _ref,
        url
      },
      featureImage{
        alt,
        asset->{
          _ref,
          url
        }
      }
    }
  }
`;

export type BlogPostListQueryResult = BlogPostListItem[];
export type BlogPostBySlugQueryResult = BlogPostDoc | null;
