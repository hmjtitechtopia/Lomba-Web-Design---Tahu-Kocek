
(() => {
  "use strict";

  const viewport = document.getElementById("galeri-viewport");
  const section = document.getElementById("galeri-karya");
  const btnPrev = document.getElementById("galeri-prev");
  const btnNext = document.getElementById("galeri-next");
  const status = document.getElementById("galeri-status");

  
  const KARYA = [
    {
      img: "../asset/img/tokoh-pewayangan/arjuna.png",
      judul: "Arjuna Wijaya Prada",
      kreator: "Studio Adiloka — Bandung",
      meta: "Prada Klasik · 2 sesi",
      skor: 91,
    },
    {
      img: "../asset/img/tokoh-pewayangan/semar.png",
      judul: "Semar Menyawikan Ilmu",
      kreator: "Lingkar Batik Rancage",
      meta: "Pigmen Bumi · 3 sesi",
      skor: 87,
    },
    {
      img: "../asset/img/jenis-jenis/2.png",
      judul: "Sinta Panembang Alas",
      kreator: "Sanggar Rancang Kawi",
      meta: "Prada Udan Riris · 1 sesi",
      skor: 73,
    },
    {
      img: "../asset/img/tokoh-pewayangan/sakuni.png",
      judul: "Sakuni Penyadang Perang",
      kreator: "Sanggar Salakanagara",
      meta: "Kayon Senja · 2 sesi",
      skor: 78,
    },
    {
      img: "../asset/img/jenis-jenis/5.png",
      judul: "Gatotkaca Saptapaksa",
      kreator: "Kelas Sungging Nusantara",
      meta: "Pigmen Bumi · 4 sesi",
      skor: 82,
    },
    {
      img: "../asset/img/jenis-jenis/1.png",
      judul: "Gunungan Damarsasi",
      kreator: "Komunitas Seni Prada",
      meta: "Kayon Senja · 2 sesi",
      skor: 69,
    },
  ];

  const N = KARYA.length;
  let aktif = 0;
  let kartuList = [];
  let posisi = [];        
  let popTerakhir = -1;   
  let sudahTerlihat = false;

  
  let sedangMeluncur = false;
  let pendingSteps = 0;
  let pendingDir = 0;

  
  const SINGLE_MS = 600; 
  const CHAIN_MS = 500;  
  let tickerId = null;  
  
  const dariHash = Number(location.hash.replace("#karya", ""));
  if (dariHash >= 1 && dariHash <= N) aktif = dariHash - 1;

  
  const buatKartu = (k, i) => {
    const kartu = document.createElement("button");
    kartu.type = "button";
    kartu.dataset.idx = i;
    kartu.setAttribute("aria-label", `Karya ${i + 1}: ${k.judul} — ${k.kreator}`);
    kartu.className =
      "galeri-item group absolute left-1/2 top-1/2 h-[330px] w-[232px] " +
      "md:h-[400px] md:w-[280px] overflow-hidden rounded-2xl bg-[#1d0d11] " +
      "text-left shadow-2xl shadow-black/60 outline-none " +
      "focus-visible:ring-2 focus-visible:ring-[#D9A520]";

    kartu.innerHTML = `
      <img src="${k.img}" alt="" draggable="false"
        class="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <span class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10"></span>
      <span class="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#A71D31] shadow">
        <i class="fa-solid fa-torii-gate text-xs text-[#F1F0CC]"></i>
      </span>
      <span class="skor-angka absolute right-3 top-2.5 flex items-center gap-1 text-base font-bold text-white">
        ${k.skor}<i class="fa-solid fa-star text-[10px] text-[#D9A520]"></i>
      </span>
      <span class="teks-aktif pointer-events-none absolute inset-x-3 bottom-3 block">
        <span class="block truncate text-sm font-bold text-white md:text-base">${k.judul}</span>
        <span class="mt-0.5 block truncate text-[10px] text-stone-300">${k.kreator}</span>
        <span class="mt-0.5 block truncate text-[10px] text-stone-400">${k.meta}</span>
      </span>`;

    kartu.addEventListener("click", () => {
      
      const off = i - aktif;
      if (off === 0) return;
      klik(off > 0 ? 1 : -1);
    });

    viewport.insertBefore(kartu, btnPrev);
    return kartu;
  };

  
  const terapkan = (chained = false) => {
    const W = viewport.clientWidth || 1;
    const step = Math.max(140, Math.min(0.28 * W, 285));

    
    const transisi = chained
      ? `transform ${CHAIN_MS}ms linear, opacity 400ms ease, filter 400ms linear`
      : `transform ${SINGLE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), ` +
        `opacity ${SINGLE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), ` +
        `filter ${SINGLE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    let popTarget = -1;
    kartuList.forEach((el, i) => {
      const lingkar = ((i - aktif) % N + N) % N;                 
      let jarak = lingkar > N / 2 ? lingkar - N : lingkar;        
      while (posisi[i] - jarak > N / 2) jarak += N;
      while (jarak - posisi[i] > N / 2) jarak -= N;

      
      let wrap = false;
      if (jarak > N / 2) {
        jarak -= N;
        wrap = true;
      } else if (jarak < -(N / 2)) {
        jarak += N;
        wrap = true;
      }
      posisi[i] = jarak;

      const p = posisi[i];
      const a = Math.abs(p);

      
      const transformDari = (pos) => {
        const ab = Math.abs(pos);
        const dx = pos * step;
        const dy = ab === 0 ? 0 : ab === 1 ? 18 : 10;
        const skala = ab === 0 ? 1 : ab === 1 ? 0.8 : ab === 2 ? 0.66 : 0.56;
        return `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${skala})`;
      };

      const opasitas = a === 0 ? 1 : a === 1 ? 0.85 : a === 2 ? 0.6 : 0;
      const saring = a === 0
        ? "none"
        : `brightness(${a === 1 ? 0.55 : 0.4}) saturate(0.5)` +
          (a >= 2 ? " grayscale(0.3)" : "");

      if (wrap) {
        
        el.style.transition = "none";
        el.style.transform = transformDari(p + (p > 0 ? 1 : -1));
        el.style.opacity = "0";
        void el.offsetWidth;

      el.style.transition = transisi;
      el.style.transform = transformDari(p);
      el.style.opacity = opasitas;
      el.style.filter = saring;
      el.style.zIndex = String(Math.max(0, 30 - a * 8));
      el.style.pointerEvents = a <= 2 ? "auto" : "none";

      if (a === 0) {
        el.setAttribute("aria-current", "true");
        popTarget = i;
      } else {
        el.removeAttribute("aria-current");
        el.classList.remove("galeri-pop");
      }
    });

    if (popTarget >= 0 && popTarget !== popTerakhir) {
      const el = kartuList[popTarget];
      el.classList.remove("galeri-pop");
      void el.offsetWidth; 
      el.classList.add("galeri-pop");
    }
    popTerakhir = popTarget;

    const k = KARYA[aktif];
    status.textContent = `${aktif + 1} dari ${N} karya — ${k.judul}`;
  };

  const inisialPosisi = () => {
    posisi = KARYA.map((_, i) => {
      let off = i - aktif;
      if (off > N / 2) off -= N;
      if (off < -N / 2) off += N;
      return off;
    });
  };

  
  const jadwalkanTicker = () => {
    clearTimeout(tickerId);
    tickerId = setTimeout(
      prosesAntrean,
      (pendingSteps > 0 ? CHAIN_MS : SINGLE_MS) + 40
    );
  };

  const geser = (arah) => {
    aktif = ((aktif + arah) % N + N) % N;
    sedangMeluncur = true;
    terapkan(pendingSteps > 0);
    jadwalkanTicker();
  };

  const klik = (arah) => {
    ungkapkan();
    if (sedangMeluncur) {
      
      if (tickerId === null) {
        sedangMeluncur = false;
        geser(arah);
        return;
      }
      if (arah !== pendingDir) {
        pendingDir = arah;
        pendingSteps = 0;
      }
      pendingSteps += 1;
      return;
    }
    pendingDir = arah;
    geser(arah);
  };

  const prosesAntrean = () => {
    tickerId = null;
    if (pendingSteps > 0) {
      pendingSteps -= 1;
      geser(pendingDir);
    } else {
      sedangMeluncur = false;
    }
  };


  const ungkapkan = () => {
    if (sudahTerlihat) return;
    sudahTerlihat = true;

    
    kartuList.forEach((el, i) => (el.style.transitionDelay = `${i * 60}ms`));
    terapkan();
    setTimeout(
      () => kartuList.forEach((el) => (el.style.transitionDelay = "0ms")),
      N * 60 + 900
    );
  };

  new IntersectionObserver(
    (entri, pengamat) => {
      if (entri.some((n) => n.isIntersecting)) {
        ungkapkan();
        pengamat.disconnect();
      }
    },
    { threshold: 0.2 }
  ).observe(section);

  btnPrev.addEventListener("click", () => klik(-1));
  btnNext.addEventListener("click", () => klik(1));
  new ResizeObserver(() => terapkan()).observe(viewport);

  document.addEventListener("keydown", (e) => {
    
    if (document.body.classList.contains("studio-full")) return;
    if (e.key === "ArrowLeft") klik(-1);
    if (e.key === "ArrowRight") klik(1);
  });

  
  kartuList = KARYA.map(buatKartu);
  inisialPosisi();
  
  kartuList.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translate(calc(-50% - 0px), calc(-50% + 26px)) scale(0.75)";
    el.style.filter = "brightness(0.6)";
  });
  status.textContent = `1 dari ${N} karya — ${KARYA[aktif].judul}`;
})();
