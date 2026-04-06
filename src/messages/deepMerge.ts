/** Mescla `overlay` sobre `base` (recursivo). Valores em `overlay` substituem `base`. */
export function deepMerge<T extends Record<string, unknown>>(
  base: T,
  overlay: Partial<{ [K in keyof T]: unknown }>,
): T {
  const out = { ...base } as T;
  for (const key of Object.keys(overlay) as (keyof T)[]) {
    const oVal = overlay[key];
    const bVal = base[key];
    if (
      oVal !== undefined &&
      oVal !== null &&
      typeof oVal === "object" &&
      !Array.isArray(oVal) &&
      bVal !== null &&
      typeof bVal === "object" &&
      !Array.isArray(bVal)
    ) {
      out[key] = deepMerge(bVal as Record<string, unknown>, oVal as Record<string, unknown>) as T[keyof T];
    } else if (oVal !== undefined) {
      out[key] = oVal as T[keyof T];
    }
  }
  return out;
}
