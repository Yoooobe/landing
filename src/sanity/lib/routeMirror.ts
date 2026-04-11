import { getSanityClient } from "@/sanity/lib/client";
import type { RouteMirrorJsonPayloadDoc } from "@/sanity/lib/types";
import { routeMirrorByIdQuery } from "@/sanity/queries/routeMirror";

type RouteMirrorQueryResult = {
  routePayloadJson?: string | null;
} | null;

export async function getRouteMirrorPayload<T extends RouteMirrorJsonPayloadDoc>(
  id: string,
): Promise<T | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const data = await client.fetch<RouteMirrorQueryResult>(routeMirrorByIdQuery, { id });
    const raw = data?.routePayloadJson?.trim();
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
