const AYAR = {
  isim: "Gonca abla",

  // Doğum günü: YIL-AY-GÜN saat. Geçmişse otomatik gelecek yıla kayar.
  dogumGunu: "2026-09-29T00:00:00",

  // Fotoğrafları repoya "foto" klasörü açıp koy, sonra buraya yaz.
  // ÖNEMLİ: dosya adının UZANTISINI da yaz (.jpg, .JPG, .png ne ise).
  fotograflar: [
    { src: "foto/HEQC7750.JPG", yazi: "Sen ve o meşhur bakış" },
    { src: "foto/IMG_0015.JPG", yazi: "Bayram sabahı" },
    { src: "foto/IMG_1111.JPG", yazi: "En sevdiğim kare" }
  ],

  // Kilitli sürpriz sandık: kendi sorunu ve cevabını buraya yaz.
  // Cevap büyük/küçük harfe duyarlı DEĞİL, boşluklar otomatik temizlenir.
  sandik: {
    soru: "En sevdiğim yemek NE (soru zor biliyorum :D)?",
    cevap: "cevabi buraya yaz",
    mesaj:
      "Bunu bulman biraz zamanını aldıysa bile önemli değil — çünkü asıl mesele aramızdaki o anıydı. " +
      "Seninle geçirdiğim her yıl, bu sandığın içindeki mesajdan daha değerli. İyi ki varsın I love you <3."
  }
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
  canvas.width = canvas.clientWidth * o || window.innerWidth * o;
  canvas.height = canvas.clientHeight * o || window.innerHeight * o;
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
  gokyuzunuKur();
});

/* ————————————————————————————————
   8. Müzik — YouTube üzerinden
———————————————————————————————— */
const muzikButon = document.getElementById("muzik");
const muzikYazi = document.getElementById("muzikYazi");
const VIDEO_ID = "QZWMTse53iE";

let oynatici = null;
let hazir = false;

window.onYouTubeIframeAPIReady = function () {
  oynatici = new YT.Player("oynatici", {
    height: "0",
    width: "0",
    videoId: VIDEO_ID,
    playerVars: { playsinline: 1 },
    events: {
      onReady: () => { hazir = true; },
      onStateChange: (e) => {
        const caliyor = e.data === YT.PlayerState.PLAYING;
        muzikButon.classList.toggle("calisiyor", caliyor);
        muzikButon.setAttribute("aria-pressed", String(caliyor));
        muzikYazi.textContent = caliyor ? "Müziği kapat" : "Müziği aç";
      }
    }
  });
};

muzikButon.addEventListener("click", () => {
  if (!hazir || !oynatici) return;
  const durum = oynatici.getPlayerState();
  if (durum === YT.PlayerState.PLAYING) {
    oynatici.pauseVideo();
  } else {
    oynatici.playVideo();
  }
});

/* ————————————————————————————————
   9. Yıldızlı gökyüzü — dilek tutma
———————————————————————————————— */
const gokCanvas = document.getElementById("gokyuzu");
const gokCtx = gokCanvas.getContext("2d");
let yildizlar = [];
let kayanYildizlar = [];

function gokyuzunuKur() {
  olcule(gokCanvas);
  const genislik = gokCanvas.clientWidth;
  const yukseklik = gokCanvas.clientHeight;
  const adet = Math.round((genislik * yukseklik) / 3500);
  yildizlar = Array.from({ length: Math.max(adet, 30) }, () => ({
    x: Math.random() * genislik,
    y: Math.random() * yukseklik,
    r: Math.random() * 1.4 + 0.4,
    faz: Math.random() * Math.PI * 2
  }));
}

function kayanYildizEkle(baslangicX, baslangicY, metin) {
  kayanYildizlar.push({
    x: baslangicX,
    y: baslangicY,
    vx: 3 + Math.random() * 2,
    vy: -3.5 - Math.random() * 1.5,
    omur: 1,
    metin: metin || ""
  });
}

