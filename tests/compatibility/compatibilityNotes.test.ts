import { describe, expect, it } from "vitest";
import { getCompatibilityNotes } from "@/lib/compatibility/compatibilityNotes";
import type { BirthChartResult, PlanetPosition } from "@/types/astrology";
import type { ZodiacSign } from "@/lib/astrology/zodiacSigns";

function planet(name: string, sign: ZodiacSign): PlanetPosition {
  return { planet: name, tropicalLongitude: 0, siderealLongitude: 0, sign, degreeInSign: 0 };
}

function makeChart(
  lagnaSign: ZodiacSign,
  sunSign: ZodiacSign,
  moonSign: ZodiacSign,
  nakshatraName = "Ashwini"
): BirthChartResult {
  return {
    lagna: { sign: lagnaSign, degreeInSign: 0, siderealLongitude: 0 },
    planets: [planet("Sun", sunSign), planet("Moon", moonSign)],
    moonNakshatra: {
      index: 1,
      pada: 1,
      attributes: { name: nakshatraName, rulingPlanet: "Ketu", deity: "Test", symbol: "Test", gana: "Deva" },
    },
    ayanamsaUsed: 24,
  };
}

describe("getCompatibilityNotes", () => {
  it("compares Moon sign, Sun sign and Ascendant by element", () => {
    const a = makeChart("Aries", "Leo", "Cancer");
    const b = makeChart("Taurus", "Sagittarius", "Scorpio");

    const result = getCompatibilityNotes(a, b);

    expect(result.moonSign.elementA).toBe("Water"); // Cancer
    expect(result.moonSign.elementB).toBe("Water"); // Scorpio
    expect(result.moonSign.tone).toBe("same");

    expect(result.sunSign.elementA).toBe("Fire"); // Leo
    expect(result.sunSign.elementB).toBe("Fire"); // Sagittarius
    expect(result.sunSign.tone).toBe("same");

    expect(result.ascendant.elementA).toBe("Fire"); // Aries
    expect(result.ascendant.elementB).toBe("Earth"); // Taurus
    expect(result.ascendant.tone).toBe("challenging");
  });

  it("compares the Moon's Nakshatra for both charts", () => {
    const a = makeChart("Aries", "Leo", "Cancer", "Pushya");
    const b = makeChart("Taurus", "Sagittarius", "Scorpio", "Pushya");

    const result = getCompatibilityNotes(a, b);
    expect(result.nakshatra.sameNakshatra).toBe(true);
  });

  it("is order-independent for element tone (A vs B or B vs A gives the same tone)", () => {
    const a = makeChart("Aries", "Aries", "Aries");
    const b = makeChart("Gemini", "Gemini", "Gemini");

    const ab = getCompatibilityNotes(a, b);
    const ba = getCompatibilityNotes(b, a);
    expect(ab.moonSign.tone).toBe(ba.moonSign.tone);
  });
});
