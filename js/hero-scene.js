
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const layers = hero.querySelectorAll(".hero-layer[data-depth]");
  if (!layers.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  if (reduceMotion.matches || !finePointer.matches) return;

  const MAX_OFFSET_X = 26;
  const MAX_OFFSET_Y = 18;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  const tick = () => {
    currentX += (targetX - currentX) * 0.07;
    currentY += (targetY - currentY) * 0.07;

    layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth) || 0;
      const x = currentX * depth * MAX_OFFSET_X;
      const y = currentY * depth * MAX_OFFSET_Y;
      layer.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(
        2
      )}px, 0)`;
    });

    const settled =
      Math.abs(currentX - targetX) < 0.005 &&
      Math.abs(currentY - targetY) < 0.005;

    if (settled) {
      currentX = targetX;
      currentY = targetY;
      rafId = null;
      return;
    }

    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (rafId === null) rafId = requestAnimationFrame(tick);
  };

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    // Normalisasi ke rentang -1..1 dari tengah hero
    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    start();
  });

  hero.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
    start();
  });
});
