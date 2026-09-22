import * as Astronomy from "astronomy-engine";
import { normalizeDegrees } from "@/lib/astrology/ephemeris";

/**
 * Lahiri (Chitrapaksha) ayanamsa — the angular offset between the tropical
 * and sidereal zodiacs used throughout this project, since Vedic astrology
 * is sidereal.
 *
 * IMPORTANT — how these constants were chosen: this is deliberately NOT
 * copied from Swiss Ephemeris's source or its internal SIDM_LAHIRI
 * constants (that library is AGPL-licensed; see blueprint §17/§26 for why
 * this project avoids depending on it). Instead, this quadratic was fitted
 * against published Lahiri ayanamsa reference values for 1900, 1950, 2000
 * and 2050 (see the source cited below), which is the same "check it
 * against a trusted reference" approach the blueprint's testing strategy
 * (§22) asks for elsewhere.
 *
 * Reference values used to fit this formula (degrees, from
 * https://jagannathhora.com/historical-lahiri-ayanamsa-values-tables/):
 *   1900-01-01: 22°27'55" = 22.465278°
 *   1950-01-01: 23°09'28" = 23.157778°
 *   2000-01-01: 23°51'12" = 23.853333°  (used as the T=0 anchor, J2000)
 *   2024-01-01: 24°11'27" = 24.190833°  (used to confirm the fit)
 *   2050-01-01: 24°33'35" = 24.559722°
 *
 * The fitted quadratic matches all five reference points to within about
 * 0.003° (roughly 10 arcseconds) across 1900–2050 — good enough for V1's
 * "basic chart" scope, but this has NOT been independently cross-checked
 * against a live ephemeris run and should be revisited in Phase 16
 * (Testing) before any result is presented as highly precise.
 */
const AYANAMSA_AT_J2000 = 23.853333; // degrees, at 2000-01-01 (T=0)
const AYANAMSA_LINEAR_TERM = 0.01404537; // degrees per year
const AYANAMSA_QUADRATIC_TERM = 0.0000016482; // degrees per year^2

export function getLahiriAyanamsa(date: Date): number {
  const time = new Astronomy.AstroTime(date);
  const yearsSinceJ2000 = time.tt / 365.25;
  const ayanamsa =
    AYANAMSA_AT_J2000 +
    AYANAMSA_LINEAR_TERM * yearsSinceJ2000 +
    AYANAMSA_QUADRATIC_TERM * yearsSinceJ2000 * yearsSinceJ2000;
  return normalizeDegrees(ayanamsa);
}

/** Converts a tropical ecliptic longitude to sidereal (Vedic) by subtracting the ayanamsa. */
export function tropicalToSidereal(tropicalLongitude: number, date: Date): number {
  return normalizeDegrees(tropicalLongitude - getLahiriAyanamsa(date));
}
