"use strict";

const $ = (sel, root = document) => root.querySelector(sel);

const KISAH = [
  {
    pill: "Lomba Undiksa",
    judul: "Perjalanan Menuju Lomba Kelir Undiksa 2026",
    img: "../asset/img/solusion/partisipasi.jpg",
    nama: "Nadia Pratiwi",
    isi: "Kelir Undiksa tahun ini kami garap dari nol: tiga pekan nyungging bergantian siang-malam bareng lima pelukis muda. Yang kami rekam bukan cuma hasil lomba — melainkan bagaimana satu kelir bisa merapatkan regu yang sebelumnya tak pernah ketemu.",
  },
  {
    pill: "Ruang Kelir",
    judul: "Melukis Puntadwa Bersama di Kelir Komunal",
    img: "../asset/img/solusion/gabung.jpg",
    nama: "Ki Sutarsa",
    isi: "Puntadwa terbesar yang pernah kami lukis: panjang enam meter, dikerjakan sama-sama di sanggar. Yang istimewa bukan ukurannya, melainkan urutan tangan — pemula mengisi galaran, yang veteran menyempurnakan gunungan.",
  },
  {
    pill: "Kelas Digital",
    judul: "Kelas Canting Digital: Dhapur Pertamamu",
    img: "../asset/img/solusion/Finishing Touch.jpg",
    nama: "Dewi Larasati",
    isi: "Kelas perdana kami di Studio Kreasi: dua jam, sembilan peserta, satu dhapur selesai. Rupanya tablet pun bisa jadi teman canting — yang penting warna isen tetap gading semarak.",
  },
  {
    pill: "Pagelaran",
    judul: "Malam Ruwat: Wayang Kulit Seisi Kampung",
    img: "../asset/img/solusion/Wayang golek_.jpg",
    nama: "Bagas Wicaksono",
    isi: "Malam itu seisi kampung duduk melingkar; kelir disandarkan pada bambu, asap lampu pensil naik ke langit-langit balai. Lakon ruwat bukan pertunjukan semata — ia jadi obat bersama yang pamungkas.",
  },
  {
    pill: "Galeri Kelir",
    judul: "Sekar Jagad & Parang: Grafir Terbaik Komunitas",
    img: "../asset/img/solusion/kembang.jpg",
    nama: "Laras Wulandari",
    isi: "Ratusan kiriman masuk, sembilan terpilih. Parang dari Surakarta bersanding dengan Sekar Jagad tulisan tangan seorang pelajar — bukti bahwa grafir klasik masih hidup di tangan yang baru belajar.",
  },
];

const KATEGORI = {
  mk: "Menggambar Kelir",
  ck: "Canting & Kuas",
  sl: "Sejarah & Lakon",
  wb: "Warna Batik",
};

const TIPS = [
  {
    id: "tip-1",
    kat: "mk",
    judul: "Menyiapkan Kelir Gading dari Kertas Biasa",
    ringkas:
      "Aku mulai dari kertas marker tebal, dilapisi putih gading lalu dipoles pakai kain lembut. Hasilnya rapi, murah, dan kuat dilukis ulang…",
    penulis: "Dewi Larasati",
    waktu: "2 jam lalu",
    suka: 124,
    disukai: false,
    disimpan: false,
  },
  {
    id: "tip-2",
    kat: "ck",
    judul: "Rahasia Garis Tipis ala Pena Canting",
    ringkas:
      "Kuas 2 piksel dengan opacity 80, lalu tarik garis sekali jalan tanpa diulang. Isen cecek dan prapatan jadi jauh lebih rapi…",
    penulis: "Ki Sutarsa",
    waktu: "5 jam lalu",
    suka: 2413,
    disukai: true,
    disimpan: false,
  },
  {
    id: "tip-3",
    kat: "wb",
    judul: "Soga Alami dari Kayu Secang",
    ringkas:
      "Rendam serbuk secang semalam, panaskan dengan sedikit cuka putih. Warna cokelat hangatnya pas untuk ilakan dan latar pakaian…",
    penulis: "Nadia Pratiwi",
    waktu: "8 jam lalu",
    suka: 562,
    disukai: false,
    disimpan: false,
  },
  {
    id: "tip-4",
    kat: "sl",
    judul: "Isen Kepala Punakawan: Sekali Lihat Terbaca",
    ringkas:
      "Semar berambut cemeng, Gareng bermata suluh, Petruk berjangut panjang, Bagong bermaton bengkak. Aku rangkum tanda wajahnya di satu lembar contekan…",
    penulis: "Bagas Wicaksono",
    waktu: "12 jam lalu",
    suka: 341,
    disukai: false,
    disimpan: false,
  },
  {
    id: "tip-5",
    kat: "mk",
    judul: "Tuntunan Tangan: Latih di Pergelangan, Bukan Jari",
    ringkas:
      "Tangan wayang punya tuntunan sendiri — lengkung jari mengikuti gerak pergelangan, bukan dibekukan. Aku latih harian lewat sketsa 10 menit…",
    penulis: "Mega Ayuningtyas",
    waktu: "12 jam lalu",
    suka: 214,
    disukai: false,
    disimpan: false,
  },
  {
    id: "tip-6",
    kat: "ck",
    judul: "Merawat Canting agar Lancor Awet Setahun",
    ringkas:
      "Setelah dipakai, panaskan lagi sampai lilin luruh lalu lap dengan kain kering. Jangan dicuci air — luncornya bisa retak…",
    penulis: "Rara Ayu Gustin",
    waktu: "1 hari lalu",
    suka: 158,
    disukai: false,
    disimpan: false,
  },
  {
    id: "tip-7",
    kat: "sl",
    judul: "Kisi-Kisi Parang ala Surakarta",
    ringkas:
      "Siring demi siring tak boleh patah, dan di ider-ider tak menyambung dengan garis lengkung — seperti kata pepatah pujangga jawa…",
    penulis: "Galih Prakoso",
    waktu: "1 hari lalu",
    suka: 97,
    disukai: false,
    disimpan: false,
  },
  {
    id: "tip-8",
    kat: "wb",
    judul: "Padu Padma & Indigo di Kelir Digital",
    ringkas:
      "Padma untuk pakaian, indigo untuk wilwat dan blarak. Kuncinya: sisakan bidang gading sebagai penenang antar warna…",
    penulis: "Laras Wulandari",
    waktu: "2 hari lalu",
    suka: 305,
    disukai: false,
    disimpan: false,
  },
  {
    id: "tip-9",
    kat: "mk",
    judul: "Latihan Harian Sebelum Melukis Dhapur",
    ringkas:
      "Sepuluh menit menoreh isen tiap malam lebih berdampak daripada empat jam sekali seminggu. Konsistensi untu, bukan gelung…",
    penulis: "Bima Aditya",
    waktu: "2 hari lalu",
    suka: 178,
    disukai: false,
    disimpan: false,
  },
];

