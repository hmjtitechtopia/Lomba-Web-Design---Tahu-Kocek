
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll("#faq .faq-item");

  if (!items.length) return;

  const setOpen = (item, open) => {
    item.dataset.open = open ? "true" : "false";
    item.querySelector(".faq-q").setAttribute("aria-expanded", open ? "true" : "false");
    item.querySelector(".faq-a").setAttribute("aria-hidden", open ? "false" : "true");
  };

  items.forEach((item) => {
    const trigger = item.querySelector(".faq-q");
    trigger.addEventListener("click", () => {
      const isOpen = item.dataset.open === "true";

      items.forEach((other) => setOpen(other, false));

      if (!isOpen) setOpen(item, true);
    });
  });
});
