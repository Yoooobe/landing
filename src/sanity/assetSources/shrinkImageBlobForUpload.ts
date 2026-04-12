/**
 * Prepara raster para `client.assets.upload`: JPEG com resolução limitada.
 * Evita 502 / "invalid response from upstream" com PNGs densos do Gemini
 * (tamanho de ficheiro não correlaciona sempre com píxeis).
 */

const SKIP_BELOW_BYTES = 80_000;
const FIRST_MAX_EDGE = 1920;
const FIRST_JPEG_QUALITY = 0.85;
const TARGET_MAX_BYTES = 500_000;
const SECOND_MAX_EDGE = 1280;
const SECOND_JPEG_QUALITY = 0.72;

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
    let out = await drawToJpegBlob(bitmap, FIRST_MAX_EDGE, FIRST_JPEG_QUALITY);
    if (out && out.size > TARGET_MAX_BYTES) {
      const second = await drawToJpegBlob(bitmap, SECOND_MAX_EDGE, SECOND_JPEG_QUALITY);
      if (second) out = second;
    }

    if (out && out.size > 0) {
      return out;
    }
    return blob;
  } finally {
    bitmap.close();
  }
}
