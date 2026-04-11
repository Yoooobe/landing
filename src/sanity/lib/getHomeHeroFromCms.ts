import { getSanityClient } from "./client";
import type { HeroBlockDoc } from "./types";

const QUERY = `*[_type == "page" && slug.current == "home"][0]{
  "hero": content[_type == "heroBlock"][0]{
    _type,
    headline,
    subheadline,
    ctaText,
    ctaLink,
    image{
      alt,
      asset->{
        _ref,
        url
      }
    }
  }
}`;

type HomeQuery = { hero?: HeroBlockDoc | null };

/** Primeiro bloco hero da página com slug `home`; `null` se não existir ou sem Sanity. */
export async function getHomeHeroFromCms(): Promise<HeroBlockDoc | null> {
  const client = getSanityClient();
  if (!client) return null;
  try {
    const data = await client.fetch<HomeQuery | null>(QUERY);
    const hero = data?.hero;
    if (!hero || typeof hero.headline !== "string" || hero.headline.trim() === "") {
      return null;
    }
    return hero;
  } catch {
    return null;
  }
}
