// Auditoria de marca em imagens (OCR nativo do macOS, framework Vision).
// uso: osascript -l JavaScript scripts/ocr-images.js /caminho/abs/img1.webp [...] | grep -i 4unik
// Toda imagem nova em public/ deve passar aqui antes de entrar no site; se tiver 4unik, adicionar a config/blocked-images.json.
ObjC.import('Vision'); ObjC.import('AppKit'); ObjC.import('Foundation');
function run(argv) {
  const out = [];
  for (const path of argv) {
    const img = $.NSImage.alloc.initWithContentsOfFile(path);
    if (!img || img.isNil()) { out.push(JSON.stringify({file: path, error: 'load'})); continue; }
    const rep = $.NSBitmapImageRep.imageRepWithData(img.TIFFRepresentation);
    const cg = rep.CGImage;
    const W = $.CGImageGetWidth(cg), H = $.CGImageGetHeight(cg);
    const req = $.VNRecognizeTextRequest.alloc.init;
    req.recognitionLevel = 0; req.usesLanguageCorrection = false;
    const handler = $.VNImageRequestHandler.alloc.initWithCGImageOptions(cg, $.NSDictionary.dictionary);
    handler.performRequestsError($.NSArray.arrayWithObject(req), null);
    const res = req.results; const boxes = [];
    for (let i = 0; i < res.count; i++) {
      const obs = res.objectAtIndex(i); const cand = obs.topCandidates(1).objectAtIndex(0);
      const bb = obs.boundingBox;
      boxes.push({text: cand.string.js, x: bb.origin.x * W, y: (1 - bb.origin.y - bb.size.height) * H, w: bb.size.width * W, h: bb.size.height * H});
    }
    out.push(JSON.stringify({file: path, w: W, h: H, boxes}));
  }
  return out.join('\n');
}
