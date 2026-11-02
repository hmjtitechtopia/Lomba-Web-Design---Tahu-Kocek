(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var stack = document.getElementById("jenis-jenis-stack");
  if (!stack) return;

  var slots = stack.querySelectorAll(".stack-slot");
  var cards = stack.querySelectorAll(".feature-card");
  if (slots.length < 2 || cards.length < 2) return;

  var LERP = 0.12;      
  var MAX_SCALE_IN = 0.03; 
  var MAX_DIM = 0.22;      

  var currents = [];
  for (var i = 0; i < cards.length - 1; i++) {
    currents.push(0);
  }

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function smoothstep(p) {
    return p * p * (3 - 2 * p);
  }

  function computeTarget(i) {
    var vh = window.innerHeight;
    var nextRect = slots[i + 1].getBoundingClientRect();
    var start = vh * 0.95;
    var end = vh * 0.35;
    var p = clamp((start - nextRect.top) / (start - end), 0, 1);
    var myRect = slots[i].getBoundingClientRect();
    if (nextRect.top < myRect.top + 40) p = 1;

    return smoothstep(p);
  }

  var running = false;

  function tick() {
    for (var i = 0; i < currents.length; i++) {
      var target = computeTarget(i);
      var c = currents[i];
      c += (target - c) * LERP;

      if (Math.abs(target - c) < 0.0005) c = target;
      currents[i] = c;

      var card = cards[i];
      if (c <= 0.0005) {
        card.style.transform = "";
        card.style.filter = "";
        continue;
      }
      var scale = 1 - MAX_SCALE_IN * c;
      var dim = 1 - MAX_DIM * c;
      card.style.transform = "scale(" + scale.toFixed(4) + ")";
      card.style.filter = "brightness(" + dim.toFixed(3) + ")";
    }

    if (running) {
      window.requestAnimationFrame(tick);
    }
  }

  function resetStyles() {
    currents.forEach(function (_, i) {
      currents[i] = 0;
      cards[i].style.transform = "";
      cards[i].style.filter = "";
    });
  }

  if (reduceMotion) {
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      var visible = entries.some(function (e) {
        return e.isIntersecting;
      });
      if (visible && !running) {
        running = true;
        window.requestAnimationFrame(tick);
      } else if (!visible && running) {
        running = false;
        resetStyles();
      }
    },
    { rootMargin: "120px 0px" }
  );
  io.observe(stack);

  window.addEventListener(
    "resize",
    function () {
    },
    { passive: true }
  );
})();
