#!/usr/bin/env node
/**
 * Importa screenshots categorizados do zip 4unik_dashboard_screenshots_categorized:
 * PNG → WebP (máx. 1600px) em public/screens/dash|flows
 * GIF → webm/mp4 (+ poster) via ffmpeg; fallback WebP animado se ffmpeg falhar.
 *
 * Uso:
 *   npm run import:dash-screens
 *   npm run import:dash-screens -- /caminho/para/4unik_dashboard_screenshots_categorized.zip
 */
import { execFileSync } from "child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "fs";
import { tmpdir } from "os";
import { basename, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const defaultZip = join(
  process.env.HOME || "",
  "Downloads",
  "4unik_dashboard_screenshots_categorized.zip",
);

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;

/** Mapa: pasta no zip → pasta destino relativa a public/screens + rename */
const MAP = [
  {
    folder: "01_telas_principais_dashboard",
    outDir: "dash",
    renames: {
      "01_dashboard_geral.png": "dashboard-geral.webp",
      "02_produtos.png": "produtos.webp",
      "03_tipos_opcoes.png": "tipos-opcoes.webp",
      "04_pedidos.png": "pedidos.webp",
      "05_envios.png": "envios.webp",
      "06_metodos_envio.png": "metodos-envio.webp",
      "07_usuarios.png": "usuarios.webp",
      "08_tags.png": "tags.webp",
      "09_campanhas_landing_pages.png": "campanhas-landing-pages.webp",
      "10_brindes_presentes.png": "brindes-presentes.webp",
      "11_cupons.png": "cupons.webp",
      "12_empresas.png": "empresas.webp",
    },
  },
  {
    folder: "02_telas_internas_e_detalhes",
    outDir: "dash/detail",
    renames: {
      "detalhes_do_pedido.png": "detalhes-do-pedido.webp",
      "editar_usuario.png": "editar-usuario.webp",
      "editar_campanha_lp37.png": "editar-campanha.webp",
      "editar_brinde.png": "editar-brinde.webp",
      "editar_cupom.png": "editar-cupom.webp",
      "area_cliente_pedidos_loja.png": "area-cliente-pedidos-loja.webp",
    },
  },
  {
    folder: "03_passo_a_passo_nova_campanha",
    outDir: "flows",
    renames: {
      "passo_1_dados_iniciais_slug.png": "campanha-passo-1.webp",
      "passo_2_mensagem_boas_vindas.png": "campanha-passo-2.webp",
      "passo_3_selecao_empresa_produtos.png": "campanha-passo-3.webp",
      "passo_4_configuracoes_finais.png": "campanha-passo-4.webp",
    },
  },
  {
    folder: "04_passo_a_passo_novo_brinde",
    outDir: "flows",
    renames: {
      "passo_1_selecao_empresa_nome_notas.png": "brinde-passo-1.webp",
      "passo_2_selecao_produto.png": "brinde-passo-2.webp",
      "passo_3_selecao_destinatario.png": "brinde-passo-3.webp",
      "passo_4_metodo_envio_finalizacao.png": "brinde-passo-4.webp",
    },
  },
];

const GIF_MAP = [
  {
    src: "05_animacoes_e_fluxos_completos/fluxo_completo_criacao_campanha.gif",
    base: "fluxo-campanha",
  },
  {
    src: "05_animacoes_e_fluxos_completos/fluxo_completo_criacao_brinde.gif",
    base: "fluxo-brinde",
  },
];

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function hasFfmpeg() {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function extractZip(zipPath, destDir) {
  execFileSync("unzip", ["-o", "-q", zipPath, "-d", destDir], { stdio: "inherit" });
}

function findExtractedRoot(destDir) {
  const entries = readdirSync(destDir);
  const dashFolder = entries.find((e) => e === "01_telas_principais_dashboard");
  if (dashFolder) return destDir;
  for (const e of entries) {
    const full = join(destDir, e);
    if (statSync(full).isDirectory() && existsSync(join(full, "01_telas_principais_dashboard"))) {
      return full;
    }
  }
  return destDir;
}

async function convertPngToWebp(sharp, srcPath, outPath) {
  await sharp(readFileSync(srcPath))
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outPath);
}

async function extractPoster(sharp, gifPath, posterPath) {
  await sharp(readFileSync(gifPath), { animated: false, pages: 1 })
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(posterPath);
}

function convertGifWithFfmpeg(gifPath, outBase) {
  const webm = `${outBase}.webm`;
  const mp4 = `${outBase}.mp4`;
  // GIFs são bgra: remover alpha e forçar yuv420p (vp9/h264)
  const vf = "scale='min(1280,iw)':-2:flags=lanczos,format=yuv420p";
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      gifPath,
      "-vf",
      vf,
      "-c:v",
      "libvpx-vp9",
      "-b:v",
      "0",
      "-crf",
      "32",
      "-an",
      webm,
    ],
    { stdio: "inherit" },
  );
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      gifPath,
      "-vf",
      vf,
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-an",
      mp4,
    ],
    { stdio: "inherit" },
  );
  return { webm, mp4 };
}

