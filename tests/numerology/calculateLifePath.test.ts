import { describe, expect, it } from "vitest";
import { calculateLifePath } from "@/lib/numerology/calculateLifePath";

describe("calculateLifePath", () => {
  it("computes an ordinary life path number", () => {
    // month 1->1, day 1->1, year 1990->1+9+9+0=19->1+9=10->1+0=1; total 1+1+1=3
    const result = calculateLifePath("1990-01-01");
    expect(result.number).toBe(3);
    expect(result.isMasterNumber).toBe(false);
    expect(result.type).toBe("life_path");
    expect(result.interpretationKey).toBe("life_path_3");
  });

  it("preserves a master number that appears in the final reduction", () => {
    // month 11 (master), day 11 (master), year 2009 -> 2+0+0+9=11 (master)
    // total 11+11+11=33, itself a master number
    const result = calculateLifePath("2009-11-11");
    expect(result.number).toBe(33);
    expect(result.isMasterNumber).toBe(true);
    expect(result.interpretationKey).toBe("life_path_33");
  });

  it("accepts a CalendarDate object identically to a string", () => {
    const fromString = calculateLifePath("1990-01-01");
    const fromObject = calculateLifePath({ year: 1990, month: 1, day: 1 });
    expect(fromObject).toEqual(fromString);
  });

  it("throws on an invalid date instead of silently miscalculating", () => {
    expect(() => calculateLifePath("2023-02-30")).toThrow(RangeError);
  });

  it("handles a leap-day birth date", () => {
    // Should not throw, and should compute without error
    expect(() => calculateLifePath("2000-02-29")).not.toThrow();
  });

  it("includes a human-readable calculation trail", () => {
    const result = calculateLifePath("1990-01-01");
    expect(result.calculation).toContain("Month 1");
    expect(result.calculation).toContain("Day 1");
    expect(result.calculation).toContain("Year 1990");
  });
});
