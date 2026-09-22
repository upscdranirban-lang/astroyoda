import {
  getPlanetTropicalLongitude,
  getMoonTropicalLongitude,
  getRahuTropicalLongitude,
  getKetuTropicalLongitude,
  type ClassicalPlanet,
} from "@/lib/astrology/ephemeris";
import { getLahiriAyanamsa, tropicalToSidereal } from "@/lib/astrology/ayanamsa";
import { getTropicalAscendant } from "@/lib/astrology/ascendant";
import { getZodiacSign, getDegreeWithinSign } from "@/lib/astrology/zodiacSigns";
import { getNakshatraPosition } from "@/lib/astrology/nakshatra";
import type { BirthChartInput, BirthChartResult, PlanetPosition } from "@/types/astrology";

const CLASSICAL_PLANETS: { key: ClassicalPlanet; label: string }[] = [
  { key: "sun", label: "Sun" },
  { key: "mercury", label: "Mercury" },
  { key: "venus", label: "Venus" },
  { key: "mars", label: "Mars" },
  { key: "jupiter", label: "Jupiter" },
  { key: "saturn", label: "Saturn" },
];

function toPlanetPosition(label: string, tropicalLongitude: number, date: Date): PlanetPosition {
  const siderealLongitude = tropicalToSidereal(tropicalLongitude, date);
  return {
    planet: label,
    tropicalLongitude,
    siderealLongitude,
    sign: getZodiacSign(siderealLongitude),
    degreeInSign: getDegreeWithinSign(siderealLongitude),
  };
}

/**
 * Computes a full V1 Vedic birth chart: Ascendant (Lagna), the Sun, Moon,
 * five classical planets, Rahu and Ketu, and the Moon's Nakshatra/Pada —
 * everything the blueprint's §7 lists for V1 scope. Deliberately excludes
 * Vimshottari Dasha and divisional charts (V2, per §7).
 *
 * This function takes an already-resolved UTC instant and geographic
 * coordinates. Turning a birth city name into those two things (timezone
 * lookup, geocoding) is Phase 8's job (birth-profile UI), not this
 * calculation engine's — see that phase for how it's resolved without a
 * paid API.
 */
export function calculateBirthChart(input: BirthChartInput): BirthChartResult {
  const { utcDate, latitude, longitudeEast } = input;

  const planets: PlanetPosition[] = CLASSICAL_PLANETS.map(({ key, label }) =>
    toPlanetPosition(label, getPlanetTropicalLongitude(key, utcDate), utcDate)
  );

  planets.push(toPlanetPosition("Moon", getMoonTropicalLongitude(utcDate), utcDate));
  planets.push(toPlanetPosition("Rahu", getRahuTropicalLongitude(utcDate), utcDate));
  planets.push(toPlanetPosition("Ketu", getKetuTropicalLongitude(utcDate), utcDate));

  const moon = planets.find((p) => p.planet === "Moon")!;

  const tropicalAscendant = getTropicalAscendant(utcDate, latitude, longitudeEast);
  const siderealAscendant = tropicalToSidereal(tropicalAscendant, utcDate);

  return {
    lagna: {
      sign: getZodiacSign(siderealAscendant),
      degreeInSign: getDegreeWithinSign(siderealAscendant),
      siderealLongitude: siderealAscendant,
    },
    planets,
    moonNakshatra: getNakshatraPosition(moon.siderealLongitude),
    ayanamsaUsed: getLahiriAyanamsa(utcDate),
  };
}
