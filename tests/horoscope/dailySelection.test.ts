import { describe, it, expect } from "vitest";
import { getDailyHoroscope, getLocalDateString } from "@/lib/horoscope/dailySelection";
import { HOROSCOPE_MESSAGES, LUCKY_COLORS } from "@/data/horoscope/messagePool";
import { ZODIAC_SIGNS } from "@/lib/astrology/zodiacSigns";

describe("getLocalDateString", () => {
  it("formats a date as local YYYY-MM-DD", () => {
    expect(getLocalDateString(new Date(2026, 8, 22))).toBe("2026-09-22");
    expect(getLocalDateString(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("getDailyHoroscope", () => {
  const fixedDate = new Date(2026, 8, 22);

  it("is deterministic for the same sign and date", () => {
    const a = getDailyHoroscope("Leo", fixedDate);
    const b = getDailyHoroscope("Leo", fixedDate);
    expect(a).toEqual(b);
  });

  it("returns a message from the matching pool, and a valid lucky number/color, for every sign", () => {
    for (const sign of ZODIAC_SIGNS) {
      const reading = getDailyHoroscope(sign, fixedDate);
      expect(HOROSCOPE_MESSAGES.general).toContain(reading.general);
      expect(HOROSCOPE_MESSAGES.career).toContain(reading.career);
      expect(HOROSCOPE_MESSAGES.love).toContain(reading.love);
      expect(HOROSCOPE_MESSAGES.money).toContain(reading.money);
      expect(HOROSCOPE_MESSAGES.wellbeing).toContain(reading.wellbeing);
      expect(LUCKY_COLORS).toContain(reading.luckyColor);
      expect(reading.luckyNumber).toBeGreaterThanOrEqual(1);
      expect(reading.luckyNumber).toBeLessThanOrEqual(9);
      expect(reading.date).toBe("2026-09-22");
    }
  });

  it("varies across zodiac signs on the same day", () => {
    const readings = ZODIAC_SIGNS.map((sign) => getDailyHoroscope(sign, fixedDate).general);
    expect(new Set(readings).size).toBeGreaterThan(1);
  });

  it("varies across dates for the same sign, at least in some field", () => {
    const day1 = getDailyHoroscope("Aries", new Date(2026, 8, 22));
    const day2 = getDailyHoroscope("Aries", new Date(2026, 8, 23));
    const anyDifferent =
      day1.general !== day2.general ||
      day1.career !== day2.career ||
      day1.love !== day2.love ||
      day1.money !== day2.money ||
      day1.wellbeing !== day2.wellbeing ||
      day1.luckyNumber !== day2.luckyNumber ||
      day1.luckyColor !== day2.luckyColor;
    expect(anyDifferent).toBe(true);
  });
});
