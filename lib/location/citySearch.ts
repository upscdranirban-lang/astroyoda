import type { CityMatch, RawCityRecord } from "@/types/location";

/**
 * City/place data source and licensing note
 * ------------------------------------------
 * data/cities.json is a trimmed extract (population >= 15,000; ~24,300
 * places worldwide) of the "all-the-cities" npm package (MIT-licensed
 * wrapper), whose underlying place data comes from GeoNames
 * (https://www.geonames.org), licensed CC BY 4.0. GeoNames is credited on
 * the About page as required by that license. This file is static,
 * generated offline, and ships with the app — there is no live geocoding
 * API call, paid or otherwise, at request time.
 *
 * A place below this population threshold (a small village, say) won't be
 * found by search. The birth-profile form offers a manual latitude/
 * longitude fallback for that case rather than silently guessing.
 */

let citiesPromise: Promise<RawCityRecord[]> | null = null;

function loadCities(): Promise<RawCityRecord[]> {
  if (!citiesPromise) {
    // Dynamic import so bundlers code-split this ~1.7MB dataset away from
    // the main JS bundle; it's only fetched when someone opens the birth
    // chart form and starts typing a city name.
    citiesPromise = import("@/data/cities.json").then(
      (mod) => (mod.default ?? mod) as unknown as RawCityRecord[]
    );
  }
  return citiesPromise;
}

let regionNames: Intl.DisplayNames | null = null;

/** Resolves an ISO 3166-1 alpha-2 country code to its English display name. */
export function getCountryName(countryCode: string): string {
  try {
    if (!regionNames) {
      regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    }
    return regionNames.of(countryCode) ?? countryCode;
  } catch {
    // Intl.DisplayNames is available in all modern browsers and Node 18+,
    // but fall back gracefully rather than throwing on an obscure runtime.
    return countryCode;
  }
}

function toCityMatch(raw: RawCityRecord): CityMatch {
  return {
    name: raw.n,
    countryCode: raw.c,
    countryName: getCountryName(raw.c),
    adminCode: raw.a,
    population: raw.p,
    latitude: raw.lat,
    longitudeEast: raw.lon,
  };
}

/**
 * Searches the bundled place-name dataset for cities/towns matching the
 * query (case-insensitive, matches anywhere in the name). Results are
 * ranked with exact/prefix matches first, then by population, so for a
 * common name like "London" the capital city surfaces before smaller
 * same-named towns.
 */
export async function searchCities(query: string, limit = 8): Promise<CityMatch[]> {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 2) {
    return [];
  }

  const cities = await loadCities();
  const matches = cities.filter((c) => c.n.toLowerCase().includes(trimmed));

  matches.sort((a, b) => {
    const aName = a.n.toLowerCase();
    const bName = b.n.toLowerCase();
    const aExact = aName === trimmed ? 2 : aName.startsWith(trimmed) ? 1 : 0;
    const bExact = bName === trimmed ? 2 : bName.startsWith(trimmed) ? 1 : 0;
    if (aExact !== bExact) return bExact - aExact;
    return b.p - a.p;
  });

  return matches.slice(0, limit).map(toCityMatch);
}
