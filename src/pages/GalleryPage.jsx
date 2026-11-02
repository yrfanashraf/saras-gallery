import { useEffect, useRef, useState } from "react";
import { HERO_IMAGE, GALLERY, NAMES, COUPLE_NAME, TAGLINE, SIZES } from "../data.js";
import Photo from "../components/Photo.jsx";
import Reveal from "../components/Reveal.jsx";
import Hearts from "../components/Hearts.jsx";
import "../styles/gallery.css";

const MINI = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2;
  return { dx: Math.cos(a) * 34, dy: Math.sin(a) * 34 - 18 };
});

// ▼ The secret thank-you letter. Edit freely. ▼
const MADE_BY = "Prav";
const NOTE = [
  "Some people help you once. Others quietly become part of how you get through life. You two are the second kind.",
  "You have helped me in so many ways, big ones I will never forget and small ones you probably don’t even remember doing. Whenever I needed a hand, a push, or just someone in my corner, you were already there, and you never once made me feel like I was asking too much.",
  "I’m not great at saying thank you out loud, so I built you a little corner of the internet instead. Every photo here is the two of you being exactly who you are: kind, warm, and so good for each other. You make people believe in love without even trying.",
  "Thank you, Sanoona. Thank you, Rahbash. For everything you’ve done, and for being the best couple in the world.",
  "May your days always be this beautiful, and may there always be a reason to open another envelope.",
];

export default function GalleryPage({ onBack }) {
  const [hero, setHero] = useState(HERO_IMAGE);
  const [gallery, setGallery] = useState(GALLERY);
  const [solid, setSolid] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [liked, setLiked] = useState({});
  const [pops, setPops] = useState({});
  const [note, setNote] = useState("closed"); // "closed" | "open" | "closing"
  const mainRef = useRef(null);
  const heroRef = useRef(null);

  // Hero parallax, sticky nav, scroll-progress bar
  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = window.innerHeight;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - h;
        heroRef.current?.style.setProperty("--p", Math.min(1, y / h).toFixed(3));
        mainRef.current?.style.setProperty("--prog", max > 0 ? (y / max).toFixed(4) : 0);
        setSolid(y > h * 0.8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeNote = () => {
    setNote("closing");
    setTimeout(() => setNote("closed"), 450);
  };

  // Lock page scroll + Esc to close while the letter is open
  useEffect(() => {
    if (note === "closed") return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && closeNote();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [note]);

  // Tap a placeholder to preview a photo from the device
  const pickFile = (apply) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) apply(URL.createObjectURL(file));
    };
    input.click();
  };

  const like = (e, k) => {
    e.stopPropagation();
    try { navigator.vibrate && navigator.vibrate(15); } catch (err) {}
    setLiked((l) => ({ ...l, [k]: !l[k] }));
    setPops((p) => ({ ...p, [k]: (p[k] || 0) + 1 }));
  };

  const toGallery = () => document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
  const total = String(gallery.length).padStart(2, "0");

  return (
    <>
      <Hearts count={14} />
      <div className="main" ref={mainRef}>
        {/* NAV */}
        {/* <div className={`nav${solid ? " solid" : ""}`}>
          <div className="nav-logo">{COUPLE_NAME}’s</div>
          <button onClick={toGallery}>Gallery</button>
        </div> */}

        {/* HERO */}
        <header className="hero" ref={heroRef}>
          <div className="ph">
            <Photo index={0} src={hero} onPick={() => pickFile(setHero)} label="Hero photo · tap to add" />
          </div>
          <div className="hero-txt">
            <p className="h-names">{NAMES[0]} <i>&amp;</i> {NAMES[1]}</p>
            <h1>{COUPLE_NAME}’s<br />Gallery</h1>
            <p className="h-tag">{TAGLINE}</p>
          </div>
          <div className="scroll" onClick={toGallery}>
            <span>swipe up</span>
            <b>♥</b>
          </div>
        </header>

        {/* GALLERY */}
        <section className="gal" id="gallery">
          <Reveal className="head">
            <p className="head-k">the collection</p>
            <h2>Moments we keep</h2>
            <div className="divider"><span /><b>♥</b><span /></div>
          </Reveal>

          <div className="grid">
            {gallery.map((src, k) => (
              <Reveal key={k} className={`item ${SIZES[k] || ""}`} delay={(k % 2) * 120} onClick={() => src && setLightbox(src)}>
                <div className="frame" style={{ cursor: src ? "zoom-in" : "pointer" }}>
                  <div className="frame-in">
                    <Photo
                      index={k}
                      src={src}
                      onPick={(i) => pickFile((url) => setGallery((g) => g.map((v, j) => (j === i ? url : v))))}
                    />
                  </div>
                  <span className="tag">{String(k + 1).padStart(2, "0")} / {total}</span>
                  <button className={`like${liked[k] ? " on" : ""}`} onClick={(e) => like(e, k)} aria-label="Love this photo">
                    {liked[k] ? "♥" : "♡"}
                  </button>
                  {liked[k] && (
                    <span key={pops[k]} className="mini" aria-hidden="true">
                      {MINI.map((m, i) => <i key={i} style={{ "--dx": `${m.dx}px`, "--dy": `${m.dy}px` }}>♥</i>)}
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* OUTRO */}
        <footer className="outro">
          <Reveal>
            <p className="o-k">thank you for stopping by</p>
            <h2 className="o-names">
              <span>{NAMES[0]}</span>
              <i>♥</i>
              <span>{NAMES[1]}</span>
            </h2>
            <p className="o-sub">{COUPLE_NAME}’s little corner of the world</p>
            <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(onBack, 700); }}>
              Close the letter ♥
            </button>
            <button className="whisper" onClick={() => setNote("open")}>one more thing ✉</button>
          </Reveal>
        </footer>

        {lightbox && (
          <div className="lb" onClick={() => setLightbox(null)}>
            <button className="lbx" aria-label="Close">✕</button>
            <img src={lightbox} alt="" />
          </div>
        )}
      </div>

      {/* THE SECRET THANK-YOU LETTER */}
      {note !== "closed" && (
        <div className={`note${note === "closing" ? " closing" : ""}`} onClick={closeNote}>
          <button className="note-x" aria-label="Close letter" onClick={closeNote}>✕</button>
          <div className="note-card" onClick={(e) => e.stopPropagation()}>
            <div className="note-seal">♥</div>
            <h3 className="note-to">Dear {NAMES[0]} &amp; {NAMES[1]},</h3>
            <div className="note-body">
              {NOTE.map((t, i) => (
                <p key={i} style={{ "--i": i }}>{t}</p>
              ))}
              <p className="note-bye" style={{ "--i": NOTE.length }}>With all my love and gratitude,</p>
            </div>
            <div className="note-sign" style={{ "--i": NOTE.length + 1 }}>
              <span>made by</span>
              <b>{MADE_BY}</b>
            </div>
          </div>
        </div>
      )}
    </>
  );
}