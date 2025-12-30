"use client";

import { useEffect, useRef } from "react";

export function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const paint = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      if (barRef.current) {
        barRef.current.style.width = `${Math.max(0, Math.min(100, progress))}%`;
      }
      rafId.current = null;
    };

    const requestPaint = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(paint);
    };

    requestPaint();
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", requestPaint);

    return () => {
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", requestPaint);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="bg-muted fixed top-0 right-0 left-0 z-50 h-1">
      <div ref={barRef} className="bg-accent h-full will-change-[width]" />
    </div>
  );
}
