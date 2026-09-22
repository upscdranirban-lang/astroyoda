import * as Astronomy from "astronomy-engine";

/**
 * Thin wrapper around astronomy-engine (MIT license, pure JS/TS, no native
 * dependencies — see the blueprint's §17 for why this library was chosen
 * over Swiss Ephemeris bindings). Everything here returns TROPICAL
 * (not sidereal) geocentric ecliptic longitude in degrees [0, 360).
 * Sidereal/Vedic conversion happens in ayanamsa.ts, one layer up — this
 * file only talks to astronomy-engine.
 */

export type ClassicalPlanet = "sun" | "mercury" | "venus" | "mars" | "jupiter" | "saturn";

// EclipticLongitude() works for the five planets below (it computes via a
// heliocentric vector internally), but NOT for the Sun itself —
// "heliocentric longitude of the Sun" is undefined, so astronomy-engine
// throws for Body.Sun. The Sun needs its own dedicated function, SunPosition().
const PLANET_BODIES: Record<Exclude<ClassicalPlanet, "sun">, Astronomy.Body> = {
  mercury: Astronomy.Body.Mercury,
  venus: Astronomy.Body.Venus,
  mars: Astronomy.Body.Mars,
  jupiter: Astronomy.Body.Jupiter,
  saturn: Astronomy.Body.Saturn,
};

export function normalizeDegrees(degrees: number): number {
  const remainder = degrees % 360;
  return remainder < 0 ? remainder + 360 : remainder;
}

/** Geocentric apparent tropical ecliptic longitude of the Sun or a classical planet. */
export function getPlanetTropicalLongitude(planet: ClassicalPlanet, date: Date): number {
  if (planet === "sun") {
    return normalizeDegrees(Astronomy.SunPosition(date).elon);
  }
  return normalizeDegrees(Astronomy.EclipticLongitude(PLANET_BODIES[planet], date));
}

/** Geocentric apparent tropical ecliptic longitude of the Moon. */
export function getMoonTropicalLongitude(date: Date): number {
  return normalizeDegrees(Astronomy.EclipticGeoMoon(date).lon);
}

/**
 * Rahu (the Moon's mean ascending lunar node), tropical longitude.
 * astronomy-engine has no lunar-node function — Rahu/Ketu aren't physical
 * bodies, they're where the Moon's orbit crosses the ecliptic. This uses
 * the standard published "mean lunar node" formula (Meeus, widely
 * reproduced in public astronomical references — not derived from any
 * AGPL-licensed source), evaluated with astronomy-engine's own Terrestrial
 * Time value for the given date so it stays consistent with the rest of
 * this file's time handling.
 */
export function getRahuTropicalLongitude(date: Date): number {
  const time = new Astronomy.AstroTime(date);
  const T = time.tt / 36525; // Julian centuries since J2000.0 TT
  const meanNode =
    125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000;
  return normalizeDegrees(meanNode);
}

/** Ketu is always exactly opposite Rahu. */
export function getKetuTropicalLongitude(date: Date): number {
  return normalizeDegrees(getRahuTropicalLongitude(date) + 180);
}

/**
 * Greenwich Apparent Sidereal Time, in DEGREES [0, 360).
 * astronomy-engine's own SiderealTime() returns hours [0, 24); this
 * multiplies by 15 as its own documentation specifies.
 */
export function getGreenwichSiderealTimeDegrees(date: Date): number {
  return normalizeDegrees(Astronomy.SiderealTime(date) * 15);
}

/** True obliquity of the ecliptic (includes nutation) for the given date, in degrees. */
export function getTrueObliquityDegrees(date: Date): number {
  return Astronomy.e_tilt(new Astronomy.AstroTime(date)).tobl;
}
