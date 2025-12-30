"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MotionConfig,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

type Day = {
  day: number;
  date: string;
  location: string;
  description: string;
  icon: string;
};

type Props = {
  days: Day[];
  currentDay: number;
  onChangeDay: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function ItinerarySection({
  days,
  currentDay,
  onChangeDay,
  onPrev,
  onNext,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  // ===== layout tuning =====
  const GAP = 0;

  // Medición del ancho real de una card (para STEP perfecto)
  const [cardW, setCardW] = React.useState(860);
  const [measureEl, setMeasureEl] = React.useState<HTMLDivElement | null>(null);

  // callback-ref (evita problemas de refs/SSR y reattach fácil)
  const cardRef = React.useCallback((node: HTMLDivElement | null) => {
    setMeasureEl(node);
  }, []);

  React.useEffect(() => {
    if (!measureEl) return;

    const ro = new ResizeObserver(() => {
      const w = measureEl.getBoundingClientRect().width;
      if (w > 0) setCardW(w);
    });

    ro.observe(measureEl);

    // set inicial
    const w0 = measureEl.getBoundingClientRect().width;
    if (w0 > 0) setCardW(w0);

    return () => ro.disconnect();
  }, [measureEl]);

  const STEP = cardW + GAP;

  // Motion value ABSOLUTO del track (NO se resetea)
  const trackX = useMotionValue(0);

  // Mantener track alineado cuando cambia el currentDay o el STEP (resize)
  React.useLayoutEffect(() => {
    trackX.set(-currentDay * STEP);
  }, [currentDay, STEP, trackX]);

  // límites reales de arrastre en toda la lista
  const minX = -(days.length - 1) * STEP; // último
  const maxX = 0; // primero

  const animSec = prefersReducedMotion ? 0 : 0.28;

  const animateToIndex = React.useCallback(
    (target: number) => {
      const clamped = clamp(target, 0, days.length - 1);

      animate(trackX, -clamped * STEP, {
        duration: animSec,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          onChangeDay(clamped); // ✅ SOLO esto
        },
      });
    },
    [STEP, animSec, days.length, onChangeDay, trackX],
  );

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

  const goNext = React.useCallback(() => {
    if (currentDay >= days.length - 1) return;
    animateToIndex(currentDay + 1);
  }, [currentDay, days.length, animateToIndex]);

  const goPrev = React.useCallback(() => {
    if (currentDay <= 0) return;
    animateToIndex(currentDay - 1);
  }, [currentDay, animateToIndex]);

  const goTo = React.useCallback(
    (index: number) => {
      const target = clamp(index, 0, days.length - 1);
      if (target === currentDay) return;
      animateToIndex(target);
    },
    [animateToIndex, currentDay, days.length],
  );

  // ⌨️ teclado
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
    const target = clamp(Math.round(rawIndex), 0, days.length - 1);

    animate(trackX, -target * STEP, {
      duration: prefersReducedMotion ? 0 : 0.22,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => onChangeDay(target), // ✅ SOLO esto
    });
  }, [STEP, days.length, onChangeDay, prefersReducedMotion, trackX]);

  return (
    <section id="itinerary" className="min-h-screen px-6 py-5">
      <div className="relative mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-balance md:text-3xl">
            Itinerario Día a Día
          </h2>
        </div>

        <MotionConfig
          transition={{
            duration: prefersReducedMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="relative my-0 overflow-hidden py-0">
            {/* Fade edges */}
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-20 my-0 w-16 bg-gradient-to-r to-transparent py-0" />
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-20 my-0 w-16 bg-gradient-to-l to-transparent py-0" />

            {/* VIEWPORT */}
            <div
              ref={viewportRef}
              className="relative my-0 overflow-hidden rounded-2xl py-0 select-none"
            >
              {" "}
              <div className="relative h-[460px] md:h-[540px]">
                {/* TRACK draggable (ABSOLUTO) */}
                <motion.div
                  className="absolute inset-0 flex cursor-grab items-center active:cursor-grabbing"
                  drag="x"
                  style={{ x: trackX }}
                  dragConstraints={{ left: minX, right: maxX }}
                  dragElastic={0.06}
                  onDragEnd={settleDrag}
                >
                  <div
                    className="flex items-center"
                    style={{
                      gap: GAP,
                      paddingLeft: sidePad,
                      paddingRight: sidePad,
                    }}
                  >
                    {" "}
                    {days.map((d, i) => (
                      <CarouselItem
                        key={d.day}
                        day={d}
                        index={i}
                        trackX={trackX}
                        STEP={STEP}
                        // medimos SIEMPRE la card actual (si cambia, se re-asigna el ref)
                        measureRef={i === currentDay ? cardRef : undefined}
                        onClick={() => goTo(i)}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* subtle background treatment */}
                <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(hsl(var(--foreground))_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.08]" />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={goPrev}
                disabled={currentDay === 0}
                className="h-10 w-10 rounded-full bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-mono text-xs">Día</span>
                <span className="text-2xl font-bold">{currentDay + 1}</span>
                <span className="text-muted-foreground font-mono text-xs">
                  / {days.length}
                </span>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goNext}
                disabled={currentDay === days.length - 1}
                className="h-10 w-10 rounded-full bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress */}
            <div className="mx-auto mt-5 max-w-4xl">
              <div className="bg-muted relative h-1 overflow-hidden rounded-full">
                <motion.div
                  className="bg-accent absolute top-0 left-0 h-full rounded-full"
                  initial={false}
                  animate={{ width: `${((currentDay + 1) / days.length) * 100}%` }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              <div className="flex justify-between">
                {days.map((day, index) => (
                  <button
                    key={day.day}
                    onClick={() => goTo(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      index === currentDay
                        ? "bg-accent scale-125"
                        : "bg-muted hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to day ${day.day}`}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        </MotionConfig>
      </div>
    </section>
  );
}

/* =========================
   Carousel Item (todas montadas)
========================= */

function CarouselItem({
  day,
  index,
  trackX,
  STEP,
  measureRef,
  onClick,
}: {
  day: Day;
  index: number;
  trackX: import("framer-motion").MotionValue<number>;
  STEP: number;
  measureRef?: (node: HTMLDivElement | null) => void;
  onClick: () => void;
}) {
  // pos = 0 cuando esta card está centrada
  const pos = useTransform(trackX, (x) => (index * STEP + x) / STEP);

  // transformaciones suaves por distancia al centro
  const scale = useTransform(pos, [-2, -1, 0, 1, 2], [0.82, 0.92, 1, 0.92, 0.82]);
  const opacity = useTransform(pos, [-2, -1, 0, 1, 2], [0.25, 0.55, 1, 0.55, 0.25]);
  const blur = useTransform(pos, [-2, -1, 0, 1, 2], [10, 5, 0, 5, 10]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  // opcional: reduce clicks “lejanos”
  const pointerEvents = useTransform(pos, (p) => (Math.abs(p) <= 1.6 ? "auto" : "none"));

  return (
    <motion.div
      ref={measureRef}
      className="w-[80vw] max-w-[860px] shrink-0 md:w-[700px]"
      style={{ scale, opacity, filter, pointerEvents }}
    >
      {/* Entra como “Big” cuando está al centro, y se siente “Small” por scale+blur */}
      <button type="button" onClick={onClick} className="w-full text-left">
        <BigDayCard day={day} blurMv={blur} />
      </button>
    </motion.div>
  );
}

/* =========================
   Cards
========================= */

function BigDayCard({
  day,
  blurMv,
}: {
  day: Day;
  blurMv: import("framer-motion").MotionValue<number>;
}) {
  // fondo con blur “separado”, texto crisp
  const bgOpacity = useTransform(blurMv, [0, 10], [1, 0.62]);
  const bgFilter = useTransform(blurMv, (b) => `blur(${b}px)`);

  return (
    <Card className="bg-card border-border/70 relative overflow-hidden rounded-2xl p-0 shadow-sm md:p-14">
      {/* ✅ capa de fondo/blurry, NO afecta al texto */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: bgOpacity, filter: bgFilter }}
      >
        {/* grid + glow */}
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.07]" />
        <div className="bg-accent/20 absolute -top-20 right-10 h-52 w-52 rounded-full blur-3xl" />
      </motion.div>

      {/* ✅ contenido siempre crisp */}
      <div className="relative z-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <div className="text-7xl md:text-8xl">{day.icon}</div>

          <div className="w-full flex-1">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-muted-foreground font-mono text-sm md:text-base">
                {day.date}
              </span>
              <span className="text-muted-foreground text-sm">•</span>
              <span className="text-accent font-mono text-sm md:text-base">
                Día {day.day}
              </span>
            </div>

            <h3 className="mb-5 text-4xl font-bold text-balance md:text-5xl">
              {day.location}
            </h3>

            <p className="text-muted-foreground text-lg leading-relaxed text-pretty md:text-2xl">
              {day.description}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
