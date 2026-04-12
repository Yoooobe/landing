/**
 * Prepara raster para `client.assets.upload`: JPEG com resolução limitada.
 * Evita 502 / "invalid response from upstream" com PNGs densos do Gemini
 * (tamanho de ficheiro não correlaciona sempre com píxeis).
 */

const SKIP_BELOW_BYTES = 80_000;
const TARGET_MAX_BYTES = 500_000;

/** Passos sucessivos até ficar abaixo do alvo ou ficar o menor JPEG possível (evita 502 com ficheiros > ~500KB). */
const JPEG_PASSES: readonly { maxEdge: number; quality: number }[] = [
  { maxEdge: 1920, quality: 0.85 },
  { maxEdge: 1280, quality: 0.72 },
  { maxEdge: 1024, quality: 0.65 },
  { maxEdge: 768, quality: 0.58 },
  { maxEdge: 640, quality: 0.52 },
  { maxEdge: 512, quality: 0.48 },
];

function drawToJpegBlob(
  bitmap: ImageBitmap,
  maxLongEdge: number,
  quality: number,
): Promise<Blob | null> {
  let w = bitmap.width;
  let h = bitmap.height;
  const scale = Math.min(1, maxLongEdge / Math.max(w, h));
  w = Math.round(w * scale);
  h = Math.round(h * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.resolve(null);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bitmap, 0, 0, w, h);

  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b), "image/jpeg", quality);
  });
}

export async function shrinkImageBlobForUpload(blob: Blob): Promise<Blob> {
  if (!blob.type.startsWith("image/")) {
    return blob;
  }
  if (blob.size <= SKIP_BELOW_BYTES) {
    return blob;
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(blob);
  } catch {
    return blob;
  }

  try {
    let best: Blob | null = null;

    for (let passIndex = 0; passIndex < JPEG_PASSES.length; passIndex++) {
      const { maxEdge, quality } = JPEG_PASSES[passIndex];
      const out = await drawToJpegBlob(bitmap, maxEdge, quality);

      if (!out || out.size === 0) continue;
      if (!best || out.size < best.size) best = out;
      if (out.size <= TARGET_MAX_BYTES) {
        return out;
      }
    }

    if (best && best.size > 0) {
      return best;
    }
    return blob;
  } finally {
    bitmap.close();
  }
}
