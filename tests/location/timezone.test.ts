import { describe, expect, it } from "vitest";
import { getTimezoneForCoordinates } from "@/lib/location/timezone";

describe("getTimezoneForCoordinates", () => {
  it("resolves New Delhi to Asia/Kolkata", () => {
    expect(getTimezoneForCoordinates(28.6139, 77.209)).toBe("Asia/Kolkata");
  });

  it("resolves New York City to America/New_York", () => {
    expect(getTimezoneForCoordinates(40.7128, -74.006)).toBe("America/New_York");
  });

  it("resolves London to Europe/London", () => {
    expect(getTimezoneForCoordinates(51.5074, -0.1278)).toBe("Europe/London");
  });

  it("resolves open ocean to a fixed-offset zone instead of throwing", () => {
    const tz = getTimezoneForCoordinates(0, -140);
    expect(tz).toMatch(/^Etc\/GMT/);
  });

  it("rejects out-of-range latitude", () => {
    expect(() => getTimezoneForCoordinates(91, 0)).toThrow(RangeError);
    expect(() => getTimezoneForCoordinates(-91, 0)).toThrow(RangeError);
  });

  it("rejects out-of-range longitude", () => {
    expect(() => getTimezoneForCoordinates(0, 181)).toThrow(RangeError);
    expect(() => getTimezoneForCoordinates(0, -181)).toThrow(RangeError);
  });
});
