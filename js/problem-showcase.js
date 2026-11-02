
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("masalah-showcase");
  if (!root) return;

  const panel   = document.getElementById("masalah-panel");
  const photos  = Array.from(root.querySelectorAll(".ps-photo"));
  const slides  = Array.from(root.querySelectorAll(".ps-slide"));
  const tabs    = Array.from(root.querySelectorAll(".ps-tab"));
  const tablist = root.querySelector('[role="tablist"]');

  const SLIDE_MS = 6000; 
  const reduced  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let current  = 0;
  let timer    = null;
  let remaining = SLIDE_MS;
  let startedAt = 0;
  let started   = false; 
  
  const paint = (i) => {
    photos.forEach((el, k) => el.classList.toggle("is-active", k === i));
    slides.forEach((el, k) => {
      el.classList.toggle("is-active", k === i);
      el.setAttribute("aria-hidden", k === i ? "false" : "true");
    });
    tabs.forEach((el, k) => {
      el.setAttribute("aria-selected", k === i ? "true" : "false");
      el.setAttribute("tabindex", k === i ? "0" : "-1");
    });
    if (panel) panel.style.backgroundColor = `var(--ps-bg-${i + 1})`;
  };

 
  const armTimer = () => {
    clearTimeout(timer);
    if (reduced || !started) return;
    root.dataset.running = "true";
    startedAt = performance.now();
    timer = setTimeout(() => go(current + 1), remaining);
  };

  const go = (i) => {
    current = (i + tabs.length) % tabs.length;
    remaining = SLIDE_MS;
    paint(current);
    armTimer();
  };

  
  const pause = () => {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
    remaining -= performance.now() - startedAt;
    if (remaining < 200) remaining = 200;
    root.classList.add("ps-paused");      
  };

  const resume = () => {
    if (!started || reduced) return;
    root.classList.remove("ps-paused");
    armTimer();
  };

  
  tabs.forEach((el) => {
    el.addEventListener("click", () => {
      clearTimeout(timer);
      timer = null;
      root.classList.remove("ps-paused");
      go(Number(el.dataset.index));
    });
  });

  
  tablist?.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (current + dir + tabs.length) % tabs.length;
    tabs[next].click();
    tabs[next].focus();
  });

  root.addEventListener("pointerenter", pause);
  root.addEventListener("pointerleave", resume);
  root.addEventListener("mouseleave", resume);

  
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        paint(0);
        armTimer();
        if (reduced) root.dataset.running = "false"; 
        io.disconnect();
      }
    });
  }, { threshold: 0.35 });

  io.observe(root);
});
