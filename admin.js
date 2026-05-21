(() => {
  'use strict';

  const PENDING_KEY = 'strapivo_admin_pending_v1';
  const EDITABLE_FILES = ['index.html', 'imprint.html', 'privacy.html', 'terms.html'];
  const BAR_ID = '__cms_bar';
  const OVERLAY_ID = '__cms_overlay';

  // ── helpers ────────────────────────────────────────────────────────────────

  function currentPath() {
    let p = location.pathname.replace(/^\//, '').replace(/\/$/, '') || 'index.html';
    if (!p.includes('.')) p += '.html';
    return EDITABLE_FILES.includes(p) ? p : 'index.html';
  }

  function api(path, body) {
    return fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => r.json());
  }

  function apiGet(path) {
    return fetch(path).then((r) => r.json());
  }

  function toast(msg, type = 'info') {
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
      background:${type === 'error' ? '#c0392b' : type === 'success' ? '#27ae60' : '#2c3e50'};
      color:#fff;padding:10px 20px;border-radius:6px;font:13px/1.4 system-ui,sans-serif;
      z-index:999999;box-shadow:0 4px 16px rgba(0,0,0,.3);max-width:420px;text-align:center;
    `;
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }

  // ── session ────────────────────────────────────────────────────────────────

  let _user = null;

  async function getUser() {
    if (_user) return _user;
    try {
      const d = await apiGet('/api/auth/me');
      if (d.ok) { _user = d; return _user; }
    } catch {}
    return null;
  }

  // ── edit mode ──────────────────────────────────────────────────────────────

  let editMode = false;
  const pending = new Map();

  function enterEditMode() {
    editMode = true;
    document.querySelectorAll('[data-edit]').forEach((el) => {
      el.setAttribute('contenteditable', 'true');
      el.style.outline = '2px dashed #e67e22';
      el.style.cursor = 'text';
      el.dataset._orig = el.innerHTML;
      el.addEventListener('input', onEdit);
    });
    updateBar();
  }

  function exitEditMode(discard = false) {
    editMode = false;
    document.querySelectorAll('[data-edit]').forEach((el) => {
      el.removeAttribute('contenteditable');
      el.style.outline = '';
      el.style.cursor = '';
      if (discard && el.dataset._orig != null) el.innerHTML = el.dataset._orig;
      el.removeEventListener('input', onEdit);
      delete el.dataset._orig;
    });
    if (discard) pending.clear();
    updateBar();
  }

  function onEdit(e) {
    const id = e.target.dataset.edit;
    if (id) pending.set(id, e.target.innerText);
  }

  async function commitEdits() {
    if (!pending.size) { toast('Nothing changed.'); return; }
    const edits = [...pending.entries()].map(([id, text]) => ({ id, text }));
    const btn = document.getElementById('__cms_commit_btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }
    try {
      const res = await api('/api/commit', { path: currentPath(), edits });
      if (res.ok) {
        pending.clear();
        exitEditMode();
        toast(`Saved ${res.applied?.length || edits.length} edit(s). Redeploying (~45s)…`, 'success');
      } else {
        toast(res.error === 'conflict' ? 'Conflict — reload and try again.' : `Error: ${res.error}`, 'error');
      }
    } catch (err) {
      toast('Network error. Try again.', 'error');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Commit Changes'; }
    }
  }

  // ── comment mode ───────────────────────────────────────────────────────────

  let commentMode = false;

  function enterCommentMode() {
    commentMode = true;
    document.querySelectorAll('[data-edit]').forEach((el) => {
      el.style.outline = '2px dashed #3498db';
      el.style.cursor = 'pointer';
      el.addEventListener('click', onCommentClick);
    });
    updateBar();
  }

  function exitCommentMode() {
    commentMode = false;
    document.querySelectorAll('[data-edit]').forEach((el) => {
      el.style.outline = '';
      el.style.cursor = '';
      el.removeEventListener('click', onCommentClick);
    });
    closeOverlay();
    updateBar();
  }

  function onCommentClick(e) {
    e.preventDefault();
    const regionId = e.currentTarget.dataset.edit;
    openCommentOverlay(regionId);
  }

  function openCommentOverlay(regionId) {
    closeOverlay();
    const overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:999990;
      display:flex;align-items:center;justify-content:center;
    `;
    overlay.innerHTML = `
      <div style="background:#1a1a2e;color:#eee;padding:28px 32px;border-radius:10px;
        width:min(480px,90vw);box-shadow:0 8px 40px rgba(0,0,0,.6);font:14px/1.5 system-ui,sans-serif;">
        <h3 style="margin:0 0 4px;font-size:16px;color:#fff;">Request a change</h3>
        <p style="margin:0 0 16px;color:#aaa;font-size:12px;">
          Region: <code style="background:#2d2d44;padding:2px 6px;border-radius:3px;">${regionId || 'page-level'}</code>
        </p>
        <textarea id="__cms_comment_text" rows="5" placeholder="Describe what you want changed in plain English…"
          style="width:100%;box-sizing:border-box;background:#2d2d44;color:#eee;border:1px solid #444;
          border-radius:6px;padding:10px;font:14px/1.5 system-ui,sans-serif;resize:vertical;"></textarea>
        <div style="display:flex;gap:10px;margin-top:14px;justify-content:flex-end;">
          <button id="__cms_comment_cancel"
            style="padding:8px 18px;background:#333;color:#eee;border:none;border-radius:5px;cursor:pointer;">
            Cancel
          </button>
          <button id="__cms_comment_send"
            style="padding:8px 18px;background:#3498db;color:#fff;border:none;border-radius:5px;cursor:pointer;font-weight:600;">
            Send to Claude
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('__cms_comment_cancel').addEventListener('click', closeOverlay);
    document.getElementById('__cms_comment_send').addEventListener('click', async () => {
      const text = document.getElementById('__cms_comment_text').value.trim();
      if (text.length < 4) { toast('Please write a longer description.', 'error'); return; }
      const btn = document.getElementById('__cms_comment_send');
      btn.disabled = true; btn.textContent = 'Sending…';
      try {
        const res = await api('/api/comments', { path: currentPath(), regionId, comment: text });
        closeOverlay();
        if (res.ok) {
          toast('Sent to Claude. Check Telegram for the plan.', 'success');
        } else {
          toast(`Error: ${res.error}`, 'error');
        }
      } catch {
        toast('Network error. Try again.', 'error');
        btn.disabled = false; btn.textContent = 'Send to Claude';
      }
    });
  }

  function closeOverlay() {
    document.getElementById(OVERLAY_ID)?.remove();
  }

  // ── history panel ──────────────────────────────────────────────────────────

  let historyOpen = false;

  async function toggleHistory() {
    if (historyOpen) { closeHistory(); return; }
    historyOpen = true;
    const panel = document.createElement('div');
    panel.id = '__cms_history';
    panel.style.cssText = `
      position:fixed;top:44px;right:0;width:min(380px,100vw);bottom:0;
      background:#1a1a2e;color:#eee;z-index:999980;overflow-y:auto;
      box-shadow:-4px 0 20px rgba(0,0,0,.4);font:13px/1.5 system-ui,sans-serif;
    `;
    panel.innerHTML = `<div style="padding:16px 20px;border-bottom:1px solid #333;">
      <strong style="font-size:14px;">Recent edits</strong>
      <button onclick="document.getElementById('__cms_history').remove();window.__cmsHistoryOpen=false;"
        style="float:right;background:none;border:none;color:#aaa;cursor:pointer;font-size:18px;">×</button>
    </div>
    <div id="__cms_history_list" style="padding:12px 20px;">Loading…</div>`;
    document.body.appendChild(panel);

    try {
      const data = await apiGet(`/api/recent-edits?path=${encodeURIComponent(currentPath())}`);
      const list = document.getElementById('__cms_history_list');
      if (!data.ok || !data.edits?.length) {
        list.textContent = 'No edits found.';
        return;
      }
      list.innerHTML = data.edits.map((e) => `
        <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #2a2a3e;">
          <div style="font-weight:600;color:#fff;margin-bottom:2px;">${esc(e.message)}</div>
          <div style="color:#888;font-size:11px;margin-bottom:8px;">
            ${esc(e.author.name)} · ${e.date ? new Date(e.date).toLocaleString() : ''}
          </div>
          <div style="display:flex;gap:8px;">
            <a href="${esc(e.url)}" target="_blank"
              style="font-size:11px;color:#3498db;text-decoration:none;">
              ${esc(e.shortSha)}
            </a>
            <button data-sha="${esc(e.sha)}"
              style="font-size:11px;padding:2px 10px;background:#c0392b;color:#fff;
              border:none;border-radius:4px;cursor:pointer;">Revert</button>
          </div>
        </div>
      `).join('');

      list.querySelectorAll('[data-sha]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          if (!confirm('Revert to before this commit? A new revert commit will be created.')) return;
          btn.disabled = true; btn.textContent = 'Reverting…';
          try {
            const r = await api('/api/rollback', { path: currentPath(), commitSha: btn.dataset.sha });
            if (r.ok) { toast('Reverted. Redeploying…', 'success'); closeHistory(); }
            else { toast(`Error: ${r.error}`, 'error'); btn.disabled = false; btn.textContent = 'Revert'; }
          } catch { toast('Network error.', 'error'); btn.disabled = false; btn.textContent = 'Revert'; }
        });
      });
    } catch {
      const list = document.getElementById('__cms_history_list');
      if (list) list.textContent = 'Failed to load edits.';
    }
  }

  function closeHistory() {
    historyOpen = false;
    document.getElementById('__cms_history')?.remove();
  }

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ── admin bar ──────────────────────────────────────────────────────────────

  function buildBar() {
    if (document.getElementById(BAR_ID)) return;
    const bar = document.createElement('div');
    bar.id = BAR_ID;
    bar.style.cssText = `
      position:fixed;top:0;left:0;right:0;height:44px;background:#0f0f1a;
      border-bottom:1px solid #2a2a3e;display:flex;align-items:center;
      padding:0 16px;gap:10px;z-index:999970;font:13px/1 system-ui,sans-serif;color:#eee;
      box-shadow:0 2px 12px rgba(0,0,0,.4);
    `;
    bar.innerHTML = `
      <span style="font-weight:700;color:#7c8dff;margin-right:6px;">Strapivo admin</span>
      <button id="__cms_edit_btn" style="${btnStyle('#2ecc71')}">Edit Mode</button>
      <button id="__cms_commit_btn" style="${btnStyle('#e67e22')};display:none;">Commit Changes</button>
      <button id="__cms_discard_btn" style="${btnStyle('#95a5a6')};display:none;">Discard</button>
      <button id="__cms_comment_btn" style="${btnStyle('#3498db')}">Comment Mode</button>
      <button id="__cms_history_btn" style="${btnStyle('#9b59b6')}">Recent Edits</button>
      <div style="flex:1"></div>
      <span id="__cms_user_label" style="color:#888;font-size:12px;"></span>
      <button id="__cms_signout_btn" style="${btnStyle('#c0392b')}">Sign out</button>
    `;
    document.body.style.paddingTop = '44px';
    document.body.insertBefore(bar, document.body.firstChild);

    document.getElementById('__cms_edit_btn').addEventListener('click', () => {
      if (commentMode) exitCommentMode();
      editMode ? exitEditMode(true) : enterEditMode();
    });
    document.getElementById('__cms_commit_btn').addEventListener('click', commitEdits);
    document.getElementById('__cms_discard_btn').addEventListener('click', () => exitEditMode(true));
    document.getElementById('__cms_comment_btn').addEventListener('click', () => {
      if (editMode) exitEditMode(true);
      commentMode ? exitCommentMode() : enterCommentMode();
    });
    document.getElementById('__cms_history_btn').addEventListener('click', toggleHistory);
    document.getElementById('__cms_signout_btn').addEventListener('click', async () => {
      await api('/api/auth/logout', {});
      location.reload();
    });

    getUser().then((u) => {
      const label = document.getElementById('__cms_user_label');
      if (label && u) label.textContent = u.name || u.email;
    });
  }

  function btnStyle(bg) {
    return `padding:5px 12px;background:${bg};color:#fff;border:none;border-radius:4px;
    cursor:pointer;font:12px/1.4 system-ui,sans-serif;font-weight:600;`;
  }

  function updateBar() {
    const editBtn = document.getElementById('__cms_edit_btn');
    const commitBtn = document.getElementById('__cms_commit_btn');
    const discardBtn = document.getElementById('__cms_discard_btn');
    const commentBtn = document.getElementById('__cms_comment_btn');
    if (!editBtn) return;
    editBtn.textContent = editMode ? 'Exit Edit Mode' : 'Edit Mode';
    editBtn.style.background = editMode ? '#e67e22' : '#2ecc71';
    commitBtn.style.display = editMode ? '' : 'none';
    discardBtn.style.display = editMode ? '' : 'none';
    commentBtn.textContent = commentMode ? 'Exit Comment Mode' : 'Comment Mode';
    commentBtn.style.background = commentMode ? '#2980b9' : '#3498db';
  }

  // ── init ───────────────────────────────────────────────────────────────────

  async function init() {
    const user = await getUser();
    if (!user) return;
    buildBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
