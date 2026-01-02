"use client";

import { Button } from "@/components/ui/button";
import { MotionConfig, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

import { useMediaQuery } from "@/lib/useMediaQuery";
import { CarouselItem } from "./CarouselItem";
import { DayDetailsDialog } from "./DayDetailsDialog";
import { ITINERARY } from "./itinerary.constants";
import type { Day, ItinerarySectionProps, ItineraryView } from "./itinerary.types";
import { ItineraryMobileSimple } from "./ItineraryMobileSimple";
import { ItinerarySimpleList } from "./ItinerarySimpleList";
import { useItineraryCarousel } from "./useItineraryCarousel";

/* =========================
   VIEW TOGGLE (inline)
========================= */
function ItineraryViewToggle({
  view,
  onChange,
}: {
  view: ItineraryView;
  onChange: (v: ItineraryView) => void;
}) {
  return (
    <div className="bg-muted flex rounded-full p-1">
      <button
        onClick={() => onChange("carousel")}
        className={[
          "rounded-full px-3 py-1 text-xs font-medium transition",
          view === "carousel"
            ? "bg-background text-foreground shadow"
            : "text-muted-foreground hover:text-foreground",
        ].join(" ")}
      >
        Interactivo
      </button>

      <button
        onClick={() => onChange("list")}
        className={[
          "rounded-full px-3 py-1 text-xs font-medium transition",
          view === "list"
            ? "bg-background text-foreground shadow"
            : "text-muted-foreground hover:text-foreground",
        ].join(" ")}
      >
        Simple
      </button>
    </div>
  );
}

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
    <section
      id="itinerary"
      className="mb-[-80px] px-6 pt-5"
      style={{ minHeight: "calc((var(--vh-fixed) * 100) - var(--nav-offset))" }}
    >
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
   Desktop / Tablet
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

  const [view, setView] = React.useState<ItineraryView>("carousel");

  const [selectedDay, setSelectedDay] = React.useState<Day | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  function openDay(day: Day) {
    setSelectedDay(day);
    setIsDialogOpen(true);
  }

  return (
    <section id="itinerary" className="min-h-screen px-6 py-5">
      <div className="relative mx-auto">
        {/* Header: título + toggle */}
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <h2 className="mt-5 text-5xl font-bold text-balance md:text-3xl">
            Itinerario Día a Día
          </h2>

          <ItineraryViewToggle view={view} onChange={setView} />
        </div>

        {/* ================= VIEW SWITCH ================= */}
        {view === "carousel" ? (
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
                            onClick={() => {
                              goTo(i);
                              openDay(d);
                            }}
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
            </div>
          </MotionConfig>
        ) : (
          <ItinerarySimpleList
            days={days}
            currentDay={currentDay}
            onChangeDay={onChangeDay}
            onOpenDay={openDay}
          />
        )}
      </div>
      {selectedDay && (
        <DayDetailsDialog
          day={selectedDay}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </section>
  );
}
