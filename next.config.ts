import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/basePath";

/**
 * Mantemos `basePath` também em desenvolvimento para espelhar as URLs finais do
 * GitHub Pages e evitar drift entre `/landing/*` local e produção.
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
  assetPrefix: BASE_PATH,
  ...(dev
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
