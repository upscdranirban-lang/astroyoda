import type { BirthChartResult } from "@/types/astrology";
import type { CompatibilityResult } from "@/types/compatibility";
import { compareSignsByElement } from "@/lib/compatibility/elementRelationship";
import { compareNakshatras } from "@/lib/compatibility/nakshatraComparison";

/**
 * Compares two already-calculated birth charts (see lib/astrology) into
 * qualitative traditional compatibility indicators, per the blueprint's
 * §10: "traditional compatibility indicators... presented as qualitative
 * traditional interpretation... explicitly not a percentage score or a
 * 'chance of successful marriage' claim." Reuses the same astronomical
 * engine as Birth Chart — no duplicate ephemeris logic, no live/paid API.
 *
 * The formal 36-point Ashtakoot Guna Milan score lives separately in
 * lib/compatibility/gunaMilan.ts (added later, on request) and is shown
 * alongside these notes on the Compatibility page. Mangal Dosha (Manglik)
 * analysis remains out of scope.
 */
export function getCompatibilityNotes(chartA: BirthChartResult, chartB: BirthChartResult): CompatibilityResult {
  const moonA = chartA.planets.find((p) => p.planet === "Moon")!;
  const moonB = chartB.planets.find((p) => p.planet === "Moon")!;
  const sunA = chartA.planets.find((p) => p.planet === "Sun")!;
  const sunB = chartB.planets.find((p) => p.planet === "Sun")!;

  return {
    moonSign: compareSignsByElement(moonA.sign, moonB.sign),
    sunSign: compareSignsByElement(sunA.sign, sunB.sign),
    ascendant: compareSignsByElement(chartA.lagna.sign, chartB.lagna.sign),
    nakshatra: compareNakshatras(chartA.moonNakshatra, chartB.moonNakshatra),
  };
}