const IC = {
  bookmark: `<svg class="bm-ic" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  heart: `<svg class="heart-ic" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/></svg>`,
};

const fmtAngka = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(".0", "")}k` : `${n}`;

const GRAD = [
  ["#a9530b", "#6f101e"],
  ["#8c4a2f", "#d9a441"],
  ["#701120", "#a9530b"],
  ["#4a2c14", "#a9530b"],
  ["#7f3d08", "#c98a2b"],
];

function svgKisah(i) {
  const [a, b] = GRAD[i % GRAD.length];
  let dots = "";
  for (let y = 2; y <= 58; y += 11)
    for (let x = 3; x <= 117; x += 12)
      dots += `<circle cx="${x + (Math.floor(y / 11) % 2 ? 6 : 0)}" cy="${y}" r="1.1" fill="rgba(247,240,221,.28)"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 120 60" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="120" height="60" fill="url(#g)"/>${dots}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function svgAvatar(nama, i) {
  const inisial = nama
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const [a, b] = GRAD[i % GRAD.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="80" height="80" fill="url(#g)"/><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="serif" font-weight="700" font-size="30" fill="#f7f0dd">${inisial}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function bindFallback(root = document) {
  root.querySelectorAll("img[data-fbk]").forEach((img, idx) => {
    img.addEventListener(
      "error",
      () => {
        img.src =
          img.dataset.fbk === "ava"
            ? svgAvatar(img.dataset.nama ?? "W K", idx)
            : svgKisah(idx);
      },
      { once: true },
    );
  });
}

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2200);
}

function blogUnggulanHTML() {
  const k = KISAH[0];
  return `
  <article data-kisah="0" class="group cursor-pointer" aria-label="Baca kisah ${k.judul}">
    <span class="block overflow-hidden rounded-lg border border-gading-300 bg-white">
      <img src="${k.img}" alt="${k.judul}" data-fbk="kisah"
        class="block w-full aspect-[3/2] object-cover transition duration-300 group-hover:scale-[1.02]" />
    </span>
  </article>`;
}

function blogBarisHTML(k, i) {
  return `
  <li class="border-b border-gading-300" data-card style="--no:${i - 1}">
    <button type="button" data-kisah="${i}"
      class="group flex w-full cursor-pointer items-baseline gap-4 py-4 text-left"
      aria-label="Baca kisah ${k.judul}">
      <span class="w-6 shrink-0 text-sm font-bold tabular-nums text-soga-600" aria-hidden="true">${i}</span>
      <span class="min-w-0">
        <span class="block text-sm font-bold leading-snug text-tinta-900 transition-colors group-hover:text-soga-700">
          ${k.judul}
        </span>
        <span class="mt-1 block text-xs font-semibold text-tinta-500">${k.pill} · ${k.nama}</span>
      </span>
    </button>
  </li>`;
}

function renderBlog() {
  $("#blog-utama").innerHTML = blogUnggulanHTML();
  $("#blog-list").innerHTML = KISAH.slice(1)
    .map((k, i) => blogBarisHTML(k, i + 1))
    .join("");
  bindFallback(document);
}

function tipUnggulanHTML(t) {
  return `
  <article class="tip-card tip-unggulan" data-kat="${t.kat}" data-id="${t.id}" data-card style="--no:0">
    <div class="min-w-0 flex-1">
      <div class="flex flex-wrap items-center gap-2">
        <span class="cat-pill">${KATEGORI[t.kat]}</span>
        ${t.lokal ? `<span class="badge-lokal">Tipmu</span>` : ""}
        <span class="text-xs font-semibold text-tinta-500">${t.waktu}</span>
      </div>
      <h3 class="mt-3 font-display text-xl font-bold leading-snug text-tinta-900 sm:text-2xl">${t.judul}</h3>
      <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-tinta-500">${t.ringkas}</p>
      <div class="mt-4 flex items-center gap-2.5">
        <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-soga-100 text-[11px] font-bold text-soga-700" aria-hidden="true">${inisial(t.penulis)}</span>
        <p class="text-xs font-bold text-tinta-900">${t.penulis}</p>
      </div>
    </div>
    <div class="flex shrink-0 flex-row items-center gap-1.5">
      ${t.lokal ? `<button type="button" class="bm-btn" data-hapus-tip="${t.id}" aria-label="Hapus tip ini">${ICX.tutup}</button>` : ""}
      <button type="button" class="bm-btn ${t.disimpan ? "on" : ""}" aria-label="Simpan tip ini" aria-pressed="${t.disimpan}">${IC.bookmark}</button>
      <button type="button" class="heart-btn ${t.disukai ? "on" : ""}" aria-label="${t.disukai ? "Batal suka" : "Suka tip ini"}">
        ${IC.heart}<span class="heart-count">${fmtAngka(t.suka)}</span>
      </button>
    </div>
  </article>`;
}

function tipBarisHTML(t, i) {
  return `
  <article class="tip-baris" data-kat="${t.kat}" data-id="${t.id}" data-card style="--no:${i}">
    <div class="min-w-0 flex-1">
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <h3 class="text-sm font-bold text-tinta-900">${t.judul}</h3>
        <span class="text-[11px] font-semibold text-tinta-500">${KATEGORI[t.kat]}${t.lokal ? " · tipmu" : ""}</span>
      </div>
      <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-tinta-500">${t.ringkas}</p>
    </div>
    <div class="flex shrink-0 items-center gap-1">
      ${t.lokal ? `<button type="button" class="bm-btn" data-hapus-tip="${t.id}" aria-label="Hapus tip ini">${ICX.tutup}</button>` : ""}
      <button type="button" class="bm-btn ${t.disimpan ? "on" : ""}" aria-label="Simpan tip ini" aria-pressed="${t.disimpan}">${IC.bookmark}</button>
      <button type="button" class="heart-btn ${t.disukai ? "on" : ""}" aria-label="${t.disukai ? "Batal suka" : "Suka tip ini"}">
        ${IC.heart}<span class="heart-count">${fmtAngka(t.suka)}</span>
      </button>
    </div>
  </article>`;
}

const state = { kat: "semua" };

function renderTips() {
  const daftar =
    state.kat === "semua" ? TIPS : TIPS.filter((t) => t.kat === state.kat);
  const terpopuler = [...daftar].sort((a, b) => b.suka - a.suka)[0];
  if (!terpopuler) {
    $("#tips-grid").innerHTML =
      `<p class="px-1 py-10 text-sm text-tinta-500">Belum ada tip di topik ini — bagikan yang pertama lewat tombol di samping.</p>`;
    return;
  }
  $("#tips-grid").innerHTML =
    tipUnggulanHTML(terpopuler) +
    daftar
      .filter((t) => t !== terpopuler)
      .map((t, i) => tipBarisHTML(t, i))
      .join("");
  bindFallback($("#tips-grid"));
  renderRank();
}

function setFilter(kat) {
  state.kat = kat;
  document.querySelectorAll("#chips .chip").forEach((chip) => {
    const on = chip.dataset.kat === kat;
    chip.classList.toggle("is-on", on);
    chip.setAttribute("aria-pressed", String(on));
  });
  renderTips();
}

document.getElementById("chips").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (chip) setFilter(chip.dataset.kat);
});

document.getElementById("tips-grid").addEventListener("click", (e) => {
  const hps = e.target.closest("[data-hapus-tip]");
  if (hps) {
    const i = TIPS.findIndex((x) => x.id === hps.dataset.hapusTip);
    if (i > -1 && confirm(`Hapus tip "${TIPS[i].judul}"?`)) {
      TIPS.splice(i, 1);
      simpanTipsLokal();
      renderTips();
      toast("Tip dihapus");
    }
    return;
  }
  const kartu = e.target.closest("[data-id]");
  if (!kartu) return;
  const tip = TIPS.find((t) => t.id === kartu.dataset.id);
  if (!tip) return;

  const bm = e.target.closest(".bm-btn");
  if (bm) {
    tip.disimpan = !tip.disimpan;
    bm.classList.toggle("on", tip.disimpan);
    bm.setAttribute("aria-pressed", String(tip.disimpan));
    toast(
      tip.disimpan ? "Tip tersimpan ke koleksimu" : "Tip dihapus dari koleksi",
    );
    return;
  }

  const heart = e.target.closest(".heart-btn");
  if (heart) {
    tip.disukai = !tip.disukai;
    tip.suka += tip.disukai ? 1 : -1;
    heart.classList.toggle("on", tip.disukai);
    heart.setAttribute(
      "aria-label",
      tip.disukai ? "Batal suka" : "Suka tip ini",
    );
    heart.querySelector(".heart-count").textContent = fmtAngka(tip.suka);
    const ic = heart.querySelector(".heart-ic");
    ic.classList.remove("pop");
    void ic.offsetWidth;
    ic.classList.add("pop");
  }
});

document.querySelectorAll(".topik").forEach((btn) => {
  btn.addEventListener("click", () => {
    const kat = btn.dataset.kat;
    if (!kat) {
      toast("Topik ini belum punya filter — nanti ya!");
      return;
    }
    setFilter(kat);
    $("#chips").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

const ICX = {
  folder: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 7A2.5 2.5 0 0 1 6 4.5h3.4c.72 0 1.4.31 1.88.85L12.3 6.5H18A2.5 2.5 0 0 1 20.5 9v8A2.5 2.5 0 0 1 18 19.5H6A2.5 2.5 0 0 1 3.5 17V7Z"/></svg>`,
  tutup: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
};

const GALERI = [
  {
    slug: "undiksa-2026",
    nama: "Karya Undiksa 2026",
    ket: "Kelir jagoan lomba kelir Undiksa",
    karya: [
      {
        id: "u1",
        judul: "Sembari Menunggu Sabda",
        pembuat: "Rangga Sentana",
        tgl: "2026-03-14",
        suka: 182,
        disukai: false,
        img: "../asset/img/jenis-jenis/1.png",
        desk: "Babak pembuka lomba Undiksa — punokawan menghangatkan tembang sebelum lakon dimulai.",
      },
      {
        id: "u2",
        judul: "Yudha Ngrampe",
        pembuat: "Vina Ardiyanti",
        tgl: "2026-04-02",
        suka: 143,
        disukai: false,
        img: "../asset/img/jenis-jenis/2.png",
        desk: "Petarung muda menanti tabuh rewang; indigo dan padma menari di sepanjang gunungan.",
      },
      {
        id: "u3",
        judul: "Joged Pangkur Wengi",
        pembuat: "Damar Anjani",
        tgl: "2026-04-21",
        suka: 205,
        disukai: false,
        img: "../asset/img/jenis-jenis/3.png",
        desk: "Punokawan memainkan pangkur menjelang tengah wengi — soga dan gading masih bersih terawat.",
      },
    ],
  },
  {
    slug: "malam-ruwat",
    nama: "Kelir Malam Ruwat",
    ket: "Dokumentasi pagelaran ruwat seisi kampung",
    karya: [
      {
        id: "r1",
        judul: "Semar Ing Truntum",
        pembuat: "Ki Sutarsa",
        tgl: "2026-02-08",
        suka: 264,
        disukai: false,
        img: "../asset/img/jenis-jenis/4.png",
        desk: "Semar terselubung truntum pada malam ruwat Gayamharjo; kelir dikerap ulang sebelum pagelaran.",
      },
      {
        id: "r2",
        judul: "Bima Ngruwat",
        pembuat: "Arum Prameswari",
        tgl: "2026-02-27",
        suka: 129,
        disukai: false,
        img: "../asset/img/jenis-jenis/5.png",
        desk: "Bima melabuhkan sujud; wilwat indigo digambar sejengkal demi sejengkal.",
      },
      {
        id: "r3",
        judul: "Barikan Ing Wengi",
        pembuat: "Galih Prakoso",
        tgl: "2026-03-05",
        suka: 171,
        disukai: false,
        img: "../asset/img/jenis-jenis/6.png",
        desk: "Barikan tengah wengi — lampu pensil menari di atas isen yang belum kering.",
      },
    ],
  },
  {
    slug: "praktik-dhapur",
    nama: "Praktik Dhapur",
    ket: "Latihan isen harian para member",
    karya: [
      {
        id: "d1",
        judul: "Isen Grompol Hari Ke-7",
        pembuat: "Mega Ayuningtyas",
        tgl: "2026-05-03",
        suka: 96,
        disukai: false,
        img: "../asset/img/jenis-jenis/7.png",
        desk: "Latihan grompol minggu pertama: siring masih kaku, isinya mulai menetap.",
      },
      {
        id: "d2",
        judul: "Nitik Ngerek Jarak",
        pembuat: "Rara Ayu Gustin",
        tgl: "2026-05-19",
        suka: 118,
        disukai: false,
        img: "../asset/img/jenis-jenis/1.png",
        desk: "Nitik dipandu jarak sejengkal — dikerjakan kelir tulis tangan sebelum digarap digital.",
      },
      {
        id: "d3",
        judul: "Kawung Bulat Rapat",
        pembuat: "Bima Aditya",
        tgl: "2026-06-07",
        suka: 87,
        disukai: false,
        img: "../asset/img/jenis-jenis/2.png",
        desk: "Kawung bulat rapat — hasil 30 hari latihan isen harian.",
      },
    ],
  },
  {
    slug: "sekar-jagad",
    nama: "Parang & Sekar Jagad",
    ket: "Grafir motif klasik kerja gandeng member",
    karya: [
      {
        id: "s1",
        judul: "Sekar Jagad Beribeng Parang Rusak",
        pembuat: "Dewi Larasati & Laras Wulandari",
        tgl: "2026-01-16",
        suka: 312,
        disukai: false,
        img: "../asset/img/jenis-jenis/3.png",
        desk: "Sekar Jagad dengan pinggir parang rusak — kerja gandeng dua member lintas kota.",
      },
      {
        id: "s2",
        judul: "Parang Barong Ing Seket",
        pembuat: "Nadia Pratiwi",
        tgl: "2026-01-29",
        suka: 240,
        disukai: false,
        img: "../asset/img/jenis-jenis/4.png",
        desk: "Parang Barong seket panjang: dua pekan ider-ider hingga lurus tak patah.",
      },
      {
        id: "s3",
        judul: "Cemukiran Ing Payung",
        pembuat: "Bagas Wicaksono",
        tgl: "2026-02-11",
        suka: 156,
        disukai: false,
        img: "../asset/img/jenis-jenis/5.png",
        desk: "Payung ageng bermotif cemukiran, warna soga kecang masih segar.",
      },
    ],
  },
];

const galState = { koleksi: null, cari: "", urut: "terbaru", mode: "grid" };
const galEl = {};

const fmtTanggal = (iso) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));

