const tabData = {
  tentang:
    "Wayang Kita adalah platform edukasi budaya yang memperkenalkan seni pewayangan Nusantara melalui pembelajaran menarik dan interaktif. Kami hadir untuk mengenalkan cerita, tokoh, serta nilai luhur wayang sekaligus melestarikan warisan budaya Indonesia.",
  visi: "Menjadi pusat edukasi dan pelestarian seni wayang yang inovatif, inspiratif, serta mampu menumbuhkan kecintaan generasi muda terhadap budaya Nusantara.",
  misi: "Menjadi platform edukasi budaya wayang yang interaktif, inovatif, dan inspiratif dalam melestarikan warisan budaya Nusantara serta menanamkan nilai-nilai moral, etika, dan kearifan lokal untuk membentuk karakter bangsa.",
};

function changeTab(tabName, clickedElement) {
  const descElement = document.getElementById("tab-desc");
  descElement.style.opacity = "0";

  setTimeout(() => {
    descElement.innerText = tabData[tabName];
    descElement.style.opacity = "1";
  }, 150);

  const allTabs = document.querySelectorAll(".tab-btn");
  allTabs.forEach((tab) => {
    tab.classList.remove("text-marun", "border-marun");
    tab.classList.add("text-gray-400", "border-transparent");
  });

  clickedElement.classList.remove("text-gray-400", "border-transparent");
  clickedElement.classList.add("text-marun", "border-brand-orange");
}

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".step-content");
  const navLinks = document.querySelectorAll(".sidebar-link");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("text-black", "font-medium");
        });

        const targetId = entry.target.getAttribute("id");
        const activeLink = document.querySelector(
          `.sidebar-link[data-target="${targetId}"]`,
        );
        if (activeLink) {
          activeLink.classList.add("text-black", "font-medium");
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
});
