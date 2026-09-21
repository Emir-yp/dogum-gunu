
  --gece:#17211F;
  --gece-acik:#20302C;
  --yaprak:#4E7A63;
  --gonca:#E0697A;
  --pembe:#F3B9BE;
  --sut:#F6EFE6;
  --altin:#CFA24F;
  --sonuk:#9AA8A2;
  --olcu:min(66ch, 88vw);
}

*{box-sizing:border-box;}
html{scroll-behavior:smooth;}

body{
  margin:0;
  background:radial-gradient(120% 70% at 50% 0%, var(--gece-acik) 0%, var(--gece) 62%);
  background-color:var(--gece);
  color:var(--sut);
  font-family:"Karla", system-ui, sans-serif;
  font-weight:300;
  font-size:clamp(1rem, 0.96rem + 0.3vw, 1.125rem);
  line-height:1.75;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
  opacity:0;
  transition:opacity 1.1s ease;
  cursor:default;
}
body.yuklendi{opacity:1;}

canvas#yapraklar,
canvas#konfeti,
canvas#havaifisek{
  position:fixed; inset:0;
  width:100%; height:100%;
  pointer-events:none;
}
canvas#yapraklar{z-index:0;}
canvas#konfeti{z-index:40;}
canvas#havaifisek{z-index:41;}

main{position:relative; z-index:1;}
section{padding:clamp(3.5rem, 9vw, 7rem) 1.25rem;}

h1,h2{
  font-family:"Fraunces", Georgia, serif;
  font-weight:300;
  line-height:1.08;
  margin:0;
}
h2{
  font-size:clamp(1.6rem, 4vw, 2.2rem);
  color:var(--pembe);
  margin-bottom:1.8rem;
}

/* ——— İmleci takip eden ışık + yapraklar ——— */
.imlec-isik{
  position:fixed;
  top:0; left:0;
  width:260px; height:260px;
  border-radius:50%;
  background:radial-gradient(circle, rgba(224,105,122,0.16), transparent 70%);
  pointer-events:none;
  z-index:2;
  transform:translate(-50%, -50%);
  will-change:transform;
}
.imlec-yaprak{
  position:fixed;
  top:0; left:0;
  width:10px; height:10px;
  pointer-events:none;
  z-index:3;
  will-change:transform;
  opacity:0.85;
}
.imlec-yaprak svg{width:100%; height:100%; display:block;}

/* ——— Müzik ——— */
.muzik-kutu{position:fixed; top:1rem; right:1rem; z-index:50;}
#oynatici{position:absolute; width:0; height:0; overflow:hidden;}
.muzik{
  display:flex; align-items:center; gap:0.55rem;
  font:inherit; font-size:0.82rem; letter-spacing:0.04em;
  color:var(--sut);
  background:rgba(23,33,31,0.72);
  border:1px solid rgba(243,185,190,0.35);
  border-radius:999px;
  padding:0.45rem 0.95rem;
  cursor:pointer;
  backdrop-filter:blur(6px);
}
.muzik:hover{rder-color:var(--pembe);}
.muzik-ikon{display:flex; align-items:flex-end; gap:2px; height:12px;}
.muzik-ikon i{width:2px; height:4px; background:var(--pembe); border-radius:1px;}
.muzik.calisiyor .muzik-ikon i{animation:zipla 0.9s ease-in-out infinite;}
.muzik.calisiyor .muzik-ikon i:nth-child(2){animation-delay:0.15s;}
.muzik.calisiyor .muzik-ikon i:nth-child(3){animation-delay:0.3s;}
@keyframes zipla{0%,100%{height:4px;}50%{height:12px;}}

/* ——— Açılış ——— */
.sahne{
  min-height:100svh;
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  text-align:center; gap:1.5rem;
}
.fisilti{
  margin:0; color:var(--pembe); letter-spacing:0.14em; font-size:0.82rem;
  opacity:0; animation:belirYukari 1s ease forwards; animation-delay:0.2s;
}

.gul-alani{
  position:relative;
  width:min(280px, 62vw);
  opacity:0;
  animation:belirYukari 1.1s ease forwards;
  animation-delay:0.45s;
}

.isik-halka{
  position:absolute;
  inset:-22%;
  border-radius:50%;
  background:radial-gradient(circle, rgba(224,105,122,0.32), transparent 68%);
  filter:blur(18px);
  opacity:0.45;
  animation:nefesAl 4.2s ease-in-out infinite;
  z-index:-1;
  transition:opacity 0.8s ease;
}
.gul-alani.acildi .isik-halka{
  opacity:0.85;
  animation-duration:2.6s;
}
@keyframes nefesAl{
  0%,100%{transform:scale(0.92); opacity:0.4;}
  50%{transform:scale(1.08); opacity:0.7;}
}

