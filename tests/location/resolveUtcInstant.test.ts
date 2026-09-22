import { describe, expect, it } from "vitest";
import { localDateTimeToUtc } from "@/lib/location/resolveUtcInstant";

describe("localDateTimeToUtc", () => {
  it("converts a Kolkata local time (no DST, fixed UTC+5:30)", () => {
    const utc = localDateTimeToUtc("1990-08-15", "08:00", "Asia/Kolkata");
    expect(utc.toISOString()).toBe("1990-08-15T02:30:00.000Z");
  });

  it("converts a New York summer local time (EDT, UTC-4)", () => {
    const utc = localDateTimeToUtc("1990-07-15", "12:00", "America/New_York");
    expect(utc.toISOString()).toBe("1990-07-15T16:00:00.000Z");
  });

  it("converts a New York winter local time (EST, UTC-5)", () => {
    const utc = localDateTimeToUtc("1990-01-15", "12:00", "America/New_York");
    expect(utc.toISOString()).toBe("1990-01-15T17:00:00.000Z");
  });

  it("handles the 1974 US year-round-DST historical edge case correctly", () => {
    // The US ran daylight time through the winter of 1974 (energy crisis
    // response); a January 1974 New York noon should be UTC-4, not the
    // usual winter UTC-5. Verified against date-fns-tz's real behavior
    // during Phase 8 research before writing this test.
    const utc = localDateTimeToUtc("1974-01-15", "12:00", "America/New_York");
    expect(utc.toISOString()).toBe("1974-01-15T16:00:00.000Z");
  });

  it("rejects an impossible calendar date", () => {
    expect(() => localDateTimeToUtc("2023-02-30", "12:00", "Asia/Kolkata")).toThrow(RangeError);
  });

  it("rejects a malformed time string", () => {
    expect(() => localDateTimeToUtc("1990-08-15", "8:00", "Asia/Kolkata")).toThrow(RangeError);
    expect(() => localDateTimeToUtc("1990-08-15", "25:00", "Asia/Kolkata")).toThrow(RangeError);
  });

  it("rejects a missing timezone", () => {
    expect(() => localDateTimeToUtc("1990-08-15", "08:00", "")).toThrow(RangeError);
  });
});
