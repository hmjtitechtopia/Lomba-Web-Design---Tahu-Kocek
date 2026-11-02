
document.addEventListener("DOMContentLoaded", () => {
  
  const header = document.getElementById("site-header");

  if (header) {
    const SCROLL_THRESHOLD = 40;
    const IDLE_DELAY = 300; 

    let idleTimer = null;

    const showHeader = () => header.classList.remove("header-hidden");

    const onScroll = () => {
      const isTop = window.scrollY <= SCROLL_THRESHOLD;
      
      const menuEl = document.getElementById("mobile-menu");
      const menuOpen = menuEl && !menuEl.classList.contains("hidden");

      
      header.classList.toggle("header-scrolled", !isTop);

      
      if (isTop || menuOpen) {
        idleTimer && clearTimeout(idleTimer);
        showHeader();
        return;
      }

    
      header.classList.add("header-hidden");

      idleTimer && clearTimeout(idleTimer);
      idleTimer = setTimeout(showHeader, IDLE_DELAY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const navToggleIcon = document.getElementById("nav-toggle-icon");

  if (navToggle && mobileMenu) {
    const setIcon = (isOpen) => {
      if (!navToggleIcon) return;
      navToggleIcon.className = isOpen
        ? "fa-solid fa-xmark text-lg"
        : "fa-solid fa-bars text-lg";
    };

    const closeMenu = () => {
      mobileMenu.classList.add("hidden");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Buka menu");
      setIcon(false);
    };

    navToggle.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");

      if (isOpen) {
        closeMenu();
      } else {
        mobileMenu.classList.remove("hidden");
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Tutup menu");
        setIcon(true);
      }
    });

   
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

   
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
  }
});
