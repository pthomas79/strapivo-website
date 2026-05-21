export const EDITABLE_FILES = new Set([
  'index.html',
  'imprint.html',
  'privacy.html',
]);

export const DEFAULT_EDITABLE_FILE = 'index.html';

export function resolveEditablePath(input) {
  if (input == null || input === '') return DEFAULT_EDITABLE_FILE;
  if (typeof input !== 'string') return null;
  let p = input.trim().replace(/^\/+/, '').replace(/\/+$/, '');
  if (!p) return DEFAULT_EDITABLE_FILE;
  if (!p.includes('.')) p = p + '.html';
  return EDITABLE_FILES.has(p) ? p : null;
}
