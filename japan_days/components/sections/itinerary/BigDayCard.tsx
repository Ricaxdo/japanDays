"use client";

import { Card } from "@/components/ui/card";
import { motion, useTransform } from "framer-motion";
import { Info } from "lucide-react";
import type { Day } from "./itinerary.types";

export function BigDayCard({
  day,
  blurMv,
  className = "",
}: {
  day: Day;
  blurMv: import("framer-motion").MotionValue<number>;
  className?: string;
}) {
  const bgOpacity = useTransform(blurMv, [0, 10], [1, 0.62]);
  const bgFilter = useTransform(blurMv, (b) => `blur(${b}px)`);

  return (
    <Card
      className={[
        "group bg-card border-border/70 relative overflow-hidden rounded-2xl shadow-sm",
        "p-6 md:p-14",
        className,
      ].join(" ")}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: bgOpacity, filter: bgFilter }}
      >
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.07]" />
        <div className="bg-accent/20 absolute -top-20 right-10 h-52 w-52 rounded-full blur-3xl" />
      </motion.div>

      <div className="allign-center relative z-10 flex h-full w-full flex-col justify-center">
        <div className="align-center flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <div className="ml-[-15px] text-6xl md:text-8xl">{day.icon}</div>

          <div className="w-full flex-1">
            <div className="mb-4 flex flex-wrap items-center gap-3 md:mb-6">
              <span className="text-muted-foreground font-mono text-sm md:text-base">
                {day.date}
              </span>
              <span className="text-muted-foreground text-sm">•</span>
              <span className="text-accent font-mono text-sm md:text-base">
                Día {day.day}
              </span>
            </div>

            <h3 className="mb-4 text-3xl font-bold text-balance md:mb-5 md:text-5xl">
              {day.location}
            </h3>

            {/* ✅ clamp para que no rompa la altura */}
            <p className="text-muted-foreground line-clamp-4 text-base leading-relaxed md:line-clamp-3 md:text-2xl">
              {day.description}
            </p>
          </div>
        </div>
      </div>
      {/* Micro-hint: ver detalles */}
      <div className="text-muted-foreground pointer-events-none absolute right-4 bottom-4 flex items-center gap-1.5 text-xs opacity-70 transition-opacity md:opacity-0 md:group-hover:opacity-80">
        <Info className="h-3.5 w-3.5" />
        <span>Ver detalles</span>
      </div>
    </Card>
  );
}
