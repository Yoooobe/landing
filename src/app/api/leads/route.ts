import { parseLeadPayloadJson } from "@/lib/leadPayload";
import { NextResponse } from "next/server";

/**
 * Endpoint opcional para desenvolvimento quando `NEXT_PUBLIC_LEADS_INGEST_URL` não está definido.
 * Não é incluído em `output: "export"` (GitHub Pages); use um webhook externo em produção.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseLeadPayloadJson(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[leads] dev capture", {
      ...parsed.data,
      phone: parsed.data.phone || undefined,
      message: parsed.data.message || undefined,
    });
  }

  return NextResponse.json({ ok: true });
}
