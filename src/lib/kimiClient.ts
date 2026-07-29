import fs from "node:fs";
import path from "node:path";

function loadEnvKey(): string {
  if (process.env.KIMI_API_KEY?.trim()) {
    return process.env.KIMI_API_KEY.trim();
  }
  try {
    const envPath = path.resolve(process.cwd(), ".env.blog-agent");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      for (const line of content.split("\n")) {
        if (line.startsWith("KIMI_API_KEY=")) {
          let val = line.replace("KIMI_API_KEY=", "").trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (val) return val;
        }
      }
    }
  } catch {
    // Ignore error
  }
  return "";
}

export type KimiCallParams = {
  systemPrompt: string;
  userPrompt: string;
  model?: "k3" | "k3-256k";
  maxTokens?: number;
};

/**
 * Motor centralizado para chamadas à API do Kimi K3 no projeto /landing.
 * Exige `temperature: 1` nos modelos K3 de raciocínio.
 */
export async function callKimiApi({
  systemPrompt,
  userPrompt,
  model = "k3",
  maxTokens = 5000,
}: KimiCallParams): Promise<string> {
  const apiKey = loadEnvKey();
  if (!apiKey) {
    throw new Error("KIMI_API_KEY não encontrada em process.env nem em .env.blog-agent.");
  }

  const response = await fetch("https://api.kimi.com/coding/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 1,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Kimi API Error (${response.status}): ${errText}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

/**
 * Garante o retorno de um objeto JSON válido gerado pelo Kimi K3.
 */
export async function callKimiJson<T = Record<string, unknown>>(
  params: KimiCallParams
): Promise<T> {
  const raw = await callKimiApi(params);
  const cleanJson = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  return JSON.parse(cleanJson) as T;
}
