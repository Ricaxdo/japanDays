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

const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export function ItinerarySection({
  days,
  currentDay,
  onChangeDay,
  onPrev,
  onNext,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  // ===== layout tuning =====
  const GAP = 18;
  const SIDE_SCALE = 0.92;
  const CENTER_SCALE = 1;
  const SIDE_OPACITY = 0.55;

  // ancho dinámico del card central (para snap perfecto)
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

  const STEP = cardW + GAP;

  // Motion value del track
  const x = useMotionValue(0);

  // 0 centered; -STEP => next; +STEP => prev
  const progress = useTransform(x, [-STEP, 0, STEP], [1, 0, -1]);

  // indices visibles
  const prevIndex = currentDay - 1;
  const nextIndex = currentDay + 1;

  const prevDay = prevIndex >= 0 ? days[prevIndex] : null;
  const curDay = days[currentDay];
  const nextDay = nextIndex < days.length ? days[nextIndex] : null;

  // ===== handlers PRO (memo) =====
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

  // ⌨️ teclado (solo una suscripción estable)
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
    [SIDE_SCALE, CENTER_SCALE, SIDE_SCALE],
  );
  const centerOpacity = useTransform(progress, [-1, 0, 1], [0.9, 1, 0.9]);
  const centerBlur = useTransform(progress, [-1, 0, 1], [3, 0, 3]);

  const leftScale = useTransform(progress, [-1, 0, 1], [0.88, SIDE_SCALE, CENTER_SCALE]);
  const leftOpacity = useTransform(progress, [-1, 0, 1], [0.35, SIDE_OPACITY, 1]);
  const leftBlur = useTransform(progress, [-1, 0, 1], [6, 4, 0]);

  const rightScale = useTransform(progress, [-1, 0, 1], [CENTER_SCALE, SIDE_SCALE, 0.88]);
  const rightOpacity = useTransform(progress, [-1, 0, 1], [1, SIDE_OPACITY, 0.35]);
  const rightBlur = useTransform(progress, [-1, 0, 1], [0, 4, 6]);

  // NOTE: filter necesita string
  const centerFilter = useTransform(centerBlur, (b) => `blur(${b}px)`);
  const leftFilter = useTransform(leftBlur, (b) => `blur(${b}px)`);
  const rightFilter = useTransform(rightBlur, (b) => `blur(${b}px)`);

  return (
    <section id="itinerary" className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-5xl font-bold text-balance md:text-6xl">
            Itinerario Día a Día
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base md:text-lg">
            Arrastra el carrusel. Verás cómo las cards se transforman en tiempo real.
          </p>
        </div>

        <MotionConfig
          transition={{
            duration: prefersReducedMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="relative mx-auto max-w-6xl">
            {/* Fade edges */}
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r to-transparent" />
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l to-transparent" />

            {/* VIEWPORT */}
            <div className="relative overflow-hidden rounded-2xl select-none">
              <div className="relative h-[460px] md:h-[540px]">
                {/* TRACK draggable */}
                <motion.div
                  className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing"
                  drag="x"
                  style={{ x }}
                  dragConstraints={{ left: -STEP, right: STEP }}
                  dragElastic={0.08}
                  onDragEnd={(_, info) => settleDrag(info.offset.x, info.velocity.x)}
                >
                  <div className="relative flex items-center justify-center">
                    {/* LEFT */}
                    <motion.div
                      className="w-[260px] md:w-[320px]"
                      style={{
                        scale: leftScale,
                        opacity: leftOpacity,
                        filter: leftFilter,
                      }}
                    >
                      {prevDay ? (
                        <SmallDayCard day={prevDay} onClick={() => goTo(prevIndex)} />
                      ) : (
                        <div className="h-[360px] md:h-[410px]" />
                      )}
                    </motion.div>

                    <div style={{ width: GAP }} />

                    {/* CENTER */}
                    <motion.div
                      ref={cardRef}
                      className="w-[92vw] max-w-[920px] md:w-[860px]"
                      style={{
                        scale: centerScale,
                        opacity: centerOpacity,
                      }}
                    >
                      <BigDayCard day={curDay} blurMv={centerBlur} />
                    </motion.div>

                    <div style={{ width: GAP }} />

                    {/* RIGHT */}
                    <motion.div
                      className="w-[260px] md:w-[320px]"
                      style={{
                        scale: rightScale,
                        opacity: rightOpacity,
                        filter: rightFilter,
                      }}
                    >
                      {nextDay ? (
                        <SmallDayCard day={nextDay} onClick={() => goTo(nextIndex)} />
                      ) : (
                        <div className="h-[360px] md:h-[410px]" />
                      )}
                    </motion.div>
                  </div>
                </motion.div>

                {/* subtle background treatment */}
                <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(hsl(var(--foreground))_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.08]" />
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-6">
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

              <div className="mt-3 flex justify-between">
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
   Cards
========================= */

function BigDayCard({
  day,
  blurMv,
}: {
  day: Day;
  blurMv: import("framer-motion").MotionValue<number>;
}) {
  const bgOpacity = useTransform(blurMv, [0, 6], [1, 0.65]);
  const bgFilter = useTransform(blurMv, (b) => `blur(${b}px)`);

  return (
    <Card className="bg-card border-border/70 relative overflow-hidden rounded-2xl p-10 shadow-sm md:p-14">
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

            <div className="border-border/50 mt-8 border-t pt-6">
              <p className="text-muted-foreground text-sm italic">
                Detalles adicionales: horarios, atracciones específicas y rutas
                próximamente...
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SmallDayCard({ day, onClick }: { day: Day; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <Card className="bg-card border-border/50 relative overflow-hidden rounded-2xl p-6 shadow-sm">
        <div className="bg-background/35 pointer-events-none absolute inset-0 backdrop-blur-[3px]" />
        <div className="relative flex items-start gap-4">
          <div className="text-4xl">{day.icon}</div>
          <div className="min-w-0">
            <div className="text-muted-foreground font-mono text-xs">{day.date}</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-muted-foreground text-xs">Día</span>
              <span className="text-sm font-semibold">{day.day}</span>
            </div>
            <div className="mt-2 line-clamp-2 text-base font-semibold">
              {day.location}
            </div>
            <div className="text-muted-foreground mt-1 line-clamp-2 text-sm">
              {day.description}
            </div>
          </div>
        </div>
      </Card>
    </button>
  );
}
