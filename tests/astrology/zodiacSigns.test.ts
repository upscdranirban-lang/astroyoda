import { describe, expect, it } from "vitest";
import { getZodiacSign, getDegreeWithinSign, getZodiacSignIndex, ZODIAC_SIGNS } from "@/lib/astrology/zodiacSigns";

describe("getZodiacSign", () => {
  it("returns Aries at exactly 0 degrees", () => {
    expect(getZodiacSign(0)).toBe("Aries");
  });

  it("returns Aries just under 30 degrees", () => {
    expect(getZodiacSign(29.999)).toBe("Aries");
  });

  it("returns Taurus at exactly 30 degrees", () => {
    expect(getZodiacSign(30)).toBe("Taurus");
  });

  it("returns Pisces just under 360 degrees", () => {
    expect(getZodiacSign(359.999)).toBe("Pisces");
  });

  it("wraps a longitude of 360 back to Aries", () => {
    expect(getZodiacSign(360)).toBe("Aries");
  });

  it("wraps a negative longitude correctly", () => {
    expect(getZodiacSign(-1)).toBe("Pisces");
  });

  it("has exactly 12 signs in the standard order", () => {
    expect(ZODIAC_SIGNS).toHaveLength(12);
    expect(ZODIAC_SIGNS[0]).toBe("Aries");
    expect(ZODIAC_SIGNS[11]).toBe("Pisces");
  });
});

describe("getDegreeWithinSign", () => {
  it("returns 0 at a sign boundary", () => {
    expect(getDegreeWithinSign(30)).toBe(0);
  });

  it("returns the offset within a sign", () => {
    expect(getDegreeWithinSign(45)).toBe(15);
  });

  it("wraps correctly past 360", () => {
    expect(getDegreeWithinSign(375)).toBe(15);
  });
});

describe("getZodiacSignIndex", () => {
  it("returns 0 for Aries and 11 for Pisces", () => {
    expect(getZodiacSignIndex("Aries")).toBe(0);
    expect(getZodiacSignIndex("Pisces")).toBe(11);
  });

  it("round-trips with ZODIAC_SIGNS for every sign", () => {
    ZODIAC_SIGNS.forEach((sign, i) => {
      expect(getZodiacSignIndex(sign)).toBe(i);
    });
  });
});
