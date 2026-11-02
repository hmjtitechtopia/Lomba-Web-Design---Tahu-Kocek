
document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("notif-wrap");
  const btn = document.getElementById("btn-notif");
  const panel = document.getElementById("panel-notif");
  const badge = document.getElementById("notif-badge");
  const jumlahEl = document.getElementById("notif-jumlah");
  const listEl = document.getElementById("list-notif");

  if (!wrap || !btn || !panel || !badge || !jumlahEl || !listEl) return;

  const NOTIFIKASI = [
    {
      nama: "Nadia Pratiwi",
      aksi: "membagikan tip baru: \u201cMenyiapkan Kelir Gading dari Kertas Biasa\u201d.",
      waktu: "2 jam lalu",
    },
    {
      nama: "Ki Sutarsa",
      aksi: "menyukai tip kamu: \u201cRahasia Garis Tipis ala Pena Canting\u201d.",
      waktu: "5 jam lalu",
    },
    {
      nama: "Bagas Wicaksono",
      aksi: "menjawab diskusimu di grup Canting & Kuas.",
      waktu: "7 jam lalu",
    },
    {
      nama: "Dewi Larasati",
      aksi: "mengundangmu ke grup obrolan \u201cKelas Canting Digital\u201d.",
      waktu: "10 jam lalu",
    },
    {
      nama: "Mega Ayuningtyas",
      aksi: "mengomentari karyamu di galeri komunitas.",
      waktu: "Kemarin",
    },
  ];

  const WARNA_AVATAR = [
    "#A71D31",
    "#a9530b",
    "#721C24",
    "#c26a10",
    "#83410a",
  ];

  const itemNotifHTML = (n, i) => `
    <li class="flex items-start gap-3 px-4 py-3 transition-colors duration-150 hover:bg-stone-50">
      <span aria-hidden="true"
        class="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
        style="background:${WARNA_AVATAR[i % WARNA_AVATAR.length]}">
        ${n.nama.charAt(0)}
      </span>
      <div class="min-w-0">
        <p class="text-[13px] leading-snug text-[#3F0D12]">
          <span class="font-bold">${n.nama}</span> ${n.aksi}
        </p>
        <p class="mt-0.5 text-[11px] font-medium text-stone-500">${n.waktu}</p>
      </div>
    </li>`;

  const render = () => {
    const jumlah = NOTIFIKASI.length;
    badge.textContent = jumlah;
    listEl.innerHTML = NOTIFIKASI.map(itemNotifHTML).join("");
  };

  const perbaruiJumlahPanel = () => {
    const belum = badge.hidden;
    jumlahEl.textContent = belum
      ? `${NOTIFIKASI.length} baru`
      : `${NOTIFIKASI.length} notifikasi`;
  };

  const bukaPanel = () => {
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    if (!badge.hidden) {
      badge.hidden = true;
    }
    perbaruiJumlahPanel();
  };

  const tutupPanel = () => {
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", () => {
    if (panel.hidden) {
      bukaPanel();
    } else {
      tutupPanel();
    }
  });

  document.addEventListener("click", (e) => {
    if (!panel.hidden && !wrap.contains(e.target)) {
      tutupPanel();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) {
      tutupPanel();
    }
  });

  if (!document.getElementById("anim-notif-keyframes")) {
    const style = document.createElement("style");
    style.id = "anim-notif-keyframes";
    style.textContent =
      "@keyframes notif-turun-masuk{from{opacity:0;transform:translateY(-6px)}}" +
      "#panel-notif:not([hidden]){animation:notif-turun-masuk .22s ease both}";
    document.head.appendChild(style);
  }

  render();
  badge.hidden = false;
  btn.setAttribute("aria-haspopup", "true");
});
