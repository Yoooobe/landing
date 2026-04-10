import BlogPostContent from "@/components/BlogPostContent";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { buildBlogPostingJsonLd } from "@/lib/jsonLd";
import { pageAbsoluteUrl, siteMetadataBase } from "@/lib/site";
import { getBlogPostBySlug, getBlogStaticSlugs, hasBlogPostWithSlug } from "@/sanity/lib/blog";
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
      title: "Blog | 4Unik",
      description: "4Unik blog article.",
    };
  }

  const imageUrl = getSanityImageUrl(post.seo?.openGraphImage || post.coverImage);
  const hasPortugueseAlternate = await hasBlogPostWithSlug("pt", post.slug);

  return {
    metadataBase: siteMetadataBase(),
    title: post.seo?.metaTitle || `${post.title} | 4Unik`,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: {
      canonical: `/en/blog/${post.slug}/`,
      languages: hasPortugueseAlternate
        ? {
            "pt-BR": `/blog/${post.slug}/`,
            en: `/en/blog/${post.slug}/`,
            "x-default": `/blog/${post.slug}/`,
          }
        : undefined,
    },
    openGraph: {
      type: "article",
      siteName: "4Unik",
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      url: `/en/blog/${post.slug}/`,
      locale: "en_US",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPageEn({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug("en", slug);

  if (!post) notFound();

  const pageUrl = pageAbsoluteUrl(`/en/blog/${post.slug}/`);

  return (
    <>
      <JsonLdScript data={{ ...buildBlogPostingJsonLd(pageUrl, post, "en") }} />
      <LocaleMessagesProvider locale="en">
        <BlogPostContent post={post} />
      </LocaleMessagesProvider>
    </>
  );
}
