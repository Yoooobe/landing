import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@sanity/client";
import { z } from "zod";

const leadPayloadSchema = z
  .object({
    name: z.string().min(2).max(120),
    email: z.string().email(),
    company: z.string().min(2).max(200),
    phone: z.string().max(40).optional(),
    message: z.string().max(2000).optional(),
    consent: z.boolean(),
    website: z.string().optional(),
    source: z.string().max(80),
    locale: z.enum(["pt", "en"]),
  })
  .refine((data) => data.consent === true, { path: ["consent"] })
  .refine((data) => !data.website?.length, { path: ["website"] });

type LeadPayload = z.infer<typeof leadPayloadSchema>;

const DEFAULT_ORIGINS = [
  "https://plataforma.4unik.com.br",
  "https://yoooobe.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const DEFAULT_DEMO_URL = "https://calendly.com/yoobeco/demo";
const DEFAULT_SITE_URL = "https://plataforma.4unik.com.br/landing/";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;
const rateBuckets = new Map<string, { count: number; reset: number }>();

function getAllowedOrigins(): string[] {
  const raw = process.env.ALLOWED_ORIGINS?.trim();
  if (!raw) return DEFAULT_ORIGINS;
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

function setCors(req: VercelRequest, res: VercelResponse): void {
  const allowed = getAllowedOrigins();
  const origin = req.headers.origin as string | undefined;
  const value = origin && allowed.includes(origin) ? origin : allowed[0] ?? "*";
  res.setHeader("Access-Control-Allow-Origin", value);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
}

function getClientIp(req: VercelRequest): string {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.trim()) {
    return xf.split(",")[0]?.trim() ?? "unknown";
  }
  return (req.socket?.remoteAddress as string | undefined) ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  let bucket = rateBuckets.get(ip);
  if (!bucket || now > bucket.reset) {
    bucket = { count: 0, reset: now + RATE_WINDOW_MS };
    rateBuckets.set(ip, bucket);
  }
  bucket.count += 1;
  return bucket.count > RATE_MAX;
}

function getPostmarkToken(): string | undefined {
  return process.env.POSTMARK_SERVER_TOKEN?.trim();
}

function messagePreview(message?: string): string | undefined {
  const trimmed = message?.trim();
  if (!trimmed) return undefined;
  return trimmed.length > 280 ? `${trimmed.slice(0, 277)}…` : trimmed;
}

function formatInternalEmail(payload: LeadPayload): string {
  return [
    `Nome: ${payload.name}`,
    `Email: ${payload.email}`,
    `Empresa: ${payload.company}`,
    `Telefone: ${payload.phone || "—"}`,
    `Idioma: ${payload.locale}`,
    `Origem (source): ${payload.source}`,
    "",
    payload.message ? `Mensagem:\n${payload.message}` : "Mensagem: —",
  ].join("\n");
}

async function postmarkRequest(
  path: string,
  body: Record<string, unknown>,
): Promise<{ MessageID?: string }> {
  const token = getPostmarkToken();
  if (!token) throw new Error("postmark_not_configured");

  const res = await fetch(`https://api.postmarkapp.com${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify(body),
  });

  const text = await res.text().catch(() => "");
  if (!res.ok) {
    throw new Error(`postmark_failed:${res.status}:${text.slice(0, 300)}`);
  }

  try {
    return JSON.parse(text) as { MessageID?: string };
  } catch {
    return {};
  }
}

async function sendInternalNotification(payload: LeadPayload): Promise<string | undefined> {
  const to = process.env.LEADS_NOTIFY_EMAIL?.trim() || "comercial@4unik.com.br";
  const from = process.env.LEADS_FROM_EMAIL?.trim() || "leads@4unik.com.br";

  const result = await postmarkRequest("/email", {
    From: from,
    To: to,
    Subject: `[4unik landing] ${payload.source} — ${payload.company}`,
    TextBody: formatInternalEmail(payload),
    ReplyTo: payload.email,
    MessageStream: "outbound",
  });
  return result.MessageID;
}

async function sendAutoReply(payload: LeadPayload): Promise<string | undefined> {
  const templateId = Number(process.env.POSTMARK_TEMPLATE_ID?.trim() || "45224995");
  const from = process.env.LEADS_FROM_EMAIL?.trim() || "leads@4unik.com.br";
  const demoUrl = process.env.LEADS_DEMO_URL?.trim() || DEFAULT_DEMO_URL;
  const siteUrl = process.env.LEADS_SITE_URL?.trim() || DEFAULT_SITE_URL;

  const preview = messagePreview(payload.message);
  const templateModel: Record<string, string> = {
    name: payload.name,
    company: payload.company,
    locale: payload.locale,
    source: payload.source,
    demo_url: demoUrl,
    site_url: siteUrl,
  };
  if (preview) templateModel.message_preview = preview;

  const result = await postmarkRequest("/email/withTemplate", {
    From: from,
    To: payload.email,
    TemplateId: templateId,
    TemplateModel: templateModel,
    ReplyTo: from,
    MessageStream: "outbound",
  });
  return result.MessageID;
}

function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
  if (!projectId || !token) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2024-03-17",
    token,
    useCdn: false,
  });
}

async function persistLeadInSanity(
  payload: LeadPayload,
  ids: { internalId?: string; autoReplyId?: string },
): Promise<string | undefined> {
  const client = getSanityClient();
  if (!client) return undefined;

  const submittedAt = new Date().toISOString();
  const slug = `${Date.now()}-${payload.email.replace(/[^a-z0-9]/gi, "").slice(0, 24)}`.toLowerCase();

  const doc = await client.create({
    _type: "leadSubmission",
    submittedAt,
    name: payload.name,
    email: payload.email,
    company: payload.company,
    phone: payload.phone || "",
    message: payload.message || "",
    source: payload.source,
    locale: payload.locale,
    status: ids.internalId && ids.autoReplyId ? "emailed" : "received",
    postmarkInternalId: ids.internalId || "",
    postmarkAutoReplyId: ids.autoReplyId || "",
    slug: { _type: "slug", current: slug },
  });

  return doc._id;
}

async function forwardWebhook(payload: LeadPayload): Promise<void> {
  const url = process.env.LEADS_WEBHOOK_URL?.trim();
  if (!url) return;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }),
  });
  if (!res.ok) {
    throw new Error(`webhook_failed:${res.status}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ ok: false, error: "rate_limited" });
  }

  const hasPostmark = Boolean(getPostmarkToken());
  const hasWebhook = Boolean(process.env.LEADS_WEBHOOK_URL?.trim());
  if (!hasPostmark && !hasWebhook) {
    return res.status(503).json({
      ok: false,
      error: "not_configured",
      hint: "Set POSTMARK_SERVER_TOKEN (+ LEADS_FROM_EMAIL) or LEADS_WEBHOOK_URL on Vercel",
    });
  }

  const parsed = leadPayloadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({
      ok: false,
      error: "validation",
      issues: parsed.error.flatten(),
    });
  }

  try {
    if (hasWebhook) {
      await forwardWebhook(parsed.data);
    }

    const sanityId = await persistLeadInSanity(parsed.data, {});

    let internalId: string | undefined;
    let autoReplyId: string | undefined;
    const emailErrors: string[] = [];

    if (hasPostmark) {
      try {
        internalId = await sendInternalNotification(parsed.data);
      } catch (err) {
        emailErrors.push(err instanceof Error ? err.message : "internal_email_failed");
      }
      try {
        autoReplyId = await sendAutoReply(parsed.data);
      } catch (err) {
        emailErrors.push(err instanceof Error ? err.message : "auto_reply_failed");
      }

      if (sanityId && (internalId || autoReplyId)) {
        const client = getSanityClient();
        if (client) {
          await client
            .patch(sanityId)
            .set({
              postmarkInternalId: internalId || "",
              postmarkAutoReplyId: autoReplyId || "",
              status: internalId && autoReplyId ? "emailed" : "received",
            })
            .commit()
            .catch(() => undefined);
        }
      }
    }

    if (!sanityId && emailErrors.length > 0 && hasPostmark) {
      console.error("[leads-ingest]", emailErrors.join("; "));
      return res.status(502).json({ ok: false, error: "delivery_failed", details: emailErrors });
    }

    return res.status(200).json({
      ok: true,
      sanityId: sanityId ?? null,
      emailed: Boolean(internalId && autoReplyId),
      emailErrors: emailErrors.length ? emailErrors : undefined,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "delivery_failed";
    console.error("[leads-ingest]", message);
    return res.status(502).json({ ok: false, error: "delivery_failed" });
  }
}
