/** Id estável do bloco principal de formulário para `#contato` e scroll global. */
export const PRIMARY_CONTACT_SECTION_ID = "contato" as const;

/**
 * `undefined` → id principal por omissão.
 * `null` → não definir id (ex.: bloco intermédio no renderer CMS).
 * string → id explícito.
 */
export function primaryContactSectionIdAttr(explicit?: string | null): string | undefined {
  if (explicit === null) return undefined;
  if (explicit === undefined) return PRIMARY_CONTACT_SECTION_ID;
  return explicit || undefined;
}
