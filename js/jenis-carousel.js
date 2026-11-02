
document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("ragam-jenis-viewport");
  const track = document.getElementById("ragam-jenis-track");

  if (!viewport || !track) return;


  const originalCards = Array.from(track.querySelectorAll(".ragam-jenis-card"));

  const totalCards = originalCards.length;

  if (totalCards < 2) return;

  viewport.style.perspective = "1500px";
  viewport.style.perspectiveOrigin = "50% 50%";

  track.style.transformStyle = "preserve-3d";
  track.style.position = "relative";

  function setCardGap() {
    track.style.columnGap = window.innerWidth <= 640 ? "32px" : "56px";
  }

  setCardGap();

  const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

  function trackTransition(chained) {
    return chained
      ? "transform 500ms linear"
      : `transform 600ms ${EASE}`;
  }

  function cardTransition(chained) {
    return chained
      ? "transform 500ms linear, " +
        "opacity 400ms ease, " +
        "background-color 500ms linear, " +
        "border-color 500ms linear"
      : `transform 600ms ${EASE}, ` +
        "opacity 400ms ease, " +
        `background-color 600ms ${EASE}, ` +
        `border-color 600ms ${EASE}, ` +
        "filter 200ms ease";
  }

  const lastClone = originalCards[totalCards - 1].cloneNode(true);
  const firstClone = originalCards[0].cloneNode(true);

  lastClone.setAttribute("aria-hidden", "true");
  firstClone.setAttribute("aria-hidden", "true");

  track.prepend(lastClone);
  track.append(firstClone);

  const cards = Array.from(track.querySelectorAll(".ragam-jenis-card"));

  let activeIndex = 1;
  let isAnimating = false;
  let resizeFrame = null;


  function updateCarousel(animate = true, chained = false) {
    const activeCard = cards[activeIndex];

    if (!activeCard) return;

    const isMobile = window.innerWidth <= 640;

    const angle = isMobile ? 24 : 38;
    const depthStep = isMobile ? 65 : 95;

    cards.forEach((card, index) => {
      const distance = index - activeIndex;
      const distanceFromCenter = Math.abs(distance);
      const isActive = distance === 0;

      if (isActive) {
        card.style.transform = "translateZ(0px) rotateY(0deg) scale(1)";

        card.style.transformOrigin = "center center";
      } else {
        const rotation = distance < 0 ? angle : -angle;
        const depth = Math.min(distanceFromCenter * depthStep, 320);
        const scale = Math.max(
          isMobile ? 0.6 : 0.55,
          0.76 - (distanceFromCenter - 1) * 0.075,
        );

        card.style.transform =
          `translateZ(-${depth}px) ` +
          `rotateY(${rotation}deg) ` +
          `scale(${scale})`;
        card.style.transformOrigin =
          distance < 0 ? "right center" : "left center";
      }

      card.style.opacity = isActive
        ? "1"
        : Math.max(0.35, 0.76 - distanceFromCenter * 0.09);

      card.style.backgroundColor = isActive ? "#3F0D12" : "#fdfaf5";

      card.style.borderColor = isActive ? "#3F0D12" : "#eee4d8";

      card.style.boxShadow = "none";

      card.style.cursor = isActive ? "default" : "pointer";

      const cardTitle = card.querySelector("h3");
      const cardParas = card.querySelectorAll("p");

      if (cardTitle) {
        cardTitle.style.color = isActive ? "#F1F0CC" : "";
      }

      cardParas.forEach((p, i) => {
        p.style.color = isActive
          ? i === 0
            ? "#D5BF86"
            : "rgba(241, 240, 204, 0.75)"
          : "";
      });

      card.style.zIndex = String(20 - distanceFromCenter);

      card.style.backfaceVisibility = "hidden";

      card.style.transition = animate ? cardTransition(chained) : "none";

      if (!card.hasAttribute("aria-hidden")) {
        card.setAttribute("aria-current", isActive ? "true" : "false");
      }
    });
    const viewportCenter = viewport.clientWidth / 2;

    const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;

    const translateX = viewportCenter - cardCenter;

    track.style.transition = animate ? trackTransition(chained) : "none";

    track.style.transform = `translate3d(${translateX}px, 0, 0)`;

    if (!animate) {
      track.getBoundingClientRect();

      requestAnimationFrame(() => {
        track.style.transition = trackTransition(chained);

        cards.forEach((card) => {
          card.style.transition = cardTransition(chained);
        });
      });
    }
  }

  let pendingSteps = 0;
  let pendingDir = 0;

  function goTo(index) {
    if (index < 0 || index >= cards.length) return;

    if (isAnimating || index === activeIndex) {
      if (index === activeIndex) {
        return;
      }

      const dir = index > activeIndex ? 1 : -1;

      if (dir !== pendingDir) {
        pendingDir = dir;
        pendingSteps = 0;
      }

      pendingSteps += 1;
      return;
    }

    activeIndex = index;
    isAnimating = true;

    updateCarousel(true, pendingSteps > 0);
  }

  cards.forEach((card, index) => {
    card.addEventListener("click", () => goTo(index));
  });

  track.addEventListener("transitionend", (event) => {
    if (event.target !== track || event.propertyName !== "transform") {
      return;
    }

    let snapped = false;

    if (activeIndex === 0) {
      activeIndex = totalCards;
      snapped = true;
    }

    else if (activeIndex === totalCards + 1) {
      activeIndex = 1;
      snapped = true;
    }

    if (snapped) {
      updateCarousel(false);
    }

    isAnimating = false;

    if (pendingSteps > 0) {
      pendingSteps -= 1;

      const next = activeIndex + pendingDir;

      if (next >= 0 && next < cards.length) {
        activeIndex = next;
        isAnimating = true;
        updateCarousel(true, pendingSteps > 0);
      } else {
        pendingSteps = 0;
      }
    }
  });


  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  });
  function handleResize() {
    if (resizeFrame !== null) {
      cancelAnimationFrame(resizeFrame);
    }

    resizeFrame = requestAnimationFrame(() => {
      setCardGap();
      updateCarousel(false);
      resizeFrame = null;
    });
  }

  window.addEventListener("resize", handleResize);

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(handleResize);
    observer.observe(viewport);
  }

  updateCarousel(false);
});
