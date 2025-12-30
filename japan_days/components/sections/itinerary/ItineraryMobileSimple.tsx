"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { BigDayCard } from "./BigDayCard";
import { DayDetailsDialog } from "./DayDetailsDialog";
import type { Day } from "./itinerary.types";

const zeroMv = {
  get: () => 0,
  set: () => {},
  on: () => () => {},
  destroy: () => {},
} as never;

export function ItineraryMobileSimple({
  days,
  currentDay,
  onChangeDay,
}: {
  days: Day[];
  currentDay: number;
  onChangeDay: (i: number) => void;
}) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = React.useState(false);
  const activeDay = days[currentDay];

  const scrollToIndex = React.useCallback((i: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const item = scroller.querySelector<HTMLElement>(`[data-idx="${i}"]`);
    if (!item) return;

    item.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  const goPrev = () => {
    const next = Math.max(0, currentDay - 1);
    onChangeDay(next);
    scrollToIndex(next);
  };

  const goNext = () => {
    const next = Math.min(days.length - 1, currentDay + 1);
    onChangeDay(next);
    scrollToIndex(next);
  };

  const onScroll = React.useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const rect = scroller.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    let bestIdx = currentDay;
    let bestDist = Number.POSITIVE_INFINITY;

    scroller.querySelectorAll<HTMLElement>("[data-idx]").forEach((el) => {
      const r = el.getBoundingClientRect();
      const elCenter = r.left + r.width / 2;
      const dist = Math.abs(centerX - elCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = Number(el.dataset.idx);
      }
    });

    if (bestIdx !== currentDay) onChangeDay(bestIdx);
  }, [currentDay, onChangeDay]);

  React.useEffect(() => {
    scrollToIndex(currentDay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {days.map((d, i) => (
          <div
            key={d.day}
            data-idx={i}
            className="w-[88%] max-w-[420px] shrink-0 snap-center"
          >
            <button
              type="button"
              onClick={() => {
                onChangeDay(i);
                scrollToIndex(i);
                setOpen(true);
              }}
              className="w-full text-left"
            >
              <BigDayCard day={d} blurMv={zeroMv} />
            </button>
          </div>
        ))}
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
          <span className="text-muted-foreground font-mono text-xs">/ {days.length}</span>
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
      <div className="mx-auto mt-5 max-w-4xl px-4">
        <div className="bg-muted relative h-1 overflow-hidden rounded-full">
          <div
            className="bg-accent absolute top-0 left-0 h-full rounded-full transition-[width] duration-300"
            style={{ width: `${((currentDay + 1) / days.length) * 100}%` }}
          />
        </div>

        <div className="mt-3 flex justify-between">
          {days.map((day, index) => (
            <button
              key={day.day}
              onClick={() => {
                onChangeDay(index);
                scrollToIndex(index);
                setOpen(true);
              }}
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

      {/* Modal (usa el día actual) */}
      {activeDay && (
        <DayDetailsDialog day={activeDay} open={open} onOpenChange={setOpen} />
      )}
    </div>
  );
}
