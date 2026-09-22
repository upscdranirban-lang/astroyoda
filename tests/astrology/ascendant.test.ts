import { describe, expect, it } from "vitest";
import * as Astronomy from "astronomy-engine";
import { getTropicalAscendant } from "@/lib/astrology/ascendant";
import { normalizeDegrees } from "@/lib/astrology/ephemeris";
import { calculateBirthChart } from "@/lib/astrology/birthChart";

/**
 * The Ascendant formula has two special cases, AT THE EQUATOR, that can be
 * independently derived two different ways rather than only trusted from
 * the code's own algebra:
 *
 * 1. Solve the code's own tan(Ascendant) equation by hand at the equator
 *    (where the tan(latitude) term vanishes).
 * 2. Separately, convert the *expected right ascension* of the rising
 *    point (RA = RAMC + 90°, true at the equator for any declination,
 *    since the horizon there passes through both celestial poles) back to
 *    an ecliptic longitude via RA(λ) = atan2(sin λ · cos ε, cos λ), and
 *    solve for λ.
 *
 * Both derivations land on the same values below — which also agree with
 * the +180° correction found by validating a real chart (see the
 * "real published chart" test further down). Historical note: an earlier
 * version of this formula (before Phase 16) used the RAW `atan2` result
 * without the +180° correction, which put these same special cases at 270°
 * and 0° respectively — the Descendant, not the Ascendant. See
 * lib/astrology/ascendant.ts's "CORRECTED IN PHASE 16" comment.
 *
 *   RAMC =  0° → Ascendant =  90°  (Cancer 0°)
 *   RAMC = 90° → Ascendant = 180°  (Libra 0°)
 */
function longitudeForTargetRamc(date: Date, targetRamc: number): number {
  const gastDegrees = normalizeDegrees(Astronomy.SiderealTime(date) * 15);
  return targetRamc - gastDegrees;
}

describe("getTropicalAscendant", () => {
  const date = new Date("2010-06-15T09:00:00Z");

  it("is 90 degrees at the equator when RAMC is 0", () => {
    const longitude = longitudeForTargetRamc(date, 0);
    const ascendant = getTropicalAscendant(date, 0, longitude);
    expect(ascendant).toBeCloseTo(90, 4);
  });

  it("is 180 degrees at the equator when RAMC is 90", () => {
    const longitude = longitudeForTargetRamc(date, 90);
    const ascendant = getTropicalAscendant(date, 0, longitude);
    expect(ascendant).toBeCloseTo(180, 4);
  });

  it("throws at the north pole", () => {
    expect(() => getTropicalAscendant(date, 90, 0)).toThrow(RangeError);
  });

  it("throws at the south pole", () => {
    expect(() => getTropicalAscendant(date, -90, 0)).toThrow(RangeError);
  });

  it("always returns a value in [0, 360)", () => {
    const ascendant = getTropicalAscendant(date, 51.5, -0.12); // London
    expect(ascendant).toBeGreaterThanOrEqual(0);
    expect(ascendant).toBeLessThan(360);
  });

  it("changes over the course of a day (the Ascendant moves ~1 sign every 2 hours)", () => {
    const laterSameDay = new Date(date.getTime() + 2 * 60 * 60 * 1000);
    const asc1 = getTropicalAscendant(date, 28.6, 77.2); // Delhi
    const asc2 = getTropicalAscendant(laterSameDay, 28.6, 77.2);
    expect(asc1).not.toBeCloseTo(asc2, 0);
  });
});

/**
 * Independent validation against a real, published Vedic chart (Phase 16
 * — "Testing"), not derived from this project's own formulas. This is
 * the test that actually caught the Descendant/Ascendant swap fixed above.
 *
 * Reference chart: a public figure born 17 September 1950, 11:40 IST
 * (India has used a fixed UTC+5:30 offset with no daylight saving since
 * 1945, so this is UTC 06:10), in Vadnagar, Gujarat (23.7788°N, 72.6403°E)
 * — published at https://jyothishai.com/horoscopes/narendra-modi, which
 * states its results use the Lahiri ayanamsa:
 *   - Ascendant: Scorpio, Anuradha nakshatra, Pada 2 (no exact degree given)
 *   - Sun: Virgo, 0°
 *   - Moon: Scorpio, 9°
 * The Scorpio Ascendant is independently corroborated at the sign level by
 * a second, separately-run source, sanatanveda.com
 * (https://www.sanatanveda.com/astrology/horoscope-analysis-of-narendra-modi/),
 * which states independently that "Scorpio, or Vrishchika, was the rising
 * sign." The Sun and Moon degree figures above are single-sourced
 * (jyothishai.com only) rather than cross-checked against a second source,
 * so those two assertions use a wider, more forgiving tolerance than the
 * Ascendant one, in keeping with the project's rule against presenting
 * single-sourced figures as more certain than they are.
 */
describe("getTropicalAscendant / calculateBirthChart — real published chart", () => {
  const utcDate = new Date("1950-09-17T06:10:00Z");
  const latitude = 23.7788;
  const longitudeEast = 72.6403;
  const chart = calculateBirthChart({ utcDate, latitude, longitudeEast });

  it("matches the independently cross-checked Ascendant sign (Scorpio)", () => {
    expect(chart.lagna.sign).toBe("Scorpio");
  });

  it("places the Ascendant in Anuradha nakshatra, pada 2, matching the published chart", () => {
    // Anuradha spans sidereal 213°20'-226°40'; pada 2 is its second quarter (216°40'-220°).
    expect(chart.lagna.siderealLongitude).toBeGreaterThanOrEqual(216 + 40 / 60);
    expect(chart.lagna.siderealLongitude).toBeLessThan(220);
  });

  it("roughly matches the (single-sourced) published Sun position: Virgo, 0 degrees", () => {
    const sun = chart.planets.find((p) => p.planet === "Sun");
    expect(sun?.sign).toBe("Virgo");
    expect(sun?.degreeInSign).toBeLessThan(2); // published as "0°"; allow a couple of degrees of slack
  });

  it("roughly matches the (single-sourced) published Moon position: Scorpio, 9 degrees", () => {
    const moon = chart.planets.find((p) => p.planet === "Moon");
    expect(moon?.sign).toBe("Scorpio");
    expect(moon?.degreeInSign).toBeGreaterThan(7);
    expect(moon?.degreeInSign).toBeLessThan(11);
  });
});