.kivilcim-katmani{position:absolute; inset:-12%; z-index:-1;}
.kivilcim{
  position:absolute;
  width:4px; height:4px;
  background:var(--pembe);
  border-radius:50%;
  box-shadow:0 0 6px 2px rgba(243,185,190,0.75);
  opacity:0;
  animation:pirilti 3.4s ease-in-out infinite;
}
.kivilcim:nth-child(1){top:6%;  left:10%; animation-delay:0s;}
.kivilcim:nth-child(2){top:14%; left:86%; animation-delay:0.5s;}
.kivilcim:nth-child(3){top:72%; left:4%;  animation-delay:1s;}
.kivilcim:nth-child(4){top:80%; left:90%; animation-delay:1.5s;}
.kivilcim:nth-child(5){top:42%; left:-6%; animation-delay:2s;}
.kivilcim:nth-child(6){top:36%; left:104%; animation-delay:2.5s;}
@keyframes pirilti{
  0%,100%{opacity:0; transform:scale(0.5);}
  50%{opacity:1; transform:scale(1.2);}
}

.gul{width:100%; height:auto; overflow:visible; cursor:pointer; position:relative;}
.sap{stroke:var(--yaprak); stroke-width:4; stroke-linecap:round;}
.yaprak-sap{fill:var(--yaprak);}
.yaprak{fill:var(--gonca);}
.ic-yaprak{fill:var(--pembe);}
.tac .yaprak{
  transform-box:fill-box; transform-origin:50% 100%;
  transform:scale(0.42);
  transition:transform 1.5s cubic-bezier(.2,.9,.25,1);
}
.acildi .y1{transform:scale(1) rotate(-16deg);}
.acildi .y2{transform:scale(1) rotate(16deg);}
.acildi .y3{transform:scale(0.92) rotate(-6deg);}
.acildi .y4{transform:scale(0.92) rotate(6deg);}
.cekirdek{
  transform-box:fill-box; transform-origin:50% 100%;
  transition:transform 1.5s cubic-bezier(.2,.9,.25,1) 0.1s;
}
.acildi .cekirdek{transform:scale(0.78);}

.ac{
  font:inherit; font-weight:600; letter-spacing:0.04em;
  color:var(--gece); background:var(--pembe);
  border:0; border-radius:999px;
  padding:0.8rem 1.9rem; cursor:pointer;
  transition:background 0.25s, transform 0.2s, box-shadow 0.25s;
  opacity:0;
  animation:belirYukari 1s ease forwards;
  animation-delay:0.75s;
}
.ac:hover{background:var(--gonca); color:var(--sut); box-shadow:0 0 22px rgba(224,105,122,0.45);}
.ac:active{transform:translateY(1px);}
.ac[hidden], .dilek-mesaji[hidden], .pasta-mesaj[hidden], .sandik-mesaj[hidden]{display:none;}

@keyframes belirYukari{
  from{opacity:0; transform:translateY(16px);}
  to{opacity:1; transform:none;}
}

.dilek-mesaji h1 span{
  display:inline-block;
  opacity:0;
  transform:translateY(16px);border-color:var(--pembe);}
.muzik-ikon{display:flex; align-items:flex-end; gap:2px; height:12px;}
.muzik-ikon i{width:2px; height:4px; background:var(--pembe); border-radius:1px;}
.muzik.calisiyor .muzik-ikon i{animation:zipla 0.9s ease-in-out infinite;}
.muzik.calisiyor .muzik-ikon i:nth-child(2){animation-delay:0.15s;}
.muzik.calisiyor .muzik-ikon i:nth-child(3){animation-delay:0.3s;}
@keyframes zipla{0%,100%{height:4px;}50%{height:12px;}}

/* ——— Açılış ——— */
.sahne{
  min-height:100svh;
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  text-align:center; gap:1.5rem;
}
.fisilti{
  margin:0; color:var(--pembe); letter-spacing:0.14em; font-size:0.82rem;
  opacity:0; animation:belirYukari 1s ease forwards; animation-delay:0.2s;
}

.gul-alani{
  position:relative;
  width:min(280px, 62vw);
  opacity:0;
  animation:belirYukari 1.1s ease forwards;
  animation-delay:0.45s;
}

.isik-halka{
  position:absolute;
  inset:-22%;
  border-radius:50%;
  background:radial-gradient(circle, rgba(224,105,122,0.32), transparent 68%);
  filter:blur(18px);
  opacity:0.45;
  animation:nefesAl 4.2s ease-in-out infinite;
  z-index:-1;
  transition:opacity 0.8s ease;
}
.gul-alani.acildi .isik-halka{
  opacity:0.85;
  animation-duration:2.6s;
}
@keyframes nefesAl{
  0%,100%{transform:scale(0.92); opacity:0.4;}
  50%{transform:scale(1.08); opacity:0.7;}
}

