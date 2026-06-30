/* =========================================================================
   EDIT ME — semua teks/konten yang gampang diganti ada di bagian atas ini.
   ========================================================================= */

// Tanggal lahir "Salsa" — ganti sesuai tanggal lahir aslinya (format: Tahun, Bulan-1, Tanggal, Jam, Menit)
// PERHATIAN: bulan dihitung dari 0 (Januari = 0, Februari = 1, ... Desember = 11)
const BIRTH_DATE = new Date(2006, 6, 20, 0, 0, 0); // <-- GANTI INI

// 6 alasan "Things I Love About You" — tiap kartu punya judul singkat + deskripsi
const LOVE_REASONS = [
  { title: "Your Presence", desc: "cukup salut akan pribadimu yang tenang, kalem, berbanding terbalik denganku. Tapi dari perbedaan itu, lo justru bisa jadi pawang sekaligus penyeimbang pas gue lagi chaos" },
  { title: "Your Kindness", desc: "lo tuh bukan manusia, kau baik dalam artian kayak kebaikanmu itu jujur sesuai isi pikiran dan hati gitu, terus bonnusnya sangat sabar dengan saya " },
  { title: "Your Resilience", desc: "Gue cukup tahu seberapa mandirinya lo yang suka nyelesaiin semuanya sendiri, di dunia ini kita emang cuma punya diri sendiri, tapi tetep aja lo jangan sungkan repotin orang-orang baik di sekitar lo " },
  { title: "Your Mind", desc: "Pemikiranmu dewasa, dalam tindakan, keputusan, solusi, aku melihat pola pikirmu bekerja cukup baik. Itu kenapa aku suka bertanya, curhat, dengan dirimu." },
  { title: "Random Side", desc: "kau sulit ditebak, kadang tingkah randommu diluar prediksi, dan ternyata kau masih punya sisi kekanak-kanakan, bagiku itu lucu dan sedikit menyebalkan." },
  { title: "Simply You", desc: "Everything about the way you see the world. Just stay the way you are, don't change!." }
];


// Galeri foto — ganti "src" dengan path foto asli kamu (taruh di folder assets/photos/)
// caption akan dibaca berurutan jadi satu kalimat: "You Are My Today And All ..."
const GALLERY = [
  { src: "assets/photos/photo-1.png",  },
  { src: "assets/video/dance.mp4",  },
  { src: "assets/photos/photo-3.png",  },
  { src: "assets/video/jalan.mp4",  },
  { src: "assets/photos/photo-5.png",  },
  { src: "assets/video/lucuuu.mp4",  }
];

// Warna confetti — ganti kalau mau palet lain
const CONFETTI_COLORS = ["#9bd3e8", "#7fb8d6", "#cfe3d8", "#eaf3f8", "#6fa8c9", "#a9e0d6"];

/* =========================================================================
   Selebihnya di bawah ini adalah logika — tidak perlu diubah kecuali
   kamu memang mau mengubah cara halamannya bekerja.
   ========================================================================= */

