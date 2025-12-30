"use client";

import { Button } from "@/components/ui/button";
import { MotionConfig, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BigDayCard } from "./BigDayCard";
import { SmallDayCard } from "./SmallDayCard";
import { ITINERARY_LAYOUT } from "./itinerary.constants";
import type { ItinerarySectionProps } from "./itinerary.types";
import { useItineraryCarousel } from "./useItineraryCarousel";

export function ItinerarySection({
  days,
  currentDay,
  onChangeDay,
  onPrev,
  onNext,
}: ItinerarySectionProps) {
  const {
    prefersReducedMotion,
    cardRef,
    STEP,
    prevIndex,
    nextIndex,
    prevDay,
    curDay,
    nextDay,
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
    goPrev,
    goNext,
    goTo,
    settleDrag,
  } = useItineraryCarousel({
    days,
    currentDay,
    onChangeDay,
    onPrev,
    onNext,
  });

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
              <div className={`relative ${ITINERARY_LAYOUT.VIEW_H}`}>
                {/* TRACK */}
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
                      className={ITINERARY_LAYOUT.SIDE_W}
                      style={{
                        scale: leftScale,
                        opacity: leftOpacity,
                        filter: leftFilter,
                      }}
                    >
                      {prevDay ? (
                        <SmallDayCard day={prevDay} onClick={() => goTo(prevIndex)} />
                      ) : (
                        <div className={ITINERARY_LAYOUT.SIDE_H_SPACER} />
                      )}
                    </motion.div>

                    <div style={{ width: ITINERARY_LAYOUT.GAP }} />

                    {/* CENTER */}
                    <motion.div
                      ref={cardRef}
                      className={ITINERARY_LAYOUT.CENTER_W}
                      style={{
                        scale: centerScale,
                        opacity: centerOpacity,
                      }}
                    >
                      <BigDayCard day={curDay} blurMv={centerBlur} />
                    </motion.div>

                    <div style={{ width: ITINERARY_LAYOUT.GAP }} />

                    {/* RIGHT */}
                    <motion.div
                      className={ITINERARY_LAYOUT.SIDE_W}
                      style={{
                        scale: rightScale,
                        opacity: rightOpacity,
                        filter: rightFilter,
                      }}
                    >
                      {nextDay ? (
                        <SmallDayCard day={nextDay} onClick={() => goTo(nextIndex)} />
                      ) : (
                        <div className={ITINERARY_LAYOUT.SIDE_H_SPACER} />
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
                {days.map((d, index) => (
                  <button
                    key={d.day}
                    onClick={() => goTo(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      index === currentDay
                        ? "bg-accent scale-125"
                        : "bg-muted hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to day ${d.day}`}
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
