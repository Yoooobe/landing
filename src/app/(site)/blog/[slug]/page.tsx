import BlogPostContent from "@/components/BlogPostContent";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { buildBlogPostingJsonLd, buildBreadcrumbListJsonLd } from "@/lib/jsonLd";
import { pageAbsoluteUrl, siteMetadataBase, SITE_NAME } from "@/lib/site";
import {
  getBlogPostBySlug,
  getBlogStaticSlugs,
  getRelatedBlogPosts,
  hasBlogPostWithSlug,
} from "@/sanity/lib/blog";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogStaticSlugs("en");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug("en", slug);

  if (!post) {
    return {
      title: "Blog | Yoobe",
      description: "Yoobe blog article.",
    };
  }

  const imageUrl = getSanityImageUrl(post.seo?.openGraphImage || post.coverImage);
  const defaultOgImage = pageAbsoluteUrl("/og/Yoobe-default.svg");
  const ogImages = imageUrl
    ? [{ url: imageUrl }]
    : [{ url: defaultOgImage, width: 1200, height: 630, alt: `${SITE_NAME} social preview` }];
  const hasPortugueseAlternate = await hasBlogPostWithSlug("pt", post.slug);

  return {
    metadataBase: siteMetadataBase(),
    title: post.seo?.metaTitle || `${post.title} | Yoobe`,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}/`,
      languages: hasPortugueseAlternate
        ? {
            en: `/blog/${post.slug}/`,
            "x-default": `/blog/${post.slug}/`,
          }
        : undefined,
    },
    openGraph: {
      type: "article",
      siteName: "Yoobe",
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      url: `/blog/${post.slug}/`,
      locale: "en_US",
      images: ogImages,
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: imageUrl ? [imageUrl] : [defaultOgImage],
    },
  };
}

export default async function BlogPostPageEn({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug("en", slug);

  if (!post) notFound();

  const pageUrl = pageAbsoluteUrl(`/blog/${post.slug}/`);
  const relatedPosts = await getRelatedBlogPosts("en", post.slug, post.category, 3);
  const breadcrumbLd = buildBreadcrumbListJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.title, path: `/blog/${post.slug}/` },
  ]);

  return (
    <>
      <JsonLdScript data={{ ...buildBlogPostingJsonLd(pageUrl, post, "en") }} />
      <JsonLdScript data={{ ...breadcrumbLd }} />
      <LocaleMessagesProvider locale="en">
        <BlogPostContent post={post} relatedPosts={relatedPosts} />
      </LocaleMessagesProvider>
    </>
  );
}