function urutkan(daftar) {
  const s = [...daftar];
  if (galState.urut === "populer") s.sort((a, b) => b.suka - a.suka);
  else if (galState.urut === "abjad")
    s.sort((a, b) => a.judul.localeCompare(b.judul, "id"));
  else s.sort((a, b) => new Date(b.tgl) - new Date(a.tgl));
  return s;
}

function cariKarya(id) {
  for (const k of GALERI) {
    const w = k.karya.find((x) => x.id === id);
    if (w) return { w, k };
  }
  return null;
}

function renderCrumbs(aktif) {
  galEl.crumbs.innerHTML = aktif
    ? `<button class="crumb" data-route="akar">Semua Koleksi</button>
       <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="text-tinta-300" aria-hidden="true"><path d="M9.5 6l6 6-6 6"/></svg>
       <span class="font-bold text-tinta-900" aria-current="page">${aktif.nama}</span>`
    : `<span class="font-bold text-tinta-900" aria-current="page">Semua Koleksi</span>`;
}

function koleksiCardHTML(k, i) {
  return `
  <button class="folder-card group" data-route="${k.slug}" data-card style="--no:${i}" aria-label="Buka koleksi ${k.nama}">
    <div class="flex items-center gap-3">
      <span class="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-soga-50 text-soga-600 transition-colors duration-200 group-hover:bg-soga-100">${ICX.folder}</span>
      <span class="min-w-0">
        <span class="block truncate text-sm font-bold text-tinta-900">${k.nama}</span>
        <span class="block truncate text-xs font-medium text-tinta-500">${k.ket}</span>
      </span>
    </div>
    <div class="mt-3.5 flex gap-1.5">
      ${k.karya
        .slice(0, 3)
        .map(
          (w) =>
            `<img src="${w.img}" alt="" loading="lazy" data-fbk="kisah" class="h-10 min-w-0 flex-1 rounded-lg object-cover ring-1 ring-gading-300" />`,
        )
        .join("")}
    </div>
    <p class="mt-2.5 text-[11px] font-bold uppercase tracking-wider text-soga-600 transition-colors duration-200 group-hover:text-soga-500">${k.karya.length} karya</p>
  </button>`;
}

