import { fromZonedTime } from "date-fns-tz";
import { parseCalendarDate } from "@/lib/dateUtils";

/**
 * Converts a birth date + local time-of-day + IANA timezone into the exact
 * UTC instant the astrology engine (lib/astrology) needs.
 *
 * Uses `date-fns-tz`, which reads the timezone's real historical rules
 * (via the JS runtime's own IANA tzdata through the Intl API) rather than
 * assuming a fixed offset — so this gets daylight-saving transitions and
 * historical rule changes right (e.g. the US had a brief switch to
 * year-round daylight time in early 1974; this was verified against that
 * case during Phase 8 development). No network call, no paid API.
 *
 * @param dateStr  "YYYY-MM-DD"
 * @param timeStr  "HH:mm" in 24-hour time, local to `timezone`
 * @param timezone an IANA timezone name, e.g. "Asia/Kolkata"
 */
export function localDateTimeToUtc(dateStr: string, timeStr: string, timezone: string): Date {
  // Throws a clear RangeError for an impossible calendar date (e.g. Feb 30).
  parseCalendarDate(dateStr);

  const timeMatch = /^(\d{2}):(\d{2})$/.exec(timeStr.trim());
  if (!timeMatch) {
    throw new RangeError(`Expected a time in HH:mm (24-hour) format, got "${timeStr}"`);
  }
  const hours = Number(timeMatch[1]);
  const minutes = Number(timeMatch[2]);
  if (hours > 23 || minutes > 59) {
    throw new RangeError(`Time out of range: "${timeStr}"`);
  }

  if (!timezone || typeof timezone !== "string") {
    throw new RangeError(`Expected an IANA timezone name, got "${timezone}"`);
  }

  const localIso = `${dateStr}T${timeStr}:00`;
  const utcDate = fromZonedTime(localIso, timezone);

  if (Number.isNaN(utcDate.getTime())) {
    throw new RangeError(`Could not resolve "${localIso}" in timezone "${timezone}" to a UTC instant.`);
  }

  return utcDate;
}
