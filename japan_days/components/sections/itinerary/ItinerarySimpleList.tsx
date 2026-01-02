"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Building2,
  Church,
  Gamepad2,
  Mouse as House,
  Antenna as Lantern,
  Mountain,
  PartyPopper,
  Plane,
  PlaneTakeoff,
  ShoppingBag,
  TramFront,
  Trees,
} from "lucide-react";
import type { Day, ItineraryDay } from "./itinerary.types";

// Map each day to a specific icon
const dayIcons: Record<number, React.ComponentType<{ className?: string }>> = {
  1: Plane,
  2: TramFront,
  3: Gamepad2,
  4: Church,
  5: Lantern,
  6: Trees,
  7: Mountain,
  8: House,
  9: ShoppingBag,
  10: Mountain,
  11: Mountain,
  12: Gamepad2,
  13: PartyPopper,
  14: PlaneTakeoff,
};

export function ItinerarySimpleList({
  days,
  currentDay,
  onChangeDay,
  onOpenDay,
}: {
  days: ItineraryDay[];
  currentDay: number;
  onChangeDay: (i: number) => void;
  onOpenDay: (day: Day) => void;
}) {
  return (
    <div className="mx-auto mt-8 max-w-4xl space-y-2">
      {days.map((day, index) => {
        const isActive = index === currentDay;
        const IconComponent = dayIcons[day.day] || Building2;

        return (
          <button
            key={day.day}
            onClick={() => {
              onChangeDay(index);
              onOpenDay(day);
            }}
            className="group w-full text-left"
          >
            <Card
              className={[
                "relative my-0 overflow-hidden border py-0 transition-all duration-300",
                isActive
                  ? "border-primary shadow-primary/20 scale-[1.02] shadow-lg"
                  : "hover:border-muted-foreground/30 hover:shadow-md",
              ].join(" ")}
            >
              {/* Gradient accent line on left side for active state */}
              {isActive && (
                <div className="from-primary via-primary/70 to-primary/40 absolute inset-y-0 left-0 w-1 bg-gradient-to-b" />
              )}

              <div className="flex items-center gap-4 p-5 pl-6">
                {/* Icon container */}
                <div
                  className={[
                    "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-primary/30 shadow-lg"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                  ].join(" ")}
                >
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge
                      variant={isActive ? "default" : "outline"}
                      className="px-2 py-0.5 font-mono text-[10px]"
                    >
                      DÍA {day.day}
                    </Badge>
                    <span
                      className={[
                        "text-xs font-medium transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {day.date}
                    </span>
                  </div>

                  <h3
                    className={[
                      "mb-1 text-lg font-semibold text-balance transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-foreground/90 group-hover:text-foreground",
                    ].join(" ")}
                  >
                    {day.location}
                  </h3>

                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed text-pretty">
                    {day.description}
                  </p>
                </div>

                {/* Indicator circle on right */}
                <div className="flex shrink-0 items-center">
                  <div
                    className={[
                      "h-3 w-3 rounded-full border-2 transition-all duration-300",
                      isActive
                        ? "border-primary bg-primary scale-125"
                        : "border-border group-hover:border-primary/50",
                    ].join(" ")}
                  />
                </div>
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