function kartuHTML(w, i) {
  return `
  <button class="karya-card group" data-karya="${w.id}" data-card style="--no:${i}" aria-label="Pratinjau karya ${w.judul}">
    <span class="relative block">
      <img src="${w.img}" alt="${w.judul}" loading="lazy" data-fbk="kisah" class="gambar w-full aspect-[3/4] rounded-lg object-cover" />
      ${
        w.lokal
          ? `<span class="absolute left-2 top-2 rounded-md bg-gendhis-500/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gading-50" style="z-index:1">Unggahanmu</span>`
          : ""
      }
    </span>
    <span class="block px-0.5 pb-1 pt-2.5 text-left">
      <span class="block truncate text-[13px] font-bold text-tinta-900">${w.judul}</span>
      <span class="mt-0.5 block truncate text-[11px] font-semibold text-tinta-500">${w.pembuat} · ${fmtTanggal(w.tgl)}</span>
    </span>
  </button>`;
}

function barisHTML(w, i) {
  return `
  <button class="karya-row group" data-karya="${w.id}" data-card style="--no:${i}" aria-label="Pratinjau karya ${w.judul}">
    <img src="${w.img}" alt="" loading="lazy" data-fbk="kisah" class="thumb" />
    <span class="min-w-0 flex-1">
      <span class="flex items-center gap-1.5">
        <span class="truncate text-sm font-bold text-tinta-900 transition-colors group-hover:text-soga-700">${w.judul}</span>
        ${
          w.lokal
            ? `<span class="shrink-0 rounded-md bg-gendhis-500/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gading-50">Unggahanmu</span>`
            : ""
        }
      </span>
      <span class="mt-0.5 block truncate text-xs font-semibold text-tinta-500">${w.pembuat}${w.koleksiNama ? ` · ${w.koleksiNama}` : ""}</span>
    </span>
    <span class="hidden text-xs font-semibold text-tinta-500 tabular-nums sm:block">${fmtTanggal(w.tgl)}</span>
    <span class="flex items-center gap-1 text-xs font-bold tabular-nums ${w.disukai ? "text-gendhis-600" : "text-tinta-500"}">${IC.heart}${fmtAngka(w.suka)}</span>
  </button>`;
}

function kosongHTML() {
  return `
  <div class="flex flex-col items-center gap-2.5 rounded-lg border border-dashed border-gading-300 bg-white px-6 py-14 text-center" data-card style="--no:0">
    <span class="grid h-12 w-12 place-items-center rounded-full bg-gading-100 text-tinta-500">${ICX.folder}</span>
    <p class="font-display text-lg font-bold text-tinta-900">Tak ketemu karya itu…</p>
    <p class="max-w-xs text-sm text-tinta-500">Coba teks kunci lain, atau bersihkan kotak pencarian.</p>
    <button id="btn-bersih" class="chip mt-1.5">Bersihkan pencarian</button>
  </div>`;
}

function renderGaleri() {
  const aktif = galState.koleksi
    ? GALERI.find((k) => k.slug === galState.koleksi)
    : null;
  renderCrumbs(aktif);

  const isi = galEl.isi;

  if (!aktif && !galState.cari) {
    isi.className = "mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";
    isi.innerHTML = GALERI.map(koleksiCardHTML).join("");
    bindFallback(isi);
    return;
  }

  let daftar;
  if (galState.cari && !aktif) {
    const q = galState.cari;
    daftar = GALERI.flatMap((k) =>
      k.karya.map((w) => ({ ...w, koleksiNama: k.nama })),
    ).filter(
      (w) =>
        w.judul.toLowerCase().includes(q) ||
        w.pembuat.toLowerCase().includes(q),
    );
  } else {
    daftar = aktif.karya.filter(
      (w) =>
        !galState.cari ||
        w.judul.toLowerCase().includes(galState.cari) ||
        w.pembuat.toLowerCase().includes(galState.cari),
    );
  }
  urutkan(daftar);

  isi.className =
    galState.mode === "list"
      ? "mt-6 flex flex-col gap-3"
      : "mt-6 grid gap-4 grid-cols-2 sm:gap-6 sm:grid-cols-3 xl:grid-cols-4";

  isi.innerHTML = daftar.length
    ? daftar
        .map((w, i) => (galState.mode === "list" ? barisHTML : kartuHTML)(w, i))
        .join("")
    : kosongHTML();
  bindFallback(isi);
  renderRank();
}

function setTampilan(m) {
  if (galState.mode === m) return;
  galState.mode = m;
  const on = m === "grid";
  galEl.btnGrid.classList.toggle("is-on", on);
  galEl.btnGrid.setAttribute("aria-pressed", String(on));
  galEl.btnList.classList.toggle("is-on", !on);
  galEl.btnList.setAttribute("aria-pressed", String(!on));
  renderGaleri();
}

