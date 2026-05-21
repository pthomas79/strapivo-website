(function () {
  'use strict';

  var KEY = 'strapivo_cookie_consent_v1';

  function ph() { return window.posthog; }
  function optIn()  { try { ph() && ph().opt_in_capturing  && ph().opt_in_capturing();  } catch (e) {} }
  function optOut() { try { ph() && ph().opt_out_capturing && ph().opt_out_capturing(); } catch (e) {} }
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function removeBanner() {
    var el = document.getElementById('cookie-consent');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function accept()  { set('accepted'); optIn();  removeBanner(); }
  function decline() { set('declined'); optOut(); removeBanner(); }

  // accept(): exposed so the early-access form can record consent on submit
  // (volunteering name + email is an explicit, unambiguous opt-in).
  // reopen(): lets a "Cookie settings" link re-show the banner so a visitor
  // can change or withdraw consent at any time.
  window.__strapivoConsent = { accept: accept, decline: decline, reopen: function () { render(); } };

  // Re-apply any prior decision (PostHog defaults to opted-out via init config).
  var prior = get();
  if (prior === 'accepted') optIn();
  else if (prior === 'declined') optOut();

  function injectStyles() {
    if (document.getElementById('cookie-consent-styles')) return;
    var css =
      '#cookie-consent{position:fixed;z-index:2147483000;left:16px;right:16px;bottom:16px;margin:0 auto;max-width:440px;' +
      'background:#fff;color:#2C343C;border:1px solid #E1E5EA;border-radius:12px;box-shadow:0 10px 40px rgba(20,27,36,0.16);' +
      "padding:18px;font-family:'Inter',system-ui,-apple-system,sans-serif;animation:cc-in 220ms ease-out}" +
      '@keyframes cc-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}' +
      "#cookie-consent .cc-title{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;text-transform:uppercase;" +
      'letter-spacing:0.08em;color:#005DBD;margin:0 0 8px}' +
      '#cookie-consent p{font-size:13.5px;line-height:1.55;color:#495158;margin:0 0 14px}' +
      '#cookie-consent a{color:#005DBD;text-decoration:underline}' +
      '#cookie-consent .cc-row{display:flex;gap:10px}' +
      "#cookie-consent button{font-family:'Inter',sans-serif;font-weight:500;font-size:13.5px;border-radius:8px;" +
      'padding:9px 16px;cursor:pointer;border:1px solid transparent;flex:1}' +
      '#cookie-consent .cc-accept{background:#005DBD;color:#fff}' +
      '#cookie-consent .cc-accept:hover{background:#006FD1}' +
      '#cookie-consent .cc-decline{background:#fff;color:#2C343C;border-color:#CCD2D7}' +
      '#cookie-consent .cc-decline:hover{border-color:#495158}' +
      '@media(max-width:520px){#cookie-consent{left:12px;right:12px;bottom:12px}}';
    var s = document.createElement('style');
    s.id = 'cookie-consent-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function render() {
    if (document.getElementById('cookie-consent')) return;
    injectStyles();
    var bar = document.createElement('div');
    bar.id = 'cookie-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-live', 'polite');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML =
      '<p class="cc-title">Cookies</p>' +
      '<p>We use analytics cookies to understand how this site is used. ' +
      'See our <a href="/privacy">Privacy Policy</a>.</p>' +
      '<div class="cc-row">' +
      '<button type="button" class="cc-decline" data-cc="decline">Decline</button>' +
      '<button type="button" class="cc-accept" data-cc="accept">Accept</button>' +
      '</div>';
    document.body.appendChild(bar);
    bar.querySelector('[data-cc="accept"]').addEventListener('click', accept);
    bar.querySelector('[data-cc="decline"]').addEventListener('click', decline);
  }

  function wireManageLinks() {
    var links = document.querySelectorAll('[data-cookie-settings]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) {
        e.preventDefault();
        render();
      });
    }
  }

  function init() {
    wireManageLinks();
    if (!prior) render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
