"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export function ItinerarySection({
  days,
  currentDay,
  onChangeDay,
  onPrev,
  onNext,
}: Props) {
  const d = days[currentDay];

  return (
    <section id="itinerary" className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 text-center">
          <h2 className="mb-4 text-5xl font-bold text-balance">Itinerario Día a Día</h2>
        </div>

        {/* Current Day Card - más grande */}
        <div className="mx-auto mb-5 max-w-5xl">
          <Card className="bg-card border-border animate-fade-in p-10 transition-all duration-500 md:p-16">
            <div className="flex flex-col items-start gap-8 md:flex-row">
              <div className="text-7xl md:text-8xl">{d.icon}</div>

              <div className="w-full flex-1">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="text-muted-foreground font-mono text-base">
                    {d.date}
                  </span>
                  <span className="text-muted-foreground text-sm">•</span>
                  <span className="text-accent font-mono text-base">Día {d.day}</span>
                </div>

                <h3 className="mb-6 text-4xl font-bold text-balance md:text-5xl">
                  {d.location}
                </h3>

                <p className="text-muted-foreground text-xl leading-relaxed text-pretty md:text-2xl">
                  {d.description}
                </p>

                {/* Placeholder para futuras cosas */}
                <div className="border-border/50 mt-8 border-t pt-8">
                  <p className="text-muted-foreground text-sm italic">
                    Detalles adicionales: horarios, atracciones específicas y rutas
                    próximamente...
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Controls + Progress */}
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-center gap-6">
            <Button
              variant="outline"
              size="icon"
              onClick={onPrev}
              disabled={currentDay === 0}
              className="h-9 w-9 rounded-full bg-transparent"
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
              onClick={onNext}
              disabled={currentDay === days.length - 1}
              className="h-9 w-9 rounded-full bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Thin progress bar */}
          <div className="bg-muted relative h-1 overflow-hidden rounded-full">
            <div
              className="bg-accent absolute top-0 left-0 h-full rounded-full transition-all duration-500"
              style={{
                width: `${((currentDay + 1) / days.length) * 100}%`,
              }}
            />
          </div>

          {/* Dots */}
          <div className="mt-3 flex justify-between">
            {days.map((day, index) => (
              <button
                key={day.day}
                onClick={() => onChangeDay(index)}
                className={`h-2 w-2 rounded-full transition-all ${
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
    </section>
  );
}