function bacaHash() {
  const m = location.hash.match(/^#galeri\/([\w-]+)$/);
  return m && GALERI.some((k) => k.slug === m[1]) ? m[1] : null;
}

function bukaKarya(w, koleksiNama) {
  const d = galEl.dialog;
  d.innerHTML = `
    <div class="relative">
      <button id="mk-tutup" class="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-tinta-900/60 text-gading-50 transition hover:bg-tinta-900/80" aria-label="Tutup pratinjau">${ICX.tutup}</button>
      <img src="${w.img}" alt="${w.judul}" data-fbk="kisah" />
    </div>
    <div class="p-5 pt-4">
      <span class="cat-pill">${koleksiNama}</span>
      <h3 id="mk-judul" class="mt-2.5 font-display text-xl font-bold text-tinta-900">${w.judul}</h3>
      <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-tinta-500">
        <span>${w.pembuat}</span><span aria-hidden="true">·</span><span>${fmtTanggal(w.tgl)}</span>
      </div>
      <p class="mt-3 text-sm leading-relaxed text-tinta-500">${w.desk}</p>
      <div class="mt-4 flex items-center justify-between border-t border-gading-200 pt-3">
        ${
          w.lokal
            ? `<button id="mk-hapus" class="rounded-xl border border-gendhis-500/40 px-3 py-1.5 text-xs font-bold text-gendhis-600 transition hover:bg-gendhis-500/10" aria-label="Hapus karya ini dari galeri">Hapus karya ini</button>`
            : `<span class="text-[11px] font-bold uppercase tracking-wider text-tinta-500">WayangKita</span>`
        }
        <button id="mk-suka" class="heart-btn ${w.disukai ? "on" : ""}" aria-label="${w.disukai ? "Batal suka" : "Suka karya ini"}">${IC.heart}<span class="heart-count">${fmtAngka(w.suka)}</span></button>
      </div>
    </div>`;
  bindFallback(d);
  const hpsKarya = d.querySelector("#mk-hapus");
  if (hpsKarya) hpsKarya.addEventListener("click", () => hapusKarya(w));
  d.querySelector("#mk-tutup").addEventListener("click", () => d.close());
  d.querySelector("#mk-suka").addEventListener("click", (e) => {
    w.disukai = !w.disukai;
    w.suka += w.disukai ? 1 : -1;
    const b = e.currentTarget;
    b.classList.toggle("on", w.disukai);
    b.setAttribute("aria-label", w.disukai ? "Batal suka" : "Suka karya ini");
    b.querySelector(".heart-count").textContent = fmtAngka(w.suka);
    const ic = b.querySelector(".heart-ic");
    ic.classList.remove("pop");
    void ic.offsetWidth;
    ic.classList.add("pop");
  });
  d.showModal();
}

function initGaleri() {
  galEl.section = $("#galeri");
  galEl.isi = $("#galeri-isi");
  galEl.crumbs = $("#crumbs");
  galEl.cari = $("#galeri-cari");
  galEl.urut = $("#galeri-urut");
  galEl.dialog = $("#modal-karya");
  galEl.btnGrid = $("#view-grid");
  galEl.btnList = $("#view-list");

  galEl.cari.addEventListener("input", () => {
    galState.cari = galEl.cari.value.trim().toLowerCase();
    renderGaleri();
  });
  galEl.urut.addEventListener("change", () => {
    galState.urut = galEl.urut.value;
    renderGaleri();
  });
  galEl.btnGrid.addEventListener("click", () => setTampilan("grid"));
  galEl.btnList.addEventListener("click", () => setTampilan("list"));

  galEl.section.addEventListener("click", (e) => {
    const rute = e.target.closest("[data-route]");
    if (rute) {
      location.hash =
        rute.dataset.route === "akar"
          ? "galeri"
          : `galeri/${rute.dataset.route}`;
      return;
    }
    if (e.target.closest("#btn-bersih")) {
      galState.cari = "";
      galEl.cari.value = "";
      renderGaleri();
      return;
    }
    const t = e.target.closest("[data-karya]");
    if (t) {
      const temuan = cariKarya(t.dataset.karya);
      if (temuan) bukaKarya(temuan.w, temuan.k.nama);
    }
  });

  window.addEventListener("hashchange", () => {
    const slug = bacaHash();
    if (slug !== galState.koleksi) {
      galState.koleksi = slug;
      renderGaleri();
    }
  });

  galEl.dialog.addEventListener("close", () => renderGaleri());

  const slugAwal = bacaHash();
  if (slugAwal) {
    galState.koleksi = slugAwal;
    renderGaleri();
    requestAnimationFrame(() =>
      galEl.section.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  } else {
    renderGaleri();
  }
}

const KUNCI_KARYA = "wk-galeri-unggahan";
const KUNCI_TIP = "wk-tips";

function muatGudang(kunci, cadangan) {
  try {
    return JSON.parse(localStorage.getItem(kunci)) ?? cadangan;
  } catch {
    return cadangan;
  }
}

function simpanGudang(kunci, nilai) {
  try {
    localStorage.setItem(kunci, JSON.stringify(nilai));
    return true;
  } catch {
    toast("Kuota penyimpanan browser penuh — data tidak tersimpan permanen");
    return false;
  }
}

function muatLokal() {
  for (const it of muatGudang(KUNCI_KARYA, [])) {
    if (!it?.karya) continue;
    let k = GALERI.find((x) => x.slug === it.slug);
    if (!k) {
      k = {
        slug: it.slug,
        nama: it.namaKoleksi,
        ket: "Koleksi buatan member",
        karya: [],
      };
      GALERI.push(k);
    }
    k.karya.push(it.karya);
  }
  for (const tip of muatGudang(KUNCI_TIP, [])) {
    if (tip?.id) TIPS.unshift(tip);
  }
}

function simpanKaryaLokal() {
  const daftar = [];
  for (const k of GALERI)
    for (const w of k.karya)
      if (w.lokal) daftar.push({ slug: k.slug, namaKoleksi: k.nama, karya: w });
  return simpanGudang(KUNCI_KARYA, daftar);
}

function simpanTipsLokal() {
  return simpanGudang(
    KUNCI_TIP,
    TIPS.filter((x) => x.lokal),
  );
}

const inisial = (nama) =>
  (nama || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "WK";

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-");

function sekatGambar(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/"))
      return reject("File harus berupa gambar (JPEG/PNG/WebP).");
    if (file.size > 4 * 1024 * 1024)
      return reject("Ukuran gambar melebihi 4 MB.");
    const baca = new FileReader();
    baca.onerror = () => reject("Gambar gagal dibaca.");
    baca.onload = () => {
      const img = new Image();
      img.onerror = () => reject("Gambar tidak dapat dibuka.");
      img.onload = () => {
        const skala = Math.min(1, 800 / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(img.width * skala));
        c.height = Math.max(1, Math.round(img.height * skala));
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        resolve({
          dataURL: c.toDataURL("image/jpeg", 0.8),
          lebar: c.width,
          tinggi: c.height,
        });
      };
      img.src = baca.result;
    };
    baca.readAsDataURL(file);
  });
}

function tampilkanErr(errId, inputEl, pesan) {
  const box = $(`#${errId}`);
  if (pesan) {
    box.textContent = pesan;
    box.classList.remove("hidden");
    inputEl?.classList.add("is-salah");
    inputEl?.focus();
  } else {
    box.classList.add("hidden");
    inputEl?.classList.remove("is-salah");
  }
}

const kar = { gambar: null, koleksiBaru: false };
const karEl = {};

function bukaUnggahKarya() {
  resetKarya();
  karEl.koleksi.innerHTML = GALERI.map(
    (k) => `<option value="${k.slug}">${k.nama}</option>`,
  ).join("");
  karEl.dlg.showModal();
  karEl.judul.focus();
}

function resetKarya() {
  karEl.form.reset();
  kar.gambar = null;
  kar.koleksiBaru = false;
  karEl.dzEmpty.classList.remove("hidden");
  karEl.dzPreview.classList.add("hidden");
  karEl.dropzone.classList.remove("has-file", "is-drag");
  karEl.preview.style.visibility = "";
  karEl.koleksi.classList.remove("hidden");
  karEl.koleksiBaru.classList.add("hidden");
  karEl.koleksiBaru.classList.remove("is-salah");
  karEl.tglKoleksi.textContent = "Atau buat koleksi baru…";
  ["err-judul", "err-pembuat", "err-file"].forEach((id) =>
    $(`#${id}`).classList.add("hidden"),
  );
  karEl.kirim.disabled = false;
  karEl.kirimLbl.textContent = "Unggah Karya";
}

async function terimaGambar(file) {
  tampilkanErr("err-file", null, "");
  karEl.dzEmpty.classList.add("hidden");
  karEl.dzPreview.classList.remove("hidden");
  karEl.dzInfo.textContent = "Memproses gambar…";
  karEl.preview.style.visibility = "hidden";
  try {
    const hasil = await sekatGambar(file);
    kar.gambar = hasil;
    karEl.preview.src = hasil.dataURL;
    karEl.dzInfo.textContent = `${hasil.lebar}×${hasil.tinggi} px · ±${Math.max(1, Math.round(hasil.dataURL.length / 1024))} KB setelah dikompres`;
    karEl.dropzone.classList.add("has-file");
  } catch (err) {
    kar.gambar = null;
    karEl.dzEmpty.classList.remove("hidden");
    karEl.dzPreview.classList.add("hidden");
    karEl.dropzone.classList.remove("has-file");
    tampilkanErr("err-file", null, String(err));
  }
  karEl.preview.style.visibility = "";
}

function hapusKarya(w) {
  if (!confirm(`Hapus karya "${w.judul}" dari galerimu?`)) return;
  galEl.dialog.close();
  const k = GALERI.find((x) => x.karya.includes(w));
  if (k) {
    k.karya = k.karya.filter((x) => x !== w);
    if (!k.karya.length && k.ket === "Koleksi buatan member") {
      if (galState.koleksi === k.slug) galState.koleksi = null;
      GALERI.splice(GALERI.indexOf(k), 1);
    }
  }
  simpanKaryaLokal();
  if (!galState.koleksi) history.replaceState(null, "", "#galeri");
  renderGaleri();
  toast("Karya dihapus dari galerimu");
}

async function kirimKarya(e) {
  e.preventDefault();
  const judul = karEl.judul.value.trim();
  const pembuat = karEl.pembuat.value.trim();
  const cerita = karEl.cerita.value.trim();
  let ok = true;
  tampilkanErr(
    "err-judul",
    karEl.judul,
    judul ? "" : "Isi judul karya dulu, ya.",
  );
  ok = ok && !!judul;
  tampilkanErr("err-pembuat", karEl.pembuat, pembuat ? "" : "Siapa nama kamu?");
  ok = ok && !!pembuat;
  tampilkanErr(
    "err-file",
    null,
    kar.gambar ? "" : "Pilih gambarnya dulu — klik kotak atau tarik filenya.",
  );
  ok = ok && !!kar.gambar;
  const namaBaru = kar.koleksiBaru ? karEl.koleksiBaru.value.trim() : "";
  if (kar.koleksiBaru && !namaBaru) {
    karEl.koleksiBaru.classList.add("is-salah");
    karEl.koleksiBaru.focus();
    return;
  }
  if (!ok) return;

  karEl.kirim.disabled = true;
  karEl.kirimLbl.textContent = "Memproses…";
  await new Promise((r) => setTimeout(r, 40));

  const slug = kar.koleksiBaru ? slugify(namaBaru) : karEl.koleksi.value;
  let koleksi = GALERI.find((k) => k.slug === slug);
  if (!koleksi) {
    koleksi = { slug, nama: namaBaru, ket: "Koleksi buatan member", karya: [] };
    GALERI.push(koleksi);
  }
  koleksi.karya.push({
    id: "l" + Date.now(),
    judul,
    pembuat,
    tgl: new Date().toISOString().slice(0, 10),
    suka: 0,
    disukai: false,
    img: kar.gambar.dataURL,
    desk: cerita || "Unggahan member komunitas.",
    lokal: true,
  });
  const tuntas = simpanKaryaLokal();

  karEl.kirim.disabled = false;
  karEl.kirimLbl.textContent = "Unggah Karya";
  karEl.dlg.close();
  const hashBaru = `galeri/${slug}`;
  if (location.hash === `#${hashBaru}`) {
    galState.koleksi = slug;
    renderGaleri();
  } else {
    location.hash = hashBaru;
  }
  toast(
    tuntas
      ? `Karya terunggah — terima kasih, ${pembuat}!`
      : "Karya tampil sekarang, tapi kuota penuh — tak tersimpan permanen",
  );
}

function initUnggahan() {
  karEl.dlg = $("#modal-unggah");
  karEl.form = $("#form-unggah");
  karEl.dropzone = $("#u-dropzone");
  karEl.file = $("#u-file");
  karEl.dzEmpty = $("#u-dz-empty");
  karEl.dzPreview = $("#u-dz-preview");
  karEl.preview = $("#u-preview");
  karEl.dzInfo = $("#u-dz-info");
  karEl.judul = $("#u-nama-karya");
  karEl.pembuat = $("#u-pembuat");
  karEl.cerita = $("#u-cerita");
  karEl.koleksi = $("#u-koleksi");
  karEl.koleksiBaru = $("#u-koleksi-baru");
  karEl.tglKoleksi = $("#u-tgl-koleksi");
  karEl.kirim = $("#u-kirim");
  karEl.kirimLbl = $("#u-kirim-lbl");

  $("#btn-unggah").addEventListener("click", bukaUnggahKarya);

  karEl.dropzone.addEventListener("click", () => karEl.file.click());
  karEl.dropzone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      karEl.file.click();
    }
  });
  karEl.file.addEventListener(
    "change",
    () => karEl.file.files[0] && terimaGambar(karEl.file.files[0]),
  );
  ["dragover", "dragenter"].forEach((ev) =>
    karEl.dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      karEl.dropzone.classList.add("is-drag");
    }),
  );
  ["dragleave", "drop"].forEach((ev) =>
    karEl.dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      karEl.dropzone.classList.remove("is-drag");
    }),
  );
  karEl.dropzone.addEventListener("drop", (e) => {
    const f = e.dataTransfer?.files?.[0];
    if (f) terimaGambar(f);
  });

  karEl.tglKoleksi.addEventListener("click", () => {
    kar.koleksiBaru = !kar.koleksiBaru;
    karEl.koleksi.classList.toggle("hidden", kar.koleksiBaru);
    karEl.koleksiBaru.classList.toggle("hidden", !kar.koleksiBaru);
    karEl.koleksiBaru.classList.remove("is-salah");
    karEl.tglKoleksi.textContent = kar.koleksiBaru
      ? "Pilih koleksi yang sudah ada…"
      : "Atau buat koleksi baru…";
    if (kar.koleksiBaru) karEl.koleksiBaru.focus();
  });
  karEl.koleksiBaru.addEventListener("input", () =>
    karEl.koleksiBaru.classList.remove("is-salah"),
  );

  karEl.form.addEventListener("submit", kirimKarya);
  $("#u-tutup").addEventListener("click", () => karEl.dlg.close());
  $("#u-batal").addEventListener("click", () => karEl.dlg.close());
}

