import { describe, expect, it } from "vitest";
import { calculateBirthChart } from "@/lib/astrology/birthChart";
import { getLahiriAyanamsa } from "@/lib/astrology/ayanamsa";
import { getNakshatraPosition } from "@/lib/astrology/nakshatra";
import { ZODIAC_SIGNS } from "@/lib/astrology/zodiacSigns";

describe("calculateBirthChart", () => {
  const input = {
    utcDate: new Date("1990-08-15T02:30:00Z"), // ~8:00 AM IST
    latitude: 28.6139, // New Delhi
    longitudeEast: 77.209,
  };

  it("returns exactly the 9 bodies V1 scope calls for", () => {
    const chart = calculateBirthChart(input);
    const planetNames = chart.planets.map((p) => p.planet).sort();
    expect(planetNames).toEqual(
      ["Jupiter", "Ketu", "Mars", "Mercury", "Moon", "Rahu", "Saturn", "Sun", "Venus"].sort()
    );
  });

  it("gives every planet a valid zodiac sign and an in-range degree", () => {
    const chart = calculateBirthChart(input);
    for (const planet of chart.planets) {
      expect(ZODIAC_SIGNS).toContain(planet.sign);
      expect(planet.degreeInSign).toBeGreaterThanOrEqual(0);
      expect(planet.degreeInSign).toBeLessThan(30);
    }
  });

  it("uses the same ayanamsa value it reports for its own sidereal conversions", () => {
    const chart = calculateBirthChart(input);
    expect(chart.ayanamsaUsed).toBeCloseTo(getLahiriAyanamsa(input.utcDate), 6);
  });

  it("derives the Moon's nakshatra from the same Moon position reported in the planet list", () => {
    const chart = calculateBirthChart(input);
    const moon = chart.planets.find((p) => p.planet === "Moon")!;
    const expectedNakshatra = getNakshatraPosition(moon.siderealLongitude);
    expect(chart.moonNakshatra).toEqual(expectedNakshatra);
  });

  it("gives the Lagna a valid sign", () => {
    const chart = calculateBirthChart(input);
    expect(ZODIAC_SIGNS).toContain(chart.lagna.sign);
  });

  it("keeps Rahu and Ketu 180 degrees apart in the final sidereal positions too", () => {
    const chart = calculateBirthChart(input);
    const rahu = chart.planets.find((p) => p.planet === "Rahu")!;
    const ketu = chart.planets.find((p) => p.planet === "Ketu")!;
    const diff = ((ketu.siderealLongitude - rahu.siderealLongitude) % 360 + 360) % 360;
    expect(diff).toBeCloseTo(180, 6);
  });

  it("is deterministic: the same input always produces the same output", () => {
    const first = calculateBirthChart(input);
    const second = calculateBirthChart({ ...input });
    expect(first).toEqual(second);
  });
});
