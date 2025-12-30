export const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;