let tipKat = "mk";
const tipEl = {};

function resetTip() {
  tipEl.form.reset();
  tipKat = "mk";
  tipEl.kat.querySelectorAll(".chip").forEach((c) => {
    c.classList.toggle("is-on", c.dataset.kat === "mk");
    c.setAttribute("aria-pressed", String(c.dataset.kat === "mk"));
  });
  ["err-t-judul", "err-t-isi", "err-t-nama"].forEach((id) =>
    $(`#${id}`).classList.add("hidden"),
  );
  [tipEl.judul, tipEl.isi, tipEl.nama].forEach((el) =>
    el.classList.remove("is-salah"),
  );
  tipEl.kirim.disabled = false;
  tipEl.kirimLbl.textContent = "Bagikan Tip";
}

function kirimTip(e) {
  e.preventDefault();
  const judul = tipEl.judul.value.trim();
  const isi = tipEl.isi.value.trim();
  const nama = tipEl.nama.value.trim();
  let ok = true;
  tampilkanErr("err-t-judul", tipEl.judul, judul ? "" : "Beri judul tipmu.");
  ok = ok && !!judul;
  tampilkanErr(
    "err-t-isi",
    tipEl.isi,
    isi ? "" : "Tulis tipnya — walau sepatah.",
  );
  ok = ok && !!isi;
  tampilkanErr("err-t-nama", tipEl.nama, nama ? "" : "Siapa nama kamu?");
  ok = ok && !!nama;
  if (!ok) return;

  tipEl.kirim.disabled = true;
  tipEl.kirimLbl.textContent = "Memproses…";
  TIPS.unshift({
    id: "ts" + Date.now(),
    kat: tipKat,
    judul,
    ringkas: isi,
    penulis: nama,
    waktu: "baru saja",
    suka: 0,
    disukai: false,
    disimpan: false,
    lokal: true,
  });
  const tuntas = simpanTipsLokal();
  if (state.kat !== "semua" && state.kat !== tipKat) setFilter("semua");
  else renderTips();
  tipEl.dlg.close();
  toast(
    tuntas
      ? "Tip terkirim — semoga menolong temanmu!"
      : "Tip tampil, tapi kuota penuh — tak tersimpan permanen",
  );
}

function initTips() {
  tipEl.dlg = $("#modal-tip");
  tipEl.form = $("#form-tip");
  tipEl.kat = $("#t-kategori");
  tipEl.judul = $("#t-judul-input");
  tipEl.isi = $("#t-isi");
  tipEl.nama = $("#t-nama");
  tipEl.kirim = $("#t-kirim");
  tipEl.kirimLbl = $("#t-kirim-lbl");

  $("#btn-bagi").addEventListener("click", () => {
    resetTip();
    tipEl.dlg.showModal();
    tipEl.judul.focus();
  });
  tipEl.kat.addEventListener("click", (e) => {
    const b = e.target.closest("[data-kat]");
    if (!b) return;
    tipKat = b.dataset.kat;
    tipEl.kat.querySelectorAll(".chip").forEach((c) => {
      c.classList.toggle("is-on", c === b);
      c.setAttribute("aria-pressed", String(c === b));
    });
  });
  tipEl.form.addEventListener("submit", kirimTip);
  $("#t-tutup").addEventListener("click", () => tipEl.dlg.close());
  $("#t-batal").addEventListener("click", () => tipEl.dlg.close());
}