(function () {
  const introScreen = document.getElementById('intro-screen');
  const mainContent = document.getElementById('main-content');
  const audio = document.getElementById('bg-audio');
  const confettiLayer = document.getElementById('confetti-layer');

  const player = document.getElementById('music-player');
  const playerPill = document.getElementById('player-pill');
  const playerCollapseBtn = document.getElementById('player-collapse');
  const playBtn = document.getElementById('player-play');
  const restartBtn = document.getElementById('player-restart');
  const loopBtn = document.getElementById('player-loop');
  const seek = document.getElementById('player-seek');
  const curTimeEl = document.getElementById('player-current');
  const durTimeEl = document.getElementById('player-duration');

  let opened = false;

  /* ---------------- ambient petals (background, runs throughout) ---------------- */
  const petalLayer = document.getElementById('petals');
  function spawnPetal() {
    const p = document.createElement('div');
    p.className = 'petal';
    const startX = Math.random() * 100;
    const drift = (Math.random() * 80 - 40) + 'px';
    const duration = 9 + Math.random() * 8;
    const size = 7 + Math.random() * 6;
    p.style.left = startX + 'vw';
    p.style.width = size + 'px';
    p.style.height = (size * 1.3) + 'px';
    p.style.setProperty('--drift', drift);
    p.style.animationDuration = duration + 's';
    petalLayer.appendChild(p);
    setTimeout(() => p.remove(), duration * 1000 + 300);
  }
  setInterval(spawnPetal, 700);

  /* ---------------- confetti burst (only right after tap) ---------------- */
  function spawnConfettiPiece() {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size = 6 + Math.random() * 8;
    const isCircle = Math.random() > 0.5;
    piece.style.left = (Math.random() * 100) + 'vw';
    piece.style.width = size + 'px';
    piece.style.height = (isCircle ? size : size * 1.6) + 'px';
    piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.borderRadius = isCircle ? '50%' : '2px';
    piece.style.setProperty('--spin', (Math.random() * 720 - 360) + 'deg');
    const duration = 2.6 + Math.random() * 1.8;
    piece.style.animationDuration = duration + 's';
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), duration * 1000 + 200);
  }
  function burstConfetti(count) {
    for (let i = 0; i < count; i++) {
      setTimeout(spawnConfettiPiece, i * 18);
    }
  }

  /* ---------------- intro -> reveal full page ---------------- */
  function openGift() {
    if (opened) return;
    opened = true;

    introScreen.classList.add('hidden');
    burstConfetti(90);

    mainContent.classList.add('revealed');
    document.body.style.overflow = 'auto';

    audio.volume = 0.7;
    audio.play().then(() => {
      playBtn.textContent = '❚❚';
    }).catch(() => { /* user can press play manually */ });

    setTimeout(() => playerPill.classList.add('show'), 700);
  }
  introScreen.addEventListener('click', openGift);
  introScreen.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openGift();
  });
  introScreen.tabIndex = 0;
  document.body.style.overflow = 'hidden';

  /* ---------------- age / "time your existence" counter ---------------- */
  const els = {
    years: document.getElementById('c-years'),
    months: document.getElementById('c-months'),
    days: document.getElementById('c-days'),
    hours: document.getElementById('c-hours'),
    minutes: document.getElementById('c-minutes'),
    seconds: document.getElementById('c-seconds'),
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateAgeCounter() {
    const now = new Date();
    let years = now.getFullYear() - BIRTH_DATE.getFullYear();
    let months = now.getMonth() - BIRTH_DATE.getMonth();
    let days = now.getDate() - BIRTH_DATE.getDate();
    let hours = now.getHours() - BIRTH_DATE.getHours();
    let minutes = now.getMinutes() - BIRTH_DATE.getMinutes();
    let seconds = now.getSeconds() - BIRTH_DATE.getSeconds();

    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonth;
      months--;
    }
    if (months < 0) { months += 12; years--; }

    els.years.textContent = pad(years);
    els.months.textContent = pad(months);
    els.days.textContent = pad(days);
    els.hours.textContent = pad(hours);
    els.minutes.textContent = pad(minutes);
    els.seconds.textContent = pad(seconds);
  }
  updateAgeCounter();
  setInterval(updateAgeCounter, 1000);

  /* ---------------- "Things I Love About You" cards ---------------- */
  const loveGrid = document.getElementById('love-grid');
  const loveProgress = document.getElementById('love-progress');
  const revealAllBtn = document.getElementById('reveal-all-btn');
  let revealedCount = 0;
  const loveCardEls = [];

  function buildLoveCardLocked() {
    return `<span class="lock-icon">🔒</span><span class="prompt">tap to reveal</span>`;
  }
  function buildLoveCardRevealed(reason) {
    return `
      <span class="card-heart">♡</span>
      <span class="card-title">${reason.title}</span>
      <span class="card-desc">${reason.desc}</span>
    `;
  }

  LOVE_REASONS.forEach((reason) => {
    const card = document.createElement('div');
    card.className = 'love-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.innerHTML = buildLoveCardLocked();

    function reveal() {
      if (card.classList.contains('revealed')) return;
      card.classList.add('revealed');
      card.innerHTML = buildLoveCardRevealed(reason);
      revealedCount++;
      updateLoveProgress();
    }
    card.addEventListener('click', reveal);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') reveal();
    });
    card._reveal = reveal;
    loveCardEls.push(card);
    loveGrid.appendChild(card);
  });

  function updateLoveProgress() {
    if (revealedCount >= LOVE_REASONS.length) {
      loveProgress.textContent = `All ${LOVE_REASONS.length} revealed 🤍`;
    } else {
      loveProgress.textContent = `${revealedCount} of ${LOVE_REASONS.length} revealed — tap a card to unlock`;
    }
  }

  revealAllBtn.addEventListener('click', () => {
    loveCardEls.forEach((card, i) => {
      setTimeout(() => card._reveal(), i * 120);
    });
  });


  /* ---------------- gallery ---------------- */
  /* ---------------- gallery ---------------- */
