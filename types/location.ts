/**
 * A city match resolved from the bundled, offline place-name dataset
 * (see data/cities.json and lib/location/citySearch.ts for provenance).
 */
export interface CityMatch {
  name: string;
  countryCode: string; // ISO 3166-1 alpha-2, e.g. "IN"
  countryName: string; // resolved via Intl.DisplayNames, e.g. "India"
  adminCode: string; // GeoNames admin1 code (state/province), not always human-readable on its own
  population: number;
  latitude: number; // degrees, north positive
  longitudeEast: number; // degrees, EAST positive (matches lib/astrology's convention)
}

/** The raw compact record shape stored in data/cities.json. */
export interface RawCityRecord {
  n: string; // name
  c: string; // ISO 3166-1 alpha-2 country code
  a: string; // admin1 code
  p: number; // population
  lat: number;
  lon: number;
}
