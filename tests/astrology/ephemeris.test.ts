import { describe, expect, it } from "vitest";
import {
  getRahuTropicalLongitude,
  getKetuTropicalLongitude,
  normalizeDegrees,
  getGreenwichSiderealTimeDegrees,
} from "@/lib/astrology/ephemeris";

describe("normalizeDegrees", () => {
  it("leaves an in-range value unchanged", () => {
    expect(normalizeDegrees(45)).toBe(45);
  });

  it("wraps a value at or above 360", () => {
    expect(normalizeDegrees(360)).toBe(0);
    expect(normalizeDegrees(400)).toBe(40);
  });

  it("wraps a negative value into range", () => {
    expect(normalizeDegrees(-10)).toBe(350);
  });
});

describe("Rahu and Ketu", () => {
  it("are always exactly 180 degrees apart", () => {
    const date = new Date("1990-06-15T08:30:00Z");
    const rahu = getRahuTropicalLongitude(date);
    const ketu = getKetuTropicalLongitude(date);
    const diff = normalizeDegrees(ketu - rahu);
    expect(diff).toBeCloseTo(180, 6);
  });

  it("stays within 0-360 degrees for a range of dates", () => {
    const dates = ["1950-01-01", "1999-12-31", "2050-06-30"];
    for (const d of dates) {
      const rahu = getRahuTropicalLongitude(new Date(d));
      expect(rahu).toBeGreaterThanOrEqual(0);
      expect(rahu).toBeLessThan(360);
    }
  });

  it("moves slowly backward (retrograde) year over year, as the mean node does", () => {
    // The mean lunar node regresses through the zodiac (~19 fewer degrees/year).
    const earlier = getRahuTropicalLongitude(new Date("2000-01-01T00:00:00Z"));
    const later = getRahuTropicalLongitude(new Date("2001-01-01T00:00:00Z"));
    // Normalize the "distance traveled backward" allowing for one wrap-around.
    const backwardMotion = normalizeDegrees(earlier - later);
    expect(backwardMotion).toBeGreaterThan(15);
    expect(backwardMotion).toBeLessThan(23);
  });
});

describe("getGreenwichSiderealTimeDegrees", () => {
  it("always returns a value in [0, 360)", () => {
    const value = getGreenwichSiderealTimeDegrees(new Date("2024-03-20T12:00:00Z"));
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(360);
  });
});
