(function () {
  "use strict";

  var section = document.getElementById("list-wayang");
  var viewport = document.getElementById("list-wayang-viewport");
  var track = document.getElementById("list-wayang-track");
  var intro = document.getElementById("list-wayang-intro");
  if (!section || !viewport || !track || !intro) return;

  var group = track.querySelector(".lw-group");
  if (!group) return;
  var realCards = group.querySelectorAll(".lw-card");
  if (realCards.length < 2) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    viewport.classList.add("lw-static");
    return;
  }

  section.classList.add("lw-js");
  viewport.classList.add("lw-hidden");

  var BASE_SPEED = 40; 

  var current = 0; 
  var step = 0;   

  var autoSpeed = 0;
  var targetAuto = 0; 
  var frozen = true;   
  var rowShown = false;

  var hovered = false;
  var dragging = false;
  var viewportVisible = true;

  var dragLastX = 0;

  var REVEAL_COUNT = Math.min(5, realCards.length);
  var REVEAL_DELAYS = [0, 0.5, 1.0, 1.3, 1.7];  
  var REVEAL_DURATIONS = [0.45, 0.45, 0.45, 0.22, 0.45]; 
  var SPREAD_DELAY = 0.07;
  var INTRO_LEAD = 350; 
  var HOLD = 450;

  function measureStep() {
    if (group.children.length > 1) {
      step =
        group.children[1].offsetLeft - group.children[0].offsetLeft;
    }
  }

  function normalize() {
    if (step < 1) return;
    while (current >= step && group.firstElementChild) {
      group.appendChild(group.firstElementChild);
      current -= step;
    }
    while (current < 0 && group.lastElementChild) {
      group.insertBefore(group.lastElementChild, group.firstElementChild);
      current += step;                           
    }
  }

  measureStep();
  window.addEventListener("resize", measureStep, { passive: true });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        viewportVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    ).observe(viewport);
  }

  var introPlaying = false;

  function setInitial(clone) {
    clone.style.opacity = "0";
    clone.style.transform = "scale(0.18)";
  }

  function buildDeck() {
    var deck = document.createElement("div");
    deck.className = "lw-deck";
    for (var i = 0; i < realCards.length; i++) {
      var clone = realCards[i].cloneNode(true);
      clone.removeAttribute("id");
      if (i !== 0) {
        clone.style.position = "absolute";
        clone.style.top = "0";
        clone.style.left = "0";
        clone.style.width = "100%";
      }
      setInitial(clone);
      deck.appendChild(clone);
    }
    intro.appendChild(deck);
    return deck;
  }

  function runBuild(deck) {
    var clones = deck.children;
    var n = Math.min(REVEAL_COUNT, clones.length);
    for (var i = 0; i < clones.length; i++) {
      if (i >= n) continue;
      clones[i].style.transitionDelay = (REVEAL_DELAYS[i] || 0.5 * i) + "s";
      clones[i].style.transitionDuration = (REVEAL_DURATIONS[i] || 0.45) + "s";
      clones[i].style.opacity = "1";
      clones[i].style.transform = "scale(1)";
    }
    var last = n - 1;
    var end =
      (REVEAL_DELAYS[last] || 0.5 * last) +
      (REVEAL_DURATIONS[last] || 0.45);
    return end * 1000 + 250;
  }

  function runSpread(deck) {
    var clones = deck.children;

    section.classList.add("lw-labels-on");
    for (var j = 0; j < clones.length; j++) {
      var label = clones[j].querySelector(".lw-label");
      if (label) label.style.opacity = "1";
    }

    track.style.transform = "translate3d(0,0,0)";
    var deckRect = deck.getBoundingClientRect();

    requestAnimationFrame(function () {
      for (var i = 0; i < clones.length; i++) {
        var targetRect = realCards[i].getBoundingClientRect();
        var dx =
          targetRect.left + targetRect.width / 2 -
          (deckRect.left + deckRect.width / 2);
        var dy =
          targetRect.top + targetRect.height / 2 -
          (deckRect.top + deckRect.height / 2);
        clones[i].style.transition =
          "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease";
        clones[i].style.transitionDelay = i * SPREAD_DELAY + "s";
        clones[i].style.transform =
          "translate3d(" + Math.round(dx) + "px," + Math.round(dy) + "px,0)";
        clones[i].style.opacity = "1";
      }
    });
    return clones.length * SPREAD_DELAY * 1000 + 950;
  }

  function handover() {
    intro.style.display = "none";
    viewport.classList.remove("lw-hidden");
    section.classList.add("lw-started"); 

    rowShown = true;
    frozen = false;       
    targetAuto = hovered && !dragging ? 0 : BASE_SPEED;
  }

  function startIntro() {
    if (introPlaying) return;
    introPlaying = true;

    frozen = true;
    current = 0;
    normalize();
    track.style.transform = "translate3d(0,0,0)";

    window.setTimeout(function () {
      var deck = buildDeck();
      void deck.offsetWidth;

      var buildMs = runBuild(deck);
      window.setTimeout(function () {
        window.setTimeout(function () {
          var spreadMs = runSpread(deck);
          window.setTimeout(handover, spreadMs);
        }, HOLD);
      }, buildMs);
    }, INTRO_LEAD);
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries, obs) {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        startIntro();
      },
      { threshold: 0.35 }
    ).observe(section);
  } else {
    startIntro();
  }


  viewport.addEventListener("mouseenter", function () {
    hovered = true;
    if (!frozen && !dragging) targetAuto = 0;
  });
  viewport.addEventListener("mouseleave", function () {
    hovered = false;
    if (!frozen && !dragging) targetAuto = BASE_SPEED;
  });

  viewport.addEventListener("pointerdown", function (e) {
    if (!rowShown || frozen || dragging) return;
    if (e.button !== undefined && e.button !== 0) return; 
    dragging = true;
    targetAuto = 0;
    autoSpeed = 0;
    dragLastX = e.clientX;
    viewport.classList.add("is-dragging");
    if (viewport.setPointerCapture) {
      try {
        viewport.setPointerCapture(e.pointerId);
      } catch (err) {
        
      }
    }
  });

  viewport.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    current -= e.clientX - dragLastX;
    dragLastX = e.clientX;
    normalize();
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove("is-dragging");
    targetAuto = hovered ? 0 : BASE_SPEED;
  }
  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);

  track.addEventListener("dragstart", function (e) {
    e.preventDefault();
  });

  var prev = performance.now();
  function tick(now) {
    requestAnimationFrame(tick);
    if (!viewportVisible) {
      prev = now;
      return;
    }

    var dt = Math.min((now - prev) / 1000, 0.05); 
    prev = now;

    if (frozen) return;

    autoSpeed += (targetAuto - autoSpeed) * Math.min(1, dt * 5);
    current += autoSpeed * dt;

    normalize();
    track.style.transform = "translate3d(" + -current + "px,0,0)";
  }

  requestAnimationFrame(tick);
})();