const ICN = {
  pen: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>`,
  karya: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="m5.5 17 4-4 3 3 3.5-3.5 2.5 2.5" /></svg>`,
  grup: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>`,
  tetes: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" /></svg>`,
};

const NOTIF = [
  {
    jenis: "tip",
    judul: "Tip baru dari Dewi Larasati",
    teks: "Menyiapkan kelir gading dari kertas biasa",
    waktu: "2 jam lalu",
    tujuan: "#tips-grid",
  },
  {
    jenis: "karya",
    judul: "Ki Sutarsa mengunggah karya",
    teks: "Semar Ing Truntum → Kelir Malam Ruwat",
    waktu: "5 jam lalu",
    tujuan: "#galeri",
    hash: "galeri/malam-ruwat",
  },
  {
    jenis: "grup",
    judul: "Ajakan dari Mega Ayuningtyas",
    teks: "Gabung ke grup Canting Digital, yuk!",
    waktu: "1 hari lalu",
    tujuan: "#grup",
  },
];

function initNotif() {
  const wrap = $("#notif-wrap");
  const btn = $("#btn-notif");
  const panel = $("#panel-notif");
  const badge = $("#notif-badge");
  const lbl = $("#notif-jumlah");
  const listEl = $("#list-notif");

  const render = () => {
    listEl.innerHTML = NOTIF.map(
      (n, i) => `
      <li>
        <button data-notif="${i}" class="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-soga-50 ${n.baca ? "" : "bg-soga-50/60"}">
          <span class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-soga-100 text-soga-600">${ICN[n.jenis]}</span>
          <span class="min-w-0">
            <span class="block text-[13px] font-bold text-tinta-900">${n.judul}</span>
            <span class="block truncate text-xs text-tinta-500">${n.teks}</span>
            <span class="mt-0.5 block text-[10px] font-semibold uppercase tracking-wider text-tinta-500">${n.waktu}</span>
          </span>
        </button>
      </li>`,
    ).join("");
    const belum = NOTIF.filter((n) => !n.baca).length;
    badge.textContent = belum;
    badge.classList.toggle("hidden", belum === 0);
    lbl.textContent = belum ? `Ada ${belum} baru` : "Semua terbaca";
  };

  const setOpen = (open) => {
    panel.toggleAttribute("hidden", !open);
    btn.setAttribute("aria-expanded", String(open));
    if (open) {
      NOTIF.forEach((n) => (n.baca = true));
      render();
    }
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(panel.hasAttribute("hidden"));
  });

  document.addEventListener("click", (e) => {
    if (!panel.hasAttribute("hidden") && !wrap.contains(e.target))
      setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
  listEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-notif]");
    if (!b) return;
    const n = NOTIF[+b.dataset.notif];
    n.baca = true;
    setOpen(false);
    render();
    if (n.hash) location.hash = n.hash;
    $(n.tujuan)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  render();
}

const KUNCI_GRUP = "wk-grup-join";
const chat = { slug: null, sibuk: false };
const chatEl = {};

const GRUP = [
  {
    slug: "sanggar-kelir-gading",
    nama: "Sanggar Kelir Gading",
    ket: "Berkumpul dan melestarikan seni sungging",
    jumlah: 128,
    ikon: ICN.grup,
    anggota: ["Nadia Pratiwi", "Ki Sutarsa", "Mega Ayuningtyas"],
    pesan: [
      {
        dari: "Nadia Pratiwi",
        teks: "Punten, Sabtu ini nyungging bareng pakai soga secang baru. Bawa canting masing-masing, ya!",
        waktu: "09.12",
      },
      {
        dari: "Ki Sutarsa",
        teks: "Siap — aku bawa kelir bekas lomba buat dipraktikkan bareng.",
        waktu: "09.15",
      },
    ],
  },
  {
    slug: "canting-digital",
    nama: "Canting Digital",
    ket: "Eksplorasi motif dan seni digital bersama",
    jumlah: 87,
    ikon: ICN.pen,
    anggota: ["Dewi Larasati", "Vina Ardiyanti", "Damar Anjani"],
    pesan: [
      {
        dari: "Dewi Larasati",
        teks: "Dhapur mingguan baru terpasang di Studio Kreasi — coba turunkan ke dalunganmu sendiri, ya!",
        waktu: "Kemarin",
      },
    ],
  },
  {
    slug: "soga-alami",
    nama: "Soga Alami",
    ket: "Eksplorasi warna alami dan teknik pewarnaan tradisional bersama",
    jumlah: 64,
    ikon: ICN.tetes,
    anggota: ["Nadia Pratiwi", "Laras Wulandari"],
    pesan: [
      {
        dari: "Laras Wulandari",
        teks: "Hasil rendam secang semalam terlihat mendidih — warnanya lebih hangat daripada minggu kemarin.",
        waktu: "08.40",
      },
    ],
  },
  {
    slug: "pagelaran-ruwat",
    nama: "Pagelaran & Ruwat",
    ket: "Koordinasi jadwal dan persiapan pagelaran bersama",
    jumlah: 152,
    ikon: ICN.pen,
    anggota: ["Bagas Wicaksono", "Galih Prakoso", "Arum Prameswari"],
    pesan: [
      {
        dari: "Bagas Wicaksono",
        teks: "Gayamharjo mengadakan malam ruwat pekan depan — regu nyaring masih kurang satu orang.",
        waktu: "19.02",
      },
    ],
  },
];

const BALASAN = [
  "Setuju! Nanti malam kita bahas bareng di sini…",
  "Wah menarik — cerita dong langkah-langkahnya, aku ikut catat.",
  "Punten numpang tanya: isen itu dikerjakan menyambung atau seketrak?",
  "Ayo kerja gandeng pekan depan, aku borong galarannya.",
  "Duh, kelirku masih bundes… podo semangat, ya!",
  "Mantap! Kelir ruang gading memang butuh sentuhan itu.",
];

const jam = () =>
  new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

function simpanGabungan() {
  simpanGudang(
    KUNCI_GRUP,
    GRUP.filter((g) => g.bergabung).map((g) => g.slug),
  );
}

function grupBarisHTML(g, i) {
  return `
  <li data-grup="${g.slug}" class="border-b border-gading-300" data-card style="--no:${i}">
    <div class="grup-baris">
      <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-soga-50 text-soga-600" aria-hidden="true">${g.ikon}</span>
      <span class="min-w-0 flex-1">
        <span class="flex flex-wrap items-baseline gap-x-3 gap-y-0">
          <span class="text-sm font-bold text-tinta-900">${g.nama}</span>
          ${g.bergabung ? `<span class="catatan text-base text-soga-600">kamu anggota</span>` : ""}
        </span>
        <span class="mt-0.5 block truncate text-xs font-semibold text-tinta-500">${g.ket} · ${g.jumlah} anggota</span>
      </span>
      <button type="button" class="tombol-grup ${g.bergabung ? "tombol-grup-aktif" : ""}"
        aria-label="${g.bergabung ? `Buka obrolan ${g.nama}` : `Gabung ke ${g.nama}`}">
        ${g.bergabung ? "Buka obrolan" : "Gabung"}
      </button>
    </div>
  </li>`;
}

function renderGrup() {
  $("#grup-grid").innerHTML = GRUP.map(grupBarisHTML).join("");
}

function aksiGrup(slug) {
  const g = GRUP.find((x) => x.slug === slug);
  if (!g) return;
  if (!g.bergabung) {
    g.bergabung = true;
    simpanGabungan();
    renderGrup();
    toast(`Kamu gabung ke ${g.nama} — selamat datang!`);
  }
  bukaChat(g);
}

