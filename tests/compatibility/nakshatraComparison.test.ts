import { describe, expect, it } from "vitest";
import { compareNakshatras } from "@/lib/compatibility/nakshatraComparison";
import type { NakshatraPosition } from "@/types/astrology";

function nakshatra(
  name: string,
  rulingPlanet: string,
  gana: "Deva" | "Manushya" | "Rakshasa"
): NakshatraPosition {
  return {
    index: 1,
    pada: 1,
    attributes: { name, rulingPlanet, deity: "Test Deity", symbol: "Test Symbol", gana },
  };
}

describe("compareNakshatras", () => {
  it("flags the same Nakshatra correctly", () => {
    const result = compareNakshatras(nakshatra("Rohini", "Moon", "Manushya"), nakshatra("Rohini", "Moon", "Manushya"));
    expect(result.sameNakshatra).toBe(true);
    expect(result.sameRulingPlanet).toBe(true);
    expect(result.sameGana).toBe(true);
    expect(result.note).toContain("Rohini");
  });

  it("flags a shared ruling planet even with different Nakshatras", () => {
    // Ashwini and Magha are both ruled by Ketu
    const result = compareNakshatras(nakshatra("Ashwini", "Ketu", "Deva"), nakshatra("Magha", "Ketu", "Rakshasa"));
    expect(result.sameNakshatra).toBe(false);
    expect(result.sameRulingPlanet).toBe(true);
    expect(result.note).toContain("Ketu");
  });

  it("flags differing Ganas without same Nakshatra or ruling planet", () => {
    const result = compareNakshatras(nakshatra("Rohini", "Moon", "Manushya"), nakshatra("Krittika", "Sun", "Rakshasa"));
    expect(result.sameNakshatra).toBe(false);
    expect(result.sameRulingPlanet).toBe(false);
    expect(result.sameGana).toBe(false);
    expect(result.note.length).toBeGreaterThan(0);
  });

  it("never returns an empty note", () => {
    const result = compareNakshatras(nakshatra("Hasta", "Moon", "Deva"), nakshatra("Chitra", "Mars", "Rakshasa"));
    expect(result.note.length).toBeGreaterThan(0);
  });
});
