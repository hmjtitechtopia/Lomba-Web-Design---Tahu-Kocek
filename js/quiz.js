
(function () {
  "use strict";

 
  var POOL = [
    {
      t: "Wayang kulit berasal dari daerah?",
      opsi: ["Kalimantan", "Bali", "Jawa", "Sumatra"],
      kunci: 2,
    },
    {
      t: "Bahan utama wayang golek adalah\u2026",
      opsi: ["kulit", "kertas", "kain", "kayu"],
      kunci: 3,
    },
    {
      t: "Wayang suluh mengangkat tokoh manusia masa kini. Satu-satunya yang TIDAK cocok jadi tokohnya adalah\u2026",
      opsi: ["petani", "pejuang", "dewa", "pemimpin"],
      kunci: 2,
    },
    {
      t: "Wayang kulit purwa mengangkat kisah dari dua kitab, yaitu\u2026",
      opsi: [
        "Bimo Suci & Murwakala",
        "Mahabharata & Ramayana",
        "Kala Kencana & Prahara",
        "Arjunawiwaha & Sutasoma",
      ],
      kunci: 1,
    },
    {
      t: "Dua kelompok besar yang rebutan takhta dalam Mahabharata adalah\u2026",
      opsi: [
        "Pandawa & Kurawa",
        "Rama & Rawana",
        "Pandawa & Wanara",
        "Kurawa & Alengka",
      ],
      kunci: 0,
    },
    {
      t: "Wayang banjar tumbuh pesat di daerah\u2026",
      opsi: ["Jawa Barat", "Sumatra Selatan", "Kalimantan Selatan", "Papua"],
      kunci: 2,
    },
    {
      t: "Wayang kulit bali berakar di\u2026",
      opsi: ["Jogja", "Sumatra", "Kalimantan", "Pulau Bali"],
      kunci: 3,
    },
    {
      t: "Wayang golek paling dekat dengan budaya masyarakat\u2026",
      opsi: ["Sunda \u2014 Jawa Barat", "Jawa Timur", "Bali", "Betawi"],
      kunci: 0,
    },
    {
      t: "Menurut materi di halaman ini, wayang kulit purwa populer di\u2026",
      opsi: [
        "Jawa Tengah & Yogyakarta",
        "Jawa Timur",
        "Banten",
        "Madura",
      ],
      kunci: 0,
    },
    {
      t: "Wayang kancil dicipta khusus untuk menyampaikan cerita\u2026",
      opsi: [
        "fabel tentang hewan",
        "sejarah pewayangan",
        "epik peperangan",
        "dongeng kraton",
      ],
      kunci: 0,
    },
    {
      t: "Watak Sang Kancil yang membuat ceritanya berkesan adalah\u2026",
      opsi: ["kaya", "kuat", "cerdik", "sakti"],
      kunci: 2,
    },
    {
      t: "Jenis wayang yang mengisahkan pejuang, petani, dan pemimpin masa kini adalah\u2026",
      opsi: [
        "wayang kancil",
        "wayang suluh",
        "wayang golek",
        "wayang kulit bali",
      ],
      kunci: 1,
    },
    {
      t: "Dari keempat pilihan ini, yang BUKAN tokoh \u2014 melainkan jenis wayang \u2014 adalah\u2026",
      opsi: ["Semar", "Sinta", "Sakuni", "Wayang Golek"],
      kunci: 3,
    },
    {
      t: "Cerita wayang kancil paling pas disuguhkan untuk\u2026",
      opsi: ["anak-anak", "kaum bangsawan", "pedagang", "pendeta"],
      kunci: 0,
    },
    {
      t: "Tokoh Mahabharata yang terkenal licik dan ahli tipu muslihat adalah\u2026",
      opsi: ["Sinta", "Semar", "Sakuni", "Arjuna"],
      kunci: 2,
    },
    {
      t: "Tokoh Punakawan yang selalu jadi penasihat para ksatria adalah\u2026",
      opsi: ["Semar", "Sakuni", "Srikandi", "Sinta"],
      kunci: 0,
    },
    {
      t: "Semar, Gareng, Petruk, dan Bagong dikenal sebagai kelompok tokoh\u2026",
      opsi: ["Para ksatria", "Punakawan", "Kurawa", "Pandawa"],
      kunci: 1,
    },
    {
      t: "Dewi Sinta dalam kisah Ramayana melambangkan\u2026",
      opsi: ["kegigihan", "kecerdikan", "kesetiaan", "keberanian"],
      kunci: 2,
    },
    {
      t: "Rupa-rupanya, tokoh Sinta itu datangnya dari kisah\u2026",
      opsi: ["Ramayana", "Mahabharata", "Wayang Banjar", "Wayang Kancil"],
      kunci: 0,
    },
    {
      t: "Di barisan \u201cList Wayang\u201d di halaman ini, tokoh yang ditempatkan di atas latar gradasi merah khas situs adalah\u2026",
      opsi: ["Srikandi", "Semar", "Sakuni", "Arjuna"],
      kunci: 3,
    },
  ];

  var JUMLAH_MAIN = 10; 
  var HURUF = ["A", "B", "C", "D"];
  var NILAI_MAKS = 100;
  var DURASI_GULIR = 1300; 

 
  var PUJIAN = ["Mantap!", "Tepat sekali!", "Betul, itu dia!", "Bagus \u2014 lanjut!"];
  var SALAH_PEMBUKA = ["Kurang tepat", "Belum pas", "Hampir!"];

 
  var section = document.getElementById("quiz");
  if (!section) return;

  var faseIntro = document.getElementById("quiz-intro");
  var faseKuis = document.getElementById("quiz-play");
  var faseHasil = document.getElementById("quiz-result");
  var tombolMulai = document.getElementById("quiz-start");
  var progres = document.getElementById("quiz-progress");
  var labelSisa = document.getElementById("quiz-count");
  var ruangSoal = document.getElementById("quiz-body");
  var teksSoal = document.getElementById("quiz-question");
  var daftarOpsi = document.getElementById("quiz-options");
  var banner = document.getElementById("quiz-feedback");
  var tombolLanjut = document.getElementById("quiz-next");
  var angkaNilai = document.getElementById("quiz-score");
  var busurRing = document.getElementById("quiz-ring");
  var pesanHasil = document.getElementById("quiz-verdict");
  var tombolUlangi = document.getElementById("quiz-retry");
  var kartuQuiz = document.getElementById("quiz-card");
  var tombolKeluar = document.getElementById("quiz-exit");
  var labelWaktu = document.getElementById("quiz-time");
  var statBenar = document.getElementById("quiz-stat-benar");
  var statSalah = document.getElementById("quiz-stat-salah");
  var statPoin = document.getElementById("quiz-stat-poin");
  var statWaktu = document.getElementById("quiz-stat-waktu");
  var panelLb = document.getElementById("quiz-leaderboard");
  var daftarLb = document.getElementById("quiz-lb-list");
  if (!faseIntro || !faseKuis || !faseHasil || !tombolMulai) return;

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  
  var sesi = [];
  var indeks = 0;
  var benar = 0;
  var sudahPeriksa = false;
  var opsiDipilih = -1; 
  var petaOpsi = null;
  var kunciTampil = -1;
  var berputar = false;

 
  var waktuMulai = 0;
  var durasiMs = 0;
  var jamHitung = null;
  var terkunci = false;

  function acakSusun(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tukar = arr[i];
      arr[i] = arr[j];
      arr[j] = tukar;
    }
    return arr;
  }

  function ambilAcak(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  
  function formatWaktu(ms) {
    var total = Math.round(ms / 1000);
    var m = Math.floor(total / 60);
    var s = total % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function jalankanJam() {
    hentikanJam();
    if (!labelWaktu) return;
    labelWaktu.textContent = formatWaktu(Date.now() - waktuMulai);
    jamHitung = window.setInterval(function () {
      labelWaktu.textContent = formatWaktu(Date.now() - waktuMulai);
    }, 1000);
  }

  function hentikanJam() {
    if (jamHitung) {
      window.clearInterval(jamHitung);
      jamHitung = null;
    }
  }

 
  function bukaFokus() {
    terkunci = true;
    section.classList.add("qz-focus");
    if (kartuQuiz) kartuQuiz.classList.add("qz-fixed");
    document.body.classList.add("qz-lock");
    if (tombolKeluar) tombolKeluar.hidden = false;
  }

  
  function keluarkanPop(el) {
    if (!el || reduceMotion) return;
    el.classList.remove("qz-appear");
    void el.offsetWidth;
    el.classList.add("qz-appear");
  }

  function tutupFokus() {
    terkunci = false;
    hentikanJam();
    section.classList.remove("qz-focus");
    if (kartuQuiz) kartuQuiz.classList.remove("qz-fixed");
    document.body.classList.remove("qz-lock");
    if (tombolKeluar) tombolKeluar.hidden = true;
    keluarkanPop(panelLb);
    keluarkanPop(section.querySelector(".qz-head"));
  }

  
  var PAPAN_JUARA = [
    { nama: "Rara", skor: 95, durasi: 131000 },
    { nama: "Bagas", skor: 85, durasi: 187000 },
    { nama: "Sekar", skor: 70, durasi: 254000 },
    { nama: "Dimas", skor: 55, durasi: 341000 },
    { nama: "Ningsih", skor: 40, durasi: 418000 },
  ];

  function renderLb() {
    if (!daftarLb) return;
    daftarLb.innerHTML = "";

    PAPAN_JUARA.forEach(function (d, i) {
      var item = document.createElement("li");
      item.className = "qz-lb-item";

      var rank = document.createElement("span");
      rank.className = "qz-lb-rank";
      rank.textContent = String(i + 1);

      var nama = document.createElement("span");
      nama.className = "qz-lb-name";
      nama.textContent = d.nama;

     
      var skorCell = document.createElement("span");
      skorCell.className = "qz-lb-stat";
      var skorVal = document.createElement("span");
      skorVal.className = "qz-lb-val";
      skorVal.textContent = d.skor + "/100";
      var skorCap = document.createElement("span");
      skorCap.className = "qz-lb-cap";
      skorCap.textContent = "Skor";
      skorCell.appendChild(skorVal);
      skorCell.appendChild(skorCap);

      var waktuCell = document.createElement("span");
      waktuCell.className = "qz-lb-stat";
      var waktuVal = document.createElement("span");
      waktuVal.className = "qz-lb-val";
      waktuVal.textContent = formatWaktu(d.durasi);
      var waktuCap = document.createElement("span");
      waktuCap.className = "qz-lb-cap";
      waktuCap.textContent = "Waktu";
      waktuCell.appendChild(waktuVal);
      waktuCell.appendChild(waktuCap);

      item.appendChild(rank);
      item.appendChild(nama);
      item.appendChild(skorCell);
      item.appendChild(waktuCell);
      daftarLb.appendChild(item);
    });
  }

  renderLb(); 
  
  function tampilkanFase(nama) {
    faseIntro.hidden = nama !== "intro";
    faseKuis.hidden = nama !== "kuis";
    faseHasil.hidden = nama !== "hasil";
  }

  
  function susunSesi() {
    sesi = acakSusun(POOL.slice()).slice(0, JUMLAH_MAIN);
  }

 
  function tampilkanSoal() {
    sudahPeriksa = false;
    opsiDipilih = -1;
    banner.hidden = true;
    banner.className = "qz-banner";
    tombolLanjut.disabled = true;
    tombolLanjut.textContent = "Periksa Jawaban";

    var soal = sesi[indeks];

    
    petaOpsi = acakSusun([0, 1, 2, 3]);
    kunciTampil = petaOpsi.indexOf(soal.kunci);

    labelSisa.textContent = "Soal " + (indeks + 1) + " dari " + JUMLAH_MAIN;
    teksSoal.textContent = soal.t;

    daftarOpsi.innerHTML = "";
    for (var i = 0; i < petaOpsi.length; i++) {
      var tombol = document.createElement("button");
      tombol.type = "button";
      tombol.className = "qz-option";
      tombol.setAttribute("aria-pressed", "false");
      tombol.dataset.key = String(i);
      var ikon = document.createElement("span");
      ikon.className = "qz-badge";
      ikon.textContent = HURUF[i];
      var teks = document.createElement("span");
      teks.className = "qz-option-text";
      teks.textContent = soal.opsi[petaOpsi[i]];
      tombol.appendChild(ikon);
      tombol.appendChild(teks);
      daftarOpsi.appendChild(tombol);
    }

    if (progres) {
      progres.style.width = ((indeks + 1) / JUMLAH_MAIN) * 100 + "%";
    }

    if (!reduceMotion && ruangSoal) {
      ruangSoal.classList.remove("qz-enter");
      void ruangSoal.offsetWidth;
      ruangSoal.classList.add("qz-enter");
    }
  }

 
  daftarOpsi.addEventListener("click", function (e) {
    if (sudahPeriksa) return;
    var tombol = e.target.closest(".qz-option");
    if (!tombol) return;
    opsiDipilih = Number(tombol.dataset.key);
    var semua = daftarOpsi.querySelectorAll(".qz-option");
    for (var i = 0; i < semua.length; i++) {
      semua[i].classList.toggle("qz-selected", semua[i] === tombol);
      semua[i].setAttribute(
        "aria-pressed",
        semua[i] === tombol ? "true" : "false"
      );
    }
    tombolLanjut.disabled = false;
  });

 
  tombolLanjut.addEventListener("click", function () {
    if (!sudahPeriksa) {
      periksaJawaban();
      return;
    }
    if (indeks < JUMLAH_MAIN - 1) {
      indeks++;
      tampilkanSoal();
    } else {
      tampilkanHasil();
    }
  });

  function periksaJawaban() {
    if (sudahPeriksa || opsiDipilih < 0) return;
    sudahPeriksa = true;
    var soal = sesi[indeks];
    var tepat = opsiDipilih === kunciTampil;
    if (tepat) benar++;

    var semua = daftarOpsi.querySelectorAll(".qz-option");
    for (var i = 0; i < semua.length; i++) {
      var nomor = Number(semua[i].dataset.key);
      if (nomor === kunciTampil) semua[i].classList.add("qz-key");
      if (nomor === opsiDipilih && nomor !== kunciTampil) {
        semua[i].classList.add("qz-wrong");
      }
      semua[i].classList.remove("qz-selected");
      semua[i].disabled = true;
    }

    banner.hidden = false;
    if (tepat) {
      banner.classList.add("qz-ok");
      banner.textContent = ambilAcak(PUJIAN);
    } else {
      banner.classList.add("qz-no");
      banner.textContent =
        ambilAcak(SALAH_PEMBUKA) + " \u2014 jawabannya: " + soal.opsi[soal.kunci];
    }

   
    if (indeks === JUMLAH_MAIN - 1) {
      durasiMs = Date.now() - waktuMulai;
    }

    tombolLanjut.textContent =
      indeks === JUMLAH_MAIN - 1 ? "Lihat Hasil" : "Soal Berikutnya \u2192";
  }

 
  function pesanNilai(nilai) {
    if (nilai === NILAI_MAKS) return "Dalang sejati \u2014 sempurna.";
    if (nilai >= 80) return "Kamu benar-benar paham wayang.";
    if (nilai >= 60) return "Cukup baik, tinggal asah sedikit.";
    if (nilai >= 40) return "Sudah jalan setengah, ayo lebih dalam lagi.";
    return "Belum lulus \u2014 hayu, pelajari kembali materinya.";
  }

  function tampilkanHasil() {
    tampilkanFase("hasil");
    var nilai = (benar / JUMLAH_MAIN) * NILAI_MAKS;

    pesanHasil.textContent =
      pesanNilai(nilai) + " (" + benar + " dari " + JUMLAH_MAIN + " benar)";

   
    var salah = JUMLAH_MAIN - benar;
    var poin = benar * 10;
    if (statBenar) statBenar.textContent = String(benar);
    if (statSalah) statSalah.textContent = String(salah);
    if (statPoin) statPoin.textContent = String(poin);
    if (statWaktu) statWaktu.textContent = formatWaktu(durasiMs);

   
    tutupFokus();

    
    if (pesanHasil.focus) {
      pesanHasil.focus({ preventScroll: true });
    }

    if (busurRing) {
     
      busurRing.style.transition = "none";
      aturRing(0);
      void busurRing.getBoundingClientRect();
      busurRing.style.transition = "";
    }

    if (reduceMotion) {
      angkaNilai.textContent = String(Math.round(nilai));
      aturRing(nilai);
      return;
    }

    aturRing(nilai);

    
    berputar = true;
    var awal = performance.now();
    function langkah(now) {
      if (!berputar) return;
      var p = Math.min((now - awal) / DURASI_GULIR, 1);
      var lembut = 1 - Math.pow(1 - p, 3);
      angkaNilai.textContent = String(Math.round(nilai * lembut));
      if (p < 1) {
        window.requestAnimationFrame(langkah);
      } else {
        angkaNilai.textContent = String(Math.round(nilai));
        berputar = false;
      }
    }
    window.requestAnimationFrame(langkah);
  }

  
  var LINGKAR_PENUH = 2 * Math.PI * 54; 
  function aturRing(nilai) {
    if (!busurRing) return;
    busurRing.style.strokeDashoffset = String(
      LINGKAR_PENUH * (1 - nilai / NILAI_MAKS)
    );
  }

  
  function mulaiQuiz() {
    indeks = 0;
    benar = 0;
    sudahPeriksa = false;
    opsiDipilih = -1;
    berputar = false;
    waktuMulai = Date.now();
    durasiMs = 0;
    susunSesi();
    bukaFokus();
    tampilkanFase("kuis");
    tampilkanSoal();
    jalankanJam();

   
    var opsiPertama = daftarOpsi.querySelector(".qz-option");
    if (opsiPertama) opsiPertama.focus({ preventScroll: true });
  }

 
  function keluarQuiz() {
    if (!terkunci) return;
    indeks = 0;
    benar = 0;
    sudahPeriksa = false;
    opsiDipilih = -1;
    berputar = false;
    tutupFokus();
    tampilkanFase("intro");
    if (tombolMulai) tombolMulai.focus({ preventScroll: true });
  }

  tombolMulai.addEventListener("click", mulaiQuiz);

  if (tombolUlangi) {
    tombolUlangi.addEventListener("click", mulaiQuiz);
  }

  if (tombolKeluar) {
    tombolKeluar.addEventListener("click", keluarQuiz);
  }

 
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && terkunci) {
      keluarQuiz();
    }
  });
})();
