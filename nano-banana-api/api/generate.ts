import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI, Modality, type GenerateContentResponse } from "@google/genai";

/**
 * Native image generation via Gemini API (@google/genai).
 * @see https://ai.google.dev/gemini-api/docs/image-generation
 * @see https://github.com/googleapis/js-genai/blob/main/codegen_instructions.md (gemini-2.5-flash-image)
 */
const IMAGE_MODEL = "gemini-2.5-flash-image";

/** Supported by ImageConfig.aspectRatio (Gemini generateContent). */
export const NANO_BANANA_ASPECT_RATIOS = [
  "1:1",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "4:5",
  "5:4",
  "9:16",
  "16:9",
  "21:9",
] as const;

export type NanoBananaAspectRatio = (typeof NANO_BANANA_ASPECT_RATIOS)[number];

/** Origins allowed to call this API from the browser (Sanity Studio). */
const DEFAULT_ORIGINS = [
  "https://yoooobe.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

/** Best-effort rate limit per IP (per serverless instance). */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 60;
const rateBuckets = new Map<string, { count: number; reset: number }>();

function getClientIp(req: VercelRequest): string {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.trim()) {
    return xf.split(",")[0]?.trim() ?? "unknown";
  }
  return (req.socket?.remoteAddress as string | undefined) ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  let b = rateBuckets.get(ip);
  if (!b || now > b.reset) {
    b = { count: 0, reset: now + RATE_WINDOW_MS };
    rateBuckets.set(ip, b);
  }
  b.count += 1;
  return b.count > RATE_MAX;
}

function getGeminiApiKey(): string | undefined {
  return process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim();
}

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
}

export type GenerateBody = {
  prompt?: string;
  /** Optional; must be one of NANO_BANANA_ASPECT_RATIOS when set. */
  aspectRatio?: string;
  /** Optional style hints (appended to the prompt server-side). */
  style?: string;
};

function parseBody(req: VercelRequest): GenerateBody {
  const b = req.body;
  if (b == null) return {};
  if (typeof b === "string") {
    try {
      return JSON.parse(b) as GenerateBody;
    } catch {
      return {};
    }
  }
  return b as GenerateBody;
}

function normalizeAspectRatio(raw: string | undefined): NanoBananaAspectRatio | undefined {
  if (!raw || typeof raw !== "string") return undefined;
  const v = raw.trim() as NanoBananaAspectRatio;
  return (NANO_BANANA_ASPECT_RATIOS as readonly string[]).includes(v) ? v : undefined;
}

function buildContents(prompt: string, style: string | undefined): string {
  const base = prompt.trim().slice(0, 32_000);
  if (!style?.trim()) return base;
  return `${base}\n\nStyle / visual hints: ${style.trim().slice(0, 2000)}`;
}

function extractImageFromResponse(response: GenerateContentResponse): {
  imageBase64: string;
  mimeType: string;
} | null {
  const parts = response.candidates?.[0]?.content?.parts;
  if (parts) {
    for (const part of parts) {
      const data = part.inlineData?.data;
      if (data) {
        return {
          imageBase64: data,
          mimeType: part.inlineData?.mimeType ?? "image/png",
        };
      }
    }
  }

  const fallback = response.data;
  if (fallback) {
    return { imageBase64: fallback, mimeType: "image/png" };
  }

  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    res.status(200).json({
      service: "nano-banana-api",
      usage:
        'POST JSON { "prompt": string, "aspectRatio"?: string, "style"?: string } with Content-Type: application/json',
      aspectRatios: [...NANO_BANANA_ASPECT_RATIOS],
      hint:
        "If SANITY_STUDIO_NANO_BANANA_URL is only the domain, add /api/generate — or rely on rewrites from / and /api.",
    });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({
      error: "Too many requests",
      detail: "Rate limit exceeded; try again in a minute.",
    });
    return;
  }

  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    res.status(503).json({
      error: "Server misconfiguration",
      detail: "Set GEMINI_API_KEY or GOOGLE_API_KEY (Gemini API / Google AI Studio)",
    });
    return;
  }

  const body = parseBody(req);
  const { prompt, style } = body;
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    res.status(400).json({ error: "Missing prompt" });
    return;
  }

  const aspectRatio = normalizeAspectRatio(body.aspectRatio);
  if (body.aspectRatio != null && body.aspectRatio !== "" && !aspectRatio) {
    res.status(400).json({
      error: "Invalid aspectRatio",
      detail: `Use one of: ${NANO_BANANA_ASPECT_RATIOS.join(", ")}`,
    });
    return;
  }

  const contents = buildContents(prompt, typeof style === "string" ? style : undefined);
  const ai = new GoogleGenAI({ apiKey });

  try {
    const geminiResponse = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents,
      config: {
        responseModalities: [Modality.IMAGE],
        ...(aspectRatio ? { imageConfig: { aspectRatio } } : {}),
      },
    });

    const blockReason = geminiResponse.promptFeedback?.blockReason;
    if (blockReason) {
      res.status(400).json({
        error: "Prompt blocked",
        detail: geminiResponse.promptFeedback?.blockReasonMessage ?? String(blockReason),
      });
      return;
    }

    const extracted = extractImageFromResponse(geminiResponse);
    if (!extracted) {
      const hint =
        geminiResponse.text?.slice(0, 500) ??
        geminiResponse.candidates?.[0]?.finishReason ??
        "empty";
      res.status(502).json({
        error: "No image in Gemini response",
        detail: typeof hint === "string" ? hint : String(hint),
      });
      return;
    }

    /** Matches option B in `landing/src/sanity/assetSources/nanoBananaImageSource.tsx` */
    res.status(200).json({
      mimeType: extracted.mimeType,
      imageBase64: extracted.imageBase64,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    res.status(502).json({
      error: "Gemini request failed",
      detail: msg.slice(0, 800),
    });
  }
}
