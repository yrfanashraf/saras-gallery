import { useState } from "react";
import { NAMES, COUPLE_NAME, LETTER_IMAGE } from "../data.js";
import "../styles/intro.css";

// Slow floating hearts in the background (fixed values, so no re-randomising on render)
const FLOATERS = Array.from({ length: 16 }, (_, i) => ({
  x: (i * 37 + 8) % 100,
  size: 10 + ((i * 7) % 16),
  dur: 14 + ((i * 5) % 10),
  delay: -((i * 23) % 20),
  sway: ((i % 2 ? 1 : -1) * (20 + ((i * 11) % 40))),
  ch: i % 4 === 0 ? "✦" : "♥",
}));

// Hearts that burst out of the seal when the envelope opens
const BURST = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  const r = 90 + ((i * 29) % 70);
  return { dx: Math.cos(a) * r, dy: Math.sin(a) * r - 50, s: 12 + ((i * 5) % 12), light: i % 2 === 0 };
});

export default function IntroPage({ onDone }) {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    try { navigator.vibrate && navigator.vibrate(30); } catch (e) {}
    setTimeout(() => setLeaving(true), 2100); // envelope finished opening
    setTimeout(onDone, 3000);                 // switch to gallery page
  };

  return (
    <div className={`intro${open ? " is-open" : ""}${leaving ? " leaving" : ""}`}>
      <div className="glow" />
      <div className="floaters" aria-hidden="true">
        {FLOATERS.map((f, i) => (
          <span key={i} style={{ "--x": `${f.x}%`, "--s": `${f.size}px`, "--d": `${f.dur}s`, "--delay": `${f.delay}s`, "--sway": `${f.sway}px` }}>
            {f.ch}
          </span>
        ))}
      </div>

      <header className="intro-head">
        <p className="intro-names">{NAMES[0]} <i>&amp;</i> {NAMES[1]}</p>
        <h1 className="intro-title">{COUPLE_NAME}’s Gallery</h1>
      </header>

      <div className="stage">
        <div className={`env${open ? " open" : ""}`} onClick={handleOpen} role="button" aria-label="Open the envelope">
          <div className="back" />
          <div className="letter">
            <div className="letter-photo">
              <img src={LETTER_IMAGE} alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
            </div>
            <div className="letter-txt">
              <b>{NAMES[0]} + {NAMES[1]}</b>
              <small>forever · always</small>
            </div>
          </div>
          <div className="front"><span>{open ? "" : "TAP TO OPEN"}</span></div>
          <div className="flap" />
          <div className="seal">♥</div>
        </div>

        {open && (
          <div className="burst" aria-hidden="true">
            {BURST.map((b, i) => (
              <span key={i} className={b.light ? "lt" : ""} style={{ "--dx": `${b.dx}px`, "--dy": `${b.dy}px`, "--s": `${b.s}px` }}>♥</span>
            ))}
          </div>
        )}
      </div>

      <footer className="intro-foot">
        <p>a little letter, just for you</p>
      </footer>
    </div>
  );
}