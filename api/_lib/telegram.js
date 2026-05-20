export async function notifyTelegram(text, { parseMode = 'HTML', replyMarkup = null } = {}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) { console.warn('telegram: env vars missing'); return { ok: false }; }
  try {
    const payload = { chat_id: chatId, text, parse_mode: parseMode, disable_web_page_preview: true };
    if (replyMarkup) payload.reply_markup = replyMarkup;
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) return { ok: false, status: res.status };
    return { ok: true, messageId: data.result?.message_id };
  } catch (err) { return { ok: false, error: err?.message }; }
}

export async function answerCallbackQuery(callbackQueryId, { text, showAlert = false } = {}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return { ok: false };
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callback_query_id: callbackQueryId, text, show_alert: showAlert }),
    });
    return { ok: res.ok };
  } catch { return { ok: false }; }
}

export async function editTelegramMessage(messageId, text, { parseMode = 'HTML', replyMarkup = null } = {}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false };
  try {
    const payload = { chat_id: chatId, message_id: messageId, text, parse_mode: parseMode, disable_web_page_preview: true };
    if (replyMarkup) payload.reply_markup = replyMarkup;
    const res = await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch { return { ok: false }; }
}

export function escapeTelegramHtml(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}
