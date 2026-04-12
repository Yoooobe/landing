/**
 * Reduz raster gerado por IA antes do upload para o Sanity, evitando 502/timeouts
 * em imagens PNG muito pesadas (API upstream).
 */
/** Imagens da API Gemini costumam ultrapassar isto; uploads grandes falham com 502 no gateway Sanity. */
const MAX_BYTES_BEFORE_SHRINK = 450_000;
const MAX_LONG_EDGE = 2048;
const JPEG_QUALITY = 0.88;

export async function shrinkImageBlobForUpload(blob: Blob): Promise<Blob> {
  if (blob.size <= MAX_BYTES_BEFORE_SHRINK) {
    return blob;
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(blob);
  } catch {
    return blob;
  }

  try {
    let w = bitmap.width;
    let h = bitmap.height;
    const longEdge = Math.max(w, h);
    if (longEdge > MAX_LONG_EDGE) {
      const scale = MAX_LONG_EDGE / longEdge;
      w = Math.round(w * scale);
      h = Math.round(h * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return blob;
    ctx.drawImage(bitmap, 0, 0, w, h);

    const out = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), "image/jpeg", JPEG_QUALITY);
    });
    return out && out.size < blob.size ? out : blob;
  } finally {
    bitmap.close();
  }
}
