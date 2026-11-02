
document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.getElementById("footer-giant");
  if (!h1) return;

  const text = h1.textContent.replace(/\s+/g, " ").trim();
  h1.textContent = "";

  Array.from(text).forEach((ch, i) => {
    const s = document.createElement("span");
    s.className = "fg-letter";
    s.setAttribute("aria-hidden", "true"); 
    s.style.setProperty("--i", i);
    if (ch === " ") s.innerHTML = "&nbsp;";
    else s.textContent = ch;
    h1.appendChild(s);
  });

  h1.style.setProperty("--n", text.length);


  let reverse = false;         
  let lastEnterReverse = false; 

  h1.addEventListener("mouseenter", () => {
    lastEnterReverse = reverse;
    h1.classList.toggle("fg-out", reverse);
    reverse = !reverse; 
  });

  
  h1.addEventListener("mouseleave", () => {
    h1.classList.toggle("fg-out", !lastEnterReverse);
  });
});