const galleryGrid = document.getElementById('gallery-grid');
GALLERY.forEach((item) => {
  const tile = document.createElement('div');
  const isVideo = /\.(mp4|webm|mov)$/i.test(item.src);

  tile.className = isVideo ? 'gallery-tile has-video' : 'gallery-tile';

  const mediaHTML = isVideo
    ? `<video src="${item.src}" autoplay muted loop playsinline></video>`
    : `<img src="${item.src}" alt="" loading="lazy" />`;

  tile.innerHTML = `
    ${mediaHTML}
    <span class="tile-caption">${item.caption || ""}</span>
  `;
  galleryGrid.appendChild(tile);
});

  /* ---------------- "Make A Wish" button -> secret video modal ---------------- */
  const makeWishBtn = document.getElementById('make-wish-btn');
  const secretModal = document.getElementById('secret-modal');
  const secretVideo = document.getElementById('secret-video');
  const secretCloseBtn = document.getElementById('secret-close-btn');
  const gformLink = document.getElementById('gform-link');

  makeWishBtn.addEventListener('click', () => {
    burstConfetti(50);
    setTimeout(() => {
      secretModal.classList.remove('hidden');
      secretVideo.currentTime = 0;
      secretVideo.play().catch(() => {});
    }, 350);
  });

  // Reveal the Google Form link only once the video has been watched to the end.
  secretVideo.addEventListener('ended', () => {
    gformLink.classList.remove('hidden');
    burstConfetti(35);
  });

  function closeSecretModal() {
    secretModal.classList.add('hidden');
    secretVideo.pause();
  }
  secretCloseBtn.addEventListener('click', closeSecretModal);
  secretModal.addEventListener('click', (e) => {
    if (e.target === secretModal) closeSecretModal();
  });

  /* ---------------- music player ---------------- */
  function formatTime(t) {
    if (!isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${pad(s)}`;
  }

  audio.addEventListener('loadedmetadata', () => {
    durTimeEl.textContent = formatTime(audio.duration);
    seek.max = Math.floor(audio.duration) || 100;
  });

  audio.addEventListener('timeupdate', () => {
    curTimeEl.textContent = formatTime(audio.currentTime);
    if (!seek.dragging) seek.value = audio.currentTime;
  });

  seek.addEventListener('input', () => {
    audio.currentTime = Number(seek.value);
  });

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      playBtn.textContent = '❚❚';
    } else {
      audio.pause();
      playBtn.textContent = '▶';
    }
  });

  restartBtn.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
    playBtn.textContent = '❚❚';
  });

  let isLooping = true; // matches <audio loop> default
  loopBtn.addEventListener('click', () => {
    isLooping = !isLooping;
    audio.loop = isLooping;
    loopBtn.style.opacity = isLooping ? '1' : '0.45';
  });

  /* player open/collapse via the floating pill */
  function openPlayer() {
    player.classList.remove('collapsed');
    playerPill.classList.add('player-open');
  }
  function collapsePlayer() {
    player.classList.add('collapsed');
    playerPill.classList.remove('player-open');
  }
  playerPill.addEventListener('click', openPlayer);
  playerCollapseBtn.addEventListener('click', collapsePlayer);
})();
