"use client";

import { Button } from "@/components/ui/button";
import { MotionConfig, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";

import { useMediaQuery } from "@/lib/useMediaQuery";
import { CarouselItem } from "./CarouselItem";
import { ITINERARY } from "./itinerary.constants";
import type { ItinerarySectionProps } from "./itinerary.types";
import { ItineraryMobileSimple } from "./ItineraryMobileSimple";
import { useItineraryCarousel } from "./useItineraryCarousel";

export function ItinerarySection(props: ItinerarySectionProps) {
  const isSmall = useMediaQuery("(max-width: 499px)");

  return isSmall ? (
    <ItinerarySectionMobile {...props} />
  ) : (
    <ItinerarySectionDesktop {...props} />
  );
}

/* =========================
   Mobile: simple (no framer)
========================= */
function ItinerarySectionMobile({
  days,
  currentDay,
  onChangeDay,
}: ItinerarySectionProps) {
  return (
    <section id="itinerary" className="mb-[-100px] min-h-screen px-6 pt-5">
      <div className="relative mx-auto">
        <div className="text-center">
          <h2 className="mt-5 text-5xl font-bold text-balance md:text-3xl">
            Itinerario Día a Día
          </h2>
        </div>

        <ItineraryMobileSimple
          days={days}
          currentDay={currentDay}
          onChangeDay={onChangeDay}
        />
      </div>
    </section>
  );
}

/* =========================
   Desktop/Tablet: pro
========================= */
function ItinerarySectionDesktop({
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

  const isSmall = false; // en desktop component siempre false

  return (
    <section id="itinerary" className="min-h-screen px-6 py-5">
      <div className="relative mx-auto">
        <div className="text-center">
          <h2 className="mt-5 text-5xl font-bold text-balance md:text-3xl">
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
              {/* ✅ altura con CSS vars (Tailwind-safe) */}
              <div
                className="relative [--itinerary-h:0px] md:[--itinerary-h:var(--itinerary-h-md)]"
                style={
                  {
                    "--itinerary-h": `${ITINERARY.HEIGHT_MOBILE}px`,
                    "--itinerary-h-md": `${ITINERARY.HEIGHT_DESKTOP}px`,
                  } as React.CSSProperties
                }
              >
                <div className="relative" style={{ height: "var(--itinerary-h)" }}>
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

            <div className="mx-auto mt-8 w-full max-w-4xl px-4">
              <div className="relative h-12">
                <div className="bg-secondary/40 absolute top-1/2 right-0 left-0 h-2 -translate-y-1/2 overflow-hidden rounded-full shadow-inner">
                  {/* Fill */}
                  <motion.div
                    className="from-primary via-accent to-primary shadow-primary/20 absolute top-0 left-0 h-full rounded-full bg-gradient-to-r bg-[length:200%_100%] shadow-lg"
                    initial={false}
                    animate={{
                      width: `${days.length <= 1 ? 100 : (currentDay / (days.length - 1)) * 100}%`,
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      width: {
                        duration: prefersReducedMotion ? 0 : 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      backgroundPosition: {
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      },
                    }}
                  />

                  {/* ✅ Shimmer FIX: usar left % real */}
                  <motion.div
                    className="absolute top-0 h-full w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={false}
                    animate={{
                      left: `${days.length <= 1 ? 0 : (currentDay / (days.length - 1)) * 100}%`,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      left: {
                        duration: prefersReducedMotion ? 0 : 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: {
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      },
                    }}
                  />
                </div>

                {/* Dots */}
                <div className="absolute inset-0">
                  {!isSmall &&
                    days.map((day, index) => {
                      const denom = Math.max(1, days.length - 1);
                      const leftPct = (index / denom) * 100;
                      const isActive = index === currentDay;
                      const isPassed = index < currentDay;

                      return (
                        <motion.button
                          key={day.day}
                          type="button"
                          onClick={() => goTo(index)}
                          aria-label={`Go to day ${day.day}`}
                          className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${leftPct}%` }}
                          initial={false}
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            className="absolute inset-0 -m-2 rounded-full border-2"
                            initial={false}
                            animate={{
                              borderColor: isActive
                                ? "hsl(var(--primary))"
                                : "transparent",
                              scale: isActive ? 1.4 : 1,
                            }}
                            transition={{
                              duration: prefersReducedMotion ? 0 : 0.3,
                              ease: "easeOut",
                            }}
                          />

                          <motion.div
                            className={[
                              "relative h-4 w-4 rounded-full transition-colors",
                              isActive
                                ? "bg-primary shadow-primary/50 shadow-lg"
                                : isPassed
                                  ? "bg-primary/70"
                                  : "bg-muted-foreground/30 group-hover:bg-muted-foreground/50",
                            ].join(" ")}
                            initial={false}
                            animate={{ scale: isActive ? 1.3 : 1 }}
                            transition={{
                              duration: prefersReducedMotion ? 0 : 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            {isActive && (
                              <motion.div
                                className="bg-primary absolute inset-0 rounded-full"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                }}
                              />
                            )}
                          </motion.div>

                          <motion.div
                            className="bg-popover text-popover-foreground pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap opacity-0 shadow-lg group-hover:opacity-100"
                            initial={false}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                          >
                            Día {day.day}
                            <div className="bg-popover absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" />
                          </motion.div>
                        </motion.button>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </MotionConfig>
      </div>
    </section>
  );
}
