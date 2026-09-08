export function safeUrl(value: string, image = false): string {
  if (/^\/(?!\/)/.test(value) && !/[\\\x00-\x20]/.test(value)) return value;
  if (image && /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(value)) return value;
  try { const u = new URL(value); return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : ''; } catch { return ''; }
}
export function validateContent(value: unknown, reference: unknown): boolean {
  if (typeof reference === 'string') return typeof value === 'string' && value.length < 12000000;
  if (Array.isArray(reference)) return Array.isArray(value) && value.length === reference.length && value.every((v, i) => validateContent(v, reference[i]));
  if (reference && typeof reference === 'object') return !!value && typeof value === 'object' && !Array.isArray(value) && Object.keys(reference).every(k => Object.hasOwn(value, k) && validateContent((value as Record<string, unknown>)[k], (reference as Record<string, unknown>)[k]));
  return false;
}
export function setField<T>(source: T, path: string[], value: string): T {
  const next = structuredClone(source); let cursor = next as Record<string, any>;
  for (const key of path.slice(0, -1)) cursor = cursor[key];
  cursor[path[path.length - 1]] = value; return next;
}
