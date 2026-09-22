/**
 * Deterministic "night sky" data for the site's decorative starfield.
 *
 * Positions are generated from a small seeded PRNG (mulberry32) rather than
 * Math.random(), so the exact same star layout is produced on the server
 * (at static-export build time) and again during client hydration — no
 * hydration mismatch, no need for "use client" + useEffect just to draw a
 * background.
 */

export interface Star {
  top: number; // percent
  left: number; // percent
  size: number; // px
  delay: number; // seconds
  duration: number; // seconds
  baseOpacity: number;
}

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateStars(count: number, seed: number): Star[] {
  const random = mulberry32(seed);
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      top: random() * 100,
      left: random() * 100,
      size: 1 + random() * 1.8,
      delay: random() * 6,
      duration: 3 + random() * 4,
      baseOpacity: 0.35 + random() * 0.5,
    });
  }
  return stars;
}

/** A handful of fixed, faint constellation-style line clusters (percent coordinates). */
export const CONSTELLATIONS: Array<Array<[number, number]>> = [
  [
    [8, 15],
    [14, 10],
    [22, 18],
    [19, 27],
  ],
  [
    [78, 8],
    [86, 14],
    [83, 24],
    [91, 22],
  ],
  [
    [12, 68],
    [20, 74],
    [18, 84],
    [9, 88],
  ],
  [
    [70, 72],
    [80, 68],
    [88, 78],
    [79, 86],
    [70, 82],
  ],
  [
    [45, 6],
    [52, 12],
    [60, 8],
  ],
];
