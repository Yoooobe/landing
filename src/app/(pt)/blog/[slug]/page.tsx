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
  const slugs = await getBlogStaticSlugs("pt");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug("pt", slug);

  if (!post) {
    return {
      title: "Blog | 4unik",
      description: "Artigo do blog da 4unik.",
    };
  }

  const imageUrl = getSanityImageUrl(post.seo?.openGraphImage || post.coverImage);
  const defaultOgImage = pageAbsoluteUrl("/og/4unik-default.svg");
  const ogImages = imageUrl
    ? [{ url: imageUrl }]
    : [{ url: defaultOgImage, width: 1200, height: 630, alt: `${SITE_NAME} social preview` }];
  const hasEnglishAlternate = await hasBlogPostWithSlug("en", post.slug);

  return {
    metadataBase: siteMetadataBase(),
    title: post.seo?.metaTitle || `${post.title} | 4unik`,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}/`,
      languages: hasEnglishAlternate
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
      url: `/blog/${post.slug}/`,
      locale: "pt_BR",
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug("pt", slug);

  if (!post) notFound();

  const pageUrl = pageAbsoluteUrl(`/blog/${post.slug}/`);
  const relatedPosts = await getRelatedBlogPosts("pt", post.slug, post.category, 3);
  const breadcrumbLd = buildBreadcrumbListJsonLd([
    { name: "Início", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.title, path: `/blog/${post.slug}/` },
  ]);

  return (
    <>
      <JsonLdScript data={{ ...buildBlogPostingJsonLd(pageUrl, post, "pt") }} />
      <JsonLdScript data={{ ...breadcrumbLd }} />
      <LocaleMessagesProvider locale="pt">
        <BlogPostContent post={post} relatedPosts={relatedPosts} />
      </LocaleMessagesProvider>
    </>
  );
}
