"use client";

import { useEffect, useRef } from "react";

export function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const latestProgress = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const computeProgress = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      latestProgress.current = Math.max(0, Math.min(100, progress));
    };

    const onScroll = () => {
      computeProgress();
      // no setState aquí
    };

    const tick = () => {
      if (barRef.current) {
        barRef.current.style.width = `${latestProgress.current}%`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    // init
    computeProgress();
    rafId.current = requestAnimationFrame(tick);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeProgress);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computeProgress);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="bg-muted fixed top-0 right-0 left-0 z-50 h-1">
      <div ref={barRef} className="bg-accent h-full will-change-[width]" />
    </div>
  );
}
