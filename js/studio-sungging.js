(() => {
  "use strict";

  const canvas = document.getElementById("studio-canvas");
  const ctx = canvas.getContext("2d");
  const wrap = document.getElementById("canvas-wrap");
  const underlay = document.getElementById("underlay");
  const miniTools = document.getElementById("mini-tools");
  const fullToolbar = document.getElementById("full-toolbar");
  const swatchRow = document.getElementById("swatch-row");
  const pigmentInput = document.getElementById("pigment-input");
  const brushSize = document.getElementById("brush-size");
  const brushSizeFull = document.getElementById("brush-size-full");
  const brushValue = document.getElementById("brush-size-value");
  const brushDot = document.getElementById("brush-dot");
  const konturList = document.getElementById("kontur-list");
  const btnFree = document.getElementById("btn-free");
  const btnTemplate = document.getElementById("btn-template");
  const btnFull = document.getElementById("btn-full");
  const btnExitFull = document.getElementById("btn-exit-full");
  const toolbarActions = document.getElementById("toolbar-actions");
  const paletteMenu = document.getElementById("palette-menu");
  const toast = document.getElementById("toast");

  const PIGMEN = [
    { nama: "Kuning Prada", hex: "#D9A520" },
    { nama: "Merah Delima", hex: "#A71D31" },
    { nama: "Hitam Anget", hex: "#211D1B" },
    { nama: "Porth Putih", hex: "#FDFBF3" },
    { nama: "Hijau Endhog", hex: "#1E6B3C" },
    { nama: "Cokelat Kulit", hex: "#6B4423" },
  ];

  const TEMPLATES = {
    klasik: {
      label: "Prada Klasik",
      warna: ["#D9A520", "#A71D31", "#1E6B3C", "#FDFBF3"],
    },
    senja: {
      label: "Kayon Senja",
      warna: ["#D9A520", "#211D1B", "#6B4423", "#FDFBF3"],
    },
    riris: {
      label: "Udan Riris",
      warna: ["#1E6B3C", "#A71D31", "#D9A520", "#211D1B"],
    },
  };

  const state = {
    warna: PIGMEN[0].hex,
    ukuranKuas: 16,
    kontur: "gunungan",
    modeBebas: false,
    layarPenuh: false,
    menggambar: false,
  };

  let riwayat = [];

  const KONTUR = {
    gunungan: {
      src: "../asset/img/kontur/kontur-gunungan.png",
      alt: "Pola kontur Gunungan",
    },
    gatotkaca: {
      src: "../asset/img/kontur/kontur-gatotkaca.png",
      alt: "Pola kontur Raden Gatotkaca",
    },
    petruk: {
      src: "../asset/img/kontur/kontur-petruk-gareng.png",
      alt: "Pola kontur Petruk & Gareng",
    },
  };

  const renderKontur = (id) => {
    const k = KONTUR[id];
    underlay.innerHTML = "";
    const img = document.createElement("img");
    img.src = k.src;
    img.alt = k.alt;
    img.draggable = false;
    img.style.mixBlendMode = "multiply";
    img.style.userSelect = "none";
    img.onload = () => {
      const r = underlay.getBoundingClientRect();
      const skala = Math.min(
        (r.width * 0.9) / img.naturalWidth,
        (r.height * 0.9) / img.naturalHeight,
      );
      img.style.width = Math.round(img.naturalWidth * skala) + "px";
      img.style.height = Math.round(img.naturalHeight * skala) + "px";
    };
    underlay.appendChild(img);
  };

  const showToast = (pesan) => {
    toast.textContent = pesan;
    toast.classList.remove("opacity-0");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.add("opacity-0"), 2200);
  };

  const pilihPigmen = (p) => {
    state.warna = p.hex;
    pigmentInput.value = `${p.hex}  —  ${p.nama}`;
    [...swatchRow.children].forEach((b) => {
      const aktif = b.dataset.hex === p.hex;
      b.setAttribute("aria-pressed", String(aktif));
      b.classList.toggle("ring-2", aktif);
      b.classList.toggle("ring-[#A71D31]", aktif);
      b.classList.toggle("ring-offset-2", aktif);
      b.classList.toggle("ring-offset-[#FCF8ED]", aktif);
      b.classList.toggle("ring-1", !aktif);
      b.classList.toggle("ring-black/10", !aktif);
    });
  };

  const renderSwatch = () => {
    PIGMEN.forEach((p) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.title = `${p.nama} (${p.hex})`;
      btn.setAttribute("aria-label", `Pigmen ${p.nama}`);
      btn.dataset.hex = p.hex;
      btn.className =
        "swatch h-8 w-8 rounded-full shadow-sm transition-all duration-200 " +
        "hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A71D31]";
      btn.style.background = p.hex;
      btn.style.ringColor = "#A71D31";
      btn.style.boxShadow = "0 0 0 1px rgba(0,0,0,0.1)";
      btn.addEventListener("click", () => pilihPigmen(p));
      swatchRow.appendChild(btn);
    });
    pilihPigmen(PIGMEN[0]);
  };

  const aturKuas = (px) => {
    state.ukuranKuas = px;
    ctx.lineWidth = px;
    if (brushSize) brushSize.value = String(px);
    if (brushSizeFull) brushSizeFull.value = String(px);
    if (brushValue) brushValue.textContent = `${px} px`;
    if (brushDot) {
      const sisi = Math.max(3, Math.min(26, px));
      brushDot.style.width = `${sisi}px`;
      brushDot.style.height = `${sisi}px`;
    }
  };

  if (brushSize)
    brushSize.addEventListener("input", () =>
      aturKuas(Number(brushSize.value)),
    );
  if (brushSizeFull)
    brushSizeFull.addEventListener("input", () =>
      aturKuas(Number(brushSizeFull.value)),
    );

  const tandaiKonturAktif = (id) => {
    [...konturList.querySelectorAll(".kontur-btn")].forEach((b) => {
      const aktif = b.dataset.kontur === id;
      b.setAttribute("aria-pressed", String(aktif));
      b.classList.toggle("border-[#A71D31]/60", aktif);
      b.classList.toggle("bg-[#A71D31]/5", aktif);
      b.classList.toggle("text-[#A71D31]", aktif);
      b.classList.toggle("font-semibold", aktif);
      b.classList.toggle("border-[#E4D9C3]", !aktif);
      b.classList.toggle("bg-white", !aktif);
      b.classList.toggle("text-stone-600", !aktif);
      const ikon = b.querySelector("i");
      ikon.classList.toggle("opacity-70", aktif);
      ikon.classList.toggle("opacity-0", !aktif);
    });
  };

  const pilihKontur = (id) => {
    state.kontur = id;
    state.modeBebas = false;
    aturTombolBebas();
    tandaiKonturAktif(id);
    renderKontur(id);
    requestAnimationFrame(() => underlay.classList.remove("opacity-0"));
  };

  const hapusKontur = () => {
    state.kontur = null;
    [...konturList.querySelectorAll(".kontur-btn")].forEach((b) => {
      b.setAttribute("aria-pressed", "false");
      b.classList.add("border-[#E4D9C3]", "bg-white", "text-stone-600");
      b.classList.remove(
        "border-[#A71D31]/60",
        "bg-[#A71D31]/5",
        "text-[#A71D31]",
        "font-semibold",
      );
      b.querySelector("i").className =
        "fa-solid fa-chevron-down text-[10px] opacity-0";
    });
    underlay.classList.add("opacity-0");
    setTimeout(() => {
      if (!state.kontur) underlay.innerHTML = "";
    }, 500);
  };

  const aturTombolBebas = () => {
    btnFree.setAttribute("aria-pressed", String(state.modeBebas));
    btnFree.classList.toggle("bg-[#7d1421]", state.modeBebas);
    btnFree.classList.toggle("ring-2", state.modeBebas);
    btnFree.classList.toggle("ring-[#D9A520]", state.modeBebas);
    btnFree.classList.toggle("ring-offset-2", state.modeBebas);
    btnFree.classList.toggle("ring-offset-[#F1E9DA]", state.modeBebas);
  };

  const dpr = Math.max(1, window.devicePixelRatio || 1);
  let W = 0,
    H = 0;

  const sesuaikanKanvas = () => {
    const r = wrap.getBoundingClientRect();
    const snap = W && H ? canvas.toDataURL() : null;

    W = r.width;
    H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = state.ukuranKuas;

    if (snap) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, W, H);
      img.src = snap;
    }
  };

  const posisi = (e) => {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const kunciSnapshot = () => {
    riwayat.push(canvas.toDataURL());
    if (riwayat.length > 12) riwayat.shift();
  };

  const mulaiGores = (e) => {
    if (state.menggambar || (e.button && e.button !== 0)) return;
    state.menggambar = true;
    ctx.lineWidth = state.ukuranKuas;
    kunciSnapshot();
    const { x, y } = posisi(e);
    ctx.strokeStyle = state.warna;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 0.01, y + 0.01);
    ctx.stroke();
  };

  const lanjutGores = (e) => {
    if (!state.menggambar) return;
    e.preventDefault();
    const { x, y } = posisi(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const akhirGores = () => {
    state.menggambar = false;
  };

  const kembalikanGambar = (url) => {
    if (!url) return;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, 0, 0, W, H);
    };
    img.src = url;
  };

  const undo = () => {
    if (!riwayat.length) {
      showToast("Belum ada goresan untuk diurungkan");
      return;
    }
    kembalikanGambar(riwayat.pop());
  };

  const kanvasKosong = () => {
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 3; i < data.length; i += 4) if (data[i] !== 0) return false;
    return true;
  };

  const bersihkan = () => {
    if (kanvasKosong()) {
      showToast("Kanvas sudah bersih");
      return;
    }
    kunciSnapshot();
    ctx.clearRect(0, 0, W, H);
    showToast("Kanvas dibersihkan");
  };

  const aturTombolPenuh = () => {
    btnFull.setAttribute("aria-pressed", String(state.layarPenuh));
    btnFull.querySelector("i").className = state.layarPenuh
      ? "fa-solid fa-compress text-[11px]"
      : "fa-solid fa-expand text-[11px]";
    btnFull.querySelector("span").textContent = state.layarPenuh
      ? "Keluar Penuh"
      : "Layar Penuh";
  };

  const masukLayarPenuh = () => {
    state.layarPenuh = true;
    document.body.classList.add("studio-full");
    requestAnimationFrame(() => {
      fullToolbar.hidden = false;
      aturTombolPenuh();
      sesuaikanKanvas();
    });
    if (wrap.requestFullscreen) wrap.requestFullscreen().catch(() => {});
  };

  const keluarLayarPenuh = () => {
    state.layarPenuh = false;
    document.body.classList.remove("studio-full");
    fullToolbar.hidden = true;
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    requestAnimationFrame(() => {
      aturTombolPenuh();
      sesuaikanKanvas();
    });
  };

  const toggleLayarPenuh = () =>
    state.layarPenuh ? keluarLayarPenuh() : masukLayarPenuh();

  const toggleMenuTemplate = (tutup) => {
    const tampil = tutup === true ? false : paletteMenu.hidden;
    paletteMenu.hidden = !tampil;
    btnTemplate.setAttribute("aria-expanded", String(tampil));
  };

  const terapkanTemplate = (id) => {
    const t = TEMPLATES[id];
    const cocok = PIGMEN.find((p) => p.hex === t.warna[0]);
    pilihPigmen(cocok || { nama: t.label, hex: t.warna[0] });
    toggleMenuTemplate(true);
    showToast(`Template "${t.label}" diterapkan — mulai menggariswarnai!`);
  };

  konturList.addEventListener("click", (e) => {
    const btn = e.target.closest(".kontur-btn");
    if (btn) pilihKontur(btn.dataset.kontur);
  });

  btnFree.addEventListener("click", () => {
    state.modeBebas = !state.modeBebas;
    aturTombolBebas();
    if (state.modeBebas) {
      hapusKontur();
      showToast("Mode kanvas bebas: menggambar tanpa pola kontur");
    } else {
      pilihKontur(state.kontur || "gunungan");
    }
  });

  btnFull.addEventListener("click", toggleLayarPenuh);
  btnExitFull.addEventListener("click", keluarLayarPenuh);
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && state.layarPenuh) keluarLayarPenuh();
  });

  btnTemplate.addEventListener("click", () => toggleMenuTemplate());
  paletteMenu.addEventListener("click", (e) => {
    const row = e.target.closest(".template-row");
    if (row) terapkanTemplate(row.dataset.template);
  });
  document.addEventListener("click", (e) => {
    if (!paletteMenu.hidden && !e.target.closest("#toolbar-actions"))
      toggleMenuTemplate(true);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      toggleMenuTemplate(true);
      if (state.layarPenuh) keluarLayarPenuh();
    }
  });

  document.querySelectorAll("[data-action]").forEach((b) => {
    b.addEventListener("click", () =>
      b.dataset.action === "undo" ? undo() : bersihkan(),
    );
  });

  canvas.addEventListener("pointerdown", mulaiGores);
  canvas.addEventListener("pointermove", lanjutGores);
  window.addEventListener("pointerup", akhirGores);
  canvas.addEventListener("pointercancel", akhirGores);

  new ResizeObserver(() => sesuaikanKanvas()).observe(wrap);

  renderSwatch();
  const konturAwal = ["gunungan", "gatotkaca", "petruk"].includes(
    location.hash.slice(1),
  )
    ? location.hash.slice(1)
    : "gunungan";
  tandaiKonturAktif(konturAwal);
  renderKontur(konturAwal);
  requestAnimationFrame(() => underlay.classList.remove("opacity-0"));
  miniTools.hidden = false;
  aturTombolPenuh();
  aturKuas(state.ukuranKuas);
  sesuaikanKanvas();
})();
