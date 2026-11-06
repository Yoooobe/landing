import { randomUUID } from "node:crypto";

/** IDs com ponto ("leads.<uuid>") não são legíveis anonimamente mesmo em dataset público. */
export function privateDocId(prefix: string): string {
  return `${prefix}.${randomUUID()}`;
}
