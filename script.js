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

  // Kilitli sürpriz sandık: kendi sorunu ve cevaplarını buraya yaz.
  sandik: {
    soru: "En sevdiğim yemek ne (zor sorudur haaa)",
    cevaplar: ["döner", "tavuk döner", "katık", "zurna"],
    mesaj:
      "Bunu bulman biraz zamanını aldıysa bile önemli değil — çünkü asıl mesele aramızdaki o anıydı. " +
      "Seninle geçirdiğim her yıl, bu sandığın içindeki mesajdan daha değerli. İyi ki varsın."
  },

  // Zaman tüneli: istediğin kadar anı ekleyebilirsin, sırayla görünür.
  anilar: [
    { yil: "Tatil keyfisi", baslik: "MADAGASKARRRRR", yazi: "baya korkunçtu ama ne kadar çok eğlenmiştik ya" },
    { yil: "Bugün", baslik: "Doğum günü", yazi: "bak doğum günün işte daha niceee senelere inş canım yaa ölüyü bile diriltiriz :D" },
    { yil: "Bugün", baslik: "Ve işte buradayız", yazi: "Hâlâ birbirimizin yanındayız ve herzaman kübra ablam,Şeyda ablam,sen,ben hep birbirimizi destekleyeceğiz." }
  ]
};

const sakin = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ————————————————————————————————
   0. Sayfa yumuşak açılışı
———————————————————————————————— */
window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => document.body.classList.add("yuklendi"));
});

/* ————————————————————————————————
   1. Gül açılışı
———————————————————————————————— */
const gul = document.getElementById("gul");
const gulAlani = document.getElementById("gulAlani");
const acButon = document.getElementById("ac");
const dilek = document.getElementById("dilek");
document.getElementById("basIsim").textContent = AYAR.isim;

