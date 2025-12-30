export const ITINERARY = {
  GAP: 0,
  HEIGHT_MOBILE: 400,
  HEIGHT_DESKTOP: 420,

  // item width
  ITEM_W_MOBILE: "w-[80vw]",
  ITEM_W_DESKTOP: "md:w-[700px]",
  ITEM_MAX_W: "max-w-[860px]",

  // transforms
  POS_RANGE: [-2, -1, 0, 1, 2] as number[],
  SCALE_RANGE: [0.82, 0.92, 1, 0.92, 0.82] as number[],
  OPACITY_RANGE: [0.25, 0.55, 1, 0.55, 0.25] as number[],
  BLUR_RANGE: [10, 5, 0, 5, 10] as number[],

  // anim
  DRAG_ELASTIC: 0.06,
  BTN_EASE: [0.22, 1, 0.36, 1] as const,
};
