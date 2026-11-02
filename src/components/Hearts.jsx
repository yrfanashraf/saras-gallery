// Slowly floating hearts + sparkles that drift up the whole screen (fixed layer)
const make = (n) =>
  Array.from({ length: n }, (_, i) => ({
    x: (i * 37 + 8) % 100,
    size: 10 + ((i * 7) % 16),
    dur: 14 + ((i * 5) % 10),
    delay: -((i * 23) % 20),
    sway: (i % 2 ? 1 : -1) * (20 + ((i * 11) % 40)),
    ch: i % 4 === 0 ? "✦" : "♥",
    tone: i % 2 ? "a" : "b",
  }));

export default function Hearts({ count = 14 }) {
  return (
    <div className="ambient" aria-hidden="true">
      {make(count).map((f, i) => (
        <span
          key={i}
          className={f.tone}
          style={{ "--x": `${f.x}%`, "--s": `${f.size}px`, "--d": `${f.dur}s`, "--delay": `${f.delay}s`, "--sway": `${f.sway}px` }}
        >
          {f.ch}
        </span>
      ))}
    </div>
  );
}