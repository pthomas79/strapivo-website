export function sanitizePlainText(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[ -⁯⸀-⹿　-〿]/g, '')
    .replace(/\s+$/gm, '')
    .trim()
    .slice(0, 5000);
}

export function plainTextToHtml(text) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped.replace(/\n/g, '<br>');
}
