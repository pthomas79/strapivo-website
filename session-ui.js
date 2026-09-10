/* ═══════════════════════════════════════════════════════════════════
   Strapivo · Session UI renderer
   Drops the real product screenshot into the Session beat, wraps it
   in a browser frame, and overlays an animated Ovatar on top of the
   static one inside the screenshot.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  function screenshotHTML() {
    return '' +
      '<div class="sf-screenshot">' +
        '<img src="assets/session-screen.jpg" alt="Strapivo session: Apple iPhone business model canvas" />' +
        '<div class="sf-ov-mask" aria-hidden="true"></div>' +
        '<div class="sf-ov-live" aria-hidden="true">' +
          '<svg id="au-ov-live" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" ' +
              'preserveAspectRatio="xMidYMid meet" ' +
              'style="width:100%;height:100%;color:var(--p500);display:block;">' +
            '<g data-ov-waves transform="translate(50 50)"></g>' +
          '</svg>' +
        '</div>' +
      '</div>';
  }

  function browserFrame(inner) {
    return '<div class="sf-browser">' +
      '<div class="sf-chrome">' +
        '<div class="sf-dots"><span class="sf-dot"></span><span class="sf-dot"></span><span class="sf-dot"></span></div>' +
        '<div class="sf-url">' +
          '<svg class="lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
            '<rect x="5" y="11" width="14" height="10" rx="2"/>' +
            '<path d="M8 11V7a4 4 0 0 1 8 0v4"/>' +
          '</svg><span class="sf-url-text">app.strapivo.com / apple / business-models / iphone</span>' +
        '</div>' +
        '<div style="width:48px;"></div>' +
      '</div>' + inner +
    '</div>';
  }

  function render() {
    var beat1 = document.getElementById('session-beat1');
    if (!beat1) return;
    beat1.innerHTML = browserFrame(screenshotHTML());

    /* Render the animated Ovatar inside the freshly-injected DOM */
    if (window.StrapivoOvatar && window.StrapivoOvatar.renderAll) {
      window.StrapivoOvatar.renderAll();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
}());
