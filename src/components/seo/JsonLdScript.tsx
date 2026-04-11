type JsonLdScriptProps = {
  data: Record<string, unknown>;
};

/** JSON-LD no corpo da página (aceite pelos motores de pesquisa / AEO). */
export default function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
