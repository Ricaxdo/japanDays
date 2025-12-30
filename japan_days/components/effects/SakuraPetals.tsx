"use client";

import * as React from "react";

type Petal = {
  id: string;
  left: number; // %
  size: number; // px
  delay: number; // s
  duration: number; // s
  drift: number; // px
  rotate: number; // deg
  opacity: number; // 0..1
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function makePetals(count: number): Petal[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `petal-${i}-${Math.random().toString(16).slice(2)}`,
    left: rand(0, 100),
    size: rand(10, 18),
    delay: rand(0, 8),
    duration: rand(10, 18),
    drift: rand(-60, 60),
    rotate: rand(-180, 180),
    opacity: rand(0.18, 0.45),
  }));
}

export function SakuraPetals({
  count = 14,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const [enabled, setEnabled] = React.useState(false); // ✅ empieza false para SSR
  const [petals, setPetals] = React.useState<Petal[]>([]);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener?.("change", update);

    // ✅ genera petals solo en client (1 vez)
    setPetals(makePetals(count));

    return () => mq.removeEventListener?.("change", update);
  }, [count]);

  if (!enabled || petals.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="sakura-petal"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 0.72}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
              ["--drift" as never]: `${p.drift}px`,
              ["--rot" as never]: `${p.rotate}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
