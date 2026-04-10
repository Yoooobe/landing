import Link from "next/link";

import { withBasePath } from "@/lib/basePath";
import { SITE_URL } from "@/lib/site";

/**
 * CORS é configurado no projeto Sanity (não no Next.js).
 * Origins permitidos: https://www.sanity.io/docs/apis-and-cors
 */
export default function StudioCorsErrorFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="max-w-xl text-center">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          CORS — origem não autorizada no Sanity
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300">
          O browser bloqueia pedidos à API do Sanity até o teu domínio de desenvolvimento (ou produção)
          estar na lista de <strong className="text-zinc-100">CORS origins</strong> do projeto.
        </p>
        <ol className="mt-6 list-decimal space-y-3 pl-5 text-left text-sm text-zinc-300">
          <li>
            Abre{" "}
            <a
              className="text-amber-400 underline underline-offset-2 hover:text-amber-300"
              href="https://www.sanity.io/manage"
              rel="noopener noreferrer"
              target="_blank"
            >
              sanity.io/manage
            </a>{" "}
            → o teu projeto → <strong>API</strong> → <strong>CORS origins</strong>.
          </li>
          <li>
            Adiciona estas origens (sem path no fim):
            <ul className="mt-2 list-disc space-y-1 pl-5 font-mono text-xs text-amber-200/90">
              <li>http://localhost:3000</li>
              <li>http://127.0.0.1:3000</li>
              <li>{new URL(SITE_URL).origin}</li>
            </ul>
          </li>
          <li>
            Ou na raiz do repo (com Sanity CLI e login):{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-amber-200">
              npm run sanity:cors
            </code>
          </li>
        </ol>
        <p className="mt-6 text-xs text-zinc-500">
          Depois de guardar no Sanity, recarrega esta página (Ctrl+Shift+R).
        </p>
        <p className="mt-4 text-xs leading-relaxed text-zinc-500">
          Se o erro mencionar <code className="text-zinc-400">your-project-id.api.sanity.io</code> ou falha de rede
          em produção (GitHub Pages): define os secrets{" "}
          <code className="text-zinc-400">NEXT_PUBLIC_SANITY_PROJECT_ID</code> e{" "}
          <code className="text-zinc-400">NEXT_PUBLIC_SANITY_DATASET</code> no repositório GitHub (Actions) e
          volta a fazer deploy — o ID tem de ser o do projeto em sanity.io/manage, não texto de exemplo.
        </p>
      </div>
      <Link
        className="rounded-full bg-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-100 transition hover:bg-zinc-700"
        href={withBasePath("/")}
      >
        Voltar à landing
      </Link>
    </div>
  );
}
