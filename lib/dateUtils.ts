export interface CalendarDate {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
}

/**
 * Parses and validates a calendar date given as separate year/month/day
 * numbers or an "YYYY-MM-DD" string. Rejects impossible dates (e.g.
 * 2023-02-30) instead of letting JavaScript's Date silently roll them over
 * into the next month, and rejects out-of-range years.
 */
export function parseCalendarDate(input: string | CalendarDate): CalendarDate {
  let year: number;
  let month: number;
  let day: number;

  if (typeof input === "string") {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.trim());
    if (!match) {
      throw new RangeError(`Expected a date in YYYY-MM-DD format, got "${input}"`);
    }
    year = Number(match[1]);
    month = Number(match[2]);
    day = Number(match[3]);
  } else {
    ({ year, month, day } = input);
  }

  if (!Number.isInteger(year) || year < 1000 || year > 9999) {
    throw new RangeError(`Year out of range: ${year}`);
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new RangeError(`Month out of range (expected 1-12): ${month}`);
  }
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    throw new RangeError(`Day out of range (expected 1-31): ${day}`);
  }

  if (day > daysInMonth(year, month)) {
    throw new RangeError(`${year}-${pad(month)}-${pad(day)} is not a real date`);
  }

  return { year, month, day };
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year: number, month: number): number {
  const lengths = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return lengths[month - 1];
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
