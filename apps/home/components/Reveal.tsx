"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  delayMs?: number;
};

export function Reveal({ children, delayMs = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.setProperty("--reveal-delay", `${delayMs}ms`);
          el.classList.add("reveal-in");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}


