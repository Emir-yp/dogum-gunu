const AYAR = {
  isim: "Gonca abla",

  // Doğum günü: YIL-AY-GÜN saat. Geçmişse otomatik gelecek yıla kayar.
  dogumGunu: "2026-09-29T00:00:00",

  // Fotoğrafları repoya "foto" klasörü açıp koy, sonra buraya yaz.
  // Fotoğraf yoksa liste boş kalabilir, bölüm yine de düzgün görünür.
  fotograflar: [
    { src: "foto/HEQC7750", yazi: "Sen ve o meşhur bakış" },
    { src: "foto/IMG_0015", yazi: "Bayram sabahı" },
    { src: "foto/IMG_1111", yazi: "En sevdiğim kare" }
  ]
};

const sakin = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ————————————————————————————————
   1. Gül açılışı
———————————————————————————————— */
const gul = document.getElementById("gul");
const acButon = document.getElementById("ac");
const dilek = document.getElementById("dilek");
document.getElementById("basIsim").textContent = AYAR.isim;

function goncayiAc() {
  if (gul.classList.contains("acildi")) return;
  gul.classList.add("acildi");
  acButon.hidden = true;
  setTimeout(() => {
    dilek.hidden = false;
    konfetiAt(70);
  }, sakin ? 0 : 900);
}
acButon.addEventListener("click", goncayiAc);
gul.addEventListener("click", goncayiAc);

/* ————————————————————————————————
   2. Geri sayım
———————————————————————————————— */
const alanlar = {
  gun: document.getElementById("gun"),
  saat: document.getElementById("saat"),
  dakika: document.getElementById("dakika"),
  saniye: document.getElementById("saniye")
};

function hedefTarih() {
  const t = new Date(AYAR.dogumGunu);
  const simdi = new Date();
  const bitis = new Date(t.getTime() + 24 * 60 * 60 * 1000);
  if (bitis < simdi) t.setFullYear(simdi.getFullYear() + 1);
  return t;
}

function sayimGuncelle() {
  const hedef = hedefTarih();
  const fark = hedef - new Date();

  if (fark <= 0) {
    document.getElementById("sayimBaslik").textContent = "Doğum günün kutlu olsun";
    document.getElementById("sayimNot").textContent = "Bugün tam olarak o gün.";
    Object.values(alanlar).forEach(a => (a.textContent = "0"));
    return;
  }

  const sn = Math.floor(fark / 1000);
  alanlar.gun.textContent = Math.floor(sn / 86400);
  alanlar.saat.textContent = Math.floor((sn % 86400) / 3600);
  alanlar.dakika.textContent = Math.floor((sn % 3600) / 60);
  alanlar.saniye.textContent = sn % 60;
}
sayimGuncelle();
setInterval(sayimGuncelle, 1000);

/* ————————————————————————————————
   3. Mumlar
———————————————————————————————— */
const mumlar = [...document.querySelectorAll(".mum")];
const pastaMesaj = document.getElementById("pastaMesaj");
const yonerge = document.getElementById("yonerge");

mumlar.forEach(mum => {
  const alev = mum.querySelector(".alev");
  alev.setAttribute("tabindex", "0");
  alev.setAttribute("role", "button");
  alev.setAttribute("aria-label", "Mumu söndür");

  const sondur = () => {
    if (mum.classList.contains("sondu")) return;
    mum.classList.add("sondu");
    if (mumlar.every(m => m.classList.contains("sondu"))) {
      yonerge.textContent = "Hepsi söndü.";
      pastaMesaj.hidden = false;
      konfetiAt(150);
    }
  };

  alev.addEventListener("click", sondur);
  alev.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sondur(); }
  });
});

/* ————————————————————————————————
   4. Galeri
———————————————————————————————— */
const galeri = document.getElementById("galeri");

(AYAR.fotograflar.length ? AYAR.fotograflar : [{ src: "", yazi: "Buraya fotoğraf gelecek" }])
  .forEach(f => {
    const kare = document.createElement("figure");
    kare.className = "kare";

    if (f.src) {
      const img = document.createElement("img");
      img.src = f.src;
      img.alt = f.yazi || "";
      img.loading = "lazy";
      img.addEventListener("error", () => { img.remove(); kare.classList.add("bos"); });
      kare.appendChild(img);
    } else {
      kare.classList.add("bos");
    }

    const yazi = document.createElement("figcaption");
    yazi.textContent = f.yazi || "";
    kare.appendChild(yazi);
    galeri.appendChild(kare);
  });

