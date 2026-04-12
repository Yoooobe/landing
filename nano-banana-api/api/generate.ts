import type { VercelRequest, VercelResponse } from "@vercel/node";

/** Origins allowed to call this API from the browser (Sanity Studio). */
const DEFAULT_ORIGINS = [
  "https://yoooobe.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

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

function parseBody(req: VercelRequest): { prompt?: string } {
  const b = req.body;
  if (b == null) return {};
  if (typeof b === "string") {
    try {
      return JSON.parse(b) as { prompt?: string };
    } catch {
      return {};
    }
  }
  return b as { prompt?: string };
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    res.status(503).json({
      error: "Server misconfiguration",
      detail: "OPENAI_API_KEY is not set on this deployment",
    });
    return;
  }

  const { prompt } = parseBody(req);
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    res.status(400).json({ error: "Missing prompt" });
    return;
  }

  const openaiRes = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: prompt.trim().slice(0, 4000),
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    }),
  });

  if (!openaiRes.ok) {
    const errText = await openaiRes.text();
    res.status(502).json({
      error: "OpenAI request failed",
      status: openaiRes.status,
      detail: errText.slice(0, 800),
    });
    return;
  }

  const data = (await openaiRes.json()) as {
    data?: Array<{ b64_json?: string }>;
  };
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) {
    res.status(502).json({ error: "No image in OpenAI response" });
    return;
  }

  /** Matches option B in `landing/src/sanity/assetSources/nanoBananaImageSource.tsx` */
  res.status(200).json({
    mimeType: "image/png",
    imageBase64: b64,
  });
}
