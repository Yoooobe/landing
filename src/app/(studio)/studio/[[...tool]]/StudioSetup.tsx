import Link from "next/link";

import { withBasePath } from "@/lib/basePath";

/**
 * Mostrado quando não há projeto Sanity válido no `.env.local`.
 * O site em geral funciona sem CMS (fallbacks em copy e hero).
 */
export default function StudioSetup() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-950 px-6 py-16 text-zinc-100"
      style={{ margin: 0 }}
    >
      <div className="max-w-lg text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          Sanity Studio — sem projeto ligado
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300">
          <strong className="text-zinc-100">Não tens de ter Sanity</strong> para usar a
          landing: textos e secções funcionam com os conteúdos por defeito. Esta rota só serve
          para editar conteúdo no CMS, quando existir um projeto.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          Se <strong>não queres CMS</strong>, ignora o Studio e volta ao site.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-zinc-400">
          Se <strong>quiseres</strong> o Sanity mais tarde: há{" "}
          <a
            className="text-amber-400 underline underline-offset-2 hover:text-amber-300"
            href="https://www.sanity.io/pricing"
            rel="noopener noreferrer"
            target="_blank"
          >
            plano gratuito
          </a>
          . Regista-te em{" "}
          <a
            className="text-amber-400 underline underline-offset-2 hover:text-amber-300"
            href="https://www.sanity.io/"
            rel="noopener noreferrer"
            target="_blank"
          >
            sanity.io
          </a>
          , cria um projeto, copia o <strong>Project ID</strong> em Project settings e cola no{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-amber-200">
            .env.local
          </code>
          :
        </p>
        <ul className="mt-3 list-inside list-disc text-left text-sm text-zinc-300">
          <li>
            <code className="text-amber-200">NEXT_PUBLIC_SANITY_PROJECT_ID</code> = ID do projeto
          </li>
          <li>
            <code className="text-amber-200">NEXT_PUBLIC_SANITY_DATASET</code> = normalmente{" "}
            <code className="text-zinc-400">production</code>
          </li>
        </ul>
        <p className="mt-4 text-sm text-zinc-500">
          Depois guarda o ficheiro e reinicia <code className="text-zinc-400">npm run dev</code>.
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
