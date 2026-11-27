/* Adds a small "Prompt" button to a landing concept page. It opens a panel with the prompt the page was built from. */
(function () {
  if (window.__strapivoPrompt) return;
  window.__strapivoPrompt = true;

  var m = location.pathname.match(/\/landings\/(\d+-[a-z0-9-]+)/);
  if (!m) return;
  var folder = m[1];
  var number = folder.split("-")[0];
  var cache = null;

  var host = document.createElement("div");
  host.setAttribute("data-strapivo-prompt", "");
  host.style.cssText = "all:initial;position:fixed;z-index:2147483647";
  var root = host.attachShadow({ mode: "open" });

  root.innerHTML =
    "<style>" +
    ":host{all:initial}" +
    "*{box-sizing:border-box}" +
    "button{font:500 13px/1 system-ui,-apple-system,'Segoe UI',sans-serif;cursor:pointer;margin:0}" +
    ".open{display:inline-flex;align-items:center;gap:7px;height:34px;padding:0 13px 0 11px;border-radius:17px;" +
    "border:1px solid rgba(20,27,36,.18);background:rgba(255,255,255,.92);color:#141B24;" +
    "box-shadow:0 2px 10px rgba(5,12,20,.18);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}" +
    ".open:hover{background:#fff;border-color:#0082E6}" +
    ".open svg{display:block}" +
    "button:focus-visible{outline:2px solid #0082E6;outline-offset:2px}" +
    ".veil{position:fixed;inset:0;background:rgba(5,12,20,.42);display:none}" +
    ".panel{position:fixed;top:0;right:0;bottom:0;width:min(600px,100vw);display:none;flex-direction:column;" +
    "background:#F6F9FB;color:#141B24;box-shadow:-12px 0 40px rgba(5,12,20,.28);" +
    "font:15px/1.55 system-ui,-apple-system,'Segoe UI',sans-serif;text-align:left;letter-spacing:0}" +
    ".on .veil{display:block}.on .panel{display:flex}.on .open{display:none}" +
    "header{display:flex;align-items:center;gap:10px;padding:14px 16px 14px 22px;border-bottom:1px solid #E1E5EA;background:#fff}" +
    "header div{flex:1;min-width:0}" +
    ".k{font:500 11px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;color:#006FD1}" +
    ".t{font-weight:500;font-size:16px;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
    "header button{height:34px;padding:0 12px;border-radius:6px;border:1px solid #E1E5EA;background:#fff;color:#141B24}" +
    "header button:hover{border-color:#0082E6;color:#006FD1}" +
    ".body{flex:1;overflow:auto;overscroll-behavior:contain;padding:8px 22px 28px;-webkit-overflow-scrolling:touch}" +
    ".body h1{font-size:22px;line-height:1.25;font-weight:500;letter-spacing:-.01em;margin:18px 0 10px}" +
    ".body h2{font:500 11px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;" +
    "color:#6C727A;margin:26px 0 8px;padding-top:16px;border-top:1px solid #E1E5EA}" +
    ".body h3{font-size:15px;font-weight:500;margin:18px 0 6px}" +
    ".body p{margin:0 0 10px}" +
    ".body ul,.body ol{margin:0 0 10px;padding-left:20px}" +
    ".body li{margin:0 0 5px}" +
    ".body strong{font-weight:500;color:#050C14}" +
    ".body code{font:13px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;background:#EFF2F6;border-radius:3px;padding:1px 4px}" +
    ".body pre{font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;background:#EFF2F6;border-radius:4px;padding:10px 12px;overflow:auto;margin:0 0 10px}" +
    ".note{margin-top:22px;padding-top:14px;border-top:1px solid #E1E5EA;color:#6C727A;font-size:13px}" +
    "</style>" +
    '<div class="wrap">' +
    '<button class="open" type="button" aria-haspopup="dialog" aria-expanded="false">' +
    '<svg width="14" height="14" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40" fill="none" stroke="#0082E6" stroke-width="14"/></svg>' +
    "Prompt</button>" +
    '<div class="veil"></div>' +
    '<div class="panel" role="dialog" aria-modal="true" aria-label="The prompt this page was built from">' +
    "<header><div><div class=\"k\">Concept " + number + '</div><div class="t">The prompt behind this page</div></div>' +
    '<button class="copy" type="button">Copy</button><button class="close" type="button" aria-label="Close the prompt">Close</button></header>' +
    '<div class="body" tabindex="0"><p>Loading the prompt.</p></div>' +
    "</div></div>";

  var wrap = root.querySelector(".wrap");
  var openBtn = root.querySelector(".open");
  var closeBtn = root.querySelector(".close");
  var copyBtn = root.querySelector(".copy");
  var body = root.querySelector(".body");

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }
  function render(md) {
    var out = [], para = [], list = null, pre = null;
    function flushPara() { if (para.length) { out.push("<p>" + para.map(inline).join("<br>") + "</p>"); para = []; } }
    function flushList() { if (list) { out.push("<" + list.tag + ">" + list.items.join("") + "</" + list.tag + ">"); list = null; } }
    md.replace(/\r/g, "").split("\n").forEach(function (line) {
      if (pre !== null) {
        if (/^```/.test(line)) { out.push("<pre>" + esc(pre.join("\n")) + "</pre>"); pre = null; } else pre.push(line);
        return;
      }
      var h, li;
      if (/^```/.test(line)) { flushPara(); flushList(); pre = []; return; }
      if ((h = line.match(/^(#{1,3})\s+(.*)$/))) {
        flushPara(); flushList();
        out.push("<h" + h[1].length + ">" + inline(h[2]) + "</h" + h[1].length + ">");
        return;
      }
      if ((li = line.match(/^\s*(-|\d+\.)\s+(.*)$/))) {
        flushPara();
        var tag = li[1] === "-" ? "ul" : "ol";
        if (list && list.tag !== tag) flushList();
        if (!list) list = { tag: tag, items: [] };
        list.items.push("<li>" + inline(li[2]) + "</li>");
        return;
      }
      if (!line.trim()) { flushPara(); flushList(); return; }
      if (list && /^\s+\S/.test(line)) {
        list.items[list.items.length - 1] = list.items[list.items.length - 1].replace(/<\/li>$/, " " + inline(line.trim()) + "</li>");
        return;
      }
      flushList();
      para.push(line.trim());
    });
    if (pre !== null) out.push("<pre>" + esc(pre.join("\n")) + "</pre>");
    flushPara(); flushList();
    return out.join("");
  }

  function load() {
    if (cache !== null) return;
    fetch("/landings/prompts/" + folder + ".txt")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (text) {
        cache = text;
        body.innerHTML = render(text) +
          '<p class="note">Every page was also given a shared brief with the facts about Strapivo, the truth rules and the build rules.</p>';
      })
      .catch(function () { body.innerHTML = "<p>The prompt could not be loaded.</p>"; });
  }
  function open() {
    wrap.classList.add("on");
    openBtn.setAttribute("aria-expanded", "true");
    load();
    closeBtn.focus();
  }
  function close() {
    wrap.classList.remove("on");
    openBtn.setAttribute("aria-expanded", "false");
    openBtn.focus();
  }

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  root.querySelector(".veil").addEventListener("click", close);
  copyBtn.addEventListener("click", function () {
    if (cache === null || !navigator.clipboard) return;
    navigator.clipboard.writeText(cache).then(function () {
      copyBtn.textContent = "Copied";
      setTimeout(function () { copyBtn.textContent = "Copy"; }, 1600);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && wrap.classList.contains("on")) close();
  });

  var spots = [
    { right: "14px", bottom: "14px" },
    { left: "14px", bottom: "14px" },
    { right: "14px", top: "50%" },
    { left: "14px", top: "50%" },
    { right: "14px", top: "72px" }
  ];
  var spot = 0;
  function setSpot(i) {
    spot = i;
    host.style.left = host.style.right = host.style.top = host.style.bottom = "auto";
    for (var k in spots[i]) host.style[k] = spots[i][k];
  }
  function covers() {
    var r = openBtn.getBoundingClientRect();
    if (!r.width) return false;
    var pts = [];
    for (var gx = 0; gx <= 8; gx++) for (var gy = 0; gy <= 4; gy++) {
      pts.push([r.left + 2 + (r.width - 4) * gx / 8, r.top + 2 + (r.height - 4) * gy / 4]);
    }
    for (var i = 0; i < pts.length; i++) {
      var els = document.elementsFromPoint(pts[i][0], pts[i][1]);
      for (var j = 0; j < els.length; j++) {
        if (els[j] === host) continue;
        if (els[j].closest && els[j].closest("a,button,input,select,textarea,summary,[role=button],[role=switch]")) return true;
      }
    }
    return false;
  }
  function place() {
    if (wrap.classList.contains("on") || !covers()) return;
    var start = spot;
    for (var n = 1; n < spots.length; n++) {
      setSpot((start + n) % spots.length);
      if (!covers()) return;
    }
    setSpot(0);
  }
  var placeTimer = null;
  function placeSoon() {
    if (placeTimer) return;
    placeTimer = setTimeout(function () { placeTimer = null; place(); }, 180);
  }

  function mount() {
    document.documentElement.appendChild(host);
    setSpot(0);
    place();
    window.addEventListener("load", place);
    window.addEventListener("resize", placeSoon);
    window.addEventListener("scroll", placeSoon, { passive: true });
    setTimeout(place, 1200);
    if (location.hash === "#prompt") open();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
