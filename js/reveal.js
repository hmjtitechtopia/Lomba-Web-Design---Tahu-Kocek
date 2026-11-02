
(function () {
  "use strict";

  var groups = document.querySelectorAll("[data-reveal-group]");
  if (groups.length === 0) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  for (var i = 0; i < groups.length; i++) {
    groups[i].classList.add("rw-hide");
  }

  function splitWords(root) {
    if (root.nodeType !== 1) return;
    var nodes = Array.prototype.slice.call(root.childNodes);
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType === 3) {
        if (!node.nodeValue.trim()) continue;
        var frag = document.createDocumentFragment();
        var bagian = node.nodeValue.split(/(\s+)/);
        for (var j = 0; j < bagian.length; j++) {
          if (!bagian[j]) continue;
          if (/^\s+$/.test(bagian[j])) {
            frag.appendChild(document.createTextNode(bagian[j]));
          } else {
            var kata = document.createElement("span");
            kata.className = "rw-word";
            kata.textContent = bagian[j];
            frag.appendChild(kata);
          }
        }
        root.replaceChild(frag, node);
      } else if (node.nodeType === 1 && node.tagName !== "BR") {
        splitWords(node); 
      }
    }
  }

  var titles = document.querySelectorAll("[data-reveal-words]");
  for (var t = 0; t < titles.length; t++) {
    splitWords(titles[t]);
    var kata2 = titles[t].querySelectorAll(".rw-word");
    for (var w = 0; w < kata2.length; w++) {
      kata2[w].style.transitionDelay = (w * 0.07) + "s";
    }
  }

  var observer = new IntersectionObserver(
    function (entries) {
      for (var k = 0; k < entries.length; k++) {
        if (entries[k].isIntersecting) {
          entries[k].target.classList.add("is-revealed");
        } else {
          entries[k].target.classList.remove("is-revealed");
        }
      }
    },
    { rootMargin: "0px 0px -25% 0px" }
  );

  for (var g = 0; g < groups.length; g++) {
    observer.observe(groups[g]);
  }
})();
