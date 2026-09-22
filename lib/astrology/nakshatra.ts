import { normalizeDegrees } from "@/lib/astrology/ephemeris";
import { NAKSHATRAS } from "@/data/nakshatras";
import type { NakshatraPosition } from "@/types/astrology";

const NAKSHATRA_SPAN = 360 / 27; // 13.333...° each
const PADA_SPAN = NAKSHATRA_SPAN / 4; // 3.333...° each

/**
 * Works out which of the 27 nakshatras (and which pada, 1-4, within it)
 * a SIDEREAL longitude falls into. Always pass a sidereal longitude here
 * (see ayanamsa.ts) — passing a tropical longitude would give a wrong
 * nakshatra for most of the year.
 */
export function getNakshatraPosition(siderealLongitude: number): NakshatraPosition {
  const longitude = normalizeDegrees(siderealLongitude);

  const index = Math.floor(longitude / NAKSHATRA_SPAN); // 0-26
  const withinNakshatra = longitude - index * NAKSHATRA_SPAN;
  const pada = (Math.floor(withinNakshatra / PADA_SPAN) + 1) as 1 | 2 | 3 | 4;

  return {
    index: index + 1,
    pada,
    attributes: NAKSHATRAS[index],
  };
}
