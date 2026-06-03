import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/basePath";

/**
 * Mantemos `basePath` também em desenvolvimento para espelhar as URLs finais do
 * URLs finais do host (ex.: plataforma.4unik.com.br na raiz ou subpath via NEXT_PUBLIC_SITE_URL).
 *
 * Apenas `output: "export"` continua restrito à produção para não limitar a
 * navegação dinâmica do Studio durante o desenvolvimento.
 */
const dev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  ...(dev ? {} : { output: "export" }),
  /** Expõe ao bundle do Studio (cliente) a URL opcional do gerador Nano Banana. */
  env: {
    SANITY_STUDIO_NANO_BANANA_URL: process.env.SANITY_STUDIO_NANO_BANANA_URL ?? "",
  },
  basePath: BASE_PATH,
  /** Em dev, só `basePath` — `assetPrefix` duplicado quebra o HMR de CSS no Turbopack. */
  assetPrefix: dev ? undefined : BASE_PATH || undefined,
  ...(dev && BASE_PATH
    ? {
        async redirects() {
          return [
            {
              source: "/",
              destination: `${BASE_PATH}/`,
              permanent: false,
              basePath: false,
            },
          ];
        },
      }
    : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
