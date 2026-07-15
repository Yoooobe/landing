import type { VercelRequest, VercelResponse } from "@vercel/node";
import { decodeCursor, encodeCursor, readTrackingEvents } from "../../lib/emailTracking";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).end();
  if (!process.env.TRACKING_SYNC_KEY || req.headers["x-sync-key"] !== process.env.TRACKING_SYNC_KEY) {
    return res.status(401).json({ error: "invalid_sync_key" });
  }
  const cursorRaw = typeof req.query.cursor === "string" ? req.query.cursor : "";
  const limitRaw = Number(typeof req.query.limit === "string" ? req.query.limit : "500");
  const limit = Math.max(1, Math.min(Number.isFinite(limitRaw) ? limitRaw : 500, 1000));
  const cursor = decodeCursor(cursorRaw);
  try {
    const docs = await readTrackingEvents(cursor, limit);
    const events = docs.map((doc) => ({
      id: Number(doc.eventId),
      type: doc.eventType,
      track_id: doc.trackId || "",
      email: doc.email || "",
      campaign_id: doc.campaignId ?? null,
      etapa: doc.etapa || "",
      url: doc.destination || "",
      ts: doc.occurredAt || doc._createdAt,
      ua: doc.userAgent || "",
      cf_country: doc.country || "",
      prefetch: doc.prefetch ? 1 : 0,
    }));
    const last = docs.at(-1);
    const next = last
      ? encodeCursor({ createdAt: String(last._createdAt), id: String(last._id) })
      : cursorRaw;
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ cursor: next, count: events.length, events });
  } catch (error) {
    console.error("[email-events]", error);
    return res.status(503).json({ error: "tracking_store_unavailable" });
  }
}
