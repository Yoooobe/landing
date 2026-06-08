import type { VercelRequest, VercelResponse } from "@vercel/node";
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

const DEFAULT_ORIGINS = [
  "https://plataforma.4unik.com.br",
  "https://yoooobe.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

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

function formatLeadEmail(payload: z.infer<typeof leadPayloadSchema>): string {
  const lines = [
    `Nome: ${payload.name}`,
    `Email: ${payload.email}`,
    `Empresa: ${payload.company}`,
    `Telefone: ${payload.phone || "—"}`,
    `Idioma: ${payload.locale}`,
    `Origem (source): ${payload.source}`,
    "",
    payload.message ? `Mensagem:\n${payload.message}` : "Mensagem: —",
  ];
  return lines.join("\n");
}

async function sendViaPostmark(payload: z.infer<typeof leadPayloadSchema>): Promise<void> {
  const token = process.env.POSTMARK_SERVER_TOKEN?.trim();
  const to = process.env.LEADS_NOTIFY_EMAIL?.trim();
  const from = process.env.LEADS_FROM_EMAIL?.trim() || "leads@4unik.com.br";
  if (!token || !to) {
    throw new Error("postmark_not_configured");
  }

  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify({
      From: from,
      To: to,
      Subject: `[4unik landing] ${payload.source} — ${payload.company}`,
      TextBody: formatLeadEmail(payload),
      ReplyTo: payload.email,
      MessageStream: "outbound",
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`postmark_failed:${res.status}:${detail.slice(0, 200)}`);
  }
}

async function forwardWebhook(payload: z.infer<typeof leadPayloadSchema>): Promise<void> {
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

  const hasPostmark = Boolean(
    process.env.POSTMARK_SERVER_TOKEN?.trim() && process.env.LEADS_NOTIFY_EMAIL?.trim(),
  );
  const hasWebhook = Boolean(process.env.LEADS_WEBHOOK_URL?.trim());
  if (!hasPostmark && !hasWebhook) {
    return res.status(503).json({
      ok: false,
      error: "not_configured",
      hint: "Set POSTMARK_SERVER_TOKEN + LEADS_NOTIFY_EMAIL or LEADS_WEBHOOK_URL on Vercel",
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
    if (hasPostmark) {
      await sendViaPostmark(parsed.data);
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "delivery_failed";
    console.error("[leads-ingest]", message);
    return res.status(502).json({ ok: false, error: "delivery_failed" });
  }
}
