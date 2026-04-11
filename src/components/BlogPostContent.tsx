"use client";
/* eslint-disable @next/next/no-img-element */

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { BlogPostDoc, BlogPostListItem } from "@/sanity/lib/types";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import PortableTextContent from "@/components/PortableTextContent";

type Props = {
  post: BlogPostDoc;
  relatedPosts?: BlogPostListItem[];
};

function formatBlogDate(date: string, locale: "pt" | "en") {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export default function BlogPostContent({ post, relatedPosts = [] }: Props) {
  const { locale, m, path } = useLocaleMessages();
  const imageUrl = getSanityImageUrl(post.coverImage);
  const blogPageCopy = m.blogPage as typeof m.blogPage & {
    backToBlog?: string;
    relatedHeading?: string;
  };
  const backLabel = blogPageCopy.backToBlog || (locale === "pt" ? "Voltar para o blog" : "Back to blog");
  const relatedHeading =
    blogPageCopy.relatedHeading || (locale === "pt" ? "Leia também" : "Read next");
  const updatedLabel = locale === "pt" ? m.blogPage.accessedPrefix : m.blogPage.accessedPrefix;
  const readLabel = m.blogPage.readLabel;

  return (
    <article className="min-h-screen bg-[#0d1424] pb-24 pt-32 text-white">
      <div className="container mx-auto max-w-4xl px-4">
        <Link
          href={path("/blog")}
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <span className="mb-6 inline-flex rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1 text-xs font-bold uppercase tracking-wide text-brand-orange">
          {post.category}
        </span>

        <h1 className="mb-6 text-4xl font-black font-heading leading-tight md:text-6xl">
          {post.title}
        </h1>

        <p className="mb-8 max-w-3xl text-xl leading-8 text-white/65">{post.excerpt}</p>

        <div className="mb-12 flex flex-wrap gap-6 border-y border-white/10 py-5 text-sm text-white/45">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {updatedLabel} {formatBlogDate(post.publishedAt, locale)}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {post.readTimeMinutes} {readLabel}
          </div>
        </div>

        {imageUrl ? (
          <div className="mb-12 overflow-hidden rounded-3xl border border-white/10">
            <img
              src={imageUrl}
              alt={post.coverImage?.alt || post.title}
              className="h-[420px] w-full object-cover"
            />
          </div>
        ) : null}

        <PortableTextContent blocks={post.body} />

        {relatedPosts.length > 0 ? (
          <aside className="mt-16 border-t border-white/10 pt-12">
            <h2 className="mb-6 font-heading text-2xl font-bold text-white">{relatedHeading}</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={path(`/blog/${r.slug}/`)}
                    className="block rounded-2xl border border-white/10 bg-white/4 p-4 transition-colors hover:border-brand-orange/40 hover:bg-white/6"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-orange/90">
                      {r.category}
                    </span>
                    <p className="mt-2 font-heading text-lg font-bold leading-snug text-white">{r.title}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-white/55">{r.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </article>
  );
}