/* ————————————————————————————————
   5. Kayarken beliren bölümler
———————————————————————————————— */
const gozlemci = new IntersectionObserver(girdiler => {
  girdiler.forEach(g => {
    if (g.isIntersecting) {
      g.target.classList.add("gorundu");
      gozlemci.unobserve(g.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".belirsin").forEach(b => gozlemci.observe(b));

/* ————————————————————————————————
   6. Uçuşan yapraklar
———————————————————————————————— */
const yapCanvas = document.getElementById("yapraklar");
const yapCtx = yapCanvas.getContext("2d");
let yapraklar = [];

function olcule(canvas) {
  const o = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * o;
  canvas.height = window.innerHeight * o;
  canvas.getContext("2d").setTransform(o, 0, 0, o, 0, 0);
}

function yapraklariKur() {
  olcule(yapCanvas);
  const adet = window.innerWidth < 600 ? 14 : 26;
  yapraklar = Array.from({ length: adet }, () => yeniYaprak(true));
}

function yeniYaprak(ilk) {
  return {
    x: Math.random() * window.innerWidth,
    y: ilk ? Math.random() * window.innerHeight : -20,
    b: 5 + Math.random() * 7,
    hiz: 0.3 + Math.random() * 0.7,
    salinim: Math.random() * Math.PI * 2,
    donme: Math.random() * Math.PI,
    renk: Math.random() > 0.5 ? "rgba(224,105,122,0.55)" : "rgba(243,185,190,0.45)"
  };
}

function yapraklariCiz() {
  yapCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  yapraklar.forEach((y, i) => {
    y.y += y.hiz;
    y.salinim += 0.015;
    y.donme += 0.01;
    y.x += Math.sin(y.salinim) * 0.6;

    yapCtx.save();
    yapCtx.translate(y.x, y.y);
    yapCtx.rotate(y.donme);
    yapCtx.fillStyle = y.renk;
    yapCtx.beginPath();
    yapCtx.ellipse(0, 0, y.b, y.b * 0.55, 0, 0, Math.PI * 2);
    yapCtx.fill();
    yapCtx.restore();

    if (y.y > window.innerHeight + 20) yapraklar[i] = yeniYaprak(false);
  });
  requestAnimationFrame(yapraklariCiz);
}

if (!sakin) { yapraklariKur(); yapraklariCiz(); }

/* ————————————————————————————————
   7. Konfeti
———————————————————————————————— */
const konCanvas = document.getElementById("konfeti");
const konCtx = konCanvas.getContext("2d");
let konfeti = [];
let konfetiDonuyor = false;

function konfetiAt(adet = 120) {
  if (sakin) return;
  olcule(konCanvas);
  const renkler = ["#E0697A", "#F3B9BE", "#CFA24F", "#F6EFE6", "#4E7A63"];

  for (let i = 0; i < adet; i++) {
    konfeti.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 220,
      y: window.innerHeight * 0.42,
      vx: (Math.random() - 0.5) * 9,
      vy: -5 - Math.random() * 9,
      b: 5 + Math.random() * 6,
      aci: Math.random() * Math.PI,
      donus: (Math.random() - 0.5) * 0.25,
      renk: renkler[Math.floor(Math.random() * renkler.length)],
      omur: 1
    });
  }

  if (!konfetiDonuyor) { konfetiDonuyor = true; konfetiCiz(); }
}

function konfetiCiz() {
  konCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  konfeti.forEach(p => {
    p.vy += 0.22;
    p.x += p.vx;
    p.y += p.vy;
    p.aci += p.donus;
    p.omur -= 0.006;

    konCtx.save();
    konCtx.globalAlpha = Math.max(p.omur, 0);
    konCtx.translate(p.x, p.y);
    konCtx.rotate(p.aci);
    konCtx.fillStyle = p.renk;
    konCtx.fillRect(-p.b / 2, -p.b / 2, p.b, p.b * 1.6);
    konCtx.restore();
  });

  konfeti = konfeti.filter(p => p.omur > 0 && p.y < window.innerHeight + 40);

  if (konfeti.length) {
    requestAnimationFrame(konfetiCiz);
  } else {
    konfetiDonuyor = false;
    konCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

document.getElementById("tekrar").addEventListener("click", () => konfetiAt(180));

window.addEventListener("resize", () => {
  if (!sakin) yapraklariKur();
  olcule(konCanvas);
});

/* ————————————————————————————————
   8. Müzik — dosya yok, ses tarayıcıda üretiliyor
———————————————————————————————— */
const muzikButon = document.getElementById("muzik");
const muzikYazi = document.getElementById("muzikYazi");

let ses = null, anaSes = null, zamanlayici = null, adim = 0;

// D — Bm — G — A üzerinde yumuşak bir arpej
const ezgi = [
  293.66, 369.99, 440.00, 587.33, 440.00, 369.99, 293.66, 369.99,
  246.94, 369.99, 493.88, 587.33, 493.88, 369.99, 246.94, 369.99,
  196.00, 293.66, 392.00, 587.33, 392.00, 293.66, 196.00, 293.66,
  220.00, 277.18, 329.63, 440.00, 329.63, 277.18, 220.00, 277.18
];

function nota(frekans, an) {
  const osc = ses.createOscillator();
  const kazanc = ses.createGain();
  osc.type = "triangle";
  osc.frequency.value = frekans;

  kazanc.gain.setValueAtTime(0, an);
  kazanc.gain.linearRampToValueAtTime(0.18, an + 0.04);
  kazanc.gain.exponentialRampToValueAtTime(0.001, an + 0.65);

  osc.connect(kazanc).connect(anaSes);
  osc.start(an);
  osc.stop(an + 0.7);
}

function muzigiBaslat() {
  ses = new (window.AudioContext || window.webkitAudioContext)();
  anaSes = ses.createGain();
  anaSes.gain.value = 0.28;
  anaSes.connect(ses.destination);

  const cal = () => {
    nota(ezgi[adim % ezgi.length], ses.currentTime + 0.02);
    if (adim % 8 === 0) nota(ezgi[adim % ezgi.length] / 2, ses.currentTime + 0.02);
    adim++;
  };

  cal();
  zamanlayici = setInterval(cal, 330);
}

function muzigiDurdur() {
  clearInterval(zamanlayici);
  zamanlayici = null;
  if (ses) { ses.close(); ses = null; }
}

muzikButon.addEventListener("click", () => {
  const acik = muzikButon.classList.toggle("calisiyor");
  muzikButon.setAttribute("aria-pressed", String(acik));
  muzikYazi.textContent = acik ? "Müziği kapat" : "Müziği aç";
  acik ? muzigiBaslat() : muzigiDurdur();
});