function bubbleHTML(p) {
  const keluar = p.dari === "kamu";
  return `
  <div class="flex ${keluar ? "justify-end" : "justify-start"}">
    <div class="chat-bubble ${keluar ? "chat-keluar" : "chat-masuk"}">
      ${keluar ? "" : `<p class="text-[10px] font-bold text-soga-600">${p.dari}</p>`}
      <p>${p.teks}</p>
      <p class="mt-0.5 text-right text-[9px] font-semibold ${keluar ? "text-gading-100/80" : "text-tinta-500"}">${p.waktu}</p>
    </div>
  </div>`;
}

function renderChat() {
  const g = GRUP.find((x) => x.slug === chat.slug);
  if (!g) return;
  chatEl.list.innerHTML =
    g.pesan.map(bubbleHTML).join("") +
    (chat.sibuk
      ? `<div class="flex justify-start"><div class="chat-bubble chat-masuk text-tinta-500 italic">tulis-tulisan…</div></div>`
      : "");
  chatEl.list.scrollTop = chatEl.list.scrollHeight;
}

function balasanDummy() {
  if (chat.sibuk) return;
  chat.sibuk = true;
  renderChat();
  const slug = chat.slug;
  setTimeout(() => {
    chat.sibuk = false;
    const g = GRUP.find((x) => x.slug === slug);
    if (!g) return;
    g.pesan.push({
      dari: g.anggota[Math.floor(Math.random() * g.anggota.length)],
      teks: BALASAN[Math.floor(Math.random() * BALASAN.length)],
      waktu: jam(),
    });
    if (chat.slug === slug) renderChat();
  }, 1100);
}

function bukaChat(g) {
  chat.slug = g.slug;
  chat.sibuk = false;
  chatEl.judul.textContent = g.nama;
  chatEl.ket.textContent = `${fmtAngka(g.jumlah)} anggota · ${g.ket}`;
  chatEl.ikon.innerHTML = g.ikon;
  renderChat();
  chatEl.drawer.classList.remove("translate-x-full");
  chatEl.drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("overflow-hidden");
  chatEl.input.focus();
}

function tutupChat() {
  chatEl.drawer.classList.add("translate-x-full");
  chatEl.drawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overflow-hidden");
  chat.slug = null;
}

function initGrup() {
  const gabungan = muatGudang(KUNCI_GRUP, ["sanggar-kelir-gading"]);
  GRUP.forEach((g) => (g.bergabung = gabungan.includes(g.slug)));

  chatEl.drawer = $("#drawer-chat");
  chatEl.judul = $("#chat-judul");
  chatEl.ket = $("#chat-ket");
  chatEl.ikon = $("#chat-ikon");
  chatEl.list = $("#chat-list");
  chatEl.input = $("#chat-input");
  chatEl.form = $("#chat-form");

  $("#grup-grid").addEventListener("click", (e) => {
    const kartu = e.target.closest("[data-grup]");
    if (kartu) aksiGrup(kartu.dataset.grup);
  });
  $("#chat-tutup").addEventListener("click", tutupChat);
  $("#chat-keluar").addEventListener("click", () => {
    const g = GRUP.find((x) => x.slug === chat.slug);
    if (!g || !confirm(`Keluar dari grup ${g.nama}?`)) return;
    g.bergabung = false;
    simpanGabungan();
    renderGrup();
    tutupChat();
    toast(`Kamu keluar dari ${g.nama}`);
  });
  chatEl.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const teks = chatEl.input.value.trim();
    if (!teks || !chat.slug) return;
    const g = GRUP.find((x) => x.slug === chat.slug);
    g.pesan.push({ dari: "kamu", teks, waktu: jam() });
    chatEl.input.value = "";
    renderChat();
    balasanDummy();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chat.slug) tutupChat();
  });

  renderGrup();
}

const blogEl = {};

function initBlog() {
  blogEl.dlg = $("#modal-kisah");
  $("#blog").addEventListener("click", (e) => {
    const kartu = e.target.closest("[data-kisah]");
    if (kartu) bukaKisah(+kartu.dataset.kisah);
  });
}

function bukaKisah(i) {
  const k = KISAH[i];
  if (!k) return;
  const d = blogEl.dlg;
  d.innerHTML = `
    <div class="relative">
      <img src="${k.img}" alt="${k.judul}" data-fbk="kisah" />
      <button id="bk-tutup" class="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-tinta-900/60 text-gading-50 transition hover:bg-tinta-900/80" aria-label="Tutup artikel">${ICX.tutup}</button>
    </div>
    <div class="p-5 pt-4">
      <span class="cat-pill">${k.pill}</span>
      <h3 id="bk-judul" class="mt-2.5 font-display text-xl font-bold text-tinta-900">${k.judul}</h3>
      <div class="mt-2 flex items-center gap-2">
        <span class="grid h-7 w-7 place-items-center rounded-full bg-soga-100 text-[10px] font-bold text-soga-700" aria-hidden="true">${inisial(k.nama)}</span>
        <span class="text-xs font-bold text-tinta-600">${k.nama}</span>
      </div>
      <p class="mt-3 text-sm leading-relaxed text-tinta-500">${k.isi}</p>
    </div>`;
  bindFallback(d);
  d.querySelector("#bk-tutup").addEventListener("click", () => d.close());
  d.showModal();
}

function renderRank() {
  const daftar = $("#rank-list");
  if (!daftar) return;

  const rekap = new Map();
  const catat = (nama, tip, karya, suka, kamu = false) => {
    nama = (nama || "").trim();
    if (!nama) return;
    const r = rekap.get(nama) ?? {
      nama,
      tip: 0,
      karya: 0,
      suka: 0,
      kamu: false,
    };
    r.tip += tip;
    r.karya += karya;
    r.suka += suka;
    r.kamu = r.kamu || kamu;
    rekap.set(nama, r);
  };
  TIPS.forEach((t) => catat(t.penulis, 1, 0, t.suka, t.lokal));
  GALERI.forEach((k) =>
    k.karya.forEach((w) => catat(w.pembuat, 0, 1, w.suka, w.lokal)),
  );

  const rank = [...rekap.values()]
    .filter((r) => r.tip + r.karya > 0)
    .map((r) => ({ ...r, poin: r.suka + r.tip * 100 + r.karya * 150 }))
    .sort((a, b) => b.poin - a.poin)
    .slice(0, 5);

  daftar.innerHTML = rank
    .map(
      (r, i) => `
      <li class="flex items-center gap-2.5 rounded-lg px-2 py-1.5 ${r.kamu ? "bg-soga-50" : i === 0 ? "bg-gading-100/60" : ""}" data-card style="--no:${i}">
        <span class="w-4 shrink-0 text-xs font-bold tabular-nums ${i === 0 ? "text-soga-600" : "text-tinta-500"}" aria-label="Peringkat ${i + 1}">${i + 1}</span>
        <span class="min-w-0 flex-1">
          <span class="flex items-baseline gap-x-2">
            <span class="truncate text-xs font-bold text-tinta-900">${r.nama}</span>
            ${r.kamu ? `<span class="catatan shrink-0 text-sm text-soga-600">kamu</span>` : ""}
          </span>
          <span class="block text-[10px] font-semibold text-tinta-500">${r.tip} tip · ${r.karya} karya</span>
        </span>
        <span class="shrink-0 text-xs font-bold tabular-nums ${i === 0 ? "text-soga-600" : "text-tinta-600"}">${fmtAngka(r.poin)}</span>
      </li>`,
    )
    .join("");
}

function initReveal() {
  document.documentElement.classList.add("punya-reveal");
  const obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-muncul");
          obs.unobserve(e.target);
        }
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));
}

muatLokal();
renderBlog();
renderTips();
initGaleri();
initUnggahan();
initTips();
initGrup();
initBlog();
initNotif();
initReveal();
