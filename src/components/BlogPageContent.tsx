"use client";

import BlogContentImage from "@/components/BlogContentImage";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { normalizeBlogCategoryForFilter } from "@/lib/blogFallback";
import { getBlogImageUrl } from "@/lib/blogImageUrl";
import type { BlogPostDoc } from "@/sanity/lib/types";
import { ArrowRight, Calendar, Clock, BookOpen, Tag, Users, Zap, Trophy, Target, Lightbulb, Gift, TrendingUp, Brain } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  posts: BlogPostDoc[];
};

const CATEGORIES = [
  { label: "Todos", value: "all", icon: BookOpen },
  { label: "Engajamento", value: "Engajamento", icon: Trophy },
  { label: "Gamificação de Times", value: "Gamificação de Times", icon: Zap },
  { label: "4unik na Prática", value: "4unik na Prática", icon: Lightbulb },
  { label: "Eventos & Brindes", value: "Eventos & Brindes", icon: Gift },
  { label: "Crescimento", value: "Crescimento", icon: TrendingUp },
  { label: "Gestão de Pessoas", value: "Gestão de Pessoas", icon: Brain },
  { label: "Motivação & Reconhecimento", value: "Motivação & Reconhecimento", icon: Target },
];

function formatBlogDate(date: string, locale: "pt" | "en") {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function getPostCardImage(post: BlogPostDoc) {
  return getBlogImageUrl(post.coverImage, "cardThumb");
}

function getFeaturedSplitImage(post: BlogPostDoc) {
  return getBlogImageUrl(post.coverImage, "featuredSplit");
}

function AuthorBadge({ author, aiGenerated }: { author?: string; aiGenerated?: boolean }) {
  if (!author && !aiGenerated) return null;
  return (
    <div className="flex items-center gap-2 mb-3">
      {author && (
        <span className="flex items-center gap-1.5 text-xs text-white/50 font-sans">
          <Users className="w-3 h-3" />
          {author}
        </span>
      )}
      {aiGenerated && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold">
          <Zap className="w-3 h-3" />
          IA
        </span>
      )}
    </div>
  );
}

function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {tags.slice(0, 3).map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-sans">
          <Tag className="w-2.5 h-2.5" />
          {tag}
        </span>
      ))}
    </div>
  );
}

function StatsBar({ posts }: { posts: BlogPostDoc[] }) {
  const totalReadTime = posts.reduce((acc, p) => acc + (p.readTimeMinutes || 0), 0);
  const categories = new Set(posts.map((p) => p.category)).size;
  const published = posts.filter((p) => p.publishedAt).length;

  return (
    <div className="flex flex-wrap items-center gap-6 md:gap-10 mt-8 mb-2">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black text-brand-orange font-heading">{published}</span>
        <span className="text-sm text-white/40 font-sans">artigos publicados</span>
      </div>
      <div className="w-px h-6 bg-white/10 hidden md:block" />
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black text-brand-orange font-heading">{categories}</span>
        <span className="text-sm text-white/40 font-sans">categorias</span>
      </div>
      <div className="w-px h-6 bg-white/10 hidden md:block" />
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black text-brand-orange font-heading">{totalReadTime}</span>
        <span className="text-sm text-white/40 font-sans">min de conteúdo</span>
      </div>
    </div>
  );
}

