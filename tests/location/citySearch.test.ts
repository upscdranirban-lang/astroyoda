import { describe, expect, it } from "vitest";
import { searchCities, getCountryName } from "@/lib/location/citySearch";

describe("searchCities", () => {
  it("finds a well-known city by name", async () => {
    const results = await searchCities("Kolkata");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe("Kolkata");
    expect(results[0].countryCode).toBe("IN");
    expect(results[0].latitude).toBeCloseTo(22.5626, 1);
    expect(results[0].longitudeEast).toBeCloseTo(88.363, 1);
  });

  it("ranks the best-known match first among same-named cities", async () => {
    const results = await searchCities("London");
    expect(results.length).toBeGreaterThan(1);
    // Greater London (UK) has far higher population than any other "London".
    expect(results[0].countryCode).toBe("GB");
  });

  it("is case-insensitive", async () => {
    const results = await searchCities("mumbai");
    expect(results.some((c) => c.name === "Mumbai")).toBe(true);
  });

  it("returns an empty array for queries under 2 characters", async () => {
    expect(await searchCities("m")).toEqual([]);
    expect(await searchCities("")).toEqual([]);
  });

  it("returns an empty array for a nonsense query", async () => {
    const results = await searchCities("zzzznotarealcityname");
    expect(results).toEqual([]);
  });

  it("respects the limit parameter", async () => {
    const results = await searchCities("San", 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });
});

describe("getCountryName", () => {
  it("resolves ISO country codes to English names", () => {
    expect(getCountryName("IN")).toBe("India");
    expect(getCountryName("US")).toBe("United States");
    expect(getCountryName("GB")).toBe("United Kingdom");
  });
});
