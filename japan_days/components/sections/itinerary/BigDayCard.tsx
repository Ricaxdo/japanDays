"use client";

import { Card } from "@/components/ui/card";
import { motion, useTransform } from "framer-motion";
import type { Day } from "./itinerary.types";

export function BigDayCard({
  day,
  blurMv,
}: {
  day: Day;
  blurMv: import("framer-motion").MotionValue<number>;
}) {
  const bgOpacity = useTransform(blurMv, [0, 10], [1, 0.62]);
  const bgFilter = useTransform(blurMv, (b) => `blur(${b}px)`);

  return (
    <Card className="bg-card border-border/70 relative overflow-hidden rounded-2xl p-0 shadow-sm md:p-14">
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: bgOpacity, filter: bgFilter }}
      >
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.07]" />
        <div className="bg-accent/20 absolute -top-20 right-10 h-52 w-52 rounded-full blur-3xl" />
      </motion.div>

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
          </div>
        </div>
      </div>
    </Card>
  );
}
