/* Port of Strapivo LogoHelper#animated_logo. Keep geometry, phases and formulas in sync
   with app/helpers/logo_helper.rb and app/assets/tailwind/components/logo.css. */
(function () {
  'use strict';
  var phases = [-0.53, -0.89, -1.28, -1.73, -2.61, -3.15,
    -3.62, -4.18, -5.15, -5.69, -6.1, -6.46,
    -6.91, -7.88, -8.13, -8.93, -9.29, -10.07,
    -10.92, -10.92, -11.68, -12.17, -12.95, -13.59];
  var shape = "M89.97 50.89C90.30 53.81 90.18 56.98 89.60 59.89C89.02 62.80 87.91 65.77 86.48 68.37C85.05 70.98 83.10 73.41 81.03 75.50C78.97 77.58 76.53 79.36 74.09 80.88C71.66 82.40 69.05 83.65 66.43 84.63C63.81 85.62 61.08 86.33 58.38 86.81C55.67 87.28 52.91 87.48 50.18 87.47C47.45 87.47 44.65 87.36 41.99 86.79C39.32 86.22 36.62 85.30 34.20 84.07C31.78 82.83 29.45 81.20 27.46 79.39C25.46 77.57 23.76 75.37 22.23 73.18C20.70 70.99 19.44 68.64 18.29 66.25C17.14 63.86 16.12 61.41 15.32 58.85C14.51 56.29 13.84 53.63 13.47 50.89C13.10 48.15 12.89 45.28 13.07 42.42C13.26 39.56 13.68 36.56 14.55 33.74C15.42 30.91 16.64 27.97 18.30 25.47C19.96 22.97 22.15 20.57 24.53 18.73C26.92 16.89 29.78 15.38 32.61 14.41C35.44 13.44 38.58 12.97 41.51 12.91C44.44 12.85 47.45 13.34 50.18 14.05C52.91 14.76 55.47 16.02 57.88 17.16C60.28 18.31 62.43 19.65 64.61 20.93C66.79 22.21 68.85 23.44 70.96 24.84C73.07 26.23 75.24 27.59 77.26 29.30C79.28 31.00 81.34 32.88 83.06 35.06C84.78 37.23 86.45 39.71 87.60 42.35C88.75 44.99 89.63 47.97 89.97 50.89Z";
  var ns = 'http://www.w3.org/2000/svg';
  var sequence = 0;
  function rounded(value, digits) {
    var factor = Math.pow(10, digits);
    return Math.round((value + Number.EPSILON) * factor) / factor;
  }
  function element(name, attributes) {
    var node = document.createElementNS(ns, name);
    Object.keys(attributes || {}).forEach(function (key) { node.setAttribute(key, attributes[key]); });
    return node;
  }
  function renderOne(svg) {
    var mount = svg.querySelector('[data-ov-waves]');
    if (!mount) return;
    var size = Math.max(svg.getBoundingClientRect().width, svg.getBoundingClientRect().height) || 80;
    var small = size <= 48, count = small ? 6 : 24;
    if (mount.dataset.lineCount === String(count)) return;
    mount.replaceChildren();
    mount.removeAttribute('transform');
    mount.dataset.lineCount = count;
    svg.classList.add('strapivo-orb');
    var id = 'strapivo-orb-gradient-' + (++sequence);
    var defs = element('defs');
    var gradient = element('linearGradient', {id: id, x1: 15, y1: 13, x2: 86, y2: 87, gradientUnits: 'userSpaceOnUse'});
    ['light', 'soft', 'primary', 'dark'].forEach(function (color, i) {
      gradient.appendChild(element('stop', {offset: ['0', '30%', '72%', '100%'][i], 'stop-color': 'var(--logo-field-' + color + ')'}));
    });
    defs.appendChild(gradient);
    mount.appendChild(defs);
    var rotation = element('g', {class: 'logo__field-rotation'});
    var lines = element('g', {class: 'logo__field-lines'});
    for (var i = 0; i < count; i++) {
      var progression = i / (count - 1);
      var stroke = 0.9 * (1.42 - 1.04 * progression) * (small ? 1.8 : 1) * (100 / 256);
      var opacity = 0.38 * (0.78 - 0.3 * progression) * (small ? 1.35 : 1);
      var turn = (((i * 7) % 13) - 6) * 0.55;
      var scale = 1 + (((i * 11) % 9) - 4) * 0.0035;
      lines.appendChild(element('path', {
        class: 'logo__field logo__field--ambient', d: shape,
        stroke: i % 4 === 2 ? 'var(--logo-field-accent)' : 'url(#' + id + ')',
        style: '--logo-field-phase:' + phases[i] + 's;--logo-field-stroke:' + stroke.toFixed(3) +
          ';--logo-field-opacity:' + opacity.toFixed(3) + ';--logo-field-turn:' + turn.toFixed(2) +
          'deg;--logo-field-scale:' + rounded(scale, 3)
      }));
    }
    rotation.appendChild(lines);
    mount.appendChild(rotation);
  }
  function renderAll() {
    document.querySelectorAll('svg [data-ov-waves]').forEach(function (mount) { renderOne(mount.ownerSVGElement); });
  }
  window.StrapivoOvatar = {renderAll: renderAll, renderOne: renderOne};
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderAll);
  else renderAll();
  window.addEventListener('resize', renderAll);
}());
