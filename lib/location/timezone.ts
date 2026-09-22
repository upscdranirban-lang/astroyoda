import tzlookup from "tz-lookup";

/**
 * Resolves the IANA timezone name (e.g. "Asia/Kolkata") for a coordinate,
 * using the free, offline `tz-lookup` package (CC0 license) — a bundled
 * timezone-boundary dataset, no network call and no API key.
 *
 * Land coordinates resolve to a real place-based zone (e.g. "Asia/Kolkata");
 * open ocean, far from any timezone boundary, resolves to a fixed-offset
 * "Etc/GMT±N" zone rather than throwing (verified against tz-lookup's
 * actual behavior, not assumed). Genuinely invalid input (out-of-range
 * latitude/longitude) is the only case this wraps into a clearer error.
 */
export function getTimezoneForCoordinates(latitude: number, longitudeEast: number): string {
  if (latitude < -90 || latitude > 90) {
    throw new RangeError(`Latitude out of range (-90 to 90): ${latitude}`);
  }
  if (longitudeEast < -180 || longitudeEast > 180) {
    throw new RangeError(`Longitude out of range (-180 to 180): ${longitudeEast}`);
  }
  try {
    return tzlookup(latitude, longitudeEast);
  } catch (err) {
    throw new Error(
      `Could not determine a timezone for coordinates (${latitude}, ${longitudeEast}).`,
      { cause: err }
    );
  }
}