function goncayiAc() {
  if (gul.classList.contains("acildi")) return;
  gul.classList.add("acildi");
  gulAlani.classList.add("acildi");
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
      havaiFisekGosterisi();
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
   4b. Zaman tüneli
———————————————————————————————— */
const tunelListesi = document.getElementById("tunelListesi");

AYAR.anilar.forEach(a => {
  const madde = document.createElement("div");
  madde.className = "tunel-madde";
  madde.innerHTML = `
    <span class="yil"></span>
    <h3></h3>
    <p></p>
  `;
  madde.querySelector(".yil").textContent = a.yil || "";
  madde.querySelector("h3").textContent = a.baslik || "";
  madde.querySelector("p").textContent = a.yazi || "";
  tunelListesi.appendChild(madde);
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
  const adet = window.innerWidth < 600 ? 16 : 30;
  yapraklar = Array.from({ length: adet }, () => yeniYaprak(true));
}

function yeniYaprak(ilk) {
  const kalp = Math.random() < 0.35;
  return {
    x: Math.random() * window.innerWidth,
    y: ilk ? Math.random() * window.innerHeight : -20,
    b: kalp ? 6 + Math.random() * 5 : 5 + Math.random() * 7,
    hiz: 0.25 + Math.random() * 0.6,
    salinim: Math.random() * Math.PI * 2,
    donme: Math.random() * Math.PI,
    kalp,
    renk: Math.random() > 0.5 ? "rgba(224,105,122,0.5)" : "rgba(243,185,190,0.4)"
  };
}

function kalpCiz(ctx, boyut) {
  ctx.beginPath();
  ctx.moveTo(0, boyut * 0.3);
  ctx.bezierCurveTo(0, 0, -boyut, 0, -boyut, boyut * 0.35);
  ctx.bezierCurveTo(-boyut, boyut * 0.75, 0, boyut, 0, boyut * 1.15);
  ctx.bezierCurveTo(0, boyut, boyut, boyut * 0.75, boyut, boyut * 0.35);
  ctx.bezierCurveTo(boyut, 0, 0, 0, 0, boyut * 0.3);
  ctx.closePath();
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

    if (y.kalp) {
      kalpCiz(yapCtx, y.b * 0.5);
      yapCtx.fill();
    } else {
      yapCtx.beginPath();
      yapCtx.ellipse(0, 0, y.b, y.b * 0.55, 0, 0, Math.PI * 2);
      yapCtx.fill();
    }
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

document.getElementById("tekrar").addEventListener("click", () => {
  konfetiAt(180);
  havaiFisekGosterisi();
});

window.addEventListener("resize", () => {
  if (!sakin) yapraklariKur();
  olcule(konCanvas);
  olcule(fisekCanvas);
  gokyuzunuKur();
});

/* ————————————————————————————————
   7b. Havai fişek — roketli, uzun gösteri
———————————————————————————————— */
const fisekCanvas = document.getElementById("havaifisek");
const fisekCtx = fisekCanvas.getContext("2d");
let fisekParcaciklar = [];
let fisekRoketler = [];
let fisekDonuyor = false;

function fisekRoketFirlat(hedefX, hedefY) {
  fisekRoketler.push({
    x: hedefX + (Math.random() - 0.5) * 40,
    y: window.innerHeight + 10,
    hedefY,
    vy: -(9 + Math.random() * 2.5),
    iz: []
  });
}

function fisekPatlat(x, y) {
  const renkler = ["#E0697A", "#F3B9BE", "#CFA24F", "#F6EFE6", "#8FD3C7", "#B98BD1"];
  const renk = renkler[Math.floor(Math.random() * renkler.length)];
  const ikinciRenk = renkler[Math.floor(Math.random() * renkler.length)];
  const adet = 58;

  for (let i = 0; i < adet; i++) {
    const aci = (Math.PI * 2 * i) / adet + Math.random() * 0.15;
    const hiz = 1.8 + Math.random() * 3.6;
    fisekParcaciklar.push({
      x, y,
      vx: Math.cos(aci) * hiz,
      vy: Math.sin(aci) * hiz,
      omur: 1,
      renk: Math.random() < 0.5 ? renk : ikinciRenk
    });
  }

  if (!fisekDonuyor) { fisekDonuyor = true; fisekCiz(); }
}

function fisekCiz() {
  fisekCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  fisekRoketler.forEach(r => {
    r.iz.push({ x: r.x, y: r.y });
    if (r.iz.length > 9) r.iz.shift();
    r.y += r.vy;

    r.iz.forEach((nokta, i) => {
      fisekCtx.save();
      fisekCtx.globalAlpha = (i / r.iz.length) * 0.6;
      fisekCtx.fillStyle = "#F6EFE6";
      fisekCtx.beginPath();
      fisekCtx.arc(nokta.x, nokta.y, 1.7, 0, Math.PI * 2);
      fisekCtx.fill();
      fisekCtx.restore();
    });

    if (r.y <= r.hedefY) {
      fisekPatlat(r.x, r.y);
      r.patladi = true;
    }
  });
  fisekRoketler = fisekRoketler.filter(r => !r.patladi);

  fisekParcaciklar.forEach(p => {
    p.vy += 0.045;
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.omur -= 0.0085;

    fisekCtx.save();
    fisekCtx.globalAlpha = Math.max(p.omur, 0);
    fisekCtx.fillStyle = p.renk;
    fisekCtx.shadowColor = p.renk;
    fisekCtx.shadowBlur = 7;
    fisekCtx.beginPath();
    fisekCtx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
    fisekCtx.fill();
    fisekCtx.restore();
  });

  fisekParcaciklar = fisekParcaciklar.filter(p => p.omur > 0);

  if (fisekParcaciklar.length || fisekRoketler.length) {
    requestAnimationFrame(fisekCiz);
  } else {
    fisekDonuyor = false;
    fisekCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

function havaiFisekGosterisi() {
  const finale = document.getElementById("finaleYazi");

  if (sakin) {
    finale.hidden = false;
    finale.classList.remove("goster");
    void finale.offsetWidth;
    finale.classList.add("goster");
    return;
  }

  olcule(fisekCanvas);

  const patlamaSayisi = 12;
  for (let i = 0; i < patlamaSayisi; i++) {
    setTimeout(() => {
      const x = window.innerWidth * (0.12 + Math.random() * 0.76);
      const y = window.innerHeight * (0.1 + Math.random() * 0.38);
      fisekRoketFirlat(x, y);
      if (i % 3 === 0) {
        setTimeout(() => {
          const x2 = window.innerWidth * (0.12 + Math.random() * 0.76);
          const y2 = window.innerHeight * (0.1 + Math.random() * 0.38);
          fisekRoketFirlat(x2, y2);
        }, 140);
      }
    }, i * 460);
  }

  setTimeout(() => {
    finale.hidden = false;
    finale.classList.remove("goster");
    void finale.offsetWidth;
    finale.classList.add("goster");
  }, patlamaSayisi * 460 + 900);
}

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
    .normalize("NFC")
    .trim()
    .toLocaleLowerCase("tr")
    .replace(/[İıI]/g, "i")
    .replace(/\s+/g, " ");
}

sandikForm.addEventListener("submit", e => {
  e.preventDefault();
  const girilen = sadelestir(sandikCevapKutu.value);
  const dogrular = AYAR.sandik.cevaplar.map(sadelestir);

  if (girilen && dogrular.includes(girilen)) {
    sandikMesaj.textContent = AYAR.sandik.mesaj;
    sandikMesaj.hidden = false;
    sandikForm.hidden = true;
    sandikIpucu.textContent = "";
    window.requestAnimationFrame(() => {
      konfetiAt(140);
      havaiFisekGosterisi();
    });
  } else {
    sandikIpucu.textContent = "Olmadı, bir daha dene.";
    sandikKutu.classList.remove("titre");
    void sandikKutu.offsetWidth;
    sandikKutu.classList.add("titre");
  }
});

/* ————————————————————————————————
   11. Misafir defteri
———————————————————————————————— */
const DEFTER_ANAHTARI = "gonca-defter";
const defterForm = document.getElementById("defterForm");
const defterIsim = document.getElementById("defterIsim");
const defterNot = document.getElementById("defterNot");
const defterListesi = document.getElementById("defterListesi");

function defteriYukle() {
  let kayitlar = [];
  try {
    kayitlar = JSON.parse(localStorage.getItem(DEFTER_ANAHTARI)) || [];
  } catch { kayitlar = []; }

  defterListesi.innerHTML = "";

  if (!kayitlar.length) {
    const bos = document.createElement("p");
    bos.className = "defter-bos";
    bos.textContent = "Henüz kimse yazmadı — ilk notu sen bırak.";
    defterListesi.appendChild(bos);
    return;
  }

  kayitlar.slice().reverse().forEach(k => {
    const kart = document.createElement("div");
    kart.className = "defter-notu";
    kart.innerHTML = `<span class="kim"></span><p></p>`;
    kart.querySelector(".kim").textContent = k.isim;
    kart.querySelector("p").textContent = k.not;
    defterListesi.appendChild(kart);
  });
}

defterForm.addEventListener("submit", e => {
  e.preventDefault();
  const isim = defterIsim.value.trim();
  const not = defterNot.value.trim();
  if (!isim || !not) return;

  let kayitlar = [];
  try {
    kayitlar = JSON.parse(localStorage.getItem(DEFTER_ANAHTARI)) || [];
  } catch { kayitlar = []; }

  kayitlar.push({ isim, not });
  localStorage.setItem(DEFTER_ANAHTARI, JSON.stringify(kayitlar));
  defteriYukle();

  defterIsim.value = "";
  defterNot.value = "";
});

defteriYukle();

/* ————————————————————————————————
   12. PDF / yazdırma
———————————————————————————————— */
document.getElementById("yazdirDugme").addEventListener("click", () => {
  window.print();
});

/* ————————————————————————————————
   13. Sayfayı paylaş
———————————————————————————————— */
document.getElementById("paylasDugme").addEventListener("click", async () => {
  const veri = {
    title: "Gonca ablama",
    text: "Sana bir doğum günü sürprizi hazırladım 🌹",
    url: window.location.href
  };

  if (navigator.share) {
    try { await navigator.share(veri); } catch {}
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const buton = document.getElementById("paylasDugme");
      const eskiYazi = buton.textContent;
      buton.textContent = "Link kopyalandı!";
      setTimeout(() => (buton.textContent = eskiYazi), 1800);
    } catch {}
  }
});
