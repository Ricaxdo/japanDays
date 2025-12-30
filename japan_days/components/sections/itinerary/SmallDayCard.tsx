"use client";

import { Card } from "@/components/ui/card";
import type { Day } from "./itinerary.types";

export function SmallDayCard({ day, onClick }: { day: Day; onClick: () => void }) {
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
