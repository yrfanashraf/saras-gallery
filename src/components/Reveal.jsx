import { useEffect, useRef } from "react";

// Fades / slides children in the first time they scroll into view.
export default function Reveal({ children, className = "", delay = 0, onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} onClick={onClick}>
      {children}
    </div>
  );
}