function gokyuzunuCiz() {
  const genislik = gokCanvas.clientWidth;
  const yukseklik = gokCanvas.clientHeight;
  gokCtx.clearRect(0, 0, genislik, yukseklik);

  const zaman = performance.now() / 900;
  yildizlar.forEach(y => {
    const parlaklik = 0.4 + 0.6 * Math.abs(Math.sin(zaman + y.faz));
    gokCtx.beginPath();
    gokCtx.fillStyle = `rgba(246,239,230,${parlaklik})`;
    gokCtx.arc(y.x, y.y, y.r, 0, Math.PI * 2);
    gokCtx.fill();
  });

  kayanYildizlar.forEach(k => {
    k.x += k.vx;
    k.y += k.vy;
    k.omur -= 0.012;

    gokCtx.save();
    gokCtx.globalAlpha = Math.max(k.omur, 0);
    gokCtx.strokeStyle = "#F3B9BE";
    gokCtx.lineWidth = 2;
    gokCtx.beginPath();
    gokCtx.moveTo(k.x, k.y);
    gokCtx.lineTo(k.x - k.vx * 6, k.y - k.vy * 6);
    gokCtx.stroke();

    if (k.metin) {
      gokCtx.fillStyle = "#F6EFE6";
      gokCtx.font = "13px Karla, sans-serif";
      gokCtx.fillText(k.metin, k.x + 8, k.y);
    }
    gokCtx.restore();
  });

  kayanYildizlar = kayanYildizlar.filter(k => k.omur > 0 && k.y > -20 && k.x < genislik + 200);

  requestAnimationFrame(gokyuzunuCiz);
}

gokyuzunuKur();
gokyuzunuCiz();

gokCanvas.addEventListener("click", e => {
  const kutu = gokCanvas.getBoundingClientRect();
  kayanYildizEkle(e.clientX - kutu.left, e.clientY - kutu.top, "");
});

const DILEK_ANAHTARI = "gonca-dilekler";
const dilekForm = document.getElementById("dilekForm");
const dilekMetni = document.getElementById("dilekMetni");
const dilekListesi = document.getElementById("dilekListesi");

function dilekleriYukle() {
  let kayitlar = [];
  try {
    kayitlar = JSON.parse(localStorage.getItem(DILEK_ANAHTARI)) || [];
  } catch { kayitlar = []; }

  dilekListesi.innerHTML = "";
  kayitlar.slice(-8).forEach(d => {
    const li = document.createElement("li");
    li.textContent = d;
    dilekListesi.appendChild(li);
  });
}

dilekForm.addEventListener("submit", e => {
  e.preventDefault();
  const metin = dilekMetni.value.trim();

  kayanYildizEkle(30 + Math.random() * 40, gokCanvas.clientHeight - 20, metin);

  if (metin) {
    let kayitlar = [];
    try {
      kayitlar = JSON.parse(localStorage.getItem(DILEK_ANAHTARI)) || [];
    } catch { kayitlar = []; }
    kayitlar.push(metin);
    localStorage.setItem(DILEK_ANAHTARI, JSON.stringify(kayitlar));
    dilekleriYukle();
  }

  dilekMetni.value = "";
});

dilekleriYukle();

/* ————————————————————————————————
   10. Kilitli sürpriz sandık
———————————————————————————————— */
document.getElementById("sandikSoru").textContent = AYAR.sandik.soru;

const sandikForm = document.getElementById("sandikForm");
const sandikCevapKutu = document.getElementById("sandikCevapKutu");
const sandikIpucu = document.getElementById("sandikIpucu");
const sandikMesaj = document.getElementById("sandikMesaj");
const sandikKutu = document.getElementById("sandikKutu");

function sadelestir(metin) {
  return metin
    .trim()
    .toLocaleLowerCase("tr")
    .replace(/[İıI]/g, "i")
    .replace(/\s+/g, " ");
}

sandikForm.addEventListener("submit", e => {
  e.preventDefault();
  const girilen = sadelestir(sandikCevapKutu.value);
  const dogru = sadelestir(AYAR.sandik.cevap);

  if (girilen && girilen === dogru) {
    sandikMesaj.textContent = AYAR.sandik.mesaj;
    sandikMesaj.hidden = false;
    sandikForm.hidden = true;
    sandikIpucu.textContent = "";
    konfetiAt(140);
  } else {
    sandikIpucu.textContent = "Olmadı, bir daha dene.";
    sandikKutu.classList.remove("titre");
    void sandikKutu.offsetWidth;
    sandikKutu.classList.add("titre");
  }
});

/* ————————————————————————————————
   11. PDF / yazdırma
———————————————————————————————— */
document.getElementById("yazdirDugme").addEventListener("click", () => {
  window.print();
});
