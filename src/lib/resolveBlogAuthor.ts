import {
  getBlogAuthorProfile,
  resolveBlogAuthorKey,
} from "@/config/blog-authors";
import type { BlogAuthorProfile, BlogPostDoc } from "@/sanity/lib/types";

function cmsAuthorProfile(post: BlogPostDoc): BlogAuthorProfile | undefined {
  const profile = post.authorProfile;
  if (!profile?.name?.trim() || !profile.bio?.trim()) return undefined;
  return {
    name: profile.name.trim(),
    role: profile.role?.trim() || undefined,
    bio: profile.bio.trim(),
    profileUrl: profile.profileUrl?.trim() || undefined,
    avatar: profile.avatar,
  };
}

/** Resolves EEAT author profile: CMS override → registry → name-only fallback. */
export function resolveBlogAuthor(post: BlogPostDoc): BlogAuthorProfile | undefined {
  const fromCms = cmsAuthorProfile(post);
  if (fromCms) return fromCms;

  const key = resolveBlogAuthorKey(post.author, post.slug, post.locale);
  const fromRegistry = getBlogAuthorProfile(key);
  if (fromRegistry) return fromRegistry;

  if (post.author?.trim()) {
    return { name: post.author.trim(), bio: "" };
  }
  return undefined;
}

export function authorProfileForJsonLd(
  profile: BlogAuthorProfile | undefined,
): BlogAuthorProfile | undefined {
  if (!profile?.name?.trim() || !profile.bio?.trim()) return undefined;
  return profile;
}
