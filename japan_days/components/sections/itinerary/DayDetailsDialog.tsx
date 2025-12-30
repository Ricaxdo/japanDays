"use client";

import type { Day, DayActivity } from "@/components/sections/itinerary/itinerary.types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Info, MapPin, Sparkles } from "lucide-react";

function tagLabel(tag?: DayActivity["tag"]) {
  switch (tag) {
    case "must":
      return "Must";
    case "food":
      return "Food";
    case "move":
      return "Move";
    case "chill":
      return "Chill";
    default:
      return null;
  }
}

function tagColor(tag?: DayActivity["tag"]) {
  switch (tag) {
    case "must":
      return "bg-accent/20 text-accent border-accent/30";
    case "food":
      return "bg-destructive/20 text-destructive border-destructive/30";
    case "move":
      return "bg-primary/20 text-primary border-primary/30";
    case "chill":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export function DayDetailsDialog({
  day,
  open,
  onOpenChange,
}: {
  day: Day;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const details = day.details;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="no-scrollbar max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <div className="from-accent/10 via-accent/5 pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent" />

        <DialogHeader className="relative">
          <div className="flex items-start gap-5">
            <div className="ml-3 min-w-0 flex-1">
              <DialogTitle className="mb-3 text-3xl leading-tight font-bold text-balance sm:text-4xl">
                {details?.title ?? day.location}
              </DialogTitle>

              <DialogDescription asChild>
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-3 text-sm">
                    <span className="bg-accent/10 text-accent inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {day.date}
                    </span>
                    <span className="bg-muted text-muted-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium">
                      <MapPin className="h-3.5 w-3.5" />
                      Día {day.day}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-base leading-relaxed">
                    {details?.summary ?? day.description}
                  </p>
                </div>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="relative">
          <div className="from-accent/30 via-accent/20 to-accent/10 absolute top-4 bottom-4 left-[18px] w-[2px] bg-gradient-to-b" />

          <div className="space-y-4">
            {(details?.activities?.length
              ? details.activities
              : fallbackActivities(day)
            ).map((a, idx) => {
              const lbl = tagLabel(a.tag);
              return (
                <motion.div
                  key={`${a.title}-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="bg-accent border-background shadow-accent/20 absolute top-6 left-[11px] h-4 w-4 rounded-full border-4 shadow-lg" />

                  <Card className="border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          {a.time && (
                            <span className="text-muted-foreground bg-muted/50 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs">
                              <Clock className="h-3 w-3" />
                              {a.time}
                            </span>
                          )}
                          {lbl && (
                            <Badge
                              variant="outline"
                              className={`h-6 border px-2.5 text-xs font-semibold ${tagColor(a.tag)}`}
                            >
                              {lbl}
                            </Badge>
                          )}
                        </div>

                        <p className="mb-2 text-lg leading-tight font-semibold">
                          {a.title}
                        </p>

                        {a.note && (
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {a.note}
                          </p>
                        )}
                      </div>

                      <Sparkles className="text-accent/60 mt-1 h-5 w-5 shrink-0" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {details?.tips?.length ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="border-accent/20 from-accent/5 via-accent/3 rounded-2xl border bg-gradient-to-br to-transparent p-5 backdrop-blur-sm"
          >
            <div className="mb-3 flex items-center gap-2">
              <Info className="text-accent h-4 w-4" />
              <p className="text-accent text-sm font-semibold">Tips rápidos</p>
            </div>
            <ul className="space-y-2.5">
              {details.tips.map((t, idx) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.5 + idx * 0.05 }}
                  className="text-muted-foreground flex gap-3 text-sm leading-relaxed"
                >
                  <span className="bg-accent mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                  <span>{t}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function fallbackActivities(day: Day): DayActivity[] {
  return [
    {
      time: "Plan",
      title: "Actividades por definir",
      note: "Este día aún no tiene detalle, pero pronto lo llenamos 💪",
      tag: "chill",
    },
    { time: "Nota", title: day.description, tag: "must" },
  ];
}
