/* ============================================================
   QUIET SKY — feature card renderers (shared by all 3 layouts)
   Mount: any element with [data-qs-card="sunset|nowcast|widgets"].
   ============================================================ */
(function () {
  // exact minute-cast intensity (features.jsx · 'rain-starting', 30-min window)
  var RAIN = [0,0,0,0,0,0,0,0,0.08,0.2,0.35,0.5,0.58,0.6,0.6,0.58,0.55,0.55,0.5,0.5,0.48,0.45,0.45,0.4,0.4,0.38,0.35,0.35,0.3,0.3];

  function bars(data, big) {
    return data.map(function (v) {
      var on = v > 0.03;
      var op = on ? (0.5 + v * 0.5) : 1;
      var col = on
        ? 'color-mix(in oklab, var(--precip) ' + Math.round(50 + v * 50) + '%, transparent)'
        : 'rgba(255,255,255,.10)';
      return '<i style="height:' + Math.max(v * 100, 4) + '%;background:' + col + '"></i>';
    }).join('');
  }

  var TPL = {
    sunset: function () {
      return '' +
      '<div class="qs-card qs-sunset">' +
        '<div class="strip"><div class="eyebrow"><i></i>Tonight\u2019s sunset</div></div>' +
        '<div class="body">' +
          '<h4>Great sunset expected</h4>' +
          '<p class="reason">High clouds and clean air should light up well at sunset.</p>' +
          '<div class="stats">' +
            '<div class="qs-stat"><div class="k">Best at</div><div class="v">8:32 PM</div></div>' +
            '<div class="qs-stat"><div class="k">Sunset</div><div class="v">8:41 PM</div></div>' +
            '<div class="qs-stat"><div class="k">Quality</div><div class="v great">Great</div></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    },
    nowcast: function () {
      return '' +
      '<div class="qs-card qs-nowcast">' +
        '<div class="top">' +
          '<div class="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 16a4.5 4.5 0 0 0 .5-9 6 6 0 0 0-11.5-2A4.5 4.5 0 0 0 6.5 16"/><path d="M8 19l-1 2M12 19l-1 2M16 19l-1 2"/></svg></div>' +
          '<div><h4>Rain in 8 minutes</h4><p class="sub">Light rain expected starting at 9:49 AM, lasting about 20 minutes.</p></div>' +
        '</div>' +
        '<div class="qs-bars"><div class="track">' + bars(RAIN) + '</div>' +
          '<div class="axis"><span>Now</span><span>10m</span><span>20m</span><span>30m</span></div>' +
        '</div>' +
      '</div>';
    },
    widgets: function () {
      return '<div class="atmospheric-gallery" aria-label="Quiet Sky Android widgets with Atmospheric artwork">' +
        '<img class="native-widget" src="assets/widget-native-sunset-vibrant.png" width="620" height="620" alt="Sunset Quality widget showing a Great sunset, golden hour and sunset times.">' +
        '<img class="native-widget" src="assets/widget-native-rain-vibrant.png" width="620" height="620" alt="Rain in 30 widget showing rain arriving in 30 minutes and a labeled precipitation timeline.">' +
        '<img class="native-widget wide" src="assets/widget-native-skyclock-vibrant.png" width="1166" height="570" alt="SkyClock widget showing the time, date, temperature and location on the sunny-day gradient.">' +
      '</div>';
    }
  };

  function mount() {
    document.querySelectorAll('[data-qs-card]').forEach(function (el) {
      var kind = el.getAttribute('data-qs-card');
      if (TPL[kind] && !el.dataset.qsMounted) {
        el.classList.add('qs');
        el.innerHTML = TPL[kind]();
        el.dataset.qsMounted = '1';
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
  window.QSCards = { mount: mount };
})();
