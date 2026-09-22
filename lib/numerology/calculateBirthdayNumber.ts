import { parseCalendarDate, type CalendarDate } from "@/lib/dateUtils";
import { reduceNumber } from "@/lib/numerology/reduceNumber";
import type { NumerologyResult } from "@/types/numerology";

/**
 * Birthday Number: derived from the day of the month alone (1-31), reduced
 * to a single digit unless it collapses onto a master number (11 or 22 —
 * 33 is not reachable from a calendar day).
 */
export function calculateBirthdayNumber(dateOfBirth: string | CalendarDate): NumerologyResult {
  const { day } = parseCalendarDate(dateOfBirth);
  const reduced = reduceNumber(day);

  const calculation =
    reduced.steps.length > 1
      ? `Day ${day} → ${reduced.steps.slice(1).join(" → ")}`
      : `Day ${day} (already a single digit)`;

  return {
    number: reduced.value,
    type: "birthday",
    calculation,
    interpretationKey: `birthday_${reduced.value}`,
    isMasterNumber: reduced.isMasterNumber,
  };
}
