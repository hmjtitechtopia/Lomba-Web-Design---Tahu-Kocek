(() => {
  'use strict';

  const SIZE = 720;            
  const ERASE_COLOR = '#f1f0cc';  
  const PALETTE = [
    { nm: 'Hitam sumbu',     c: '#241a10' },
    { nm: 'Putih gading',    c: '#f6f2da' },
    { nm: 'Emas pripih',     c: '#d9a441' },
    { nm: 'Soga',            c: '#b37c26' },
    { nm: 'Merah gendhis',   c: '#a71d31' },
    { nm: 'Indigo',          c: '#34557b' },
    { nm: 'Padma',           c: '#4a7a5c' },
    { nm: 'Kenanga',         c: '#7a4e68' },
  ];

  const BRUSHES = [
    { id: 'pena',    nm: 'Pena Canting',   sub: 'presisi, melenting', base: 6 },
    { id: 'kuas',    nm: 'Kuas Pripih',    sub: 'tebal menurut tekanan', base: 10 },
    { id: 'pencar',  nm: 'Tintakan Beras', sub: 'bercak bertebaran', base: 12 },
    { id: 'marker',  nm: 'Tinta Cerah',    sub: 'samar menembus', base: 14 },
    { id: 'arang',   nm: 'Arang Pring',    sub: 'gondrong reot', base: 5 },
  ];

  const SIZES = [3.2, 7, 13];     
  const state = {
    tool: 'paint', brush: 0, size: 1,
    color: PALETTE[4].c, mirror: false,
    fps: 7,
    frames: [], cur: 0,
    undo: [], redo: [],
    playing: false, timer: null,
  };

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const el = {
    host: $('#framehost'), preview: $('#preview'), brushName: $('#brush-name'),
    swatches: $('#swatches'), brushlist: $('#brushlist'),
    thumbs: $('#thumbs'), frameCount: $('#frame-count'),
    undo: $('#undo'), redo: $('#redo'), toast: $('#toast'),
    picker: $('#pickercolor'), playBtn: $('#t-play'),
  };

  let toastT;
  function toast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => el.toast.classList.remove('show'), 1900);
  }

  function makeFrame() {
    const c = document.createElement('canvas');
    c.width = c.height = SIZE;
    paintClear(c.getContext('2d'));
    return c;
  }
  function paintClear(ctx) {
    ctx.globalAlpha = 1;
    ctx.fillStyle = ERASE_COLOR;
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.globalAlpha = 1;
  }
  function mount(frame) {
    el.host.replaceChildren(frame);
    frame.style.display = 'block';
  }
  function selectFrame(i) {
    state.cur = Math.min(Math.max(i, 0), state.frames.length - 1);
    mount(state.frames[state.cur]);
    renderThumbs();
    state.undo = []; state.redo = []; syncUndoBtns();
  }

  const ctxOf = () => state.frames[state.cur].getContext('2d');

  let last = null, lastWidth = 6, baseSnap = null, curPath = [];

  function strokeStyle(ctx, color, width, alpha) {
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.globalAlpha = alpha;
  }
  function lineSeg(ctx, x0, y0, x1, y1) {
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  }
  function drawDot(ctx, x, y, r, color, alpha) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }

  function segment(ctx, brush, x0, y0, x1, y1, spd, pr, color, m) {
    const mult = SIZES[state.size];
    switch (brush.id) {
      case 'pena': { 
        const w = Math.max(brush.base * (1.55 - Math.min(spd * 0.055, 1.05)) * mult, 1.1);
        lastWidth = lastWidth * 0.55 + w * 0.45;
        strokeStyle(ctx, color, lastWidth, 1);
        lineSeg(ctx, x0, y0, x1, y1);
        if (m) lineSeg(ctx, SIZE - x0, y0, SIZE - x1, y1);
        break;
      }
      case 'kuas': { 
        const target = brush.base * (0.45 + pr * 1.25) * mult;
        lastWidth = lastWidth * 0.7 + target * 0.3;
        strokeStyle(ctx, color, lastWidth, .94);
        lineSeg(ctx, x0, y0, x1, y1);
        if (m) lineSeg(ctx, SIZE - x0, y0, SIZE - x1, y1);
        break;
      }
      case 'pencar': { 
        const R = brush.base * .8 * mult;
        for (let i = 0; i < 4; i++) {
          const a = Math.random() * Math.PI * 2;
          const d = Math.random() * R * (0.35 + Math.random() * 0.65);
          const rr = (0.9 + Math.random() * 2.6) * (0.5 + mult * .35);
          const mx = m ? SIZE - x1 : x1;
          drawDot(ctx, mx + Math.cos(a) * d * (m ? -1 : 1), y1 + Math.sin(a) * d, rr, color, .92);
        }
        break;
      }
      case 'marker': { 
        if (m) curPath.push([SIZE - x1, y1]);
        else curPath.push([x1, y1]);
        ctx.putImageData(baseSnap, 0, 0);
        strokeStyle(ctx, color, brush.base * 1.5 * mult, .34);
        ctx.beginPath();
        ctx.moveTo(curPath[0][0], curPath[0][1]);
        for (let i = 1; i < curPath.length; i++) ctx.lineTo(curPath[i][0], curPath[i][1]);
        ctx.stroke();
        break;
      }
      default: { 
        const jx = x1 + (Math.random() - .5) * 1.6, jy = y1 + (Math.random() - .5) * 1.6;
        strokeStyle(ctx, color, brush.base * (.55 + pr * .6) * mult, .85);
        lineSeg(ctx, x0, y0, jx, jy);
        if (m) lineSeg(ctx, SIZE - x0, y0, SIZE - jx, jy);
      }
    }
    ctx.globalAlpha = 1;
  }

  function beginStroke(pt) {
    const brush = BRUSHES[state.brush];
    last = pt; lastWidth = brush.base * SIZES[state.size];
    curPath = [[pt.x, pt.y]];
    pushUndo();
    if (brush.id === 'marker') {
      baseSnap = ctxOf().getImageData(0, 0, SIZE, SIZE);
      drawDot(ctxOf(), pt.x, pt.y, brush.base * .75 * SIZES[state.size], state.color, .34);
      if (state.mirror) drawDot(ctxOf(), SIZE - pt.x, pt.y, brush.base * .75 * SIZES[state.size], state.color, .34);
    } else {
      drawDot(ctxOf(), pt.x, pt.y, lastWidth * .5, state.color, 1);
      if (state.mirror) drawDot(ctxOf(), SIZE - pt.x, pt.y, lastWidth * .5, state.color, 1);
    }
    renderThumbsThrottled();
  }
  function moveStroke(pt, e) {
    if (!last) return;
    const brush = BRUSHES[state.brush];
    const dx = pt.x - last.x, dy = pt.y - last.y;
    const dist = Math.hypot(dx, dy);
    const spd = dist;
    const pr = e && typeof e.pressure === 'number' && e.pressure > 0 ? e.pressure : .55;
    const ctx = ctxOf();
    const steps = dist > 6 && brush.id !== 'marker' ? Math.ceil(dist / 6) : 1;
    let fx = last.x, fy = last.y;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const nx = last.x + dx * t, ny = last.y + dy * t;
      segment(ctx, brush, fx, fy, nx, ny, spd / steps, pr, state.color, state.mirror);
      fx = nx; fy = ny;
    }
    last = pt;
    renderThumbsThrottled();
  }
  function endStroke() {
    last = null; baseSnap = null; curPath = [];
    renderThumbsThrottled(true);
  }

  function toCanvas(e) {
    const frame = state.frames[state.cur];
    const r = frame.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * SIZE / r.width,
      y: (e.clientY - r.top) * SIZE / r.height,
    };
  }
  el.host.addEventListener('pointerdown', (ev) => {
    if (state.playing) stopPlay();
    ev.preventDefault();
    try {
      state.frames[state.cur].setPointerCapture?.(ev.pointerId);
    } catch (err) { }
    beginStroke(toCanvas(ev));
  });
  document.addEventListener('pointermove', (ev) => {
    if (!last) return;
    moveStroke(toCanvas(ev), ev);
  });
  document.addEventListener('pointerup', () => { if (last) endStroke(); });
  document.addEventListener('pointercancel', () => { if (last) endStroke(); });

  let penColor = state.color;
  function saveTmpColor() { penColor = state.color; state.color = ERASE_COLOR; }
  function restoreColor() { state.color = penColor; }

  function setTool(t) {
    if (t === state.tool) return;
    if (state.tool === 'erase') restoreColor();

    state.tool = t;
    $$('.tool-card').forEach(b => b.classList.toggle('on', b.dataset.tool === t));

    if (t === 'mirror') { 
      state.mirror = !state.mirror;
      state.tool = 'paint';
      syncMirrorCard();
      toast(state.mirror ? 'Cermin simetris: AKTIF' : 'Cermin simetris: MATI');
    } else if (t === 'setelan') { 
      state.tool = 'paint';
      $$('.tool-card').forEach(b => b.classList.toggle('on', b.dataset.tool === 'paint'));
      openDialog('#modal-setelan');
    } else if (t === 'erase') {
      saveTmpColor();
      toast('Penghapus aktif');
    }
  }
  function syncMirrorCard() {
    const card = $('.tool-card[data-tool="mirror"]');
    card.classList.toggle('on', state.mirror);
    card.querySelector('.lb').textContent = state.mirror ? 'Cermin ✦' : 'Cermin';
  }

  function clearCanvas() {
    pushUndo();
    paintClear(ctxOf());
    renderThumbsThrottled(true);
    toast('Kelir dikosongkan — Ctrl+Z untuk membatalkan');
  }

  function snapshot(frame) {
    const s = document.createElement('canvas');
    s.width = s.height = SIZE;
    s.getContext('2d').drawImage(frame, 0, 0);
    return s;
  }
  function pushUndo() {
    state.undo.push({ i: state.cur, img: snapshot(state.frames[state.cur]) });
    if (state.undo.length > 24) state.undo.shift();
    state.redo = [];
    syncUndoBtns();
  }
  function apply({ i, img }) {
    if (state.cur !== i) {
      state.cur = i;
      mount(state.frames[state.cur]);
      renderThumbs();
    }
    ctxOf().drawImage(img, 0, 0);
    renderThumbsThrottled(true);
  }
  function undo() {
    const lastA = state.undo.pop();
    if (!lastA) return;
    state.redo.push({ i: state.cur, img: snapshot(state.frames[state.cur]) });
    apply(lastA); syncUndoBtns();
  }
  function redo() {
    const next = state.redo.pop();
    if (!next) return;
    state.undo.push({ i: state.cur, img: snapshot(state.frames[state.cur]) });
    apply(next); syncUndoBtns();
  }
  function syncUndoBtns() {
    el.undo.disabled = state.undo.length === 0;
    el.redo.disabled = state.redo.length === 0;
  }

  function renderThumbsThrottled(immediate) {
    if (immediate) return renderThumbs();
    if (renderThumbsThrottled._raf) return;
    renderThumbsThrottled._raf = requestAnimationFrame(() => { renderThumbsThrottled._raf = null; renderThumbs(); });
  }
  function renderThumbs() {
    el.thumbs.replaceChildren();
    state.frames.forEach((f, i) => {
      const slot = document.createElement('button');
      slot.className = 'thumb' + (i === state.cur ? ' on' : '');
      slot.setAttribute('aria-label', `Frame ${i + 1}`);
      const c = document.createElement('canvas');
      c.width = c.height = 54;
      c.getContext('2d').drawImage(f, 0, 0, 54, 54);
      const no = document.createElement('span');
      no.className = 'no'; no.textContent = i + 1;
      slot.append(c, no);
      slot.addEventListener('click', () => { stopPlay(); selectFrame(i); });
      el.thumbs.appendChild(slot);
    });
    el.frameCount.textContent = state.frames.length + ' frame';
    const active = el.thumbs.children[state.cur];
    active?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
  }

  function addFrame(copyCurrent = false) {
    const f = makeFrame();
    if (copyCurrent) f.getContext('2d').drawImage(state.frames[state.cur], 0, 0);
    state.frames.splice(state.cur + 1, 0, f);
    selectFrame(state.cur + 1);
    toast(copyCurrent ? 'Frame diduplikat' : 'Frame baru ditambahkan');
  }
  function delFrame() {
    if (state.frames.length === 1) { paintClear(ctxOf()); renderThumbs(); toast('Frame terakhir tak bisa dihapus — kelir segar kembali'); return; }
    state.frames.splice(state.cur, 1);
    selectFrame(Math.max(0, state.cur - 1));
    toast('Frame dihapus');
  }

  function togglePlay() { state.playing ? stopPlay() : startPlay(); }
  function startPlay() {
    if (state.frames.length < 2) { toast('Perlu ≥ 2 frame — tambah dulu lewat Lakon'); return; }
    state.playing = true; state.cur = 0;
    el.playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/></svg>';
    mount(state.frames[0]);
    state.timer = setInterval(() => {
      state.cur = (state.cur + 1) % state.frames.length;
      mount(state.frames[state.cur]);
      [...el.thumbs.children].forEach((t, i) => t.classList.toggle('on', i === state.cur));
    }, 1000 / state.fps);
  }
  function stopPlay() {
    if (!state.playing) return;
    state.playing = false; clearInterval(state.timer);
    el.playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg>';
    selectFrame(state.cur);
  }

  function samplePath(len) {
    const pts = [], steps = 42;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      pts.push({ x: 10 + t * (len - 20), y: .5 + Math.sin(t * Math.PI * 1.6) * .38, spd: .5 + Math.sin(t * 6) * .45 });
    }
    return pts;
  }
  function renderPreviewStroke(canvas, brushIdx, color) {
    const ctx = canvas.getContext('2d');
    paintClear(ctx);
    const brush = BRUSHES[brushIdx];
    const savedColor = state.color, savedSize = state.size, savedMirror = state.mirror;
    state.color = color; state.size = 1; state.mirror = false;
    const saved = lastWidth;
    lastWidth = brush.base;
    if (brush.id === 'marker') {
      baseSnap = ctx.getImageData(0, 0, canvas.width, canvas.height);
      curPath = [];
    }
    const pts = samplePath(canvas.width);
    let prev = null;
    for (const p of pts) {
      const x = p.x, y = p.y * canvas.height;
      if (!prev) { prev = [x, y]; continue; }
      segment(ctx, brush, prev[0], prev[1], x, y, Math.abs(p.spd), .62, color, false);
      prev = [x, y];
    }
    state.color = savedColor; state.size = savedSize; state.mirror = savedMirror;
    lastWidth = saved;
    baseSnap = null; curPath = [];
    ctx.globalAlpha = 1;
  }
  function renderBrushList() {
    el.brushlist.replaceChildren();
    BRUSHES.forEach((b, i) => {
      const item = document.createElement('button');
      item.className = 'brush-item' + (i === state.brush ? ' on' : '');
      const c = document.createElement('canvas');
      c.width = 84 * 3; c.height = 38 * 3; 
      const nm = document.createElement('span');
      nm.className = 'nm';
      nm.innerHTML = `${b.nm}<small>${b.sub}</small>`;
      item.append(c, nm);
      item.addEventListener('click', () => setBrush(i));
      el.brushlist.appendChild(item);
      renderPreviewStroke(c, i, i === state.brush ? state.color : '#241a10');
    });
  }
  function setBrush(i) {
    if (state.tool === 'erase') setTool('paint');
    state.brush = i;
    el.brushName.textContent = BRUSHES[i].nm;
    $$('.brush-item').forEach((it, k) => it.classList.toggle('on', k === i));
    renderHero();
    toast('Kuas: ' + BRUSHES[i].nm);
  }
  function renderHero() {
    renderPreviewStroke(el.preview, state.brush, state.color);
  }

  function buildSwatches() {
    el.swatches.replaceChildren();
    PALETTE.forEach((p) => {
      const b = document.createElement('button');
      b.className = 'sw' + (p.c === state.color ? ' on' : '');
      b.style.background = p.c;
      b.title = p.nm;
      b.setAttribute('aria-label', 'Warna ' + p.nm);
      b.addEventListener('click', () => {
        if (state.tool === 'erase') setTool('paint'); 
        state.color = p.c;
        $$('.sw').forEach(s => s.classList.remove('on'));
        b.classList.add('on');
        renderHero();
        renderBrushList();
      });
      el.swatches.appendChild(b);
    });
  }
  function setSize(i) {
    state.size = i;
    $$('.size-btn[data-size]').forEach(btn => btn.classList.toggle('on', +btn.dataset.size === i));
  }

  function openDialog(id) {
    const d = $(id);
    if (d && !d.open) d.showModal();
  }

  function closeMenus() { $$('.dropdown.open').forEach(d => d.classList.remove('open')); }
  $$('[data-menu]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = btn.closest('.dropdown');
      const was = dd.classList.contains('open');
      closeMenus();
      dd.classList.toggle('open', !was);
    });
  });
  document.addEventListener('click', closeMenus);

  const ACTS = {
    about: () => openDialog('#modal-about'),
    help: () => openDialog('#modal-help'),
    new: () => { if (confirm('Kosongkan seluruh frame jadi lakon baru?')) { state.frames.forEach(f => paintClear(f.getContext('2d'))); selectFrame(0); toast('Lakon baru dibuka'); } },
    export: () => exportPNG(),
    'export-strip': () => exportStrip(),
    'frame-add': () => { stopPlay(); addFrame(false); },
    'frame-dup': () => { stopPlay(); addFrame(true); },
    'frame-del': () => { stopPlay(); delFrame(); },
    color: () => el.picker.click(),
    'tool-pena': () => { setTool('paint'); setBrush(0); },
    'tool-hapus': () => setTool('erase'),
    'tool-cermin': () => setTool('mirror'),
    'tool-setelan': () => setTool('setelan'),
  };
  $$('.dd [data-act]').forEach(btn => btn.addEventListener('click', () => { ACTS[btn.dataset.act]?.(); closeMenus(); }));

  function download(url, name) {
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
  }
  function exportPNG() {
    stopPlay();
    const f = state.frames[state.cur];
    download(f.toDataURL('image/png'), `wayangkita-frame-${state.cur + 1}.png`);
    toast('Frame ' + (state.cur + 1) + ' diekspor');
  }
  function exportStrip() {
    const n = state.frames.length;
    const c = document.createElement('canvas');
    c.width = SIZE * n; c.height = SIZE;
    const ctx = c.getContext('2d');
    state.frames.forEach((f, i) => ctx.drawImage(f, i * SIZE, 0));
    download(c.toDataURL('image/png'), `wayangkita-strip-${n}frame.png`);
    toast(n + ' frame diekspor sebaris');
  }

  $$('.tool-card').forEach(b => b.addEventListener('click', () => setTool(b.dataset.tool)));
  el.undo.addEventListener('click', undo);
  el.redo.addEventListener('click', redo);
  $('#t-clear').addEventListener('click', () => { stopPlay(); clearCanvas(); });
  $$('.size-btn[data-size]').forEach(b => b.addEventListener('click', () => setSize(+b.dataset.size)));
  el.picker.addEventListener('input', () => {
    if (state.tool === 'erase') setTool('paint');
    state.color = el.picker.value;
    $$('.sw').forEach(s => s.classList.remove('on'));
    renderHero();
    renderBrushList();
  });
  $('#btn-rainbow').addEventListener('click', () => el.picker.click());
  $('#t-prev').addEventListener('click', () => { stopPlay(); selectFrame(state.cur - 1); });
  $('#t-next').addEventListener('click', () => { stopPlay(); selectFrame(state.cur + 1); });
  el.playBtn.addEventListener('click', togglePlay);
  $('#t-add').addEventListener('click', () => { stopPlay(); addFrame(false); });
  $('#t-dup').addEventListener('click', () => { stopPlay(); addFrame(true); });
  $('#t-del').addEventListener('click', () => { stopPlay(); delFrame(); });
  $('#btn-export').addEventListener('click', exportPNG);
  $('#btn-help').addEventListener('click', () => openDialog('#modal-help'));
  $('#btn-full').addEventListener('click', () => {
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.();
  });
  $('#panel-toggle').addEventListener('click', () => document.body.classList.toggle('panel-open'));
  $$('[data-close]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));

  const fpsR = $('#fps-range');
  fpsR.addEventListener('input', () => {
    state.fps = +fpsR.value;
    $('#fps-val').textContent = fpsR.value + ' fps';
    if (state.playing) { stopPlay(); startPlay(); }
  });

  document.addEventListener('keydown', (e) => {
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.closest?.('[contenteditable]')) return;
    if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'z') { e.preventDefault(); undo(); return; }
    if ((e.ctrlKey && e.key.toLowerCase() === 'y') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z')) { e.preventDefault(); redo(); return; }
    switch (e.key) {
      case 'b': case 'B': setTool('paint'); break;
      case 'e': case 'E': setTool('erase'); break;
      case 'm': case 'M': setTool('mirror'); break;
      case 's': case 'S': openDialog('#modal-setelan'); break;
      case ' ': e.preventDefault(); togglePlay(); break;
      case 'ArrowLeft': stopPlay(); selectFrame(state.cur - 1); break;
      case 'ArrowRight': stopPlay(); selectFrame(state.cur + 1); break;
      case '1': setSize(0); break;
      case '2': setSize(1); break;
      case '3': setSize(2); break;
    }
  });

  function demoStrokes() {
    const ctx = ctxOf();
    BRUSHES.forEach((b, i) => {
      let px = 44, py = 92 + i * 118;
      if (b.id === 'marker') { baseSnap = ctx.getImageData(0, 0, SIZE, SIZE); curPath = [[px, py]]; }
      for (let x = 62; x <= 678; x += 6) {
        const y = py + Math.sin((x - 44) / 92) * 40;
        segment(ctx, b, px, py, x, y, Math.abs(y - py) / 6, .55, state.color, false);
        px = x;
      }
      if (b.id === 'marker') { baseSnap = null; curPath = []; }
    });
    renderThumbsThrottled(true);
  }

  function init() {
    state.frames.push(makeFrame());
    mount(state.frames[0]);
    buildSwatches();
    setSize(1);
    renderBrushList();
    renderHero();
    renderThumbs();
    syncUndoBtns();
    syncMirrorCard();
    el.brushName.textContent = BRUSHES[state.brush].nm;
    if (new URLSearchParams(location.search).get('demo')) demoStrokes();
  }
  init();
})();
