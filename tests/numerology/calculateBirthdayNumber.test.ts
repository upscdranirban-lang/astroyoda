import { describe, expect, it } from "vitest";
import { calculateBirthdayNumber } from "@/lib/numerology/calculateBirthdayNumber";

describe("calculateBirthdayNumber", () => {
  it("returns the day directly when it's already a single digit", () => {
    const result = calculateBirthdayNumber("1990-05-07");
    expect(result.number).toBe(7);
    expect(result.isMasterNumber).toBe(false);
  });

  it("reduces a two-digit day that is not a master number", () => {
    // day 15 -> 1+5=6
    const result = calculateBirthdayNumber("1990-05-15");
    expect(result.number).toBe(6);
    expect(result.isMasterNumber).toBe(false);
  });

  it("preserves day 11 as a master number", () => {
    const result = calculateBirthdayNumber("1990-05-11");
    expect(result.number).toBe(11);
    expect(result.isMasterNumber).toBe(true);
  });

  it("preserves day 22 as a master number", () => {
    const result = calculateBirthdayNumber("1990-05-22");
    expect(result.number).toBe(22);
    expect(result.isMasterNumber).toBe(true);
  });

  it("throws on an invalid date", () => {
    expect(() => calculateBirthdayNumber("2023-04-31")).toThrow(RangeError);
  });
});
