"use client";

import { animate, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import * as React from "react";
import { ITINERARY_LAYOUT } from "./itinerary.constants";
import type { Day } from "./itinerary.types";
import { clamp, swipePower } from "./itinerary.utils";

type Params = {
  days: Day[];
  currentDay: number;
  onChangeDay: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

export function useItineraryCarousel({
  days,
  currentDay,
  onChangeDay,
  onPrev,
  onNext,
}: Params) {
  const prefersReducedMotion = useReducedMotion();

  // ===== ancho dinámico del card central =====
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const [cardW, setCardW] = React.useState(860);

  React.useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;

    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setCardW(w);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const STEP = cardW + ITINERARY_LAYOUT.GAP;

  // ===== motion values =====
  const x = useMotionValue(0);
  const progress = useTransform(x, [-STEP, 0, STEP], [1, 0, -1]);

  // ===== indices =====
  const prevIndex = currentDay - 1;
  const nextIndex = currentDay + 1;

  const prevDay = prevIndex >= 0 ? days[prevIndex] : null;
  const curDay = days[currentDay];
  const nextDay = nextIndex < days.length ? days[nextIndex] : null;

  // ===== handlers =====
  const animMs = prefersReducedMotion ? 0 : 0.28;

  const goNext = React.useCallback(() => {
    if (currentDay >= days.length - 1) return;

    animate(x, -STEP, {
      duration: animMs,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        x.set(0);
        onNext();
      },
    });
  }, [currentDay, days.length, STEP, animMs, onNext, x]);

  const goPrev = React.useCallback(() => {
    if (currentDay <= 0) return;

    animate(x, STEP, {
      duration: animMs,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        x.set(0);
        onPrev();
      },
    });
  }, [currentDay, STEP, animMs, onPrev, x]);

  const goTo = React.useCallback(
    (index: number) => {
      const target = clamp(index, 0, days.length - 1);
      if (target === currentDay) return;

      const dir = target > currentDay ? -1 : 1;

      animate(x, dir * STEP, {
        duration: animMs,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          x.set(0);
          onChangeDay(target);
        },
      });
    },
    [currentDay, days.length, STEP, animMs, onChangeDay, x],
  );

  // teclado
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  // snap al soltar
  const settleDrag = React.useCallback(
    (offsetX: number, velocityX: number) => {
      const swipe = swipePower(offsetX, velocityX);
      const threshold = STEP * 0.18;

      const shouldGoNext = offsetX < -threshold || swipe > 14000;
      const shouldGoPrev = offsetX > threshold || swipe > 14000;

      if (shouldGoNext && currentDay < days.length - 1) return goNext();
      if (shouldGoPrev && currentDay > 0) return goPrev();

      animate(x, 0, {
        duration: prefersReducedMotion ? 0 : 0.22,
        ease: [0.22, 1, 0.36, 1],
      });
    },
    [STEP, currentDay, days.length, goNext, goPrev, prefersReducedMotion, x],
  );

  // ===== transforms “tiempo real” =====
  const centerScale = useTransform(
    progress,
    [-1, 0, 1],
    [
      ITINERARY_LAYOUT.SIDE_SCALE,
      ITINERARY_LAYOUT.CENTER_SCALE,
      ITINERARY_LAYOUT.SIDE_SCALE,
    ],
  );
  const centerOpacity = useTransform(progress, [-1, 0, 1], [0.9, 1, 0.9]);
  const centerBlur = useTransform(progress, [-1, 0, 1], [3, 0, 3]);

  const leftScale = useTransform(
    progress,
    [-1, 0, 1],
    [0.88, ITINERARY_LAYOUT.SIDE_SCALE, ITINERARY_LAYOUT.CENTER_SCALE],
  );
  const leftOpacity = useTransform(
    progress,
    [-1, 0, 1],
    [0.35, ITINERARY_LAYOUT.SIDE_OPACITY, 1],
  );
  const leftBlur = useTransform(progress, [-1, 0, 1], [6, 4, 0]);

  const rightScale = useTransform(
    progress,
    [-1, 0, 1],
    [ITINERARY_LAYOUT.CENTER_SCALE, ITINERARY_LAYOUT.SIDE_SCALE, 0.88],
  );
  const rightOpacity = useTransform(
    progress,
    [-1, 0, 1],
    [1, ITINERARY_LAYOUT.SIDE_OPACITY, 0.35],
  );
  const rightBlur = useTransform(progress, [-1, 0, 1], [0, 4, 6]);

  // filters para side cards (si quieres blur “preview”)
  const leftFilter = useTransform(leftBlur, (b) => `blur(${b}px)`);
  const rightFilter = useTransform(rightBlur, (b) => `blur(${b}px)`);

  return {
    prefersReducedMotion,

    // refs/layout
    cardRef,
    STEP,

    // data
    prevIndex,
    nextIndex,
    prevDay,
    curDay,
    nextDay,

    // motion
    x,
    motion: {
      centerScale,
      centerOpacity,
      centerBlur,
      leftScale,
      leftOpacity,
      leftFilter,
      rightScale,
      rightOpacity,
      rightFilter,
    },

    // handlers
    goPrev,
    goNext,
    goTo,
    settleDrag,
  };
}
