import type { Locale } from "@/lib/locale";
import { getSanityClient } from "@/sanity/lib/client";
import type { WorkvivoShowcaseMediaDoc } from "@/sanity/lib/types";

const imageFields = `{
  alt,
  asset->{
    _ref,
    url
  }
}`;

const QUERY = `*[
  _type == "workvivoShowcaseMedia" &&
  locale == $locale &&
  mediaKey == $mediaKey
][0]{
  _id,
  title,
  mediaKey,
  locale,
  heroImage ${imageFields},
  commsImage ${imageFields},
  intelligenceImage ${imageFields},
  frontlineImage ${imageFields},
  shoutoutImage ${imageFields},
  feedShoutoutImage ${imageFields}
}`;

/** Fallback when legacy documents have no mediaKey set */
const LEGACY_QUERY = `*[
  _type == "workvivoShowcaseMedia" &&
  locale == $locale &&
  !defined(mediaKey)
][0]{
  _id,
  title,
  mediaKey,
  locale,
  heroImage ${imageFields},
  commsImage ${imageFields},
  intelligenceImage ${imageFields},
  frontlineImage ${imageFields},
  shoutoutImage ${imageFields},
  feedShoutoutImage ${imageFields}
}`;

export async function getWorkvivoShowcaseMedia(
  locale: Locale,
  mediaKey = "workvivo-default",
): Promise<WorkvivoShowcaseMediaDoc | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const doc = await client.fetch<WorkvivoShowcaseMediaDoc | null>(QUERY, {
      locale,
      mediaKey,
    });
    if (doc) return doc;
    return await client.fetch<WorkvivoShowcaseMediaDoc | null>(LEGACY_QUERY, {
      locale,
    });
  } catch {
    return null;
  }
}
