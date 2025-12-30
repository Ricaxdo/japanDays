"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ItineraryDay } from "@/data/japan";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  days: ItineraryDay[];
  currentDay: number;
  onChangeDay: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

export function ItinerarySection({
  days,
  currentDay,
  onChangeDay,
  onPrev,
  onNext,
}: Props) {
  const active = days[currentDay];

  return (
    <section id="itinerary" className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold text-balance">Itinerario Día a Día</h2>
          <p className="text-muted-foreground text-lg text-balance">
            Navega para descubrir cada día de tu aventura
          </p>
        </div>

        <div className="relative mb-12">
          <div className="mb-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={onPrev}
              disabled={currentDay === 0}
              className="rounded-full bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-mono text-sm">Día</span>
              <span className="text-4xl font-bold">{currentDay + 1}</span>
              <span className="text-muted-foreground font-mono text-sm">
                / {days.length}
              </span>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={onNext}
              disabled={currentDay === days.length - 1}
              className="rounded-full bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="bg-muted relative mx-auto h-2 max-w-4xl overflow-hidden rounded-full">
            <div
              className="bg-accent absolute top-0 left-0 h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentDay + 1) / days.length) * 100}%` }}
            />
          </div>

          <div className="mx-auto mt-4 flex max-w-4xl justify-between">
            {days.map((d, idx) => (
              <button
                key={d.day}
                onClick={() => onChangeDay(idx)}
                className={`h-3 w-3 rounded-full transition-all ${
                  idx === currentDay
                    ? "bg-accent scale-150"
                    : "bg-muted hover:bg-muted-foreground"
                }`}
                aria-label={`Go to day ${d.day}`}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="bg-card border-border animate-fade-in p-8 transition-all duration-500 md:p-12">
            <div className="flex items-start gap-6">
              <div className="text-6xl">{active.icon}</div>
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-muted-foreground font-mono text-sm">
                    {active.date}
                  </span>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="text-accent font-mono text-sm">Día {active.day}</span>
                </div>
                <h3 className="mb-4 text-3xl font-bold">{active.location}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {active.description}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