.kivilcim-katmani{position:absolute; inset:-12%; z-index:-1;}
.kivilcim{
  position:absolute;
  width:4px; height:4px;
  background:var(--pembe);
  border-radius:50%;
  box-shadow:0 0 6px 2px rgba(243,185,190,0.75);
  opacity:0;
  animation:pirilti 3.4s ease-in-out infinite;
}
.kivilcim:nth-child(1){top:6%;  left:10%; animation-delay:0s;}
.kivilcim:nth-child(2){top:14%; left:86%; animation-delay:0.5s;}
.kivilcim:nth-child(3){top:72%; left:4%;  animation-delay:1s;}
.kivilcim:nth-child(4){top:80%; left:90%; animation-delay:1.5s;}
.kivilcim:nth-child(5){top:42%; left:-6%; animation-delay:2s;}
.kivilcim:nth-child(6){top:36%; left:104%; animation-delay:2.5s;}
@keyframes pirilti{
  0%,100%{opacity:0; transform:scale(0.5);}
  50%{opacity:1; transform:scale(1.2);}
}

.gul{width:100%; height:auto; overflow:visible; cursor:pointer; position:relative;}
.sap{stroke:var(--yaprak); stroke-width:4; stroke-linecap:round;}
.yaprak-sap{fill:var(--yaprak);}
.yaprak{fill:var(--gonca);}
.ic-yaprak{fill:var(--pembe);}
.tac .yaprak{
  transform-box:fill-box; transform-origin:50% 100%;
  transform:scale(0.42);
  transition:transform 1.5s cubic-bezier(.2,.9,.25,1);
}
.acildi .y1{transform:scale(1) rotate(-16deg);}
.acildi .y2{transform:scale(1) rotate(16deg);}
.acildi .y3{transform:scale(0.92) rotate(-6deg);}
.acildi .y4{transform:scale(0.92) rotate(6deg);}
.cekirdek{
  transform-box:fill-box; transform-origin:50% 100%;
  transition:transform 1.5s cubic-bezier(.2,.9,.25,1) 0.1s;
}
.acildi .cekirdek{transform:scale(0.78);}

.ac{
  font:inherit; font-weight:600; letter-spacing:0.04em;
  color:var(--gece); background:var(--pembe);
  border:0; border-radius:999px;
  padding:0.8rem 1.9rem; cursor:pointer;
  transition:background 0.25s, transform 0.2s, box-shadow 0.25s;
  opacity:0;
  animation:belirYukari 1s ease forwards;
  animation-delay:0.75s;
}
.ac:hover{background:var(--gonca); color:var(--sut); box-shadow:0 0 22px rgba(224,105,122,0.45);}
.ac:active{transform:translateY(1px);}
.ac[hidden], .dilek-mesaji[hidden], .pasta-mesaj[hidden], .sandik-mesaj[hidden]{display:none;}

@keyframes belirYukari{
  from{opacity:0; transform:translateY(16px);}
  to{opacity:1; transform:none;}
}

.dilek-mesaji h1 span{
  display:inline-block;
  opacity:0;
  transform:translateY(16px);
  animation:belirYukari 0.85s ease forwards;
}
.dilek-mesaji h1 .satir1{animation-delay:0.1s;}
.dilek-mesaji h1 .isim{animation-delay:0.5s;}
.dilek-mesaji p{
  margin:0 0 1.6rem; color:#C9D3CD;
  opacity:0; animation:belirYukari 0.85s ease forwards; animation-delay:0.9s;
}
.dilek-mesaji .in{
  display:inline-block;
  opacity:0; animation:belirYukari 0.85s ease forwards; animation-delay:1.15s;
}

h1{font-size:clamp(2.4rem, 8vw, 4.4rem); margin-bottom:0.6rem;}
.isim{color:var(--gonca); font-style:italic;}
.in{color:var(--altin); text-decoration:none; border-bottom:1px solid currentColor; padding-bottom:2px;}
.in:hover{color:var(--sut);}

/* ——— Kayarken beliren bölümler ——— */
.belirsin{opacity:0; transform:translateY(24px); transition:opacity 0.9s ease, transform 0.9s ease;}
.belirsin.gorundu{opacity:1; transform:none;}

/* ——— Geri sayım ——— */
.geri-sayim{text-align:center;}
.sayac{display:flex; flex-wrap:wrap; justify-content:center; gap:clamp(0.6rem, 3vw, 1.6rem);}
.kutu{
  min-width:5.2rem; border:1px solid rgba(243,185,190,0.28); border-radius:14px; padding:1rem 0.8rem;
  transition:border-color 0.3s, box-shadow 0.3s;
}
.kutu strong{
  display:block; font-family:"Fraunces", Georgia, serif; font-weight:500;
  font-size:clamp(1.8rem, 6vw, 2.6rem); line-height:1; color:var(--sut);
  font-variant-numeric:tabular-nums;
}
.kutu strong.nabiz{animation:nabizVur 0.5s ease;}
@keyframes nabizVur{
  0%{transform:scale(1); color:var(--sut);}
  40%{transform:scale(1.18); color:var(--pembe);}
  100%{transform:scale(1); color:var(--sut);}
}
.kutu span{font-size:0.78rem; letter-spacing:0.1em; color:var(--sonuk);}
.sayim-not{color:var(--sonuk); font-size:0.9rem; margin-top:1.6rem;}

