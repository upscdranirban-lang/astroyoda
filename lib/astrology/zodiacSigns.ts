import { normalizeDegrees } from "@/lib/astrology/ephemeris";

export const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

/** Each sign spans exactly 30 degrees, in order starting from 0 degrees Aries. */
export function getZodiacSign(siderealLongitude: number): ZodiacSign {
  const index = Math.floor(normalizeDegrees(siderealLongitude) / 30) % 12;
  return ZODIAC_SIGNS[index];
}

/** Degrees elapsed within the current sign (0-30), for display ("14° 32' Scorpio"). */
export function getDegreeWithinSign(siderealLongitude: number): number {
  return normalizeDegrees(siderealLongitude) % 30;
}

/**
 * A sign's position in the standard order (0 = Aries, 11 = Pisces). Used by
 * the Vedic chart renderer (Phase 10) to work out, for each of the 12
 * whole-sign houses, which sign it holds relative to the Ascendant.
 */
export function getZodiacSignIndex(sign: ZodiacSign): number {
  return ZODIAC_SIGNS.indexOf(sign);
}
