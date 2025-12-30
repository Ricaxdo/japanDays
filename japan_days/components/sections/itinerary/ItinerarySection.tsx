"use client";

import { Button } from "@/components/ui/button";
import { MotionConfig, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { CarouselItem } from "./CarouselItem";
import { ITINERARY } from "./itinerary.constants";
import type { ItinerarySectionProps } from "./itinerary.types";
import { useItineraryCarousel } from "./useItineraryCarousel";

export function ItinerarySection({
  days,
  currentDay,
  onChangeDay,
}: ItinerarySectionProps) {
  const {
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
  } = useItineraryCarousel({
    daysLength: days.length,
    currentDay,
    onChangeDay,
    gap: ITINERARY.GAP,
  });

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
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r to-transparent" />
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l to-transparent" />

            {/* VIEWPORT */}
            <div
              ref={viewportRef}
              className="relative overflow-hidden rounded-2xl select-none"
            >
              <div
                className={`relative h-[${ITINERARY.HEIGHT_MOBILE}px] md:h-[${ITINERARY.HEIGHT_DESKTOP}px]`}
              >
                <motion.div
                  className="absolute inset-0 flex cursor-grab items-center active:cursor-grabbing"
                  drag="x"
                  style={{ x: trackX }}
                  dragConstraints={{ left: minX, right: maxX }}
                  dragElastic={ITINERARY.DRAG_ELASTIC}
                  onDragEnd={settleDrag}
                >
                  <div
                    className="flex items-center"
                    style={{
                      gap: ITINERARY.GAP,
                      paddingLeft: sidePad,
                      paddingRight: sidePad,
                    }}
                  >
                    {days.map((d, i) => (
                      <CarouselItem
                        key={d.day}
                        day={d}
                        index={i}
                        trackX={trackX}
                        STEP={STEP}
                        measureRef={i === currentDay ? measureRef : undefined}
                        onClick={() => goTo(i)}
                      />
                    ))}
                  </div>
                </motion.div>

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
