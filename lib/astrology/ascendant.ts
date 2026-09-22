import {
  getGreenwichSiderealTimeDegrees,
  getTrueObliquityDegrees,
  normalizeDegrees,
} from "@/lib/astrology/ephemeris";

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

/**
 * Tropical ecliptic longitude of the Ascendant (Lagna), using the standard
 * spherical-astronomy formula found in public astronomical references
 * (e.g. Meeus-style treatments of the Ascendant/Midheaven): given the
 * Right Ascension of the Midheaven (RAMC, derived from Local Sidereal
 * Time), the observer's geographic latitude, and the obliquity of the
 * ecliptic,
 *
 *   tan(Ascendant) = -cos(RAMC) / (sin(RAMC)*cos(obliquity) + tan(latitude)*sin(obliquity))
 *
 * CORRECTED IN PHASE 16 (Testing): `atan2(y, x)` on that formula's own
 * numerator/denominator lands on the DESCENDANT, not the Ascendant — the
 * two are always exactly 180° apart, and this formula's raw output was
 * consistently the wrong one of the pair. This was caught by independently
 * validating against a real, published Vedic chart (see
 * tests/astrology/ascendant.test.ts's reference-chart test), where this
 * function returned Taurus for a chart independently and repeatedly
 * published as having a Scorpio Ascendant — Taurus and Scorpio are exactly
 * opposite signs. Adding 180° here fixes it, and was independently
 * double-checked with a separate derivation (converting each equator
 * special case's expected right ascension, RAMC + 90°, back to an ecliptic
 * longitude) that landed on exactly the same corrected values as the
 * reference-chart fix did. This bug affected every Ascendant (and
 * therefore every whole-sign house) this project has computed before this
 * fix, so if you're comparing against results generated earlier, expect
 * every chart's houses to have shifted by exactly 6 signs.
 *
 * V1 uses the WHOLE-SIGN house system (the Vedic default): once the
 * Ascendant's sign is known, house 1 = that sign, house 2 = the next sign,
 * and so on — no separate house-cusp math is needed. See blueprint §7/§14.
 *
 * @param date UTC instant of birth
 * @param latitude geographic latitude in degrees, north positive
 * @param longitudeEast geographic longitude in degrees, EAST positive
 *   (note: this is the opposite sign convention from some map apps, which
 *   show west as positive — the birth-profile UI in Phase 8 needs to be
 *   explicit about this when it collects a location)
 */
export function getTropicalAscendant(date: Date, latitude: number, longitudeEast: number): number {
  if (latitude <= -90 || latitude >= 90) {
    throw new RangeError(`Ascendant is undefined at the poles: latitude ${latitude}`);
  }

  const gastDegrees = getGreenwichSiderealTimeDegrees(date);
  const ramc = normalizeDegrees(gastDegrees + longitudeEast); // Right Ascension of the Midheaven

  const obliquityRad = getTrueObliquityDegrees(date) * DEG_TO_RAD;
  const ramcRad = ramc * DEG_TO_RAD;
  const latitudeRad = latitude * DEG_TO_RAD;

  const y = -Math.cos(ramcRad);
  const x = Math.sin(ramcRad) * Math.cos(obliquityRad) + Math.tan(latitudeRad) * Math.sin(obliquityRad);

  const ascendantRad = Math.atan2(y, x);
  // +180: see the CORRECTED IN PHASE 16 note above — the raw atan2 result
  // here is the Descendant, exactly opposite the actual Ascendant.
  return normalizeDegrees(ascendantRad * RAD_TO_DEG + 180);
}
