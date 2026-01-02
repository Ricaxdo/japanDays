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
  const hasTips = Boolean(details?.tips?.length);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="no-scrollbar flex max-h-[calc(100dvh-4rem)] flex-col gap-0 p-0 sm:max-w-4xl">
        <div className="from-accent/10 via-accent/5 relative shrink-0 bg-gradient-to-b to-transparent px-6 pt-6 pb-4">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <DialogTitle className="mb-2 text-2xl leading-tight font-bold text-balance sm:text-3xl">
                  {details?.title ?? day.location}
                </DialogTitle>

                <DialogDescription asChild>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                      <span className="bg-accent/10 text-accent inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium">
                        <CalendarDays className="h-3 w-3" />
                        {day.date}
                      </span>
                      <span className="bg-muted text-muted-foreground inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium">
                        <MapPin className="h-3 w-3" />
                        Día {day.day}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                      {details?.summary ?? day.description}
                    </p>
                  </div>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div
          className={[
            "grid gap-4 px-6 pb-6",
            hasTips ? "lg:grid-cols-[1fr_280px]" : "lg:grid-cols-1",
          ].join(" ")}
        >
          {/* Activities column with controlled scroll */}
          <div className="relative flex min-h-0 flex-col">
            <div className="no-scrollbar relative flex-1 space-y-3 overflow-y-auto pr-2">
              <div className="from-accent/30 via-accent/20 to-accent/10 absolute top-3 bottom-3 left-[10px] w-[2px] bg-gradient-to-b" />

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
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    className="relative pl-8"
                  >
                    {/* Timeline dot */}
                    <div className="bg-accent border-background shadow-accent/20 absolute top-4 left-[4px] h-3 w-3 rounded-full border-[3px] shadow-lg" />

                    <Card className="border-border/50 bg-card/50 p-3.5 backdrop-blur-sm transition-shadow duration-300 hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                            {a.time && (
                              <span className="text-muted-foreground bg-muted/50 inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-xs">
                                <Clock className="h-3 w-3" />
                                {a.time}
                              </span>
                            )}
                            {lbl && (
                              <Badge
                                variant="outline"
                                className={`h-5 border px-2 text-xs font-semibold ${tagColor(a.tag)}`}
                              >
                                {lbl}
                              </Badge>
                            )}
                          </div>

                          <p className="mb-1.5 text-base leading-tight font-semibold">
                            {a.title}
                          </p>

                          {a.note && (
                            <p className="text-muted-foreground text-xs leading-relaxed text-pretty">
                              {a.note}
                            </p>
                          )}
                        </div>

                        <Sparkles className="text-accent/60 mt-0.5 h-4 w-4 shrink-0" />
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Tips sidebar - fixed height, no scroll needed */}
          {details?.tips?.length ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="border-accent/20 from-accent/5 via-accent/3 hidden h-fit rounded-xl border bg-gradient-to-br to-transparent p-4 backdrop-blur-sm lg:block"
            >
              <div className="mb-2.5 flex items-center gap-2">
                <Info className="text-accent h-3.5 w-3.5" />
                <p className="text-accent text-xs font-semibold">Tips rápidos</p>
              </div>
              <ul className="space-y-2">
                {details.tips.map((t, idx) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.4 + idx * 0.05 }}
                    className="text-muted-foreground flex gap-2 text-xs leading-relaxed"
                  >
                    <span className="bg-accent mt-1.5 h-1 w-1 shrink-0 rounded-full" />
                    <span className="text-pretty">{t}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : null}

          {/* Tips section for mobile - at bottom */}
          {details?.tips?.length ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="border-accent/20 from-accent/5 via-accent/3 rounded-xl border bg-gradient-to-br to-transparent p-3.5 backdrop-blur-sm lg:hidden"
            >
              <div className="mb-2 flex items-center gap-2">
                <Info className="text-accent h-3.5 w-3.5" />
                <p className="text-accent text-xs font-semibold">Tips rápidos</p>
              </div>
              <ul className="space-y-1.5">
                {details.tips.map((t) => (
                  <li
                    key={t}
                    className="text-muted-foreground flex gap-2 text-xs leading-relaxed"
                  >
                    <span className="bg-accent mt-1.5 h-1 w-1 shrink-0 rounded-full" />
                    <span className="text-pretty">{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function fallbackActivities(day: Day): DayActivity[] {
  return [
    {
      time: "Plan",
      title: "Actividades por definir",
      note: "Este día aún no tiene detalle, pero pronto lo llenamos",
      tag: "chill",
    },
    { time: "Nota", title: day.description, tag: "must" },
  ];
}
