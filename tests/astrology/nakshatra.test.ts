import { describe, expect, it } from "vitest";
import { getNakshatraPosition } from "@/lib/astrology/nakshatra";
import { NAKSHATRAS } from "@/data/nakshatras";

const SPAN = 360 / 27;

describe("getNakshatraPosition", () => {
  it("returns Ashwini, pada 1 at exactly 0 degrees", () => {
    const result = getNakshatraPosition(0);
    expect(result.index).toBe(1);
    expect(result.pada).toBe(1);
    expect(result.attributes.name).toBe("Ashwini");
  });

  it("returns Ashwini, pada 4 just under the nakshatra's end", () => {
    const result = getNakshatraPosition(SPAN - 0.001);
    expect(result.index).toBe(1);
    expect(result.pada).toBe(4);
  });

  it("returns Bharani, pada 1 exactly at the second nakshatra's start", () => {
    const result = getNakshatraPosition(SPAN);
    expect(result.index).toBe(2);
    expect(result.pada).toBe(1);
    expect(result.attributes.name).toBe("Bharani");
  });

  it("returns Revati (the 27th) just under 360 degrees", () => {
    const result = getNakshatraPosition(359.9);
    expect(result.index).toBe(27);
    expect(result.attributes.name).toBe("Revati");
  });

  it("wraps 360 degrees back to Ashwini", () => {
    const result = getNakshatraPosition(360);
    expect(result.index).toBe(1);
  });

  it("moves to pada 2 a quarter of the way through a nakshatra", () => {
    const result = getNakshatraPosition(SPAN / 4 + 0.001);
    expect(result.pada).toBe(2);
  });

  it("has exactly 27 entries in the static data table", () => {
    expect(NAKSHATRAS).toHaveLength(27);
  });

  it("every nakshatra has a non-empty ruling planet, deity and symbol", () => {
    for (const n of NAKSHATRAS) {
      expect(n.rulingPlanet.length).toBeGreaterThan(0);
      expect(n.deity.length).toBeGreaterThan(0);
      expect(n.symbol.length).toBeGreaterThan(0);
    }
  });
});