/* ——— Pasta ——— */
.pasta-bolum{text-align:center;}
.yonerge{color:var(--sonuk); margin-top:-1rem; margin-bottom:2rem;}
.pasta{width:min(420px, 86vw); height:auto;}
.mum rect{fill:var(--pembe);}
.alev{fill:var(--altin); cursor:pointer; transform-box:fill-box; transform-origin:50% 100%;
  animation:titre 1.1s ease-in-out infinite; transition:opacity 0.4s, transform 0.4s;}
.alev:hover{fill:#F2C97C;}
.sondu .alev{opacity:0; transform:scale(0.2); animation:none;}
@keyframes titre{0%,100%{transform:scale(1);}50%{transform:scale(1.12,0.9);}}
.krema{fill:var(--sut);}
.kat.ust{fill:var(--gonca);}
.kat.alt{fill:#B85263;}
.seker{fill:var(--altin);}
.pasta-mesaj{
  margin-top:2rem; color:var(--altin);
  font-family:"Fraunces", Georgia, serif; font-style:italic; font-size:1.2rem;
  animation:belirYukari 0.8s ease both;
}
.finale-yazi{
  margin-top:1.2rem;
  font-family:"Fraunces", Georgia, serif;
  font-style:italic;
  font-size:clamp(1.3rem, 4vw, 1.8rem);
  color:var(--pembe);
  opacity:0;
}
.finale-yazi.goster{
  animation:finaleBelir 1.2s ease forwards, finaleSolgun 1.2s ease forwards 4.2s;
}
@keyframes finaleBelir{
  from{opacity:0; transform:scale(0.9);}
  to{opacity:1; transform:scale(1);}
}
@keyframes finaleSolgun{
  from{opacity:1;}
  to{opacity:0;}
}

/* ——— Mektup ——— */
.mektup{max-width:var(--olcu); margin-inline:auto;}
.mektup p{margin:0 0 1.5rem;}
.mektup p:first-of-type::first-letter{
  font-family:"Fraunces", Georgia, serif; font-size:3.2rem; line-height:0.8; float:left;
  padding:0.35rem 0.6rem 0 0; color:var(--gonca);
}
.imza{font-family:"Fraunces", Georgia, serif; font-style:italic; color:var(--altin);}

/* ——— Zaman tüneli ——— */
.tunel-bolum{max-width:min(720px,90vw); margin-inline:auto;}
.tunel{position:relative; padding-left:1.8rem;}
.tunel::before{
  content:""; position:absolute; left:5px; top:0.4rem; bottom:0.4rem;
  width:1px; background:linear-gradient(to bottom, transparent, rgba(243,185,190,0.4), transparent);
}
.tunel-madde{position:relative; padding-bottom:2.2rem;}
.tunel-madde:last-child{padding-bottom:0;}
.tunel-madde::before{
  content:""; position:absolute; left:-1.8rem; top:0.3rem;
  width:11px; height:11px; border-radius:50%;
  background:var(--gonca); box-shadow:0 0 0 4px rgba(224,105,122,0.18);
}
.tunel-madde .yil{
  display:block; font-size:0.8rem; letter-spacing:0.08em;
  color:var(--altin); margin-bottom:0.3rem;
}
.tunel-madde h3{
  font-family:"Fraunces", Georgia, serif; font-weight:400; font-style:italic;
  margin:0 0 0.4rem; color:var(--sut); font-size:1.15rem;
}
.tunel-madde p{margin:0; color:#C9D3CD;}

/* ——— Yıldızlar / dilek ——— */
.yildiz-bolum{text-align:center; max-width:min(720px, 92vw); margin-inline:auto;}
.gokyuzu-cerceve{
  width:100%; height:min(46vh, 320px);
  border-radius:18px; overflow:hidden;
  background:linear-gradient(180deg, #0E1614, #1B2723);
  border:1px solid rgba(243,185,190,0.18);
  margin-bottom:1.6rem;
}
#gokyuzu{width:100%; height:100%; display:block; cursor:pointer;}
.dilek-form{display:flex; flex-wrap:wrap; gap:0.7rem; justify-content:center;}
.dilek-form input{
  flex:1 1 220px;
  font:inherit; color:var(--sut);
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(243,185,190,0.28);
  border-radius:999px;
  padding:0.7rem 1.1rem;
}
.dilek-form input::placeholder{color:var(--sonuk);}
.dilek-form input:focus{outline:none; border-color:var(--pembe);}
.dilek-form button,
.sandik-form button,
.defter-form button{
  font:inherit; font-weight:600; letter-spacing:0.02em;
  color:var(--gece); background:var(--pembe);
  border:0; border-radius:999px;
  padding:0.7rem 1.5rem; cursor:pointer;
  transition:background 0.2s, box-shadow 0.25s;
}
.dilek-form button:hover,
.sandik-form button:hover,
.defter-form button:hover{background:var(--gonca); color:var(--sut); box-shadow:0 0 18px rgba(224,105,122,0.4);}
.dilek-listesi{
  list-style:none; margin:1.4rem 0 0; padding:0;
  display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center;
}
.dilek-listesi li{
  font-size:0.85rem; color:var(--sonuk);
  border:1px solid rgba(246,239,230,0.14);
  border-radius:999px; padding:0.35rem 0.9rem;
}

/* ——— Sandık ——— */
.sandik-bolum{text-align:center; max-width:min(560px, 90vw); margin-inline:auto;}
.sandik{
  border:1px solid rgba(207,162,79,0.35);
  border-radius:18px;
  padding:clamp(1.6rem, 5vw, 2.6rem);
  background:rgba(207,162,79,0.06);
}
.sandik .soru{margin:0 0 1.3rem; color:var(--sut);}
.sandik-form{display:flex; flex-wrap:wrap; gap:0.7rem; justify-content:center;}
.sandik-form input{
  flex:1 1 200px;
  font:inherit; color:var(--sut);
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(207,162,79,0.35);
  border-radius:999px;
  padding:0.7rem 1.1rem;
}
.sandik-form input:focus{outline:none; border-color:var(--altin);}
.ipucu{min-height:1.4rem; margin:1rem 0 0; font-size:0.85rem; color:var(--altin);}
.sandik.titre{animation:silkele 0.4s;}
@keyframes silkele{
  0%,100%{transform:translateX(0);}
  25%{transform:translateX(-6px);}
  75%{transform:translateX(6px);}
}
.sandik-mesaj{
  margin-top:1.6rem; padding-top:1.6rem;
  border-top:1px solid rgba(207,162,79,0.3);
  font-family:"Fraunces", Georgia, serif; font-style:italic;
  font-size:1.15rem; line-height:1.6; color:var(--sut);
  animation:belirYukari 0.9s ease both;
}

/* ——— Galeri ——— */
.galeri-bolum{max-width:min(980px, 92vw); margin-inline:auto;}
.galeri{display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:1rem;}
.kare{
  position:relative; overflow:hidden; border-radius:12px;
  aspect-ratio:4/5; background:linear-gradient(160deg, #2C403A, #3E5A4C);
  display:flex; align-items:flex-end;
}
.kare img{
  position:absolute; inset:0; width:100%;90vw); margin-inline:auto;}
.tunel{position:relative; padding-left:1.8rem;}
.tunel::before{
  content:""; position:absolute; left:5px; top:0.4rem; bottom:0.4rem;
  width:1px; background:linear-gradient(to bottom, transparent, rgba(243,185,190,0.4), transparent);
}
.tunel-madde{position:relative; padding-bottom:2.2rem;}
.tunel-madde:last-child{padding-bottom:0;}
.tunel-madde::before{
  content:""; position:absolute; left:-1.8rem; top:0.3rem;
  width:11px; height:11px; border-radius:50%;
  background:var(--gonca); box-shadow:0 0 0 4px rgba(224,105,122,0.18);
}
.tunel-madde .yil{
  display:block; font-size:0.8rem; letter-spacing:0.08em;
  color:var(--altin); margin-bottom:0.3rem;
}
.tunel-madde h3{
  font-family:"Fraunces", Georgia, serif; font-weight:400; font-style:italic;
  margin:0 0 0.4rem; color:var(--sut); font-size:1.15rem;
}
.tunel-madde p{margin:0; color:#C9D3CD;}

/* ——— Yıldızlar / dilek ——— */
.yildiz-bolum{text-align:center; max-width:min(720px, 92vw); margin-inline:auto;}
.gokyuzu-cerceve{
  width:100%; height:min(46vh, 320px);
  border-radius:18px; overflow:hidden;
  background:linear-gradient(180deg, #0E1614, #1B2723);
  border:1px solid rgba(243,185,190,0.18);
  margin-bottom:1.6rem;
}
#gokyuzu{width:100%; height:100%; display:block; cursor:pointer;}
.dilek-form{display:flex; flex-wrap:wrap; gap:0.7rem; justify-content:center;}
.dilek-form input{
  flex:1 1 220px;
  font:inherit; color:var(--sut);
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(243,185,190,0.28);
  border-radius:999px;
  padding:0.7rem 1.1rem;
}
.dilek-form input::placeholder{color:var(--sonuk);}
.dilek-form input:focus{outline:none; border-color:var(--pembe);}
.dilek-form button,
.sandik-form button,
.defter-form button{
  font:inherit; font-weight:600; letter-spacing:0.02em;
  color:var(--gece); background:var(--pembe);
  border:0; border-radius:999px;
  padding:0.7rem 1.5rem; cursor:pointer;
  transition:background 0.2s, box-shadow 0.25s;
}
.dilek-form button:hover,
.sandik-form button:hover,
.defter-form button:hover{background:var(--gonca); color:var(--sut); box-shadow:0 0 18px rgba(224,105,122,0.4);}
.dilek-listesi{
  list-style:none; margin:1.4rem 0 0; padding:0;
  display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center;
}
.dilek-listesi li{
  font-size:0.85rem; color:var(--sonuk);
  border:1px solid rgba(246,239,230,0.14);
  border-radius:999px; padding:0.35rem 0.9rem;
}

/* ——— Sandık ——— */
.sandik-bolum{text-align:center; max-width:min(560px, 90vw); margin-inline:auto;}
.sandik{
  border:1px solid rgba(207,162,79,0.35);
  border-radius:18px;
  padding:clamp(1.6rem, 5vw, 2.6rem);
  background:rgba(207,162,79,0.06);
}
.sandik .soru{margin:0 0 1.3rem; color:var(--sut);}
.sandik-form{display:flex; flex-wrap:wrap; gap:0.7rem; justify-content:center;}
.sandik-form input{
  flex:1 1 200px;
  font:inherit; color:var(--sut);
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(207,162,79,0.35);
  border-radius:999px;
  padding:0.7rem 1.1rem;
}
.sandik-form input:focus{outline:none; border-color:var(--altin);}
.ipucu{min-height:1.4rem; margin:1rem 0 0; font-size:0.85rem; color:var(--altin);}
.sandik.titre{animation:silkele 0.4s;}
@keyframes silkele{
  0%,100%{transform:translateX(0);}
  25%{transform:translateX(-6px);}
  75%{transform:translateX(6px);}
}
.sandik-mesaj{
  margin-top:1.6rem; padding-top:1.6rem;
  border-top:1px solid rgba(207,162,79,0.3);
  font-family:"Fraunces", Georgia, serif; font-style:italic;
  font-size:1.15rem; line-height:1.6; color:var(--sut);
  animation:belirYukari 0.9s ease both;
}

/* ——— Galeri ——— */
.galeri-bolum{max-width:min(980px, 92vw); margin-inline:auto;}
.galeri{display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:1rem;}
.kare{
  position:relative; overflow:hidden; border-radius:12px;
  aspect-ratio:4/5; background:linear-gradient(160deg, #2C403A, #3E5A4C);
  display:flex; align-items:flex-end;
}
.kare img{
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
  transition:transform 0.6s ease, filter 0.6s ease;
}
.kare:hover img{transform:scale(1.08); filter:brightness(1.06);}
.kare figcaption{
  position:relative; z-index:2; width:100%;
  padding:2.5rem 0.9rem 0.8rem; font-size:0.88rem;
  background:linear-gradient(to top, rgba(10,16,15,0.85), transparent);
}
.kare.bos figcaption{background:none; padding:0.9rem; color:var(--sonuk);}

/* ——— Sebepler ——— */
.sebepler{max-width:var(--olcu); margin-inline:auto; border-top:1px solid rgba(246,239,230,0.14);}
.sebepler ul{list-style:none; margin:0; padding:0;}
.sebepler li{
  padding:0.9rem 0 0.9rem 2.1rem; position:relative;
  border-bottom:1px solid rgba(246,239,230,0.08);
  transition:padding-left 0.3s ease, color 0.3s ease;
}
.sebepler li::before{
  content:""; position:absolute; left:0; top:1.5rem;
  width:9px; height:9px; border-radius:50% 0 50% 50%; background:var(--gonca);
  transition:transform 0.3s ease;
}
.sebepler li:hover{padding-left:2.5rem; color:var(--sut);}
.sebepler li:hover::before{transform:scale(1.5);}
.not{margin-top:1.6rem; font-size:0.9rem; color:var(--sonuk);}

/* ——— Misafir defteri ——— */
.defter-bolum{max-width:min(640px, 90vw); margin-inline:auto; text-align:center;}
.defter-form{display:flex; flex-direction:column; gap:0.7rem; align-items:center;}
.defter-form input,
.defter-form textarea{
  width:100%;
  font:inherit; color:var(--sut);
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(243,185,190,0.28);
  border-radius:14px;
  padding:0.7rem 1.1rem;
  resize:vertical;
}
.defter-form textarea{min-height:4.2rem; border-radius:14px;}
.defter-form input:focus,
.defter-form textarea:focus{outline:none; border-color:var(--pembe);}
.defter-form button{align-self:center; padding:0.7rem 2rem;}
.defter-listesi{
  margin-top:2rem; display:flex; flex-direction:column; gap:0.9rem; text-align:left;
}
.defter-notu{
  border:1px solid rgba(246,239,230,0.14);
  border-radius:14px; padding:0.9rem 1.1rem;
  background:rgba(255,255,255,0.03);
  transition:border-color 0.3s, background 0.3s;
}
.defter-notu:hover{border-color:rgba(243,185,190,0.3); background:rgba(255,255,255,0.05);}
.defter-notu .kim{
  display:block; font-weight:600; color:var(--pembe);
  font-size:0.88rem; margin-bottom:0.25rem;
}
.defter-notu p{margin:0; color:#C9D3CD; font-size:0.92rem;}
.defter-bos{color:var(--sonuk); font-size:0.9rem; margin-top:1.6rem;}

/* ——— Fiziksel bağ / QR ——— */
.fiziksel-bolum{text-align:center; max-width:min(640px, 90vw); margin-inline:auto;}
.qr-kutu{
  display:flex; flex-wrap:wrap; align-items:center; justify-content:center;
  gap:clamp(1.5rem, 5vw, 3rem);
  margin-top:1rem;
}
.figur{width:min(140px, 34vw); height:auto; flex-shrink:0;}
.figur-golge{fill:rgba(0,0,0,0.28);}
.figur-govde{fill:var(--gonca);}
.figur-kafa{fill:#EAB89A;}
.figur-sac{fill:#3A2A22;}
.figur-kol{stroke:#EAB89A; stroke-width:8; stroke-linecap:round;}
.figur-cicek .sap{stroke:var(--yaprak); stroke-width:3;}
.cicek-yaprak{fill:var(--pembe);}
.cicek-merkez{fill:var(--altin);}
.figur-cicek{
  transform-box:fill-box; transform-origin:50% 100%;
  animation:cicekSalla 3.4s ease-in-out infinite;
}
@keyframes cicekSalla{
  0%,100%{transform:rotate(-4deg);}
  50%{transform:rotate(4deg);}
}
.qr-cerceve{
  background:var(--sut);
  border-radius:16px;
  padding:0.9rem;
  box-shadow:0 8px 28px rgba(0,0,0,0.35);
}
.qr-cerceve img{display:block; width:168px; height:168px; max-width:40vw; max-height:40vw;}

/* ——— Alt ——— */
footer{text-align:center; padding:2.5rem 1.25rem 4rem; color:var(--sonuk); font-size:0.85rem;}
footer p{margin:0 0 1.2rem;}
.alt-butonlar{display:flex; flex-wrap:wrap; gap:0.7rem; justify-content:center;}
.tekrar, .pdf, .paylas{
  font:inherit; font-size:0.82rem; color:var(--pembe);
  background:none; border:1px solid rgba(243,185,190,0.35);
  border-radius:999px; padding:0.5rem 1.2rem; cursor:pointer;
  transition:border-color 0.25s, color 0.25s, box-shadow 0.25s;
}
.tekrar:hover, .pdf:hover, .paylas:hover{
  border-color:var(--pembe); color:var(--sut); box-shadow:0 0 16px rgba(243,185,190,0.3);
}

:focus-visible{outline:2px solid var(--altin); outline-offset:3px; border-radius:4px;}

@media (hover: none){
  .imlec-isik, .imlec-yaprak{display:none;}
}

@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto;}
  *{animation-duration:0.01ms !important; transition-duration:0.01ms !important;}
  .belirsin, .fisilti, .gul-alani, .ac,
  .dilek-mesaji h1 span, .dilek-mesaji p, .dilek-mesaji .in{opacity:1 !important; transform:none !important;}
  body{opacity:1 !important;}
  .imlec-isik, .imlec-yaprak{display:none;}
}

/* ——— Yazdırma / PDF ——— */
@media print{
  canvas#yapraklar, canvas#konfeti, canvas#havaifisek, canvas#gokyuzu,
  .muzik-kutu, .ac, .dilek-form, .sandik-form, .defter-form, .ipucu,
  .yonerge, .alt-butonlar, .dilek-listesi, .isik-halka, .kivilcim-katmani,
  .imlec-isik, .imlec-yaprak, .qr-kutu{
    display:none !important;
  }
  body{background:#FBF8F3 !important; color:#20302C !important; opacity:1 !important;}
  .belirsin{opacity:1 !important; transform:none !important;}
  .dilek-mesaji, .pasta-mesaj, .sandik-mesaj{
    display:block !important; opacity:1 !important; transform:none !important;
  }
  .dilek-mesaji h1 span, .dilek-mesaji p, .dilek-mesaji .in{opacity:1 !important; transform:none !important;}
  h2{color:#B85263 !important;}
  .isim, .imza{color:#B85263 !important;}
  section{padding:1.6rem 0 !important; break-inside:avoid;}
  .gokyuzu-cerceve{display:none !important;}
  .defter-listesi{display:none !important;}
}
script.js
js
/* ————————————————————————————————
   AYARLAR — sadece burayı değiştir
———————————————————————————————— */
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
    { yil: "Çocukluk", baslik: "İlk anılarımız", yazi: "Buraya kendi anınızı yaz." },
    { yil: "Okul yılları", baslik: "Beraber büyüdüğümüz zamanlar", yazi: "Buraya kendi anınızı yaz." },
    { yil: "Bugün", baslik: "Ve işte buradayız", yazi: "Hâlâ birbirimizin yanındayız." }
  ]
};

const sakin = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const dokunmatik = window.matchMedia("(hover: none)").matches;

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
   2. Geri sayım (rakamlar nabız gibi atıyor)
———————————————————————————————— */
const alanlar = {
  gun: document.getElementById("gun"),
  saat: document.getElementById("saat"),
  dakika: document.getElementById("dakika"),
  saniye: document.getElementById("saniye")
};
const oncekiDeger = { gun: null, saat: null, dakika: null, saniye: null };

function nabizAt(el, yeniDeger, anahtar) {
  if (oncekiDeger[anahtar] !== null && oncekiDeger[anahtar] !== yeniDeger && !sakin) {
    el.classList.remove("nabiz");
    void el.offsetWidth;
    el.classList.add("nabiz");
  }
  oncekiDeger[anahtar] = yeniDeger;
  el.textContent = yeniDeger;
}

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
  nabizAt(alanlar.gun, Math.floor(sn / 86400), "gun");
  nabizAt(alanlar.saat, Math.floor((sn % 86400) / 3600), "saat");
  nabizAt(alanlar.dakika, Math.floor((sn % 3600) / 60), "dakika");
  nabizAt(alanlar.saniye, sn % 60, "saniye");}
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
   6. Uçuşan yapraklar (arka plan)
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
   6b. İmleci takip eden ışık ve yapraklar
———————————————————————————————— */
if (!sakin && !dokunmatik) {
  const isik = document.createElement("div");
  isik.className = "imlec-isik";
  document.body.appendChild(isik);

  const yaprakSayisi = 3;
  const takipYapraklari = [];
  for (let i = 0; i < yaprakSayisi; i++) {
    const el = document.createElement("div");
    el.className = "imlec-yaprak";
    el.innerHTML = `<svg viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="9" ry="5" fill="${
      i % 2 === 0 ? "#E0697A" : "#F3B9BE"
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
   6. Uçuşan yapraklar (arka plan)
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
   6b. İmleci takip eden ışık ve yapraklar
———————————————————————————————— */
if (!sakin && !dokunmatik) {
  const isik = document.createElement("div");
  isik.className = "imlec-isik";
  document.body.appendChild(isik);

  const yaprakSayisi = 3;
  const takipYapraklari = [];
  for (let i = 0; i < yaprakSayisi; i++) {
    const el = document.createElement("div");
    el.className = "imlec-yaprak";
    el.innerHTML = `<svg viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="9" ry="5" fill="${
      i % 2 === 0 ? "#E0697A" : "#F3B9BE"
    }"/></svg>`;
    document.body.appendChild(el);
    takipYapraklari.push({ el, x: window.innerWidth / 2, y: window.innerHeight / 2, aci: Math.random() * 360 });
  }

  let hedefX = window.innerWidth / 2;
  let hedefY = window.innerHeight / 2;
  let isikX = hedefX;
  let isikY = hedefY;

  window.addEventListener("mousemove", e => {
    hedefX = e.clientX;
    hedefY = e.clientY;
  });

  function imlecDongusu() {
    isikX += (hedefX - isikX) * 0.14;
    isikY += (hedefY - isikY) * 0.14;
    isik.style.transform = `translate(${isikX}px, ${isikY}px)`;

    takipYapraklari.forEach((y, i) => {
      const gecikme = 0.08 - i * 0.015;
      const uzaklikX = (i + 1) * 14 * Math.sin(performance.now() / 900 + i);
      const uzaklikY = (i + 1) * 10 * Math.cos(performance.now() / 700 + i);
      y.x += (hedefX + uzaklikX - y.x) * gecikme;
      y.y += (hedefY + uzaklikY - y.y) * gecikme;
      y.aci += 1.2;
      y.el.style.transform = `translate(${y.x}px, ${y.y}px) rotate(${y.aci}deg)`;
    });

    requestAnimationFrame(imlecDongusu);
  }
  imlecDongusu();
}

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
   12. QR kod — sayfanın kendi linkine göre
———————————————————————————————— */
const qrKod = document.getElementById("qrKod");
if (qrKod) {
  const link = encodeURIComponent(window.location.href);
  qrKod.src = `https://api.qrserver.com/v1/create-qr-code/?size=336x336&data=${link}&color=17-33-31&bgcolor=246-239-230`;
}

/* ————————————————————————————————
   13. PDF / yazdırma
———————————————————————————————— */
document.getElementById("yazdirDugme").addEventListener("click", () => {
  window.print();
});

/* ————————————————————————————————
   14. Sayfayı paylaş
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
