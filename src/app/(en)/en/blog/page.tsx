import BlogPageContent from "@/components/BlogPageContent";
import { LocaleMessagesProvider } from "@/contexts/LocaleMessagesContext";
import { getBlogListingSeo } from "@/lib/publicRouteFallbacks";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { getBlogPosts } from "@/sanity/lib/blog";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(getBlogListingSeo("en"), {
      canonicalPath: "/en/blog/",
      languages: {
        "pt-BR": "/blog/",
        en: "/en/blog/",
      },
      openGraphPath: "/en/blog/",
      ogLocale: "en_US",
    });
}

export default async function BlogPageEn() {
  const posts = await getBlogPosts("en");

  return (
    <LocaleMessagesProvider locale="en">
      <BlogPageContent posts={posts} />
    </LocaleMessagesProvider>
  );
}
