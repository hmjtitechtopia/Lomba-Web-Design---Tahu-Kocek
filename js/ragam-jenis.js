document.addEventListener("DOMContentLoaded", () => {
  let isExpanded = false;
  let selectedIndex = null;

  const cards = document.querySelectorAll("#ragam-jenis .card-item");
  const brandLogo = document.getElementById("brand-logo");
  const backBtn = document.getElementById("back-btn");
  const detailCta = document.getElementById("detail-cta");

  cards.forEach((card) => {
    const bg = card.querySelector(".card-bg");

    card.addEventListener("mouseenter", () => {
      if (!isExpanded) {
        bg.classList.remove("opacity-0");
        bg.classList.add("opacity-100");
      }
    });

    card.addEventListener("mouseleave", () => {
      if (!isExpanded) {
        bg.classList.remove("opacity-100");
        bg.classList.add("opacity-0");
      }
    });
  });

  window.selectCard = function (index) {
    if (isExpanded) return;
    isExpanded = true;
    selectedIndex = index;

    const selectedCard = cards[index];

    cards.forEach((card, i) => {
      if (i !== index) {
        card.style.flex = "0.0001";
        card.style.padding = "0";
        card.style.margin = "0";
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
        card.style.border = "none";
      }
    });

    selectedCard.style.flex = "100";
    selectedCard.classList.remove("hover:flex-[1.6]");

    const bg = selectedCard.querySelector(".card-bg");
    bg.classList.remove("opacity-0");
    bg.classList.add("opacity-100");

    brandLogo.classList.remove("text-[#3F0D12]");
    brandLogo.classList.add("text-[#F1F0CC]");

    const title = selectedCard.querySelector(".card-title");
    const subtext = selectedCard.querySelector(".card-subtext");
    const number = selectedCard.querySelector(".card-number");
    const giantText = selectedCard.querySelector(".giant-text");
    const imageContainer = selectedCard.querySelector(".image-container");
    const img = selectedCard.querySelector(".product-img");
    const cardBtn = selectedCard.querySelector(".card-btn");

    title.classList.remove("text-[#3F0D12]", "group-hover:text-[#F1F0CC]");
    title.classList.add("text-4xl", "sm:text-5xl", "text-[#F1F0CC]");

    subtext.classList.remove("text-[#8D775F]", "group-hover:text-[#F1F0CC]/80");
    subtext.classList.add("text-sm", "text-[#D5BF86]");

    number.classList.remove("text-[#8D775F]", "group-hover:text-[#A71D31]");
    number.classList.add("text-[#A71D31]");

    giantText.classList.remove("opacity-0", "pointer-events-none", "scale-90");
    giantText.classList.add("opacity-100", "scale-100");

    imageContainer.classList.remove("h-44", "sm:h-60");
    imageContainer.classList.add("h-72", "sm:h-[380px]");
    img.classList.remove("opacity-0");
    img.classList.add("opacity-100", "scale-110");

    cardBtn.style.opacity = "0";
    cardBtn.style.pointerEvents = "none";

    backBtn.classList.remove(
      "opacity-0",
      "pointer-events-none",
      "-translate-x-4",
    );
    backBtn.classList.add("opacity-100", "translate-x-0");

    detailCta.classList.remove(
      "opacity-0",
      "pointer-events-none",
      "translate-y-6",
    );
    detailCta.classList.add("opacity-100", "translate-y-0");
  };

  window.closeDetail = function () {
    if (!isExpanded || selectedIndex === null) return;

    const selectedCard = cards[selectedIndex];

    backBtn.classList.add("opacity-0", "pointer-events-none", "-translate-x-4");
    backBtn.classList.remove("opacity-100", "translate-x-0");

    detailCta.classList.add(
      "opacity-0",
      "pointer-events-none",
      "translate-y-6",
    );
    detailCta.classList.remove("opacity-100", "translate-y-0");

    brandLogo.classList.remove("text-[#F1F0CC]");
    brandLogo.classList.add("text-[#3F0D12]");

    const bg = selectedCard.querySelector(".card-bg");
    bg.classList.add("opacity-0");
    bg.classList.remove("opacity-100");

    const title = selectedCard.querySelector(".card-title");
    const subtext = selectedCard.querySelector(".card-subtext");
    const number = selectedCard.querySelector(".card-number");
    const giantText = selectedCard.querySelector(".giant-text");
    const imageContainer = selectedCard.querySelector(".image-container");
    const img = selectedCard.querySelector(".product-img");
    const cardBtn = selectedCard.querySelector(".card-btn");

    title.classList.remove("text-4xl", "sm:text-5xl", "text-[#F1F0CC]");
    title.classList.add("text-[#3F0D12]");

    subtext.classList.remove("text-sm", "text-[#D5BF86]");
    subtext.classList.add("text-[#8D775F]");

    number.classList.remove("text-[#A71D31]");
    number.classList.add("text-[#8D775F]");

    giantText.classList.add("opacity-0", "pointer-events-none", "scale-90");
    giantText.classList.remove("opacity-100", "scale-100");

    imageContainer.classList.add("h-44", "sm:h-60");
    imageContainer.classList.remove("h-72", "sm:h-[380px]");
    img.classList.add("opacity-0");
    img.classList.remove("opacity-100", "scale-110");

    cardBtn.style.opacity = "1";
    cardBtn.style.pointerEvents = "auto";

    cards.forEach((card) => {
      card.style.flex = "1";
      card.style.padding = "";
      card.style.margin = "";
      card.style.opacity = "1";
      card.style.pointerEvents = "auto";
      card.style.border = "";
      card.classList.add("hover:flex-[1.6]");
    });

    isExpanded = false;
    selectedIndex = null;
  };
});

