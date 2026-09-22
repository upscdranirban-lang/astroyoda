import { describe, expect, it } from "vitest";
import { getChartHouses } from "@/lib/astrology/houseLayout";
import type { BirthChartResult, PlanetPosition } from "@/types/astrology";

function planet(planet: string, sign: PlanetPosition["sign"]): PlanetPosition {
  return { planet, tropicalLongitude: 0, siderealLongitude: 0, sign, degreeInSign: 0 };
}

function makeResult(lagnaSign: BirthChartResult["lagna"]["sign"], planets: PlanetPosition[]): BirthChartResult {
  return {
    lagna: { sign: lagnaSign, degreeInSign: 0, siderealLongitude: 0 },
    planets,
    moonNakshatra: {
      index: 1,
      pada: 1,
      attributes: { name: "Ashwini", rulingPlanet: "Ketu", deity: "Ashwini Kumaras", symbol: "Horse's head", gana: "Deva" },
    },
    ayanamsaUsed: 24,
  };
}

describe("getChartHouses", () => {
  it("puts the Ascendant's sign in House 1", () => {
    const houses = getChartHouses(makeResult("Leo", []));
    expect(houses[0].houseNumber).toBe(1);
    expect(houses[0].sign).toBe("Leo");
    expect(houses[0].isLagna).toBe(true);
    expect(houses[0].signNumber).toBe(5); // Leo is the 5th sign
  });

  it("assigns the remaining 11 houses in zodiac order, wrapping around", () => {
    const houses = getChartHouses(makeResult("Pisces", []));
    // Pisces (12) -> House1; House2 wraps back to Aries (1)
    expect(houses[0].sign).toBe("Pisces");
    expect(houses[1].sign).toBe("Aries");
    expect(houses[2].sign).toBe("Taurus");
    expect(houses[11].sign).toBe("Aquarius");
  });

  it("returns exactly 12 houses numbered 1 through 12 in order", () => {
    const houses = getChartHouses(makeResult("Aries", []));
    expect(houses).toHaveLength(12);
    houses.forEach((h, i) => expect(h.houseNumber).toBe(i + 1));
  });

  it("places each planet's abbreviation into the house matching its sign", () => {
    const houses = getChartHouses(
      makeResult("Aries", [planet("Sun", "Aries"), planet("Moon", "Taurus"), planet("Mars", "Aries")])
    );
    expect(houses[0].planetAbbreviations.sort()).toEqual(["Ma", "Su"].sort());
    expect(houses[1].planetAbbreviations).toEqual(["Mo"]);
    expect(houses[2].planetAbbreviations).toEqual([]);
  });

  it("only House 1 is flagged as the Lagna house", () => {
    const houses = getChartHouses(makeResult("Cancer", []));
    expect(houses.filter((h) => h.isLagna)).toHaveLength(1);
    expect(houses.find((h) => h.isLagna)?.houseNumber).toBe(1);
  });
});
