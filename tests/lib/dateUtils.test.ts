import { describe, expect, it } from "vitest";
import { daysInMonth, isLeapYear, parseCalendarDate } from "@/lib/dateUtils";

describe("isLeapYear", () => {
  it("treats a year divisible by 4 (but not 100) as a leap year", () => {
    expect(isLeapYear(2024)).toBe(true);
  });

  it("treats a century year not divisible by 400 as NOT a leap year", () => {
    expect(isLeapYear(1900)).toBe(false);
  });

  it("treats a century year divisible by 400 as a leap year", () => {
    expect(isLeapYear(2000)).toBe(true);
  });

  it("treats an ordinary non-multiple-of-4 year as not leap", () => {
    expect(isLeapYear(2023)).toBe(false);
  });
});

describe("daysInMonth", () => {
  it("gives February 29 days in a leap year", () => {
    expect(daysInMonth(2024, 2)).toBe(29);
  });

  it("gives February 28 days in a non-leap year", () => {
    expect(daysInMonth(2023, 2)).toBe(28);
  });

  it("gives April 30 days", () => {
    expect(daysInMonth(2024, 4)).toBe(30);
  });
});

describe("parseCalendarDate", () => {
  it("accepts a valid YYYY-MM-DD string", () => {
    expect(parseCalendarDate("1990-01-01")).toEqual({ year: 1990, month: 1, day: 1 });
  });

  it("accepts a valid leap-day date", () => {
    expect(parseCalendarDate("2000-02-29")).toEqual({ year: 2000, month: 2, day: 29 });
  });

  it("rejects a leap day in a non-leap year", () => {
    expect(() => parseCalendarDate("1900-02-29")).toThrow(RangeError);
  });

  it("rejects an impossible day-of-month (Feb 30)", () => {
    expect(() => parseCalendarDate("2023-02-30")).toThrow(RangeError);
  });

  it("rejects month 13", () => {
    expect(() => parseCalendarDate("2023-13-01")).toThrow(RangeError);
  });

  it("rejects day 0", () => {
    expect(() => parseCalendarDate({ year: 2023, month: 1, day: 0 })).toThrow(RangeError);
  });

  it("rejects a malformed string", () => {
    expect(() => parseCalendarDate("01/01/1990")).toThrow(RangeError);
  });

  it("accepts an object form of the same date", () => {
    expect(parseCalendarDate({ year: 1975, month: 11, day: 29 })).toEqual({
      year: 1975,
      month: 11,
      day: 29,
    });
  });
});
