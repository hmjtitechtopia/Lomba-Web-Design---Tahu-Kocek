const transition = document.getElementById("transition");
const number = document.getElementById("number");
const progressBar = document.getElementById("progress-bar");

const panels = transition.querySelectorAll(".panel");
const lastPanel = panels[panels.length - 1];

const loadingDuration = 2500;
let startTime;

// Mulai loading
function startLoading() {
  startTime = performance.now();
  requestAnimationFrame(updateLoading);
}

// Hitung persentase dari 0 hingga 100
function updateLoading(currentTime) {
  const elapsed = currentTime - startTime;
  const progress = Math.min(elapsed / loadingDuration, 1);

  // Efek easing
  const easedProgress = 1 - Math.pow(1 - progress, 3);
  const percentage = Math.floor(easedProgress * 100);

  number.textContent = percentage;
  progressBar.style.width = percentage + "%";

  if (progress < 1) {
    requestAnimationFrame(updateLoading);
  } else {
    number.textContent = "100";
    progressBar.style.width = "100%";

    // Mulai animasi keluar
    setTimeout(() => {
      transition.classList.add("exit");

      transition.querySelectorAll(".panel").forEach((panel, index) => {
        panel.style.animation =
          "panelExit 0.9s cubic-bezier(0.76, 0, 0.24, 1) forwards";
        panel.style.animationDelay = `${index * 0.12}s`;
      });

      document.getElementById("loading").style.animation =
        "loadingExit 0.25s ease forwards";
    }, 250);
  }
}

// Tutup overlay setelah panel terakhir selesai
lastPanel.addEventListener("animationend", (event) => {
  if (event.animationName === "panelExit") {
    transition.classList.add("invisible", "pointer-events-none");
    document.body.classList.remove("overflow-hidden");
  }
});

window.addEventListener("load", startLoading);
