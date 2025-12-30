"use client";

import { animate, useMotionValue, useReducedMotion } from "framer-motion";
import * as React from "react";
import { ITINERARY } from "./itinerary.constants";
import { clamp } from "./itinerary.utils";

export function useItineraryCarousel({
  daysLength,
  currentDay,
  onChangeDay,
  gap = ITINERARY.GAP,
}: {
  daysLength: number;
  currentDay: number;
  onChangeDay: (index: number) => void;
  gap?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  // --- measure card width (STEP)
  const [cardW, setCardW] = React.useState(860);
  const [measureEl, setMeasureEl] = React.useState<HTMLDivElement | null>(null);

  const measureRef = React.useCallback((node: HTMLDivElement | null) => {
    setMeasureEl(node);
  }, []);

  React.useEffect(() => {
    if (!measureEl) return;

    const ro = new ResizeObserver(() => {
      const w = measureEl.getBoundingClientRect().width;
      if (w > 0) setCardW(w);
    });

    ro.observe(measureEl);

    const w0 = measureEl.getBoundingClientRect().width;
    if (w0 > 0) setCardW(w0);

    return () => ro.disconnect();
  }, [measureEl]);

  const STEP = cardW + gap;

  // --- measure viewport width (sidePad)
  const [viewportW, setViewportW] = React.useState(1200);
  const [viewportEl, setViewportEl] = React.useState<HTMLDivElement | null>(null);

  const viewportRef = React.useCallback((node: HTMLDivElement | null) => {
    setViewportEl(node);
  }, []);

  React.useEffect(() => {
    if (!viewportEl) return;

    const ro = new ResizeObserver(() => {
      const w = viewportEl.getBoundingClientRect().width;
      if (w > 0) setViewportW(w);
    });

    ro.observe(viewportEl);

    const w0 = viewportEl.getBoundingClientRect().width;
    if (w0 > 0) setViewportW(w0);

    return () => ro.disconnect();
  }, [viewportEl]);

  const sidePad = Math.max(0, (viewportW - cardW) / 2);

  // --- track motion value (absolute)
  const trackX = useMotionValue(0);

  React.useLayoutEffect(() => {
    trackX.set(-currentDay * STEP);
  }, [currentDay, STEP, trackX]);

  const minX = -(daysLength - 1) * STEP;
  const maxX = 0;

  const animSec = prefersReducedMotion ? 0 : 0.28;

  const animateToIndex = React.useCallback(
    (target: number) => {
      const clampedIndex = clamp(target, 0, daysLength - 1);

      animate(trackX, -clampedIndex * STEP, {
        duration: animSec,
        ease: ITINERARY.BTN_EASE,
        onComplete: () => onChangeDay(clampedIndex),
      });
    },
    [STEP, animSec, daysLength, onChangeDay, trackX],
  );

  const goNext = React.useCallback(() => {
    if (currentDay >= daysLength - 1) return;
    animateToIndex(currentDay + 1);
  }, [currentDay, daysLength, animateToIndex]);

  const goPrev = React.useCallback(() => {
    if (currentDay <= 0) return;
    animateToIndex(currentDay - 1);
  }, [currentDay, animateToIndex]);

  const goTo = React.useCallback(
    (index: number) => {
      const target = clamp(index, 0, daysLength - 1);
      if (target === currentDay) return;
      animateToIndex(target);
    },
    [animateToIndex, currentDay, daysLength],
  );

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  const settleDrag = React.useCallback(() => {
    const rawIndex = -trackX.get() / STEP;
    const target = clamp(Math.round(rawIndex), 0, daysLength - 1);

    animate(trackX, -target * STEP, {
      duration: prefersReducedMotion ? 0 : 0.22,
      ease: ITINERARY.BTN_EASE,
      onComplete: () => onChangeDay(target),
    });
  }, [STEP, daysLength, onChangeDay, prefersReducedMotion, trackX]);

  return {
    prefersReducedMotion,
    trackX,
    STEP,
    minX,
    maxX,
    sidePad,
    viewportRef,
    measureRef,
    goPrev,
    goNext,
    goTo,
    settleDrag,
  };
}
