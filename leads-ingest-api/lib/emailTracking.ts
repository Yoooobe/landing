import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { createClient } from "@sanity/client";
import type { VercelRequest } from "@vercel/node";

export type TrackingPayload = {
  sid?: string;
  email?: string;
  cid?: number | null;
  etapa?: string | number;
  u?: string;
};

export type TrackingEventType = "open" | "click" | "unsubscribe";

const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2024-03-17";

function b64urlDecode(value: string): Buffer {
  return Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

export function verifyTrackingToken(token: string): TrackingPayload | null {
  const secret = process.env.TRACKING_SECRET?.trim();
  if (!secret || !token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  try {
    const bodyPart = token.slice(0, dot);
    const raw = b64urlDecode(bodyPart);
    const received = b64urlDecode(token.slice(dot + 1));
    const expected = createHmac("sha256", secret).update(raw.toString("utf8"), "utf8").digest();
    if (received.length !== expected.length ||
        !timingSafeEqual(received as unknown as Uint8Array, expected as unknown as Uint8Array)) return null;
    const payload = JSON.parse(raw.toString("utf8")) as TrackingPayload;
    return payload && typeof payload === "object" ? payload : null;
  } catch {
    return null;
  }
}

export function tokenFromRequest(req: VercelRequest): string {
  const value = req.query.token;
  return typeof value === "string" ? value : Array.isArray(value) ? value[0] || "" : "";
}

function sanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
  if (!projectId || !token) return null;
  return createClient({ projectId, dataset, apiVersion: API_VERSION, token, useCdn: false });
}

function clientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0]?.trim() || "";
  return req.socket?.remoteAddress || "";
}

function isPrefetch(ua: string): boolean {
  return /googleimageproxy|ggpht|applemail|apple mail|preload/i.test(ua);
}

function eventId(): number {
  // Inteiro seguro e praticamente único; o cursor real da sincronização usa _createdAt + _id.
  return Date.now() * 1000 + randomBytes(2).readUInt16BE(0) % 1000;
}

function safeText(value: unknown, max = 500): string {
  return String(value ?? "").slice(0, max);
}

export async function persistTrackingEvent(
  type: TrackingEventType,
  payload: TrackingPayload,
  req: VercelRequest,
  destination = "",
): Promise<void> {
  const client = sanityClient();
  if (!client) throw new Error("sanity_not_configured");
  const ua = safeText(req.headers["user-agent"], 600);
  const now = new Date().toISOString();
  await client.create({
    _type: "emailTrackingEvent",
    eventId: eventId(),
    eventType: type,
    trackId: safeText(payload.sid, 100),
    email: safeText(payload.email, 320).toLowerCase(),
    campaignId: Number.isFinite(Number(payload.cid)) ? Number(payload.cid) : null,
    etapa: safeText(payload.etapa, 40),
    destination: safeText(destination, 2000),
    occurredAt: now,
    userAgent: ua,
    country: safeText(req.headers["x-vercel-ip-country"], 8),
    ipHash: clientIp(req)
      ? createHmac("sha256", process.env.TRACKING_SECRET || "").update(clientIp(req)).digest("hex")
      : "",
    prefetch: type === "open" && isPrefetch(ua),
  });
}

export function safeDestination(value: unknown): string {
  const raw = typeof value === "string" ? value : "";
  try {
    const url = new URL(raw);
    return ["https:", "http:", "mailto:"].includes(url.protocol) ? raw : "";
  } catch {
    return "";
  }
}

export function contactGoal(destination: string): "contact_whatsapp" | "contact_email" | null {
  const value = destination.toLowerCase();
  if (
    value.includes("wa.me/551126844724") ||
    value.includes("whatsapp.com")
  ) return "contact_whatsapp";
  if (value.startsWith("mailto:comercial@4unik.com.br")) return "contact_email";
  return null;
}

export async function sendGa4ContactGoal(
  eventName: "contact_whatsapp" | "contact_email",
  payload: TrackingPayload,
): Promise<void> {
  const measurementId = process.env.GA4_MEASUREMENT_ID?.trim();
  const apiSecret = process.env.GA4_MP_API_SECRET?.trim();
  if (!measurementId || !apiSecret) return;
  const campaign = safeText(payload.cid, 40);
  const response = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}` +
      `&api_secret=${encodeURIComponent(apiSecret)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: `4unik-mail.${safeText(payload.sid, 80) || "anonymous"}`,
        events: [{
          name: eventName,
          params: {
            contact_method: eventName === "contact_whatsapp" ? "whatsapp" : "email",
            campaign_id: Number(payload.cid) || 0,
            campaign_slug: campaign,
            utm_source: "4unik-mail",
            utm_medium: "email",
            utm_campaign: campaign,
            etapa: safeText(payload.etapa, 40),
            page_location: `https://plataforma.4unik.com.br/landing/?utm_source=4unik-mail&utm_medium=email&utm_campaign=${encodeURIComponent(campaign)}`,
            page_title: "Contato comercial via campanha de e-mail",
            engagement_time_msec: 1,
          },
        }],
      }),
    },
  );
  if (!response.ok) throw new Error(`ga4_mp_${response.status}`);
}

export type EventCursor = { createdAt: string; id: string };

export function decodeCursor(raw: string): EventCursor {
  if (!raw) return { createdAt: "1970-01-01T00:00:00.000Z", id: "" };
  try {
    const value = JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as EventCursor;
    return value.createdAt && typeof value.id === "string"
      ? value
      : { createdAt: "1970-01-01T00:00:00.000Z", id: "" };
  } catch {
    return { createdAt: "1970-01-01T00:00:00.000Z", id: "" };
  }
}

export function encodeCursor(cursor: EventCursor): string {
  return Buffer.from(JSON.stringify(cursor), "utf8").toString("base64url");
}

export async function readTrackingEvents(cursor: EventCursor, limit: number) {
  const client = sanityClient();
  if (!client) throw new Error("sanity_not_configured");
  return client.fetch<Array<Record<string, unknown>>>(
    `*[_type == "emailTrackingEvent" && (_createdAt > $createdAt || ` +
      `(_createdAt == $createdAt && _id > $id))] | order(_createdAt asc, _id asc)[0...$limit]{` +
      `_id,_createdAt,eventId,eventType,trackId,email,campaignId,etapa,destination,occurredAt,userAgent,country,prefetch}`,
    { createdAt: cursor.createdAt, id: cursor.id, limit },
  );
}