export default function BlogPageContent({ posts }: Props) {
  const { locale, m, path } = useLocaleMessages();
  const b = m.blogPage;
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter(
      (p) => normalizeBlogCategoryForFilter(p.category) === activeCategory,
    );
  }, [posts, activeCategory]);

  const [featured, ...rest] = filteredPosts;

  if (!posts.length) {
    return (
      <div className="min-h-screen bg-[#0d1424] px-4 pb-24 pt-32 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <span className="inline-block px-3 py-1 mb-6 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-widest uppercase">
            Blog 4unik
          </span>
          <h1 className="mb-4 text-4xl font-black font-heading">
            Engaja,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yoobe-neon-pink">
              time!
            </span>
          </h1>
          <p className="text-white/60 font-sans">{b.sub}</p>
        </div>
      </div>
    );
  }

  const featuredImage = featured ? getFeaturedSplitImage(featured) : null;

  return (
    <div className="pt-32 pb-24 bg-[#0d1424] min-h-screen text-white">
      {/* ── Hero Header ── */}
      <div className="container mx-auto px-4 max-w-6xl mb-10">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 mb-6 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-widest uppercase">
            Blog 4unik · para os heróis do RH
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-4 font-heading leading-tight">
            Engaja,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yoobe-neon-pink">
              time!
            </span>
          </h1>
          <p className="text-xl text-white/60 font-sans leading-relaxed max-w-2xl">
            Gamificação, reconhecimento, campanhas e ideias práticas para o RH que quer transformar engajamento em resultado.
          </p>
          <StatsBar posts={posts} />
        </div>
      </div>

      {/* ── Category Filters ── */}
      <div className="container mx-auto px-4 max-w-6xl mb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setActiveCategory(value)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium font-sans transition-all duration-200 ${
                activeCategory === value
                  ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/80"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── No results for active category ── */}
      {!featured && (
        <div className="container mx-auto px-4 max-w-6xl text-center py-16">
          <p className="text-white/40 font-sans">
            {locale === "pt"
              ? "Nenhum artigo nessa categoria ainda."
              : "No articles in this category yet."}
          </p>
        </div>
      )}

      {/* ── Featured Post ── */}
      {featured && (
        <div className="container mx-auto px-4 max-w-6xl mb-14">
          <Link href={path(`/blog/${featured.slug}`)} className="block group">
            <div className="relative rounded-3xl overflow-hidden glass-panel-dark border border-white/10 flex flex-col md:flex-row h-auto md:h-[440px]">
              <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
                {featuredImage ? (
                  <BlogContentImage
                    src={featuredImage}
                    alt={featured.coverImage?.alt || featured.title}
                    layout="featuredSplit"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-brand-orange/30 via-yoobe-neon-pink/20 to-unik-blue/30 flex items-center justify-center">
                    <Trophy className="w-24 h-24 text-white/10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f18] via-transparent to-transparent hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18] via-transparent to-transparent md:hidden" />
                {featured.featured && (
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-brand-orange text-white text-xs font-bold tracking-wide">
                    ⭐ Destaque
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 mb-4 rounded-full border border-yoobe-neon-pink/30 bg-yoobe-neon-pink/10 text-yoobe-neon-pink text-xs font-bold tracking-wide uppercase w-fit">
                  {featured.category}
                </span>
                <AuthorBadge author={(featured as BlogPostDoc & { author?: string }).author} aiGenerated={(featured as BlogPostDoc & { aiGenerated?: boolean }).aiGenerated} />
                <h2 className="text-3xl md:text-4xl font-black mb-4 font-heading group-hover:text-brand-orange transition-colors">
                  {featured.title}
                </h2>
                <p className="text-white/60 text-lg mb-6 font-sans line-clamp-3">{featured.excerpt}</p>
                <TagList tags={(featured as BlogPostDoc & { tags?: string[] }).tags} />
                <div className="flex items-center gap-6 text-sm text-white/40 font-sans mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatBlogDate(featured.publishedAt, locale)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {featured.readTimeMinutes} min
                  </div>
                  <div className="ml-auto flex items-center gap-2 font-medium text-brand-orange group-hover:translate-x-1 transition-transform">
                    {b.readMore} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* ── Grid of remaining posts ── */}
      {rest.length > 0 && (
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => {
              const postWithExtras = post as BlogPostDoc & { author?: string; aiGenerated?: boolean; tags?: string[] };
              const img = getPostCardImage(post);
              return (
                <Link key={post._id} href={path(`/blog/${post.slug}`)} className="group flex">
                  <div className="rounded-3xl overflow-hidden glass-panel-dark border border-white/10 flex flex-col w-full transition-transform duration-300 hover:-translate-y-1">
                    <div className="h-44 relative overflow-hidden flex-shrink-0">
                      {img ? (
                        <BlogContentImage
                          src={img}
                          alt={post.coverImage?.alt || post.title}
                          layout="cardThumb"
                          imgClassName="transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-yoobe-purple/30 via-brand-orange/20 to-brand-navy-dark flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-white/10" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block px-2.5 py-1 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 text-yoobe-purple text-xs font-bold tracking-wide uppercase">
                          {post.category}
                        </span>
                        {postWithExtras.aiGenerated && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold">
                            <Zap className="w-3 h-3" />
                            IA
                          </span>
                        )}
                      </div>
                      <AuthorBadge author={postWithExtras.author} />
                      <h3 className="text-xl font-bold mb-2 font-heading group-hover:text-yoobe-purple transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-white/50 font-sans mb-4 flex-1 text-sm line-clamp-3">{post.excerpt}</p>
                      <TagList tags={postWithExtras.tags} />
                      <div className="flex items-center justify-between text-xs text-white/30 font-sans border-t border-white/5 pt-3 mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatBlogDate(post.publishedAt, locale)}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTimeMinutes} min
                          </div>
                        </div>
                        <div className="flex items-center gap-1 font-medium text-brand-orange group-hover:translate-x-1 transition-transform">
                          {b.readMore} <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