async function convertGifFallbackWebp(sharp, gifPath, outPath) {
  await sharp(readFileSync(gifPath), { animated: true })
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 70, effort: 4 })
    .toFile(outPath);
}

async function main() {
  const zipPath = process.argv[2] || defaultZip;
  if (!existsSync(zipPath)) {
    console.error(`import-dashboard-screens: zip não encontrado: ${zipPath}`);
    process.exit(1);
  }

  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("import-dashboard-screens: instale sharp (npm install sharp --save-dev)");
    process.exit(1);
  }

  const tmp = mkdtempSync(join(tmpdir(), "4unik-dash-screens-"));
  console.log(`import-dashboard-screens: extraindo ${basename(zipPath)} → ${tmp}`);
  try {
    extractZip(zipPath, tmp);
    const extractedRoot = findExtractedRoot(tmp);
    const screensRoot = join(root, "public", "screens");
    let converted = 0;

    for (const group of MAP) {
      const srcDir = join(extractedRoot, group.folder);
      if (!existsSync(srcDir)) {
        console.warn(`import-dashboard-screens: pasta ausente: ${group.folder}`);
        continue;
      }
      const outDir = join(screensRoot, group.outDir);
      ensureDir(outDir);
      for (const [srcName, outName] of Object.entries(group.renames)) {
        const srcPath = join(srcDir, srcName);
        if (!existsSync(srcPath)) {
          console.warn(`import-dashboard-screens: ficheiro ausente: ${group.folder}/${srcName}`);
          continue;
        }
        const outPath = join(outDir, outName);
        await convertPngToWebp(sharp, srcPath, outPath);
        converted += 1;
        console.log(`import-dashboard-screens: ${group.outDir}/${outName}`);
      }
    }

    const flowsDir = join(screensRoot, "flows");
    ensureDir(flowsDir);
    const ffmpegOk = hasFfmpeg();

    for (const gif of GIF_MAP) {
      const gifPath = join(extractedRoot, gif.src);
      if (!existsSync(gifPath)) {
        console.warn(`import-dashboard-screens: GIF ausente: ${gif.src}`);
        continue;
      }
      const posterPath = join(flowsDir, `${gif.base}-poster.webp`);
      await extractPoster(sharp, gifPath, posterPath);
      converted += 1;
      console.log(`import-dashboard-screens: flows/${gif.base}-poster.webp`);

      const outBase = join(flowsDir, gif.base);
      if (ffmpegOk) {
        try {
          convertGifWithFfmpeg(gifPath, outBase);
          console.log(`import-dashboard-screens: flows/${gif.base}.webm + .mp4`);
          converted += 2;
        } catch (err) {
          console.warn(`import-dashboard-screens: ffmpeg falhou (${gif.base}), fallback WebP animado`);
          console.warn(err instanceof Error ? err.message : String(err));
          await convertGifFallbackWebp(sharp, gifPath, `${outBase}.webp`);
          converted += 1;
          console.log(`import-dashboard-screens: flows/${gif.base}.webp`);
        }
      } else {
        console.warn("import-dashboard-screens: ffmpeg não encontrado — WebP animado");
        await convertGifFallbackWebp(sharp, gifPath, `${outBase}.webp`);
        converted += 1;
        console.log(`import-dashboard-screens: flows/${gif.base}.webp`);
      }
    }

    // Manifest for consumers / docs
    const manifest = {
      generatedAt: new Date().toISOString(),
      zip: basename(zipPath),
      paths: {
        dash: "/screens/dash/",
        dashDetail: "/screens/dash/detail/",
        flows: "/screens/flows/",
      },
    };
    writeFileSync(join(screensRoot, "dash", "manifest.json"), JSON.stringify(manifest, null, 2));
    console.log(`import-dashboard-screens: ${converted} ficheiros gerados.`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
