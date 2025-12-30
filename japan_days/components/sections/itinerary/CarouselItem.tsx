"use client";

import { motion, useTransform } from "framer-motion";
import * as React from "react";
import { BigDayCard } from "./BigDayCard";
import { DayDetailsDialog } from "./DayDetailsDialog";
import { ITINERARY } from "./itinerary.constants";
import type { Day } from "./itinerary.types";

export function CarouselItem({
  day,
  index,
  trackX,
  STEP,
  measureRef,
  onClick,
}: {
  day: Day;
  index: number;
  trackX: import("framer-motion").MotionValue<number>;
  STEP: number;
  measureRef?: (node: HTMLDivElement | null) => void;
  onClick: () => void; // esto lo seguimos usando para centrar
}) {
  const pos = useTransform(trackX, (x) => (index * STEP + x) / STEP);

  const scale = useTransform(pos, ITINERARY.POS_RANGE, ITINERARY.SCALE_RANGE);
  const opacity = useTransform(pos, ITINERARY.POS_RANGE, ITINERARY.OPACITY_RANGE);
  const blur = useTransform(pos, ITINERARY.POS_RANGE, ITINERARY.BLUR_RANGE);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const pointerEvents = useTransform(pos, (p) => (Math.abs(p) <= 1.6 ? "auto" : "none"));

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <motion.div
        ref={measureRef}
        className={`${ITINERARY.ITEM_W_MOBILE} ${ITINERARY.ITEM_MAX_W} shrink-0 ${ITINERARY.ITEM_W_DESKTOP}`}
        style={{ scale, opacity, filter, pointerEvents }}
      >
        <button
          type="button"
          onClick={() => {
            onClick(); // centra el item
            setOpen(true); // abre modal
          }}
          className="w-full text-left"
        >
          <BigDayCard day={day} blurMv={blur} />
        </button>
      </motion.div>

      <DayDetailsDialog day={day} open={open} onOpenChange={setOpen} />
    </>
  );
}
