import BlogPageContent from "@/components/BlogPageContent";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { getBlogListingSeo } from "@/lib/publicRouteFallbacks";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { getBlogPosts } from "@/sanity/lib/blog";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(getBlogListingSeo("pt"), {
      canonicalPath: "/blog/",
      languages: {
        "pt-BR": "/blog/",
        en: "/en/blog/",
      },
      openGraphPath: "/blog/",
      ogLocale: "pt_BR",
    });
}

export default async function BlogPage() {
  const posts = await getBlogPosts("pt");

  return (
    <LocaleMessagesProvider locale="pt">
      <BlogPageContent posts={posts} />
    </LocaleMessagesProvider>
  );
}
