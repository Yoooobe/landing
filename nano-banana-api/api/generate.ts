import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI, Modality, type GenerateContentResponse } from "@google/genai";

/**
 * Native image generation via Gemini API (@google/genai).
 * @see https://ai.google.dev/gemini-api/docs/image-generation
 * @see https://github.com/googleapis/js-genai/blob/main/codegen_instructions.md (gemini-2.5-flash-image)
 */
const IMAGE_MODEL = "gemini-2.5-flash-image";

/** Origins allowed to call this API from the browser (Sanity Studio). */
const DEFAULT_ORIGINS = [
  "https://yoooobe.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

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

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
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

  const { prompt } = parseBody(req);
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    res.status(400).json({ error: "Missing prompt" });
    return;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const geminiResponse = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: prompt.trim().slice(0, 32_000),
      config: {
        responseModalities: [Modality.IMAGE],
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
