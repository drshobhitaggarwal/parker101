/* Live watch face on the About page.
   Reads the visitor's local time and steps the seconds hand eight times a second,
   the beat of a 28,800 vph movement. */
(function () {
  var hh = document.getElementById("hand-h");
  var hm = document.getElementById("hand-m");
  var hs = document.getElementById("hand-s");
  if (!hh || !hm || !hs) return;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var BEAT = 125; // ms, 8 beats per second

  function rot(el, deg) { el.setAttribute("transform", "rotate(" + deg.toFixed(2) + ")"); }

  function tick() {
    var d = new Date();
    var sec = d.getSeconds();
    if (!reduce) sec += Math.floor(d.getMilliseconds() / BEAT) * (BEAT / 1000);
    var min = d.getMinutes() + sec / 60;
    var hr = (d.getHours() % 12) + min / 60;
    rot(hh, hr * 30);
    rot(hm, min * 6);
    rot(hs, sec * 6);
  }

  tick();
  var timer = setInterval(tick, reduce ? 1000 : BEAT);

  // Stop the timer while the tab is hidden, and resync when it comes back.
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { clearInterval(timer); }
    else { tick(); timer = setInterval(tick, reduce ? 1000 : BEAT); }
  });
})();
