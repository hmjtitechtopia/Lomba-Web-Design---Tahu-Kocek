document.addEventListener("DOMContentLoaded", () => {
  let isExpanded = false;
  let selectedIndex = null;

  const section = document.getElementById("ragam-jenis");
  if (!section) return;

  const cards = [...section.querySelectorAll(".card-item")];
  const backBtns = [...section.querySelectorAll(".back-btn")];

  if (cards.length === 0) return;

  function toggleClasses(element, add = [], remove = []) {
    if (!element) return;
    element.classList.remove(...remove);
    element.classList.add(...add);
  }

  function showDetailControls() {
    backBtns.forEach((btn) => {
      toggleClasses(
        btn,
        ["opacity-100", "translate-x-0"],
        ["opacity-0", "pointer-events-none", "-translate-x-4"],
      );
      btn.style.pointerEvents = "auto";
    });
  }

  function hideDetailControls() {
    backBtns.forEach((btn) => {
      toggleClasses(
        btn,
        ["opacity-0", "pointer-events-none", "-translate-x-4"],
        ["opacity-100", "translate-x-0"],
      );
      btn.style.pointerEvents = "none";
    });
  }

  window.selectCard = function (index) {
    if (isExpanded) return;
    if (!Number.isInteger(index) || index < 0 || index >= cards.length) {
      return;
    }

    isExpanded = true;
    selectedIndex = index;

    cards.forEach((card, i) => {
      const isSelected = i === index;

      card.style.flex = isSelected ? "1 1 100%" : "0 0 0%";
      card.style.minWidth = "0";
      card.style.opacity = isSelected ? "1" : "0";
      card.style.padding = isSelected ? "" : "0";
      card.style.margin = "0";
      card.style.borderWidth = isSelected ? "" : "0";
      card.style.pointerEvents = isSelected ? "auto" : "none";
      card.setAttribute("aria-hidden", String(!isSelected));

      if (isSelected) {
        card.classList.add("card-reveal-open");
      } else {
        card.classList.remove("card-reveal-open");
      }
    });

    showDetailControls();
  };

  window.closeDetail = function () {
    if (!isExpanded || selectedIndex === null) return;

    hideDetailControls();

    cards.forEach((card) => {
      card.style.flex = "";
      card.style.minWidth = "";
      card.style.opacity = "";
      card.style.padding = "";
      card.style.margin = "";
      card.style.borderWidth = "";
      card.style.pointerEvents = "";
      card.removeAttribute("aria-hidden");

      card.classList.remove("card-reveal-open");
    });

    isExpanded = false;
    selectedIndex = null;
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isExpanded) {
      window.closeDetail();
    }
  });
});

