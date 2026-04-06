"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function BlogPageContent() {
  const { m, path } = useLocaleMessages();
  const b = m.blogPage;
  const posts = b.posts;
  const [featured, ...rest] = posts;

  return (
    <div className="pt-32 pb-24 bg-[#0d1424] min-h-screen text-white">
      <div className="container mx-auto px-4 max-w-6xl mb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black mb-6 font-heading">
            {b.titleBefore}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yoobe-neon-pink">
              {b.titleGradient}
            </span>
          </h1>
          <p className="text-xl text-white/60 font-sans leading-relaxed">{b.sub}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mb-16">
        <Link href={path(`/blog/${featured.id}`)} className="block group">
          <div className="relative rounded-3xl overflow-hidden glass-panel-dark border border-white/10 flex flex-col md:flex-row h-auto md:h-[400px]">
            <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f18] via-transparent to-transparent hidden md:block"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18] via-transparent to-transparent md:hidden"></div>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 mb-6 rounded-full border border-yoobe-neon-pink/30 bg-yoobe-neon-pink/10 text-yoobe-neon-pink text-xs font-bold tracking-wide uppercase w-fit">
                {featured.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-4 font-heading group-hover:text-brand-orange transition-colors">
                {featured.title}
              </h2>
              <p className="text-white/60 text-lg mb-6 font-sans">{featured.excerpt}</p>
              <div className="flex items-center gap-6 text-sm text-white/40 font-sans mt-auto">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {b.accessedPrefix} {featured.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {featured.readTime} {b.readLabel}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rest.map((post) => (
            <Link key={post.id} href={path(`/blog/${post.id}`)} className="group">
              <div className="rounded-3xl overflow-hidden glass-panel-dark border border-white/10 h-full flex flex-col">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <span className="inline-block px-3 py-1 mb-4 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 text-yoobe-purple text-xs font-bold tracking-wide uppercase w-fit">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-yoobe-purple transition-colors">{post.title}</h3>
                  <p className="text-white/60 font-sans mb-6 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-white/40 font-sans border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {b.accessedPrefix} {post.date}
                    </div>
                    <div className="flex items-center gap-2 font-medium text-brand-orange group-hover:translate-x-1 transition-transform">
                      {b.readMore} <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