document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("ragam-jenis-viewport");
  const track = document.getElementById("ragam-jenis-track");
  const prevButton = document.getElementById("ragam-jenis-prev");
  const nextButton = document.getElementById("ragam-jenis-next");

  if (!viewport || !track || !prevButton || !nextButton) return;

  // ==========================================
  // KARTU ASLI
  // ==========================================

  const originalCards = Array.from(track.querySelectorAll(".ragam-jenis-card"));

  const totalCards = originalCards.length;

  if (totalCards < 2) return;

  // ==========================================
  // PENGATURAN PERSPEKTIF DAN JARAK
  // ==========================================

  viewport.style.perspective = "1500px";
  viewport.style.perspectiveOrigin = "50% 50%";

  track.style.transformStyle = "preserve-3d";
  track.style.position = "relative";

  // Jarak antar kartu dibuat lebih renggang.
  function setCardGap() {
    track.style.columnGap = window.innerWidth <= 640 ? "32px" : "56px";
  }

  setCardGap();

  const TRACK_TRANSITION = "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)";

  const CARD_TRANSITION =
    "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), " +
    "opacity 400ms ease, " +
    "background-color 400ms ease, " +
    "border-color 400ms ease";

  // ==========================================
  // INFINITE LOOP
  // ==========================================

  const lastClone = originalCards[totalCards - 1].cloneNode(true);
  const firstClone = originalCards[0].cloneNode(true);

  lastClone.setAttribute("aria-hidden", "true");
  firstClone.setAttribute("aria-hidden", "true");

  track.prepend(lastClone);
  track.append(firstClone);

  const cards = Array.from(track.querySelectorAll(".ragam-jenis-card"));

  // Wayang 1 menjadi kartu aktif pertama.
  let activeIndex = 1;
  let isAnimating = false;
  let resizeFrame = null;

  // ==========================================
  // UPDATE CAROUSEL 3D
  // ==========================================

  function updateCarousel(animate = true) {
    const activeCard = cards[activeIndex];

    if (!activeCard) return;

    const isMobile = window.innerWidth <= 640;

    // Atur lengkungan kartu.
    const angle = isMobile ? 24 : 38;
    const depthStep = isMobile ? 65 : 95;

    cards.forEach((card, index) => {
      const distance = index - activeIndex;
      const distanceFromCenter = Math.abs(distance);
      const isActive = distance === 0;

      if (isActive) {
        // Kartu tengah menghadap lurus.
        card.style.transform = "translateZ(0px) rotateY(0deg) scale(1)";

        card.style.transformOrigin = "center center";
      } else {
        // Arah rotasi dibalik dari versi sebelumnya.
        // Kartu kiri dan kanan kini miring ke arah tengah.
        const rotation = distance < 0 ? angle : -angle;

        // Kartu di sisi luar semakin menjauh ke belakang.
        const depth = Math.min(distanceFromCenter * depthStep, 320);

        // Kartu tengah lebih besar daripada kartu samping.
        const scale = Math.max(
          isMobile ? 0.6 : 0.55,
          0.76 - (distanceFromCenter - 1) * 0.075,
        );

        card.style.transform =
          `translateZ(-${depth}px) ` +
          `rotateY(${rotation}deg) ` +
          `scale(${scale})`;

        // Poros rotasi berada pada sisi dalam kartu.
        card.style.transformOrigin =
          distance < 0 ? "right center" : "left center";
      }

      // Transparansi kartu yang jauh dari tengah.
      card.style.opacity = isActive
        ? "1"
        : Math.max(0.35, 0.76 - distanceFromCenter * 0.09);

      card.style.backgroundColor = isActive ? "#d6d4d1" : "#fdfaf5";

      card.style.borderColor = isActive ? "#d6d4d1" : "#eee4d8";

      card.style.zIndex = String(20 - distanceFromCenter);

      card.style.backfaceVisibility = "hidden";

      card.style.transition = animate ? CARD_TRANSITION : "none";

      if (!card.hasAttribute("aria-hidden")) {
        card.setAttribute("aria-current", isActive ? "true" : "false");
      }
    });

    // ==========================================
    // POSISIKAN KARTU AKTIF DI TENGAH
    // ==========================================

    const viewportCenter = viewport.clientWidth / 2;

    const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;

    const translateX = viewportCenter - cardCenter;

    track.style.transition = animate ? TRACK_TRANSITION : "none";

    track.style.transform = `translate3d(${translateX}px, 0, 0)`;

    if (!animate) {
      track.getBoundingClientRect();

      requestAnimationFrame(() => {
        track.style.transition = TRACK_TRANSITION;

        cards.forEach((card) => {
          card.style.transition = CARD_TRANSITION;
        });
      });
    }
  }

  // ==========================================
  // NAVIGASI PANAH
  // ==========================================

  function goTo(index) {
    if (isAnimating) return;
    if (index < 0 || index >= cards.length) return;

    activeIndex = index;
    isAnimating = true;

    updateCarousel(true);
  }

  prevButton.addEventListener("click", () => {
    goTo(activeIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    goTo(activeIndex + 1);
  });

  // ==========================================
  // INFINITE LOOP
  // ==========================================

  track.addEventListener("transitionend", (event) => {
    if (event.target !== track || event.propertyName !== "transform") {
      return;
    }

    isAnimating = false;

    // Clone Wayang 7 -> Wayang 7 asli.
    if (activeIndex === 0) {
      activeIndex = totalCards;
      updateCarousel(false);
    }

    // Clone Wayang 1 -> Wayang 1 asli.
    else if (activeIndex === totalCards + 1) {
      activeIndex = 1;
      updateCarousel(false);
    }
  });

  // ==========================================
  // NAVIGASI KEYBOARD
  // ==========================================

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

  // ==========================================
  // RESPONSIVE
  // ==========================================

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

  // ==========================================
  // POSISI AWAL
  // ==========================================

  updateCarousel(false);
});
